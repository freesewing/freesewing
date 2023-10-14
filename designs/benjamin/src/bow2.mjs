import { base } from './base.mjs'

function draftBenjaminBow2({ options, Point, points, Path, paths, macro, sa, store, part }) {
  if (!options.adjustmentRibbon) return part.hide()

  points.bandBottomLeft = points.bandBottomLeft.shift(180, 90)
  points.bandTopLeft = points.bandBottomLeft.flipY()

  points.grainlineStart = new Point(-90, 0)

  macro('grainline', {
    from: points.grainlineStart,
    to: points.tip.shift(180, 20),
  })

  paths.seam = new Path()
    .move(points.bandTopLeft)
    .line(points.bandBottomLeft)
    .join(paths.bow)
    .line(points.bandTopLeft)
    .close()
    .attr('class', 'fabric')
    .unhide()

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa').unhide()

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.addCut([
    { cut: 2, from: 'fabric' },
    { cut: 2, from: 'interfacing' },
  ])

  // Title
  macro('title', {
    at: points.titleAnchor,
    nr: 2,
    title: 'Medium Bow',
    scale: store.get('tipWidth') / 75,
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bandBottomLeft,
    to: points.tip2Bottom,
    y: store.get('baseY'),
  })

  return part
}

export const bow2 = {
  name: 'benjamin.bow2',
  from: base,
  draft: draftBenjaminBow2,
}
