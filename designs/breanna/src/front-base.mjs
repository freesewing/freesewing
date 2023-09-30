import { base } from './base.mjs'
import { back } from './back.mjs'

function draftBreannaFrontBase({
  points,
  Path,
  paths,
  Point,
  measurements,
  options,
  utils,
  store,
  part,
}) {
  // Fit neck
  points.cfHps = points.cbHps.clone()
  points.cfNeck = points.hps.rotate(-90, points.cfHps)
  if (options.breannaFitCollar) {
    let collarDelta = 0
    let front = 0
    let back = store.get('backCollarLength')
    let target = measurements.neck * (1 + options.collarEase)
    do {
      points.cfNeck = points.cfNeck.shift(90, collarDelta / 1.5)
      points.hpsCp2 = utils.beamIntersectsY(
        points.hps,
        points.hps.shiftTowards(points.shoulder, 10).rotate(-90, points.hps),
        points.cfNeck.y
      )
      front = new Path().move(points.hps).curve_(points.hpsCp2, points.cfNeck).length() * 2
      collarDelta = front + back - target
    } while (Math.abs(collarDelta) > 1)
  } else {
    points.hpsCp2 = utils.beamIntersectsY(
      points.hps,
      points.hps.shiftTowards(points.shoulder, 10).rotate(-90, points.hps),
      points.cfNeck.y
    )
  }

  // Armhole deeper at the front
  if (options.frontArmholeDeeper > 0) {
    for (let p of ['armholePitch', 'armholePitchCp1', 'armholePitchCp2'])
      points[p].x -= (measurements.shoulderToShoulder * options.frontArmholeDeeper) / 2
  }

  // Bust
  points.cfBust = new Point(0, measurements.hpsToBust * (1 + options.verticalEase))
  points.bustSide = new Point(
    (measurements.bustFront * (1 + options.chestEase)) / 2,
    points.cfBust.y
  )
  points.bustPoint = points.cfBust.shift(0, measurements.bustSpan / 2)

  // Work in room for bust from armhole pitch point down
  let bustDelta =
    (points.armhole.dx(points.bustSide) * points.armholePitch.dy(points.armhole)) /
    points.armholePitch.dy(points.bustSide)
  points.armhole = points.armhole.shift(0, bustDelta)

  // Adjust waist down to accomodate bust
  points.cfWaist = new Point(0, measurements.hpsToWaistFront * (1 + options.verticalEase))
  points.waist = utils.beamIntersectsY(points.armhole, points.bustSide, points.cfWaist.y)
  points.waist = points.armhole.shiftTowards(points.waist, store.get('backSideSeamLength'))

  // Remove waistDart from back
  for (let p of ['Center', 'Tip', 'Target', 'Left']) delete points['waistDart' + p]

  // Bust dart downwards, perpendicular to the waist line (which gets more and more slanted as breasts get bigger)
  points.primaryBustDartCenter = utils.beamsIntersect(
    points.cfWaist,
    points.waist,
    points.bustPoint,
    points.bustPoint.shift(points.cfWaist.angle(points.waist) + 90, 10)
  )
  // Let the bustdart run to the bustPoint (for now), that makes it easier to rotate it later
  points.primaryBustDartTip = points.bustPoint.clone()
  let waistDelta = 2 * points.cfWaist.dist(points.waist) - store.get('backWaistLength')
  points.primaryBustDart1 = points.primaryBustDartCenter.shiftTowards(
    points.cfWaist,
    waistDelta / 4
  )
  points.primaryBustDart2 = points.primaryBustDart1.rotate(180, points.primaryBustDartCenter)

  if (options.frontScyeDart) {
    // Now calculat the front scye dart (armhole dart) and rotate it into the bust dart
    // We're going to draw this dart midway the curve between armhole and armholePitch points
    // but we're not actually splitting the curve
    // Angle from bustpoint towards armhole and armholePitch
    let angle1 = points.bustPoint.angle(points.armhole)
    let angle2 = points.bustPoint.angle(points.armholePitch)
    let isectStart = points.bustPoint.shift(
      angle1 + (angle2 - angle1) / 2,
      measurements.highBustFront * 6.66
    )
    let isectEnd = isectStart.shiftFractionTowards(points.bustPoint, 2)
    points.scyeDart1 = utils.lineIntersectsCurve(
      isectStart,
      isectEnd,
      points.armhole,
      points.armholeCp2,
      points.armholePitchCp1,
      points.armholePitch
    )

    // How much should this dart be?
    let scyeDartWidth =
      (measurements.bustFront - measurements.highBustFront) * options.frontScyeDart
    points.scyeDart2 = points.scyeDart1
      .shiftTowards(points.bustPoint, scyeDartWidth)
      .rotate(90, points.scyeDart1)
    let scyeDartAngle =
      points.bustPoint.angle(points.scyeDart1) - points.bustPoint.angle(points.scyeDart2)
    // Now rotate this into the bust dart
    let rotateThese = ['armholeCp2', 'armhole', 'waist', 'primaryBustDart2']
    for (let p of rotateThese) points[p] = points[p].rotate(scyeDartAngle, points.bustPoint)
    // And rotate bust dart center halfway to keep it in the middle of the dart
    points.primaryBustDartCenter = points.primaryBustDartCenter.rotate(
      scyeDartAngle / 2,
      points.bustPoint
    )
  }
  // Store bust dart angle and armhole length
  store.set(
    'bustDartAngle',
    Math.abs(
      points.primaryBustDartTip.angle(points.primaryBustDart1) -
        points.primaryBustDartTip.angle(points.primaryBustDart2)
    )
  )
  store.set(
    'frontArmholeToArmholePitch',
    new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
      .length()
  )
  store.set(
    'frontArmholeLength',
    new Path()
      .move(points.armholePitch)
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
      .length() + store.get('frontArmholeToArmholePitch')
  )

  // This path is just for those who are curious as this part is hidden by default
  paths.seam = new Path()
    .move(points.cfNeck)
    .line(points.cfWaist)
    .line(points.primaryBustDart1)
    .line(points.bustPoint)
    .line(points.primaryBustDart2)
    .line(points.waist)
    .line(points.armhole)
    .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.hps)
    .curve_(points.hpsCp2, points.cfNeck)
    .close()

  return part
}

export const frontBase = {
  name: 'breanna.frontBase',
  hide: { self: true },
  from: base,
  after: back,
  draft: draftBreannaFrontBase,
}
