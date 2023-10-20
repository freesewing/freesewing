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
  paperless,
  complete,
  sa,
  macro,
  snippets,
  Snippet,
}) {
  if (!options.sleeveRibbing) return part.hide()

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
    .attr('class', 'fabric')
    .hide(true)

  paths.foldBase = new Path().move(points.topLeftCorner).line(points.bottomLeftCorner).hide(true)

  paths.foldLine = new Path()
    .move(points.leftCenter)
    .line(points.rightCenter)
    .attr('class', 'various dashed')
    .attr('data-text', 'Fold Line')
    .attr('data-text-class', 'center')

  paths.seam = paths.saBase.join(paths.foldBase).close().attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      id: 'vdNeckBand1',
      from: points.topLeftCorner,
      to: points.bottomLeftCorner,
      x: -(sa + 15),
    })
    macro('hd', {
      id: 'hdNeckBand1',
      from: points.topLeftCorner,
      to: points.topRightCorner,
      y: -(sa + 15),
    })
  }

  points.cutonfoldFrom = points.topLeftCorner
  points.cutonfoldTo = points.bottomLeftCorner
  macro('cutonfold', {
    from: points.cutonfoldFrom,
    to: points.cutonfoldTo,
    grainline: true,
  })

  store.cutlist.addCut({ cut: 2 })

  if (complete) {
    points.title = new Point(neckbandLength / 4, neckbandWidth / 2)
    macro('title', { at: points.title, nr: 10, title: 'sleeveRibbing' })

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
  }
  return part
}

export const sleeveRibbing = {
  name: 'onyx.sleeveRibbing',
  plugins: [],
  draft: draftSleeveRibbing,
  after: [raglanSleeve],
  options: {
    // How long the neckband should be, as a percentage of the length of the neck hole.
    sleeveRibbingWidth: {
      pct: 20,
      min: 0,
      max: 100,
      snap: { metric: 5, imperial: 6.35 },
      toAbs: (pct, settings, mergedOptions) => mergedOptions.sleeveRibbingWidth * 200, // Valid range is from 0 to 200mm.
      menu: (settings, mergedOptions) => (mergedOptions.sleeveRibbing ? 'construction' : false),
    },
    // How long the neckband should be, as a percentage of the length of the neck hole.
    sleeveRibbingLength: {
      pct: 80,
      min: 50,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.sleeveRibbing ? 'construction' : false),
    },
  },
}
