export default (part) => {
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

  // Add fly extension
  points.flyBottom = utils.curveIntersectsY(
    points.crotchSeamCurveStart,
    points.crotchSeamCurveCp2,
    points.crotchSeamCurveCp1,
    points.fork,
    points.cfSeat.shiftFractionTowards(points.crotchSeamCurveCp2, options.flyLength).y
  )
  points.flyTop = points.styleWaistOut.shiftFractionTowards(
    points.styleWaistIn,
    1 + options.flyWidth
  )
  points.flyCorner = points.flyTop.shift(
    points.styleWaistIn.angle(points.flyBottom),
    points.styleWaistIn.dist(points.flyBottom)
  )
  points.flyCurveStart = points.flyBottom.rotate(-90, points.flyCorner)
  points.flyCurveCp1 = points.flyBottom.shiftFractionTowards(points.flyCorner, options.flyCurve)
  points.flyCurveCp2 = points.flyCurveStart.shiftFractionTowards(points.flyCorner, options.flyCurve)

  // Draw in pocket slant
  points.pocketSlantTop = points.styleWaistIn.shiftFractionTowards(
    points.styleWaistOut,
    1 - options.frontPocketSlantWidth
  )
  // FIXME: This won't always describe the right curve, will it?
  points.pocketSlantLowest = utils.lineIntersectsCurve(
    points.fork,
    points.fork.shiftFractionTowards(points.crotchSeamCurveCp1, 25),
    points.styleWaistOut,
    points.seatOut,
    points.kneeOutCp1,
    points.floorOut
  )
  let sideSeam = new Path()
    .move(points.styleWaistOut)
    .curve(points.seatOut, points.kneeOutCp1, points.floorOut)
  let slantDistOnCurve = sideSeam.split(points.pocketSlantLowest).shift().length()
  points.pocketSlantBottom = sideSeam.shiftAlong(slantDistOnCurve * options.frontPocketSlantDepth)

  paths.fly = new Path()
    .move(points.styleWaistIn)
    .line(points.flyTop)
    .line(points.flyCurveStart)
    .curve(points.flyCurveCp2, points.flyCurveCp1, points.flyBottom)
  paths.slant = new Path().move(points.pocketSlantTop).line(points.pocketSlantBottom)

  if (complete) {
    if (sa) {
    }

    if (paperless) {
    }
  }

  return part
}
