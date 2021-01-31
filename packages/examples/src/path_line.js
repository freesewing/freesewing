import { box } from './shared'

export default (part) => {
  let { Point, points, Path, paths } = part.shorthand()

  points.from = new Point(10, 10)
  points.to = new Point(90, 10)

  paths.line = new Path()
    .move(points.from)
    .line(points.to)
    .attr('data-text', 'Path.line()')
    .attr('data-text-class', 'text-sm center fill-note')

  return box(part, 100, 15)
}
