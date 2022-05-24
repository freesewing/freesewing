export default (part) => {
  let { Point, points, Path, paths } = part.shorthand()

  points.B = new Point(10, 50)
  points.BCp2 = new Point(40, 10)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, 90)

  paths.example = new Path()
    .move(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .attr('class', 'canvas')
    .attr('data-text', 'supportFreesewingBecomeAPatron')
    .attr('data-text-class', 'text-xs center')

  return part
}
