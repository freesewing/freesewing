import { front as bibiFront } from '@freesewing/bibi'
import { back } from './back.mjs'

function getIntersectionY(path, sideOffset) {
  const y = path.intersectsY(sideOffset)
  if (y.length > 0) return y
  // Sometimes the intersection is directly on a node of the sidepath
  // (especially with the default front coverage of 30 for some reason)
  // so shift the y coordinate a little bit
  // Intersecting the path exactly on the corner points sometimes doesn't work
  // See issue #3367
  sideOffset += 0.001
  return path.intersectsY(sideOffset)
}

function tinaFront({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  absoluteOptions,
  measurements,
  macro,
  complete,
  part,
}) {
  // Hide Bibi paths
  for (const key of Object.keys(paths)) paths[key].hide()

  // ... except dart
  if (paths.dart) {
    paths.dart.unhide()
    paths.dartMiddle.unhide()
  }
  // ... and armhole binding
  if (paths.armholeBinding) {
    paths.armholeBinding.unhide()
  }

  points.mirroredHem = new Point(-points.hem.x, points.hem.y)
  let sideOffset
  let rotationAngle

  const diagonalEase = options.frontEase

  function getRotationAngle() {
    // this is a basic estimate
    const angle =
      (180 / Math.PI) *
      points.shoulder.dist(points.mirroredSideJoin) *
      (diagonalEase / points.mirroredHem.dist(points.hem))

    let limit = points.mirroredHem.angle(points.neck) - 90
    if (!store.splitFrontPart && options.lengthBonus > 0) {
      limit = limit * Math.max(0, 1 - options.lengthBonus)
    }

    if (angle < limit) {
      // rotating it further would lengthen the diagonal again
      return limit
    }
    return angle
  }

  function getSplitPath(path, splitPoint, index) {
    const tmp = path.split(splitPoint)[index]
    if (tmp && !Array.isArray(tmp)) return tmp
    return new Path().move(splitPoint)
  }

  /**
   * Adjusts the given rotation origin so that the length of the curved seams stays the same as
   * it would be without rotation.
   *
   * This ensures that with negative front ease setting, the hem or split seam stays the same length
   * even when the left (mirrored) path is rotated towards the neck point
   *
   * @param {Point} side
   * @returns {Point}
   */
  function adjustRotationOrigin(side) {
    const center = new Point(0, side.y)
    const mirror = new Point(-side.x, side.y)
    const expectedLength = side.dist(mirror)
    let rotationOrigin = side
    let steps = 0
    while (steps < 1000) {
      const target = mirror.rotate(rotationAngle, rotationOrigin)
      const tmpPath = new Path().move(target)._curve(center, side).hide()
      if (tmpPath.length() <= expectedLength) {
        return rotationOrigin
      }
      rotationOrigin = rotationOrigin.shift(-90, 1)
      steps++
    }
    console.error('failed to adjust rotation origin within 1000 steps')
    return rotationOrigin
  }

  if (options.frontCoverage > 0) {
    store.splitDist = sa ? sa * 4 : 40

    const dartHeight = points.endDart.dy(points.startDart)
    sideOffset =
      points.hem.y * (1 - options.frontCoverage) +
      (points.armhole.y + dartHeight) * options.frontCoverage
    let sideOffsetStretched = Math.min(
      sideOffset + store.get('dart').dartLength * options.sideGathering * 1.5,
      points.hem.y - (points.hem.y - sideOffset) / 2
    )
    if (paths.dart) {
      if (sideOffsetStretched < points.startDart.y) {
        // shift sideOffsetStretched above dart
        sideOffsetStretched -= dartHeight
      }
    } else {
      let gatheringFactor =
        (sideOffsetStretched - points.endGather.y) / points.endGather.dy(points.startGather)
      gatheringFactor = Math.min(1, Math.max(0, gatheringFactor))
      // shift sideOffsetStretched above gathering
      sideOffsetStretched -= dartHeight * (1 - gatheringFactor)
    }

    let intersection = getIntersectionY(paths.originalSideSeam, sideOffset)
    let intersectionStretched = getIntersectionY(paths.sideSeam, sideOffsetStretched)
    points.sideJoin = intersection.length > 0 ? intersection[0] : points.armhole
    points.sideJoinStretched =
      intersectionStretched.length > 0 ? intersectionStretched[0] : points.armhole
    points.mirroredSideJoin = new Point(-points.sideJoin.x, points.sideJoin.y)

    store.splitFrontPart = options.splitFrontPart && points.hem.y - sideOffset > store.splitDist * 3

    rotationAngle = getRotationAngle()

    macro('mirror', {
      mirror: [new Point(0, 0), new Point(0, 100)],
      paths: ['originalSideSeam'],
      clone: true,
    })
    paths.mirroredSide = getSplitPath(paths.mirroredOriginalSideSeam, points.mirroredSideJoin, 0)
      .reverse()
      .hide()

    points.rotationOrigin = adjustRotationOrigin(
      store.splitFrontPart ? points.sideJoin : points.hem
    )

    paths.easeMirroredSide = paths.mirroredSide.rotate(rotationAngle, points.rotationOrigin).hide()
    points.easeMirroredSideJoin = points.mirroredSideJoin.rotate(
      rotationAngle,
      points.rotationOrigin
    )
    points.easeMirroredHem = points.mirroredHem.rotate(rotationAngle, points.rotationOrigin)
  } else {
    points.sideJoinStretched = points.sideJoin = points.hem.shiftFractionTowards(
      points.cfHem,
      -options.frontCoverage
    )
    points.mirroredSideJoin = new Point(-points.sideJoin.x, points.sideJoin.y)

    store.splitFrontPart = false

    rotationAngle = getRotationAngle()

    points.rotationOrigin = adjustRotationOrigin(points.hem)

    points.easeMirroredSideJoin = points.mirroredSideJoin.rotate(
      rotationAngle,
      points.rotationOrigin
    )
    points.easeMirroredHem = points.mirroredHem.rotate(rotationAngle, points.rotationOrigin)
  }

  points.mirroredBust = new Point(-measurements.bustSpan / 2, measurements.hpsToBust)

  // The following points draw the measurements without added ease
  points.measureWaist = new Point(measurements.waist / 4, points.waist.y)
  points.measureHips = new Point(measurements.hips / 4, points.hips.y)
  points.measureSeat = new Point((measurements.seat - measurements.seatBack) / 2, points.seat.y)

  if (points.hem.y > points.measureHips.y) {
    if (complete && options.plotFitHelpers) {
      paths.hipsToSeatHint = new Path()
        .move(points.cbWaist)
        .line(points.waist)
        .move(points.measureWaist)
        .line(points.measureHips)
        .line(points.measureSeat)
        .attr('class', 'help')
    }
  }

  snippets.sideJoin = new Snippet('bnotch', points.sideJoinStretched)
  snippets.mirroredSideJoin = new Snippet('bnotch', points.easeMirroredSideJoin)

  if (complete) {
    paths.alignPath = new Path()
      .move(points.easeMirroredSideJoin.shiftFractionTowards(points.sideJoinStretched, 0.05))
      .line(points.sideJoinStretched.shiftFractionTowards(points.easeMirroredSideJoin, 0.05))
      .addClass('dashed note')
      .addText('align between mirrored parts', 'center note help')
      .attr('marker-start', 'url(#grainlineFrom)')
      .attr('marker-end', 'url(#grainlineTo)')
  }
  paths.hemBaseHalf = new Path()
    .move(points.cfHem)
    .curve(points.midHemCp1, points.midHemCp2, points.hem)
    .hide()

  if (options.frontCoverage > 0) {
    paths.hemBase = new Path().move(points.mirroredHem)._curve(points.cfHem, points.hem).hide()
    paths.easeHemBase = new Path()
      .move(points.easeMirroredHem)
      ._curve(points.cfHem, points.hem)
      .hide()
  } else {
    paths.hemBase = new Path()
      .move(points.mirroredSideJoin)
      ._curve(points.cfHem, points.sideJoin)
      .line(points.hem)
      .hide()
    paths.easeHemBase = new Path()
      .move(points.easeMirroredSideJoin)
      ._curve(points.cfHem, points.sideJoin)
      .line(points.hem)
      .hide()
  }

  paths.tinaSaBase = paths.armhole.clone().join(paths.shoulder).hide()

  paths.tinaDiagonalSeam = new Path()
    .move(points.neck)
    .curve(points.neckCp2, points.neckCp2, points.easeMirroredSideJoin)
    .hide()

  paths.neckBinding = paths.tinaDiagonalSeam.offset(-absoluteOptions.bindingHeight)

  if (paths.easeMirroredSide) {
    paths.extensionLine = new Path()
      .move(points.easeMirroredSideJoin)
      .line(points.neckCp2.rotate(180, points.easeMirroredSideJoin))
      .hide()
    paths.extensionLineOffset = paths.extensionLine.offset(-absoluteOptions.bindingHeight).hide()
    const intersection = paths.easeMirroredSide.intersects(paths.extensionLineOffset)
    if (intersection && intersection.length > 0) {
      paths.neckBinding = paths.neckBinding.line(intersection[0])
    }
  }

  paths.neckBinding.addClass('various help')
  if (!complete) {
    paths.neckBinding.hide()
  }

  store.diagnonalLength = paths.neckBinding.length()

  if (store.splitFrontPart) {
    const splitOffset = Math.max(
      points.startGather.y + store.get('gatherAreaStart') * 0.9,
      sideOffset + store.splitDist
    )
    points.cfSplit = new Point(0, splitOffset)

    let intersection = paths.sideSeam.intersectsY(splitOffset)
    points.sideSplit = intersection[0]
    points.mirroredSideSplit = new Point(-points.sideSplit.x, points.sideSplit.y)
    points.easeMirroredSideSplit = points.mirroredSideSplit.rotate(
      rotationAngle,
      points.rotationOrigin
    )

    const sideSeamSplit = paths.sideSeam.split(points.sideSplit)
    paths.upperSide = sideSeamSplit[1].hide()
    paths.lowerSide = sideSeamSplit[0].hide()

    paths.mirroredUpperSide = getSplitPath(
      paths.easeMirroredSide,
      points.easeMirroredSideSplit,
      0
    ).hide()
    paths.mirroredLowerSide = getSplitPath(paths.mirroredSide, points.mirroredSideSplit, 1).hide()

    if (sa) {
      paths.tinaSeamSa = paths.upperSide
        .offset(sa)
        .join(paths.tinaSaBase.offset(sa))
        .join(paths.tinaDiagonalSeam)
        .join(paths.mirroredUpperSide.offset(sa))
        .join(
          new Path()
            .move(points.easeMirroredSideSplit)
            ._curve(points.cfSplit, points.sideSplit)
            .offset(sa)
        )
        .close()
        .attr('class', 'fabric sa')
    }

    if (points.startGather.y > points.sideSplit.y) {
      delete snippets.startGather
    } else if (paths.gatherPath) {
      paths.gatherPath.unhide()
    }

    paths.tinaSeam = new Path()
      .move(points.sideSplit)
      .join(paths.upperSide)
      .join(paths.tinaSaBase)
      .join(paths.tinaDiagonalSeam)
      .join(paths.mirroredUpperSide)
      ._curve(points.cfSplit, points.sideSplit)
      .close()
      .attr('class', 'fabric')

    paths.tinaSeamBottom = new Path()
      .move(points.hem)
      .join(paths.lowerSide)
      .join(paths.mirroredLowerSide)
      .join(paths.hemBase)
      .close()
      .attr('class', 'fabric')
      .hide()

    paths.tinaSeamBottomHalf = new Path()
      .move(points.hem)
      .join(paths.lowerSide)
      .line(points.cfSplit)
      .line(points.cfHem)
      .join(paths.hemBaseHalf)
      .close()
      .attr('class', 'fabric')
      .hide()

    if (sa) {
      const tmp1 = paths.hemBaseHalf.offset(sa * (options.useWaistRibbing ? 1 : 3))
      const tmp2 = new Path().move(points.hem).join(paths.lowerSide).line(points.cfSplit).offset(sa)
      paths.tinaSeamBottomHalfSa = new Path()
        .move(points.cfHem)
        .join(tmp1)
        .join(tmp2)
        .line(points.cfSplit)
        .attr('class', 'fabric sa')
        .hide()
    }
  } else {
    if (sa) {
      paths.sa = paths.easeHemBase
        .offset(sa * (options.useWaistRibbing ? 1 : 3))
        .join(paths.sideSeam.offset(sa))
        .join(paths.tinaSaBase.offset(sa))
        .join(paths.tinaDiagonalSeam)

      if (paths.easeMirroredSide) {
        paths.sa = paths.sa.join(
          paths.easeMirroredSide.offset(sa * (options.frontCoverage > 0 ? 1 : 3))
        )
      }
      paths.sa = paths.sa.close().attr('class', 'fabric sa')
    }

    if (paths.gatherPath) {
      paths.gatherPath.unhide()
    }

    paths.tinaSeam = paths.easeHemBase
      .clone()
      .join(paths.sideSeam)
      .join(paths.tinaSaBase)
      .join(paths.tinaDiagonalSeam)
    if (paths.easeMirroredSide) {
      paths.tinaSeam = paths.tinaSeam.join(paths.easeMirroredSide)
    }

    paths.tinaSeam = paths.tinaSeam.close().attr('class', 'fabric')

    macro('grainline', {
      from: points.bust,
      to: points.cfHem.shift(0, measurements.bustSpan / 2),
    })
  }

  const grainLineBottom = new Point(points.neck.x, (points.sideSplit ?? points.hem).y).rotate(
    rotationAngle / 2,
    points.neck
  )
  macro('grainline', {
    from: points.neck,
    to: grainLineBottom,
  })

  if (options.plotFitHelpers) {
    snippets.bustPoint = new Snippet('notch', points.bust)
    snippets.mirroredBustPoint = new Snippet('notch', points.mirroredBust)

    macro('mirror', {
      mirror: [new Point(0, 0), new Point(0, 100)],
      paths: ['tinaSeam'],
      clone: true,
    })

    paths.mirroredTinaSeam.attr('class', 'dotted stroke-xs')
    if (paths.tinaSeamBottom) {
      paths.tinaSeamBottomPreview = paths.tinaSeamBottom
        .clone()
        .unhide()
        .attr('class', 'dotted stroke-xs')
    }
  }

  points.title = points.mirroredBust
    .shiftFractionTowards(points.shoulderCp1, 0.6)
    .shiftFractionTowards(points.cfSplit ?? points.cfHem, options.lengthBonus / 4)
  delete snippets.logo

  macro('rmCutOnFold', 'cutonfold')

  store.cutlist.setCut({ cut: 2, from: 'fabric', onFold: false })

  // Replace Bibi title
  macro('rmTitle', 'title')
  macro('title', { at: points.title, nr: 1, title: 'front' })

  macro('pd', {
    id: 'pArmhole',
    path: paths.armhole.reverse(),
    d: -1 * sa - 15,
  })

  macro('pd', {
    id: 'pDiagonal',
    path: paths.tinaDiagonalSeam.reverse(),
    d: -3 * sa - 15,
  })

  const sidePath = paths.mirroredUpperSide ?? paths.easeMirroredSide
  if (sidePath) {
    macro('pd', {
      id: 'pMirroredSide',
      path: sidePath.reverse(),
      d: -1 * sa - 15,
    })
  }

  macro('pd', {
    id: 'pSide',
    path: (paths.upperSide ?? paths.sideSeam).reverse(),
    d: -1 * sa - 15,
  })

  macro('pd', {
    id: 'pShoulder',
    path: paths.shoulder.reverse(),
    d: -1 * sa - 15,
  })

  macro('vd', {
    id: 'hNeckToArmhole',
    from: points.neck,
    to: points.armhole,
    x: points.armhole.x + sa + 15,
  })

  macro('hd', {
    id: 'wBottom',
    from: points.easeMirroredSideJoin,
    to: points.sideJoin,
    y: points.sideJoin.y + sa + 15,
  })

  macro('vd', {
    id: 'hBottom',
    from: points.easeMirroredSideJoin,
    to: points.sideJoin,
    x: points.easeMirroredSideJoin.x - sa - 15,
  })
  if (options.frontCoverage < 0) {
    macro('hd', {
      id: 'wBottom2',
      from: points.hem,
      to: points.sideJoin,
      y: points.hem.y + sa + 15,
    })
  }

  if (paths.dart) {
    macro('vd', {
      id: 'hDart',
      from: points.endDart,
      to: points.startDart,
      x: points.endDart.x + sa + 15,
    })

    macro('ld', {
      id: 'pDartStart',
      from: points.dartTip,
      to: points.startDart,
      d: -sa - 15,
    })
    macro('ld', {
      id: 'pDartEnd',
      from: points.dartTip,
      to: points.endDart,
      d: sa + 15,
    })

    snippets.bustPoint = new Snippet('notch', points.bust)
  }

  return part
}

