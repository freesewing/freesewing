import { cuffEase, ribbingStretch } from './options.mjs'

function hugoCuff({
  measurements,
  options,
  sa,
  Point,
  points,
  Path,
  paths,
  macro,
  expand,
  store,
  units,
  part,
}) {
  const width = (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight * 2
  const length = measurements.wrist * (1 + options.cuffEase) * (1 - options.ribbingStretch)

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `hugo:cutCuff`,
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
  points.bottomLeft = new Point(0, width)
  points.topRight = new Point(length, 0)
  points.bottomRight = new Point(length, width)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'various')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'various sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'ribbing' })

  // Title
  points.title = points.bottomLeft.shiftFractionTowards(points.topRight, 0.5)
  macro('title', { at: points.title, nr: 9, title: 'cuff' })

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, 20),
    to: points.topLeft.shift(0, 20),
  })

  // Dimensions
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomRight.y + sa + 15,
  })

  return part
}

export const cuff = {
  name: 'hugo.cuff',
  measurements: ['waistToHips'],
  options: { cuffEase, ribbingStretch },
  draft: hugoCuff,
}
