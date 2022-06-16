export default (part) => {
  let { Point, points, Path, paths } = part.shorthand()

  points.A = new Point(45, 60)
  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)

  paths.path1 = new Path().move(points.A).line(points.B).attr('class', 'various')

  paths.path2 = new Path()
    .move(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .attr('class', 'canvas')

  paths.joint = paths.path1
    .join(paths.path2)
    .attr('class', 'note lashed stroke-l')
    .attr('style', 'stroke-opacity: 0.5')

  return part
}
