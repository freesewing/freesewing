export default function (part) {
  let {
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    complete,
    paperless,
    macro,
    utils,
    units,
    measurements,
    Snippet,
    snippets
  } = part.shorthand()

  // Add original outline
  points.origin = new Point(0, 0)
  snippets.base = new Snippet('bella-front-side-dart', points.origin)

  // Diagonal line to make sure the original outline isn't cropped
  points.a = new Point(0, 0)
  points.b = new Point(290, 450)
  paths.diag = new Path().move(points.a).line(points.b).attr('class', 'hidden')

  // Get to work
  points.cfNeck = new Point(0, measurements.neck * options.collarFactor)
  points.hps = new Point(measurements.neck * options.neckWidthFront, 0)
  points.cfNeckCp1 = new Point(points.hps.x * 0.8, points.cfNeck.y)
  points.hpsCp2 = new Point(points.hps.x, points.cfNeck.y / 2)
  let slope = measurements.shoulderSlope * (2 - options.shoulderSlopeBack) * -1
  let xShoulder =
    ((measurements.shoulderToShoulder * options.shoulderToShoulderCorrection) / 2) *
    options.frontShoulderWidth
  points.shoulder = utils.beamsIntersect(
    new Point(xShoulder, 0),
    new Point(xShoulder, 100),
    points.hps,
    points.hps.shift(slope, 85)
  )
  // Front is more narrow
  points.ex = points.shoulder.shift(180, 10)
  points.armholePitch = new Point(
    points.shoulder.x * options.acrossBackFactor,
    measurements.hpsToWaistBack * options.frontArmholePitchDepth
  )
  // Find out location of the armhole
  let armholeDepth = measurements.hpsToWaistBack * options.armholeDepth + points.shoulder.y
  points.armhole = new Point(
    (measurements.highBust / 4) * (1 + options.chestEase) * options.highBustWidth,
    armholeDepth
  )

  // Bust point
  points.bust = new Point(measurements.bustSpan / 2, measurements.hpsToBust)

  // Construct armhole
  points.armholeCp2 = points.armhole.shift(180, 40)
  points.armholePitchCp1 = points.armholePitch.shift(-90, 40)
  points.armholeCpTarget = utils.beamsIntersect(
    points.armhole,
    points.armhole.shift(180, 40),
    points.armholePitch,
    points.armholePitch.shift(-90, 40)
  )
  points.armholeCp2 = points.armhole.shiftFractionTowards(
    points.armholeCpTarget,
    options.frontArmholeCurvature
  )
  points.armholePitchCp1 = points.armholePitch.shiftFractionTowards(
    points.armholeCpTarget,
    options.frontArmholeCurvature
  )
  points.armholePitchCp2 = points.armholePitchCp1.rotate(180, points.armholePitch)

  // Draft body without breasts
  points.cfHem = new Point(0, measurements.hpsToWaistFront)
  points.sideHem = new Point(points.armhole.x, points.cfHem.y)

  // Create room for breasts
  // How much horizontal room do we need to add?
  let target =
    (measurements.chest * (1 + options.chestEase - options.fullChestEaseReduction)) / 2 -
    store.get('bustWidthBack')
  let rot = ['armhole', 'armholeCp2', 'armholePitchCp1', 'bustB', 'sideHem']
  // Rotate until we've got enough room
  points.bustA = points.bust.clone()
  points.bustB = points.bust.clone()
  points.bustSide = utils.beamIntersectsY(points.armhole, points.sideHem, points.bust.y)
  let steps = 0
  let angle = 0
  let increment = 0.5
  while (points.bustSide.x < target && steps < 80) {
    for (const p of rot) points[p] = points[p].rotate(increment, points.armholePitch)
    angle += increment
    points.bustSide = utils.beamIntersectsY(points.armhole, points.sideHem, points.bust.y)
    steps++
  }
  store.set('bustDartAngleSide', angle)

  // Smooth out the armhole pitch point
  points.pitchMax = utils.beamsIntersect(
    points.armholePitchCp1,
    points.armholePitchCp2,
    points.armholePitch,
    points.armholePitch.shift(points.armholePitchCp1.angle(points.armholePitchCp2) - 90, 30)
  )
  points.armholePitch = points.armholePitch.shiftFractionTowards(points.pitchMax, 0.2)
  points.armholePitchCp1 = points.armholePitch.shiftFractionTowards(
    points.armholePitchCp2.rotate(180, points.armholePitch),
    0.8
  )

  // Bust dart
  points.bustDartTop = utils.beamsIntersect(
    points.armhole,
    points.sideHem,
    points.bust,
    points.bust.shift(0, 100)
  )
  points.bustDartBottom = points.bustDartTop.rotate(angle * -1, points.bust)
  points.bustDartTip = points.bustDartTop.shiftFractionTowards(points.bust, options.bustDartLength)

  // Side seam length
  let aboveDart = points.armhole.dist(points.bustDartTop)
  let belowDart = store.get('sideSeamLength') - aboveDart
  points.sideHemInitial = points.bustDartBottom
    .shift(-90, belowDart)
    .shift(180, store.get('sideReduction'))
  points.sideHem = points.bustDartBottom.shiftTowards(points.sideHemInitial, belowDart)

  // Hem
  let hemLen = (measurements.waist / 2) * (1 + options.waistEase) - store.get('backHemLength')
  let reduce = points.cfHem.dist(points.sideHemInitial) - hemLen

  // Waist dart
  points.waistDartHem = new Point(points.bustDartTip.x, points.cfHem.y)
  points.waistDartLeft = points.waistDartHem.shift(180, reduce / 2)
  points.waistDartRight = points.waistDartHem.shift(0, reduce / 2)
  points.waistDartTip = points.waistDartHem.shiftFractionTowards(
    points.bustDartTip,
    options.bustDartLength
  )
  points.waistDartLeftCp = points.waistDartLeft.shift(
    90,
    points.waistDartHem.dist(points.bustDartTip) / 2
  )
  points.waistDartRightCp = points.waistDartRight.shift(
    90,
    points.waistDartHem.dist(points.bustDartTip) / 2
  )

  points.f = new Point(0, 445.5)
  points.g = new Point(95, 451)
  points.h = new Point(144, 451)
  points.i = new Point(258, 443)
  points.i = new Point(0, 260)
  points.j = new Point(274, 260)

  paths.saBase = new Path()
    .move(points.cfHem)
    .line(points.waistDartLeft)
    .curve_(points.waistDartLeftCp, points.waistDartTip)
    ._curve(points.waistDartRightCp, points.waistDartRight)
    .line(points.sideHem)
    .line(points.bustDartBottom)
    .line(points.bustDartTip)
    .line(points.bustDartTop)
    .line(points.armhole)
    .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
    .curve_(points.armholePitchCp2, points.shoulder)
    .line(points.hps)
    .curve(points.hpsCp2, points.cfNeckCp1, points.cfNeck)
    .line(points.cfHem)
    .attr('class', 'fabric')

  return part
}
