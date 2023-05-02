import { constructMainDart, shapeSideSeam, dartPath } from './shared.mjs'
import { front as brianFront } from '@freesewing/brian'
import { hidePresets } from '@freesewing/core'
import {
  frontOverlap,
  necklineDrop,
  frontStyle,
  frontInset,
  shoulderInset,
  neckInset,
  hemStyle,
  hemRadius,
  pocketWidth,
  pocketAngle,
  pocketLocation,
  frontScyeDart,
  buttons,
  waistEase,
  hipsEase,
  armholeDepthFactor,
  chestEase,
  lengthBonus,
  acrossBackFactor,
  frontArmholeDeeper,
  bicepsEase,
  collarEase,
  cuffEase,
  shoulderEase,
  s3Collar,
  s3Armhole,
  shoulderSlopeReduction,
  backNeckCutout,
} from './options.mjs'

function wahidFront({
  points,
  Point,
  paths,
  Path,
  measurements,
  options,
  utils,
  macro,
  snippets,
  Snippet,
  complete,
  sa,
  paperless,
  store,
  part,
}) {
  // Cleanup from Brian
  for (let i of Object.keys(paths)) delete paths[i]
  delete snippets.armholePitchNotch
  // Neck cutout
  points.closureTop = new Point(
    measurements.chest * options.frontOverlap * -1,
    points.waist.y * options.necklineDrop
  )
  if (options.frontStyle === 'classic')
    points.closureTopCp1 = new Point(points.neck.x, (points.waist.y * options.necklineDrop) / 2)
  else {
    points.closureTopCp1 = new Point(points.neck.x, points.closureTop.y)
  }
  // Front inset
  let shoulderLen = points.shoulder.dist(points.neck)
  let frontInset = shoulderLen * options.frontInset
  points.armholePitch = points.armholePitch.shift(180, frontInset)
  points.armholePitchCp1 = points.armholePitchCp1.shift(180, frontInset)
  points.armholePitchCp2 = points.armholePitchCp2.shift(180, frontInset)
  points.armholeHollow = points.armholeHollow.shift(180, frontInset / 2)
  points.armholeHollowCp2 = points.armholeHollowCp2.shift(180, frontInset / 2)
  points.armholeHollowCp1 = points.armholeHollowCp1.shift(180, frontInset / 2)
  // Shoulder inset
  points.shoulder = points.shoulder.shiftTowards(points.neck, shoulderLen * options.shoulderInset)
  points.shoulderCp1 = points.shoulderCp1.shift(
    points.shoulder.angle(points.neck),
    shoulderLen * options.shoulderInset
  )
  // Neck inset
  points.neck = points.neck.shiftTowards(points.shoulder, shoulderLen * options.neckInset)
  points.neckCp2 = points.neck.shift(points.shoulder.angle(points.neck) + 90, shoulderLen * 0.2)
  // Construct main dart
  constructMainDart(part)
  // Shape side seam
  shapeSideSeam(part)
  // Hem
  if (options.hemStyle === 'classic') {
    // Construct cutaway
    let cutaway = points.closureTop.dx(points.hem) / 4
    points.closureBottom = new Point(points.closureTop.x, points.hem.y - cutaway / 2)
    points.hemTip = new Point(points.closureBottom.x + cutaway, points.closureBottom.y + cutaway)
    // Shifting hem point to have a continious hem curve to work from
    let shift = points.dartHemLeft.dx(points.dartHemRight)
    points.splitHem = points.hem.shift(180, shift)
    // Split hem curve on left side of dart
    points.hemSplit = utils.curveIntersectsX(
      points.hemTip,
      points.hemTip,
      points.dartHemLeft,
      points.splitHem,
      points.dartHemLeft.x
    )
    // Split the hem curve
    let [c1, c2] = utils.splitCurve(
      points.hemTip,
      points.hemTip,
      points.dartHemLeft,
      points.splitHem,
      points.hemSplit
    )
    points.splitDartHemLeftCp1 = c1.cp2
    points.splitDartHemRightCp2 = c2.cp1.shift(0, shift)
    points.splitHemCp1 = c2.cp2.shift(0, shift)
    points.splitDartHemLeft = utils.curveIntersectsX(
      points.hemTip,
      points.hemTip,
      points.dartHemLeft,
      points.splitHem,
      points.dartHemLeft.x
    )
    points.splitDartHemRight = points.splitDartHemLeft.shift(0, shift)
    points.lastButton = new Point(0, points.closureBottom.y)
  } else if (options.hemStyle === 'rounded') {
    points.closureBottom = new Point(points.closureTop.x, points.hem.y)
    // Draw rounded hem
    let radius = measurements.hips * options.hemRadius
    // Avoid radius extending beyond the dart
    if (radius > points.closureTop.dx(points.dartHemLeft))
      radius = points.closureTop.dx(points.dartHemLeft)
    macro('round', {
      from: points.closureTop,
      to: points.hem,
      via: points.closureBottom,
      radius,
      prefix: 'round',
    })
    points.lastButton = new Point(0, points.roundStart.y)
  } else {
    points.closureBottom = new Point(points.closureTop.x, points.hem.y)
    points.lastButton = new Point(0, points.hem.y)
  }
  // We use the roundEnd and roundStart points later on
  // let's make sure they exist even if the hem is not rounded
  // (essentially a rounded hem with radius zero
  if (!points.roundStart) points.roundStart = points.closureBottom.clone()
  if (!points.roundEnd) points.roundEnd = points.closureBottom.clone()
  // Add dart start and end point regardless of style or front or back
  points.dartStart = options.hemStyle === 'classic' ? points.splitDartHemLeft : points.dartHemLeft
  points.dartEnd = options.hemStyle === 'classic' ? points.splitDartHemRight : points.dartHemRight
  // Pockets
  let pw = measurements.hips * options.pocketWidth // Pocket width
  let pwh = pw * options.weltHeight // Pocket welt height
  let pwvh = pwh / Math.cos(utils.deg2rad(options.pocketAngle)) // Pocket welt vertical height
  points.pocketTopMid = points.dartWaistCenter.shiftFractionTowards(
    points.dartHipCenter,
    options.pocketLocation
  )
  points.pocketTopMidLeft = utils.curveIntersectsY(
    points.dartWaistLeft,
    points.dartWaistLeftCpBottom,
    points.dartHipLeftCpTop,
    points.dartHipLeft,
    points.pocketTopMid.y
  )
  points.pocketBottomMidLeft = utils.curveIntersectsY(
    points.dartWaistLeft,
    points.dartWaistLeftCpBottom,
    points.dartHipLeftCpTop,
    points.dartHipLeft,
    points.pocketTopMid.y + pwvh
  )
  points.pocketTopLeft = points.pocketTopMidLeft.shift(180 + options.pocketAngle, pw / 2)
  points.pocketBottomLeft = points.pocketTopLeft.shift(options.pocketAngle - 90, pwh)
  points.pocketTopMidRight = points.pocketTopMidLeft.flipX(points.pocketTopMid)
  points.pocketBottomMidRight = points.pocketBottomMidLeft.flipX(points.pocketTopMid)
  points.pocketTopRight = points.pocketTopMidRight.shift(options.pocketAngle, pw / 2)
  points.pocketBottomRight = points.pocketTopRight.shift(options.pocketAngle - 90, pwh)
  // Store pocket bag length
  store.set('pocketBagLength', points.pocketTopMid.dy(points.cfHem) * 0.75)
  if (options.frontScyeDart) {
    // Front scye dart
    points._dartWidth = points.dartTop.shiftFractionTowards(
      points.armholeHollow.rotate(options.frontScyeDart, points.dartTop),
      1.5
    )
    points.armholeHollowTop = new Path()
      .move(points.armholeHollow)
      .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
      .intersects(new Path().move(points.dartTop).line(points._dartWidth))
      .pop()
    // Adjust control point
    points.armholeHollowCp2 = points.armholeHollowCp2.shift(
      points.armholeHollow.angle(points.armholeHollowTop),
      points.armholeHollow.dist(points.armholeHollowTop)
    )
    // Rotate front scye dart into front dart
    let toRotate = [
      'dartWaistRightCpTop',
      'dartWaistRight',
      'dartWaistRightCpBottom',
      'dartHipRightCpTop',
      'dartHipRight',
      'dartHemRight',
      'splitDartHemRight',
      'splitDartHemRightCp2',
      'splitHemCp1',
      'hem',
      'hips',
      'hipsCp2',
      'waistCp1',
      'waist',
      'waistCp2',
      'armhole',
      'armholeCp2',
      'armholeHollow',
      'pocketTopMidRight',
      'pocketBottomMidRight',
      'pocketTopRight',
      'pocketBottomRight',
      'dartEnd',
    ]
    for (let p of toRotate) {
      if (typeof points[p] !== 'undefined')
        points[p] = points[p].rotate(options.frontScyeDart, points.dartTop)
    }
    points.armholeHollowCp1 = points.armholeHollowCp2.rotate(180, points.armholeHollow)
  }
  // Facing/Lining boundary (flb)
  points.flbTop = points.neck.shiftFractionTowards(points.shoulder, 0.5)
  points.flbCp = points.dartTop.shift(-90, points.armholePitch.dy(points.flbTop) / 2)
  points.flbCpTop = points.flbTop
    .shiftTowards(points.neck, points.flbTop.dy(points.armholePitch))
    .rotate(90, points.flbTop)
  // Seam line
  delete paths.cutonfold
  delete paths.saBase
  delete paths.sa
  paths.saBase = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve(points.neckCp2, points.closureTopCp1, points.closureTop)
  if (options.hemStyle === 'classic') {
    paths.saBase
      .line(points.closureBottom)
      .line(points.hemTip)
      ._curve(points.splitDartHemLeftCp1, points.splitDartHemLeft)
    paths.hemBase = new Path()
      .move(points.dartEnd)
      .curve(points.splitDartHemRightCp2, points.splitHemCp1, points.hem)
  } else if (options.hemStyle === 'rounded') {
    paths.saBase
      .line(points.roundStart)
      .curve(points.roundCp1, points.roundCp2, points.roundEnd)
      .line(points.dartHemLeft)
    paths.hemBase = new Path().move(points.dartEnd).line(points.hem)
  } else {
    paths.saBase.line(points.closureBottom).line(points.dartHemLeft)
    paths.hemBase = new Path().move(points.dartEnd).line(points.hem)
  }
  paths.dart = dartPath(part)
  paths.seam = paths.saBase.join(paths.dart).join(paths.hemBase).close().attr('class', 'fabric')
  paths.saBase.hide()
  paths.hemBase.hide()
  paths.dart.hide()
  if (complete) {
    // Pocket path
    paths.pocket = new Path()
      .move(points.pocketTopMidLeft)
      .line(points.pocketTopLeft)
      .line(points.pocketBottomLeft)
      .line(points.pocketBottomMidLeft)
      .move(points.pocketBottomMidRight)
      .line(points.pocketBottomRight)
      .line(points.pocketTopRight)
      .line(points.pocketTopMidRight)
      .attr('class', 'fabric dashed')
    // Buttons
    points.button1 = new Point(0, points.closureTop.y + 10)
    let delta = points.button1.dist(points.lastButton) / (options.buttons - 1)
    for (let i = 1; i <= options.buttons; i++) {
      points['button' + i] = points.button1.shift(-90, delta * (i - 1))
      snippets['button' + i] = new Snippet('button', points['button' + i])
      snippets['buttonhole' + i] = new Snippet('buttonhole', points['button' + i]).attr(
        'data-rotate',
        90
      )
    }
    // Facing/Lining boundary (flb)
    paths.flbFacing = new Path()
      .move(points.dartTop)
      .curve(points.flbCp, points.flbCpTop, points.flbTop)
      .attr('class', 'fabric')
    paths.flbLining = paths.flbFacing.clone().attr('class', 'lining dashed')

    //Grainline

    macro('grainline', {
      to: points.neck,
      from: new Point(points.neck.x, points.cfHem.y),
    })
    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(paths.hemBase.offset(sa))
        .close()
        .attr('class', 'fabric sa')
    }
    if (paperless) {
      macro('hd', {
        from: points.closureTop,
        to: points.neck,
        y: points.neck.y - 15 - sa,
      })
      macro('hd', {
        from: points.closureTop,
        to: points.shoulder,
        y: points.neck.y - 30 - sa,
      })
      macro('hd', {
        from: points.closureTop,
        to: points.armhole,
        y: points.neck.y - 45 - sa,
      })
      macro('ld', {
        from: points.neck,
        to: points.shoulder,
        d: 15 + sa,
      })
      macro('ld', {
        from: points.neck,
        to: points.flbTop,
        d: -15,
      })
      macro('vd', {
        from: points.armhole,
        to: points.shoulder,
        x: points.armhole.x + 15 + sa,
      })
      macro('vd', {
        from: points.armhole,
        to: points.neck,
        x: points.armhole.x + 30 + sa,
      })
      macro('vd', {
        from: points.hem,
        to: points.armhole,
        x: (points.armhole.x > points.hem.x ? points.armhole.x : points.hem.x) + 15 + sa,
      })
      macro('vd', {
        from: options.hemStyle === 'classic' ? points.splitDartHemRight : points.dartHemRight,
        to: points.armhole,
        x: (points.armhole.x > points.hem.x ? points.armhole.x : points.hem.x) + 30 + sa,
      })
      macro('vd', {
        from: options.hemStyle === 'classic' ? points.splitDartHemLeft : points.dartHemLeft,
        to: points.armhole,
        x: (points.armhole.x > points.hem.x ? points.armhole.x : points.hem.x) + 45 + sa,
      })
      macro('ld', {
        from: points.dartHemRight,
        to: points.hem,
        d: 15,
      })
      if (options.hemStyle === 'classic') {
        macro('hd', {
          from: points.closureBottom,
          to: points.hemTip,
          y: points.hemTip.y + 15 + sa,
        })
        macro('hd', {
          from: points.closureBottom,
          to: points.splitDartHemLeft,
          y: points.hemTip.y + 30 + sa,
        })
        macro('hd', {
          from: points.closureBottom,
          to: points.splitDartHemRight,
          y: points.hemTip.y + 45 + sa,
        })
        macro('hd', {
          from: points.closureBottom,
          to: points.hem,
          y: points.hemTip.y + 60 + sa,
        })
        macro('vd', {
          from: points.hemTip,
          to: points.closureBottom,
          x: points.closureBottom.x - 15 - sa,
        })
        macro('vd', {
          from: points.hemTip,
          to: points.pocketTopMidLeft,
          x: points.closureBottom.x - 30 - sa,
        })
        macro('vd', {
          from: points.hemTip,
          to: points.dartWaistLeft,
          x: points.closureBottom.x - 45 - sa,
        })
        macro('vd', {
          from: points.hemTip,
          to: points.closureTop,
          x: points.closureBottom.x - 60 - sa,
        })
      } else {
        macro('hd', {
          from: points.roundStart,
          to: points.roundEnd,
          y: points.roundEnd.y + 15 + sa,
        })
        macro('hd', {
          from: points.roundStart,
          to: points.dartHemLeft,
          y: points.roundEnd.y + 30 + sa,
        })
        macro('hd', {
          from: points.roundStart,
          to: points.dartHemRight,
          y: points.roundEnd.y + 45 + sa,
        })
        macro('hd', {
          from: points.roundStart,
          to: points.hem,
          y: points.roundEnd.y + 60 + sa,
        })
        macro('vd', {
          from: points.roundEnd,
          to: points.roundStart,
          x: points.roundStart.x - 15 - sa,
        })
        macro('vd', {
          from: points.roundEnd,
          to: points.pocketTopMidLeft,
          x: points.roundStart.x - 30 - sa,
        })
        macro('vd', {
          from: points.roundEnd,
          to: points.dartWaistLeft,
          x: points.roundStart.x - 45 - sa,
        })
        macro('vd', {
          from: points.roundEnd,
          to: points.closureTop,
          x: points.roundStart.x - 60 - sa,
        })
      }
      macro('vd', {
        from: points.closureTop,
        to: points.neck,
        x: points.closureTop.x - 15 - sa,
      })
      macro('vd', {
        from: points.button2,
        to: points.button1,
        x: points.button1.x + 15,
      })
      macro('hd', {
        from: points.closureTop,
        to: points.button2,
        y: points.button2.y + 15,
      })
      macro('ld', {
        from: points.dartWaistLeft,
        to: points.dartWaistRight,
      })
      macro('ld', {
        from: points.dartHipLeft,
        to: points.dartHipRight,
      })
      macro('ld', {
        from: points.pocketTopLeft,
        to: points.pocketTopMidLeft,
        d: 15,
      })
      macro('ld', {
        from: points.pocketTopMidRight,
        to: points.pocketTopRight,
        d: 15,
      })
      macro('ld', {
        from: points.pocketBottomRight,
        to: points.pocketTopRight,
        d: -15,
      })
      macro('vd', {
        from: points.pocketTopMidLeft,
        to: points.dartTop,
        x: points.closureTop.x - 30 - sa,
      })
    }
  }
  return part
}

export const front = {
  name: 'wahid.front',
  from: brianFront,
  hide: hidePresets.HIDE_TREE,
  measurements: ['hips', 'waist'],
  options: {
    frontOverlap,
    necklineDrop,
    frontStyle,
    frontInset,
    shoulderInset,
    neckInset,
    hemStyle,
    hemRadius,
    pocketWidth,
    pocketAngle,
    pocketLocation,
    frontScyeDart,
    buttons,
    waistEase,
    hipsEase,
    armholeDepthFactor,
    chestEase,
    lengthBonus,
    acrossBackFactor,
    frontArmholeDeeper,
    bicepsEase,
    collarEase,
    cuffEase,
    shoulderEase,
    s3Collar,
    s3Armhole,
    shoulderSlopeReduction,
    backNeckCutout,
  },
  draft: wahidFront,
}
