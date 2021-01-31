export default (part) => {
  let { Point, points, Path, paths, Snippet, snippets, utils } = part.shorthand()

  points.A = new Point(10, 10)
  points.B = new Point(50, 40)
  points.C = new Point(45, 20)
  points.D = new Point(60, 15)

  paths.AB = new Path().move(points.A).line(points.B)
  paths.CD = new Path().move(points.C).line(points.D)

  snippets.x = new Snippet('notch', utils.beamsIntersect(points.A, points.B, points.C, points.D))

  return part
}
