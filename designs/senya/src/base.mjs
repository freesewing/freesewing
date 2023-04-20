import { pluginBundle } from '@freesewing/plugin-bundle'
import { withCondition as bustPlugin } from '@freesewing/plugin-bust'
import { waistlineHeight } from './shared.mjs'

function infinitelyHigh(xCoordinate, Point) {
  return new Point(xCoordinate, -100)
}

function infinitelyLow(xCoordinate, Point) {
  return new Point(xCoordinate, 100)
}

function halfway(measurement, ease) {
  return measurement / 2 + ease
}

function notHigherThan(a, b, Point) {
  if (a.y < b.y) {
    return new Point(a.x, b.y)
  }
  return a
}

function pointAtX(x, point, Point) {
  return new Point(x, point.y)
}

function centerBack(measurements, options, Point) {
  var hps = new Point(0, 0)
  var neck = new Point(0, options.backNeckCutout * measurements.neck)
  var waistline = new Point(
    0,
    waistlineHeight(
      measurements.waistToUnderbust,
      measurements.hpsToWaistBack,
      options.lowerWaistline
    )
  )
  return {
    hps,
    neck,
    waistline,
  }
}

function shoulderEase(measurements, options) {
  return (measurements.shoulderToShoulder * options.shoulderEase) / 2
}

function neckPoint(measurements, options, Point) {
  return new Point((measurements.neck * (1 + options.collarEase)) / options.collarFactor, 0)
}

function shoulder(hps, slope, width, ease, utils, Point) {
  return utils.beamsIntersect(
    hps,
    hps.shift(slope * -1, 100),
    infinitelyHigh(halfway(width, ease), Point),
    infinitelyLow(halfway(width, ease), Point)
  )
}

function armhole(shoulderY, measurements, options, Point) {
  return new Point(
    0,
    shoulderY + measurements.biceps * (1 + options.bicepsEase) * options.armholeDepthFactor
  )
}

function adjustShoulderSlope(shoulder, centerBackHps, slopeReduction) {
  shoulder.y -= (shoulder.y - centerBackHps.y) * slopeReduction
}

function halfwidth(chest, chestEase) {
  return (chest * (1 + chestEase)) / 4
}

function fitCollar(neckCircumverence, collarEase, neck, neckCp2, cbNeck, utils, Point, Path) {
  let cf = neck.rotate(-90, new Point(0, 0))
  let target = neckCircumverence * (1 + collarEase)
  let delta = 0
  let run = 0
  do {
    run++
    cf = cf.shift(90, delta / 3)
    // frontNeckCpEdge aux
    let frontNeckCpEdge = utils.beamsIntersect(neck, neckCp2, cf, new Point(20, cf.y))
    // cfNeckCp1 needed
    var cfCp1 = cf.shiftFractionTowards(frontNeckCpEdge, 0.55)
    // neckCp1Front needed
    var cp2Front = neck.shiftFractionTowards(frontNeckCpEdge, 0.65)
    let neckOpening = new Path()
      .move(cf)
      .curve(cfCp1, cp2Front, neck)
      .curve(neckCp2, cbNeck, cbNeck)
      .attr('class', 'dashed stroke-xl various')
    delta = neckOpening.length() * 2 - target
  } while (Math.abs(delta) > 1 && run < 10)
  return {
    cf,
    cfCp1,
    cp2Front,
  }
}

function draftSenyaBase({
  measurements,
  options,
  store,
  points,
  Point,
  Path,
  utils,
  macro,
  part,
  log,
}) {
  let shoulderEaseValue = shoulderEase(measurements, options)
  store.set('shoulderEase', shoulderEaseValue)

  // Center back (cb) vertical axis
  let centerBackPoint = centerBack(measurements, options, Point)
  points.cbHps = centerBackPoint.hps
  points.cbNeck = centerBackPoint.neck
  points.cbWaistline = centerBackPoint.waistline

  // Shoulder line
  points.neck = neckPoint(measurements, options, Point)
  points.hps = points.neck.clone() // We started using HPS in many measurements
  // Shoulder point using shoulderSlope degree measurement
  points.shoulder = shoulder(
    points.hps,
    measurements.shoulderSlope,
    measurements.shoulderToShoulder,
    shoulderEaseValue,
    utils,
    Point
  )
  // Determine armhole depth and cbShoulder independent of shoulder slope reduction
  points.cbShoulder = new Point(0, points.shoulder.y)
  points.cbArmhole = armhole(points.shoulder.y, measurements, options, Point)

  // Now take shoulder slope reduction into account
  adjustShoulderSlope(points.shoulder, points.cbHps, options.shoulderSlopeReduction)
  // Shoulder should never be higher than HPS
  points.shoulder = notHigherThan(points.shoulder, points.cbHps)

  // Side back (cb) vertical axis
  let chestWidth = halfwidth(measurements.chest, options.chestEase)
  points.armhole = pointAtX(chestWidth, points.cbArmhole, Point)
  let waistlineWidth = measurements.underbust / 4
  points.waistline = pointAtX(waistlineWidth, points.cbWaistline, Point)

  // Neck opening (back)
  let weirdNeckPoint = points.neck.shiftTowards(points.shoulder, 10).rotate(-90, points.neck)
  points.neckCp2 = utils.beamIntersectsY(points.neck, weirdNeckPoint, points.cbNeck.y)

  // Fit collar
  let collarPoints = fitCollar(
    measurements.neck,
    options.collarEase,
    points.neck,
    points.neckCp2,
    points.cbNeck,
    utils,
    Point,
    Path
  )
  points.cfNeck = collarPoints.cf
  points.cfNeckCp1 = collarPoints.cfCp1
  points.neckCp2Front = collarPoints.cp2Front

  // Anchor point for sampling
  points.gridAnchor = points.cbWaistline

  // Add points needed for the mirrored front&back neck/armhole path
  macro('mirror', {
    mirror: [points.hps, points.shoulder],
    points: [points.neckCp2Front, points.cfNeckCp1, points.cfNeck, points.cbNeck, points.neckCp2],
    clone: true,
  })

  // How much space do we have to work with here?
  store.set('s3CollarMaxFront', points.hps.dy(points.cfNeck) / 2)
  store.set('s3CollarMaxBack', points.hps.dy(points.cbNeck) / 2)
  // Let's leave the actual splitting the curves for the front/back parts

  log.info(`base prepared`)
  return part
}

export const base = {
  name: 'senya.base',
  hide: { self: true },
  measurements: [
    'biceps',
    'chest',
    'hpsToWaistBack',
    'neck',
    'shoulderToShoulder',
    'shoulderSlope',
    'underbust',
    'waistToUnderbust',
  ],
  options: {
    // Static
    collarFactor: 4.8,
    bicepsEase: 0.05,
    collarEase: 0,
    shoulderEase: 0,
    shoulderSlopeReduction: 0,
    // Fit
    chestEase: { pct: 12, min: 5, max: 25, menu: 'fit' },
    backNeckCutout: { pct: 8, min: 4, max: 12, menu: 'fit' },
    lowerWaistline: { pct: 10, min: 0, max: 20, menu: 'fit' },
    // Advanced
    armholeDepthFactor: { pct: 55, min: 50, max: 70, menu: 'advanced' },
  },
  plugins: [pluginBundle, bustPlugin],
  draft: draftSenyaBase,
}
