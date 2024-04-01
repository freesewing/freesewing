import { front as teaganFront } from '@freesewing/teagan'
import { hidePresets } from '@freesewing/core'
import { formatPercentage } from '@freesewing/shared/utils.mjs'

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
  measurements,
  macro,
  complete,
  part,
}) {
  // Hide Teagan paths
  for (let key of Object.keys(paths)) paths[key].hide()

  points.mirroredHem = new Point(-points.hem.x, points.hem.y)
  let sideOffset
  if (options.frontCoverage > 0) {
    sideOffset = points.hem.shiftFractionTowards(points.armhole, options.frontCoverage).y
    let intersection = paths.sideSeam.intersectsY(sideOffset)
    points.sideJoin = intersection.length > 0 ? intersection[0] : points.armhole
    points.mirroredSideJoin = new Point(-points.sideJoin.x, points.sideJoin.y)
    macro('mirror', {
      mirror: [new Point(0, 0), new Point(0, 100)],
      paths: ['sideSeam'],
      clone: true,
    })
    paths.mirroredSide = paths.mirroredSideSeam.split(points.mirroredSideJoin)[0].reverse().hide()
  } else {
    points.sideJoin = points.hem.shiftFractionTowards(points.cbHem, -options.frontCoverage)
    points.mirroredSideJoin = new Point(-points.sideJoin.x, points.sideJoin.y)
    paths.mirroredSide = new Path().move(points.mirroredSideJoin).line(points.cbHem).hide()
  }

  points.bust = new Point(measurements.bustSpan / 2, measurements.hpsToBust)
  points.mirroredBust = new Point(-measurements.bustSpan / 2, measurements.hpsToBust)
  points.cbSeat = new Point(0, points.cbWaist.y + measurements.waistToSeat)
  points.measureWaist = new Point(measurements.waist / 4, points.cbWaist.y)
  points.measureHips = new Point(measurements.hips / 4, points.cbHips.y)
  points.measureSeat = new Point(measurements.seat / 4, points.cbSeat.y)

  if (points.hem.y > points.measureHips.y) {
    paths.hipsToSeat = new Path()
      .move(points.measureHips)
      .line(points.measureSeat)
      .line(points.measureSeat.shift(-90, measurements.hpsToWaistBack * 10))
      .hide()
    let intersection = paths.hipsToSeat.intersectsY(points.hem.y)
    if (intersection.length > 0) {
      let intersectionPoint = intersection[0]
      if (complete && options.plotFitHelpers) {
        paths.hipsToSeatHint = new Path()
          .move(points.cbWaist)
          .line(points.waist)
          .move(points.measureWaist)
          .line(points.measureHips)
          .line(points.measureSeat)
          .attr('class', 'help')
      }
      let factorTooLarge = intersectionPoint.x / points.hem.x - 1
      if (factorTooLarge > 0) {
        store.flag.warn({
          msg: 'tina:seatMeasurement',
          replace: {
            pct: formatPercentage(factorTooLarge),
          },
        })
      }
    }
  }

  snippets.sideJoin = new Snippet('notch', points.sideJoin)
  snippets.mirroredSideJoin = new Snippet('notch', points.mirroredSideJoin)

  paths.hemBaseHalf = new Path().move(points.cbHem).line(points.hem).hide()

  if (options.frontCoverage > 0) {
    paths.hemBase = new Path().move(points.mirroredHem).line(points.hem).hide()
  } else {
    paths.hemBase = paths.hemBaseHalf
  }

  paths.tinaSaBase = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .hide()

  paths.tinaDiagonalSeam = new Path()
    .move(points.neck)
    .curve(points.neckCp2, points.neckCp2, points.mirroredSideJoin)
    .hide()

  const splitDist = sa ? sa * 4 : 40
  store.splitFrontPart =
    options.frontCoverage > 0 && points.hem.y - points.sideJoin.y > splitDist * 3

  if (store.splitFrontPart) {
    const splitOffset = sideOffset + splitDist
    points.cfSplit = new Point(0, splitOffset)

    let intersection = paths.sideSeam.intersectsY(splitOffset)
    points.sideSplit = intersection[0]
    points.mirroredSideSplit = new Point(-points.sideSplit.x, points.sideSplit.y)

    const sideSeamSplit = paths.sideSeam.split(points.sideSplit)
    paths.upperSide = sideSeamSplit[1].hide()
    paths.lowerSide = sideSeamSplit[0].hide()

    const mirroredSeamSplit = paths.mirroredSide.split(points.mirroredSideSplit)
    paths.mirroredUpperSide = mirroredSeamSplit[0].hide()
    paths.mirroredLowerSide = mirroredSeamSplit[1].hide()

    if (sa)
      paths.tinaSeamSa = paths.upperSide
        .offset(sa)
        .join(paths.tinaSaBase.offset(sa))
        .join(paths.tinaDiagonalSeam.offset(sa * 3))
        .join(paths.mirroredUpperSide.offset(sa))
        .join(new Path().move(points.mirroredSideSplit).line(points.sideSplit).offset(sa))
        .close()
        .attr('class', 'fabric sa')

    paths.tinaSeam = new Path()
      .move(points.sideSplit)
      .join(paths.upperSide)
      .join(paths.tinaSaBase)
      .join(paths.tinaDiagonalSeam)
      .join(paths.mirroredUpperSide)
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
      .line(points.cbHem)
      .close()
      .attr('class', 'fabric')
      .hide()

    if (sa) {
      const tmp1 = paths.hemBaseHalf.offset(sa * 3)
      const tmp2 = new Path().move(points.hem).join(paths.lowerSide).line(points.cfSplit).offset(sa)
      paths.tinaSeamBottomHalfSa = new Path()
        .move(points.cbHem)
        .join(tmp1)
        .join(tmp2)
        .line(points.cfSplit)
        .attr('class', 'fabric sa')
        .hide()
    }

    macro('grainline', {
      from: points.neck,
      to: new Point(points.neck.x, points.sideSplit.y),
    })
  } else {
    if (sa)
      paths.sa = paths.hemBase
        .offset(sa * 3)
        .join(paths.sideSeam.offset(sa))
        .join(paths.tinaSaBase.offset(sa))
        .join(paths.tinaDiagonalSeam.offset(sa * 3))
        .join(paths.mirroredSide.offset(sa * (options.frontCoverage > 0 ? 1 : 3)))
        .close()
        .attr('class', 'fabric sa')

    paths.tinaSeam = paths.hemBase
      .clone()
      .join(paths.sideSeam)
      .join(paths.tinaSaBase)
      .join(paths.tinaDiagonalSeam)
      .join(paths.mirroredSide)
      .close()
      .attr('class', 'fabric')

    macro('grainline', {
      from: points.bust,
      to: points.cfHem.shift(0, measurements.bustSpan / 2),
    })
  }

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
    .shiftFractionTowards(points.hem, options.lengthBonus / 4)
  points.logo = points.shoulderCp1.clone()
  snippets.logo = new Snippet('logo', points.logo)

  macro('rmCutOnFold', 'cutonfold')

  store.cutlist.setCut({ cut: 2, from: 'fabric', onFold: false })

  // Replace Teagan title
  macro('rmTitle', 'title')
  macro('title', { at: points.title, nr: 1, title: 'front' })

  return part
}

