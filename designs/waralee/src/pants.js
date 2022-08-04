export default function (part) {
  let { options, points, Path, paths, Snippet, snippets, complete, sa, paperless, macro, store } =
    part.shorthand()

  paths.waistFoldBack = new Path()
  .move(points.bWaistSideHem)
  .line(points.bWaistBack.shift(270, store.get('waistBand')))
  .line(points.bWaistBackOverlap.shift(270, store.get('waistBand')))
    .attr('class', 'fabric stroke-sm')
  paths.waistFoldFront = new Path()
  .move(points.fWaistSideHem)
  .line(points.fWaistFrontOverlap.shift(270, store.get('waistBand')))
    .attr('class', 'fabric stroke-sm')

  paths.frontFold = paths.front.offset(-1 * store.get('hem')).attr('class', 'fabric stroke-sm')
  paths.legFold = paths.leg.offset(-1 * store.get('hem')).attr('class', 'fabric stroke-sm')
  paths.backFold = paths.back.offset(-1 * store.get('hem')).attr('class', 'fabric stroke-sm')

  paths.seam.setRender(true)

  // Complete?
  if (complete) {
    points.title = points.fWaistFront.shift(270, 400)
    macro('title', {
      nr: 1,
      at: points.title,
      title: 'pants',
    })

    points.logo = points.title.shift(270, 75)

    snippets.logo = new Snippet('logo', points.logo)

    macro('scalebox', { at: points.mHip.shift(-90, 70) })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  if( options.frontPocket ) {paths.frontPocket.setRender( true )}
  if( options.backPocket ) {paths.backPocket.setRender( true )}
 
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
  part.render = (options.showMini == false)

  return part
}
