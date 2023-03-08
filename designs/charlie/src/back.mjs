import { back as titanBack } from '@freesewing/titan'
import { front } from './front.mjs'
import { hidePresets } from '@freesewing/core'

function draftCharlieBack({
  points,
  Point,
  paths,
  Path,
  options,
  complete,
  paperless,
  store,
  macro,
  snippets,
  Snippet,
  sa,
  log,
  units,
  utils,
  part,
}) {
  // Helper method to draw the outseam path
  const drawOutseam = () => {
    return new Path()
      .move(points.slantOut)
      .line(points.slantCurveStart)
      .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
      .join(titanOutseam.split(points.slantCurveEnd).pop())
      .reverse()
  }
  /*
   * Helper method to draw the outline path
   */
  const drawPath = () => {
    let waistIn = points.styleWaistIn || points.waistIn
    return drawOutseam()
      ._curve(points.backDartRightCp, points.backDartRight)
      .noop('dart')
      .line(points.backDartLeft)
      .curve(points.backDartLeftCp, points.cbCp, waistIn)
      .line(points.crossSeamCurveStart)
      .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
      .curve(points.forkCp2, points.kneeInCp1, points.kneeIn)
      .line(points.floorIn)
  }

  // Mark back pocket
  let base = points.styleWaistIn.dist(points.styleWaistOut)
  let angle = points.styleWaistIn.angle(points.styleWaistOut)
  store.set('backPocketToWaistband', base * options.backPocketVerticalPlacement)
  store.set('backPocketWidth', base * options.backPocketWidth)
  store.set('backPocketDepth', base * options.backPocketDepth)
  points.waistPocketCenter = points.styleWaistIn.shiftFractionTowards(
    points.styleWaistOut,
    options.backPocketHorizontalPlacement
  )
  points.pocketCenter = points.waistPocketCenter.shift(
    angle - 90,
    store.get('backPocketToWaistband')
  )
  points.pocketRight = points.pocketCenter.shift(angle, store.get('backPocketWidth') / 2)
  points.pocketLeft = points.pocketCenter.shift(angle, store.get('backPocketWidth') / -2)

  // Back dart
  points.tmp1 = points.waistPocketCenter.rotate(8.66, points.pocketCenter)
  points.tmp2 = points.waistPocketCenter.rotate(-8.66, points.pocketCenter)
  points.backDartLeft = points.pocketCenter.shiftFractionTowards(points.tmp1, 1.05)
  points.backDartRight = points.pocketCenter.shiftFractionTowards(points.tmp2, 1.05)
  let newBase =
    points.styleWaistIn.dist(points.backDartLeft) + points.styleWaistOut.dist(points.backDartRight)
  let delta = base - newBase
  // Adapt waist to new darted reality
  for (let p of ['styleWaistIn', 'crossSeamCurveStart', 'crossSeamCurveCp1']) {
    points[p] = points[p].shift(angle + 180, delta / 2)
  }
  points.styleWaistOut = points.styleWaistOut.shift(angle, delta / 2)

  // Helper object that holds the titan outseam path adapted for the dart
  const titanOutseam =
    points.waistOut.x > points.seatOut.x
      ? new Path()
          .move(points.floorOut)
          .line(points.kneeOut)
          .curve(points.kneeOutCp2, points.seatOut, points.styleWaistOut)
          .reverse()
      : new Path()
          .move(points.floorOut)
          .line(points.kneeOut)
          .curve(points.kneeOutCp2, points.seatOutCp1, points.seatOut)
          .curve_(points.seatOutCp2, points.styleWaistOut)
          .reverse()

  // Helper object holding the inseam path
  const backInseamPath = new Path()
    .move(points.fork)
    .curve(points.forkCp2, points.kneeInCp1, points.kneeIn)
    .line(points.floorIn)

  // Keep the seat control point vertically between the (lowered) waist and seat line
  points.seatOutCp2.y = points.styleWaistOut.y + points.styleWaistOut.dy(points.seatOut) / 2

  // Construct pocket slant
  points.slantBottom = titanOutseam.shiftAlong(store.get('slantLength'))
  points.slantOut = points.styleWaistIn.shiftOutwards(points.styleWaistOut, store.get('slantWidth'))

  // Shape waist
  let dist = points.styleWaistOut.dist(points.waistPocketCenter) / 3
  points.cbCp = points.styleWaistIn
    .shiftTowards(points.crossSeamCurveStart, dist)
    .rotate(90, points.styleWaistIn)
  points.backDartLeftCp = points.backDartLeft
    .shiftTowards(points.pocketCenter, dist)
    .rotate(-90, points.backDartLeft)
  points.backDartRightCp = points.backDartRight
    .shiftTowards(points.pocketCenter, dist)
    .rotate(90, points.backDartRight)

  // Store waistband length
  store.set(
    'waistbandBack',
    new Path()
      .move(points.styleWaistIn)
      .curve(points.cbCp, points.backDartLeftCp, points.backDartLeft)
      .length() +
      new Path().move(points.backDartRight).curve_(points.backDartRightCp, points.slantOut).length()
  )
  store.set('legWidthBack', points.floorIn.dist(points.floorOut))

  // Round the slant
  points.slantCurveStart = points.slantBottom.shiftFractionTowards(
    points.slantOut,
    options.frontPocketSlantRound
  )
  points.slantCurveEnd = titanOutseam.shiftAlong(
    points.slantBottom.dist(points.slantCurveStart) + store.get('slantLength')
  )
  points.slantCurveCp1 = points.slantBottom.shiftFractionTowards(
    points.slantCurveStart,
    options.frontPocketSlantBend
  )
  points.slantCurveCp2 = titanOutseam.shiftAlong(
    points.slantBottom.dist(points.slantCurveCp1) + store.get('slantLength')
  )

  // Anchor for sampling/grid
  // This breaks the samples for reason not clear. See #
  // points.anchor = points.fork.clone()

  paths.saBase = drawPath()
  paths.seam = paths.saBase
    .insop('dart', new Path().line(points.pocketCenter))
    .close()
    .attr('class', 'fabric')
  paths.saBase.hide()

  // Sanity check, to make sure inseams and outseams match front and back
  const backInseamLength = backInseamPath.length()
  const frontInseamLength = store.get('frontInseamLength')
  const inseamDiff = frontInseamLength - backInseamLength
  let inseamDesc = 'Charlie back inseam is longer than front'
  if (inseamDiff > 0) inseamDesc = 'Charlie front inseam is longer than back'
  if (Math.abs(inseamDiff) > 1) {
    log.warning(inseamDesc + ' by ' + utils.round(Math.abs(inseamDiff)) + ' mm')
    log.debug('Charlie frontInseam: ' + utils.round(frontInseamLength).toString())
    log.debug('Charlie backInseam: ' + utils.round(backInseamLength).toString())
  }
  const backOutseamLength = drawOutseam().length()
  const frontOutseamLength = store.get('frontOutseamLength')
  const outseamDiff = frontOutseamLength - backOutseamLength
  let outseamDesc = 'Charlie back outseam is longer than front'
  if (outseamDiff > 0) outseamDesc = 'Charlie front outseam is longer than back'
  if (Math.abs(outseamDiff) > 1) {
    log.warning(outseamDesc + ' by ' + utils.round(Math.abs(outseamDiff)) + ' mm')
    log.debug('Charlie frontOutseam: ' + utils.round(frontOutseamLength).toString())
    log.debug('Charlie backOutseam: ' + utils.round(backOutseamLength).toString())
  }

  if (complete) {
    paths.pocketLine = new Path()
      .move(points.pocketLeft)
      .line(points.pocketRight)
      .attr('class', 'fabric dashed')
    points.titleAnchor = new Point(points.knee.x, points.fork.y)
    macro('title', {
      at: points.titleAnchor,
      nr: 1,
      title: 'back',
    })
    snippets.logo = new Snippet('logo', points.titleAnchor.shiftFractionTowards(points.knee, 0.5))
    points.slantBottomNotch = new Path()
      .move(points.slantCurveStart)
      .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
      .intersectsY(points.slantBottom.y)
      .pop()
    points.slantTopNotch = points.slantOut.shiftTowards(
      points.slantCurveStart,
      store.get('slantTopNotchDistance')
    )
    macro('sprinkle', {
      snippet: 'bnotch',
      on: ['grainlineBottom', 'slantBottomNotch', 'slantTopNotch'],
    })

    macro('bartack', {
      anchor: points.slantTopNotch,
      angle: points.slantTopNotch.angle(points.slantBottomNotch) - 90,
      length: sa ? sa / 2 : 5,
      suffix: 'slantTop',
    })
    macro('bartack', {
      anchor: points.slantBottomNotch,
      length: sa ? sa / 2 : 5,
      angle: 180,
      suffix: 'slantBottom',
    })

    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(
          new Path()
            .move(points.floorIn)
            .line(points.floorOut)
            .offset(sa * 6)
        )
        .close()
        .attr('class', 'fabric sa')
    }
    log.info(
      `Inseam height: ${units(points.fork.dy(points.floorIn))} | ` +
        `Waist: ${units((store.get('waistbandBack') + store.get('waistbandFront')) * 2)} | ` +
        `Bottom leg width: ${units((store.get('legWidthBack') + store.get('legWidthFront')) / 2)}`
    )

    if (paperless) {
      // Clean up paperless dimensions
      macro('rmad')
      delete paths.hint

      macro('hd', {
        from: points.floorIn,
        to: points.grainlineBottom,
        y: points.floorIn.y - 15,
      })
      macro('hd', {
        from: points.grainlineBottom,
        to: points.floorOut,
        y: points.floorIn.y - 15,
      })
      macro('hd', {
        from: points.floorIn,
        to: points.floorOut,
        y: points.floorIn.y - 30,
      })

      let y = points.floorIn.y + sa * 6
      macro('hd', {
        from: points.fork,
        to: points.grainlineBottom,
        y: y + 15,
      })
      macro('hd', {
        from: points.grainlineBottom,
        to: points.slantBottomNotch,
        y: y + 15,
      })
      macro('hd', {
        from: points.grainlineBottom,
        to: points.slantOut,
        y: y + 30,
      })

      y = points.styleWaistIn.y - sa
      macro('hd', {
        from: points.styleWaistIn,
        to: points.grainlineTop,
        y: y - 15,
      })
      macro('hd', {
        from: points.fork,
        to: points.grainlineTop,
        y: y - 30,
      })
      macro('hd', {
        from: points.grainlineTop,
        to: points.waistPocketCenter,
        y: y - 15,
      })
      macro('hd', {
        from: points.grainlineTop,
        to: points.slantOut,
        y: y - 30,
      })

      macro('ld', {
        from: points.pocketLeft,
        to: points.pocketRight,
        d: -15,
      })
      macro('ld', {
        from: points.backDartLeft,
        to: points.backDartRight,
        d: 15,
      })
      macro('ld', {
        from: points.pocketCenter,
        to: points.waistPocketCenter,
        d: 25,
      })

      let x = points.fork.x - sa
      macro('vd', {
        from: points.fork,
        to: points.pocketCenter,
        x: x - 15,
      })
      macro('vd', {
        from: points.fork,
        to: points.waistPocketCenter,
        x: x - 30,
      })
      macro('vd', {
        from: points.fork,
        to: points.styleWaistIn,
        x: x - 45,
      })

      x = points.slantOut.x + sa
      macro('vd', {
        from: points.floorOut,
        to: points.slantBottomNotch,
        x: x + 15,
      })
      macro('vd', {
        from: points.floorOut,
        to: points.slantOut,
        x: x + 30,
      })
    }
  }

  return part
}

export const back = {
  name: 'charlie.back',
  from: titanBack,
  after: front,
  hide: hidePresets.HIDE_TREE,
  options: {
    backPocketVerticalPlacement: { pct: 24, min: 18, max: 30, menu: 'pockets.backpockets' },
    backPocketHorizontalPlacement: { pct: 55, min: 48, max: 62, menu: 'pockets.backpockets' },
    backPocketWidth: { pct: 55, min: 50, max: 60, menu: 'pockets.backpockets' },
    backPocketDepth: { pct: 60, min: 40, max: 80, menu: 'pockets.backpockets' },
    backPocketFacing: { bool: true, menu: 'pockets.backpockets' },
  },
  draft: draftCharlieBack,
}
