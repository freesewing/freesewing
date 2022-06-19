export default (part) => {
  let { Point, points, Path, paths, Snippet, snippets } = part.shorthand()

  points.A = new Point(45, 60)
  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)
  points.D = new Point(-60, 90)
  points.E = new Point(90, 190)

  paths.demo = new Path()
    .move(points.A)
    .line(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .curve(points.E, points.D, points.A)
    .close()

  for (let i of [
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'top',
    'left',
    'bottom',
    'right',
  ])
    snippets[i] = new Snippet('notch', paths.demo.edge(i))

  return part
}
