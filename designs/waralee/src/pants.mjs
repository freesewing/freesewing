import { pantsProto } from './pantsproto.mjs'

export const pants = {
  name: 'waralee.pants',
  from: pantsProto,
  draft: ({ options, points, Path, paths, Snippet, snippets, sa, macro, store, expand, part }) => {
    const separateWaistband = options.separateWaistband || 'waistband' == options.frontPocketStyle

    if (expand) {
      // Expand is on, do not draw the part but flag this to the user
      store.flag.note({
        msg: `waralee:showPants`,
        suggest: {
          text: 'flag:hide',
          icon: 'expand',
          update: {
            settings: ['expand', 0],
          },
        },
      })
    } else {
      // Expand is off, do not draw the part but flag this to the user
      store.flag.note({
        msg: `waralee:hidePants`,
      })
      // Also hint about expand
      store.flag.preset('expand')

      return part.hide()
    }

    if (false == separateWaistband) {
      paths.waistFoldBack = new Path()
        .move(points.bWaistSideHem)
        .line(separateWaistband ? points.bWaistBackSeam : points.bWaistBackHem)
        .line(separateWaistband ? points.bWaistBackSeam : points.bWaistBackOverlapHem)
        .addClass('fabric stroke-sm')
      paths.waistFoldFront = new Path()
        .move(points.fWaistSideHem)
        .line(points.fWaistFrontOverlapHem)
        .addClass('fabric stroke-sm')
    }

    paths.frontFold = paths.front.offset(-1 * store.get('hem')).addClass('fabric stroke-sm')
    paths.legFold = paths.leg.offset(-1 * store.get('hem')).addClass('fabric stroke-sm')
    paths.backFold = paths.back.offset(-1 * store.get('hem')).addClass('fabric stroke-sm')

    paths.seam.unhide()

    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    points.title = points.fWaistFront.shift(270, 400)
    macro('title', {
      nr: 1,
      at: points.title,
      title: 'pants',
    })

    points.logo = points.title.shift(270, 75)
    snippets.logo = new Snippet('logo', points.logo)

    macro('scalebox', { at: points.mHip.shift(-90, 70) })

    if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')

    if (options.frontPocket && 'welt' == options.frontPocketStyle) {
      paths.frontPocket.unhide()
      paths.frontPocketSeam.unhide()
    }
    if (options.backPocket) {
      paths.backPocket.unhide()
    }

    let fWaistSide = separateWaistband ? points.fWaistSideSeam : points.fWaistSide
    let bWaistSide = separateWaistband ? points.bWaistSideSeam : points.bWaistSide
    macro('hd', {
      id: 1,
      from: fWaistSide,
      to: points.mWaist1,
      y: fWaistSide.y,
    })
    macro('hd', {
      id: 2,
      from: points.fWaistFrontOverlap,
      to: points.mWaist1,
      y: fWaistSide.y - sa - 15,
    })
    macro('hd', {
      id: 2,
      from: points.mWaist,
      to: bWaistSide,
      y: bWaistSide.y,
    })
    macro('hd', {
      id: 3,
      from: points.mWaist1,
      to: separateWaistband ? points.bWaistBackSeam : points.bWaistBack,
      y: bWaistSide.y - sa - 15,
    })
    macro('hd', {
      id: 4,
      from: points.mWaist1,
      to: separateWaistband ? points.bWaistBackSeam : points.bWaistBackOverlap,
      y: bWaistSide.y - sa - 30,
    })
    macro('vd', {
      id: 5,
      from: points.mWaist1,
      to: points.mHip,
      x: points.mWaist.x,
    })
    macro('vd', {
      id: 6,
      from: bWaistSide,
      to: separateWaistband ? points.bWaistBackSeam : points.bWaistBack,
      x: bWaistSide.x + 15,
    })
    macro('vd', {
      id: 7,
      from: separateWaistband ? points.bWaistBackSeam : points.bWaistBackOverlap,
      to: points.bLegBackOverlap,
      x: points.bLegBackOverlap.x - 30,
    })

    if (false == separateWaistband) {
      macro('vd', {
        id: 8,
        from: points.fWaistSide,
        to: points.fWaistSideHem,
        x: points.fWaistSide.x + 10,
      })

      if (options.frontPocket && 'welt' == options.frontPocketStyle) {
        macro('vd', {
          id: 9,
          from: fWaistSide,
          to: points.frontPocketTop,
          x: points.frontPocketTop.x,
        })
        macro('vd', {
          id: 10,
          from: fWaistSide,
          to: points.frontPocketBottom,
          x: points.frontPocketBottom.x,
        })
        macro('hd', {
          id: 11,
          from: points.frontPocketTop,
          to: fWaistSide,
          y: points.frontPocketTop.y,
        })
        macro('hd', {
          id: 12,
          from: points.frontPocketBottom,
          to: fWaistSide,
          y: points.frontPocketBottom.y,
        })
      }

      if (options.backPocket) {
        macro('vd', {
          id: 13,
          from: bWaistSide,
          to: points.backPocketLeft,
          x: points.backPocketLeft.x,
        })
        macro('vd', {
          id: 14,
          from: bWaistSide,
          to: points.backPocketRight,
          x: points.backPocketRight.x,
        })
        macro('hd', {
          id: 15,
          from: bWaistSide,
          to: points.backPocketLeft,
          y: points.backPocketLeft.y,
        })
        macro('hd', {
          id: 16,
          from: bWaistSide,
          to: points.backPocketRight,
          y: points.backPocketRight.y,
        })
      }
    }

    return part
  },
}
