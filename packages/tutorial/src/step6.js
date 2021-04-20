export default function (part) {
  let { Point, points, Path, paths } = part.shorthand()

  points.edgeLeft = new Point(points.topLeft.x, points.left.y)
  points.edgeRight = new Point(points.topRight.x, points.right.y)
  points.edgeTop = new Point(0, points.topLeft.y)

  points.edgeLeftCp = points.edgeLeft.shiftFractionTowards(points.topLeft, 0.5)
  points.edgeRightCp = points.edgeLeftCp.flipX()
  points.edgeTopLeftCp = points.edgeTop.shiftFractionTowards(points.topLeft, 0.5)
  points.edgeTopRightCp = points.edgeTopLeftCp.flipX()

  paths.rect = new Path()
    .move(points.edgeTop)
    .curve(points.edgeTopLeftCp, points.edgeLeftCp, points.edgeLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.edgeRight)
    .curve(points.edgeRightCp, points.edgeTopRightCp, points.edgeTop)
    .close()

  return part
}
