import { backPoints } from './backpoints.mjs'

export const backOutside = {
  name: 'noble.backOutside',
  from: backPoints,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    paths.cut = new Path()
      .move(points.armhole)
      .curve(points.armholeCutCp, points.strapOutsideCp, points.strapOutside)
    // .hide()

    paths.dart = new Path()
      .move(points.shoulderDart)
      .curve(points.shoulderDart, points.shoulderDartCpUp, points.dartTip)
      .curve(points.shoulderDartCpDown, points.dartRightCp, points.dartBottomRight)
      .hide()

    paths.outsideSeam = new Path()
      .move(points.dartBottomRight)
      .line(points.waistSide)
      .curve_(points.waistSideCp2, points.armhole)
      // .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
      // .curve_(points.armholePitchCp2, points.shoulder)
      // .line(points.shoulderDart)
      .join(paths.cut)
      .join(paths.dart)
      .close()
      .attr('class', 'fabric')

    return part
  },
}
