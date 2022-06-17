export default function (part) {
  let { sa, points, Path, paths, snippets, options, complete, paperless, macro } = part.shorthand()

  // Don't bother of we're not drafting back pockets
  if (!options.backPockets) {
    part.render = false
    return part
  }

  // Clean up
  for (const path in paths) delete paths[path]
  for (const snippet in snippets) delete snippets[snippet]

  // Rotate all points around topRight, so the part is aligned vertically
  const list = [
    'pocketBagWaistLeft',
    'pocketBagWaistRight',
    'pocketBagBottomLeft',
    'pocketBagBottomRight',
    'pocketLeft',
    'pocketRight',
  ]
  const angle = -1 * points.pocketLeft.angle(points.pocketRight)
  for (const point in points) {
    if (list.indexOf(point) !== -1)
      points[point] = points[point].rotate(angle, points.pocketBagWaistLeft)
  }

  paths.seam = new Path()
    .move(points.pocketBagWaistLeft)
    .line(points.pocketBagBottomLeft)
    .line(points.pocketBagBottomRight)
    .line(points.pocketBagWaistRight)
    .line(points.pocketBagWaistLeft)
    .close()
    .attr('class', 'lining')

  if (complete) {
    points.title = points.pocketLeft.shiftFractionTowards(points.pocketBagBottomRight, 0.4)
    macro('title', {
      at: points.title,
      nr: 6,
      title: 'backPocketBag',
    })
    macro('cutonfold', {
      to: points.pocketBagBottomRight,
      from: points.pocketBagBottomLeft,
    })
    macro('grainline', {
      from: points.pocketBagBottomLeft.shift(0, 15),
      to: points.pocketBagWaistLeft.shift(0, 15),
    })
    macro('scalebox', false)
    paths.cut = new Path()
      .move(points.pocketLeft)
      .line(points.pocketRight)
      .attr('class', 'lining lashed')
    macro('sprinkle', {
      snippet: 'bnotch',
      on: ['pocketLeft', 'pocketRight', 'pocketBagWaistLeft', 'pocketBagWaistRight'],
    })

    if (sa) {
      paths.sa = new Path()
        .move(points.pocketBagBottomRight)
        .line(points.pocketBagWaistRight)
        .line(points.pocketBagWaistLeft)
        .line(points.pocketBagBottomLeft)
        .offset(sa)
      paths.sa = new Path()
        .move(points.pocketBagBottomRight)
        .join(paths.sa)
        .line(points.pocketBagBottomLeft)
        .attr('class', 'lining sa')
    }
  }

  if (paperless) {
    macro('hd', {
      from: points.pocketBagBottomLeft,
      to: points.pocketBagBottomRight,
      y: points.pocketBagBottomLeft.y + 15 + sa,
    })
    macro('hd', {
      from: points.pocketLeft,
      to: points.pocketRight,
      y: points.pocketLeft.y + 15 + sa,
    })
    macro('vd', {
      from: points.pocketRight,
      to: points.pocketBagWaistRight,
      x: points.pocketBagBottomRight.x + 15 + sa,
    })
    macro('vd', {
      from: points.pocketBagBottomRight,
      to: points.pocketBagWaistRight,
      x: points.pocketBagBottomRight.x + 30 + sa,
    })
  }

  return part
}
