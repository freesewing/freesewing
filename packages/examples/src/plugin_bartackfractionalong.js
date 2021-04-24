import { box } from './shared'

export default (part) => {
  let { Point, Path, points, paths, macro } = part.shorthand()

  points.a = new Point(15, 15)
  points.b = new Point(20, 20)
  points.c = new Point(30, 20)
  points.d = new Point(35, 15)
  points.e = new Point(20, 10)
  points.f = new Point(30, 10)

  paths.a = new Path().move(points.a).curve(points.b, points.c, points.d).setRender(false)

  macro('bartackFractionAlong', {
    path: paths.a,
    start: 0.2,
    end: 0.8,
  })

  macro('sprinkle', {
    snippet: 'notch',
    on: ['e', 'f'],
  })

  return box(part, 60, 30)
}
