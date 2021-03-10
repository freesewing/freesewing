export default (part) => {
  // Helper method to draw the outseam path
  const drawOutseam = () => {
    // Helper object holding the Titan side seam path
    let sideSeam =
      points.waistOut.x < points.seatOut.x
        ? new Path()
            .move(points.styleWaistOut)
            .curve(points.seatOut, points.kneeOutCp1, points.floorOut)
        : new Path()
            .move(points.styleWaistOut)
            ._curve(points.seatOutCp1, points.seatOut)
            .curve(points.seatOutCp2, points.kneeOutCp1, points.floorOut)
    // Draw in pocket slant
    points.pocketSlantTop = points.styleWaistIn.shiftFractionTowards(
      points.styleWaistOut,
      1 - options.frontPocketSlantWidth
    )
    // Find lowest possible pocket slant point
    points.pocketSlantLowest = sideSeam.intersectsY(points.fork.y).pop()
    // Length to lowest possible slant point
    store.set(
      'slantLength',
      sideSeam.split(points.pocketSlantLowest).shift().length() * options.frontPocketSlantDepth
    )
    // Create actual slant point
    points.pocketSlantBottom = sideSeam.shiftAlong(store.get('slantLength'))

    // Handy for later
    store.set('frontSideSeam', sideSeam)

    return new Path()
      .move(points.pocketSlantTop)
      .line(points.pocketSlantBottom)
      .join(sideSeam.split(points.pocketSlantBottom).pop())
  }

  // Helper method to draw the outline path
  const drawPath = () =>
    drawOutseam()
      .line(points.floorIn)
      .curve(points.kneeInCp2, points.forkCp1, points.fork)
      .join(
        new Path()
          .move(points.fork)
          .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
          .split(points.flyBottom)
          .shift()
      )
      .curve(points.flyCurveCp1, points.flyCurveCp2, points.flyCurveStart)
      .line(points.flyTop)
      .line(points.styleWaistIn)
      .line(points.pocketSlantTop)
      .close()

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

  // Draw path
  paths.seam = drawPath().attr('class', 'fabric')

  if (complete) {
    points.titleAnchor = new Point(points.knee.x, points.fork.y)
    macro('title', {
      at: points.titleAnchor,
      nr: 2,
      title: 'front'
    })
    snippets.logo = new Snippet('logo', points.titleAnchor.shiftFractionTowards(points.knee, 0.5))
    points.topPleat = utils.beamsIntersect(
      points.styleWaistIn,
      points.styleWaistOut,
      points.knee,
      points.grainlineBottom
    )
    macro('sprinkle', {
      snippet: 'notch',
      on: ['styleWaistIn', 'pocketSlantBottom', 'topPleat', 'grainlineBottom']
    })
    paths.flyHint = new Path()
      .move(points.styleWaistIn)
      .line(points.crotchSeamCurveStart)
      .join(
        new Path()
          .move(points.crotchSeamCurveStart)
          .curve(points.crotchSeamCurveCp2, points.crotchSeamCurveCp1, points.fork)
          .split(points.flyBottom)
          .shift()
      )
      .attr('class', 'fabric stoke-sm dashed')
    paths.slantHint = new Path()
      .move(points.pocketSlantTop)
      .line(points.styleWaistOut)
      .join(store.get('frontSideSeam').split(points.pocketSlantBottom).shift())
      .attr('class', 'fabric stoke-sm dashed')

    if (sa) {
    }

    if (paperless) {
    }
  }

  return part
}
