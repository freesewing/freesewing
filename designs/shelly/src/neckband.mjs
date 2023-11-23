import { raglanSleeve } from './raglansleeve.mjs'

function draftNeckband({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  part,
  store,
  complete,
  sa,
  macro,
}) {
  const neckbandLength =
    (store.get('neckLengthFront') + store.get('neckLengthBack') + store.get('neckLengthSide')) *
    options.neckbandLength
  const neckbandWidth = 2 * (options.neckbandWidth * measurements.neck)

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
      .addText('shelly:foldLine', 'center')
  }

  paths.seam = paths.saBase.join(paths.foldBase).close().addClass('fabric')

  macro('vd', {
    id: 'hWidth',
    from: points.topLeftCorner,
    to: points.bottomLeftCorner,
    x: -(15 + sa),
  })
  macro('hd', {
    id: 'wLength',
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
  macro('title', { at: points.title, nr: 4, title: 'neckband' })

  if (sa) {
    paths.sa = new Path()
      .move(points.bottomLeftCorner)
      .join(paths.saBase.offset(sa))
      .line(points.topLeftCorner)
      .addClass('fabric sa')
  }

  return part
}

export const neckband = {
  name: 'shelly.neckband',
  plugins: [],
  draft: draftNeckband,
  after: [raglanSleeve],
  options: {
    // How long the neckband should be, as a percentage of the length of the neck hole.
    neckbandLength: { pct: 80, min: 50, max: 100, menu: 'fit' },
    // How wide the neckband should be, as a percentage of the neckband length.
    neckbandWidth: { pct: 7.5, min: 0, max: 50, menu: 'fit' },
  },
}
