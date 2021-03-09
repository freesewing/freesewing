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
    measurements,
    raise
  } = part.shorthand()

  // Get to work
  points.cbNeck = new Point(0, measurements.neck * options.backNeckCutout)
  points.hps = new Point(measurements.neck * options.neckWidthBack, 0)
  points.cbNeckCp1 = new Point(points.hps.x * 0.8, points.cbNeck.y)
  let slope = measurements.shoulderSlope * options.shoulderSlopeBack * -1
  points.shoulder = utils.beamsIntersect(
    new Point((measurements.shoulderToShoulder * options.shoulderToShoulderCorrection) / 2, 0),
    new Point((measurements.shoulderToShoulder * options.shoulderToShoulderCorrection) / 2, 100),
    points.hps,
    points.hps.shift(slope, 85)
  )
  points.armholePitch = new Point(
    points.shoulder.x * options.acrossBackFactor,
    measurements.hpsToWaistBack * options.backArmholePitchDepth
  )

  // Construct waist and dart
  points.dartTip = new Point(
    measurements.underbust * options.backDartLocation,
    measurements.hpsToWaistBack * options.backDartHeight
  )
  let backWidth = (measurements.underbust / 4) * (1 + options.chestEase)
  let waistWidth = (measurements.waistBack / 2) * (1 + options.waistEase)
  let reduction = backWidth - waistWidth
  points.cbWaist = new Point(0, measurements.hpsToWaistBack)
  points.waistCenter = points.cbWaist.shift(0, reduction * options.backCenterWaistReduction)
  points.waistSide = points.waistCenter.shift(
    options.backHemSlope,
    waistWidth + reduction * (1 - options.backCenterWaistReduction / 2)
  )
  points.dartBottomCenter = utils.beamIntersectsX(
    points.waistCenter,
    points.waistSide,
    points.dartTip.x
  )
  points.dartBottomLeft = points.dartBottomCenter.shift(
    180,
    (reduction * (1 - options.backCenterWaistReduction * 0.5)) / 2
  )
  points.dartBottomRight = points.dartBottomLeft.rotate(180, points.dartBottomCenter)
  points.dartLeftCp = points.dartBottomLeft.shift(90, points.dartTip.dy(points.dartBottomLeft) / 2)
  points.dartRightCp = new Point(points.dartBottomRight.x, points.dartLeftCp.y)
  // Find out location of the armhole
  let armholeDepth = measurements.hpsToWaistBack * options.armholeDepth + points.shoulder.y
  points.cbNeckCp2 = new Point(0, armholeDepth)
  // Does dart pass armhole depth?
  let dartArmholeDepth = utils.curveIntersectsY(
    points.dartBottomLeft,
    points.dartLeftCp,
    points.dartTip,
    points.dartTip,
    armholeDepth
  )
  let extra = 0
  points.cbArmhole = utils.curveIntersectsY(
    points.cbNeck,
    points.cbNeckCp2,
    points.waistCenter,
    points.waistCenter,
    armholeDepth
  )
  if (dartArmholeDepth) {
    points.dartLeftArmhole = dartArmholeDepth
    extra = points.dartLeftArmhole.dx(points.dartTip) * 2 + points.cbArmhole.x
  }
  points.armhole = new Point(
    (measurements.underbust / 4) * (1 + options.chestEase) + extra,
    armholeDepth
  )

  // Control points for the side seam
  points.waistSideCp2 = points.waistSide.shift(90, points.armhole.dy(points.waistSide) / 2)

  // Construct armhole
  points.armholeCp2 = points.armhole.shift(180 - options.backArmholeSlant, 40)
  points.armholePitchCp1 = points.armholePitch.shift(-90 - options.backArmholeSlant, 40)
  points.armholeCpTarget = utils.beamsIntersect(
    points.armhole,
    points.armhole.shift(180 - options.backArmholeSlant, 40),
    points.armholePitch,
    points.armholePitch.shift(-90 - options.backArmholeSlant, 40)
  )
  points.armholeCp2 = points.armhole.shiftFractionTowards(
    points.armholeCpTarget,
    options.backArmholeCurvature
  )
  points.armholePitchCp1 = points.armholePitch.shiftFractionTowards(
    points.armholeCpTarget,
    options.backArmholeCurvature
  )
  points.armholePitchCp2 = points.armholePitchCp1.rotate(180, points.armholePitch)

  // Store the back width at bust level
  points.bustSide = utils.curveIntersectsY(
    points.waistSide,
    points.waistSideCp2,
    points.armhole,
    points.armhole,
    measurements.hpsToBust
  )
  if (!points.bustSide) raise.error('Could not find bust height in side seam of back part')
  points.bustCenter = utils.curveIntersectsY(
    points.cbNeck,
    points.cbNeckCp2,
    points.waistCenter,
    points.waistCenter,
    measurements.hpsToBust
  )
  if (!points.bustCenter) raise.error('Could not find bust height in center seam of back part')
  points.bustDartLeft = utils.curveIntersectsY(
    points.dartBottomLeft,
    points.dartLeftCp,
    points.dartTip,
    points.dartTip,
    measurements.hpsToBust
  )
  if (!points.bustDartLeft) raise.error('Could not find bust height in back dart')
  points.bustDartRight = points.bustDartLeft.flipX(points.dartTip)
  store.set(
    'bustWidthBack',
    points.bustCenter.dx(points.bustDartLeft) + points.bustDartRight.dx(points.bustSide)
  )

  // Store things we'll need in the front parts
  store.set(
    'sideSeamLength',
    new Path().move(points.waistSide).curve_(points.waistSideCp2, points.armhole).length()
  )
  store.set(
    'backHemLength',
    points.waistCenter.dist(points.dartBottomLeft) + points.dartBottomRight.dist(points.waistSide)
  )
  store.set('sideReduction', points.armhole.x - points.waistSide.x)

  paths.seam = new Path()
    .move(points.cbNeck)
    .curve_(points.cbNeckCp2, points.waistCenter)
    .line(points.dartBottomLeft)
    .curve_(points.dartLeftCp, points.dartTip)
    ._curve(points.dartRightCp, points.dartBottomRight)
    .line(points.waistSide)
    .curve_(points.waistSideCp2, points.armhole)
    .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
    .curve_(points.armholePitchCp2, points.shoulder)
    .line(points.hps)
    ._curve(points.cbNeckCp1, points.cbNeck)
    .close()
    .attr('class', 'fabric')
  paths.saBase = new Path()
    .move(points.cbNeck)
    .curve_(points.cbNeckCp2, points.waistCenter)
    .line(points.dartBottomLeft)
    .line(points.dartBottomRight)
    .line(points.waistSide)
    .curve_(points.waistSideCp2, points.armhole)
    .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
    .curve_(points.armholePitchCp2, points.shoulder)
    .line(points.hps)
    ._curve(points.cbNeckCp1, points.cbNeck)
    .close()
    .setRender(false)

  if (complete) {
    points.titleAnchor = new Point(points.hps.x, points.armholePitchCp2.y)
    macro('title', {
      nr: 2,
      title: 'back',
      at: points.titleAnchor
    })
    macro('grainline', {
      from: new Point(points.hps.x / 2, points.shoulder.y),
      to: new Point(points.hps.x / 2, points.waistSide.y)
    })
    macro('sprinkle', {
      snippet: 'bnotch',
      on: ['armholePitch', 'bustCenter']
    })

    if (sa) paths.sa = paths.saBase.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('vd', {
        from: points.waistCenter,
        to: points.dartTip,
        x: points.cbNeck.x - sa - 15
      })
      macro('vd', {
        from: points.waistCenter,
        to: points.cbNeck,
        x: points.cbNeck.x - sa - 30
      })
      macro('vd', {
        from: points.waistCenter,
        to: points.hps,
        x: points.cbNeck.x - sa - 45
      })
      macro('hd', {
        from: points.cbNeck,
        to: points.waistCenter,
        y: points.waistCenter.y + sa + 15
      })
      macro('hd', {
        from: points.cbNeck,
        to: points.dartBottomLeft,
        y: points.waistCenter.y + sa + 30
      })
      macro('hd', {
        from: points.cbNeck,
        to: points.dartBottomRight,
        y: points.waistCenter.y + sa + 45
      })
      macro('hd', {
        from: points.dartBottomLeft,
        to: points.dartBottomRight,
        y: points.waistCenter.y + sa + 15
      })
      macro('hd', {
        from: points.cbNeck,
        to: points.waistSide,
        y: points.waistCenter.y + sa + 60
      })
      macro('hd', {
        from: points.cbNeck,
        to: points.armhole,
        y: points.waistCenter.y + sa + 75
      })
      macro('vd', {
        from: points.waistSide,
        to: points.armhole,
        x: points.armhole.x + sa + 15
      })
      macro('vd', {
        from: points.waistSide,
        to: points.armholePitch,
        x: points.armhole.x + sa + 30
      })
      macro('vd', {
        from: points.waistSide,
        to: points.shoulder,
        x: points.armhole.x + sa + 45
      })
      macro('vd', {
        from: points.waistSide,
        to: points.hps,
        x: points.armhole.x + sa + 60
      })
      macro('vd', {
        from: points.waistCenter,
        to: points.waistSide,
        x: points.waistSide.x + sa + 15
      })
      macro('hd', {
        from: points.cbNeck,
        to: points.hps,
        y: points.hps.y - sa - 15
      })
      macro('hd', {
        from: points.cbNeck,
        to: points.armholePitch,
        y: points.hps.y - sa - 30
      })
      macro('hd', {
        from: points.cbNeck,
        to: points.shoulder,
        y: points.hps.y - sa - 45
      })
      macro('hd', {
        from: points.cbNeck,
        to: points.armhole,
        y: points.hps.y - sa - 60
      })
    }
  }

  return part
}
