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
    'pocketbagTopLeft',
    'mirroredPocketOpeningTopIn',
    'mirroredPocketOpeningBottomIn',
    'pocketbagBump',
    'pocketbagBottomCp',
    'pocketbagBottom',
    'pocketbagBottomRight'
  ])
    points[id] = points[id].rotate(-1 * (slant - 90), points.pocketbagTopRight)
  console.log(slant)

  paths.saBase = new Path()
    .move(points.pocketbagTopRight)
    .line(points.pocketbagTopLeft)
    .line(points.mirroredPocketOpeningBottomIn)
    .curve(points.pocketbagBump, points.pocketbagBottomCp, points.pocketbagBottom)
    .line(points.pocketbagBottomRight)
  paths.seam = paths.saBase
    .clone()
    .line(points.pocketbagTopRight)
    .close()
    .attr('class', 'lining', true)

  if (complete) {
    points.titleAnchor = points.pocketbagTopRight.shiftFractionTowards(
      points.pocketbagBottomCp,
      0.5
    )
    macro('title', {
      at: points.titleAnchor,
      nr: 4,
      title: 'pocketBag'
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
        .attr('class', 'lining sa')
    }

    if (paperless) {
    }
  }

  return part
}
