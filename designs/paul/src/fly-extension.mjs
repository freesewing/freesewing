import { flyPlacket } from './fly-placket.mjs'

function draftPaulFlyExtension({ points, paths, Path, Snippet, macro, store, sa, part, snippets }) {
  // Clean up
  for (let id in paths) if (id !== 'crotchCurve') delete paths[id]
  for (let id in snippets) delete snippets[id]
  for (let id in points) {
    if (id.startsWith('button')) {
      points[id].x = 2 * points.styleWaistIn.x - points[id].x
      snippets[id] = new Snippet('button', points[id]).attr('data-scale', 2)
    }
  }

  // Anchor for sampling/grid
  points.anchor = points.flyTop.clone()

  // Paths
  paths.saBase = new Path()
    .move(points.flyCorner)
    .line(points.flyBottom)
    .line(points.styleWaistIn)
    .line(points.flyTop)
    .hide()
  paths.seam = paths.saBase.clone().line(points.flyCorner).close().unhide().attr('class', 'fabric')

  if (sa) {
    paths.saHelp = new Path()
      .move(points.flyCorner)
      .line(points.flyCorner.translate(0, sa * 2))
      .hide()
    paths.sa = macro('sa', {
      paths: [{ p: 'saHelp', offset: 0 }, 'saBase', null],
    })
  }

  /*
   * Annotations
   */
  // Cut list
  store.cutlist.setCut({ cut: 1, from: 'fabric', onFold: true })

  // Cut on fold
  macro('cutonfold', {
    from: points.flyTop,
    to: points.flyCorner,
    grainline: true,
  })

  // Title
  points.titleAnchor = points.flyCurveStart
  macro('title', {
    at: points.titleAnchor,
    nr: 7,
    title: 'flyExtension',
    scale: 0.5,
  })

  macro('vd', {
    id: 'vLeft',
    from: points.anchor,
    to: points.flyCorner,
    x: points.anchor.x - 10,
  })
  macro('vd', {
    id: 'vRight',
    from: points.styleWaistIn,
    to: points.flyBottom,
    x: points.flyBottom.x + 10,
  })
  macro('hd', {
    id: 'hTop',
    from: points.anchor,
    to: points.styleWaistIn,
    y: points.anchor.y - 10,
  })
  macro('hd', {
    id: 'hBottom',
    from: points.flyCorner,
    to: points.flyBottom,
    y: points.flyBottom.y + 10,
  })

  return part
}

export const flyExtension = {
  name: 'paul.flyExtension',
  from: flyPlacket,
  draft: draftPaulFlyExtension,
}
