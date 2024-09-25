import { name, version } from '../data.mjs'

/**
 * @typedef {(Path|null)} OptionalPath
 *
 * @typedef {Object} PathWithOffset
 * @property {(Path|OptionalPath[])} p a single Path object or an array of Path objects sharing the same offset
 * @property {number} offset the custom offset for the path(s)
 * @property {boolean} [hidden] set to true to hide path in the output, but build corners as if it were there
 */

/**
 * Fills in a corner between two paths with the given mode
 *
 * @param {Path} result
 * @param {Path} prev
 * @param {Path} next
 * @param {string} mode currently supported are 'cut' and 'corner'
 * @param {number} limit
 * @param utils
 */
function insertJoin(result, prev, next, mode, limit, utils) {
  if (prev.ops.length < 2) {
    return
  }
  if (next.ops.length < 2) {
    return
  }
  if (prev.start().sitsOn(prev.end())) {
    // no start angle determinable
    return
  }
  if (next.start().sitsOn(next.end())) {
    // no end angle determinable
    return
  }
  if (prev.end().sitsOn(next.start())) {
    // No join necessary
    return
  }
  if (mode === 'cut') {
    return
  }
  const reversed = prev.reverse()

  const prevPoint = reversed.ops[0].to
  const nextPoint = next.ops[0].to

  if (prevPoint.dist(nextPoint) < 1) {
    // No join necessary
    return
  }

  let prevCp = reversed.ops[1].cp1 ?? reversed.ops[1].to
  let nextCp = next.ops[1].cp1 ?? next.ops[1].to

  if (prevPoint.sitsOn(prevCp)) {
    // We need to calculate a previous point if the control point already lies on the end of the line
    prevCp = prevPoint.shift(prev.angleAt(prevPoint), -66)
  }
  if (nextPoint.sitsOn(nextCp)) {
    // We need to calculate a previous point if the control point already lies on the end of the line
    nextCp = nextPoint.shift(next.angleAt(nextPoint), 66)
  }

  const intersect = utils.beamsIntersect(prevCp, prevPoint, nextPoint, nextCp)
  if (intersect) {
    const d1 = intersect.dist(prevPoint)
    const d2 = intersect.dist(nextPoint)
    if (d1 > intersect.dist(prevCp)) {
      // dont go backwards
      return
    }
    if (d2 > intersect.dist(nextCp)) {
      // dont go backwards
      return
    }

    if (mode === 'corner') {
      if (limit) {
        const min = Math.min(d1, d2)
        if (d1 > limit && d2 > limit) {
          const p1 = intersect.shiftTowards(prevPoint, min - limit)
          const p2 = intersect.shiftTowards(nextPoint, min - limit)
          result.line(p1).line(p2)
          return
        }
      }
      result.line(intersect)
    }
  }
}

function loadPaths(configuredPaths, allPaths, log) {
  let result = []
  for (const configuredPath of configuredPaths) {
    if (typeof configuredPath === 'string') {
      const p = allPaths[configuredPath]
      if (p && p.ops) {
        // note: instanceof would fail due to different constructors
        result.push(p)
      } else {
        log.error(`Path "${configuredPath}" is not a valid path`)
      }
    } else if (configuredPath && configuredPath.ops) {
      result.push(configuredPath)
    } else if (configuredPath !== null) {
      log.error(`Path "${configuredPath}" is not a valid path`)
    } else {
      result.push(null)
    }
  }
  return result
}

/**
 * Joins paths together with angled corners.
 *
 * Node: paths in the paths array that are hidden with [Path.hide()] will stay invisible in the output, but will
 * still create corners
 *
 * @param conf {Object}
 * @property {OptionalPath[]} paths
 * @property {string} mode
 * @property {number} limit
 * @param {Object} props
 *
 * @return {Path} the resulting Path object that consists of the joined paths
 */
