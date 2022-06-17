export default (part) => {
  let { Point, points, Path, paths, Snippet, snippets, utils } = part.shorthand()

  points.A = new Point(10, 10)
  points.B = new Point(90, 30)

  paths.AB = new Path().move(points.A).line(points.B)

  snippets.x = new Snippet('notch', utils.beamIntersectsX(points.A, points.B, 40))

  paths.help = new Path()
    .move(new Point(40, 5))
    .line(new Point(40, 35))
    .attr('class', 'note dashed')

  return part
}
