export default function (part) {
  let { Point, points, Path, paths, measurements, options } = part.shorthand()

  let width = measurements.head * options.widthRatio
  let length = measurements.head * options.lengthRatio

  points.topLeft = new Point(width / -2, points.top.y - (width / 2 - points.right.x))
  points.topRight = points.topLeft.shift(0, width)
  points.bottomLeft = points.topLeft.shift(-90, length)
  points.bottomRight = points.topRight.shift(-90, length)

  paths.rect = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()

  return part
}
