export default (part) => {
  const { Point, points, Path, paths } = part.shorthand()

  points.left = new Point(10,10)
  points.dartLeft = new Point(40, 10)
  points.dartTip = new Point(50, 50)
  points.dartRight = new Point(60, 10)
  points.right = new Point(90, 10)

  paths.without = new Path()
    .move(points.left)
    .line(points.dartLeft)
    .noop('dart')
    .line(points.right)

  paths.withDart = paths.without
    .insop(
      'dart',
      new Path()
        .line(points.dartTip)
        .line(points.dartRight)
    )
    .attr('style', 'stroke-width: 2px; stroke-opacity: 0.5; stroke: orange;')

  return part
}
