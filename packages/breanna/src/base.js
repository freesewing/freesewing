export default part => {
  let {
    sa,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    Point,
    measurements,
    options,
    utils,
    store
  } = part.shorthand()

  // Shoulder
  if (true) {
    points.cbHps = new Point(0, 0)
    // Step 1/3:  no vertical ease to make sure shoulder slope is not influenced
    points.cbWaist = new Point(0, measurements.hpsToWaistBack)
    points.cbHips = new Point(0, measurements.hpsToHipsBack)
    points.shoulder = utils
      .circlesIntersect(
        points.cbHps,
        measurements.shoulderToShoulder / 2,
        points.cbHips,
        measurements.shoulderSlope,
        'y'
      )
      .shift()
    // Step 2/3: add vertical ease to waist and hips
    points.cbWaist = new Point(0, measurements.hpsToWaistBack * (1 + options.verticalEase))
    points.cbHips = new Point(0, measurements.hpsToHipsBack * (1 + options.verticalEase))
  }

  // Neck
  points.cbNeck = points.cbHips.shift(90, measurements.centerBackNeckToHips)
  points.hps = new Point(
    (measurements.neckCircumference * (1 + options.collarEase)) / options.collarFactor,
    0
  )
  points.hpsCp2 = utils.beamIntersectsY(
    points.hps,
    points.hps.shiftTowards(points.shoulder, 10).rotate(-90, points.hps),
    points.cbNeck.y
  )
  points.waist = points.cbWaist.shift(0, (measurements.naturalWaist * (1 + options.waistEase)) / 4)

  // Step 3/3: Add shoulder ease to shoulder point
  points.shouder = points.hps.shiftOutwards(
    points.shoulder,
    (measurements.shoulderToShoulder * options.shoulderEase) / 2
  )

  // Armhhole
  points.armhole = new Point(
    ((measurements.highBust - measurements.highBustFront) * (1 + options.chestEase)) / 2,
    (points.shoulder.y + measurements.bicepsCircumference / 2) *
      options.armholeDepthFactor *
      (1 + options.verticalEase)
  )
  points.armholePitch = new Point(
    (measurements.shoulderToShoulder * options.acrossBackFactor * (1 + options.shoulderEase)) / 2,
    points.armhole.y / 2
  )
  points.armholeCp2 = utils.beamIntersectsX(
    points.armhole,
    points.armhole.shift(points.armhole.angle(points.waist) - 90, 10),
    points.armholePitch.x
  )
  points.shoulderCp1 = points.shoulder
    .shiftTowards(points.hps, points.shoulder.dist(points.armholePitch) / 5)
    .rotate(90, points.shoulder)
  points.armholePitchCp2 = points.armholePitch.shift(
    90,
    points.shoulder.dist(points.armholePitch) / 3
  )
  points.armholePitchCp1 = points.armholePitchCp2.rotate(180, points.armholePitch)

  return part
}
