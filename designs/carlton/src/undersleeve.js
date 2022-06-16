export default function (part) {
  let { paperless, sa, store, complete, points, measurements, options, macro, Point, paths, Path } =
    part.shorthand()

  // Add cuff
  let length = measurements.shoulderToWrist * options.cuffLength
  let angle = points.usWristRight.angle(points.usWristLeft)
  points.cuffBottomRight = points.usWristRight.shift(angle + 90, length)
  points.cuffBottomLeft = points.usWristLeft.shift(angle + 90, length)
  macro('round', {
    to: points.usWristRight,
    from: points.cuffBottomLeft,
    via: points.cuffBottomRight,
    radius: length / 3,
    render: true,
    prefix: 'round',
  })
  store.set('underCuffWidth', points.usWristLeft.dist(points.usWristRight))

  // Clean up
  for (let i in paths) delete paths[i]

  // Paths
  paths.seam = new Path()
    .move(points.usLeftEdge)
    ._curve(points.usElbowLeftCpTop, points.usElbowLeft)
    .line(points.usWristLeft)
    .line(points.cuffBottomLeft)
    .line(points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)
    .line(points.usWristRight)
    .line(points.elbowRight)
    .curve(points.elbowRightCpTop, points.usRightEdgeCpBottom, points.usRightEdge)
    .curve_(points.usRightEdgeCpTop, points.usTip)
    .curve(points.usTipCpBottom, points.usLeftEdgeCpRight, points.usLeftEdgeRight)
    .line(points.usLeftEdge)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    macro('grainline', {
      from: points.boxBottom,
      to: new Point(points.top.x, points.usLeftEdge.y),
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('ld', {
        from: points.usWristLeft,
        to: points.usWristRight,
        d: -15,
      })
      macro('vd', {
        from: points.usWristLeft,
        to: points.usElbowLeft,
        x: points.usLeftEdge.x - sa - 15,
      })
      macro('vd', {
        from: points.usWristLeft,
        to: points.usLeftEdge,
        x: points.usLeftEdge.x - sa - 30,
      })
      macro('ld', {
        from: points.cuffBottomLeft,
        to: points.usWristLeft,
        d: 15 + sa,
      })
      macro('vd', {
        from: points.cuffBottomRight,
        to: points.usWristRight,
        x: points.usWristRight.x + 15 + sa,
      })
      macro('vd', {
        from: points.usWristRight,
        to: points.elbowRight,
        x: points.elbowRight.x + 15 + sa,
      })
      macro('vd', {
        from: points.usWristRight,
        to: points.usTip,
        x: points.elbowRight.x + 30 + sa,
      })
      macro('ld', {
        from: points.usElbowLeft,
        to: points.elbowRight,
      })
      macro('ld', {
        from: points.usLeftEdge,
        to: points.usRightEdge,
        d: -15,
      })
      macro('hd', {
        from: points.usLeftEdge,
        to: points.usTip,
        y: points.usTip.y - sa - 15,
      })
      macro('vd', {
        from: points.usLeftEdge,
        to: points.usTip,
        x: points.usLeftEdge.x - sa - 15,
      })
    }
  }

  return part
}
