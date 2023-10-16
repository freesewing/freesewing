import { back } from './back.mjs'
import { splitYoke } from './options.mjs'

function simonYoke({ sa, Point, points, Path, paths, Snippet, snippets, macro, options, part }) {
  for (const id in paths) {
    if (['backCollar', 'backArmhole', 'backArmholeYoke'].indexOf(id) === -1) delete part.paths[id]
  }

  // Paths
  paths.saBase = new Path().move(points.cbYoke).line(points.armholeYokeSplitPreBoxpleat)
  if (options.yokeHeight > 0) paths.saBase = paths.saBase.join(paths.backArmholeYoke)
  paths.saBase = paths.saBase.line(points.s3CollarSplit).join(paths.backCollar)
  if (options.splitYoke) paths.saBase = paths.saBase.line(points.cbYoke).close()
  else {
    macro('mirror', {
      mirror: [points.cbNeck, points.cbYoke],
      paths: ['saBase'],
      clone: true,
    })
    paths.saBase = paths.saBase.join(paths.mirroredSaBase.reverse())
    paths.mirroredSaBase.hide()
  }
  paths.seam = paths.saBase.clone()
  paths.saBase.hide()
  paths.seam = paths.seam.close().attr('class', 'fabric')
  if (sa) {
    paths.sa = paths.saBase.offset(sa).attr('class', 'fabric sa')
    if (options.splitYoke) {
      paths.sa = paths.sa.line(points.cbNeck).move(points.cbYoke).line(paths.sa.start())
    }
  }

  /*
   * Annotations
   */
  // Notches
  delete snippets.armholePitchNotch
  delete snippets.collarNotch
  delete snippets.shoulderNotch
  snippets.sleevecapNotch = new Snippet('notch', points.armholeYokeSplitPreBoxpleat)

  // Title
  points.title = new Point(points.neck.x, points.cbYoke.y / 2)
  macro('title', { at: points.title, nr: 4, title: 'yoke', scale: 0.8 })

  // Logo
  points.logo = new Point(points.neck.x / 2, points.cbYoke.y * 0.5)
  snippets.logo = new Snippet('logo', points.logo).scale(0.666)

  // Grainline
  points.grainlineFrom = points.cbYoke.shiftFractionTowards(points.cbNeck, 0.2)
  points.grainlineTo = points.cbNeck.shiftFractionTowards(points.cbYoke, 0.2)
  macro('grainline', {
    from: points.grainlineFrom,
    to: points.grainlineTo,
  })

  // Dimensions
  macro('hd', {
    id: 'wCbToHps',
    from: points.cbNeck,
    to: points.s3CollarSplit,
    y: points.s3CollarSplit.y - 15 - sa,
  })
  macro('ld', {
    id: 'lShoulderSeam',
    from: points.s3CollarSplit,
    to: points.s3ArmholeSplit,
    d: 15 + sa,
  })
  if (options.splitYoke) {
    macro('hd', {
      id: 'wCbToYokeEdge',
      from: points.cbYoke,
      to: points.armholeYokeSplitPreBoxpleat,
      y: points.cbYoke.y + 15 + sa,
    })
    macro('hd', {
      id: 'wFullHalf',
      from: points.cbYoke,
      to: points.s3ArmholeSplit,
      y: points.cbYoke.y + 30 + sa,
    })
  } else {
    macro('hd', {
      id: 'wAtYoke',
      from: points.armholeYokeSplitPreBoxpleat.flipX(),
      to: points.armholeYokeSplitPreBoxpleat,
      y: points.cbYoke.y + 15 + sa,
    })
    macro('hd', {
      id: 'wFullHalf',
      from: points.s3ArmholeSplit.flipX(),
      to: points.s3ArmholeSplit,
      y: points.cbYoke.y + 30 + sa,
    })
  }
  macro('vd', {
    id: 'hAtCb',
    from: points.cbYoke,
    to: points.cbNeck,
    x: points.cbYoke.x - 15 - sa,
  })
  macro('vd', {
    id: 'wToShoulder',
    from: points.cbYoke,
    to: points.s3ArmholeSplit,
    x: points.s3ArmholeSplit.x + 15 + sa,
  })
  macro('vd', {
    id: 'wToHps',
    from: points.cbYoke,
    to: points.s3CollarSplit,
    x: points.s3ArmholeSplit.x + 30 + sa,
  })

  return part
}

export const yoke = {
  name: 'simon.yoke',
  from: back,
  options: {
    splitYoke,
  },
  draft: simonYoke,
}
