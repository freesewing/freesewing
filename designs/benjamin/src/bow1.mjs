import { base } from './base.mjs'

function draftBenjaminBow1({ Point, points, Path, paths, macro, sa, store, options, part }) {
  points.bandBottomLeft = points.bandBottomLeft.shift(0, 0)
  points.bandTopLeft = points.bandBottomLeft.flipY()

  points.grainlineStart = new Point(0, 0)

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

  // Grainline
  macro('grainline', {
    from: points.grainlineStart,
    to: points.tip.shift(180, 20),
  })

  // Cut list
  store.cutlist.addCut(
    options.adjustmentRibbon
      ? [
          { cut: 1, from: 'fabric' },
          { cut: 1, from: 'interfacing' },
        ]
      : [
          { cut: 4, from: 'fabric' },
          { cut: 4, from: 'interfacing' },
        ]
  )

  // Title
  macro('title', {
    at: points.titleAnchor,
    nr: 1,
    title: options.adjustmentRibbon ? 'Short Bow' : 'Bow',
    scale: store.get('tipWidth') / 75,
  })

  // Scalebox
  points.scaleboxAnchor = points.bandTopLeft.shift(30, 80)
  macro('scalebox', { at: points.scaleboxAnchor })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bandBottomLeft,
    to: points.tip2Bottom,
    y: store.get('baseY'),
  })

  return part
}

export const bow1 = {
  name: 'benjamin.bow1',
  from: base,
  draft: draftBenjaminBow1,
}
