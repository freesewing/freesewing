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
  expand,
}) {
  const neckbandLength =
    (store.get('neckLengthFront') + store.get('neckLengthBack') + store.get('neckLengthSide')) *
    options.neckbandLength
  const neckbandWidth = 2 * (options.neckbandWidth * measurements.neck)

  points.topLeftCorner = new Point(expand ? -neckbandLength : 0, 0)
  points.bottomLeftCorner = new Point(expand ? -neckbandLength : 0, neckbandWidth)
  points.bottomRightCorner = new Point(neckbandLength, neckbandWidth)
  points.topRightCorner = new Point(neckbandLength, 0)

  points.leftCenter = new Point(expand ? -neckbandLength : 0, neckbandWidth / 2)
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
    x: points.topLeftCorner.x - (sa + 15),
  })
  macro('hd', {
    id: 'wLength',
    from: points.topLeftCorner,
    to: points.topRightCorner,
    y: -(sa + 15),
  })

  points.cutonfoldFrom = new Point(expand ? -neckbandLength / 2 : 0, 0)
  points.cutonfoldTo = new Point(expand ? -neckbandLength / 2 : 0, neckbandWidth)
  expand
    ? macro('grainline', { from: points.cutonfoldFrom, to: points.cutonfoldTo })
    : macro('cutonfold', {
        from: points.cutonfoldFrom,
        to: points.cutonfoldTo,
        grainline: true,
      })

  store.cutlist.addCut({ cut: 1, from: 'fabric' })

  points.title = new Point(neckbandLength / 4, neckbandWidth / 2)
  macro('title', { at: points.title, nr: 4, title: 'neckband' })

  if (sa) {
    expand
      ? (paths.sa = new Path()
          .move(points.bottomLeftCorner.translate(-sa, +sa))
          .line(points.bottomRightCorner.translate(+sa, +sa))
          .line(points.topRightCorner.translate(+sa, -sa))
          .line(points.topLeftCorner.translate(-sa, -sa))
          .line(points.bottomLeftCorner.translate(-sa, +sa))
          .addClass('fabric sa'))
      : (paths.sa = new Path()
          .move(points.bottomLeftCorner)
          .line(points.bottomLeftCorner.translate(0, +sa))
          .line(points.bottomRightCorner.translate(+sa, +sa))
          .line(points.topRightCorner.translate(+sa, -sa))
          .line(points.topLeftCorner.translate(0, -sa))
          .line(points.topLeftCorner)
          .addClass('fabric sa'))
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
