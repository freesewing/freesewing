import { backPocketBag } from './back-pocket-bag.mjs'

function draftCharlieBackPocketInterfacing({
  points,
  Point,
  paths,
  Path,
  complete,
  macro,
  store,
  units,
  snippets,
  expand,
  part,
}) {
  const w = store.get('backPocketWidth')
  const h = w / 3

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    store.flag.note({
      msg: `charlie:cutBackPocketInterfacing`,
      notes: ['flag:saUnused', 'flag:partHiddenByExpand'],
      replace: {
        width: units(w),
        length: units(h),
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

  // Clean up
  for (let id in paths) delete paths[id]
  delete snippets.logo

  points.bottomLeft = points.curveStartLeft.shift(-90, points.rightNotch.x / 1.75)
  points.bottomRight = points.bottomLeft.flipX()
  points.midLeft = points.bottomLeft.shift(90, h)
  points.midRight = points.bottomRight.shift(90, h)
  points.topLeft = points.bottomLeft.shift(90, h * 2)
  points.topRight = points.bottomRight.shift(90, h * 2)
  points.leftNotch = new Point(points.leftNotch.x, points.midRight.y)
  points.rightNotch = points.leftNotch.flipX()

  if (complete)
    paths.fold = new Path()
      .move(points.leftNotch)
      .line(points.rightNotch)
      .attr('class', 'interfacing dashed')

  // Anchor for sampling/grid
  points.anchor = points.topLeft.shiftFractionTowards(points.topRight, 0.5)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('interfacing')

  /*
   * Annotations
   */

  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'interfacing' })

  // Title
  points.titleAnchor = points.rightNotch.shiftFractionTowards(points.leftNotch, 0.5)
  macro('title', {
    at: points.titleAnchor,
    nr: 3,
    title: 'backPocketInterfacing',
    align: 'center',
    scale: 0.7,
  })

  // Dimensions
  macro('hd', {
    id: 'width',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + 15,
  })
  macro('vd', {
    id: 'height',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + 15,
  })

  return part
}

export const backPocketInterfacing = {
  name: 'charlie.backPocketInterfacing',
  from: backPocketBag,
  draft: draftCharlieBackPocketInterfacing,
}
