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

  points.leftNotch = new Point(store.get('backPocketWidth') / -2, 0)
  points.rightNotch = points.leftNotch.flipX()
  points.topLeft = new Point(points.leftNotch.x * 1.2, store.get('backPocketToWaistband') * -1)
  points.topRight = points.topLeft.flipX()
  points.bottomLeft = new Point(points.leftNotch.x * 1.2, points.rightNotch.x * 0.6)
  points.bottomRight = points.bottomLeft.flipX()

  paths.saBase = new Path()
    .move(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .setRender(false)
  paths.seam = paths.saBase
    .clone()
    .line(points.bottomRight)
    .close()
    .setRender(true)
    .attr('class', 'fabric')

  if (complete) {
    paths.opening = new Path()
      .move(points.leftNotch)
      .line(points.rightNotch)
      .attr('class', 'dashed')
    points.titleAnchor = new Point(0, 0)
    macro('title', {
      at: points.titleAnchor,
      nr: '5b',
      title: 'pocketFacing'
    })
    points.grainlineTop = points.topLeft.shiftFractionTowards(points.topRight, 0.15)
    points.grainlineBottom = points.bottomLeft.shiftFractionTowards(points.bottomRight, 0.15)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom
    })

    if (sa) {
      let saBase = paths.saBase.offset(sa)
      paths.sa = new Path()
        .move(points.bottomRight)
        .line(saBase.start())
        .join(saBase)
        .line(points.bottomLeft)
        .attr('class', 'sa fabric')
    }

    if (paperless) {
    }
  }

  return part
}
