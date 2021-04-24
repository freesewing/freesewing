export default function (part) {
  let {
    paperless,
    sa,
    store,
    complete,
    points,
    measurements,
    options,
    macro,
    paths,
    Path,
    Snippet,
    snippets,
  } = part.shorthand()

  // Add cuff
  let length = measurements.shoulderToWrist * options.cuffLength
  let angle = points.tsWristRight.angle(points.tsWristLeft)
  points.cuffBottomRight = points.tsWristRight.shift(angle + 90, length)
  points.cuffBottomLeft = points.tsWristLeft.shift(angle + 90, length)
  macro('round', {
    to: points.tsWristRight,
    from: points.cuffBottomLeft,
    via: points.cuffBottomRight,
    radius: length / 3,
    render: true,
    prefix: 'round',
  })
  store.set('topCuffWidth', points.tsWristLeft.dist(points.tsWristRight))
  store.set('cuffLength', length)
  store.set('cuffRadius', length / 3)

  // Clean up
  for (let i in paths) delete paths[i]

  // Paths
  paths.seam = new Path()
    .move(points.tsLeftEdge)
    ._curve(points.tsElbowLeftCpTop, points.tsElbowLeft)
    .line(points.tsWristLeft)
    .line(points.cuffBottomLeft)
    .line(points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)
    .line(points.tsWristRight)
    .line(points.elbowRight)
    .curve(points.elbowRightCpTop, points.tsRightEdgeCpBottom, points.tsRightEdge)
    .curve_(points.tsRightEdgeCpTop, points.backPitchPoint)
    ._curve(points.topCpRight, points.top)
    .curve(points.topCpLeft, points.frontPitchPointCpTop, points.frontPitchPoint)
    .curve(points.frontPitchPointCpBottom, points.tsLeftEdgeCpRight, points.tsLeftEdge)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    macro('grainline', {
      from: points.boxBottom,
      to: points.top,
    })
    macro('scalebox', { at: points.tsWristLeftHelperTop })
    delete snippets.logo

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    snippets.sleeveTop = new Snippet('notch', points.top)

    if (paperless) {
      macro('ld', {
        from: points.tsWristLeft,
        to: points.tsWristRight,
        d: -15,
      })
      macro('vd', {
        from: points.tsWristLeft,
        to: points.tsElbowLeft,
        x: points.tsLeftEdge.x - sa - 15,
      })
      macro('vd', {
        from: points.tsWristLeft,
        to: points.tsLeftEdge,
        x: points.tsLeftEdge.x - sa - 30,
      })
      macro('ld', {
        from: points.cuffBottomLeft,
        to: points.tsWristLeft,
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
        to: points.tsRightEdge,
        x: points.elbowRight.x + 30 + sa,
      })
      macro('vd', {
        from: points.usWristRight,
        to: points.backPitchPoint,
        x: points.elbowRight.x + 45 + sa,
      })
      macro('vd', {
        from: points.usWristRight,
        to: points.top,
        x: points.elbowRight.x + 60 + sa,
      })
      macro('ld', {
        from: points.tsElbowLeft,
        to: points.elbowRight,
      })
      macro('ld', {
        from: points.tsLeftEdge,
        to: points.tsRightEdge,
      })
      macro('hd', {
        from: points.tsLeftEdge,
        to: points.top,
        y: points.top.y - sa - 15,
      })
      macro('hd', {
        from: points.tsLeftEdge,
        to: points.backPitchPoint,
        y: points.top.y - sa - 30,
      })
      macro('hd', {
        from: points.tsLeftEdge,
        to: points.tsRightEdge,
        y: points.top.y - sa - 45,
      })
    }
  }

  return part
}
