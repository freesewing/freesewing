import { box } from './shared'

export default (part) => {
  const { points, Point, macro } = part.shorthand()

  points.a = new Point(55, 25)
  macro('scalebox', { at: points.a })

  return box(part, 110, 55)
}
