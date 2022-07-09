export default (part) => {
  let { points, paths, Path, options, macro, snippets, Snippet, complete, sa } = part.shorthand()

  // Cleanup from Brian
  for (let i of Object.keys(paths)) delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]

  // Seam line
  paths.seam = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.flbTop)
    .curve(points.flbCpTop, points.flbCp, points.dartTop)
    ._curve(points.dartWaistRightCpTop, points.dartWaistRight)
    .curve(points.dartWaistRightCpBottom, points.dartHipRightCpTop, points.dartHipRight)
    .line(points.dartEnd)
  if (options.hemStyle === 'classic') {
    paths.seam.curve(points.splitDartHemRightCp2, points.splitHemCp1, points.hem)
  } else paths.seam.line(points.hem)
  paths.seam.close()

  if (complete) {
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    points.title = points.armhole.shiftFractionTowards(points.dartTop, 0.5)
    macro('title', {
      nr: 4,
      at: points.title,
      title: 'frontLining',
    })
    points.logo = points.dartWaistRight.shiftFractionTowards(points.waist, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
  }

  return part
}
