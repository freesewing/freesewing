export default (part) => {
  let { Point, points, Path, paths } = part.shorthand()

  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)

  paths.example = new Path()
    .move(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .attr('data-text', 'freesewingIsMadeByJoostDeCockAndContributors')
    .attr('data-text-class', 'text-xs fill-note')

  paths.reverse = paths.example
    .reverse()
    .attr('data-text', 'freesewingIsMadeByJoostDeCockAndContributors')
    .attr('data-text-class', 'text-xs fill-lining')

  return part
}
