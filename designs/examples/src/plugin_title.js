import { box } from './shared'

export default (part) => {
  let { Point, points, macro } = part.shorthand()

  points.title = new Point(90, 45)

  macro('title', {
    at: points.title,
    nr: 4,
    title: 'sleeve',
    prefix: 'test',
  })

  return box(part, 200, 70)
}
