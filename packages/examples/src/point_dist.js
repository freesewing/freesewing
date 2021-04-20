export default (part) => {
  let { Point, points, macro } = part.shorthand()

  points.from = new Point(10, 10)
  points.to = new Point(90, 40)

  macro('ld', {
    from: points.from,
    to: points.to
  })

  return part
}
