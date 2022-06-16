export default (part) => {
  let { Point, points, Path, paths, Snippet, snippets, utils } = part.shorthand()

  points.start = new Point(10, 10)
  points.cp1 = new Point(90, 10)
  points.cp2 = new Point(10, 60)
  points.end = new Point(90, 60)

  let scatter = []
  for (let i = 1; i < 19; i++) {
    for (let j = 1; j < 14; j++) {
      scatter.push(new Point(i * 10, j * 10))
    }
  }
  let snippet
  for (let point of scatter) {
    if (utils.pointOnCurve(points.start, points.cp1, points.cp2, points.end, point)) {
      snippet = 'notch'
    } else snippet = 'bnotch'
    snippets[part.getId()] = new Snippet(snippet, point)
  }
  paths.curve = new Path()
    .move(points.start)
    .curve(points.cp1, points.cp2, points.end)
    .attr('class', 'fabric stroke-lg')

  return part
}
