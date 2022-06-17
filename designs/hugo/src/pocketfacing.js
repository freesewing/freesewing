export default function (part) {
  // Remove clutter
  let facing = part.paths.facing
  part.paths = {}

  let { sa, points, Path, paths, complete, paperless, macro, store } = part.shorthand()

  paths.seam = facing
    .line(points.pocketTop)
    .curve(points.pocketTopCp, points.pocketTip, points.pocketTip)
    .line(points.facingEnd)
    .close()
    .attr('class', 'fabric', true)

  points.saStart = points.pocketTop.shift(180, store.get('facingWidth'))

  // Complete pattern?
  if (complete) {
    points.title = points.pocketTopCp.clone()
    macro('title', { at: points.title, nr: 5, title: 'pocketFacing' })
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
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.saStart,
      to: points.pocketTop,
      y: points.saStart.y - 15 - sa,
    })
  }

  return part
}
