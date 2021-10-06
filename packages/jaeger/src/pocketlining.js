export default function (part) {
  let { paperless, sa, snippets, complete, points, options, macro, paths, Path } = part.shorthand()

  // Adapt length
  points.topLeft = points.edgeLeft.flipY(points.topLeft)
  points.topRight = points.edgeRight.flipY(points.topRight)

  // Clean up
  for (let i of Object.keys(paths)) delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]

  // Paths
  if (options.frontPocketRadius > 0) {
    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.leftStart)
      .curve(points.leftCp1, points.leftCp2, points.leftEnd)
      .line(points.rightStart)
      .curve(points.rightCp1, points.rightCp2, points.rightEnd)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'lining')
  } else {
    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'lining')
  }

  if (complete) {
    // Title
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      at: points.title,
      nr: 10,
      title: 'pocketLining',
    })

    // Grainline
    macro('grainline', {
      from: points.bottomLeft.shift(0, 10),
      to: points.topLeft.shift(0, 10),
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

    if (paperless) {
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topLeft.y - sa - 15,
      })
      let corner = points.bottomRight
      if (options.frontPocketRadius > 0) corner = points.rightStart
      macro('vd', {
        from: corner,
        to: points.topRight,
        x: points.topRight.x + sa + 15,
      })
    }
  }

  return part
}
