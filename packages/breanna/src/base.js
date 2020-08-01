export default (part) => {
  let { store, points, Point, measurements, options, utils } = part.shorthand()

  // HPS
  points.hps = new Point((measurements.neck * (1 + options.collarEase)) / options.collarFactor, 0)

  // Shoulder point using shoulderSlope degree measurement
  store.set('shoulderEase', (measurements.shoulderToShoulder * options.shoulderEase) / 2)
  points.shoulder = utils.beamsIntersect(
    points.hps,
    points.hps.shift(measurements.shoulderSlope * -1, 100),
    new Point(measurements.shoulderToShoulder / 2 + store.get('shoulderEase'), -100),
    new Point(measurements.shoulderToShoulder / 2 + store.get('shoulderEase'), 100)
  )

  // Center back axis
  points.cbHps = new Point(0, 0)
  points.cbNeck = new Point(0, options.backNeckCutout * measurements.neck)
  points.cbWaist = new Point(0, measurements.hpsToWaistBack * (1 + options.verticalEase))
  points.cbHips = new Point(
    0,
    (measurements.hpsToWaistBack + measurements.waistToHips) * (1 + options.verticalEase)
  )

  // Now take shoulder slope reduction into account
  points.shoulder.y -= (points.shoulder.y - points.cbHps.y) * options.shoulderSlopeReduction
  // Shoulder should never be higher than HPS
  if (points.shoulder.y < points.cbHps.y) points.shoulder = new Point(points.shoulder.x, 0)
  points.shoulderNoEase = points.shoulder.clone()

  // Neckline control point
  points.hpsCp2 = utils.beamIntersectsY(
    points.hps,
    points.hps.shiftTowards(points.shoulder, 10).rotate(-90, points.hps),
    points.cbNeck.y
  )

  // Waist at side seam
  points.waist = points.cbWaist.shift(0, (measurements.waist * (1 + options.waistEase)) / 4)

  // Armhhole
  points.armhole = new Point(
    ((measurements.highBust - measurements.highBustFront) * (1 + options.chestEase)) / 2,
    (points.shoulder.y + measurements.biceps * options.armholeDepthBase) *
      options.armholeDepthFactor *
      (1 + options.verticalEase) *
      (1 + options.bicepsEase)
  )
  points.armholePitch = new Point(
    points.shoulder.x * options.acrossBackFactor,
    points.armhole.y / 2
  )
  points.armholeCp2 = utils.beamIntersectsX(
    points.armhole,
    points.armhole.shift(points.armhole.angle(points.waist) - 90, 10),
    points.armholePitch.x
  )
  points.shoulderCp1 = points.shoulder
    .shiftTowards(points.hps, points.shoulder.dist(points.armholePitch) / 8)
    .rotate(90, points.shoulder)
  points.armholePitchCp2 = points.armholePitch.shift(
    90,
    points.shoulder.dist(points.armholePitch) / 3
  )
  points.armholePitchCp1 = points.armholePitchCp2.rotate(180, points.armholePitch)

  return part
}
