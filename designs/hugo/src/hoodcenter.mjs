import { hoodSide } from './hoodside.mjs'

function hugoHoodCenter({ store, sa, Point, points, Path, paths, macro, expand, units, part }) {
  const width = store.get('hoodCenterWidth')
  const length = store.get('hoodCenterLength')

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `hugo:cutHoodCenter`,
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
    .attr('class', 'fabric')
  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = points.bottomLeft.shiftFractionTowards(points.topRight, 0.5)
  macro('title', { at: points.title, nr: 7, title: 'hoodCenter', align: 'center' })

  // grainline
  macro('grainline', {
    from: points.topLeft.shift(-90, width / 2),
    to: points.topRight.shift(-90, width / 2),
  })

  // Dimensions
  macro('hd', {
    id: 'width',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomRight.y + sa + 15,
  })
  macro('vd', {
    id: 'length',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })

  return part
}

export const hoodCenter = {
  name: 'hugo.hoodCenter',
  after: hoodSide,
  draft: hugoHoodCenter,
}
