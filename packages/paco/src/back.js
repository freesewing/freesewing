export default function (part) {
  /*
   * Helper method to draw the inseam path
   */
  const drawInseam = () =>
    new Path().move(points.fork).curve(points.forkCp2, points.kneeInCp1, points.floorIn)
  /*
   * Helper method to draw the outseam path
   */
  const drawOutseam = (noPocketFlap = false) => {
    let waistOut = points.styleWaistOut || points.waistOut
    let outseam = new Path()
      .move(points.floorOut)
      .curve(points.kneeOutCp2, points.seatOut, waistOut)
    if (!options.frontPockets || noPocketFlap) return outseam
    else {
      // Split outseam at top and bottom, and inject pocket flap
      let split = outseam.split(points.pocketFlapBottomIn)
      return split[0]
        .join(
          new Path()
            .move(points.pocketFlapBottomIn)
            .line(points.pocketFlapBottomOut)
            .line(points.pocketFlapTopOut)
            .line(points.pocketFlapTopIn)
        )
        .join(split[1].split(points.pocketFlapTopIn).pop())
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

  // Shorthand call
  let {
    store,
    sa,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro
  } = part.shorthand()

  // Adapt bottom leg width based on heel & heel ease
  let quarterHeel = (measurements.heel * (1 + options.heelEase) * options.legBalance) / 2
  points.floorOut = points.floor.shift(0, quarterHeel)
  points.floorIn = points.floor.shift(180, quarterHeel)
  points.kneeOut = points.knee.shift(0, quarterHeel)
  points.kneeOutCp2 = points.kneeOut
  points.kneeIn = points.knee.shift(180, quarterHeel)
  points.kneeInCp1 = points.kneeIn

  // Shorter leg if we have an elasticated hem
  if (options.elasticatedHem) {
    for (const p of ['floor', 'floorIn', 'floorOut'])
      points[p] = points[p].shift(90, options.ankleElastic)
  }

  // Adapt waist so we can get these pants over our bum without a zipper
  let delta =
    (measurements.seat * options.legBalance) / 2 - points.styleWaistIn.dist(points.styleWaistOut)
  let angle = points.styleWaistIn.angle(points.styleWaistOut)
  points.styleWaistOut = points.styleWaistOut.shift(angle, delta)
  points.seatOut = points.seatOut.shift(angle, delta)

  // Cut the top of our pants short to make room for the waistband/elastic
  points.styleWaistOut = drawOutseam(true).reverse().shiftAlong(options.waistElastic)
  points.styleWaistIn = points.styleWaistIn.shiftTowards(
    points.crossSeamCurveStart,
    options.waistElastic
  )

  // Add the (optional) front pocket extention
  if (options.frontPockets) {
    let outseam = drawOutseam(true).reverse()
    points.pocketFlapTopIn = outseam.shiftAlong(options.frontPocketFlapSize)
    points.pocketFlapBottomIn = outseam.shiftAlong(
      options.frontPocketFlapSize + measurements.heel * options.frontPocketHeelRatio
    )
    points.pocketFlapTopOut = points.pocketFlapTopIn
      .shiftTowards(points.pocketFlapBottomIn, options.frontPocketFlapSize)
      .rotate(90, points.pocketFlapTopIn)
    points.pocketFlapBottomOut = points.pocketFlapBottomIn
      .shiftTowards(points.pocketFlapTopIn, options.frontPocketFlapSize)
      .rotate(-90, points.pocketFlapBottomIn)
    points.pocketFlapBottomOut = points.pocketFlapTopOut.shiftOutwards(
      points.pocketFlapBottomOut,
      options.frontPocketFlapSize
    )
  }

  // Add markings for the (optional) back pockets
  if (options.backPockets) {
    const pocketWidth = () =>
      points.styleWaistOut.dist(points.styleWaistIn) * options.backPocketWidthRatio
    let angle = points.styleWaistOut.angle(points.styleWaistIn)
    points.pocketWaistCenter = points.styleWaistIn.shiftFractionTowards(
      points.styleWaistOut,
      options.backPocketWaistRatio
    )
    points.pocketCenter = points.pocketWaistCenter.shift(
      angle + 90,
      points.styleWaistIn.dist(points.crossSeamCurveStart) * options.backPocketHeightRatio
    )
    points.pocketLeft = points.pocketCenter.shift(angle, pocketWidth() / 2)
    points.pocketRight = points.pocketLeft.rotate(180, points.pocketCenter)
    // Pocket bag
    points.pocketBagWaistLeft = points.pocketWaistCenter.shift(angle, pocketWidth() / 1.5)
    points.pocketBagWaistRight = points.pocketBagWaistLeft.rotate(180, points.pocketWaistCenter)
    points.pocketBagBottomCenter = points.pocketCenter.shift(angle + 90, pocketWidth() * 1.5)
    points.pocketBagBottomLeft = points.pocketBagBottomCenter.shift(angle, pocketWidth() / 1.5)
    points.pocketBagBottomRight = points.pocketBagBottomLeft.rotate(
      180,
      points.pocketBagBottomCenter
    )
  }

  // Now draw the outline
  paths.seam = drawPath()

  // Store inseam & outseam length
  store.set('pacoInseamBack', drawInseam().length())
  store.set('pacoOutseamBack', drawOutseam(true).length())
  // Store top length
  store.set('backWaist', points.styleWaistIn.dist(points.styleWaistOut))

  if (complete) {
    if (options.backPockets) {
      paths.pocket = new Path()
        .move(points.pocketLeft)
        .line(points.pocketRight)
        .attr('class', 'farbic lashed')
      paths.pocketBag = new Path()
        .move(points.pocketBagWaistLeft)
        .line(points.pocketBagBottomLeft)
        .line(points.pocketBagBottomRight)
        .line(points.pocketBagWaistRight)
        .attr('class', 'lining lashed')
      macro('sprinkle', {
        snippet: 'bnotch',
        on: ['pocketLeft', 'pocketRight', 'pocketBagWaistLeft', 'pocketBagWaistRight']
      })
    }

    if (sa) {
      let waistIn = points.styleWaistIn || points.waistIn
      let hemOffset = options.elasticatedHem ? sa : 4 * sa
      paths.sa = drawInseam()
        .offset(sa)
        .join(new Path().move(points.floorIn).line(points.floorOut).offset(hemOffset))
        .join(drawOutseam().offset(sa).trim())
        .join(
          new Path()
            .move(points.styleWaistOut)
            .line(waistIn)
            .line(points.crossSeamCurveStart)
            .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
            .offset(sa)
        )
        .close()
        .attr('class', 'fabric sa')
    }

    if (paperless) {
    }
  }

  return part
}
