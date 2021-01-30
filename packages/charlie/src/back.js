export default (part) => {

  /*
   * Helper method to draw the inseam path
   */
  const drawInseam = () =>
    options.fitKnee
      ? new Path()
          .move(points.fork)
          .curve(points.forkCp2, points.kneeInCp1, points.kneeIn)
          .line(points.floorIn)
      : new Path().move(points.fork).curve(points.forkCp2, points.kneeInCp1, points.floorIn)
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
          .curve_(points.seatOutCp2, points.waistOut)
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
      .line(points.backDartRight)
      .noop('dart')
      .line(points.backDartLeft)
      .line(waistIn)
      .line(points.crossSeamCurveStart)
      .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
      .close()
  }


  // Shorthand
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
    Snippet,
    sa
  } = part.shorthand()

  // Mark back pocket
  let base = points.styleWaistIn.dist(points.styleWaistOut)
  let v = base * options.backPocketVerticalPlacement
  let h = base * options.backPocketHorizontalPlacement
  let w = base * options.backPocketWidth
  let d = base * options.backPocketDepth
  let a = points.styleWaistIn.angle(points.styleWaistOut)
  points.waistPocketCenter = points.styleWaistIn.shiftFractionTowards(points.styleWaistOut, options.backPocketHorizontalPlacement)
  points.pocketCenter = points.waistPocketCenter.shift(a-90, v)
  points.pocketRight = points.pocketCenter.shift(a, w/2)
  points.pocketLeft = points.pocketCenter.shift(a, w/-2)

  // Back dart
  points.tmp1 = points.waistPocketCenter.rotate(6.66, points.pocketCenter)
  points.tmp2 = points.waistPocketCenter.rotate(-6.66, points.pocketCenter)
  points.backDartLeft = points.pocketCenter.shiftFractionTowards(points.tmp1, 1.05)
  points.backDartRight = points.pocketCenter.shiftFractionTowards(points.tmp2, 1.05)
  let newBase = points.styleWaistIn.dist(points.backDartLeft)
    + points.styleWaistOut.dist(points.backDartRight)
  let delta = base - newBase
  // Adapt waist to new darted reality
  for (let p of ['styleWaistIn', 'crossSeamCurveStart', 'crossSeamCurveCp1']) {
    points[p] = points[p].shift(a + 180, delta/2)
  }
  points.styleWaistOut = points.styleWaistOut.shift(a, delta/2)

  paths.saBase = drawPath()
  paths.seam = paths.saBase
    .insop('dart', new Path().line(points.pocketCenter))
    .attr('class', 'fabric')
  paths.saBase.setRender(false)

  if (complete) {
    paths.pocketLine = new Path()
      .move(points.pocketLeft)
      .line(points.pocketRight)
      .attr('class', 'fabric dashed')
    if (sa) {
    }

    if (paperless) {
    }
  }

  return part
}
