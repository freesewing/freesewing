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

  // Shoulder dart
  if (options.shoulderDart) {
    points.shoulderDartCenter = points.hps.shiftFractionTowards(points.shoulder, 0.5)
    points.shoulderDartTarget = utils.beamIntersectsY(
      points.shoulderDartCenter,
      points.hps.rotate(90, points.shoulderDartCenter),
      points.armholePitch.y
    )
    points.shoulderDart2 = points.shoulderDartCenter.shiftFractionTowards(
      points.hps,
      options.shoulderDartSize
    )
    points.shoulderDart1 = points.shoulderDart1.rotate(180, points.shoulderDartCenter)
    points.shoulderDartTip = points.shoulderDartCenter.shiftFractionTowards(
      points.shoulderDartTarget,
      options.shoulderDartLength
    )
    points.shoulderDart1 = points.shoulderDart1.rotate(options.shoulderDartSize * 10, points.hps)
    points.shoulderDart2 = points.shoulderDart2.rotate(
      options.shoulderDartSize * -10,
      points.shoulder
    )
    let angle = points.hps.angle(points.shoulder)
    let extra = points.hps.dist(points.shoulder) - points.hps.dist(points.shoulderDart1) * 2
    points.shoulder = points.shoulder.shift(angle, extra)
    points.shoulderCp1 = points.shoulderCp1.shift(angle, extra)
    points.armholePitch = utils.beamIntersectsY(
      points.armholePitchCp1,
      points.shoulderCp1,
      points.armholePitch.y
    )
    points.armholePitchCp2 = points.armholePitchCp1.rotate(180, points.armholePitch)
  }

  // Waist dart
  if (options.waistDart) {
    points.waistDartCenter = points.cbWaist.shift(
      0,
      points.waist.x / 2 + points.waist.x * options.waistDartSize
    )
    points.waistDartTarget = new Point(points.waistDartCenter.x, points.armhole.y * 1.1)
    points.waistDartTip = points.waistDartCenter.shiftFractionTowards(
      points.waistDartTarget,
      options.waistDartLength
    )
    points.waistDart1 = points.waistDartCenter.shift(
      180,
      (points.waist.x * options.waistDartSize) / 2
    )
    points.waistDart2 = points.waistDart1.rotate(180, points.waistDartCenter)
    points.waist = points.waist.shift(0, points.waist.x * options.waistDartSize)
    points.waistDart1 = points.waistDart1.rotate(options.waistDartSize * -10, points.cbWaist)
    points.waistDart2 = points.waistDart2.rotate(options.waistDartSize * 10, points.waist)
  }

  // Paths
  paths.seam = new Path().move(points.cbNeck).line(points.cbWaist)
  if (options.waistDart) {
    paths.seam
      .line(points.waistDart1)
      .line(points.waistDartTip)
      .line(points.waistDart2)
  }
  paths.seam
    .line(points.waist)
    .line(points.armhole)
    .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
  if (options.shoulderDart) {
    paths.seam
      .line(points.shoulderDart2)
      .line(points.shoulderDartTip)
      .line(points.shoulderDart1)
  }
  paths.seam
    .line(points.hps)
    .curve_(points.hpsCp2, points.cbNeck)
    .close()
    .attr('class', 'fabric stroke-xl')

  // Store data
  if (options.shoulderDart) {
    store.set(
      'backShoulderSeamLength',
      points.hps.dist(points.shoulderDart1) + points.shoulder.dist(points.shoulderDart2)
    )
  } else {
    store.set('backShoulderSeamLength', points.hps.dist(points.shoulder))
  }
  if (options.waistDart) {
    store.set(
      'backWaistLength',
      2 * (points.cbWaist.dist(points.waistDart1) + points.waistDart2.dist(points.waist))
    )
  } else {
    store.set('backWaistLength', 2 * points.cbWaist.dist(points.waist))
  }
  store.set(
    'backArmholeLength',
    new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
      .length()
  )
  store.set('backSideSeamLength', points.armhole.dist(points.waist))
  store.set(
    'backCollarLength',
    new Path()
      .move(points.cbNeck)
      ._curve(points.hpsCp2, points.hps)
      .length() * 2
  )

  // Complete pattern?
  if (complete) {
    if (sa) {
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part
}
