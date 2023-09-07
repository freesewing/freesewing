import { base } from './base.mjs'

function draftBenjaminCollarBand({
  Point,
  Path,
  measurements,
  store,
  options,
  macro,
  points,
  paths,
  sa,
  expand,
  utils,
  part,
}) {
  /*
   * If the users opts for an adjustment band (the type you buy in the shop)
   * then this collar band is not needed
   */
  if (options.adjustmentRibbon) return part.hide()

  const band = {
    h: utils.units(store.get('collarBandHeight') + 2 * sa),
    l: utils.units(measurements.neck * (1 + options.collarEase) - store.get('knotWidth') * 2),
  }

  /*
   * Don't bother unless expand is set
   */
  if (!expand) {
    points.text = new Point(10, 10)
      .addText('benjamin:cutCollarBand', 'fill-note')
      .addText(':')
      .addText(band.h)
      .addText(' x ')
      .addText(band.l)
    paths.diag = new Path().move(new Point(0, 0)).line(new Point(100, 15)).addClass('hidden')

    // But flag this to the user
    store.flag.note({
      id: 'cutCollarBand',
      msg: `benjamin:cutCollarBandFlag`,
      replace: {
        height: band.h,
        length: band.l,
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expand')

    return part
  }

  // Points
  points.bottomLeft = new Point(0, 0.5 * store.get('collarBandHeight'))
  points.topLeft = points.bottomLeft.flipY()
  points.bottomRight = points.bottomLeft.shift(
    0,
    measurements.neck * (1 + options.collarEase) - store.get('knotWidth') * 2
  )
  points.topRight = points.bottomRight.flipY()
  points.titleAnchor = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)

  // Paths
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  store.cutlist.addCut()
  store.cutlist.addCut({ cut: 2, material: 'interfacing' })

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */

  // Title
  macro('title', {
    at: points.titleAnchor,
    nr: 2,
    title: 'collarBand',
    scale: 0.5,
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + 15 + sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + 15 + sa,
  })

  return part
}

export const collarBand = {
  name: 'benjamin.collarBand',
  after: base,
  draft: draftBenjaminCollarBand,
}
