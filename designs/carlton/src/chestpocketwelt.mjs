import { front } from './front.mjs'

function draftCarltonChestPocketWelt({
  sa,
  store,
  complete,
  points,
  macro,
  Point,
  paths,
  Path,
  expand,
  units,
  part,
}) {
  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `carlton:cutChestPocketWelt`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(store.get('chestPocketWidth') * 2 + extraSa),
        l: units(store.get('chestPocketHeight') + extraSa),
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
  points.bottomRight = new Point(store.get('chestPocketWidth') * 2, store.get('chestPocketHeight'))
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  points.topMid = new Point(store.get('chestPocketWidth'), points.topRight.y)
  points.bottomMid = new Point(points.topMid.x, points.bottomRight.y)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  if (complete)
    paths.fold = new Path().move(points.topMid).line(points.bottomMid).addClass('fabric help')

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.addCut({ cut: 2, from: 'fabric' }, { cut: 2, from: 'canvas' })

  // Title
  points.title = new Point(points.bottomRight.x / 4, points.bottomRight.y / 2)
  macro('title', {
    at: points.title,
    nr: 12,
    title: 'chestPocketWelt',
    scale: 0.8,
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + sa + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })

  return part
}

export const chestPocketWelt = {
  name: 'carlton.chestPocketWelt',
  after: front,
  draft: draftCarltonChestPocketWelt,
}
