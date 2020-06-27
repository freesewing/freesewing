export default (part) => {
  /*
   * Helper method to draw the inseam path
   */
  const drawInseam = () =>
    options.fitKnee
      ? new Path().move(points.fork)._curve(points.kneeInCp1, points.kneeIn).line(points.floorIn)
      : new Path().move(points.fork)._curve(points.kneeInCp1, points.floorIn)
  /*
   * Helper method to draw the outseam path
   */
  const drawOutseam = () => {
    let waistOut = points.styleWaistOut || points.waistOut
    if (options.fitKnee) {
      if (points.waistOut.x > points.seatOut.x)
        return new Path()
          .move(points.floorOut)
          .line(points.kneeOut)
          .curve(points.kneeOutCp2, points.seatOut, waistOut)
      else
        return new Path()
          .move(points.floorOut)
          .line(points.kneeOut)
          .curve(points.kneeOutCp2, points.seatOutCp1, points.seatOut)
          .curve_(points.seatOutCp2, points.Out)
    } else {
      if (points.waistOut.x > points.seatOut.x)
        return new Path().move(points.floorOut).curve(points.kneeOutCp2, points.seatOut, waistOut)
      else
        return new Path()
          .move(points.floorOut)
          .curve(points.kneeOutCp2, points.seatOutCp1, points.seatOut)
          .curve_(points.seatOutCp2, waistOut)
    }
  }
  /*
   * Helper method to draw the outline path
   */
  const drawPath = () => {
    let waistIn = points.styleWaistIn || points.waistIn
    return drawInseam()
      .line(points.floorOut)
      .join(drawOutseam())
      .line(waistIn)
      .line(points.crossSeamCurveStart)
      .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
      .close()
  }
  /*
   * Helper method to calculate the length of the cross seam
   */
  const crossSeamDelta = () =>
    new Path()
      .move(points.waistIn)
      .line(points.crossSeamCurveStart)
      .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
      .length() - measurements.backCrossSeam
  /*
   * Helper method to (re)draw the cross seam
   */
  const drawCrossSeam = () => {
    points.crossSeamCurveStart = points.waistIn.shiftFractionTowards(
      points.cbSeat,
      options.crossSeamCurveStart
    )
    points.crossSeamCurveMax = utils.beamsIntersect(
      points.waistIn,
      points.cbSeat,
      points.fork,
      points.fork.shift(0, 666)
    )
    points.crossSeamCurveCp1 = points.crossSeamCurveStart.shiftFractionTowards(
      points.crossSeamCurveMax,
      options.crossSeamCurveBend
    )
    points.crossSeamCurveCp2 = points.fork.shiftFractionTowards(
      points.crossSeamCurveMax,
      options.crossSeamCurveBend
    )
  }

  let {
    points,
    Point,
    paths,
    Path,
    measurements,
    options,
    complete,
    paperless,
    store,
    macro,
    utils,
    snippets,
    Snippet
  } = part.shorthand()

  // Fuck this noise, I'm starting over
  points.waistX = new Point(-1 * measurements.backWaistArc * (1 + options.waistEase), 0)
  points.upperLegY = new Point(0, measurements.waistToUpperLeg)
  points.seatX = new Point(-1 * measurements.backSeatArc * (1 + options.seatEase), 0)
  points.seatY = new Point(0, measurements.waistToSeat)
  points.seatOut = points.seatY
  points.cbSeat = new Point(points.seatX.x, points.seatY.y)

  // Determine fork location
  points.fork = new Point(
    measurements.backSeatArc * (1 + options.seatEase) * -1.25,
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
  let kneeTotal = measurements.kneeCircumference * (1 + options.kneeEase)
  if (!options.fitKnee) {
    // Based the knee width on the seat, unless that ends up being less
    let altKneeTotal = measurements.frontSeat
    if (altKneeTotal > kneeTotal) kneeTotal = altKneeTotal
  }
  // Store for re-use in front part
  store.set('kneeTotal', kneeTotal)
  store.set('kneeBack', kneeTotal * options.legBalance)
  store.set('kneeFront', kneeTotal * (1 - options.legBalance))
  let halfKnee = store.get('kneeBack') / 2
  points.kneeOut = points.knee.shift(0, halfKnee)
  points.kneeIn = points.kneeOut.flipX(points.knee)

  /*
   * Not shaping the ankle as that's a style choice.
   * As this is a block, just go straight down from the knee.
   */
  points.floorOut = points.floor.shift(0, halfKnee)
  points.floorIn = points.floorOut.flipX(points.floor)

  // Control points to shape the legs towards the seat
  points.kneeInCp1 = points.kneeIn.shift(90, points.fork.dy(points.knee) / 3)
  points.kneeOutCp2 = points.kneeOut.shift(90, points.fork.dy(points.knee) / 3)
  points.seatOutCp1 = points.seatOut.shift(-90, points.seatOut.dy(points.knee) / 3)
  points.seatOutCp2 = points.seatOut.shift(90, points.seatOut.y / 2)

  // Balance the waist
  if (points.cbSeat.x < points.waistX.x) {
    let delta = points.cbSeat.dx(points.waistX)
    let width = points.waistX.x
    points.waistIn = points.waistX.shift(180, delta * (1 - options.waistBalance))
    points.waistOut = points.waistIn.shift(180, width)
  }

  // Cross seam
  drawCrossSeam()

  /*
   * Uncomment the line below to see the seam prior to fitting the cross seam
   */
  //paths.seam1 = drawPath().attr('class', 'dashed lining')

  // Should we fit the cross seam?
  if (options.fitCrossSeam && options.fitBackCrossSeam) {
    let rotate = ['waistIn', 'waistOut']
    let delta = crossSeamDelta()
    let run = 0
    do {
      run++
      // Remedy A: Slash and spread
      for (const i of rotate) points[i] = points[i].rotate(delta / 15, points.seatOut)
      // Remedy B: Nudge the fork inwards/outwards
      points.fork = points.fork.shift(0, delta / 5)
      drawCrossSeam()
      delta = crossSeamDelta()
      // Uncomment the line beloe this to see all iterations
      // paths[`try${run}`] = drawPath().attr('class', 'dotted')
    } while (Math.abs(delta) > 1 && run < 15)
  }

  // Store inseam & outseam length
  store.set('inseamBack', drawInseam().length())
  store.set('outseamBack', drawOutseam().length())

  // Only now style the waist lower if requested
  if (options.waistHeight < 1) {
    points.styleWaistOut = drawOutseam()
      .reverse()
      .shiftAlong(measurements.waistToHips * (1 - options.waistHeight))
    points.styleWaistIn = utils.beamsIntersect(
      points.styleWaistOut,
      points.styleWaistOut.shift(points.waistOut.angle(points.waistIn), 10),
      points.waistIn,
      points.crossSeamCurveStart
    )
  } else {
    points.styleWaistIn = points.waistIn.clone()
    points.styleWaistOut = points.waistOut.clone()
  }

  // Paths
  paths.seam = drawPath()

  if (complete) {
    points.grainlineTop.y = points.styleWaistOut.y
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom
    })
    macro('scalebox', { at: points.knee })

    if (paperless) {
    }
  }

  return part
}
