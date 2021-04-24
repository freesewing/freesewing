import { box } from './shared'

export default (part) => {
  let { Point, points, macro } = part.shorthand()

  points.a = new Point(10, 10)
  points.b = new Point(20, 15)
  points.c = new Point(30, 10)
  points.d = new Point(40, 15)
  points.e = new Point(50, 10)
  points.f = new Point(60, 15)
  points.g = new Point(70, 10)
  points.h = new Point(80, 15)
  points.i = new Point(90, 10)

  macro('sprinkle', {
    snippet: 'button',
    on: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
  })

  return box(part, 100, 25)
}
