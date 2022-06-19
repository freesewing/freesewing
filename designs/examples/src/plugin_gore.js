export default (part) => {
  const { Point, points, macro } = part.shorthand()

  points.anchor = new Point(0, 0)

  macro('gore', {
    from: points.anchor,
    radius: 60,
    gores: 5,
    extraLength: 20,
    render: true,
  })

  return part
}
