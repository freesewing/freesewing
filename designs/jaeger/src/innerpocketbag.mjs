import { front } from './front.mjs'

function jaegerInnerPocketBag({
  sa,
  store,
  complete,
  points,
  options,
  expand,
  units,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  const width = store.get('innerPocketWidth')
  const welt = store.get('innerPocketWeltHeight')
  const height = width * options.innerPocketDepth

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `jaeger:cutInnerPocketBag`,
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
  points.bottomLeft = new Point(0, height * 2 + welt * 2)
  points.bottomRight = new Point(width, height * 2 + welt * 2)

  // Paths
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'lining')

  if (complete)
    paths.fold = new Path()
      .move(points.foldLeft)
      .line(points.foldRight)
      .addClass('stroke-sm lining dashed')
      .addText('foldAlongThisLine', 'center fill-note')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'lining' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.foldRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 14,
    title: 'innerPocketBag',
    align: 'center',
  })

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, 10),
    to: points.topLeft.shift(0, 10),
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.topLeft,
    to: points.topRight,
    y: points.topRight.y - sa - 15,
  })
  macro('vd', {
    id: 'hToFold',
    from: points.bottomRight,
    to: points.foldRight,
    x: points.topRight.x + sa + 15,
  })
  macro('vd', {
    id: 'hFromFold',
    from: points.foldRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 30,
  })

  return part
}

export const innerPocketBag = {
  name: 'jaeger.innerPocketBag',
  after: front,
  draft: jaegerInnerPocketBag,
}
