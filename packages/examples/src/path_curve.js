import { box } from './shared'

export default (part) => {
  let { Point, points, Path, paths } = part.shorthand()

  points.from = new Point(10, 20)
  points.cp1 = new Point(40, 0)
  points.cp2 = new Point(60, 30)
  points.to = new Point(90, 20)

  paths.line = new Path()
    .move(points.from)
    .curve(points.cp1, points.cp2, points.to)
    .attr('data-text', 'Path.curve()')
    .attr('data-text-class', 'text-sm center fill-note')

  return box(part, 100, 25)
}
