import { front } from './front.mjs'

function jaegerChestPocketWelt({
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
  let width = store.get('chestPocketWidth')
  let height = store.get('chestPocketWeltHeight')
  let angle = options.chestPocketAngle

  points.anchor = new Point(0, 0)
  points.top = points.anchor.shift(90 - angle, height / 2)
  points.bottom = points.anchor.shift(-90 - angle, height / 2)
  points.topLeft = points.top.shift(180, width / 2)
  points.topRight = points.topLeft.rotate(180, points.top)
  points.bottomLeft = points.bottom.shift(180, width / 2)
  points.bottomRight = points.bottomLeft.rotate(180, points.bottom)
  points.foldLeft = points.bottomLeft.flipY(points.topLeft)
  points.foldRight = points.bottomRight.flipY(points.topLeft)

  // Paths
  paths.seam = new Path()
    .move(points.foldLeft)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.foldRight)
    .line(points.foldLeft)
    .close()
    .attr('class', 'fabric')

  if (complete)
    paths.fold = new Path()
      .move(points.topLeft)
      .line(points.topRight)
      .attr('class', 'stroke-sm dashed')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  macro('title', {
    at: points.top,
    nr: 11,
    title: 'chestPocketWelt',
    scale: 0.666,
  })

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, 10),
    to: points.bottomLeft.shiftFractionTowards(points.topLeft, 2).shift(0, 10),
  })

  // Dimensions
  macro('hd', {
    id: 'wNarrow',
    from: points.topLeft,
    to: points.foldRight,
    y: points.foldLeft.y - sa - 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.foldLeft,
    to: points.foldRight,
    y: points.foldLeft.y - sa - 30,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.foldRight,
    x: points.bottomRight.x + sa + 15,
  })

  return part
}

export const chestPocketWelt = {
  name: 'jaeger.chestPocketWelt',
  after: front,
  draft: jaegerChestPocketWelt,
}
