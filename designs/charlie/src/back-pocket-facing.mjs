import { backPocketBag } from './back-pocket-bag.mjs'

function draftCharlieBackPocketFacing({
  points,
  Point,
  paths,
  Path,
  complete,
  store,
  macro,
  snippets,
  sa,
  part,
}) {
  // Clean up
  delete paths.fold
  delete snippets.logo

  points.bottomLeft = points.curveStartLeft.shift(-90, points.rightNotch.x / 1.75)
  points.bottomRight = points.bottomLeft.flipX()

  paths.saBase = new Path()
    .move(points.bottomRight)
    .line(points.curveStartRight)
    .curve_(points.cpRight, points.waistbandRight)
    .line(points.waistbandLeft)
    ._curve(points.cpLeft, points.curveStartLeft)
    .line(points.bottomLeft)
    .hide()
  paths.seam = paths.saBase.clone().close().unhide().attr('class', 'fabric')

  if (complete) {
    paths.opening = new Path()
      .move(points.leftNotch)
      .line(points.rightNotch)
      .attr('class', 'dashed')
  }

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.titleAnchor = points.rightNotch.shiftFractionTowards(points.leftNotch, 0.5)
  macro('title', {
    at: points.titleAnchor,
    nr: 6,
    title: 'backPocketBagFacing',
  })

  // Grainline
  points.grainlineTop = points.waistbandLeft.shiftFractionTowards(points.waistbandRight, 0.15)
  points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  // Dimonsions
  macro('rmad')
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + 15,
  })
  macro('hd', {
    id: 'wTop',
    from: points.waistbandLeft,
    to: points.waistbandRight,
    y: points.waistbandLeft.y - sa - 15,
  })
  macro('vd', {
    id: 'hToOpening',
    from: points.bottomRight,
    to: points.rightNotch,
    x: points.bottomRight.x + sa + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.waistbandRight,
    x: points.bottomRight.x + sa + 30,
  })

  return part
}

export const backPocketFacing = {
  name: 'charlie.backPocketFacing',
  from: backPocketBag,
  draft: draftCharlieBackPocketFacing,
}
