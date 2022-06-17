export default (part) => {
  let { Point, points, Path, paths, utils } = part.shorthand()

  points.from = new Point(40, 10)
  points.to = new Point(40, 80)
  paths.line = new Path().move(points.from).line(points.to).attr('class', 'lining dashed')

  points.start = new Point(10, 15)
  points.cp1 = new Point(80, 10)
  points.cp2 = new Point(-50, 80)
  points.end = new Point(110, 70)

  points.i40 = utils.curveIntersectsX(points.start, points.cp1, points.cp2, points.end, 40)

  let parts = utils.splitCurve(points.start, points.cp1, points.cp2, points.end, points.i40)

  let colors = ['lining', 'interfacing']
  for (let p of parts) {
    let color = colors.pop()
    paths[color] = new Path()
      .move(p.start)
      .curve(p.cp1, p.cp2, p.end)
      .attr('class', 'stroke-xl ' + color)
  }

  return part
}
