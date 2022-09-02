export default (part) => {
  // Shorthand
  let { points, Point, paths, Path, complete, macro, snippets, sa } = part.shorthand()

  // Clean up
  for (let id in paths) delete paths[id]
  for (let id in snippets) delete snippets[id]

  // Anchor for sampling/grid
  points.anchor = points.pocketFacingTop.clone()

  paths.seam = new Path()
    .move(points.pocketFacingTop)
    .line(points.slantTop)
    .line(points.slantCurveStart)
    .join(
      new Path()
        .move(points.slantCurveStart)
        .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
        .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
        .split(points.pocketFacingBottom)
        .shift()
    )
    .line(points.pocketFacingTop)
    .close()
    .attr('class', 'fabric', true)

  if (complete) {
    points.titleAnchor = points.slantBottomNotch.shift(0, 10)
    macro('title', {
      at: points.titleAnchor,
      nr: 8,
      title: 'frontPocketBagFacing',
    })
    macro('grainline', {
      from: points.slantTop,
      to: new Point(points.slantTop.x, points.facingDirection.y),
    })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['facingDirection', 'slantTopNotch', 'slantBottomNotch'],
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa', true)
  }

  return part
}
