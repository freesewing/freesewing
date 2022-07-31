// This is an idea to keep the printing to a minimum. The whole patterns is rather large.
// To keep you from printing it completely, you could print this part in paperless mode
// and only have a single sheet with all the dimensions on it.

export default function (part) {
  let {
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro,
    store,
  } = part.shorthand()

  let mini = options.minimizer

  for (var p in points) {
    points[p].x = points[p].x / mini
    points[p].y = points[p].y / mini
  }

  paths.waistFoldBack = paths.waistBack
    .offset((-1 * store.get('waistBand')) / mini)
    .attr('class', 'fabric stroke-sm')
  paths.waistFoldFront = paths.waistFront
    .offset((-1 * store.get('waistBand')) / mini)
    .attr('class', 'fabric stroke-sm')

  paths.frontFold = paths.front
    .offset((-1 * store.get('hem')) / mini)
    .attr('class', 'fabric stroke-sm')
  paths.legFold = paths.leg.offset((-1 * store.get('hem')) / mini).attr('class', 'fabric stroke-sm')
  paths.backFold = paths.back
    .offset((-1 * store.get('hem')) / mini)
    .attr('class', 'fabric stroke-sm')

  points.mWaist1 = new Point(points.mWaist.x, points.fWaistSide.y)
  points.mWaist2 = new Point(points.mWaist.x, points.bWaistSide.y)

  paths.cutOut = new Path()
    .move(points.bWaistSide)
    .line(points.mWaist2)
    .line(points.mWaist1)
    .line(points.fWaistSide)
    .attr('class', 'help')

  // Complete?
  if (complete) {
    macro('scalebox', { at: points.mLeg.shift(-90, 35) })

    if (sa) {
      paths.sa = paths.seam.offset(sa /mini).attr('class', 'fabric sa')
    }

    points.pText1 = points.mHip.shiftFractionTowards(points.mLeg, .5)
      .attr("data-text", "thisIsNotAPart")
      .attr("data-text-class", "center");
    points.pText2 = points.mHip.shiftFractionTowards(points.mLeg, .6)
      .attr("data-text", "doNotCutFromFabric")
      .attr("data-text-class", "center");
    points.pText3 = points.mHip.shiftFractionTowards(points.mLeg, .7)
      .attr("data-text", "useMeasurementsToCutFromFabric")
      .attr("data-text-class", "center");

      // Paperless?
  // if (paperless) {
    macro('hd', {
      from: points.fWaistFrontOverlap,
      to: points.fWaistSide,
      y: points.fWaistSide.y +10,
      text: part.units(points.fWaistSide.dist(points.fWaistFrontOverlap) * mini),
    })
    macro('hd', {
      from: points.fLegFrontOverlap,
      to: points.bLegBackOverlap,
      y: points.bLegBackOverlap.y -10,
      text: part.units(points.fLegFrontOverlap.dist(points.bLegBackOverlap) * mini),
    })
    macro('hd', {
      from: points.bWaistBack,
      to: points.bWaistBackOverlap,
      y: points.bWaistBackOverlap.y +20,
      text: part.units(points.bWaistBackOverlap.dist(points.bWaistBack) * mini),
    })
    macro('hd', {
      from: points.fWaistFrontOverlap,
      to: points.mHip,
      y: points.mHip.y +10,
      text: part.units((points.mHip.x -points.fWaistFrontOverlap.x) * mini),
    })
    macro('vd', {
      from: points.fWaistFrontOverlap,
      to: points.fLegFrontOverlap,
      x: points.fLegFrontOverlap.x +10,
      text: part.units(points.fWaistFrontOverlap.dist(points.fLegFrontOverlap) * mini),
    })
    macro('vd', {
      from: points.bLegBackOverlap,
      to: points.bWaistBackOverlap,
      x: points.bLegBackOverlap.x -10,
      text: part.units(points.bWaistBackOverlap.dist(points.bLegBackOverlap) * mini),
    })
    macro('vd', {
      from: points.bLegBackOverlap,
      to: points.bWaistSideTemp,
      x: points.bWaistSideTemp.x +10,
      text: part.units((points.bLegBackOverlap.y -points.bWaistSideTemp.y) * mini),
    })

    if (options.frontPocket) {
      macro('hd', {
        from: points.fWaistFrontOverlap,
        to: points.frontPocketBottom2,
        y: points.frontPocketBottom2.y +20,
        text: part.units((points.frontPocketBottom2.x -points.fWaistFrontOverlap.x) * mini),
      })
      macro('vd', {
        from: points.fWaistFrontOverlap,
        to: points.frontPocketBottom2,
        x: points.frontPocketBottom2.x +20,
        text: part.units((points.frontPocketBottom2.y -points.fWaistFrontOverlap.y) * mini),
      })
    }

    if (options.backPocket) {
      macro('hd', {
        from: points.backPocketRight,
        to: points.bWaistBackOverlap,
        y: points.bWaistBackOverlap.y +40,
        text: part.units((points.bWaistBackOverlap.x -points.backPocketRight.x) * mini),
      })
      macro('vd', {
        from: points.bWaistBack,
        to: points.backPocketRight,
        x: points.backPocketRight.x,
        text: part.units((points.backPocketRight.y -points.bWaistBack.y) * mini),
      })
    }
  }

  part.render = options.showMini 

  return part
}
