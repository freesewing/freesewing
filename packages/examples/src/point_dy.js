export default (part) => {
  let { Point, points, macro } = part.shorthand()

  points.from = new Point(10, 10)
  points.to = new Point(90, 40)

  macro('vd', {
    from: points.to,
    to: points.from,
    x: 50
  })

  return part
}
