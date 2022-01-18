export default function (part) {
  const { store, sa, Point, points, Path, paths, complete, paperless, macro, units } =
    part.shorthand()

  const width = store.get('hoodCenterWidth')
  const length = complete ? width * 2.5 : store.get('hoodCenterLength')
  points.topLeft = new Point(0, 0)
  points.bottomLeft = new Point(0, width)
  points.topMidLeft = new Point(width, 0)
  points.bottomMidLeft = new Point(width, width)
  points.topMidRight = new Point(width * 1.5, 0)
  points.bottomMidRight = new Point(width * 1.5, width)
  points.topRight = new Point(length, 0)
  points.bottomRight = new Point(length, width)

  if (complete) {
    paths.seam = new Path()
      .move(points.topMidLeft)
      .line(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomMidLeft)
      .move(points.bottomMidRight)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topMidRight)
      .attr('class', 'fabric')
    paths.hint = new Path()
      .move(points.topMidLeft)
      .line(points.topMidRight)
      .move(points.bottomMidLeft)
      .line(points.bottomMidRight)
      .attr('class', 'fabric dashed')
  } else {
    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .close()
      .attr('class', 'fabric')
  }

  // Complete pattern?
  if (complete) {
    if (sa) paths.sa = new Path()
      .move(points.topLeft.shift(180, sa))
      .line(points.bottomLeft.shift(180, sa))
      .line(points.bottomLeft.shift(-90, sa))
      .line(points.bottomRight.shift(-90, sa))
      .line(points.bottomRight.shift(0, sa))
      .line(points.topRight.shift(0, sa))
      .line(points.topRight.shift(90, sa))
      .line(points.topLeft.shift(90, sa))
      .close()
      .attr('class', 'fabric sa')
    points.title = points.bottomLeft.shiftFractionTowards(points.topRight, 0.5)
    macro('title', { at: points.title, nr: 6, title: 'hoodCenter' })
    macro('grainline', {
      from: points.topLeft.shift(-90, width / 2),
      to: points.topRight.shift(-90, width / 2),
    })
    // Always include this dimension as we don't print the entire part
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomRight.y + sa + 15,
      text: units(store.get('hoodCenterLength')),
    })
    // Paperless?
    if (paperless) {
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + sa + 15,
      })
    }
  }

  return part
}
