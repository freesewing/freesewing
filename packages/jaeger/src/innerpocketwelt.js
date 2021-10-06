export default function (part) {
  let { paperless, sa, store, complete, points, macro, Point, paths, Path } = part.shorthand()

  let width = store.get('innerPocketWidth')
  let height = store.get('innerPocketWeltHeight')

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(width, 0)
  points.foldLeft = new Point(0, height)
  points.foldRight = new Point(width, height)
  points.bottomLeft = new Point(0, height * 2)
  points.bottomRight = new Point(width, height * 2)

  // Paths
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  paths.fold = new Path()
    .move(points.foldLeft)
    .line(points.foldRight)
    .attr('class', 'stroke-sm dashed')

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    // Title
    macro('title', {
      at: points.title,
      nr: 13,
      title: 'innerPocketWelt',
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topRight.y - sa - 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + sa + 15,
      })
    }
  }

  return part
}
