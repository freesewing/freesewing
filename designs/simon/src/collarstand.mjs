export default (part) => {
  const {
    measurements,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    options,
  } = part.shorthand()

  const draft = function (tweak = 1) {
    const length = measurements.neck * (1 + options.collarEase) * tweak
    const width = store.get('collarStandWidth')
    const half = length / 2
    const bend = options.collarStandBend * -1
    const curve = options.collarStandCurve - options.collarStandBend
    const hinge = 90 + (bend + curve) / 2

    // Center line
    points.center = new Point(0, 0)
    points.hinge = points.center.shift(bend, half * 0.7)
    points.rightCf = points.hinge.shift(curve, half * 0.3)

    // Give it our collar width (right side only)
    points.topMid = points.center.shift(90, width / 2)
    points.bottomMid = points.topMid.flipY()
    points.rightTopHinge = points.hinge.shift(hinge, width / 2)
    points.rightBottomHinge = points.hinge.shift(180 + hinge, width / 2)
    points.rightTopCf = points.rightCf.shift(curve + 90, width / 2)
    points.rightBottomCf = points.rightCf.shift(curve - 90, width / 2)
    points.rightBottomEdge = points.rightBottomCf.shift(
      curve,
      store.get('buttonholePlacketWidth') / 2
    )

    // Add control points (right side only)
    points.bottomMidCp2 = points.bottomMid.shift(0, half * 0.2)
    points.rightBottomHingeCp1 = points.rightBottomHinge.shift(90 + hinge, half * 0.2)
    points.rightBottomHingeCp2 = points.rightBottomHinge.shift(hinge - 90, half * 0.1)
    points.rightBottomCfCp1 = points.rightBottomCf.shift(180 + curve, half * 0.1)
    points.rightBottomEdgeCp2 = points.rightBottomCf.rotate(-90, points.rightBottomEdge)
    points.rightTopCfCp1 = points.rightTopCf.shift(curve, store.get('buttonholePlacketWidth') / 2)
    points.topMidCp1 = points.topMid.shift(0, half * 0.2)
    points.rightTopHingeCp2 = points.rightTopHinge.shift(90 + hinge, half * 0.2)
    points.rightTopHingeCp1 = points.rightTopHinge.shift(hinge - 90, half * 0.1)
    points.topEdgeCp1 = points.rightTopCf.rotate(-90, points.rightBottomEdge)
    points.rightTopCfCp2 = points.rightTopCf.shift(
      180 + curve,
      store.get('buttonholePlacketWidth') / 2
    )

    // Now do the left side
    points.leftCf = points.rightCf.flipX()
    points.topMidCp2 = points.topMidCp1.flipX()
    points.leftTopHingeCp1 = points.rightTopHingeCp2.flipX()
    points.leftTopHinge = points.rightTopHinge.flipX()
    points.leftTopHingeCp2 = points.rightTopHingeCp1.flipX()
    points.leftTopCfCp1 = points.rightTopCfCp2.flipX()
    points.leftTopCf = points.rightTopCf.flipX()
    points.leftBottomCf = points.rightBottomCf.flipX()
    points.leftBottomEdge = points.leftBottomCf.shift(
      bend + 180,
      store.get('buttonPlacketWidth') / 2
    )
    points.leftTopCfCp2 = points.leftTopCf.shift(bend + 180, store.get('buttonPlacketWidth') / 2)
    points.leftBottomEdgeCp1 = points.leftBottomCf.rotate(90, points.leftBottomEdge)
    points.leftBottomCfCp2 = points.rightBottomCfCp1.flipX()
    points.leftBottomHingeCp1 = points.rightBottomHingeCp2.flipX()
    points.leftBottomHinge = points.rightBottomHinge.flipX()
    points.leftBottomHingeCp2 = points.rightBottomHingeCp1.flipX()
    points.bottomMidCp1 = points.bottomMidCp2.flipX()

    let len = new Path()
      .move(points.leftBottomCf)
      .curve(points.leftBottomCfCp2, points.leftBottomHingeCp1, points.leftBottomHinge)
      .curve(points.leftBottomHingeCp2, points.bottomMidCp1, points.bottomMid)
      .length()

    return len * 2 - measurements.neck * (1 + options.collarEase)
  }

  let delta, tweak, run
  tweak = 1
  run = 1
  do {
    delta = draft(tweak)
    tweak = tweak * (1 - delta / 1000)
    run++
  } while (Math.abs(delta) > 1 && run < 20)

  paths.seam = new Path()
    .move(points.bottomMid)
    .curve(points.bottomMidCp2, points.rightBottomHingeCp1, points.rightBottomHinge)
    .curve(points.rightBottomHingeCp2, points.rightBottomCfCp1, points.rightBottomCf)
    .line(points.rightBottomEdge)
    .curve(points.rightBottomEdgeCp2, points.rightTopCfCp1, points.rightTopCf)
    .curve(points.rightTopCfCp2, points.rightTopHingeCp1, points.rightTopHinge)
    .curve(points.rightTopHingeCp2, points.topMidCp1, points.topMid)
    .curve(points.topMidCp2, points.leftTopHingeCp1, points.leftTopHinge)
    .curve(points.leftTopHingeCp2, points.leftTopCfCp1, points.leftTopCf)
    .curve(points.leftTopCfCp2, points.leftBottomEdgeCp1, points.leftBottomEdge)
    .line(points.leftBottomCf)
    .curve(points.leftBottomCfCp2, points.leftBottomHingeCp1, points.leftBottomHinge)
    .curve(points.leftBottomHingeCp2, points.bottomMidCp1, points.bottomMid)
    .close()
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    // Helplines
    paths.help = new Path()
      .move(points.rightTopCf)
      .line(points.rightBottomCf)
      .move(points.topMid)
      .line(points.bottomMid)
      .move(points.leftTopCf)
      .line(points.leftBottomCf)
      .attr('class', 'dotted')

    // Grainline
    macro('grainline', {
      from: points.leftCf,
      to: points.rightCf,
    })

    // Title
    points.title = points.center.shift(0, 20)
    macro('title', {
      at: points.title,
      nr: 6,
      title: 'collarStand',
      scale: 0.6,
    })

    // Notches
    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'rightTopCf',
        'rightBottomCf',
        'leftBottomCf',
        'leftTopCf',
        'rightBottomEdge',
        'leftBottomEdge',
      ],
    })

    // Button and buttonhole
    snippets.button = new Snippet('button', points.leftCf)
    const angle = options.collarStandCurve - options.collarStandBend - 180
    points.buttonhole = points.rightCf.shift(angle, 3)
    snippets.buttonhole = new Snippet('buttonhole', points.buttonhole).attr(
      'data-rotate',
      90 - angle
    )

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topMid,
      to: points.rightTopCf,
      y: points.topMid.y - 15 - sa,
    })
    macro('hd', {
      from: points.leftTopCf,
      to: points.topMid,
      y: points.topMid.y - 15 - sa,
    })
    macro('hd', {
      from: points.topMid,
      to: points.rightBottomEdge,
      y: points.topMid.y - 30 - sa,
    })
    macro('hd', {
      from: points.leftBottomEdge,
      to: points.topMid,
      y: points.topMid.y - 30 - sa,
    })
    macro('pd', {
      path: new Path()
        .move(points.leftBottomCf)
        .curve(points.leftBottomCfCp2, points.leftBottomHingeCp1, points.leftBottomHinge)
        .curve(points.leftBottomHingeCp2, points.bottomMidCp1, points.bottomMid)
        .curve(points.bottomMidCp2, points.rightBottomHingeCp1, points.rightBottomHinge)
        .curve(points.rightBottomHingeCp2, points.rightBottomCfCp1, points.rightBottomCf),
      d: 15 + sa,
    })
    macro('ld', {
      from: points.leftBottomEdge,
      to: points.leftBottomCf,
      d: -30 - sa,
    })
    macro('ld', {
      from: points.rightBottomCf,
      to: points.rightBottomEdge,
      d: -30 - sa,
    })
    macro('ld', {
      from: points.rightBottomCf,
      to: points.rightTopCf,
      d: -15 - sa - store.get('buttonholePlacketWidth') / 2,
    })
    macro('vd', {
      from: points.rightBottomCf,
      to: points.topMid,
      x: points.rightBottomEdge.x + 30 + sa,
    })
  }

  return part
}
