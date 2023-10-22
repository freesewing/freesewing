import { backPoints } from './backpoints.mjs'

export const backInside = {
  name: 'tristan.backInside',
  from: backPoints,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    paths.cut = new Path()
      .move(points.strapInside)
      .curve(points.strapInsideCp, points.cbCutCp, points.cbCut)

    paths.insideSeam = new Path()
      .move(points.strapInside)
      .join(paths.cut)
      .curve_(points.cbCutCp2, points.waistCenter)
      .line(points.dartBottomLeft)
      .curve(points.dartLeftCp, points.shoulderDartCpDown, points.dartTip)
      .curve(points.shoulderDartCpUp, points.shoulderDart, points.shoulderDart)
      .close()
      .attr('class', 'fabric')

    return part
  },
}
