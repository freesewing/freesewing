import { pocket } from './pocket.mjs'

function draftCarltonPocketLining({
  sa,
  utils,
  store,
  points,
  options,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  delete paths.fold

  points.topLeft = points.bottomLeft.shiftFractionTowards(points.topLeft, 0.75)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  if (options.pocketRadius > 0) {
    // Macros will return the auto-generated IDs
    const ids = {
      roundLeft: macro('round', {
        id: 'roundLeft',
        from: points.topLeft,
        to: points.bottomRight,
        via: points.bottomLeft,
        radius: store.get('pocketRadius'),
      }),
      roundRight: macro('round', {
        id: 'roundRight',
        from: points.bottomLeft,
        to: points.topRight,
        via: points.bottomRight,
        radius: store.get('pocketRadius'),
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
  } else {
    paths.seam = new Path().move(points.topLeft).line(points.bottomLeft).line(points.bottomRight)
  }

  paths.seam = paths.seam.line(points.topRight).line(points.topLeft).close().attr('class', 'lining')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.addCut({ cut: 2, from: 'lining' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 16,
    title: 'pocketLining',
  })

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, 10 + (store.get('pocketRadius') || 0)),
    to: points.topLeft.shift(0, 10 + (store.get('pocketRadius') || 0)),
  })

  // Dimensions
  macro('rmad')
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
    y: points.bottomRight.y + sa + 15,
  })
  if (options.pocketRadius > 0) {
    macro('hd', {
      from: points.roundRightStart,
      to: points.roundRightEnd,
      y: points.roundRightEnd.y,
    })
  }

  return part
}

export const pocketLining = {
  name: 'carlton.pocketLining',
  from: pocket,
  draft: draftCarltonPocketLining,
}
