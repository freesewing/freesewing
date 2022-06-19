export default function (part) {
  let { paperless, sa, store, complete, points, options, macro, Point, paths, Path } =
    part.shorthand()

  let width = store.get('innerPocketWidth')
  let welt = store.get('innerPocketWeltHeight')
  let height = width * options.innerPocketDepth

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(width, 0)
  points.foldLeft = new Point(0, height)
  points.foldRight = new Point(width, height)
  points.bottomLeft = new Point(0, height * 2 + welt * 2)
  points.bottomRight = new Point(width, height * 2 + welt * 2)

  // Paths
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'lining')

  paths.fold = new Path()
    .move(points.foldLeft)
    .line(points.foldRight)
    .attr('class', 'stroke-sm lining dashed')

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.foldRight, 0.5)
    // Title
    macro('title', {
      at: points.title,
      nr: 14,
      title: 'innerPocketBag',
    })

    // Grainline
    macro('grainline', {
      from: points.bottomLeft.shift(0, 10),
      to: points.topLeft.shift(0, 10),
    })

    // Instructions
    paths.fold.attr('data-text', 'foldAlongThisLine').attr('data-text-class', 'center')

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

    if (paperless) {
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topRight.y - sa - 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.foldRight,
        x: points.topRight.x + sa + 15,
      })
      macro('vd', {
        from: points.foldRight,
        to: points.topRight,
        x: points.topRight.x + sa + 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + sa + 30,
      })
      macro('vd', {
        from: points.bottomLeft,
        to: points.foldLeft,
        x: points.topLeft.x - sa - 15,
      })
      macro('vd', {
        from: points.foldLeft,
        to: points.topLeft,
        x: points.topLeft.x - sa - 15,
      })
    }
  }

  return part
}
