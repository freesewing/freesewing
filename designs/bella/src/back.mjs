import { pluginBundle } from '@freesewing/plugin-bundle'

export const back = {
  name: 'bella.back',
  measurements: [
    'highBust',
    'chest',
    'underbust',
    'waist',
    'waistBack',
    'bustSpan',
    'neck',
    'hpsToBust',
    'hpsToWaistFront',
    'hpsToWaistBack',
    'shoulderToShoulder',
    'shoulderSlope',
  ],
  options: {
    // Static
    acrossBackFactor: 0.925,
    shoulderSlopeBack: 1.23,
    neckWidthBack: 0.197,
    neckWidthFront: 0.17,
    backDartLocation: 0.145,
    backCenterWaistReduction: 0.35,
    collarFactor: 0.19,
    // Fit
    bustSpanEase: { pct: 10, min: 0, max: 20, menu: 'fit' },
    chestEase: { pct: 11, min: 5, max: 20, menu: 'fit' },
    fullChestEaseReduction: { pct: 4, min: 0, max: 8, menu: 'fit' },
    shoulderToShoulderEase: { pct: -0.5, min: -1, max: 5, menu: 'fit' },
    waistEase: { pct: 5, min: 1, max: 20, menu: 'fit' },
    // Darts
    backDartHeight: { pct: 46, min: 38, max: 54, menu: 'darts' },
    bustDartCurve: { pct: 100, min: 0, max: 100, menu: 'darts' },
    bustDartLength: { pct: 90, min: 75, max: 100, menu: 'darts' },
    waistDartLength: { pct: 90, min: 75, max: 95, menu: 'darts' },
    // Armhole
    armholeDepth: { pct: 44, min: 38, max: 46, menu: 'armhole' },
    backArmholeCurvature: { pct: 63, min: 50, max: 85, menu: 'armhole' },
    backArmholePitchDepth: { pct: 35, max: 40, min: 30, menu: 'armhole' },
    backArmholeSlant: { deg: 5, min: 1, max: 9, menu: 'armhole' },
    frontArmholeCurvature: { pct: 63, min: 50, max: 85, menu: 'armhole' },
    frontArmholePitchDepth: { pct: 29, max: 31, min: 27, menu: 'armhole' },
    // Advanced
    backHemSlope: { deg: 2.5, min: 0, max: 5, menu: 'advanced' },
    backNeckCutout: { pct: 6, min: 3, max: 9, menu: 'advanced' },
    frontShoulderWidth: { pct: 95, max: 98, min: 92, menu: 'advanced' },
    highBustWidth: { pct: 86, max: 92, min: 80, menu: 'advanced' },
  },
  plugins: [pluginBundle],
  draft: ({
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
    log,
    part,
  }) => {
    let adjustment_warning = false

    // Get to work
    points.cbNeck = new Point(0, measurements.neck * options.backNeckCutout)
    points.hps = new Point(measurements.neck * options.neckWidthBack, 0)
    points.cbNeckCp1 = new Point(points.hps.x * 0.8, points.cbNeck.y)
    let slope = measurements.shoulderSlope * options.shoulderSlopeBack * -1
    points.shoulder = utils.beamsIntersect(
      new Point((measurements.shoulderToShoulder * (1 + options.shoulderToShoulderEase)) / 2, 0),
      new Point((measurements.shoulderToShoulder * (1 + options.shoulderToShoulderEase)) / 2, 100),
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
    let backDartWidth = reduction * (1 - options.backCenterWaistReduction * 0.5)
    if (backDartWidth <= 0) {
      backDartWidth = 0
      log.info(
        '`' +
          part.name +
          '`: Back dart omitted (because the calculated dart width was 0.0 mm/inches or less).'
      )
    }
    points.dartBottomLeft = points.dartBottomCenter.shift(180, backDartWidth / 2)
    points.dartBottomRight = points.dartBottomLeft.rotate(180, points.dartBottomCenter)
    points.dartLeftCp = points.dartBottomLeft.shift(
      90,
      points.dartTip.dy(points.dartBottomLeft) / 2
    )
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
    // Dolls need clothes too
    if (points.armholePitchCp2.y < points.shoulder.y) {
      points.armholePitchCp2.y = points.shoulder.y + points.shoulder.dy(points.armholePitch) / 2
    }

    // Store the back width at bust level
    if (measurements.hpsToBust < points.waistCenter.y) {
      points.bustCenter = utils.curveIntersectsY(
        points.cbNeck,
        points.cbNeckCp2,
        points.waistCenter,
        points.waistCenter,
        measurements.hpsToBust
      )
    } else {
      log.warning(
        'Unable to place bust above waist on center back seam. Using waist height instead.'
      )
      adjustment_warning = true
      points.bustCenter = points.waistCenter.clone()
    }
    if (points.bustCenter.y < points.armhole.y) {
      points.sideArmhole = points.armhole.clone()
      let sideArmholeTemp = new Path()
        .move(points.armhole)
        .curve(points.armhole, points.waistSideCp2, points.waistSide)
        .shiftAlong(10)
      points.sideArmhole = sideArmholeTemp.shiftOutwards(points.armhole, 100)
      points.bustSide = utils.beamIntersectsY(
        points.armhole,
        points.sideArmhole,
        measurements.hpsToBust
      )
    } else if (measurements.hpsToBust < points.waistSide.y) {
      points.bustSide = utils.curveIntersectsY(
        points.waistSide,
        points.waistSideCp2,
        points.armhole,
        points.armhole,
        measurements.hpsToBust
      )
    } else {
      log.warning('Unable to place bust above waist on side back seam. Using waist height instead.')
      adjustment_warning = true
      points.bustSide = points.waistSide.clone()
    }
    if (points.bustCenter.y < points.dartTip.y) {
      points.bustDartLeft = points.bustCenter.clone()
      points.bustDartLeft.x = points.dartTip.x
    } else if (measurements.hpsToBust < points.dartBottomLeft.y) {
      points.bustDartLeft = utils.curveIntersectsY(
        points.dartBottomLeft,
        points.dartLeftCp,
        points.dartTip,
        points.dartTip,
        measurements.hpsToBust
      )
    } else {
      log.warning('Unable to adjust bottom of dart on back part. Using unadjusted dart instead.')
      adjustment_warning = true
      points.bustDartLeft = points.dartBottomLeft.clone()
    }
    points.bustDartRight = points.bustDartLeft.flipX(points.dartTip)
    // Store things we'll need in the front parts
    store.set(
      'bustWidthBack',
      points.bustCenter.dx(points.bustDartLeft) + points.bustDartRight.dx(points.bustSide)
    )
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
    if (backDartWidth > 0)
      paths.seam
        .curve_(points.dartLeftCp, points.dartTip)
        ._curve(points.dartRightCp, points.dartBottomRight)
    else paths.seam.line(points.dartBottomRight)
    paths.seam
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
      .hide()

    macro('grainline', {
      from: new Point(points.hps.x / 2, points.shoulder.y),
      to: new Point(points.hps.x / 2, points.waistSide.y),
    })

    store.cutlist.addCut()

    if (complete) {
      points.titleAnchor = new Point(points.hps.x, points.armholePitchCp2.y)
      macro('title', {
        nr: 2,
        title: 'back',
        at: points.titleAnchor,
      })
      macro('sprinkle', {
        snippet: 'bnotch',
        on: ['armholePitch', 'bustCenter'],
      })

      if (sa) paths.sa = paths.saBase.offset(sa).attr('class', 'fabric sa')

      if (paperless) {
        macro('vd', {
          from: points.waistCenter,
          to: points.dartTip,
          x: points.cbNeck.x - sa - 15,
        })
        macro('vd', {
          from: points.waistCenter,
          to: points.cbNeck,
          x: points.cbNeck.x - sa - 30,
        })
        macro('vd', {
          from: points.waistCenter,
          to: points.hps,
          x: points.cbNeck.x - sa - 45,
        })
        macro('hd', {
          from: points.cbNeck,
          to: points.waistCenter,
          y: points.waistCenter.y + sa + 15,
        })
        let dimensionsOffset = 0
        if (backDartWidth > 0) {
          dimensionsOffset = 30
          macro('hd', {
            from: points.cbNeck,
            to: points.dartBottomLeft,
            y: points.waistCenter.y + sa + 30,
          })
          macro('hd', {
            from: points.cbNeck,
            to: points.dartBottomRight,
            y: points.waistCenter.y + sa + 45,
          })
          macro('hd', {
            from: points.dartBottomLeft,
            to: points.dartBottomRight,
            y: points.waistCenter.y + sa + 15,
          })
        }
        macro('hd', {
          from: points.cbNeck,
          to: points.waistSide,
          y: points.waistCenter.y + sa + 30 + dimensionsOffset,
        })
        macro('hd', {
          from: points.cbNeck,
          to: points.armhole,
          y: points.waistCenter.y + sa + 45 + dimensionsOffset,
        })
        macro('vd', {
          from: points.waistSide,
          to: points.armhole,
          x: points.armhole.x + sa + 15,
        })
        macro('vd', {
          from: points.waistSide,
          to: points.armholePitch,
          x: points.armhole.x + sa + 30,
        })
        macro('vd', {
          from: points.waistSide,
          to: points.shoulder,
          x: points.armhole.x + sa + 45,
        })
        macro('vd', {
          from: points.waistSide,
          to: points.hps,
          x: points.armhole.x + sa + 60,
        })
        macro('vd', {
          from: points.waistCenter,
          to: points.waistSide,
          x: points.waistSide.x + sa + 15,
        })
        macro('hd', {
          from: points.cbNeck,
          to: points.hps,
          y: points.hps.y - sa - 15,
        })
        macro('hd', {
          from: points.cbNeck,
          to: points.armholePitch,
          y: points.hps.y - sa - 30,
        })
        macro('hd', {
          from: points.cbNeck,
          to: points.shoulder,
          y: points.hps.y - sa - 45,
        })
        macro('hd', {
          from: points.cbNeck,
          to: points.armhole,
          y: points.hps.y - sa - 60,
        })

        macro('ld', { from: points.hps, to: points.shoulder, d: 10 })
      }
    }

    if (adjustment_warning)
      log.warning(
        'We were not able to generate the Back pattern piece correctly. ' +
          'Manual fitting and alteration of this and other pattern pieces ' +
          'are likely to be needed. ' +
          'First, please retake your measurements and generate a new ' +
          'pattern using the new measurements. ' +
          'If you still see this warning with the new pattern, then please ' +
          'make a test garment, check fit, and make alterations as ' +
          'necessary before trying to make the final garment.'
      )
    return part
  },
}
