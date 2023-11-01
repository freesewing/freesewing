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

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    return part
  },
}
