export default function(part) {
  let {
    measurements,
    options,
    sa,
    Point,
    points,
    Path,
    paths,
    complete,
    paperless,
    macro,
    units
  } = part.shorthand()

  let width = measurements.hpsToHipsBack * options.ribbingHeight * 2

  points.topLeft = new Point(0, 0)
  points.bottomLeft = new Point(0, width)
  points.topMidLeft = new Point(width, 0)
  points.bottomMidLeft = new Point(width, width)
  points.topMidRight = new Point(width * 1.5, 0)
  points.bottomMidRight = new Point(width * 1.5, width)
  points.topRight = new Point(width * 2.5, 0)
  points.bottomRight = new Point(width * 2.5, width)

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

  // Complete pattern?
  if (complete) {
    if (sa) {
      paths.sa = paths.seam.offset(sa)
    }
    points.title = points.bottomLeft.shiftFractionTowards(points.topRight, 0.5)
    macro('title', { at: points.title, nr: 8, title: 'waistband' })
    macro('grainline', {
      from: points.bottomMidLeft,
      to: points.topMidLeft
    })
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomRight.y + sa + 15,
      text: units(
        measurements.chestCircumference * (1 + options.chestEase) * (1 - options.ribbingStretch)
      )
    })
  }

  return part
}
