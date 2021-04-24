import { box } from './shared'

export default (part) => {
  let { Point, Path, points, paths, macro } = part.shorthand()

  points.a = new Point(5, 5)
  points.b = new Point(45, 30)
  points.c = new Point(5, 30)
  points.d = new Point(45, 5)
  points.mid = new Point(25, 15)

  paths.a = new Path().move(points.a).curve(points.b, points.c, points.d)

  macro('mirror', {
    mirror: [points.b, points.d],
    points: [points.mid],
    paths: [paths.a],
  })

  macro('sprinkle', {
    snippet: 'notch',
    on: ['mid', 'mirroredMid'],
  })

  return box(part, 100, 40)
}
