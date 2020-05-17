export default (part) => {
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

  points.A = new Point(0, 0)
  points.D = new Point(0, measurements.crotchDepth)
  points.C = new Point(0, measurements.naturalWaistToSeat)

  points.L = new Point(measurements.frontSeatArc * (1 + options.seatEase), 0)
  points.J = new Point(points.L.x, points.C.y)
  points.K = new Point(points.L.x, points.D.y)
  points.M = points.K.shift(
    0,
    measurements.seatCircumference * options.crotchExtension * options.frontCrotchExtension
  )
  points.X = points.K.shiftFractionTowards(points.L, options.flySlopeHinge)
  points.Q = points.L.shift(180, points.X.y * options.flySlopeFactor)
  points.R = points.Q.shift(180, measurements.frontWaistArc * (1 + options.frontWaistDart))
  points.U = points.Q.shift(90, measurements.frontWaistArc * options.frontWaistRise)

  points.flyCurveMax = utils.beamsIntersect(points.U, points.X, points.M, points.M.shift(165, 10))
  points.flyCurveStart = points.X.shiftFractionTowards(points.flyCurveMax, options.flyCurveStart)
  points.flyCurveCp2 = points.flyCurveStart.shiftFractionTowards(
    points.flyCurveMax,
    options.flyCurveBend
  )
  points.flyCurveCp1 = points.M.shiftFractionTowards(points.flyCurveMax, options.flyCurveBend)

  points.CCp1 = points.C.shift(90, points.C.y / 2)
  points.Z = points.D.shiftFractionTowards(points.M, 0.52)

  points.S = utils.beamsIntersect(points.Z, points.Z.shift(90, 10), points.R, points.U)
  points.dartTip = points.S.shift(-90, points.X.y * options.frontWaistDartLength)
  points.dart1 = points.S.shift(0, (measurements.frontWaistArc * options.frontWaistDart) / 2)
  points.dart2 = points.dart1.rotate(180, points.S)

  points.grainlineTop = points.S.clone()
  points.floor = new Point(points.grainlineTop.x, measurements.naturalWaistToFloor)
  points.grainlineBottom = points.floor

  points.knee = new Point(points.grainlineTop.x, measurements.naturalWaistToKnee)
  let kneeEase = (measurements.kneeCircumference * options.kneeEase * (1 - options.legBalance)) / 2
  points.kneeOut = points.knee.shift(180, measurements.kneeCircumference / 4 + kneeEase)
  points.kneeIn = points.kneeOut.flipX(points.knee)

  // FIXME: We're using ankleEntry here. But I think ankleCircumference would make more sense
  let ankleEase = (measurements.ankleEntry * options.ankleEase * (1 - options.legBalance)) / 2
  points.floorOut = points.floor.shift(180, measurements.ankleEntry / 4 + ankleEase)
  points.floorIn = points.floorOut.flipX(points.floor)

  points.kneeInCp2 = points.floorIn.shiftFractionTowards(points.kneeIn, 1 + options.inseamCurve)
  points.kneeOutCp1 = points.floorOut.shiftFractionTowards(
    points.kneeOut,
    1 + options.outseamCurveKnee
  )

  points.CCp2 = points.CCp1.rotate(180, points.C)

  // Quick method to draw the path
  const seamPath = () =>
    new Path()
      .move(points.R)
      ._curve(points.CCp1, points.C)
      .curve(points.CCp2, points.kneeOutCp1, points.kneeOut)
      .line(points.floorOut)
      .line(points.floorIn)
      .line(points.kneeIn)
      .curve_(points.kneeInCp2, points.M)
      .curve(points.flyCurveCp1, points.flyCurveCp2, points.flyCurveStart)
      .line(points.U)
      .line(points.dart1)
      .line(points.dartTip)
      .line(points.dart2)
      .line(points.R)
      .close()

  // Path before fitting cross seam
  //paths.origSeam = seamPath()

  // Should we fit the cross seam?
  if (options.fitCrossSeam && options.fitFrontCrossSeam) {
    // Helper method to calculate the actual length of the cross seam
    const crossSeamDelta = () => {
      let len = new Path()
        .move(points.U)
        .line(points.flyCurveStart)
        .curve(points.flyCurveCp2, points.flyCurveCp1, points.M)
        .length()
      return len - measurements.frontCrossSeam
    }
    let rotate = ['flyCurveStart', 'X', 'U', 'L', 'Q', 'dart1', 'dart2', 'S', 'dartTip', 'R']
    // Store the original flycurve
    const flyCurvePreFit = new Path()
      .move(points.flyCurveStart)
      .curve(points.flyCurveCp2, points.flyCurveCp1, points.M)
    // Get to work
    let delta = crossSeamDelta()
    let run = 0
    do {
      run++
      for (const i of rotate)
        points[i] = points[i].rotate((delta / -5) * options.crossSeamFitBalance, points.C)
      points.M = points.flyCurveCp1.shiftOutwards(
        points.M,
        (delta / -1) * (1 - options.crossSeamFitBalance)
      )
      points.flyCurveMax = utils.beamsIntersect(
        points.U,
        points.X,
        points.M,
        points.M.shift(165, 10)
      )
      points.flyCurveStart = points.X.shiftFractionTowards(
        points.flyCurveMax,
        options.flyCurveStart
      )
      points.flyCurveCp2 = points.flyCurveStart.shiftFractionTowards(
        points.flyCurveMax,
        options.flyCurveBend
      )
      points.flyCurveCp1 = points.M.shiftFractionTowards(points.flyCurveMax, options.flyCurveBend)

      delta = crossSeamDelta()
    } while (Math.abs(delta) > 0.5 && run < 5)
    // Now assure the horizontal width is respected
    const flyCurvePostFit = new Path()
      .move(points.flyCurveStart)
      .curve(points.flyCurveCp2, points.flyCurveCp1, points.M)
    for (const i of ['CCp1', 'C', 'CCp2'])
      points[i] = points[i].shift(
        180,
        flyCurvePostFit.intersectsY(points.C.y)[0].x - flyCurvePreFit.intersectsY(points.C.y)[0].x
      )
  }
  //paths.intermediateSeam = seamPath().attr('class', 'various')

  /*
   * With the cross seams matched back and front,
   * we still have to match the inseam and outseam
   * (positive values = front is too long)
   */
  const inseamDelta = () => {
    store.set(
      'inseamFront',
      new Path()
        .move(points.M)
        ._curve(points.kneeInCp2, points.kneeIn)
        .line(points.floorIn)
        .length()
    )
    return store.get('inseamFront') - store.get('inseamBack')
  }
  const outseamDelta = () => {
    store.set(
      'outseamFront',
      new Path()
        .move(points.R)
        ._curve(points.CCp1, points.C)
        .curve(points.CCp2, points.kneeOutCp1, points.kneeOut)
        .line(points.floorOut)
        .length()
    )
    return store.get('outseamFront') - store.get('outseamBack')
  }
  const seamDelta = () => {
    let inseam = inseamDelta()
    let outseam = outseamDelta()
    return Math.abs(inseam) > Math.abs(outseam) ? outseam : inseam
  }
  if ((inseamDelta() < 0 && outseamDelta() < 0) || (inseamDelta() > 0 && outseamDelta() > 0)) {
    // Front is too short/long on both sides. Figure out smallest delta
    let shift = [
      'kneeInCp2',
      'kneeOutCp1',
      'kneeIn',
      'kneeOut',
      'knee',
      'floorIn',
      'floorOut',
      'floor',
      'grainlineBottom'
    ]
    let delta = seamDelta()
    let run = 0
    do {
      run++
      for (const i of shift) points[i] = points[i].shift(90, delta)
      delta = seamDelta()
    } while (Math.abs(delta) > 1 && run < 10)
  } else {
    // There's an inbalance between back and front. Let's assume this will never happen
    throw new Error('Unhandled inbalance between front and back inseam/outseam lengths')
  }
  // Which one needs fixing?
  // in any case, we'll slash from R to M to fix this
  let deltaMethod, factor
  if (Math.abs(inseamDelta()) > 1) {
    deltaMethod = inseamDelta
    factor = -1
  } else {
    deltaMethod - outseamDelta
    factor = 1
  }
  let rotate = [
    'dart1',
    'dart2',
    'S',
    'dartTip',
    'U',
    'Q',
    'X',
    'flyCurveStart',
    'flyCurveCp1',
    'flyCurveCp2'
  ]
  rotate.push(factor === -1 ? 'M' : 'R')
  let run = 0
  let delta = deltaMethod()
  do {
    for (const i of rotate)
      points[i] = points[i].rotate((delta / 10) * factor, points[factor === -1 ? 'R' : 'M'])
    run++
    delta = deltaMethod()
  } while (Math.abs(delta) > 1 && run < 20)

  paths.seam = seamPath().attr('class', 'fabric')

  if (complete) {
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom
    })

    if (paperless) {
    }
  }

  return part
}
