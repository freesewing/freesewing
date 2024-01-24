import { backPoints } from './backpoints.mjs'

export const backInside = {
  name: 'tristan.backInside',
  from: backPoints,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, options, store, macro, part }) => {
    const lacing = true == options.lacing && 'back' == options.lacingLocation

    macro('rmtitle')
    store.cutlist.removeCut()

    paths.cut = new Path()
      .move(points.strapInside)
      .curve(points.strapInsideCp, points.cbCutCp, lacing ? points.lacingCut : points.cbCut)

    if (lacing) {
      paths.cut.line(points.lacingWaist)
      paths.originalSide = new Path()
        .move(points.lacingCut)
        .line(points.cbCut)
        .curve_(points.cbCutCp2, points.waistCenter)
        .line(points.lacingWaist)
        .setClass('note dashed')

      const lacingDistance = points.lacingWaist.y - points.lacingCut.y
      if (lacingDistance > 15 * 5) {
        const numberOfEyelets = Math.floor(lacingDistance / 15)
        const eyeletDistance = lacingDistance / (numberOfEyelets + 1)
        const pEyelets = new Path().move(points.lacingCut).line(points.lacingWaist).offset(-10)

        for (let i = 1; i <= numberOfEyelets; i++) {
          points['eyelet' + i] = pEyelets.shiftAlong(i * eyeletDistance)
          snippets['eyelet' + i] = new Snippet('eyelet', points['eyelet' + i])
        }
      }
    } else {
      paths.cut.curve_(points.cbCutCp2, points.waistCenter)
    }

    if (options.hem && !options.peplum) {
      paths.hem = new Path()
        .move(lacing ? points.lacingWaist : points.waistCenter)
        .line(points.waistCenterHem)
        .line(points.dartBottomLeftHem)
        .line(points.dartBottomLeft)
        .hide()
      paths.hemFold = new Path()
        .move(points.waistCenter)
        .line(points.dartBottomLeft)
        .addClass('note dashed')
        .addText('hem', 'center note')
    } else {
      paths.hem = new Path()
        .move(lacing ? points.lacingWaist : points.waistCenter)
        .line(points.dartBottomLeft)
        .hide()
    }

    paths.seamSA = new Path()
      .move(points.dartBottomLeft)
      .curve(points.dartLeftCp, points.shoulderDartCpDown, points.dartTip)
      .curve(points.shoulderDartCpUp, points.shoulderDart, points.shoulderDart)
      .line(points.strapInside)
      .join(paths.cut)

    paths.seam = paths.seamSA.clone().join(paths.hem).close().attr('class', 'fabric')

    points.grainlineFrom = new Point(points.dartBottomLeft.x - 10, points.cbCut.y)
    points.grainlineTo = new Point(points.dartBottomLeft.x - 10, points.waistSide.y)
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })

    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    points.titleAnchor = points.dartBottomLeft.shiftFractionTowards(
      lacing ? points.lacingCut : points.cbCut,
      0.75
    )
    macro('title', {
      at: points.titleAnchor,
      nr: 3,
      title: 'tristan:backInside',
    })

    if (sa) {
      if (options.hem && !options.peplum) {
        paths.sa = new Path()
          .move(points.dartBottomLeftHem)
          .join(
            new Path()
              .move(points.dartBottomLeftHem)
              .line(points.dartBottomLeft)
              .join(paths.seamSA)
              .line(points.waistCenterHem)
              .offset(sa)
          )
          .line(points.waistCenterHem)
          .attr('class', 'fabric sa')
      } else {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
    }

    macro('hd', {
      from: points.cbCut,
      to: points.strapInside,
      y: points.strapInside.y - sa - 15,
      id: 'cutWidth',
    })
    macro('hd', {
      from: points.cbCut,
      to: points.shoulderDart,
      y: points.strapInside.y - sa - 25,
      id: 'cutToDart',
    })
    macro('hd', {
      from: lacing ? points.lacingWaist : points.waistCenter,
      to: points.dartBottomLeft,
      y: points.waistCenter.y + sa + 15,
      id: 'waistCenterToSide',
    })
    macro('hd', {
      from: points.cbCut,
      to: points.dartBottomLeft,
      y: points.waistCenter.y + sa + 25,
      id: 'waistCutToSide',
    })

    macro('vd', {
      from: lacing ? points.lacingWaist : points.waistCenter,
      to: points.cbCut,
      x: points.cbCut.x - sa - 15,
      id: 'waistToCut',
    })
    macro('vd', {
      from: lacing ? points.lacingWaist : points.waistCenter,
      to: points.strapInside,
      x: points.cbCut.x - sa - 25,
      id: 'waistToStrap',
    })
    macro('vd', {
      from: points.dartBottomLeft,
      to: points.shoulderDart,
      x: points.shoulderDart.x + sa + 15,
      id: 'dartToDart',
    })
    macro('vd', {
      from: points.dartBottomLeft,
      to: points.strapInside,
      x: points.shoulderDart.x + sa + 25,
      id: 'dartToStrap',
    })

    return part
  },
}
