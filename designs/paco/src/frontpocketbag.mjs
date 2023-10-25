import { front } from './front.mjs'

function pacoFrontPocketBag({ sa, points, Path, paths, store, snippets, options, macro, part }) {
  // Don't bother of we're not drafting front pockets
  if (!options.frontPockets) return part.hide()

  // Clean up
  for (const path in paths) delete paths[path]
  for (const snippet in snippets) delete snippets[snippet]

  // Rotate all points around topRight, so the part is aligned vertically
  const list = ['topLeft', 'flapTopLeft', 'flapBottomLeft', 'bottomCp1', 'bottom', 'bottomRight']
  const angle = -90 - points.topRight.angle(points.bottomRight)
  for (const point in points) {
    if (list.indexOf(point) !== -1) points[point] = points[point].rotate(angle, points.topRight)
  }

  paths.pocket = new Path()
    .move(points.topLeft)
    .line(points.flapBottomLeft)
    ._curve(points.bottomCp1, points.bottom)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'lining')

  if (sa) {
    paths.sa = new Path()
      .move(points.topRight)
      .line(points.topLeft)
      .line(points.flapBottomLeft)
      ._curve(points.bottomCp1, points.bottom)
      .line(points.bottomRight)
      .offset(sa)
    paths.sa = new Path()
      .move(points.topRight)
      .join(paths.sa)
      .line(points.bottomRight)
      .attr('class', 'lining sa')
  }

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'lining' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 5,
    title: 'pocketBag',
  })

  // Cutonfold
  macro('cutonfold', {
    from: points.bottomRight,
    to: points.topRight,
    grainline: true,
  })

  // Notches
  macro('sprinkle', {
    snippet: 'notch',
    on: ['flapTopLeft', 'flapBottomLeft'],
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.flapBottomLeft,
    to: points.bottomRight,
    y: points.bottomRight.y + 15 + sa,
  })
  macro('hd', {
    id: 'wAtWaist',
    from: points.topLeft,
    to: points.topRight,
    y: points.topLeft.y - 15 - sa,
  })
  macro('vd', {
    id: 'hAtFold',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + 15 + sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topLeft,
    x: points.topRight.x + 30 + sa,
  })
  macro('ld', {
    id: 'lWaistToOpening',
    from: points.flapTopLeft,
    to: points.topLeft,
    d: 15 + sa,
  })
  macro('ld', {
    id: 'lOpening',
    from: points.flapBottomLeft,
    to: points.flapTopLeft,
    d: 15 + sa,
  })

  return part
}

export const frontPocketBag = {
  name: 'paco.frontPocketBag',
  from: front,
  draft: pacoFrontPocketBag,
}
