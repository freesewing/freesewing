import { raglanSleeve } from './raglansleeve.mjs'

function draftNeckband({
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
  if (!expand || options.neckStyle !== 'neckband') return part.hide()

  const neckbandLength =
    (store.get('neckLengthFront') + store.get('neckLengthBack') + store.get('neckLengthSide')) *
    options.neckbandLength
  const neckbandWidth = 2 * absoluteOptions.neckbandWidth

  points.topLeftCorner = new Point(0, 0)
  points.bottomLeftCorner = new Point(0, neckbandWidth)
  points.bottomRightCorner = new Point(neckbandLength, neckbandWidth)
  points.topRightCorner = new Point(neckbandLength, 0)

  points.leftCenter = new Point(0, neckbandWidth / 2)
  points.rightCenter = new Point(neckbandLength, neckbandWidth / 2)

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
    id: 'vdNeckBand',
    from: points.topLeftCorner,
    to: points.bottomLeftCorner,
    x: -(sa + 15),
  })
  macro('hd', {
    id: 'hdNeckBand',
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

  store.cutlist.addCut({ cut: 1, from: 'fabric' })

  points.title = new Point(neckbandLength / 4, neckbandWidth / 2)
  macro('title', { at: points.title, nr: 4, title: 'onyx:neckband' })

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

export const neckband = {
  name: 'onyx.neckband',
  draft: draftNeckband,
  after: [raglanSleeve],
}
