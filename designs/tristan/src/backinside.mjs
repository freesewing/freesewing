import { backPoints } from './backpoints.mjs'

export const backInside = {
  name: 'tristan.backInside',
  from: backPoints,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    const lacing = true == options.lacing && 'back' == options.lacingLocation

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
    } else {
      paths.cut.curve_(points.cbCutCp2, points.waistCenter)
    }

    paths.seam = new Path()
      .move(points.strapInside)
      .join(paths.cut)
      .line(points.dartBottomLeft)
      .curve(points.dartLeftCp, points.shoulderDartCpDown, points.dartTip)
      .curve(points.shoulderDartCpUp, points.shoulderDart, points.shoulderDart)
      .line(points.strapInside)
      .close()
      .attr('class', 'fabric')

    points.titleAnchor = points.dartBottomLeft.shiftFractionTowards(
      lacing ? points.lacingCut : points.cbCut,
      0.75
    )
    macro('title', {
      at: points.titleAnchor,
      nr: 3,
      title: 'backInside',
    })

    points.grainlineFrom = new Point(points.hps.x / 4, points.cbCut.y)
    points.grainlineTo = new Point(points.hps.x / 4, points.waistSide.y)
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })

    points.scaleboxAnchor = points.titleAnchor.shiftFractionTowards(points.dartBottomLeft, 0.5)
    macro('scalebox', { at: points.scaleboxAnchor, rotate: 270 })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
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
