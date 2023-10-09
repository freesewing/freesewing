import { hoodSide } from './hoodside.mjs'

function yuriHoodCenter({ store, sa, Point, points, Path, paths, expand, macro, units, part }) {
  const width = store.get('hoodCenterWidth')
  const length = store.get('hoodCenterLength')

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `yuri:cutHoodCenter`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        width: units(width + extraSa),
        length: units(length + extraSa),
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
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = points.bottomLeft.shiftFractionTowards(points.topRight, 0.5)
  macro('title', { at: points.title, nr: 6, title: 'hoodCenter' })

  // Grainline
  macro('grainline', {
    from: points.topLeft.shift(-90, width / 2),
    to: points.topRight.shift(-90, width / 2),
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomRight.y + sa + 15,
    text: units(store.get('hoodCenterLength')),
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })

  return part
}

export const hoodCenter = {
  name: 'yuri.hoodCenter',
  after: hoodSide,
  draft: yuriHoodCenter,
}
