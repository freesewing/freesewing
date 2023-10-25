import { pantsProto } from './pantsproto.mjs'

// This is an idea to keep the printing to a minimum. The whole patterns is rather large.
// To keep you from printing it completely, you could print this part in paperless mode
// and only have a single sheet with all the dimensions on it.

export const mini = {
  name: 'waralee.mini',
  from: pantsProto,
  draft: ({ options, Path, points, paths, sa, macro, store, expand, part }) => {
    if (expand) {
      return part.hide()
    }

    const mini = points.bWaistBackOverlapSeam.dist(points.fWaistFrontOverlapSeam) / 150
    const separateWaistband = options.separateWaistband || 'waistband' == options.frontPocketStyle

    for (const p in points) {
      points[p].x = points[p].x / mini
      points[p].y = points[p].y / mini
    }

    paths.waistFoldBack = paths.waistBack
      .offset((-1 * store.get('waistBand')) / mini)
      .addClass('fabric stroke-sm')
    paths.waistFoldFront = paths.waistFront
      .offset((-1 * store.get('waistBand')) / mini)
      .addClass('fabric stroke-sm')

    paths.frontFold = paths.front
      .offset((-1 * store.get('hem')) / mini)
      .addClass('fabric stroke-sm')
    paths.legFold = paths.leg.offset((-1 * store.get('hem')) / mini).addClass('fabric stroke-sm')
    paths.backFold = paths.back.offset((-1 * store.get('hem')) / mini).addClass('fabric stroke-sm')

    paths.cutOut = new Path()
      .move(separateWaistband ? points.bWaistSideSeam : points.bWaistSide)
      .line(points.mWaist2)
      .line(points.mWaist1)
      .line(separateWaistband ? points.fWaistSideSeam : points.fWaistSide)
      .addClass('help')

    paths.seam.unhide()

    macro('scalebox', { at: points.mLeg.shift(-90, 35) })

    if (options.frontPocket && 'welt' == options.frontPocketStyle) {
      paths.frontPocket.unhide()
    }
    if (options.backPocket) {
      paths.backPocket.unhide()
    }

    if (sa) {
      paths.sa = paths.seam.offset(sa / mini).addClass('fabric sa')
    }

    points.pText1 = points.mHip
      .shiftFractionTowards(points.mLeg, 0.5)
      .addText('waralee:thisIsNotAPart', 'center')
    points.pText2 = points.mHip
      .shiftFractionTowards(points.mLeg, 0.6)
      .addText('waralee:doNotCutFromFabric', 'center')
    points.pText3 = points.mHip
      .shiftFractionTowards(points.mLeg, 0.7)
      .addText('waralee:useMeasurementsToCutFromFabric', 'center')

    const fWaistSide = separateWaistband ? points.fWaistSideSeam : points.fWaistSide
    const fWaistFrontOverlap = separateWaistband
      ? points.fWaistFrontOverlapSeam
      : points.fWaistFrontOverlap
    const bWaistSide = separateWaistband ? points.bWaistSideSeam : points.bWaistSide
    const bWaistBackOverlap = separateWaistband
      ? points.bWaistBackOverlapSeam
      : points.bWaistBackOverlap

    macro('hd', {
      id: 1,
      from: points.fWaistFrontOverlap,
      to: fWaistSide,
      y: fWaistSide.y + 10,
      text: part.units(fWaistSide.dist(points.fWaistFrontOverlap) * mini),
      force: true,
    })
    macro('hd', {
      id: 2,
      from: points.fLegFrontOverlap,
      to: points.bLegBackOverlap,
      y: points.bLegBackOverlap.y - 10,
      text: part.units(points.fLegFrontOverlap.dist(points.bLegBackOverlap) * mini),
      force: true,
    })
    macro('hd', {
      id: 3,
      from: points.bWaistBack,
      to: points.bWaistBackOverlap,
      y: points.bWaistBackOverlap.y + 20,
      text: part.units(points.bWaistBackOverlap.dist(points.bWaistBack) * mini),
      force: true,
    })
    macro('hd', {
      id: 4,
      from: points.fWaistFrontOverlap,
      to: points.mHip,
      y: points.mHip.y + 10,
      text: part.units((points.mHip.x - points.fWaistFrontOverlap.x) * mini),
      force: true,
    })
    macro('vd', {
      id: 5,
      from: fWaistFrontOverlap,
      to: points.fLegFrontOverlap,
      x: points.fLegFrontOverlap.x + 10,
      text: part.units(fWaistFrontOverlap.dist(points.fLegFrontOverlap) * mini),
      force: true,
    })
    macro('vd', {
      id: 6,
      from: points.bLegBackOverlap,
      to: bWaistBackOverlap,
      x: points.bLegBackOverlap.x - 10,
      text: part.units(bWaistBackOverlap.dist(points.bLegBackOverlap) * mini),
      force: true,
    })
    macro('vd', {
      id: 7,
      from: points.bLegBackOverlap,
      to: bWaistSide,
      x: bWaistSide.x + 10,
      text: part.units((points.bLegBackOverlap.y - bWaistSide.y) * mini),
      force: true,
    })

    if (options.frontPocket && 'welt' == options.frontPocketStyle) {
      macro('hd', {
        id: 8,
        from: fWaistFrontOverlap,
        to: points.frontPocketBottom2,
        y: points.frontPocketBottom2.y + 20,
        text: part.units((points.frontPocketBottom2.x - fWaistFrontOverlap.x) * mini),
        force: true,
      })
      macro('vd', {
        id: 9,
        from: fWaistFrontOverlap,
        to: points.frontPocketBottom2,
        x: points.frontPocketBottom2.x + 20,
        text: part.units((points.frontPocketBottom2.y - fWaistFrontOverlap.y) * mini),
        force: true,
      })
    }

    if (options.backPocket) {
      macro('hd', {
        id: 10,
        from: points.backPocketRight,
        to: bWaistBackOverlap,
        y: bWaistBackOverlap.y + 40,
        text: part.units((bWaistBackOverlap.x - points.backPocketRight.x) * mini),
        force: true,
      })
      macro('vd', {
        id: 11,
        from: bWaistBackOverlap,
        to: points.backPocketRight,
        x: points.backPocketRight.x,
        text: part.units((points.backPocketRight.y - bWaistBackOverlap.y) * mini),
        force: true,
      })
    }
    return part
  },
}
