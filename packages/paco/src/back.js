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
  points.floorOut = points.floor.shift(0, quarterHeel).shift(90, options.ankleElastic)
  points.floorIn = points.floor.shift(180, quarterHeel).shift(90, options.ankleElastic)
  points.kneeOut = points.knee.shift(0, quarterHeel)
  points.kneeOutCp2 = points.kneeOut
  points.kneeIn = points.knee.shift(180, quarterHeel)
  points.kneeInCp1 = points.kneeIn

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

  // Now draw the outline
  paths.seam = drawPath()

  // Store inseam & outseam length
  store.set('pacoInseamBack', drawInseam().length())
  store.set('pacoOutseamBack', drawOutseam(true).length())
  // Store top length
  store.set('backWaist', points.styleWaistIn.dist(points.styleWaistOut))

  //macro('ld', {
  //  from: points.styleWaistIn,
  //  to: points.styleWaistOut,
  //  d: 15
  //})

  return part
}