export const front = {
  name: 'tina.front',
  from: bibiFront,
  after: [back],
  measurements: ['hips', 'waist', 'seat', 'waistToSeat', 'bustSpan', 'hpsToBust'],
  hide: { from: true },
  options: {
    // Bibi specific, placed here as this is the earliest part that drafts the sideseam
    fitWaist: { bool: true, menu: 'fit', order: 'EBA' },
    waistEase: {
      pct: 5,
      min: -10,
      max: 20,
      menu: (settings, mergedOptions) => (mergedOptions.fitWaist ? 'fit' : false),
      order: 'EBB',
    },
    hipsEase: { pct: 5, min: -5, max: 50, menu: 'fit', order: 'ECA' },
    seatEase: { pct: 2, min: -5, max: 50, menu: 'fit', order: 'EDA' },
    chestEase: { pct: 10, min: -5, max: 25, menu: 'fit', order: 'EAB' },
    length: {
      dflt: 'seat',
      list: ['underbust', 'waist', 'hips', 'seat', 'knee', 'floor'],
      menu: 'style.length',
    },
    flare: {
      pct: 0,
      min: 0,
      max: 25,
      menu: (settings, mergedOptions) =>
        (mergedOptions.length === 'waist' && mergedOptions.lengthBonus > 0) ||
        mergedOptions.length === 'hips' ||
        mergedOptions.length === 'seat' ||
        mergedOptions.length === 'knee' ||
        mergedOptions.length === 'floor'
          ? 'style.length'
          : false,
    },
    backNeckCutout: { pct: 6, min: 2, max: 110, menu: 'style' },
    backNeckBend: { pct: 50, min: 0, max: 70, menu: 'style' },
    lengthBonus: { pct: 0, min: -30, max: 30, menu: 'style.length' },
    draftForHighBust: { bool: true, menu: 'fit' },
    // Brian overrides, placed here as this is the first loaded part that inherits from brian base
    s3Collar: 0,
    s3Armhole: 0,
    brianFitSleeve: true,
    brianFitCollar: false,
    bicepsEase: { pct: 5, min: 0, max: 50, menu: 'fit' },
    collarEase: 0,
    shoulderSlopeReduction: 0,
    sleeveWidthGuarantee: 0.85,
    frontArmholeDeeper: 0.01,
    legacyArmholeDepth: false,
    // Unused as legacyArmholeDepth is disabled, hide option in documentation
    armholeDepthFactor: 0.5,
    shoulderEase: { pct: 0, min: -2, max: 6, menu: 'fit' },

    frontCoverage: { pct: 70, min: -75, max: 95, menu: 'style' },
    frontEase: { pct: -6, min: -30, max: 0, menu: 'fit' },
    sideGathering: { pct: 0, min: 0, max: 50, menu: 'fit' },
    plotFitHelpers: { bool: false, menu: 'advanced' },
    splitFrontPart: { bool: true, menu: 'advanced' },
  },
  draft: tinaFront,
}
