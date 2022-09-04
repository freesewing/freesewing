export default function (part) {
  let { measurements, options, sa, Point, points, Path, paths, complete, paperless, macro, units } =
    part.shorthand()

  let width = (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight * 2
  let length = complete
    ? width * 2.5
    : measurements.chest * (1 + options.chestEase) * (1 - options.ribbingStretch)

  // We only print a part, unless complete is false in which case
  // we print the entire thing (because laser cutters and so on)
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
      .attr('class', 'various')
    paths.hint = new Path()
      .move(points.topMidLeft)
      .line(points.topMidRight)
      .move(points.bottomMidLeft)
      .line(points.bottomMidRight)
      .attr('class', 'various dashed')
  } else {
    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .close()
      .attr('class', 'various')
  }

  // Complete pattern?
  if (complete) {
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'various sa')
    points.title = points.bottomLeft.shiftFractionTowards(points.topRight, 0.5)
    macro('title', { at: points.title, nr: 8, title: 'waistband' })
    macro('grainline', {
      from: points.bottomMidLeft,
      to: points.topMidLeft,
    })

    // Always include this dimension as we don't print the entire part
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomRight.y + sa + 15,
      text: units(measurements.chest * (1 + options.chestEase) * (1 - options.ribbingStretch)),
    })
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}
