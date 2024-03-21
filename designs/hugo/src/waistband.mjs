import { chestEase, ribbingStretch, ribbingHeight } from './options.mjs'

function hugoWaistband({
  measurements,
  options,
  sa,
  Point,
  points,
  Path,
  paths,
  macro,
  units,
  expand,
  store,
  part,
}) {
  const width = (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight * 2
  const length = measurements.chest * (1 + options.chestEase) * (1 - options.ribbingStretch)

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    const extraSa = sa ? 2 * sa : 0
    // Expand is off, do not draw the part but flag this to the user
    store.flag.note({
      msg: `hugo:cutWaistband`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(width + extraSa),
        l: units(length + extraSa),
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
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  points.topLeft = new Point(0, 0)
  points.bottomLeft = new Point(0, length)
  points.topRight = new Point(width, 0)
  points.bottomRight = new Point(width, length)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .close()
    .attr('class', 'various')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'various sa')
  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'ribbing' })

  // Title
  points.title = points.bottomLeft.shiftFractionTowards(points.topRight, 0.5)
  macro('title', { at: points.title, nr: 8, title: 'waistband', align: 'center' })

  // Grainline
  macro('grainline', {
    from: points.topLeft.shift(290, 25),
    to: points.topRight.shift(250, 25),
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomRight.y + sa + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })

  return part
}

export const waistband = {
  name: 'hugo.waistband',
  measurements: ['waistToHips'],
  options: { chestEase, ribbingStretch, ribbingHeight },
  draft: hugoWaistband,
}
