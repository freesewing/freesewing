export default function (part) {
  let { options, points, paths, Snippet, snippets, complete, sa, paperless, macro, store } =
    part.shorthand()

  paths.waistFoldBack = paths.waistBack
    .offset(-1 * store.get('waistBand'))
    .attr('class', 'fabric stroke-sm')
  paths.waistFoldFront = paths.waistFront
    .offset(-1 * store.get('waistBand'))
    .attr('class', 'fabric stroke-sm')

  paths.frontFold = paths.front.offset(-1 * store.get('hem')).attr('class', 'fabric stroke-sm')
  paths.legFold = paths.leg.offset(-1 * store.get('hem')).attr('class', 'fabric stroke-sm')
  paths.backFold = paths.back.offset(-1 * store.get('hem')).attr('class', 'fabric stroke-sm')

  // Complete?
  if (complete) {
    points.logo = points.fWaistFront.shift(270, 400)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(-90, 50)
    macro('title', {
      nr: 1,
      at: points.title,
      title: 'pants',
    })
    macro('scalebox', { at: points.mHip.shift(-90, 70) })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.fWaistSide,
      to: points.mWaist,
      y: points.fWaistSide.y,
    })
    macro('hd', {
      from: points.fWaistFrontOverlap,
      to: points.mWaist,
      y: points.fWaistSide.y - sa - 15,
    })
    macro('hd', {
      from: points.mWaist,
      to: points.bWaistSide,
      y: points.bWaistSide.y,
    })
    macro('hd', {
      from: points.mWaist,
      to: points.bWaistBack,
      y: points.bWaistSide.y - sa - 15,
    })
    macro('hd', {
      from: points.mWaist,
      to: points.bWaistBackOverlap,
      y: points.bWaistSide.y - sa - 30,
    })
    macro('vd', {
      from: points.mWaist,
      to: points.mHip,
      x: points.mWaist.x,
    })
    macro('vd', {
      from: points.bWaistSide,
      to: points.bWaistBack,
      x: points.bWaistSide.x + 15,
    })
    macro('vd', {
      from: points.bWaistBackOverlap,
      to: points.bLegBackOverlap,
      x: points.bLegBackOverlap.x - 30,
    })

    if (options.frontPocket) {
      macro('vd', {
        from: points.fWaistSide,
        to: points.frontPocketTop,
        x: points.frontPocketTop.x,
      })
      macro('vd', {
        from: points.fWaistSide,
        to: points.frontPocketBottom,
        x: points.frontPocketBottom.x,
      })
      macro('hd', {
        from: points.frontPocketTop,
        to: points.fWaistSide,
        y: points.frontPocketTop.y,
      })
      macro('hd', {
        from: points.frontPocketBottom,
        to: points.fWaistSide,
        y: points.frontPocketBottom.y,
      })
    }
    if (options.backPocket) {
      macro('vd', {
        from: points.bWaistSide,
        to: points.backPocketLeft,
        x: points.backPocketLeft.x,
      })
      macro('vd', {
        from: points.bWaistSide,
        to: points.backPocketRight,
        x: points.backPocketRight.x,
      })
      macro('hd', {
        from: points.bWaistSide,
        to: points.backPocketLeft,
        y: points.backPocketLeft.y,
      })
      macro('hd', {
        from: points.bWaistSide,
        to: points.backPocketRight,
        y: points.backPocketRight.y,
      })
    }
  }

  return part
}
