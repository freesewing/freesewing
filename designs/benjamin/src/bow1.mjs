import { base } from './base.mjs'

function draftBenjaminBow1({
  Point,
  points,
  Path,
  paths,
  complete,
  macro,
  sa,
  store,
  paperless,
  options,
  part,
}) {
  points.bandBottomLeft = points.bandBottomLeft.shift(0, 0)
  points.bandTopLeft = points.bandBottomLeft.flipY()

  points.grainlineStart = new Point(0, 0)

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

  if (options.adjustmentRibbon) {
    store.cutlist.addCut({ cut: 1 })
    store.cutlist.addCut({ cut: 1, material: 'interfacing' })
  } else {
    store.cutlist.addCut({ cut: 4 })
    store.cutlist.addCut({ cut: 4, material: 'interfacing' })
  }

  if (complete) {
    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.bandBottomLeft,
        to: points.tip2Bottom,
        y: store.get('baseY'),
      })
    }
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa').unhide()
    }
    macro('title', {
      at: points.titleAnchor,
      nr: 1,
      title: options.adjustmentRibbon ? 'Short Bow' : 'Bow',
      scale: store.get('tipWidth') / 75,
    })
    points.scaleboxAnchor = points.bandTopLeft.shift(30, 80)
    macro('scalebox', { at: points.scaleboxAnchor })
  }

  return part
}

export const bow1 = {
  name: 'benjamin.bow1',
  from: base,
  draft: draftBenjaminBow1,
}
