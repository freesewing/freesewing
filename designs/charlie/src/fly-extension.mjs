import { flyFacing } from './fly-facing.mjs'

function draftCharlieFlyExtension({ points, paths, Path, complete, macro, sa, part }) {
  // Clean up
  for (let id in paths) delete paths[id]

  // Straighten part
  const angle = points.flyTop.angle(points.flyCorner) * -1 + 270
  for (let id in points) {
    if (id !== 'flyTop') points[id] = points[id].rotate(angle, points.flyTop)
  }

  // Anchor for sampling/grid
  points.anchor = points.flyTop.clone()

  // Paths
  paths.saBase = new Path()
    .move(points.flyCorner)
    .line(points.flyExtensionBottom)
    .join(
      new Path()
        .move(points.fork)
        .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
        .split(points.flyExtensionBottom)
        .pop()
    )
    .line(points.styleWaistIn)
    .line(points.flyTop)
    .hide()
  paths.seam = paths.saBase.clone().line(points.flyCorner).close().unhide().attr('class', 'fabric')

  if (complete) {
    macro('cutonfold', {
      from: points.flyTop,
      to: points.flyCorner,
      grainline: true,
    })
    points.titleAnchor = points.flyCurveStart
    macro('title', {
      at: points.titleAnchor,
      nr: 10,
      title: 'flyExtension',
    })
    if (sa)
      paths.sa = paths.saBase
        .offset(sa)
        .line(points.flyTop)
        .reverse()
        .line(points.flyCorner)
        .attr('class', 'fabric sa')
  }

  return part
}

export const flyExtension = {
  name: 'charlie.flyExtension',
  from: flyFacing,
  draft: draftCharlieFlyExtension,
}
