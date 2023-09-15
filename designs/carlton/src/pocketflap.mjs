import { front } from './front.mjs'

function draftCarltonPocketFlap({
  paperless,
  sa,
  store,
  complete,
  points,
  options,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  points.topLeft = new Point(0, 0)
  points.bottomRight = new Point(store.get('pocketWidth'), store.get('pocketFlapHeight'))
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  if (options.pocketFlapRadius > 0) {
    macro('round', {
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      radius: store.get('pocketFlapRadius'),
      prefix: 'roundLeft',
    })
    macro('round', {
      from: points.bottomLeft,
      to: points.topRight,
      via: points.bottomRight,
      radius: store.get('pocketFlapRadius'),
      prefix: 'roundRight',
    })

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.roundLeftStart)
      .curve(points.roundLeftCp1, points.roundLeftCp2, points.roundLeftEnd)
      .line(points.roundRightStart)
      .curve(points.roundRightCp1, points.roundRightCp2, points.roundRightEnd)
  } else {
    paths.seam = new Path().move(points.topLeft).line(points.bottomLeft).line(points.bottomRight)
  }

  paths.seam = paths.seam.line(points.topRight).line(points.topLeft).close().attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.addCut({ cut: 4, from: 'fabric' })
  store.cutlist.addCut({ cut: 2, from: 'canvas' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 11,
    title: 'pocketFlap',
    scale: 0.8,
  })

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, points.topRight.x / 5),
    to: points.topLeft.shift(0, points.topRight.x / 5),
  })

  // Dimensions
  macro('hd', {
    from: points.topLeft,
    to: points.topRight,
    y: points.topLeft.y - sa - 15,
  })
  if (options.pocketFlapRadius > 0) {
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
  } else {
    macro('vd', {
      id: 'hFull',
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}

export const pocketFlap = {
  name: 'carlton.pocketFlap',
  after: front,
  draft: draftCarltonPocketFlap,
}
