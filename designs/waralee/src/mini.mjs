import { pantsProto } from './pantsproto.mjs'

// This is an idea to keep the printing to a minimum. The whole patterns is rather large.
// To keep you from printing it completely, you could print this part in paperless mode
// and only have a single sheet with all the dimensions on it.

function waraleeMini(part) {
  const { options, Path, points, paths, complete, sa, macro, store } = part.shorthand()

  let mini = options.minimizer
  let separateWaistband = options.separateWaistband
  if ('waistband' == options.frontPocketStyle) {
    separateWaistband = true
  }

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

  paths.cutOut = new Path()
    .move(separateWaistband ? points.bWaistSideSeam : points.bWaistSide)
    .line(points.mWaist2)
    .line(points.mWaist1)
    .line(separateWaistband ? points.fWaistSideSeam : points.fWaistSide)
    .attr('class', 'help')

  paths.seam.setRender(true)

  // Complete?
  if (complete) {
    macro('scalebox', { at: points.mLeg.shift(-90, 35) })

    if (options.frontPocket && 'welt' == options.frontPocketStyle) {
      paths.frontPocket.setRender(true)
    }
    if (options.backPocket) {
      paths.backPocket.setRender(true)
    }

    if (sa) {
      paths.sa = paths.seam.offset(sa / mini).attr('class', 'fabric sa')
    }

    points.pText1 = points.mHip
      .shiftFractionTowards(points.mLeg, 0.5)
      .attr('data-text', 'thisIsNotAPart')
      .attr('data-text-class', 'center')
    points.pText2 = points.mHip
      .shiftFractionTowards(points.mLeg, 0.6)
      .attr('data-text', 'doNotCutFromFabric')
      .attr('data-text-class', 'center')
    points.pText3 = points.mHip
      .shiftFractionTowards(points.mLeg, 0.7)
      .attr('data-text', 'useMeasurementsToCutFromFabric')
      .attr('data-text-class', 'center')

    let fWaistSide = separateWaistband ? points.fWaistSideSeam : points.fWaistSide
    let fWaistFrontOverlap = separateWaistband
      ? points.fWaistFrontOverlapSeam
      : points.fWaistFrontOverlap
    let bWaistSide = separateWaistband ? points.bWaistSideSeam : points.bWaistSide
    let bWaistBackOverlap = separateWaistband
      ? points.bWaistBackOverlapSeam
      : points.bWaistBackOverlap

    macro('hd', {
      from: points.fWaistFrontOverlap,
      to: fWaistSide,
      y: fWaistSide.y + 10,
      text: part.units(fWaistSide.dist(points.fWaistFrontOverlap) * mini),
    })
    macro('hd', {
      from: points.fLegFrontOverlap,
      to: points.bLegBackOverlap,
      y: points.bLegBackOverlap.y - 10,
      text: part.units(points.fLegFrontOverlap.dist(points.bLegBackOverlap) * mini),
    })
    macro('hd', {
      from: points.bWaistBack,
      to: points.bWaistBackOverlap,
      y: points.bWaistBackOverlap.y + 20,
      text: part.units(points.bWaistBackOverlap.dist(points.bWaistBack) * mini),
    })
    macro('hd', {
      from: points.fWaistFrontOverlap,
      to: points.mHip,
      y: points.mHip.y + 10,
      text: part.units((points.mHip.x - points.fWaistFrontOverlap.x) * mini),
    })
    macro('vd', {
      from: fWaistFrontOverlap,
      to: points.fLegFrontOverlap,
      x: points.fLegFrontOverlap.x + 10,
      text: part.units(fWaistFrontOverlap.dist(points.fLegFrontOverlap) * mini),
    })
    macro('vd', {
      from: points.bLegBackOverlap,
      to: bWaistBackOverlap,
      x: points.bLegBackOverlap.x - 10,
      text: part.units(bWaistBackOverlap.dist(points.bLegBackOverlap) * mini),
    })
    macro('vd', {
      from: points.bLegBackOverlap,
      to: bWaistSide,
      x: bWaistSide.x + 10,
      text: part.units((points.bLegBackOverlap.y - bWaistSide.y) * mini),
    })

    if (options.frontPocket && 'welt' == options.frontPocketStyle) {
      macro('hd', {
        from: fWaistFrontOverlap,
        to: points.frontPocketBottom2,
        y: points.frontPocketBottom2.y + 20,
        text: part.units((points.frontPocketBottom2.x - fWaistFrontOverlap.x) * mini),
      })
      macro('vd', {
        from: fWaistFrontOverlap,
        to: points.frontPocketBottom2,
        x: points.frontPocketBottom2.x + 20,
        text: part.units((points.frontPocketBottom2.y - fWaistFrontOverlap.y) * mini),
      })
    }

    if (options.backPocket) {
      macro('hd', {
        from: points.backPocketRight,
        to: bWaistBackOverlap,
        y: bWaistBackOverlap.y + 40,
        text: part.units((bWaistBackOverlap.x - points.backPocketRight.x) * mini),
      })
      macro('vd', {
        from: bWaistBackOverlap,
        to: points.backPocketRight,
        x: points.backPocketRight.x,
        text: part.units((points.backPocketRight.y - bWaistBackOverlap.y) * mini),
      })
    }
  }

  part.render = options.showMini

  return part
}

export const mini = {
  name: 'waralee.mini',
  from: pantsProto,
  draft: waraleeMini,
}
