export default function(part) {
  let { options, points, paths, complete, macro, sa } = part.shorthand()

  if (options.adjustmentRibbon) {
    part.render = false
    return part
  }

  paths.seam.render = true

  if (complete) {
    if (sa) paths.sa.render = true
    macro('title', {
      at: points.titleAnchor,
      nr: 2,
      title: 'bowTie',
      scale: 0.8
    })
  }

  return part
}
