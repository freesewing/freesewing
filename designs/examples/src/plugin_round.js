export default (part) => {
  let { Point, points, Path, paths, macro } = part.shorthand()

  points.topLeft = new Point(0, 0)
  points.bottomLeft = new Point(0, 30)
  points.topRight = new Point(100, 0)
  points.bottomRight = new Point(100, 30)

  paths.demo = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .close()
    .attr('class', 'note dashed')

  macro('round', {
    from: points.topLeft,
    to: points.bottomRight,
    via: points.bottomLeft,
    radius: 10,
    prefix: 'bl',
    render: true,
  })
  macro('round', {
    from: points.bottomRight,
    to: points.topLeft,
    via: points.topRight,
    radius: 20,
    prefix: 'tr',
    render: true,
  })

  return part
}
