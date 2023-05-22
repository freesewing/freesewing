import { base } from './base.mjs'

function draftBenjaminBow3({
  options,
  Point,
  points,
  Path,
  paths,
  complete,
  macro,
  sa,
  store,
  paperless,
  part,
}) {
  if (!options.adjustmentRibbon) return part.hide()

  points.bandBottomLeft = points.bandBottomLeft.shift(180, 290)
  points.bandTopLeft = points.bandBottomLeft.flipY()

  points.grainlineStart = new Point(-290, 0)

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

  store.cutlist.addCut({ cut: 1 })
  store.cutlist.addCut({ cut: 1, material: 'interfacing' })

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
      nr: 3,
      title: 'Long Bow',
      scale: store.get('tipWidth') / 75,
    })
  }

  return part
}

export const bow3 = {
  name: 'benjamin.bow3',
  from: base,
  draft: draftBenjaminBow3,
}