export const front = {
  name: 'tina.front',
  from: teaganFront,
  measurements: ['hips', 'waist', 'seat', 'waistToSeat', 'bustSpan', 'hpsToBust'],
  hide: hidePresets.HIDE_TREE,
  options: {
    bicepsEase: 0.05,
    shoulderEase: 0,
    collarEase: 0,
    shoulderSlopeReduction: 0,
    sleeveWidthGuarantee: 0.85,
    frontArmholeDeeper: 0.005,
    // Brian overrides
    chestEase: { pct: 0, min: -5, max: 25, menu: 'fit' },
    sleeveLength: { pct: 30, min: 20, max: 100, menu: 'fit' },
    lengthBonus: { pct: 5, min: -40, max: 200, menu: 'style' },
    backNeckCutout: { pct: 8, min: 4, max: 12, menu: 'fit' },
    // Teagan overrides
    draftForHighBust: { bool: true, menu: 'fit' },
    fitWaist: { bool: true, menu: 'fit' },
    waistEase: {
      pct: -3,
      min: -10,
      max: 20,
      menu: (settings, mergedOptions) => (mergedOptions.fitWaist ? 'fit' : false),
    },
    hipsEase: { pct: 0, min: -5, max: 50, menu: 'fit' },
    necklineBend: 0.3,
    necklineDepth: 0.3,
    // Tina specific
    frontCoverage: { pct: 30, min: -75, max: 95, menu: 'style' },
    plotFitHelpers: { bool: false, menu: 'advanced' },
  },
  draft: tinaFront,
}
