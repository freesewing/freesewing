import { back } from './back.mjs'

function titanFront({
  points,
  Point,
  paths,
  Path,
  measurements,
  options,
  complete,
  store,
  macro,
  utils,
  snippets,
  Snippet,
  sa,
  absoluteOptions,
  log,
  part,
}) {
  /*
   * Helper method to draw the inseam path
   */
  const drawInseam = () =>
    options.fitKnee
      ? new Path()
          .move(points.floorIn)
          .line(points.kneeIn)
          .curve(points.kneeInCp2, points.forkCp1, points.fork)
      : new Path().move(points.floorIn).curve(points.kneeInCp2, points.forkCp1, points.fork)
  /*
   * Helper method to draw the outseam path
   */
  const drawOutseam = () => {
    let waistOut = points.styleWaistOut || points.waistOut
    if (options.fitKnee) {
      if (points.waistOut.x < points.seatOut.x)
        return new Path()
          .move(waistOut)
          .curve(points.seatOut, points.kneeOutCp1, points.kneeOut)
          .line(points.floorOut)
      else
        return new Path()
          .move(waistOut)
          ._curve(points.seatOutCp1, points.seatOut)
          .curve(points.seatOutCp2, points.kneeOutCp1, points.kneeOut)
          .line(points.floorOut)
    } else {
      if (points.waistOut.x < points.seatOut.x)
        return new Path().move(waistOut).curve(points.seatOut, points.kneeOutCp1, points.floorOut)
      else
        return new Path()
          .move(waistOut)
          ._curve(points.seatOutCp1, points.seatOut)
          .curve(points.seatOutCp2, points.kneeOutCp1, points.floorOut)
    }
  }

  /*
   * Helper method to draw the outline path
   */
  const drawPath = () => {
    let waistIn = points.styleWaistIn || points.waistIn
    let waistOut = points.styleWaistOut || points.waistOut
    return drawOutseam()
      .line(points.floorIn)
      .join(drawInseam())
      .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
      .line(waistIn)
      .line(waistOut)
      .close()
  }
  /*
   * Helper method to calculate the length of the crotch seam
   */
  const crotchSeamDelta = () =>
    new Path()
      .move(points.waistIn)
      .line(points.crotchSeamCurveStart)
      .curve(points.crotchSeamCurveCp2, points.crotchSeamCurveCp1, points.fork)
      .length() - measurements.crossSeamFront
  /*
   * Helper method to (re)draw the crotch seam
   */
  const drawCrotchSeam = () => {
    points.crotchSeamCurveStart = points.waistIn.shiftFractionTowards(
      points.cfSeat,
      options.crotchSeamCurveStart
    )
    points.crotchSeamCurveMax = utils.beamsIntersect(
      points.waistIn,
      points.cfSeat,
      points.fork,
      points.fork.shift(0, 666)
    )
    points.crotchSeamCurveCp1 = points.fork
      .shiftFractionTowards(points.crotchSeamCurveMax, options.crotchSeamCurveBend)
      .rotate(options.crotchSeamCurveAngle * -1, points.fork)
    points.crotchSeamCurveCp2 = points.crotchSeamCurveStart.shiftFractionTowards(
      points.crotchSeamCurveMax,
      options.crotchSeamCurveBend
    )
    points.forkCp1 = points.crotchSeamCurveCp1.rotate(90, points.fork)
  }
  /*
   * Helper method to calculate the inseam delta
   */
  const inseamDelta = () => drawInseam().length() - store.get('inseamBack')
  /*
   * Helper method to calculate the outseam delta
   */
  const outseamDelta = () => drawOutseam().length() - store.get('outseamBack')
  /*
   * Helper method to lengthen/shorten both inseam and outseam
   */
  const adaptInseamAndOutseam = () => {
    let shift = [
      'kneeInCp2',
      'kneeOutCp1',
      'kneeIn',
      'kneeOut',
      'knee',
      'floorIn',
      'floorOut',
      'floor',
      'grainlineBottom',
    ]
    let delta = seamDelta()
    let run = 0
    do {
      run++
      for (const i of shift) points[i] = points[i].shift(90, delta)
      delta = seamDelta()
    } while (Math.abs(delta) > 1 && run < 10)
  }
  /*
   * Helper method to determine the delta common when both inseam and outseam
   * are either too long or too short
   */
  const seamDelta = () => {
    let inseam = inseamDelta()
    let outseam = outseamDelta()
    return Math.abs(inseam) > Math.abs(outseam) ? outseam : inseam
  }
  /*
   * Helper method that can fit either inseam or outseam
   */
  const adaptSeam = (side) => {
    const out = side === 'out' ? true : false
    let rotate = [
      'cfSeat',
      'crotchSeamCurveCp1',
      'crotchSeamCurveCp2',
      'crotchSeamCurveStart',
      'waistIn',
      'cfWaist',
      'waistOut',
    ]
    rotate.push(out ? 'seatOut' : 'fork')
    const deltaMethod = out ? outseamDelta : inseamDelta
    let run = 0
    let delta = deltaMethod()
    do {
      for (const i of rotate)
        points[i] = points[i].rotate(
          (delta / 10) * (out ? 1 : -1),
          points[out ? 'fork' : 'seatOut']
        )
      run++
      delta = deltaMethod()
    } while (Math.abs(delta) > 1 && run < 20)
  }
  const adaptOutseam = () => adaptSeam('out')
  const adaptInseam = () => adaptSeam('in')

  // Let's get to work
  points.waistX = new Point(measurements.waistFrontArc * (1 + options.waistEase), 0)
  points.upperLegY = new Point(0, measurements.waistToUpperLeg)
  points.seatX = new Point(measurements.seatFrontArc * (1 + options.seatEase), 0)
  points.seatY = new Point(0, measurements.waistToSeat)
  points.seatOut = points.seatY
  points.cfSeat = new Point(points.seatX.x, points.seatY.y)

  // Determine fork width
  points.fork = new Point(
    measurements.seatFrontArc * (1 + options.seatEase) * 1.25,
    points.upperLegY.y * (1 + options.crotchDrop)
  )

  // Grainline location, map out center of knee and floor
  points.grainlineTop = points.upperLegY.shiftFractionTowards(
    points.fork,
    options.grainlinePosition
  )
  points.knee = new Point(points.grainlineTop.x, measurements.waistToKnee)
  points.floor = new Point(
    points.grainlineTop.x,
    measurements.waistToFloor * (1 + options.lengthBonus)
  )
  points.grainlineBottom = points.floor

  // Figure out width at the knee
  let halfKnee = store.get('kneeFront') / 2
  points.kneeOut = points.knee.shift(180, halfKnee)
  points.kneeIn = points.kneeOut.flipX(points.knee)

  /*
   * Not shaping the ankle as that's a style choice.
   * As this is a block, just go straight down from the knee.
   */
  points.floorOut = points.floor.shift(180, halfKnee)
  points.floorIn = points.floorOut.flipX(points.floor)

  // Control points to shape the legs towards the seat
  points.kneeInCp2 = points.kneeIn.shift(90, points.fork.dy(points.knee) / 3)
  points.kneeOutCp1 = points.kneeOut.shift(90, points.fork.dy(points.knee) / 3)
  points.seatOutCp1 = points.seatOut.shift(
    90,
    measurements.waistToHips * options.waistHeight + absoluteOptions.waistbandWidth
  )
  points.seatOutCp2 = points.seatOut.shift(-90, points.seatOut.dy(points.knee) / 3)

  // Balance the waist
  let delta = points.waistX.dx(points.cfSeat)
  let width = points.waistX.x
  points.waistOut = new Point(delta * options.waistBalance, 0)
  points.waistIn = points.waistOut.shift(0, width)
  points.cfWaist = points.waistIn

  // Draw initial crotch seam
  drawCrotchSeam()

  // Uncomment this to see the outline prior to fitting the crotch seam
  // paths.seam1 = drawPath().attr('class', 'dashed lining')

  if (options.fitCrossSeam && options.fitCrossSeamFront) {
    let delta = crotchSeamDelta()
    let previous_delta
    let rotate = ['waistIn', 'waistOut', 'cfWaist']
    let saved = []
    let run = 0
    do {
      previous_delta = delta
      run++
      // Remedy A: Slash and spread
      for (const i of rotate) {
        saved[i] = points[i]
        points[i] = points[i].rotate(delta / -15, points.seatOut)
      }
      // Remedy B: Nudge the fork inwards/outwards
      saved.fork = points.fork
      points.fork = points.fork.shift(180, delta / 5)
      drawCrotchSeam()
      delta = crotchSeamDelta()
      // Uncomment the line below this to see all iterations
      // paths[`try${run}`] = drawPath().attr('class', 'dotted')
    } while (Math.abs(delta) > 1 && run < 15 && Math.abs(delta) < Math.abs(previous_delta))
    if (Math.abs(delta) > Math.abs(previous_delta)) {
      // The rotations started to produce worse results.
      // Revert back to the previous rotation.
      for (const i of rotate) {
        points[i] = saved[i]
      }
      points.fork = saved.fork
    }
    if (Math.abs(delta) > 1 || Math.abs(delta) > Math.abs(previous_delta)) {
      log.warn(
        'Unable to adjust the front crotch seam to fit the given measurements, after ' +
          run +
          ' iterations.'
      )
      store.flag.warn({ msg: 'titan:crossSeamFitFailedFront' })
    }
  }

  // Uncomment this to see the outline prior to fitting the inseam & outseam
  // paths.seam2 = drawPath().attr('class', 'dotted interfacing')

  /*
   * With the cross seams matched back and front,
   * all that's left is to match the inseam and outseam
   */

  // When both are too short/long, adapt the leg length
  if ((inseamDelta() < 0 && outseamDelta() < 0) || (inseamDelta() > 0 && outseamDelta() > 0))
    adaptInseamAndOutseam()

  // Now one is ok, the other will be adapted
  adaptOutseam()
  adaptInseam()

  // Changing one will ever so slightly impact the other, so let's run both again to be sure
  adaptOutseam()
  adaptInseam()

  // Only now style the waist lower if requested
  if (options.waistHeight < 1 || absoluteOptions.waistbandWidth > 0) {
    points.styleWaistOut = drawOutseam().shiftAlong(
      measurements.waistToHips * (1 - options.waistHeight) + absoluteOptions.waistbandWidth
    )
    points.styleWaistIn = utils.beamsIntersect(
      points.styleWaistOut,
      points.styleWaistOut.shift(points.waistOut.angle(points.waistIn), 10),
      points.waistIn,
      points.crotchSeamCurveStart
    )
    if (points.styleWaistIn.y >= points.crotchSeamCurveStart.y) {
      store.flag.warn({ msg: 'titan:lowFrontHeight' })
      points.crotchSeamCurveStart = points.styleWaistIn.shiftFractionTowards(
        points.crotchSeamCurveMax,
        0.001
      )
    }
  } else {
    points.styleWaistIn = points.waistIn.clone()
    points.styleWaistOut = points.waistOut.clone()
  }

  // Seamline
  paths.seam = drawPath().attr('class', 'fabric')

  if (complete)
    paths.hint = new Path()
      .move(points.crotchSeamCurveStart)
      .line(points.crotchSeamCurveMax)
      .line(points.fork)
      .addClass('note help')

  if (sa) {
    paths.saBase = drawInseam()
      .join(
        new Path()
          .move(points.fork)
          .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
          .line(points.styleWaistIn)
          .line(points.styleWaistOut)
      )
      .join(drawOutseam())
    paths.hemBase = new Path().move(points.floorOut).line(points.floorIn)
    paths.sa = paths.hemBase
      .offset(sa * 3)
      .join(paths.saBase.offset(sa))
      .close()
      .attr('class', 'fabric sa')
    paths.saBase.hide()
    paths.hemBase.hide()
  }

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Grainline
  points.grainlineTop.y = points.styleWaistIn.y
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  // Logo
  points.logoAnchor = new Point(points.crotchSeamCurveStart.x / 2, points.fork.y)
  snippets.logo = new Snippet('logo', points.logoAnchor)

  // Title
  points.titleAnchor = points.logoAnchor.shift(-90, 60)
  macro('title', {
    nr: 2,
    title: 'front',
    at: points.titleAnchor,
  })

  // Dimensions
  macro('hd', {
    id: 'wHemLeftToPleat',
    from: points.floorOut,
    to: points.floor,
    y: points.floorIn.y - 15,
  })
  macro('hd', {
    id: 'wHemRightToPleat',
    from: points.floor,
    to: points.floorIn,
    y: points.floorIn.y - 15,
  })
  macro('hd', {
    id: 'wHem',
    from: points.floorOut,
    to: points.floorIn,
    y: points.floorIn.y - 30,
  })
  macro('vd', {
    id: 'hHemToFork',
    from: points.floorOut,
    to: points.fork,
    x: points.fork.x + sa + 15,
  })
  macro('vd', {
    id: 'hForkToCfWaist',
    from: points.fork,
    to: points.styleWaistIn,
    x: points.fork.x + sa + 15,
  })
  macro('vd', {
    id: 'hHemToSideWaist',
    from: points.floorIn,
    to: points.styleWaistOut,
    x:
      (points.seatOut.x < points.styleWaistOut.x ? points.seatOut.x : points.styleWaistOut.x) -
      sa -
      15,
  })
  macro('vd', {
    id: 'hStartCrotchCurveToCfWaist',
    from: points.crotchSeamCurveStart,
    to: points.styleWaistIn,
    x: points.crotchSeamCurveStart.x + sa + 15,
  })
  macro('hd', {
    id: 'wSideWaistToPleat',
    from: points.seatOut,
    to: points.grainlineTop,
    y: points.styleWaistIn.y - sa - 15,
  })
  if (points.styleWaistOut.x < points.seatOut.x) {
    macro('hd', {
      id: 'wSideWaistToPleatAlt',
      from: points.styleWaistOut,
      to: points.grainlineTop,
      y: points.styleWaistIn.y - sa - 30,
    })
  }
  macro('hd', {
    id: 'wPleatToCfWaist',
    from: points.grainlineTop,
    to: points.styleWaistIn,
    y: points.styleWaistIn.y - sa - 15,
  })
  macro('hd', {
    id: 'wPleastToStartCrotchCurve',
    from: points.grainlineTop,
    to: points.crotchSeamCurveStart,
    y: points.styleWaistIn.y - sa - 30,
  })
  macro('hd', {
    id: 'wPleastToCrotchProjection',
    from: points.grainlineTop,
    to: points.crotchSeamCurveMax,
    y: points.styleWaistIn.y - sa - 45,
  })
  macro('hd', {
    id: 'wPleastToFork',
    from: points.grainlineTop,
    to: points.fork,
    y: points.styleWaistIn.y - sa - 60,
  })

  return part
}

export const front = {
  name: 'titan.front',
  after: back,
  draft: titanFront,
}
