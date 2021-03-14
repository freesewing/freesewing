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
  for (let id in paths) delete paths[id]
  for (let id in snippets) delete snippets[id]

  // Straighten part
  let slant = points.pocketbagBottomRight.angle(points.pocketbagTopRight)
  for (let id of [
    'topPleat',
    'slantTop',
    'slantBottom',
    'slantTop',
    'pocketbagBottomCp2',
    'pocketbagBottom',
    'pocketbagBottomRight'
  ])
    points[id] = points[id].rotate(-1 * (slant - 90), points.pocketbagTopRight)

  // Draw in facing boundary
  points.facingTop = points.slantTop.shiftFractionTowards(points.pocketbagTopRight, 0.35)
  points.facingDirection = points.slantCurveStart.shift(0, points.slantTop.dist(points.facingTop))
  // YOLO
  points.facingBottom = new Path()
    .move(points.facingTop)
    .line(points.facingTop.shiftFractionTowards(points.facingDirection, 4))
    .intersects(
      new Path()
        .move(points.slantCurveStart)
        .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
        .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
        .line(points.pocketbagBottomRight)
    )
    .pop()

  // Paths
  paths.saBase = new Path()
    .move(points.pocketbagTopRight)
    .line(points.slantTop)
    .line(points.slantCurveStart)
    .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
    .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
    .line(points.pocketbagBottomRight)
  paths.seam = paths.saBase
    .clone()
    .line(points.pocketbagTopRight)
    .close()
    .attr('class', 'fabric', true)
  paths.facing = new Path()
    .move(points.facingTop)
    .line(points.facingBottom)
    .attr('class', 'facing dashed')

  if (complete) {
    points.titleAnchor = points.pocketbagTopRight.shiftFractionTowards(
      points.pocketbagBottomCp2,
      0.5
    )
    macro('title', {
      at: points.titleAnchor,
      nr: 6,
      title: 'frontPocketBag'
    })
    macro('cutonfold', {
      from: points.pocketbagBottomRight,
      to: points.pocketbagTopRight,
      grainline: true
    })

    if (sa) {
      paths.sa = new Path()
        .move(points.pocketbagTopRight)
        .join(paths.saBase.offset(sa))
        .line(points.pocketbagBottomRight)
        .attr('class', 'fabric sa')
    }

    if (paperless) {
    }
  }

  return part
}
