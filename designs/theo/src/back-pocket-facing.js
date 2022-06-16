export default function (part) {
  let { macro, measurements, Point, points, Path, paths, complete, paperless } = part.shorthand()

  let width = measurements.hips * 0.16
  let height = width / 2

  points.topRight = new Point(width / 2, 0)
  points.topLeft = points.topRight.flipX()
  points.bottomRight = new Point(width / 2, height)
  points.bottomLeft = points.bottomRight.flipX()
  points.weltLeft = new Point(points.topLeft.x + 15, points.topLeft.y + height / 2)
  points.weltRight = new Point(points.topRight.x - 15, points.topRight.y + height / 2)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')
  paths.welt = new Path()
    .move(points.weltLeft)
    .line(points.weltRight)
    .attr('class', 'fabric dashed')

  // Complete pattern?
  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', { at: points.title, title: 'backPocketFacing', nr: 12 })
    points.grainlineTop = points.topLeft.shiftFractionTowards(points.topRight, 0.2)
    points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['weltLeft', 'weltRight'],
    })
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.bottomRight.x + 15,
    })
  }

  return part
}
