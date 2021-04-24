export default (part) => {
  let { Point, points, Path, paths, macro } = part.shorthand()

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(150, 0)
  points.bottomRight = new Point(150, 30)
  points.bottomLeft = new Point(0, 30)

  paths.box = new Path()
    .move(points.topLeft)
    .line(points.topRight)
    .line(points.bottomRight)
    .line(points.bottomLeft)
    .close()

  macro('cutonfold', {
    from: points.bottomLeft,
    to: points.bottomRight,
    grainline: true,
  })

  return part
}