const joinMacro = function (conf, props) {
  let { log, Path } = props

  const paths = loadPaths(conf.paths, props.paths, log)
  let prevPathIndex = paths.length - 1
  let result = new Path()
  const mode = conf.mode ?? 'corner'

  // remove intersecting sections of adjacent paths that e.g. occur when offsetting a concave corner
  paths.forEach(function (path, index) {
    if (path !== null) {
      if (paths[prevPathIndex] !== null) {
        // check intersection
        const intersections = paths[prevPathIndex].intersects(path)
        if (intersections.length > 0) {
          const intersection = intersections.pop()
          paths[prevPathIndex] = paths[prevPathIndex].split(intersection)[0] ?? paths[prevPathIndex]
          paths[index] = path.split(intersection).pop() ?? path
        }
      }
    }
    prevPathIndex = index
  })

  paths.forEach(function (path, index) {
    if (path !== null) {
      const prevPath = paths[prevPathIndex]
      if (prevPath !== null) {
        if (path.hidden && prevPath.hidden) {
          // nothing to do, both paths are hidden, so no join needed
          prevPathIndex = index
          return
        }

        if (result.ops.length === 0) {
          // make sure the path starts with a move
          result.move(paths[prevPathIndex].end())
        }
        insertJoin(result, paths[prevPathIndex], path, mode, conf.limit, props.utils)

        if (!path.hidden) {
          result.line(path.start())
          result.ops.push(...path.ops.slice(1))
        }
      } else if (!path.hidden) {
        result.ops.push(...path.ops)
      }
    }
    prevPathIndex = index
  })

  return result
}

/**
 * Calculates an offset path from a list of paths with given offset
 *
 * @typedef {(PathWithOffset|null)} DefinedPathEntry
 *
 * @param conf {Object}
 * @property {DefinedPathEntry[]} paths
 * @property {string} mode
 * @property {number} limit
 * @param {Object} props
 *
 * @return {Path} the resulting Path object that consists of the offset and joined paths
 */
const offsetMacro = function (conf, props) {
  const segments = []
  let prevPath = 'unset'
  let firstPath = 'unset'
  let { log, Path } = props

  for (const entry of conf.paths) {
    let paths = entry?.p ?? [null]
    let offset = entry?.offset ?? 0
    let hide = entry?.hidden ?? false
    if (!Array.isArray(paths)) {
      paths = [paths]
    }
    paths = loadPaths(paths, props.paths, log)
    for (const path of paths) {
      if (path == null) {
        if (firstPath === 'unset') {
          firstPath = null
        }
        if (prevPath.ops) {
          // insert dummy node to make path go to the endpoint of the previous path (to return to the baseline)
          segments.push(new Path().move(prevPath.end()).line(prevPath.end()))
          segments.push(null)
          prevPath = null
        }
      } else {
        if (prevPath === null) {
          // insert dummy node to make path go to the start point of the current path (before going sideways)
          segments.push(new Path().move(path.start()).line(path.start()))
        }
        const division = path.divide()
        for (const divisionElement of division) {
          if (firstPath === 'unset') {
            firstPath = divisionElement
          }
          if (
            divisionElement.ops.length === 2 &&
            divisionElement.ops[1].type === 'line' &&
            divisionElement.ops[0].to.sitsOn(divisionElement.ops[1].to)
          ) {
            continue
          }
          const offsetPath = divisionElement.offset(offset)
          if (offsetPath.ops.length > 1) {
            // skip degenerate paths
            if (hide) offsetPath.hide()
            segments.push(offsetPath)
            prevPath = divisionElement
          }
        }
      }
    }
  }
  if (firstPath === null && prevPath !== null) {
    // insert gap at end of path
    segments.push(new Path().move(prevPath.start()).line(prevPath.start()))
  }
  if (firstPath !== null && prevPath === null) {
    // insert gap at start of path
    segments.unshift(new Path().move(firstPath.start()).line(firstPath.start()))
  }
  return joinMacro({ ...conf, paths: segments }, props)
}

