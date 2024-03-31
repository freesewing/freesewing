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
  if (options.frontCoverage > 0) {
    const sideOffset = points.hem.shiftFractionTowards(points.armhole, options.frontCoverage).y
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

  if (options.frontCoverage > 0) {
    paths.hemBase = new Path().move(points.mirroredHem).line(points.hem).hide()
  } else {
    paths.hemBase = new Path().move(points.cbHem).line(points.hem).hide()
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

  if (sa)
    paths.sa = paths.hemBase
      .offset(sa * 2)
      .join(paths.sideSeam.offset(sa))
      .join(paths.tinaSaBase.offset(sa))
      .join(paths.tinaDiagonalSeam.offset(sa * 2))
      .join(paths.mirroredSide.offset(sa * (options.frontCoverage > 0 ? 1 : 2)))
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

  if (options.plotFitHelpers) {
    snippets.bustPoint = new Snippet('notch', points.bust)
    snippets.mirroredBustPoint = new Snippet('notch', points.mirroredBust)

    macro('mirror', {
      mirror: [new Point(0, 0), new Point(0, 100)],
      paths: ['tinaSeam'],
      clone: true,
    })

    paths.mirroredTinaSeam.attr('class', 'dotted stroke-xs')
  }

  macro('rmCutOnFold', 'cutonfold')

  macro('grainline', {
    from: points.bust,
    to: points.cfHem.shift(0, measurements.bustSpan / 2),
  })

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
    frontCoverage: { pct: 30, min: -75, max: 100, menu: 'style' },
    plotFitHelpers: { bool: false, menu: 'advanced' },
  },
  draft: tinaFront,
}
