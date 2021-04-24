export default function (part) {
  let {
    Point,
    points,
    Path,
    paths,
    measurements,
    options,
    macro,
    complete,
    sa,
    paperless,
  } = part.shorthand()

  // Design pattern here

  //Radius of the head
  let headRadius = measurements.head / 2 / Math.PI

  points.p0 = new Point(0, 0)

  macro('gore', {
    from: points.p0,
    radius: headRadius,
    goreNumber: options.goreNumber,
    extraLength: ((options.lengthRatio - 0.5) * measurements.head) / 2,
    prefix: 'gore_',
    render: true,
  })

  // Complete?
  if (complete) {
    points.title = new Point(points.gore_p1.x / 10, points.gore_p2.y / 1.8)
    macro('title', { at: points.title, nr: 1, title: 'gore', scale: 0.5 })

    macro('cutonfold', {
      from: points.p0,
      to: points.gore_p1.shift(180, 20),
      offset: -points.gore_p2.y / 6,
      grainline: true,
    })

    if (sa) {
      paths.saBase = new Path()
        .move(points.gore_p1)
        .curve(points.gore_Cp1, points.gore_Cp2, points.gore_p2)
        .line(points.gore_p3)
        .line(points.p0)
        .offset(sa)
        .setRender(false)
      paths.sa = new Path()
        .move(points.gore_p1)
        .line(points.gore_p1.shift(0, sa))
        .line(paths.saBase.start())
        .join(paths.saBase)
        .line(points.p0)
        .attr('class', 'fabric sa')
    }

    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.p0,
        to: points.gore_p1,
        y: -points.p0.x + 15,
      })
      macro('vd', {
        from: points.p0,
        to: points.gore_p3,
        x: points.p0.x - 15 - sa,
      })
    }
  }
  return part
}
