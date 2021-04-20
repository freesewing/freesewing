export default (part) => {
  let { Point, points, Path, paths } = part.shorthand()

  points.center = new Point(0, 0)
  points.base = new Point(0, 10)
  points.tip = new Point(0, 50)
  points.tipCpRight = new Point(30, 50)
  points.tipCpLeft = new Point(-30, 50)
  paths.example = new Path().move(points.base)
  for (let i = 0; i < 4; i++) {
    points['base' + i] = points.base.rotate(60 * i, points.center)
    points['tip' + i] = points.tip.rotate(60 * i, points.center)
    points['tipCpRight' + i] = points.tipCpRight.rotate(60 * i, points.center)
    points['tipCpLeft' + i] = points.tipCpLeft.rotate(60 * i, points.center)
    if (i < 2) {
      paths.example
        .line(points['base' + i])
        .curve(points['base' + i], points['tipCpLeft' + i], points['tip' + i])
        .curve(points['tipCpRight' + i], points['base' + i], points['base' + i])
    } else {
      paths.example
        .line(points['base' + i])
        .line(points['tip' + i])
        .line(points['tipCpRight' + i])
        .line(points['base' + i])
    }
  }

  paths.offset = paths.example.offset(10).attr('class', 'lining dotted stroke-sm')

  paths.trimmed = paths.offset
    .trim()
    .attr('class', 'various stroke-xl')
    .attr('style', 'stroke-opacity: 0.5;')
  return part
}
