export default (part) => {
  let { Point, points, macro } = part.shorthand()

  points.anchor1 = new Point(0, 0)
  points.anchor2 = new Point(70, 0)

  macro('scalebox', { at: points.anchor1 })
  macro('miniscale', { at: points.anchor2 })

  return part
}
