import { raglanSleeve } from './raglansleeve.mjs'

function draftSleeveRibbing({
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
  if (!expand || !options.sleeveRibbing) return part.hide()

  const ribbingLength = store.get('sleeveWidth') * options.sleeveRibbingLength
  const sleeveRibbingWidth = 2 * absoluteOptions.sleeveRibbingWidth

  points.topLeftCorner = new Point(0, 0)
  points.bottomLeftCorner = new Point(0, sleeveRibbingWidth)
  points.bottomRightCorner = new Point(ribbingLength / 2, sleeveRibbingWidth)
  points.topRightCorner = new Point(ribbingLength / 2, 0)

  points.leftCenter = new Point(0, sleeveRibbingWidth / 2)
  points.rightCenter = new Point(ribbingLength / 2, sleeveRibbingWidth / 2)

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
    id: 'vdSleeveRibbing',
    from: points.topLeftCorner,
    to: points.bottomLeftCorner,
    x: -(sa + 15),
  })
  macro('hd', {
    id: 'hdSleeveRibbing',
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

  points.title = new Point(ribbingLength / 4, sleeveRibbingWidth / 2)
  macro('title', { at: points.title, nr: 10, title: 'onyx:sleeveRibbing' })

  if (sa) {
    paths.sa = new Path()
      .move(points.bottomLeftCorner)
      .line(points.bottomLeftCorner.translate(0, sa))
      .line(points.bottomRightCorner.translate(sa, sa))
      .line(points.topRightCorner.translate(sa, -sa))
      .line(points.topLeftCorner.translate(0, -sa))
      .line(points.topLeftCorner)
      .addClass('fabric sa')
  }

  return part
}

export const sleeveRibbing = {
  name: 'onyx.sleeveRibbing',
  draft: draftSleeveRibbing,
  after: raglanSleeve,
}
