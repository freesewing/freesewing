import { front } from './front.mjs'

function jaegerInnerPocketWelt({
  sa,
  store,
  complete,
  expand,
  units,
  points,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  const width = store.get('innerPocketWidth')
  const height = store.get('innerPocketWeltHeight')

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `jaeger:cutInnerPocketWelt`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        width: units(width + extraSa),
        length: units(height + extraSa),
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
  points.topRight = new Point(width, 0)
  points.foldLeft = new Point(0, height)
  points.foldRight = new Point(width, height)
  points.bottomLeft = new Point(0, height * 2)
  points.bottomRight = new Point(width, height * 2)

  // Paths
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (complete)
    paths.fold = new Path()
      .move(points.foldLeft)
      .line(points.foldRight)
      .addClass('stroke-sm dashed')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('rmtitle')
  macro('title', {
    at: points.title,
    nr: 13,
    title: 'innerPocketWelt',
    scale: 0.666,
    align: 'center',
  })

  // Dimensions
  macro('hd', {
    from: points.topLeft,
    to: points.topRight,
    y: points.topRight.y - sa - 15,
  })
  macro('vd', {
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })

  return part
}

export const innerPocketWelt = {
  name: 'jaeger.innerPocketWelt',
  after: front,
  draft: jaegerInnerPocketWelt,
}
