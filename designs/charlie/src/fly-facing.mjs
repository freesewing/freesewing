import { front } from './front.mjs'

function draftCharlieFlyFacing({ points, Point, paths, Path, macro, snippets, store, sa, part }) {
  // Clean up
  for (let id in paths) delete paths[id]
  for (let id in snippets) delete snippets[id]

  // Anchor for sampling/grid
  points.anchor = points.flyTop.clone()

  paths.saBase = new Path()
    .move(points.fork)
    .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
    .line(points.styleWaistIn)
    .line(points.flyTop)
    .split(points.flyBottom)
    .pop()
  paths.seam = paths.saBase
    .clone()
    .line(points.flyCurveStart)
    .curve(points.flyCurveCp2, points.flyCurveCp1, points.flyBottom)
    .close()
    .attr('class', 'fabric')

  if (sa)
    paths.sa = paths.saBase
      .offset(sa)
      .line(points.flyCurveStart)
      .reverse()
      .line(points.flyBottom)
      .addClass('sa fabric')

  /*
   * Annotations
   */
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  // Grainline
  points.grainlineTop = points.flyTop.shiftFractionTowards(points.styleWaistIn, 0.5)
  points.grainlineBottom = new Point(points.grainlineTop.x, points.flyCurveCp2.y)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  // Title
  points.titleAnchor = points.grainlineTop.shiftFractionTowards(points.grainlineBottom, 0.5)
  macro('title', {
    at: points.titleAnchor,
    nr: 9,
    title: 'flyFacing',
    align: 'center',
    scale: 0.5,
  })

  return part
}

export const flyFacing = {
  name: 'charlie.flyFacing',
  from: front,
  draft: draftCharlieFlyFacing,
}
