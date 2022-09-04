/*
 * This collar would benefit from a redesign
 * but I find collar design to be rather tricky business and
 * would love the input from someone with more pattern design
 * experience, or more tailoring exprience.
 */

export default function (part) {
  let { paperless, sa, snippets, complete, points, macro, paths, Path } = part.shorthand()

  // Clean up
  for (let i of Object.keys(paths)) delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]

  paths.seam = new Path()
    .move(points.collarCbTop)
    .curve_(points.collarCbTopCp, points.notchTip)
    .line(points.notch)
    .line(points.collarstandTip)
    ._curve(points.collarstandCbTopCp, points.collarstandCbTop)
    .line(points.collarCbTop)
    .close()
    .attr('class', 'various')

  if (complete) {
    // Title
    points.title = points.collarCbTopCp.shiftFractionTowards(points.collarstandCbTopCp, 0.5)
    macro('title', {
      at: points.title,
      nr: 6,
      title: 'underCollar',
    })

    if (sa) {
      paths.sa1 = new Path().move(points.collarstandCbTop).line(points.collarCbTop).offset(sa)
      paths.sa2 = new Path()
        .move(points.collarstandTip)
        .line(points.notch)
        .line(points.notchTip)
        .offset(-1 * sa)
      paths.sa = new Path()
        .move(points.collarstandTip)
        .line(paths.sa2.start())
        .join(paths.sa2)
        .line(points.notchTip)
        .move(points.collarstandCbTop)
        .line(paths.sa1.start())
        .line(paths.sa1.end())
        .line(points.collarCbTop)
        .attr('class', 'various sa')
      paths.sa1.render = false
      paths.sa2.render = false
    }

    if (paperless) {
      macro('hd', {
        from: points.collarstandCbTop,
        to: points.collarstandTip,
        y: points.collarstandCbTop.y - 15,
      })
      macro('hd', {
        from: points.collarstandCbTop,
        to: points.notch,
        y: points.collarstandCbTop.y - 30,
      })
      macro('hd', {
        from: points.collarCbTop,
        to: points.notchTip,
        y: points.notchTip.y + 15,
      })
      macro('vd', {
        from: points.collarCbTop,
        to: points.collarstandCbTop,
        x: points.collarCbTop.x - sa - 15,
      })
      macro('ld', {
        from: points.collarstandTip,
        to: points.notch,
        d: sa + 15,
      })
      macro('ld', {
        from: points.notchTip,
        to: points.notch,
        d: -15 - sa,
      })
      macro('vd', {
        from: points.notchTip,
        to: points.collarstandCbTop,
        x: points.notch.x + sa + 40,
      })
    }
  }

  return part
}
