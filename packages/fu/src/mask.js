export default part => {
  let {
    points,
    Point,
    paths,
    Path,
    measurements,
    options,
    complete,
    sa,
    paperless,
    Snippet,
    snippets,
    macro
  } = part.shorthand()

  points.topLeft = new Point(0, 0)
  points.bottomLeft = new Point(0, measurements.headCircumference * options.height)
  points.topRight = new Point((measurements.headCircumference * options.length) / 2, 0)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
  points.tipCenter = new Point(points.topRight.x, points.bottomRight.y / 2)

  points.topEdge = points.topLeft.shiftFractionTowards(points.bottomLeft, 0.2)
  points.bottomEdge = points.bottomLeft.shiftFractionTowards(points.topLeft, 0.18)
  points.topTip = points.topRight.shiftFractionTowards(points.topLeft, 0.42 * options.shaping)
  points.bottomTip = points.bottomRight.shiftFractionTowards(
    points.bottomLeft,
    0.6 * options.shaping
  )
  points.topTipCp = points.tipCenter.shiftFractionTowards(points.topRight, 0.5)
  points.bottomTipCp = points.tipCenter.shiftFractionTowards(points.bottomRight, 0.5)

  points.topEdgeCp = points.topEdge.shift(0, measurements.headCircumference * options.curve)

  paths.seam = new Path()
    .move(points.topEdge)
    .line(points.bottomEdge)
    .line(points.bottomTip)
    ._curve(points.bottomTipCp, points.tipCenter)
    .curve_(points.topTipCp, points.topTip)
    .curve_(points.topEdgeCp, points.topEdge)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    points.logo = new Point(points.tipCenter.x / 2, points.tipCenter.y / 1.5)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.5)
    points.title = new Point(points.tipCenter.x / 2, points.tipCenter.y * 1.25)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'mask',
      scale: 0.5
    })

    points.topSnap = points.topEdge.shift(-45, 6)
    points.bottomSnap = points.bottomEdge.shift(45, 6)
    snippets.topSnap = new Snippet('snap-male', points.topSnap)
    snippets.bottomSnap = new Snippet('snap-male', points.bottomSnap)

    paths.strip = new Path()
      .move(points.topTip)
      .curve_(points.topEdgeCp, points.topEdge)
      .offset(-10)
      .attr('class', 'stroke-sm dotted')

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('hd', {
        from: points.bottomEdge,
        to: points.bottomTip,
        y: points.bottomTip.y + sa + 15
      })
      macro('hd', {
        from: points.bottomEdge,
        to: points.tipCenter,
        y: points.bottomTip.y + sa + 30
      })
      macro('hd', {
        from: points.topEdge,
        to: points.topTip,
        y: points.topTip.y - sa - 15
      })
      macro('vd', {
        from: points.bottomTip,
        to: points.bottomEdge,
        x: points.bottomEdge.x - sa - 15
      })
      macro('vd', {
        from: points.bottomTip,
        to: points.topEdge,
        x: points.bottomEdge.x - sa - 30
      })
      macro('vd', {
        from: points.bottomTip,
        to: points.topTip,
        x: points.bottomEdge.x - sa - 45
      })
      macro('vd', {
        from: points.bottomTip,
        to: points.tipCenter,
        x: points.tipCenter.x + sa + 15
      })
    }
  }

  return part
}
