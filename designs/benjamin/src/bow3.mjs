import { base } from './base.mjs'

function draftBenjaminBow3({ options, Point, points, Path, paths, macro, sa, store, part }) {
  if (!options.adjustmentRibbon) return part.hide()

  points.bandBottomLeft = points.bandBottomLeft.shift(180, 290)
  points.bandTopLeft = points.bandBottomLeft.flipY()

  points.grainlineStart = new Point(-290, 0)

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
  // Cutlist
  store.cutlist.addCut([
    { cut: 1, from: 'fabric' },
    { cut: 1, material: 'interfacing' },
  ])

  // Grainline
  macro('grainline', {
    from: points.grainlineStart,
    to: points.tip.shift(180, 20),
  })

  //Title
  macro('title', {
    at: points.titleAnchor,
    nr: 3,
    title: 'Long Bow',
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

export const bow3 = {
  name: 'benjamin.bow3',
  from: base,
  draft: draftBenjaminBow3,
}
