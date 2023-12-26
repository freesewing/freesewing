import { front } from './front.mjs'

function draftCarltonChestPocketBag({
  units,
  sa,
  store,
  points,
  macro,
  Point,
  paths,
  Path,
  expand,
  part,
}) {
  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `carlton:cutChestPocketBag`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(store.get('chestPocketHeight') + extraSa),
        l: units(store.get('chestPocketBagDepth') * 2 + extraSa),
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
  points.bottomRight = new Point(
    store.get('chestPocketHeight'),
    store.get('chestPocketBagDepth') * 2
  )
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)

  paths.seam = new Path()
    .move(points.topRight)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .close()
    .addClass('lining')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.addCut({ material: 'lining' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.2)
  macro('title', {
    at: points.title,
    nr: 17,
    title: 'chestPocketBag',
  })

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, 10),
    to: points.topLeft.shift(0, 10),
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
    y: points.bottomLeft.y + sa + 15,
  })

  return part
}

export const chestPocketBag = {
  name: 'carlton.chestPocketBag',
  after: front,
  draft: draftCarltonChestPocketBag,
}
