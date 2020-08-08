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

  // Don't bother of we're not drafting back pockets
  if (!options.backPockets) {
    part.render = false
    return part
  }

  // Clean up
  for (const path in paths) delete paths[path]
  for (const snippet in snippets) delete snippets[snippet]

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'interfacing')

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.4)
    macro('title', {
      at: points.title,
      nr: 6,
      title: 'pocketWeltInterfacing'
    })
    macro('sprinkle', {
      snippet: 'bnotch',
      on: ['pocketLeft', 'pocketRight', 'pocketBagWaistLeft', 'pocketBagWaistRight']
    })

    if (paperless) {
    }
  }

  return part
}
