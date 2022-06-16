export default (part) => {
  let { Point, points, Path, paths } = part.shorthand()

  points.A = new Point(45, 60)
  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)

  paths.example = new Path()
    .move(points.A)
    .line(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .line(points.A)
    .close()

  paths.offset = paths.example.offset(-10).attr('class', 'interfacing')

  paths.lineOffset = new Path().move(points.A).line(points.B).offset(-5).attr('class', 'various')

  paths.curveOffset = new Path()
    .move(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .offset(-5)
    .attr('class', 'canvas')

  return part
}
