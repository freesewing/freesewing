export default (part) => {
  let { points, Point, paths, Path, measurements, options, macro, complete, paperless } =
    part.shorthand()

  let pw = measurements.hips * options.pocketWidth // Pocket width
  let pwh = pw * options.weltHeight // Pocket welt height

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(pw + 30, 0)
  points.bottomLeft = new Point(0, pwh + 20)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
  points.notchLeft = new Point(15, 10)
  points.notchRight = new Point(pw + 15, 10)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'interfacing')

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      nr: 8,
      title: 'pocketInterfacing',
      at: points.title,
    })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['notchLeft', 'notchRight'],
    })
    paths.cutline = new Path()
      .move(points.notchLeft)
      .line(points.notchRight)
      .attr('class', 'interfacing stroke-sm dashed')
  }

  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + 15,
    })
  }

  return part
}
