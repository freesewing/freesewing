import { backPoints } from './backpoints.mjs'

export const backOutside = {
  name: 'tristan.backOutside',
  from: backPoints,
  draft: ({ sa, Point, points, Path, paths, options, store, macro, part }) => {
    store.cutlist.removeCut()

    paths.cut = new Path()
      .move(points.armhole)
      .curve(points.armholeCutCp, points.strapOutsideCp, points.strapOutside)
      .hide()

    paths.dart = new Path()
      .move(points.shoulderDart)
      .curve(points.shoulderDart, points.shoulderDartCpUp, points.dartTip)
      .curve(points.shoulderDartCpDown, points.dartRightCp, points.dartBottomRight)
      .hide()

    if (options.hem && !options.peplum) {
      paths.hem = new Path()
        .move(points.dartBottomRight)
        .line(points.dartBottomRightHem)
        .line(points.waistSideHem)
        .line(points.waistSide)
        .hide()
      paths.hemFold = new Path()
        .move(points.dartBottomRight)
        .line(points.waistSide)
        .addClass('note dashed')
        .addText('hem', 'center note')
    } else {
      paths.hem = new Path().move(points.dartBottomRight).line(points.waistSide).hide()
    }
    paths.seam = new Path()
      .move(points.dartBottomRight)
      .join(paths.hem)
      .curve_(points.waistSideCp2, points.armhole)
      .join(paths.cut)
      .join(paths.dart)
      .close()
      .attr('class', 'fabric')

    points.titleAnchor = points.dartBottomRight.shiftFractionTowards(points.armholeCpTarget, 0.5)
    macro('title', {
      at: points.titleAnchor,
      nr: 4,
      title: 'backOutside',
    })

    points.grainlineTo = new Point(points.dartBottomRight.x * 1.1, points.dartBottomRight.y * 0.95)
    points.grainlineFrom = new Point(points.grainlineTo.x, points.dartTip.y)

    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })

    store.cutlist.removeCut('fabric')
    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    const pLeft = paths.dart.edge('left')

    macro('hd', {
      from: pLeft,
      to: points.shoulderDart,
      y: points.shoulderDart.y - sa - 15,
      id: 'leftToDart',
    })
    macro('hd', {
      from: pLeft,
      to: points.strapOutside,
      y: points.shoulderDart.y - sa - 25,
      id: 'leftToStrap',
    })
    macro('hd', {
      from: pLeft,
      to: points.armhole,
      y: points.shoulderDart.y - sa - 35,
      id: 'leftToArmhole',
    })
    macro('hd', {
      from: pLeft,
      to: points.waistSide,
      y: points.dartBottomRight.y + sa + 25,
      id: 'leftToWaistSide',
    })
    macro('hd', {
      from: points.dartBottomRight,
      to: points.waistSide,
      y: points.dartBottomRight.y + sa + 15,
      id: 'dartToWaistSide',
    })

    macro('vd', {
      from: points.dartBottomRight,
      to: pLeft,
      x: pLeft.x - sa - 15,
      id: 'leftToDart',
    })
    macro('vd', {
      from: points.dartBottomRight,
      to: points.shoulderDart,
      x: pLeft.x - sa - 25,
      id: 'dartToDart',
    })
    macro('vd', {
      from: points.dartBottomRight,
      to: points.strapOutside,
      x: points.armhole.x + sa + 35,
      id: 'dartToStrap',
    })
    macro('vd', {
      from: points.waistSide,
      to: points.strapOutside,
      x: points.armhole.x + sa + 25,
      id: 'sideToStrap',
    })
    macro('vd', {
      from: points.waistSide,
      to: points.armhole,
      x: points.armhole.x + sa + 15,
      id: 'sideToArmhole',
    })

    return part
  },
}
