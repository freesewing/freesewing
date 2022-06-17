import { box } from './shared'

export default (part) => {
  let { Point, points, Path, paths } = part.shorthand()

  points.to = new Point(50, 10)
    .attr('data-text', 'Path.move()')
    .attr('data-text-class', 'fill-note center')

  paths.noline = new Path().move(points.to)

  return box(part, 100, 15)
}
