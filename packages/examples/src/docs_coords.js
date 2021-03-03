import { box } from './shared'

export default (part) => {
  let { Point, points, paths, Path } = part.shorthand()

  points.origin = new Point(10, 10)
  points.x = new Point(100, 10)
  points.y = new Point(10, 50)
  points.textX = points.x.shift(135, 2).attr('data-text', 'X')
  points.textY = points.y.shift(180, 5).attr('data-text', 'Y')
  paths.coords = new Path()
    .move(points.y)
    .line(points.origin)
    .line(points.x)
    .attr('class', 'mark')
    .attr('marker-start', 'url(#dimensionFrom)')
    .attr('marker-end', 'url(#dimensionTo)')

  return box(part, 100, 50)
}
