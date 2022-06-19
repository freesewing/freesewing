import { box } from './shared'

export default (part) => {
  const { points, Point, macro } = part.shorthand()

  points.a = new Point(10, 20)
  points.b = new Point(90, 20)

  macro('grainline', {
    from: points.a,
    to: points.b,
  })

  return box(part, 100, 25)
}
