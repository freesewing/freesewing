import { front } from './front.mjs'

function draftCarltonInnerPocketWelt({
  sa,
  store,
  complete,
  points,
  macro,
  expand,
  units,
  Point,
  paths,
  Path,
  part,
}) {
  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `carlton:cutInnerPocketWelt`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(store.get('innerPocketWidth') * 1.4 + extraSa),
        l: units(store.get('innerPocketWeltHeight') * 6 + extraSa),
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
    store.get('innerPocketWidth') * 1.4,
    store.get('innerPocketWeltHeight') * 6
  )
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  points.leftMid = new Point(0, points.bottomRight.y / 2)
  points.rightMid = new Point(points.bottomRight.x, points.bottomRight.y / 2)
  points.realTopLeft = new Point(
    store.get('innerPocketWidth') * 0.2,
    store.get('innerPocketWeltHeight') * 2
  )
  points.realTopRight = new Point(store.get('innerPocketWidth') * 1.2, points.realTopLeft.y)
  points.realBottomLeft = new Point(points.realTopLeft.x, store.get('innerPocketWeltHeight') * 4)
  points.realBottomRight = new Point(points.realTopRight.x, points.realBottomLeft.y)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  if (complete) {
    paths.fold = new Path().move(points.leftMid).line(points.rightMid).addClass('fabric help')
    paths.welt = new Path()
      .move(points.realTopLeft)
      .line(points.realBottomLeft)
      .line(points.realBottomRight)
      .line(points.realTopRight)
      .line(points.realTopLeft)
      .close()
      .addClass('note dashed stroke-sm')
  }

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.addCut({ cut: 2, from: 'fabric' })
  store.cutlist.addCut({ cut: 2, from: 'canvas' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 13,
    title: 'innerPocketWelt',
  })

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, 10),
    to: points.topLeft.shift(0, 10),
  })

  // Dimensions

  macro('vd', {
    id: 'hWelt',
    from: points.realBottomRight,
    to: points.realTopRight,
    x: points.topRight.x + sa + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 30,
  })
  macro('hd', {
    id: 'wWelt',
    from: points.realBottomLeft,
    to: points.realBottomRight,
    y: points.bottomLeft.y + sa + 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + sa + 30,
  })

  return part
}

export const innerPocketWelt = {
  name: 'carlton.innerPocketWelt',
  after: front,
  draft: draftCarltonInnerPocketWelt,
}
