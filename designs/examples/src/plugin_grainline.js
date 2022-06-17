import { box } from './shared'

export default (part) => {
  let { Point, points, macro } = part.shorthand()

  points.grainlineFrom = new Point(10, 10)
  points.grainlineTo = new Point(100, 10)

  macro('grainline', {
    from: points.grainlineFrom,
    to: points.grainlineTo,
  })

  return box(part, 110, 15)
}
