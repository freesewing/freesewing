import { pocket } from './pocket.mjs'

function hugoPocketFacing({ sa, points, Path, paths, macro, store, part }) {
  // Remove clutter
  for (const key in paths) {
    if (key !== 'facing') delete paths[key]
  }

  paths.seam = paths.facing
    .clone()
    .unhide()
    .line(points.pocketTop)
    .curve(points.pocketTopCp, points.pocketTip, points.pocketTip)
    .line(points.facingEnd)
    .close()
    .attr('class', 'fabric', true)

  points.saStart = points.pocketTop.shift(180, store.get('facingWidth'))

  if (sa) {
    paths.sa = new Path()
      .move(points.saStart)
      .line(points.pocketTop)
      .curve(points.pocketTopCp, points.pocketTip, points.pocketTip)
      .line(points.facingEnd)
      .offset(sa * -1)
      .attr('class', 'fabric sa')
    paths.sa.line(points.facingEnd).move(points.saStart).line(paths.sa.start())
  }

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = points.pocketTopCp.clone()
  macro('title', { at: points.title, nr: 5, title: 'pocketFacing', scale: 0.666, align: 'center' })

  // Dimensions
  macro('hd', {
    id: 'width',
    from: points.saStart,
    to: points.pocketTop,
    y: points.saStart.y - 15 - sa,
  })

  return part
}

export const pocketFacing = {
  name: 'hugo.pocketFacing',
  from: pocket,
  draft: hugoPocketFacing,
}
