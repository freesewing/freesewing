import { topSleeve } from './topsleeve.mjs'
import { underSleeve } from './undersleeve.mjs'

function draftCarltonCuffFacing({ sa, store, utils, points, macro, Point, paths, Path, part }) {
  points.topLeft = new Point(0, 0)
  points.bottomRight = new Point(
    store.get('topCuffWidth') + store.get('underCuffWidth'),
    store.get('cuffLength') * 1.5
  )
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  // Macros will return the auto-generated IDs
  const ids = {
    roundLeft: macro('round', {
      id: 'roundLeft',
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      radius: store.get('cuffRadius'),
    }),
    roundRight: macro('round', {
      id: 'roundRight',
      from: points.bottomLeft,
      to: points.topRight,
      via: points.bottomRight,
      radius: store.get('cuffRadius'),
    }),
  }
  // Create points from them with easy names
  for (const side in ids) {
    for (const id of ['start', 'cp1', 'cp2', 'end']) {
      points[`${side}${utils.capitalize(id)}`] = points[ids[side].points[id]].copy()
    }
  }

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.roundLeftStart)
    .curve(points.roundLeftCp1, points.roundLeftCp2, points.roundLeftEnd)
    .line(points.roundRightStart)
    .curve(points.roundRightCp1, points.roundRightCp2, points.roundRightEnd)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

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
    nr: 9,
    title: 'cuffFacing',
  })

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, 10 + store.get('cuffRadius')),
    to: points.topLeft.shift(0, 10 + store.get('cuffRadius')),
  })

  // Dimensions
  macro('vd', {
    id: 'hRoundedCorner',
    from: points.roundRightStart,
    to: points.roundRightEnd,
    x: points.topRight.x + sa + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.roundRightStart,
    to: points.topRight,
    x: points.topRight.x + sa + 30,
  })
  macro('hd', {
    id: 'wRoundedCorner',
    from: points.roundRightStart,
    to: points.roundRightEnd,
    y: points.bottomRight.y + sa + 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.roundLeftStart,
    to: points.roundRightEnd,
    y: points.bottomRight.y + sa + 30,
  })

  return part
}

export const cuffFacing = {
  name: 'carlton.cuffFacing',
  after: [topSleeve, underSleeve],
  draft: draftCarltonCuffFacing,
}