/**
 * Creates a seam allowance path from a lists of paths (optionally with assigned seam allowance override)
 *
 * @typedef {(Path|PathWithOffset|null)} PathEntry
 *
 * @param conf {Object}
 * @property {PathEntry[]} paths
 * @property {string|null} class
 * @property {string} mode
 * @property {number} limit
 * @param {Object} props
 *
 * @return {Path} the resulting seam allowance path
 */
const saMacro = function (conf, props) {
  let { log } = props
  let sa = conf.sa ?? props.sa
  if (!sa) {
    sa = 0
  }
  let offsetConf = { ...conf, paths: [] }
  for (const entry of conf.paths) {
    if (entry === null) {
      offsetConf.paths.push(null)
    } else if (entry.ops || typeof entry === 'string') {
      offsetConf.paths.push({ p: entry, offset: sa })
    } else if (entry.p && typeof entry.offset === 'number') {
      offsetConf.paths.push(entry)
    } else {
      log.error(`Entry "${entry}" is not a valid seam allowance path specification`)
    }
  }
  let result = offsetMacro(offsetConf, props)
  result.setClass(conf.class ?? 'fabric')
  result.addClass('sa')
  return result
}

/**
 * Creates a hem allowance path with trueing
 *
 * @param cssClass css class for resulting paths
 * @param path1 path before the hem (e.g. the inseam)
 * @param path2 path after the hem (e.g. the outseam)
 * @param offset1 seam allowance (offset) used on `path1`
 * @param offset2 seam allowance (offset) used on `path2`
 * @param hemWidth width of hem
 * @param lastFoldWidth width of last fold
 * @param folds number of folds (you need two folds for an enclosed raw edge)
 * @param prefix prefix for created paths
 * @param props
 */
