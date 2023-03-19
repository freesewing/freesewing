import { pluginBust } from '@freesewing/plugin-bust'
import { front as carltonFront } from '@freesewing/carlton'
import { hidePresets } from '@freesewing/core'

function draftCarlitaFront({
  paperless,
  sa,
  snippets,
  Snippet,
  utils,
  store,
  complete,
  points,
  measurements,
  options,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  /**
   * we're adding half of the proportionate amount of chest east for the bust span
   * Only half because this is not where ease is needed or pools
   */
  points.bustPoint = new Point(
    measurements.bustSpan / 2 +
      ((measurements.bustSpan / measurements.bust) * options.chestEase) / 4,
    points.neck.y + measurements.hpsToBust
  )

  // Draw the princess seam (ps)
  points.psHem = new Point(points.bustPoint.x, points.hem.y)
  points.bustPointCp1 = points.bustPoint.shift(90, points.armholePitch.dy(points.bustPoint) / 2)

  // Paths
  /*
  paths.seam = new Path()
    .move(points.psHem)
    .line(points.bustPoint)
    .curve_(points.bustPointCp1, points.armholePitch)
    .join(paths.frontArmhole)
    .line(points.s3CollarSplit)
    .join(paths.frontCollar)
    .line(points.collarTip)
    ._curve(points.lapelStraightEndCp1, points.lapelStraightEnd)
    .line(points.hemEdge)
    .line(points.psHem)
    .close()
    .attr('class', 'fabric')

  paths.chestPiece = paths.chestPiece
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)

  paths.chestPocket = new Path()
    .move(points.chestPocketTopLeft)
    .line(points.chestPocketBottomLeft)
    .line(points.chestPocketBottomRight)
    .line(points.chestPocketTopRight)
    .line(points.chestPocketTopLeft)
    .close()
    .attr('class', 'fabric help')
  */

  /////////////////////////////////////////

  /**
   * We'll shape this side part to fit the bust
   * This is not unlike a full bust adjustment (FBA), we'll use 2 rotations
   * to slash and spread, and then close the bust dart
   */

  let side = [
    'bustPoint',
    'bustPointCp1',
    'psHem',
    'hem',
    'seat',
    'seatCp2',
    'waistCp1',
    'waist',
    'waistCp2',
    'armhole',
    'armholeCp2',
    'armholeHollowCp1',
    'armholeHollow',
    'armholeHollowCp2',
    'armholePitchCp1',
    'armholePitch',
  ]
  // Store these, we'll use them in the side part
  store.set('side', side)

  // How much (horizontal) room do we need to create?
  let extra = measurements.bust - measurements.highBust

  /* Cut from armholePitch point to bustPoint and rotate
   * entire side panel until we have created enough room */
  let added = 0
  let delta = 10
  let count = 1
  while (Math.abs(delta) > 0.5 && count < 50) {
    for (let i of side) points[i + 'Rot1'] = points[i].rotate(delta / 5, points.armholePitch)
    added = points.bustPoint.dx(points.bustPointRot1)
    delta = extra - added
    count++
  }

  /* Now cut from armhole to rotated bustpoint and rotate
   * the lower part of the site until it's aligned vertically again
   * We'll also rotate the top point, thus closing the bust dart */
  let angle = -1 * (points.bustPointRot1.angle(points.psHemRot1) - 270)
  for (let i of side) points[i + 'Rot2'] = points[i + 'Rot1'].rotate(angle, points.bustPointRot1)
  // Also rotate original bustPoint and bustPointCp1
  points.bustPointRot2 = points.bustPoint.rotate(angle, points.bustPointRot1)
  points.bustPointCp1Rot2 = points.bustPointCp1.rotate(angle, points.bustPointRot1)

  // Now construct the new curve
  points.bustPointCp2 = points.bustPointCp1Rot2
    .rotate(180, points.bustPointRot2)
    .shiftFractionTowards(points.bustPointRot2, 0.5)
  points.psWaist = new Point(points.psHemRot2.x, points.waistRot2.y)
  points.psWaistCp1 = points.psWaist.shift(
    90,
    points.bustPointRot2.dy(points.psWaist) * options.contour
  )

  // Adapt lenght of the front part
  let frontCurve = new Path()
    .move(points.armholePitch)
    ._curve(points.bustPointCp1, points.bustPoint)
    .line(new Point(points.psHem.x, points.waist.y))
    .length()
  let sideCurve = new Path()
    .move(points.armholePitchRot2)
    ._curve(points.bustPointCp1Rot2, points.bustPointRot2)
    .curve(points.bustPointCp2, points.psWaistCp1, points.psWaist)
    .length()
  let longer = sideCurve - frontCurve

  let belowBust = [
    'button1Left',
    'button2Left',
    'button3Left',
    'button1Right',
    'button2Right',
    'button3Right',
    'rollLineStart',
    'hemEdge',
    'flbHem',
    'psHem',
    'pocketTopLeft',
    'pocketTopRight',
    'pocketBottomLeft',
    'pocketBottomRight',
    'pocketRoundLeftStart',
    'pocketRoundLeftCp1',
    'pocketRoundLeftCp2',
    'pocketRoundLeftEnd',
    'pocketRoundRightStart',
    'pocketRoundRightCp1',
    'pocketRoundRightCp2',
    'pocketRoundRightEnd',
    'pocketFlapTopLeft',
    'pocketFlapTopRight',
    'pocketFlapBottomLeft',
    'pocketFlapBottomRight',
    'pocketFlapRoundLeftStart',
    'pocketFlapRoundLeftCp1',
    'pocketFlapRoundLeftCp2',
    'pocketFlapRoundLeftEnd',
    'pocketFlapRoundRightStart',
    'pocketFlapRoundRightCp1',
    'pocketFlapRoundRightCp2',
    'pocketFlapRoundRightEnd',
    'innerPocketTopLeft',
    'innerPocketTopRight',
    'innerPocketBottomLeft',
    'innerPocketBottomRight',
    'chestPocketTopLeft',
    'chestPocketTopRight',
    'chestPocketBottomLeft',
    'chestPocketBottomRight',
  ]
  for (let i of belowBust) {
    // Round points depend on options, so add a check
    if (typeof points[i] !== 'undefined') {
      points[i] = points[i].shift(-90, longer)
    }
  }

  // Move the map/chest pocket into the princess seam
  points.chestPocketBottomLeft = new Point(
    points.bustPoint.x,
    points.button2Right.y - points.button3Right.dy(points.button2Right) / 10
  )
  points.chestPocketTopLeft = points.chestPocketBottomLeft.shift(90, store.get('chestPocketHeight'))
  points.chestPocketTopRight = points.chestPocketTopLeft.shift(0, store.get('chestPocketWidth'))
  points.chestPocketBottomRight = points.chestPocketBottomLeft.shift(
    0,
    store.get('chestPocketWidth')
  )

  // Uncomment these to better understand the FBA
  /*
  paths.triangle0 = new Path()
    .move(points.bustPoint)
    .line(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .line(points.bustPoint)
    .close()
    .attr("class", "dashed lining");
  paths.triangle1 = new Path()
    .move(points.bustPointRot1)
    .line(points.armholeRot1)
    .curve(points.armholeCp2Rot1, points.armholeHollowCp1Rot1, points.armholeHollowRot1)
    .curve(points.armholeHollowCp2Rot1, points.armholePitchCp1Rot1, points.armholePitch)
    .line(points.bustPointRot1)
    .close()
    .attr("class", "dashed stroke-xl interfacing");
  paths.triangle2 = new Path()
    .move(points.bustPointRot2)
    .line(points.armholeRot2)
    .curve(points.armholeCp2Rot2, points.armholeHollowCp1Rot2, points.armholeHollowRot2)
    .curve(points.armholeHollowCp2Rot2, points.armholePitchCp1Rot2, points.armholePitchRot2)
    .line(points.bustPointRot2)
    .close()
    .attr("class", "dashed various");
  paths.rot = new Path()
    .move(points.hemRot2)
    .line(points.seatRot2)
    .curve(points.seatCp2Rot2, points.waistCp1Rot2, points.waistRot2)
    .curve_(points.waistCp2Rot2, points.armholeRot2)
    .curve(points.armholeCp2Rot2, points.armholeHollowCp1Rot2, points.armholeHollowRot2)
    .curve(points.armholeHollowCp2Rot2, points.armholePitchCp1Rot2, points.armholePitchRot2)
    ._curve(points.bustPointCp1Rot2, points.bustPointRot2)
    .line(points.psHemRot2)
    .line(points.hemRot2)
    .close()
    .attr("class", "interfacing stroke-xl");
  */

  // Clean up
  for (let i in paths) {
    if (['frontArmhole', 'frontCollar'].indexOf(i) === -1) delete paths[i]
  }
  for (let i in snippets) delete snippets[i]

  // Paths
  paths.saBase = new Path()
    .move(points.psHem)
    .line(points.bustPoint)
    .curve_(points.bustPointCp1, points.armholePitch)
    .join(paths.frontArmhole)
    .line(points.s3CollarSplit)
    .join(paths.frontCollar)
    .line(points.collarTip)
    ._curve(points.lapelStraightEndCp1, points.lapelStraightEnd)
    .line(points.hemEdge)
    .line(points.flbHem)
  paths.seam = paths.saBase.clone().line(points.psHem).close().attr('class', 'fabric')

  paths.rollLine = new Path()
    .move(points.rollLineStart)
    .line(points.rollLineEnd)
    .attr('class', 'lashed')

  paths.flb = new Path().move(points.flbHem).line(points.flbTop).attr('class', 'lining lashed')

  paths.pocket = new Path()
    .move(
      utils.beamsIntersect(
        points.pocketTopLeft,
        points.pocketTopRight,
        points.bustPoint,
        points.psHem
      )
    )
    .line(points.pocketTopLeft)
    .attr('class', 'fabric help')
  if (options.pocketRadius > 0) {
    paths.pocket = paths.pocket
      .line(points.pocketRoundLeftStart)
      .curve(points.pocketRoundLeftCp1, points.pocketRoundLeftCp2, points.pocketRoundLeftEnd)
  } else {
    paths.pocket = paths.pocket
      .line(points.pocketBottomLeft)
      .line(
        utils.beamsIntersect(
          points.pocketBottomLeft,
          points.pocketBottomRight,
          points.bustPoint,
          points.psHem
        )
      )
  }

  paths.pocketFlap = new Path()
    .move(
      utils.beamsIntersect(
        points.pocketFlapTopLeft,
        points.pocketFlapTopRight,
        points.bustPoint,
        points.psHem
      )
    )
    .line(points.pocketFlapTopLeft)
    .attr('class', 'fabric help')
  if (options.pocketFlapRadius > 0) {
    paths.pocketFlap = paths.pocketFlap
      .line(points.pocketFlapRoundLeftStart)
      .curve(
        points.pocketFlapRoundLeftCp1,
        points.pocketFlapRoundLeftCp2,
        points.pocketFlapRoundLeftEnd
      )
  } else {
    paths.pocketFlap = paths.pocketFlap
      .line(points.pocketFlapBottomLeft)
      .line(
        utils.beamsIntersect(
          points.pocketFlapBottomLeft,
          points.pocketFlapBottomRight,
          points.bustPoint,
          points.psHem
        )
      )
  }

  paths.chestPocket = new Path()
    .move(points.chestPocketTopLeft)
    .line(points.chestPocketBottomLeft)
    .line(points.chestPocketBottomRight)
    .line(points.chestPocketTopRight)
    .line(points.chestPocketTopLeft)
    .close()
    .attr('class', 'fabric help')

  paths.innerPocket = new Path()
    .move(points.innerPocketTopLeft)
    .line(points.innerPocketBottomLeft)
    .line(points.innerPocketBottomRight)
    .line(points.innerPocketTopRight)
    .line(points.innerPocketTopLeft)
    .close()
    .attr('class', 'fabric help')

  store.cutlist.addCut()
  store.cutlist.addCut({ material: 'lining' })

  if (complete) {
    snippets.button1Left = new Snippet('button', points.button1Left).attr('data-scale', 2)
    snippets.button1Right = new Snippet('button', points.button1Right).attr('data-scale', 2)
    snippets.button2Left = new Snippet('button', points.button2Left).attr('data-scale', 2)
    snippets.button2Right = new Snippet('button', points.button2Right).attr('data-scale', 2)
    snippets.button3Left = new Snippet('button', points.button3Left).attr('data-scale', 2)
    snippets.button3Right = new Snippet('button', points.button3Right).attr('data-scale', 2)
    macro('sprinkle', {
      snippet: 'notch',
      on: ['cfNeck', 'rollLineStart', 'bustPoint', 'chestPocketTopLeft', 'chestPocketBottomLeft'],
    })
    points.logo = points.cfSeat.shiftFractionTowards(points.cfHem, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    macro('title', { at: points.title, nr: '1a', title: 'front' })
    macro('grainline', { from: points.cfHem, to: points.cfNeck })

    if (sa) {
      let hemBase = new Path().move(points.flbHem).line(points.psHem)
      paths.sa = paths.saBase
        .offset(sa)
        .join(hemBase.offset(3 * sa))
        .line(points.psHem.shift(-90, 3 * sa).shift(0, sa))
        .close()
        .attr('class', 'fabric sa')
    }
    if (paperless) {
      macro('ld', {
        from: points.hemEdge,
        to: points.flbHem,
        d: 15,
      })
      macro('hd', {
        from: points.hemEdge,
        to: points.psHem,
        y: points.psHem.y + 15 + 3 * sa,
      })
      macro('hd', {
        from: points.rollLineStart,
        to: points.pocketTopLeft,
        y: points.pocketFlapBottomLeft.y,
      })
      macro('vd', {
        from: points.pocketFlapTopLeft,
        to: points.button3Right,
        x: points.bustPoint.x + sa + 15,
      })
      macro('vd', {
        from: points.pocketTopLeft,
        to: points.button3Right,
        x: points.bustPoint.x + sa + 30,
      })
      macro('vd', {
        from: points.chestPocketBottomLeft,
        to: points.button3Right,
        x: points.bustPoint.x - 15,
      })
      macro('hd', {
        from: points.rollLineStart,
        to: points.chestPocketBottomLeft,
        y: points.chestPocketBottomLeft.y + 15,
      })
      macro('hd', {
        from: points.rollLineStart,
        to: points.button3Left,
        y: points.button3Left.y + 15,
      })
      macro('hd', {
        from: points.button3Left,
        to: points.button3Right,
        y: points.button3Left.y + 15,
      })
      macro('vd', {
        from: points.psHem,
        to: points.bustPoint,
        x: points.bustPoint.x + sa + 45,
      })
      macro('vd', {
        from: points.psHem,
        to: points.armholePitch,
        x: points.armholePitch.x + sa + 15,
      })
      macro('vd', {
        from: points.armholePitch,
        to: points.s3ArmholeSplit,
        x: points.s3ArmholeSplit.x + sa + 15,
      })
      macro('vd', {
        from: points.armholePitch,
        to: points.s3CollarSplit,
        x: points.s3ArmholeSplit.x + sa + 30,
      })
      macro('vd', {
        from: points.rollLineStart,
        to: points.collarTip,
        x: points.rollLineStart.x - sa - 15,
      })
      macro('vd', {
        from: points.button2Left,
        to: points.rollLineStart,
        x: points.rollLineStart.x - sa - 15,
      })
      macro('vd', {
        from: points.button1Left,
        to: points.button2Left,
        x: points.rollLineStart.x - sa - 15,
      })
      macro('vd', {
        from: points.hemEdge,
        to: points.collarTip,
        x: points.rollLineStart.x - sa - 30,
      })
      macro('hd', {
        from: points.lapelStraightEnd,
        to: points.collarTip,
        y: points.collarTip.y - sa - 15,
      })
      macro('hd', {
        from: points.lapelStraightEnd,
        to: points.cfNeck,
        y: points.collarTip.y - sa - 30,
      })
      macro('hd', {
        from: points.lapelStraightEnd,
        to: points.rollLineEnd,
        y: points.collarTip.y - sa - 45,
      })
      macro('hd', {
        from: points.lapelStraightEnd,
        to: points.s3CollarSplit,
        y: points.s3CollarSplit.y - sa - 15,
      })
      macro('hd', {
        from: points.lapelStraightEnd,
        to: points.armholePitch,
        y: points.s3ArmholeSplit.y - sa - 30,
      })
      macro('hd', {
        from: points.lapelStraightEnd,
        to: points.s3ArmholeSplit,
        y: points.s3CollarSplit.y - sa - 45,
      })
      macro('hd', {
        from: points.lapelStraightEnd,
        to: points.s3ArmholeSplit,
        y: points.s3CollarSplit.y - sa - 60,
      })
    }
  }

  return part
}

export const front = {
  name: 'carlita.front',
  from: carltonFront,
  hide: hidePresets.HIDE_TREE,
  measurements: ['highBust', 'bustSpan', 'hpsToBust'],
  plugins: [pluginBust],
  options: {
    draftForHighBust: true,
    contour: { pct: 50, min: 25, max: 75, menu: 'advanced' },
  },
  draft: draftCarlitaFront,
}
