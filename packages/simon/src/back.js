import { calculateReduction } from './shared'

export default (part) => {
  part.paths = {} // Removes paperless dimensions from brian
  let {
    store,
    measurements,
    utils,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    options
  } = part.shorthand()

  // Populare store with data we need
  calculateReduction(part)
  store.set(
    'backArmholeLength',
    new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
      .length()
  )

  // Hip shaping
  points.hips = points.hips.shift(180, store.get('hipsReduction') / 4)
  points.hem = points.hem.shift(180, store.get('hipsReduction') / 4)

  let reduce = store.get('waistReduction')
  if (store.get('backDarts')) {
    // Add darts in the back
    let darts = (reduce * options.backDartShaping) / 4
    let nonDarts = (reduce * (1 - options.backDartShaping)) / 4
    points.waist = points.waist.shift(180, nonDarts)
    points.dartCenter = points.cbWaist.shiftFractionTowards(points.waist, 0.6)
    points.dartTop = points.dartCenter.shift(90, points.armhole.dy(points.waist) * 0.75)
    points.dartBottom = points.dartCenter.shift(-90, measurements.waistToHips * 0.75)
    points.dartCenterIn = points.dartCenter.shift(180, darts)
    points.dartCenterOut = points.dartCenter.shift(0, darts)
    points.dartCenterInCp1 = points.dartCenterIn.shift(
      90,
      points.dartTop.dy(points.dartCenter) * 0.2
    )
    points.dartCenterInCp2 = points.dartCenterIn.shift(
      90,
      points.dartBottom.dy(points.dartCenter) * 0.2
    )
    points.dartCenterOutCp1 = points.dartCenterOut.shift(
      90,
      points.dartBottom.dy(points.dartCenter) * 0.2
    )
    points.dartCenterOutCp2 = points.dartCenterOut.shift(
      90,
      points.dartTop.dy(points.dartCenter) * 0.2
    )
    paths.dart = new Path()
      .move(points.dartTop)
      ._curve(points.dartCenterInCp1, points.dartCenterIn)
      .curve_(points.dartCenterInCp2, points.dartBottom)
      ._curve(points.dartCenterOutCp1, points.dartCenterOut)
      .curve_(points.dartCenterOutCp2, points.dartTop)
      .close()
      .attr('class', 'fabric')
  } else {
    // No darts in the back
    points.waist = points.waist.shift(180, reduce / 4)
  }
  points.waistCp1 = points.waist.shift(-90, measurements.waistToHips * 0.5)
  points.waistCp2 = points.waist.shift(90, points.armhole.dy(points.waist) / 2)
  points.hipsCp2 = points.hips.shift(90, points.waist.dy(points.hips) / 4)

  // Cut off at yoke
  points.cbYoke = new Point(0, points.armholePitch.y)

  // Box pleat
  if (options.boxPleat) {
    points.boxPleatLeft = points.cbYoke.shift(0, options.boxPleatWidth / 2)
    points.boxPleatMid = points.boxPleatLeft.shift(0, options.boxPleatFold)
    points.boxPleatRight = points.boxPleatMid.shift(0, options.boxPleatFold)
    points.boxPleatLeftBottom = new Point(points.boxPleatLeft.x, points.armholeHollowCp2.y)
    points.boxPleatMidBottom = new Point(points.boxPleatMid.x, points.armholeHollowCp2.y)
    points.boxPleatRightBottom = new Point(points.boxPleatRight.x, points.armholeHollowCp2.y)
    for (let p of [
      'armholePitch',
      'armholePitchCp1',
      'armholeHollowCp2',
      'armholeHollow',
      'armholeHollowCp1',
      'armholeCp2',
      'armhole'
    ])
      points[p] = points[p].shift(0, options.boxPleatFold * 2)
  }

  // Yoke dart
  paths.armhole = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
  paths.armhole.render = false
  if (options.yokeDart > 0) {
    points.tmp1 = points.armholePitch.shift(
      -90,
      points.armholePitch.dy(points.armhole) * options.yokeDart
    )
    points.tmp2 = points.tmp1.shift(180, 50)
    points.tmp3 = points.tmp1.shift(0, 50)
    points.yokeDartEdge = utils.lineIntersectsCurve(
      points.tmp2,
      points.tmp3,
      points.armholePitch,
      points.armholePitchCp1,
      points.armholeHollowCp2,
      points.armholeHollow
    )
    points.yokeDartTip = points.armholePitch.shift(180, points.armholePitch.x * 0.4)
    points.yokeDartTipCp1 = points.armholePitch.shiftFractionTowards(points.yokeDartTip, 0.4)
    paths.armhole = paths.armhole.split(points.yokeDartEdge)[0]
    paths.armhole._curve(points.yokeDartTipCp1, points.yokeDartTip)
    // Adapt armhole length to accomodate dart
    store.set(
      'backArmholeLength',
      store.get('backArmholeLength') - points.yokeDartEdge.dist(points.armholePitch)
    )
  }

  // Never make the hips more narrow than the waist because that looks silly
  //if (points.hem.x < points.waist.x) {
  //  points.hem.x = points.waist.x
  //  points.hips.x = points.waist.x
  //  points.hipsCp2.x = points.waist.x
  //}

  // Draft hem
  switch (options.hemStyle) {
    case 'baseball':
      points.bballStart = points.cbHem.shiftFractionTowards(points.hem, 0.5)
      points.bballEnd = points.hem.shiftFractionTowards(points.hips, options.hemCurve)
      points.bballCp1 = points.bballStart.shiftFractionTowards(points.hem, 0.5)
      points.bballCp2 = new Point(points.bballCp1.x, points.bballEnd.y)
      paths.saBase = new Path()
        .move(points.bballEnd)
        .line(points.hips)
        .curve(points.hipsCp2, points.waistCp1, points.waist)
        .curve_(points.waistCp2, points.armhole)
        .join(paths.armhole)
        .line(points.cbYoke)
      paths.hemBase = new Path()
        .move(points.cbHem)
        .line(points.bballStart)
        .curve(points.bballCp1, points.bballCp2, points.bballEnd)
      break
    case 'slashed':
      macro('round', {
        from: points.hips,
        to: points.cbHem,
        via: points.hem,
        radius: points.hips.dist(points.hem) * options.hemCurve,
        prefix: 'slash'
      })
      paths.saBase = new Path()
        .move(points.hips)
        .curve(points.hipsCp2, points.waistCp1, points.waist)
        .curve_(points.waistCp2, points.armhole)
        .join(paths.armhole)
        .line(points.cbYoke)
      paths.hemBase = new Path()
        .move(points.cbHem)
        .line(points.slashEnd)
        .curve(points.slashCp2, points.slashCp1, points.slashStart)
      break
    default:
      paths.saBase = new Path()
        .move(points.hem)
        .line(points.hips)
        .curve(points.hipsCp2, points.waistCp1, points.waist)
        .curve_(points.waistCp2, points.armhole)
        .join(paths.armhole)
        .line(points.cbYoke)
      paths.hemBase = new Path().move(points.cbHem).line(points.hem)
  }

  // Paths
  paths.saBase.render = false
  paths.hemBase.render = false
  paths.seam = paths.hemBase.join(paths.saBase).close().attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    delete snippets.armholePitchNotch
    macro('cutonfold', {
      from: points.cbYoke,
      to: points.cbHem,
      grainline: true
    })
    points.title = new Point(points.armhole.x / 4, points.armhole.y)
    macro('title', { at: points.title, nr: 3, title: 'back' })
    points.logo = points.title.shift(-90, 70)
    snippets.logo = new Snippet('logo', points.logo)
    if (options.boxPleat) {
      paths.boxPleat = new Path()
        .move(points.boxPleatLeft)
        .line(points.boxPleatLeftBottom)
        .move(points.boxPleatMid)
        .line(points.boxPleatMidBottom)
        .move(points.boxPleatRight)
        .line(points.boxPleatRightBottom)
        .attr('class', 'fabric stroke-sm dashed')
    }

    if (sa) {
      paths.sa = paths.saBase.offset(sa).attr('class', 'fabric sa')
      paths.hemSa = paths.hemBase.offset(sa * 3).attr('class', 'fabric sa')
      paths.saConnect = new Path()
        .move(points.cbHem)
        .line(paths.hemSa.start())
        .move(paths.hemSa.end())
        .line(paths.sa.start())
        .move(paths.sa.end())
        .line(points.cbYoke)
        .attr('class', 'fabric sa')
      macro('banner', {
        path: 'hemSa',
        text: ['hem', ': 3x', 'seamAllowance']
      })
    }
  }

  // Paperless?
  if (paperless) {
    if (store.get('backDarts')) {
      macro('vd', {
        from: points.dartBottom,
        to: points.dartCenterIn,
        x: points.dartCenterIn.x - 15
      })
      macro('vd', {
        from: points.dartCenterIn,
        to: points.dartTop,
        x: points.dartCenterIn.x - 15
      })
      macro('hd', {
        from: points.dartCenterIn,
        to: points.dartCenterOut,
        y: points.dartBottom.y + 15
      })
      macro('hd', {
        from: points.dartCenterOut,
        to: points.waist
      })
      macro('hd', {
        from: points.cbWaist,
        to: points.dartCenterIn
      })
    } else {
      macro('hd', {
        from: points.cbWaist,
        to: points.waist
      })
    }
    let bottomRight
    if (typeof points.slashEnd !== 'undefined') {
      macro('hd', {
        from: points.cbHem,
        to: points.slashEnd,
        y: points.cbHem.y + 15 + 3 * sa
      })
      macro('vd', {
        from: points.slashEnd,
        to: points.slashStart,
        x: points.slashStart.x + 15 + 3 * sa
      })
      bottomRight = points.slashEnd
    } else if (typeof points.bballStart !== 'undefined') {
      macro('hd', {
        from: points.cbHem,
        to: points.bballStart,
        y: points.cbHem.y + 15 + 3 * sa
      })
      macro('vd', {
        from: points.bballStart,
        to: points.bballEnd,
        x: points.hips.x + 15 + sa
      })
      bottomRight = points.bballStart
    } else bottomRight = points.hem
    macro('hd', {
      from: points.cbHem,
      to: points.hips,
      y: points.cbHem.y + 30 + 3 * sa
    })
    macro('vd', {
      from: bottomRight,
      to: points.hips,
      x: points.hips.x + 30 + sa
    })
    macro('vd', {
      from: bottomRight,
      to: points.waist,
      x: points.hips.x + 45 + sa
    })
    macro('vd', {
      from: bottomRight,
      to: points.armhole,
      x: points.hips.x + 60 + sa
    })
    if (options.yokeDart > 0) {
      macro('vd', {
        from: points.armhole,
        to: points.yokeDartEdge,
        x: points.armhole.x + 15 + sa
      })
      macro('vd', {
        from: points.armhole,
        to: points.yokeDartTip,
        x: points.armhole.x + 30 + sa
      })
      macro('hd', {
        from: points.cbYoke,
        to: points.yokeDartTip,
        y: points.cbYoke.y - 15 - sa
      })
      macro('hd', {
        from: points.cbYoke,
        to: points.yokeDartEdge,
        y: points.cbYoke.y - 30 - sa
      })
    } else {
      macro('vd', {
        from: points.armhole,
        to: points.armholePitch,
        x: points.armhole.x + 15 + sa
      })
      macro('hd', {
        from: points.cbYoke,
        to: points.armholePitch,
        y: points.cbYoke.y - 15 - sa
      })
    }
    macro('vd', {
      from: points.cbHem,
      to: points.cbYoke,
      x: points.cbHem.x - 15
    })
  }

  return part
}
