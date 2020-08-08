export default function (part) {
  let {
    utils,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro
  } = part.shorthand()

  // Don't bother of we're not drafting front pockets
  if (!options.frontPockets) {
    part.render = false
    return part
  }

  // Clean up
  for (const path in paths) delete paths[path]
  for (const snippet in snippets) delete snippets[snippet]

  // Rotate all points around topRight, so the part is aligned vertically
  const list = ['topLeft', 'flapTopLeft', 'flapBottomLeft', 'bottomCp1', 'bottom', 'bottomRight']
  const angle = -90 - points.topRight.angle(points.bottomRight)
  for (const point in points) {
    if (list.indexOf(point) !== -1) points[point] = points[point].rotate(angle, points.topRight)
  }

  paths.pocket = new Path()
    .move(points.topLeft)
    .line(points.flapBottomLeft)
    ._curve(points.bottomCp1, points.bottom)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'lining')

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'pocketBag'
    })
    macro('cutonfold', {
      from: points.bottomRight,
      to: points.topRight,
      grainline: true
    })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['flapTopLeft', 'flapBottomLeft']
    })
  }

  return part
}
