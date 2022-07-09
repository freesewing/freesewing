export default (part) => {
  let { points, Point, paths, Path, options, macro, snippets, Snippet, complete, sa } =
    part.shorthand()

  // Cleanup from front part
  for (let i of Object.keys(paths)) delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]

  // Seam line
  paths.seam = new Path()
    .move(points.dartStart)
    .line(points.dartHipLeft)
    .curve(points.dartHipLeftCpTop, points.dartWaistLeftCpBottom, points.dartWaistLeft)
    .curve_(points.dartWaistLeftCpTop, points.dartTop)
    .curve(points.flbCp, points.flbCpTop, points.flbTop)
    .line(points.neck)
    .curve(points.neckCp2, points.closureTopCp1, points.closureTop)
  if (options.hemStyle === 'classic') {
    paths.seam
      .line(points.closureBottom)
      .line(points.hemTip)
      ._curve(points.splitDartHemLeftCp1, points.splitDartHemLeft)
  } else if (options.hemStyle === 'rounded') {
    paths.seam
      .line(points.roundStart)
      .curve(points.roundCp1, points.roundCp2, points.roundEnd)
      .line(points.dartHemLeft)
  } else {
    paths.seam.line(points.closureBottom).line(points.dartHemLeft)
  }
  paths.seam.close().attr('class', 'fabric')

  if (complete) {
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    points.title = new Point(points.dartWaistLeft.x / 2, points.waist.y)
    macro('title', {
      nr: 3,
      at: points.title,
      title: 'frontFacing',
    })
    points.logo = points.closureTop.shiftFractionTowards(points.dartWaistLeft, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
  }

  return part
}
