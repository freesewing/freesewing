export default (part) => {
  // Shorthand
  let {
    points,
    Point,
    paths,
    Path,
    measurements,
    options,
    complete,
    paperless,
    store,
    macro,
    utils,
    snippets,
    Snippet,
    sa
  } = part.shorthand()

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
      nr: 5,
      title: 'backPocketBagFacing'
    })
    points.grainlineTop = points.waistbandLeft.shiftFractionTowards(points.waistbandRight, 0.15)
    points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    if (paperless) {
    }
  }

  return part
}
