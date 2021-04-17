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

  // Paths
  paths.saBase = new Path()
    .move(points.pocketbagTopRight)
    .line(points.pocketFacingTop)
    .line(points.pocketFacingBottom)
    .join(
      new Path()
        .move(points.slantCurveStart)
        .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
        .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
        .line(points.pocketbagBottomRight)
        .split(points.pocketFacingBottom)
        .pop()
    )
  paths.seam = paths.saBase
    .clone()
    .line(points.pocketbagTopRight)
    .close()
    .attr('class', 'lining', true)

  if (complete) {
    points.titleAnchor = points.pocketbagTopRight.shiftFractionTowards(
      points.pocketbagBottomCp2,
      0.5
    )
    macro('title', {
      at: points.titleAnchor,
      nr: 7,
      title: 'frontPocketBag'
    })
    macro('cutonfold', {
      from: points.pocketbagBottomRight,
      to: points.pocketbagTopRight,
      grainline: true
    })
    snippets.notch = new Snippet('notch', points.facingDirection)

    if (sa) {
      paths.sa = new Path()
        .move(points.pocketbagTopRight)
        .join(paths.saBase.offset(sa))
        .line(points.pocketbagBottomRight)
        .attr('class', 'lining sa')
    }

    if (paperless) {
    }
  }

  return part
}
