export default function (part) {
  let { Point, points, Path, paths, measurements } = part.shorthand()

  points.right = new Point(measurements.head / 10, 0)
  points.bottom = new Point(0, measurements.head / 12)

  points.rightCp1 = points.right.shift(90, points.bottom.dy(points.right) / 2)
  points.bottomCp2 = points.bottom.shift(0, points.bottom.dx(points.right) / 2)

  paths.neck = new Path().move(points.right).curve(points.rightCp1, points.bottomCp2, points.bottom)

  return part
}
