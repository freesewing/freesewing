import { calculateReduction } from './shared.mjs'
import { flipPlugin } from '@freesewing/plugin-flip'
import { back as brianBack } from '@freesewing/brian'
import { hidePresets } from '@freesewing/core'
import {
  collarFactor,
  backDarts,
  backDartShaping,
  boxPleat,
  boxPleatFold,
  boxPleatWidth,
  roundBack,
  buttonholePlacketWidth,
  buttonholePlacketFoldWidth,
  buttonPlacketWidth,
  hemCurve,
  hemStyle,
  hipsEase,
  lengthBonus,
  shoulderEase,
  yokeHeight,
  sleevePlacketWidth,
  waistEase,
} from './options.mjs'

function simonBack({
  store,
  measurements,
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
  options,
  part,
}) {
  // Add pct options (that used to be mm) to the store
  store.set('buttonPlacketWidth', measurements.neck * options.buttonPlacketWidth)
  store.set('buttonholePlacketWidth', measurements.neck * options.buttonholePlacketWidth)
  store.set(
    'buttonholePlacketFoldWidth',
    store.get('buttonholePlacketWidth') * options.buttonholePlacketFoldWidth
  )
  store.set('collarStandWidth', measurements.neck * options.collarStandWidth)
  store.set('sleevePlacketWidth', measurements.wrist * options.sleevePlacketWidth)
  store.set('boxPleatWidth', measurements.shoulderToShoulder * options.boxPleatWidth)
  store.set('boxPleatFold', store.get('boxPleatWidth') * options.boxPleatFold)

  // Populare store with data we need
  calculateReduction(part)
  store.set(
    'backArmholeLength',
    new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
      .join(paths.backArmhole)
      .length()
  )

  // Hip shaping
  points.hips = points.hips.shift(180, store.get('hipsReduction') / 4)
  points.hem = points.hem.shift(180, store.get('hipsReduction') / 4)


  // begin dress pattern modifications

  // calculate maximum garment length (floor length)
  // let maxlength = measurements.hpsToWaistBack + measurements.waistToFloor
  let maxlength = points.waist.y + measurements.waistToFloor


  // set points defining maximum center back and outside hem positions
  points.cbHemMax = new Point(points.cbHem.x , maxlength)
  points.outHemMax = new Point(points.hem.x * options.hemExpansion, points.cbHemMax.y)

  // set actual center back hem position to a percentage of the maximum
  points.cbHem = points.cbHem.shiftFractionTowards(points.cbHemMax,options.lengthBonus)
  points.hem = points.hem.shiftFractionTowards(points.outHemMax,options.lengthBonus)


  // establish a construction line and use it to calculate outside hem position
  paths.hemConstructor = new Path().move(points.hips).line(points.outHemMax).hide()
  points.hemCalc = new Point(paths.hemConstructor.intersectsY(points.cbHem.y))

  // draw the new hem line
  paths.newhem = new Path().move(points.cbHem).line(points.hemCalc)

  // end dress pattern modifications

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
  const neverAboveCbNeck = () =>
    points.cbNeck.dy(points.cbYoke) < 10 ? (points.cbYoke.y = points.cbNeck.y + 10) : null
  points.cbYoke = new Point(
    0,
    points.s3ArmholeSplit.y + points.s3ArmholeSplit.dy(points.armholePitch) * options.yokeHeight
  )
  neverAboveCbNeck()

  // This split fails on 10% cisfemale doll measurements
  // While that's a niche case, we should still handle it
  // So we merely adapt the yoke bottom to fall at the start of the
  // backArmhole curve
  const armholeYokeSplitCandidate = paths.backArmhole.intersectsY(points.cbYoke.y).pop()
  if (armholeYokeSplitCandidate) {
    points.armholeYokeSplit = armholeYokeSplitCandidate
  } else {
    points.armholeYokeSplit = paths.backArmhole.start()
    points.cbYoke.y = points.armholeYokeSplit.y
  }

  const [back, yoke] = paths.backArmhole.split(points.armholeYokeSplit)
  paths.backArmholeYoke = yoke.hide()
  // For 1/10 dolls with breasts, this path becomes non-existing so we put a dummy here
  paths.backArmholeBack = back.attributes
    ? back.hide()
    : new Path().move(points.armholeYokeSplit).line(points.armholeYokeSplit).hide()

  // We'll re-use this
  const armholeToPitch = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)

  // Update this value in the store set by Brian because it is only correct
  // if the yoke height happens to fall on the armhole pitch point
  store.set('backArmholeToArmholePitch', paths.backArmholeBack.length() + armholeToPitch.length())

  // Round back
  paths.armhole = armholeToPitch
  if (options.yokeHeight === 0) paths.armhole = paths.armhole.join(paths.backArmhole)
  else paths.armhole = paths.armhole.join(paths.backArmholeBack)
  paths.armhole.hide()

  if (options.roundBack > 0) {
    points.cbTop = points.cbYoke.shift(90, points.armholePitch.x * options.roundBack)
    points.cbTopCp1 = points.cbTop.shift(0, points.armholePitch.x * 0.5)
    paths.roundedBack = new Path()
      .move(points.armholeYokeSplit)
      ._curve(points.cbTopCp1, points.cbTop)
  } else points.cbTop = points.cbYoke

  // Box pleat
  points.armholeYokeSplitPreBoxpleat = points.armholeYokeSplit.clone()
  if (options.boxPleat) {
    points.boxPleatLeft = points.cbTop.shift(0, store.get('boxPleatWidth') / 2)
    points.boxPleatMid = points.boxPleatLeft.shift(0, store.get('boxPleatFold'))
    points.boxPleatRight = points.boxPleatMid.shift(0, store.get('boxPleatFold'))
    points.boxPleatLeftBottom = new Point(points.boxPleatLeft.x, points.armholeHollowCp2.y)
    points.boxPleatMidBottom = new Point(points.boxPleatMid.x, points.armholeHollowCp2.y)
    points.boxPleatRightBottom = new Point(points.boxPleatRight.x, points.armholeHollowCp2.y)
    paths.armhole.hide()
    paths.armhole = paths.armhole.translate(store.get('boxPleatFold') * 2, 0)
    for (const p of [
      'armholePitch',
      'armholePitchCp1',
      'armholeHollowCp2',
      'armholeHollow',
      'armholeHollowCp1',
      'armholeCp2',
      'armhole',
      'armholeYokeSplit',
    ])
      points[p] = points[p].shift(0, store.get('boxPleatFold') * 2)
  }



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
        prefix: 'slash',
      })
      paths.saBase = new Path()
        .move(points.hips)
        .curve(points.hipsCp2, points.waistCp1, points.waist)
        .curve_(points.waistCp2, points.armhole)
        .join(paths.armhole)
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
      paths.hemBase = new Path().move(points.cbHem).line(points.hem)
  }
  // Take rounded back into account
  if (paths.roundedBack) paths.saBase = paths.saBase.join(paths.roundedBack)
  else paths.saBase = paths.saBase.line(points.cbYoke)

  // Paths
  paths.saBase.hide()
  paths.hemBase.hide()
  paths.seam = paths.hemBase.join(paths.saBase).close().attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    delete snippets.armholePitchNotch
    snippets.sleevecapNotch = new Snippet('notch', points.armholeYokeSplit)
    macro('cutonfold', {
      from: points.cbYoke,
      to: points.cbHem,
      grainline: true,
    })
    points.title = new Point(points.armhole.x / 4, points.armhole.y)
    macro('title', { at: points.title, nr: 3, title: 'back' })
    points.logo = new Point(points.armhole.x / 4, points.waistCp2.y)
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
        path: paths.hemSa,
        text: ['hem', ': 3x', 'seamAllowance'],
      })
    }
  }

  // Paperless?
  if (paperless) {
    macro('rmad') // Removes paperless dimensions from brian
    if (store.get('backDarts')) {
      macro('vd', {
        from: points.dartBottom,
        to: points.dartCenterIn,
        x: points.dartCenterIn.x - 15,
      })
      macro('vd', {
        from: points.dartCenterIn,
        to: points.dartTop,
        x: points.dartCenterIn.x - 15,
      })
      macro('hd', {
        from: points.dartCenterIn,
        to: points.dartCenterOut,
        y: points.dartBottom.y + 15,
      })
      macro('hd', {
        from: points.dartCenterOut,
        to: points.waist,
      })
      macro('hd', {
        from: points.cbWaist,
        to: points.dartCenterIn,
      })
    } else {
      macro('hd', {
        from: points.cbWaist,
        to: points.waist,
      })
    }
    let bottomRight
    if (typeof points.slashEnd !== 'undefined') {
      macro('hd', {
        from: points.cbHem,
        to: points.slashEnd,
        y: points.cbHem.y + 15 + 3 * sa,
      })
      macro('vd', {
        from: points.slashEnd,
        to: points.slashStart,
        x: points.slashStart.x + 15 + 3 * sa,
      })
      bottomRight = points.slashEnd
    } else if (typeof points.bballStart !== 'undefined') {
      macro('hd', {
        from: points.cbHem,
        to: points.bballStart,
        y: points.cbHem.y + 15 + 3 * sa,
      })
      macro('vd', {
        from: points.bballStart,
        to: points.bballEnd,
        x: points.hips.x + 15 + sa,
      })
      bottomRight = points.bballStart
    } else bottomRight = points.hem
    macro('hd', {
      from: points.cbHem,
      to: points.hips,
      y: points.cbHem.y + 30 + 3 * sa,
    })
    macro('vd', {
      from: bottomRight,
      to: points.hips,
      x: points.hips.x + 30 + sa,
    })
    macro('vd', {
      from: bottomRight,
      to: points.waist,
      x: points.hips.x + 45 + sa,
    })
    macro('vd', {
      from: bottomRight,
      to: points.armhole,
      x: points.hips.x + 60 + sa,
    })
    if (options.roundBack > 0) {
      macro('vd', {
        from: points.armhole,
        to: points.armholeYokeSplit,
        x: points.armhole.x + 15 + sa,
      })
      macro('vd', {
        from: points.armhole,
        to: points.cbTop,
        x: points.armhole.x + 30 + sa,
      })
      macro('hd', {
        from: points.cbTop,
        to: points.armholePitch,
        y: points.cbTop.y - 15 - sa,
      })
      macro('hd', {
        from: points.cbTop,
        to: points.armholeYokeSplit,
        y: points.cbTop.y - 30 - sa,
      })
    } else {
      macro('vd', {
        from: points.armhole,
        to: points.armholePitch,
        x: points.armhole.x + 15 + sa,
      })
      macro('hd', {
        from: points.cbYoke,
        to: points.armholePitch,
        y: points.cbYoke.y - 15 - sa,
      })
    }
    macro('vd', {
      from: points.cbHem,
      to: points.cbYoke,
      x: points.cbHem.x - 15,
    })
  }

  return part
}

export const back = {
  name: 'simon.back',
  plugins: [flipPlugin],
  measurements: ['waist', 'hips'],
  from: brianBack,
  hide: hidePresets.HIDE_TREE,
  options: {
    collarFactor,
    backDarts,
    backDartShaping,
    boxPleat,
    boxPleatFold,
    boxPleatWidth,
    roundBack,
    buttonholePlacketWidth,
    buttonholePlacketFoldWidth,
    buttonPlacketWidth,
    hemCurve,
    hemStyle,
    hipsEase,
    lengthBonus,
    hemExpansion: { pct:150, min:100, max: 200, menu: 'fit'},
    shoulderEase,
    yokeHeight,
    sleevePlacketWidth,
    waistEase,
  },
  draft: simonBack,
}
