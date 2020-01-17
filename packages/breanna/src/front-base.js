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

  // Fit neck
  points.cfHps = points.cbHps.clone()
  points.cfNeck = points.hps.rotate(-90, points.cfHps)
  if (options.breannaFitCollar) {
    let collarDelta = 0
    let front = 0
    let back = store.get('backCollarLength')
    let target = measurements.neckCircumference * (1 + options.collarEase)
    do {
      points.cfNeck = points.cfNeck.shift(90, collarDelta / 1.5)
      points.hpsCp2 = utils.beamIntersectsY(
        points.hps,
        points.hps.shiftTowards(points.shoulder, 10).rotate(-90, points.hps),
        points.cfNeck.y
      )
      front =
        new Path()
          .move(points.hps)
          .curve_(points.hpsCp2, points.cfNeck)
          .length() * 2
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
    let deeper = (measurements.shoulderToShoulder * options.frontArmholeDeeper) / 2
    points.armholePitch = points.armholePitch.shift(180, deeper)
    points.armholePitchCp1 = points.armholePitch.shift(180, deeper)
    points.armholePitchCp2 = points.armholePitch.shift(180, deeper)
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
    (points.armhole.dx(points.bustSide) * points.armhole.dy(points.bustSide)) /
    points.armholePitch.dy(points.bustSide)
  points.armhole = points.armhole.shift(0, bustDelta)

  // Adjust waist down to accomodate bust
  points.cfWaist = new Point(
    0,
    measurements.hpsToHipsFront - (measurements.hpsToHipsBack - measurements.hpsToWaistBack)
  )
  points.waist = utils.beamIntersectsY(points.armhole, points.bustSide, points.cfWaist.y)
  points.waist = points.armhole.shiftTowards(points.waist, store.get('backSideSeamLength'))

  // Remove waistDart from back
  for (let p of ['Center', 'Tip', 'Target', 'Left']) delete points['waistDart' + p]

  // Bust dart towards waist
  points.primaryBustDartCenter = utils.beamIntersectsX(
    points.cfWaist,
    points.waist,
    points.bustPoint.x
  )
  // Let the bustdart run to the bustPoint (for now), that makes it easier to rotate it later
  points.primaryBustDartTip = points.bustPoint.clone()
  let waistDelta = 2 * points.cfWaist.dist(points.waist) - store.get('backWaistLength')
  points.primaryBustDart1 = points.primaryBustDartCenter.shiftTowards(
    points.cfWaist,
    waistDelta / 4
  )
  points.primaryBustDart2 = points.primaryBustDart1.rotate(180, points.primaryBustDartCenter)

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

  return part
}
