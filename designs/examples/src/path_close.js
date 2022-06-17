import { box } from './shared'

export default (part) => {
  let { Point, points, Path, paths } = part.shorthand()

  points.from = new Point(10, 20)
  points.cp2 = new Point(60, 30)
  points.to = new Point(90, 20)

  paths.line = new Path()
    .move(points.from)
    ._curve(points.cp2, points.to)
    .close()
    .reverse() // To keep text from being upside-down
    .attr('data-text', 'Path._close()')
    .attr('data-text-class', 'text-sm right fill-note')

  return box(part, 100, 25)
}
