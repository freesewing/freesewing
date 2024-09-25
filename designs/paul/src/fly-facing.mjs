import { front } from './front.mjs'

function draftPaulFlyFacing({ points, Point, paths, Path, macro, snippets, store, sa, part }) {
  // Clean up
  for (let id in paths) if (id !== 'crotchCurve') delete paths[id]
  for (let id in snippets) delete snippets[id]

  // Straighten part
  const angle = points.styleWaistIn.angle(points.flyBottom) * -1 + 270
  for (let id in points) {
    if (id !== 'flyTop') points[id] = points[id].rotate(angle, points.flyTop)
  }

  paths.saBase = new Path()
    .move(points.flyBottom)
    .line(points.styleWaistIn)
    .line(points.flyTop)
    .hide()

  paths.seam = paths.saBase
    .clone()
    .line(points.flyCurveStart)
    .curve(points.flyCurveCp2, points.flyCurveCp1, points.flyBottom)
    .close()
    .unhide()
    .addClass('fabric')

  if (sa)
    paths.sa = macro('sa', {
      paths: ['saBase', null],
    })

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
    nr: 6,
    title: 'flyFacing',
    align: 'center',
    scale: 0.5,
  })

  macro('bartackAlong', {
    path: new Path()
      .move(points.flyTop)
      .line(points.flyCurveStart)
      .curve(points.flyCurveCp2, points.flyCurveCp1, points.flyBottom)
      .offset(-2.5),
    width: 5,
    density: 1,
  })

  macro('vd', {
    id: 'vRight',
    from: points.styleWaistIn,
    to: points.flyBottom,
    x: points.styleWaistIn.x + 10,
  })
  macro('hd', {
    id: 'hTop',
    from: points.flyTop,
    to: points.styleWaistIn,
    y: points.flyTop.y - 10,
  })

  return part
}

export const flyFacing = {
  name: 'paul.flyFacing',
  from: front,
  draft: draftPaulFlyFacing,
}
