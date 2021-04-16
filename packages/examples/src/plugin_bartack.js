import { box } from './shared'

export default (part) => {
  let { Point, Path, points, paths, macro } = part.shorthand()

  points.a = new Point(15, 15)

  macro('bartack', {
    anchor: points.a,
    angle: 30,
    length: 15
  })

  return box(part, 60, 30)
}
