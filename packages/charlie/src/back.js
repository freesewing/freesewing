export default (part) => {
  // Helper method to draw the outseam path
  const drawOutseam = () => {
    let waistOut = points.styleWaistOut || points.waistOut
    if (points.waistOut.x > points.seatOut.x) {
      let outseam = new Path()
        .move(points.styleWaistOut)
        .curve(points.seatOut, points.kneeOutCp2, points.floorOut)
      return new Path()
        .move(points.slantOut)
        .line(points.pocketOpeningTop)
        .line(points.pocketOpeningTopIn)
        .line(points.pocketOpeningBottomIn)
        .line(points.pocketOpeningBottom)
        .line(points.slantBottom)
        .join(outseam.split(points.slantBottom).pop())
        .reverse()
    } else {
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
    return drawOutseam()
      .line(points.backDartRight)
      .noop('dart')
      .line(points.backDartLeft)
      .line(waistIn)
      .line(points.crossSeamCurveStart)
      .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
      .curve(points.forkCp2, points.kneeInCp1, points.floorIn)
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
  points.tmp1 = points.waistPocketCenter.rotate(6.66, points.pocketCenter)
  points.tmp2 = points.waistPocketCenter.rotate(-6.66, points.pocketCenter)
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

  // Construct pocket tab
  if (points.waistOut.x > points.seatOut.x) {
    let outseam = new Path()
      .move(points.styleWaistOut)
      .curve(points.seatOut, points.kneeOutCp2, points.floorOut)
    points.slantBottom = outseam.shiftAlong(store.get('slantLength'))
  }
  points.slantOut = points.styleWaistIn.shiftOutwards(points.styleWaistOut, store.get('slantWidth'))
  points.pocketOpeningTop = points.slantOut.shiftTowards(
    points.slantBottom,
    store.get('pocketTabStart')
  )
  points.pocketOpeningBottom = points.pocketOpeningTop.shiftTowards(
    points.slantBottom,
    store.get('pocketTabInnerLength')
  )
  let slant = points.slantOut.angle(points.slantBottom)
  points.pocketOpeningTopIn = points.pocketOpeningTop.shift(slant + 90, store.get('pocketTabWidth'))
  points.pocketOpeningBottomIn = points.pocketOpeningTopIn.shift(
    slant,
    store.get('pocketTabOuterLength')
  )

  // Store waistband length
  store.set(
    'waistbandBack',
    points.styleWaistIn.dist(points.backDartLeft) + points.backDartRight.dist(points.styleWaistOut)
  )

  paths.saBase = drawPath()
  paths.seam = paths.saBase
    .insop('dart', new Path().line(points.pocketCenter))
    .close()
    .attr('class', 'fabric')
  paths.saBase.setRender(false)

  if (complete) {
    paths.pocketLine = new Path()
      .move(points.pocketLeft)
      .line(points.pocketRight)
      .attr('class', 'fabric dashed')
    points.titleAnchor = new Point(points.knee.x, points.fork.y)
    macro('title', {
      at: points.titleAnchor,
      nr: 1,
      title: 'back'
    })
    snippets.logo = new Snippet('logo', points.titleAnchor.shiftFractionTowards(points.knee, 0.5))
    macro('sprinkle', {
      snippet: 'bnotch',
      on: ['grainlineBottom', 'slantBottom', 'styleWaistOut']
    })
    paths.fold = new Path()
      .move(points.pocketOpeningTop)
      .line(points.pocketOpeningBottom)
      .attr('class', 'help')

    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(
          new Path()
            .move(points.floorIn)
            .line(points.floorOut)
            .offset(sa * 3)
        )
        .close()
        .attr('class', 'fabric sa')
    }

    if (paperless) {
    }
  }

  return part
}
