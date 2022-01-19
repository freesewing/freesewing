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
    absoluteOptions,
  } = part.shorthand()

  // Design pattern here

  //Radius of the head
  let headCircumference = measurements.head + absoluteOptions.headEase
  let headRadius = headCircumference / 2 / Math.PI

  points.p0 = new Point(0, 0)

  macro('gore', {
    from: points.p0,
    radius: headRadius,
    gores: options.gores,
    extraLength: ((options.lengthRatio - 0.5) * headCircumference) / 2,
    prefix: 'gore_',
    render: true,
  })

  // Complete?
  if (complete) {
    points.title = new Point(points.gore_p1.x / 10, points.gore_p2.y / 1.8)
    macro('title', { at: points.title, nr: 1, title: 'crown', scale: 0.5 })

    macro('cutonfold', {
      from: points.p0,
      to: points.gore_p1.shift(180, 20),
      offset: -points.gore_p2.y / 6,
      grainline: true,
    })

    if (sa) {
      paths.saCurve = new Path()
        .move(points.gore_p1)
        .curve(points.gore_Cp1, points.gore_Cp2, points.gore_p2)
        .offset(sa)
        .setRender(false)
      points.sa1 = new Point(points.gore_p3.x - sa * 2, points.gore_p3.y - sa)
      paths.saBase = new Path()
        .move(points.gore_p3)
        .line(points.p0)
        .offset(sa * 2)
        .setRender(false)
      paths.sa = new Path()
        .move(points.gore_p1)
        .line(points.gore_p1.shift(0, sa))
        .line(paths.saCurve.start())
        .join(paths.saCurve)
        .line(points.sa1)
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
        x: points.p0.x - 15 - sa * 2,
      })
    }
  }
  return part
}
