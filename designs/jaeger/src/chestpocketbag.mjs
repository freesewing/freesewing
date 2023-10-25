import { front } from './front.mjs'

function jaegerChestPocketBag({
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
  const width = store.get('chestPocketWidth')
  const welt = store.get('chestPocketWeltHeight')
  const height = width * options.chestPocketDepth
  const angle = options.chestPocketAngle

  points.topLeft = new Point(0, 0)
  points.topRight = points.topLeft.shift(angle, width)
  points.foldLeft = points.topLeft.shift(-90, height)
  points.foldRight = new Point(points.topRight.x, points.foldLeft.y)
  points.bottomLeft = points.topLeft.shift(-90, height * 2 + welt)
  points.bottomRight = points.bottomLeft.shift(-1 * angle, width)

  // Paths
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'lining')

  if (complete)
    paths.fold = new Path()
      .move(points.foldLeft)
      .line(points.foldRight)
      .addClass('stroke-sm dashed lining')
      .addText('foldAlongThisLine', 'center fill-note')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'lining' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.foldRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 12,
    title: 'chestPocketBag',
    align: 'center',
    scale: 0.666,
  })

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, 10),
    to: points.topLeft.shift(0, 10),
  })

  // Instructions
  macro('hd', {
    id: 'wFull',
    from: points.topLeft,
    to: points.topRight,
    y: points.topRight.y - sa - 15,
  })
  macro('vd', {
    id: 'hToFold',
    from: points.bottomRight,
    to: points.foldRight,
    x: points.topRight.x + sa + 15,
  })
  macro('vd', {
    id: 'hFromFold',
    from: points.foldRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })
  macro('vd', {
    from: points.bottomRight,
    id: 'hFull',
    to: points.topRight,
    x: points.topRight.x + sa + 30,
  })
  macro('vd', {
    id: 'hToFoldSmall',
    from: points.bottomLeft,
    to: points.foldLeft,
    x: points.topLeft.x - sa - 15,
  })
  macro('vd', {
    id: 'hFromFoldSmall',
    from: points.foldLeft,
    to: points.topLeft,
    x: points.topLeft.x - sa - 15,
  })

  return part
}

export const chestPocketBag = {
  name: 'jaeger.chestPocketBag',
  after: front,
  draft: jaegerChestPocketBag,
}
