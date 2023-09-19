import { frontBase } from './frontbase.mjs'
import { backBase } from './backbase.mjs'
import { pocketFoldover } from './options.mjs'

function jaegerPocket({ sa, store, complete, points, options, macro, Point, paths, Path, part }) {
  const width = store.get('pocketWidth')
  const depth = store.get('pocketDepth')

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(width, 0)
  points.bottomLeft = new Point(0, depth)
  points.bottomRight = new Point(width, depth)
  // Add foldover points
  points.edgeLeft = points.bottomLeft.shiftFractionTowards(
    points.topLeft,
    1 + options.pocketFoldover
  )
  points.edgeRight = new Point(points.topRight.x, points.edgeLeft.y)

  // Round the pocket
  if (options.frontPocketRadius > 0) {
    macro('round', {
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      radius: width * options.frontPocketRadius,
      prefix: 'left',
    })
    macro('round', {
      from: points.bottomLeft,
      to: points.topRight,
      via: points.bottomRight,
      radius: width * options.frontPocketRadius,
      prefix: 'right',
    })
  }

  // Paths
  if (options.frontPocketRadius > 0) {
    paths.seam = new Path()
      .move(points.edgeLeft)
      .line(points.leftStart)
      .curve(points.leftCp1, points.leftCp2, points.leftEnd)
      .line(points.rightStart)
      .curve(points.rightCp1, points.rightCp2, points.rightEnd)
      .line(points.edgeRight)
      .line(points.edgeLeft)
      .close()
      .attr('class', 'fabric')
  } else {
    paths.seam = new Path()
      .move(points.edgeLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.edgeRight)
      .line(points.edgeLeft)
      .close()
      .attr('class', 'fabric')
  }
  if (complete)
    paths.fold = new Path()
      .move(points.topLeft)
      .line(points.topRight)
      .addClass('fabric help')
      .addText('foldAlongThisLine', 'center fill-note')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 9,
    title: 'pocket',
    align: 'center',
  })

  // Instructions

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, 10),
    to: points.edgeLeft.shift(0, 10),
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.edgeLeft,
    to: points.edgeRight,
    y: points.edgeLeft.y - sa - 15,
  })
  let corner = points.bottomRight
  if (options.frontPocketRadius > 0) corner = points.rightStart
  macro('vd', {
    id: 'hToFold',
    from: corner,
    to: points.topRight,
    x: points.edgeRight.x + sa + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: corner,
    to: points.edgeRight,
    x: points.edgeRight.x + sa + 30,
  })

  return part
}

export const pocket = {
  name: 'jaeger.pocket',
  after: [frontBase, backBase],
  options: { pocketFoldover },
  draft: jaegerPocket,
}
