export default (part) => {
  let { Point, points, Path, paths, macro } = part.shorthand()

  points.A = new Point(0, 0)
  points.B = new Point(0, 100)
  points.C = new Point(50, 100)
  points.D = new Point(100, 50)
  points.DCp1 = new Point(100, 0)

  paths.box = new Path()
    .move(points.A)
    .line(points.B)
    .line(points.C)
    .line(points.D)
    .curve(points.DCp1, points.A, points.A)
    .close()

  macro('vd', {
    from: points.A,
    to: points.B,
    x: points.A.x - 15,
  })

  macro('hd', {
    from: points.B,
    to: points.C,
    y: points.B.y + 15,
  })

  macro('ld', {
    from: points.C,
    to: points.D,
    d: -15,
  })

  macro('ld', {
    from: points.C,
    to: points.D,
    d: -30,
    text: 'Custom text',
  })

  macro('pd', {
    path: new Path().move(points.A).curve(points.A, points.DCp1, points.D),
    d: -15,
  })

  return part
}
