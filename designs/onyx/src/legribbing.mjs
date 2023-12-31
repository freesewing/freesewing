import { base } from './base.mjs'

function draftLegRibbing({
  Path,
  Point,
  paths,
  points,
  options,
  absoluteOptions,
  part,
  store,
  complete,
  expand,
  sa,
  macro,
}) {
  if (!expand || !options.legRibbing) return part.hide()

  const ribbingLength = store.get('legWidth') * options.legRibbingLength
  const legRibbingWidth = 2 * absoluteOptions.legRibbingWidth

  points.topLeftCorner = new Point(0, 0)
  points.bottomLeftCorner = new Point(0, legRibbingWidth)
  points.bottomRightCorner = new Point(ribbingLength / 2, legRibbingWidth)
  points.topRightCorner = new Point(ribbingLength / 2, 0)

  points.leftCenter = new Point(0, legRibbingWidth / 2)
  points.rightCenter = new Point(ribbingLength / 2, legRibbingWidth / 2)

  paths.saBase = new Path()
    .move(points.bottomLeftCorner)
    .line(points.bottomRightCorner)
    .line(points.topRightCorner)
    .line(points.topLeftCorner)
    .addClass('fabric')
    .hide()

  paths.foldBase = new Path().move(points.topLeftCorner).line(points.bottomLeftCorner).hide()

  if (complete) {
    paths.foldLine = new Path()
      .move(points.leftCenter)
      .line(points.rightCenter)
      .addClass('various dashed')
      .addText('onyx:foldLine', 'center')
  }

  paths.seam = paths.saBase.join(paths.foldBase).close().addClass('fabric')

  macro('vd', {
    id: 'vdLegRibbing',
    from: points.topLeftCorner,
    to: points.bottomLeftCorner,
    x: -(sa + 15),
  })
  macro('hd', {
    id: 'hdLegRibbing',
    from: points.topLeftCorner,
    to: points.topRightCorner,
    y: -(sa + 15),
  })

  points.cutonfoldFrom = points.topLeftCorner
  points.cutonfoldTo = points.bottomLeftCorner
  macro('cutonfold', {
    from: points.cutonfoldFrom,
    to: points.cutonfoldTo,
    grainline: true,
  })

  store.cutlist.addCut({ cut: 2, from: 'ribbing' })

  points.title = new Point(ribbingLength / 4, legRibbingWidth / 2)
  macro('title', { at: points.title, nr: 11, title: 'onyx:legRibbing' })

  if (sa) {
    paths.sa = new Path()
      .move(points.bottomLeftCorner)
      .line(points.bottomLeftCorner.translate(0, sa))
      .line(points.bottomRightCorner.translate(sa, sa))
      .line(points.topRightCorner.translate(sa, -sa))
      .line(points.topLeftCorner.translate(0, -sa))
      .line(points.topLeftCorner)
      .attr('class', 'fabric sa')
  }

  return part
}

export const legRibbing = {
  name: 'onyx.legRibbing',
  draft: draftLegRibbing,
  after: [base],
}
