export default (part) => {
  // Helper method to draw the outseam path
  const drawOutseam = () =>
    new Path()
      .move(points.slantTop)
      .line(points.slantCurveStart)
      .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
      .join(sideSeam.split(points.slantCurveEnd).pop())

  // Helper method to draw the outline path
  const drawPath = () => {
    let outseam = drawOutseam()
    return new Path()
      .move(points.floorIn)
      .curve(points.kneeInCp2, points.forkCp1, points.fork)
      .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
      .line(points.styleWaistIn)
      .line(points.slantTop)
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

  // Draw fly J-seam
  points.flyBottom = utils.curveIntersectsY(
    points.crotchSeamCurveStart,
    points.crotchSeamCurveCp2,
    points.crotchSeamCurveCp1,
    points.fork,
    points.cfSeat.shiftFractionTowards(points.crotchSeamCurveCp2, options.flyLength).y
  )
  points.flyExtensionBottom = utils.curveIntersectsY(
    points.crotchSeamCurveStart,
    points.crotchSeamCurveCp2,
    points.crotchSeamCurveCp1,
    points.fork,
    points.cfSeat.shiftFractionTowards(points.crotchSeamCurveCp2, options.flyLength * 1.25).y
  )
  points.flyTop = points.styleWaistOut.shiftFractionTowards(
    points.styleWaistIn,
    1 - options.flyWidth
  )
  points.flyCorner = points.flyTop.shift(
    points.styleWaistIn.angle(points.crotchSeamCurveStart),
    points.styleWaistIn.dist(points.flyBottom)
  )
  points.flyCurveStart = points.flyBottom.rotate(90, points.flyCorner)
  points.flyCurveCp1 = points.flyBottom.shiftFractionTowards(points.flyCorner, options.flyCurve)
  points.flyCurveCp2 = points.flyCurveStart.shiftFractionTowards(points.flyCorner, options.flyCurve)

  // Construct pocket slant
  points.slantTop = points.styleWaistIn.shiftFractionTowards(
    points.styleWaistOut,
    1 - options.frontPocketSlantWidth
  )
  points.slantLowest = sideSeam.intersectsY(points.fork.y).pop()
  store.set('slantWidth', points.styleWaistOut.dist(points.slantTop))
  store.set(
    'slantLength',
    sideSeam.split(points.slantLowest).shift().length() * options.frontPocketSlantDepth
  )
  points.slantBottom = sideSeam.shiftAlong(store.get('slantLength'))
  points.slantCurveStart = points.slantBottom.shiftFractionTowards(
    points.slantTop,
    options.frontPocketSlantRound
  )
  points.slantCurveEnd = sideSeam.shiftAlong(
    points.slantBottom.dist(points.slantCurveStart) + store.get('slantLength')
  )
  points.slantCurveCp1 = points.slantBottom.shiftFractionTowards(
    points.slantCurveStart,
    options.frontPocketSlantBend
  )
  points.slantCurveCp2 = sideSeam.shiftAlong(
    points.slantBottom.dist(points.slantCurveCp1) + store.get('slantLength')
  )

  // Construct pocket bag
  points.pocketbagTopRight = points.slantTop.shiftFractionTowards(
    points.styleWaistIn,
    options.frontPocketWidth
  )
  points.pocketbagBottomRight = points.pocketbagTopRight.shift(
    points.slantTop.angle(points.pocketbagTopRight) - 90,
    points.styleWaistIn.dy(points.fork) * options.frontPocketDepth * 1.5
  )
  points.pocketbagBottomCp2 = sideSeam.intersectsY(points.pocketbagBottomRight.y).pop()
  points.pocketbagBottom = points.pocketbagBottomRight.shiftFractionTowards(
    points.pocketbagBottomCp2,
    0.5
  )
  points.pocketbagBottomCp1 = points.slantCurveCp2.rotate(180, points.slantCurveEnd)

  // Construct facing boundary
  points.pocketFacingTop = points.slantTop.shiftFractionTowards(points.pocketbagTopRight, 0.35)
  points.facingDirection = points.slantCurveStart.shift(
    0,
    points.slantTop.dist(points.pocketFacingTop)
  )
  // YOLO
  points.pocketFacingBottom = new Path()
    .move(points.pocketFacingTop)
    .line(points.pocketFacingTop.shiftFractionTowards(points.facingDirection, 4))
    .intersects(
      new Path()
        .move(points.slantCurveStart)
        .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
        .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
        .line(points.pocketbagBottomRight)
    )
    .pop()

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
    points.slantBottomNotch = new Path()
      .move(points.slantCurveStart)
      .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
      .intersectsY(points.slantBottom.y)
      .pop()
    points.slantTopNotch = points.slantTop.shiftFractionTowards(points.slantCurveStart, 0.1)
    store.set('slantTopNotchDistance', points.slantTop.dist(points.slantTopNotch))
    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'slantBottomNotch',
        'slantTopNotch',
        'topPleat',
        'grainlineBottom',
        'flyBottom',
        'flyExtensionBottom'
      ]
    })
    let Jseam = new Path()
      .move(points.flyCurveStart)
      .curve(points.flyCurveCp2, points.flyCurveCp1, points.flyBottom)
    paths.Jseam = new Path()
      .move(points.flyTop)
      .join(Jseam)
      .attr('class', 'dashed')
      .attr('data-text', 'Left panel only')
      .attr('data-text-class', 'center')
    points.barTack1 = Jseam.reverse().shiftFractionAlong(0.1)
    points.barTack2a = Jseam.shiftFractionAlong(0.2)
    points.barTack2b = Jseam.shiftFractionAlong(0.35)
    paths.barTack1 = paths.Jseam.split(points.barTack1).pop().attr('class', 'bartack')
    paths.barTack2 = paths.Jseam.split(points.barTack2a)
      .pop()
      .split(points.barTack2b)
      .shift()
      .attr('class', 'bartack')
    paths.pocketBag = new Path()
      .move(points.slantTop)
      .line(points.slantCurveStart)
      .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
      .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
      .line(points.pocketbagBottomRight)
      .line(points.pocketbagTopRight)
      .move(points.pocketFacingTop)
      .line(points.pocketFacingBottom)
      .attr('class', 'lining dashed')

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
