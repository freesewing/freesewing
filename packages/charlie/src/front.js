export default (part) => {
  // Helper method to draw the outseam path
  const drawOutseam = () =>
    new Path()
      .move(points.pocketSlantTop)
      .line(points.pocketOpeningTop)
      .line(points.pocketOpeningTopIn)
      .line(points.pocketOpeningBottomIn)
      .line(points.pocketOpeningBottom)
      .line(points.pocketSlantBottom)
      .join(sideSeam.split(points.pocketSlantBottom).pop())

  // Helper method to draw the outline path
  const drawPath = () => {
    let outseam = drawOutseam()
    return new Path()
      .move(points.floorIn)
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
      .join(outseam)
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

  // Helper object holding the Titan side seam path
  const sideSeam =
    points.waistOut.x < points.seatOut.x
      ? new Path()
          .move(points.styleWaistOut)
          .curve(points.seatOut, points.kneeOutCp1, points.floorOut)
      : new Path()
          .move(points.styleWaistOut)
          ._curve(points.seatOutCp1, points.seatOut)
          .curve(points.seatOutCp2, points.kneeOutCp1, points.floorOut)

  // Construct pocket slant
  points.pocketSlantTop = points.styleWaistIn.shiftFractionTowards(
    points.styleWaistOut,
    1 - options.frontPocketSlantWidth
  )
  points.pocketSlantLowest = sideSeam.intersectsY(points.fork.y).pop()
  store.set('slantWidth', points.styleWaistOut.dist(points.pocketSlantTop))
  store.set(
    'slantLength',
    sideSeam.split(points.pocketSlantLowest).shift().length() * options.frontPocketSlantDepth
  )
  points.pocketSlantBottom = sideSeam.shiftAlong(store.get('slantLength'))

  // Construct front pocket
  let slant = points.pocketSlantTop.angle(points.pocketSlantBottom)
  let base = points.pocketSlantTop.dist(points.pocketSlantBottom)
  points.pocketOpeningTop = points.pocketSlantTop.shift(
    slant,
    (base * (1 - options.frontPocketOpening)) / 2
  )
  points.pocketOpeningBottom = points.pocketSlantBottom.shift(
    slant + 180,
    (base * (1 - options.frontPocketOpening)) / 2
  )
  points.pocketOpeningTopIn = points.pocketOpeningTop.shift(
    slant - 90,
    base * options.frontPocketEntry
  )
  points.pocketOpeningBottomIn = utils.beamIntersectsY(
    points.pocketOpeningTopIn,
    points.pocketOpeningTopIn.shift(slant, 666),
    points.pocketSlantBottom.y
  )
  macro('mirror', {
    mirror: [points.pocketOpeningTop, points.pocketOpeningBottom],
    points: [points.pocketOpeningTopIn, points.pocketOpeningBottomIn]
  })
  store.set('pocketTabWidth', base * options.frontPocketEntry)
  store.set('pocketTabInnerLength', points.pocketOpeningTop.dist(points.pocketOpeningBottom))
  store.set(
    'pocketTabOuterLength',
    points.mirroredPocketOpeningTopIn.dist(points.mirroredPocketOpeningBottomIn)
  )
  store.set('pocketTabStart', points.pocketSlantTop.dist(points.pocketOpeningTop))

  // Construct pocket bag
  points.pocketbagTopLeft = utils.beamsIntersect(
    points.mirroredPocketOpeningBottomIn,
    points.mirroredPocketOpeningTopIn,
    points.pocketSlantTop,
    points.styleWaistIn
  )
  points.pocketbagTopRight = points.pocketbagTopLeft.shiftFractionTowards(
    points.styleWaistIn,
    options.frontPocketWidth
  )
  points.pocketbagBottomRight = points.pocketbagTopRight.shift(
    points.pocketbagTopLeft.angle(points.pocketbagTopRight) - 90,
    points.styleWaistIn.dy(points.fork) * options.frontPocketDepth * 1.5
  )
  points.pocketbagBump = utils.beamIntersectsY(
    points.mirroredPocketOpeningTopIn,
    points.mirroredPocketOpeningBottomIn,
    points.pocketSlantLowest.y
  )
  points.pocketbagBottomCp = new Point(
    points.mirroredPocketOpeningBottomIn.x,
    points.pocketbagBottomRight.y
  )
  points.pocketbagBottom = points.pocketbagBottomRight.shiftFractionTowards(
    points.pocketbagBottomCp,
    0.5
  )

  // Draw path
  paths.seam = drawPath().close().attr('class', 'fabric')

  // Store waistband length
  store.set('waistbandFront', points.styleWaistIn.dist(points.styleWaistOut))
  store.set('waistbandFly', points.styleWaistIn.dist(points.flyTop))

  if (complete) {
    points.titleAnchor = new Point(points.knee.x, points.fork.y)
    macro('title', {
      at: points.titleAnchor,
      nr: 2,
      title: 'front'
    })
    snippets.logo = new Snippet('logo', points.titleAnchor.shiftFractionTowards(points.knee, 0.666))
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
    paths.pocketEntry = new Path()
      .move(points.pocketOpeningTop)
      .line(points.mirroredPocketOpeningTopIn)
      .line(points.mirroredPocketOpeningBottomIn)
      .line(points.pocketOpeningBottom)
      .attr('class', 'fabric dashed stroke-sm')
    paths.pocketFold = new Path()
      .move(points.pocketOpeningTop)
      .line(points.pocketOpeningBottom)
      .attr('class', 'help')
    paths.pocketBag = new Path()
      .move(points.pocketbagTopRight)
      .line(points.pocketbagBottomRight)
      .line(points.pocketbagBottom)
      .curve(points.pocketbagBottomCp, points.pocketbagBump, points.mirroredPocketOpeningBottomIn)
      .line(points.pocketbagTopLeft)
      .attr('class', 'lining dashed')
    macro('sprinkle', {
      snippet: 'notch',
      on: ['pocketbagTopLeft', 'pocketbagTopRight']
    })

    if (sa) {
      paths.sa = drawPath()
        .offset(sa)
        .join(
          new Path()
            .move(points.floorOut)
            .line(points.floorIn)
            .offset(sa * 3)
        )
        .close()
        .trim()
        .attr('class', 'fabric sa')
    }

    if (paperless) {
    }
  }

  return part
}