const hemMacro = function (
  {
    path1,
    path2,
    offset1 = null,
    offset2 = null,
    hemWidth,
    lastFoldWidth = null,
    folds = 2,
    prefix: prefix = 'hemMacro',
    cssClass = 'fabric',
  },
  props
) {
  let { sa, utils, log, paths, Point, Path } = props

  const lineValues = (start, end) => {
    const { x: x1, y: y1 } = start
    const { x: x2, y: y2 } = end
    const [A, B] = [-(y2 - y1), x2 - x1]
    const C = -(A * x1 + B * y1)
    return [A, B, C]
  }

  const mirrorGen = (start, end) => {
    const [A, B, C] = lineValues(start, end)
    return (point) => {
      const { x, y } = point
      const uNom = (B * B - A * A) * x - 2 * A * B * y - 2 * A * C
      const vNom = (A * A - B * B) * y - 2 * A * B * x - 2 * B * C
      const denom = A * A + B * B

      return new Point(uNom / denom, vNom / denom)
    }
  }

  const mirrorPath = (mirrorPoint, path) => {
    const p = path.clone()
    for (const op of p.ops) {
      switch (op.type) {
        case 'move':
        case 'line':
          op.to = mirrorPoint(op.to)
          break
        case 'curve':
          op.to = mirrorPoint(op.to)
          op.cp1 = mirrorPoint(op.cp1)
          op.cp2 = mirrorPoint(op.cp2)
          break
        default:
        // Do nothing
      }
    }
    return p.reverse()
  }

  if (!lastFoldWidth) {
    lastFoldWidth = sa > 0 ? sa : 10
  }

  path1 = loadPaths([path1], paths, log).pop()
  path2 = loadPaths([path2], paths, log).shift()

  if (offset1 === null) {
    offset1 = sa
  }
  if (offset2 === null) {
    offset2 = sa
  }

  let hemStart = path1.end()
  let hemEnd = path2.start()

  let foldStart = hemStart
  let foldEnd = hemEnd

  let hemAngle = hemStart.angle(hemEnd)

  // Beam that determines which part of the side seams to mirror
  let innerBeamStart = hemStart.shift(hemAngle + 90, hemWidth)
  let innerBeamEnd = hemEnd.shift(hemAngle + 90, hemWidth)

  if (offset1) {
    path1 = path1.offset(offset1)
  }
  if (offset2) {
    path2 = path2.offset(offset2)
  }

  if (0 === path1.intersectsBeam(innerBeamStart, innerBeamEnd).length) {
    // extend path1 to beam
    let p1tmp = utils.beamsIntersect(
      path1.end(),
      path1.end().shift(hemAngle + 90, 10),
      innerBeamStart,
      innerBeamEnd
    )
    path1 = new Path().move(p1tmp).join(path1)
  }
  if (0 === path2.intersectsBeam(innerBeamStart, innerBeamEnd).length) {
    // extend path2 to beam
    let p2tmp = utils.beamsIntersect(
      path2.start(),
      path2.start().shift(hemAngle + 90, 10),
      innerBeamStart,
      innerBeamEnd
    )
    path2 = path2.clone().line(p2tmp)
  }

  function cutPathStart(path, beamStart, beamEnd) {
    let path2Intersections = path.intersectsBeam(beamStart, beamEnd)
    let path2Tmp =
      path2Intersections.length === 0 ? path : path.split(path2Intersections.shift()).shift()
    if (path2Tmp === null) {
      path2Tmp = path
    }
    return path2Tmp
  }

  function cutPathEnd(path, beamStart, beamEnd) {
    let path1Intersections = path.intersectsBeam(beamStart, beamEnd)
    let path1Tmp =
      path1Intersections.length === 0 ? path : path.split(path1Intersections.pop()).pop()
    if (path1Tmp === null) {
      path1Tmp = path
    }
    return path1Tmp
  }

  // Determine portion of side seam paths to mirror
  let path1End = cutPathStart(cutPathEnd(path1, innerBeamStart, innerBeamEnd), hemStart, hemEnd)
  let path2Start = cutPathEnd(cutPathStart(path2, innerBeamStart, innerBeamEnd), hemStart, hemEnd)

  paths[prefix + 'Mirror1'] = path1End.clone().hide()
  paths[prefix + 'Mirror2'] = path2Start.clone().hide()

  let mirrorPoint = mirrorGen(foldStart, foldEnd)
  let path1Mirrored = mirrorPath(mirrorPoint, path1End)
  let path2Mirrored = mirrorPath(mirrorPoint, path2Start)

  let startSidePaths = [path1Mirrored]
  let endSidePaths = [path2Mirrored]

  for (let i = 1; i < folds; i++) {
    paths[prefix + 'Fold' + i] = new Path()
      .move(path1Mirrored.end())
      .line(path2Mirrored.start())
      .setClass(cssClass)
      .addClass('help')

    // create additional folds around the new "hem" line
    foldStart = foldStart.shift(hemAngle - 90, hemWidth)
    foldEnd = foldEnd.shift(hemAngle - 90, hemWidth)
    mirrorPoint = mirrorGen(foldStart, foldEnd)
    path1Mirrored = mirrorPath(mirrorPoint, path1Mirrored)
    path2Mirrored = mirrorPath(mirrorPoint, path2Mirrored)

    startSidePaths.push(path1Mirrored)
    endSidePaths.unshift(path2Mirrored)
  }
  foldStart = foldStart.shift(hemAngle - 90, lastFoldWidth)
  foldEnd = foldEnd.shift(hemAngle - 90, lastFoldWidth)
  startSidePaths[startSidePaths.length - 1] = cutPathStart(
    startSidePaths[startSidePaths.length - 1],
    foldStart,
    foldEnd
  )
  endSidePaths[0] = cutPathEnd(endSidePaths[0], foldStart, foldEnd)

  let joinPaths = [
    ...startSidePaths,
    new Path().move(foldStart).line(foldEnd),
    ...endSidePaths,
    null,
  ]

  return joinMacro(
    {
      paths: joinPaths,
    },
    props
  )
    .setClass(cssClass)
    .addClass('sa')
}

export const plugin = {
  name,
  version,
  macros: {
    join: joinMacro,
    offset: offsetMacro,
    sa: saMacro,
    hem: hemMacro,
  },
}

// More specifically named exports
export const pathUtilsPlugin = plugin
export const pluginPathUtils = plugin
