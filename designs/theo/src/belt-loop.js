export default function (part) {
  let { absoluteOptions, Point, points, Path, paths, complete, paperless, macro } = part.shorthand()

  let height = absoluteOptions.waistbandWidth + 30
  let width = (height - 30) / 2

  points.topRight = new Point(width / 2, 0)
  points.topLeft = points.topRight.flipX()
  points.bottomRight = new Point(width / 2, height)
  points.bottomLeft = points.bottomRight.flipX()

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
    points.title = new Point(0, height / 2)
    macro('title', {
      at: points.title,
      title: 'beltLoop',
      nr: 14,
      scale: 0.4,
    })
    points.grainlineTop = points.topLeft.shiftFractionTowards(points.topRight, 0.5)
    points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })
  }

  // Paperless?
  if (paperless) {
  }

  return part
}
