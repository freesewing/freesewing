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
    macro
  } = part.shorthand()

  let width = measurements.hpsToHipsBack * options.ribbingHeight * 2
  let length =
    measurements.wristCircumference * (1 + options.cuffEase) * (1 - options.ribbingStretch)

  points.topLeft = new Point(0, 0)
  points.bottomLeft = new Point(0, width)
  points.topRight = new Point(length, 0)
  points.bottomRight = new Point(length, width)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    if (sa) {
      paths.sa = paths.seam.offset(sa)
    }
    points.title = points.bottomLeft.shiftFractionTowards(points.topRight, 0.5)
    macro('title', { at: points.title, nr: 9, title: 'cuff' })
    macro('grainline', {
      from: points.bottomLeft.shift(0, 20),
      to: points.topLeft.shift(0, 20)
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
      y: points.bottomRight.y + sa + 15
    })
  }

  return part
}
