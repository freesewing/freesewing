import { box } from './shared'

export default (part) => {
  const { points, Point, macro } = part.shorthand()

  points.a = new Point(30, 30)

  macro('title', {
    at: points.a,
    nr: 1,
    title: 'Part name',
  })

  return box(part, 100, 65)
}
