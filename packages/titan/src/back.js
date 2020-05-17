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

  points.H = new Point(-1 * measurements.backSeatArc * (1 + options.seatEase), 0)
  points.F = new Point(points.H.x, points.C.y)

  // For the widest point of our trouser block, we'll use whichever is widest:
  // A: 1.25 times the (backSeatArc + ease)
  // B: (upperLegCircumference + ease) - ((frontSeatArc + ease) * (1 + crotchExtension))
  let crotchWidthOptionA = measurements.backSeatArc * (1 + options.seatEase) * 1.25
  let crotchWidthOptionB =
    measurements.upperLegCircumference * (1 + options.upperLegEase) -
    measurements.frontSeatArc * (1 + options.seatEase) -
    measurements.seatCircumference * options.crotchExtension

  points.I = new Point(
    crotchWidthOptionA > crotchWidthOptionB ? crotchWidthOptionA : crotchWidthOptionB * -1,
    points.D.y
  )

  points.G = new Point(points.H.x, points.D.y)
  points.X = points.G.shift(90, measurements.crotchDepth / 2)

  points.N = points.H.shift(0, measurements.crotchDepth * options.backWaistFactor)
  points.O = points.N.shift(0, measurements.backWaistArc * (1 + options.backWaistDart))

  // Back dart
  points.P = points.N.shift(0, measurements.backWaistArc * 0.56)
  points.dartTip = points.P.shift(-90, measurements.crotchDepth * options.backWaistDartLength)
  points.theoreticDart1 = points.P.shift(0, (measurements.backWaistArc * options.backWaistDart) / 2)
  points.theoreticDart2 = points.theoreticDart1.flipX(points.P)

  points.T = points.N.shift(90, measurements.crotchDepth * options.backRise)

  points.extendedBackSeam = utils.beamsIntersect(points.I, points.D, points.T, points.X)
  points.g = utils.beamsIntersect(
    points.G,
    points.G.shift(135, 10),
    points.extendedBackSeam,
    points.X
  )
  points.f = utils.beamsIntersect(points.C, points.F, points.T, points.X)
  points.crossSeamCurveStart = points.f.shiftFractionTowards(
    points.extendedBackSeam,
    options.crossSeamCurveStart
  )
  points.crossSeamCurveCp = points.crossSeamCurveStart.shiftFractionTowards(
    points.extendedBackSeam,
    options.crossSeamCurveBend
  )

  // To insert a dart into a curve, we need to split the curve in two halves
  // Rather than split the whole curve, we split one that is what we'd end
  // up with with a closed dart, then shift the control points by half a dart.
  let dartWidth = points.theoreticDart1.dx(points.theoreticDart2) / 2
  let closedDartCurveEndpoint = points.T.shift(0, dartWidth)
  // Insert dart into waist seamline
  points.midDart = utils.curveIntersectsX(
    points.O,
    points.theoreticDart1,
    closedDartCurveEndpoint,
    closedDartCurveEndpoint,
    points.dartTip.x
  )
  points.dart1 = new Point(points.theoreticDart1.x, points.midDart.y)
  points.dart2 = new Point(points.theoreticDart2.x, points.midDart.y)
  // Two halves
  let [pathA, pathB] = new Path()
    .move(points.O)
    .curve_(points.theoreticDart1, closedDartCurveEndpoint)
    .attr('class', 'stroke-xl lining')
    .split(points.midDart)
  // Extract control points from splitted curve
  points.OCp2 = pathA.ops[1].cp1
  points.dart1Cp1 = pathA.ops[1].cp2.shift(0, dartWidth / 2)
  points.dart2Cp2 = pathB.ops[1].cp1.shift(180, dartWidth / 2)

  points.CCp2 = points.C.shiftFractionTowards(points.A, 0.3)

  points.W = points.D.shiftFractionTowards(points.I, options.grainlineBackFactor)
  points.grainlineTop = utils.beamsIntersect(
    points.W,
    points.W.shift(90, 10),
    points.dart2,
    points.T
  )
  points.knee = new Point(points.grainlineTop.x, measurements.naturalWaistToKnee)
  points.floor = new Point(points.grainlineTop.x, measurements.naturalWaistToFloor)
  points.grainlineBottom = points.floor

  let kneeEase = (measurements.kneeCircumference * options.kneeEase * options.legBalance) / 2
  points.kneeOut = points.knee.shift(0, measurements.kneeCircumference / 4 + kneeEase)
  points.kneeIn = points.kneeOut.flipX(points.knee)

  // FIXME: We're using ankleEntry here. But I think ankleCircumference would make more sense
  let ankleEase = (measurements.ankleEntry * options.ankleEase * options.legBalance) / 2
  points.floorOut = points.floor.shift(0, measurements.ankleEntry / 4 + ankleEase)
  points.floorIn = points.floorOut.flipX(points.floor)

  points.kneeInCp1 = points.floorIn.shiftFractionTowards(points.kneeIn, 1 + options.inseamCurve)
  points.kneeOutCp2 = points.floorOut.shiftFractionTowards(
    points.kneeOut,
    1 + options.outseamCurveKnee
  )
  points.CCp1 = points.A.shiftFractionTowards(points.C, 1 + options.outseamCurveSeat)

  // Path prior to fitting the cross seam
  /*
  paths.origSeam = new Path()
    .move(points.T)
    .line(points.crossSeamCurveStart)
    .curve_(points.crossSeamCurveCp, points.I)
    ._curve(points.kneeInCp1, points.kneeIn)
    .line(points.floorIn)
    .line(points.floorOut)
    .line(points.kneeOut)
    .curve(points.kneeOutCp2, points.CCp1, points.C)
    .curve_(points.CCp2, points.O)
    .curve(points.OCp2, points.dart1Cp1, points.dart1)
    .line(points.dartTip)
    .line(points.dart2)
    .curve_(points.dart2Cp2, points.T)
    .attr('class', 'fabric')
  */

  // Should we fit the cross seam?
  if (options.fitCrossSeam && options.fitBackCrossSeam) {
    // Helper method to calculate the actual length of the cross seam
    const crossSeamDelta = () => {
      let len = new Path()
        .move(points.T)
        .line(points.crossSeamCurveStart)
        .curve_(points.crossSeamCurveCp, points.I)
        .length()
      return len - measurements.backCrossSeam
    }
    // Clone some points
    points.fPreSpread = points.f.clone()
    points.fPostSpread = points.f.clone()
    points.CPreShift = points.C.clone()
    // Points involved in the slash and rotate
    let rotate = [
      'fPostSpread',
      'T',
      'midDart',
      'dart1',
      'dart2',
      'dartTip',
      'dart2Cp2',
      'dart1Cp1',
      'OCp2',
      'O',
      'CCp1',
      'CCp2'
    ]
    // Get to work
    let delta = crossSeamDelta()
    let run = 0
    do {
      run++
      for (const i of rotate)
        points[i] = points[i].rotate((delta / 5) * options.crossSeamFitBalance, points.C)
      points.I = points.I.shift(0, (delta / 2.5) * (1 - options.crossSeamFitBalance))
      points.extendedBackSeam = utils.beamsIntersect(
        points.I,
        points.D,
        points.T,
        points.crossSeamCurveStart
      )
      points.f = utils.beamsIntersect(points.C, points.F, points.T, points.crossSeamCurveStart)
      points.crossSeamCurveStart = points.f.shiftFractionTowards(
        points.extendedBackSeam,
        options.crossSeamCurveStart
      )
      points.crossSeamCurveCp = points.crossSeamCurveStart.shiftFractionTowards(
        points.extendedBackSeam,
        options.crossSeamCurveBend
      )
      delta = crossSeamDelta()
    } while (Math.abs(delta) > 0.5 && run < 50)
    // Now assure the horizontal width is respected
    let angle = points.C.angle(points.fPostSpread)
    points.tmp = utils.beamsIntersect(
      points.C,
      points.fPostSpread,
      points.T,
      points.crossSeamCurveStart
    )
    let distance = points.fPostSpread.dist(points.tmp)
    for (const i of ['C', 'CCp1', 'CCp2']) points[i] = points[i].shift(angle - 180, distance)
  }

  // Store inseam & outseam length
  store.set(
    'inseamBack',
    new Path().move(points.I)._curve(points.kneeInCp1, points.kneeIn).line(points.floorIn).length()
  )
  store.set(
    'outseamBack',
    new Path()
      .move(points.O)
      ._curve(points.CCp2, points.C)
      .curve(points.CCp1, points.kneeOutCp2, points.kneeOut)
      .line(points.floorOut)
      .length()
  )

  paths.seam = new Path()
    .move(points.T)
    .line(points.crossSeamCurveStart)
    .curve_(points.crossSeamCurveCp, points.I)
    ._curve(points.kneeInCp1, points.kneeIn)
    .line(points.floorIn)
    .line(points.floorOut)
    .line(points.kneeOut)
    .curve(points.kneeOutCp2, points.CCp1, points.C)
    .curve_(points.CCp2, points.O)
    .curve(points.OCp2, points.dart1Cp1, points.dart1)
    .line(points.dartTip)
    .line(points.dart2)
    .curve_(points.dart2Cp2, points.T)
    .attr('class', 'fabric')

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
