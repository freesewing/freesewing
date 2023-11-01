import { backPoints } from './backpoints.mjs'

export const backOutside = {
  name: 'tristan.backOutside',
  from: backPoints,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    paths.cut = new Path()
      .move(points.armhole)
      .curve(points.armholeCutCp, points.strapOutsideCp, points.strapOutside)
      .hide()

    paths.dart = new Path()
      .move(points.shoulderDart)
      .curve(points.shoulderDart, points.shoulderDartCpUp, points.dartTip)
      .curve(points.shoulderDartCpDown, points.dartRightCp, points.dartBottomRight)
      .hide()

    paths.seam = new Path()
      .move(points.dartBottomRight)
      .line(points.waistSide)
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

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    return part
  },
}
