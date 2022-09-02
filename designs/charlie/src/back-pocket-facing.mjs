export default (part) => {
  // Shorthand
  let { points, Point, paths, Path, complete, paperless, macro, snippets, sa } = part.shorthand()

  // Clean up
  delete paths.fold
  delete snippets.logo

  points.bottomLeft = points.curveStartLeft.shift(-90, points.rightNotch.x / 1.75)
  points.bottomRight = points.bottomLeft.flipX()

  paths.saBase = new Path()
    .move(points.bottomRight)
    .line(points.curveStartRight)
    .curve_(points.cpRight, points.waistbandRight)
    .line(points.waistbandLeft)
    ._curve(points.cpLeft, points.curveStartLeft)
    .line(points.bottomLeft)
    .setRender(false)
  paths.seam = paths.saBase.clone().close().setRender(true).attr('class', 'fabric')

  if (complete) {
    paths.opening = new Path()
      .move(points.leftNotch)
      .line(points.rightNotch)
      .attr('class', 'dashed')
    points.titleAnchor = points.rightNotch.shiftFractionTowards(points.leftNotch, 0.5)
    macro('title', {
      at: points.titleAnchor,
      nr: 6,
      title: 'backPocketBagFacing',
    })
    points.grainlineTop = points.waistbandLeft.shiftFractionTowards(points.waistbandRight, 0.15)
    points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    if (paperless) {
      macro('rmad')
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + 15,
      })
      macro('hd', {
        from: points.waistbandLeft,
        to: points.waistbandRight,
        y: points.waistbandLeft.y - sa - 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.rightNotch,
        x: points.bottomRight.x + sa + 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.waistbandRight,
        x: points.bottomRight.x + sa + 30,
      })
    }
  }

  return part
}
