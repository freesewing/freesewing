export default function (part) {
  let { paperless, sa, complete, points, macro, paths, Path, snippets, Snippet } = part.shorthand()

  // Clean up
  for (let i of Object.keys(paths)) {
    if (i !== 'side') delete paths[i]
  }

  paths.seam = paths.side.clone().line(points.foldTop).attr('class', 'fabric')
  paths.seam.render = true

  if (complete) {
    points.title = points.innerGuide.shiftFractionTowards(points.outerGuide, 0.5)
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'side'
    })
    points.logo = points.tipCp2.shiftFractionTowards(points.outerTopCp1, 0.5)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.75)
    macro('cutonfold', {
      from: points.foldBottom,
      to: points.foldTop,
      offset: 15,
      grainline: true
    })

    if (sa) {
      paths.sa = new Path()
        .move(points.foldTop)
        .line(points.foldTop.shift(180, sa))
        .join(paths.side.offset(sa))
        .line(points.foldBottom)
        .attr('class', 'fabric sa')
    }

    if (paperless) {
      macro('vd', {
        from: points.tip,
        to: points.foldBottom,
        x: points.tip.x + sa + 15
      })
      macro('vd', {
        from: points.outerTop,
        to: points.foldBottom,
        x: points.tip.x + sa + 30
      })
      macro('hd', {
        from: points.foldTop,
        to: points.foldBottom,
        y: points.foldTop.y - 15
      })
      macro('hd', {
        from: points.foldTop,
        to: points.outerTop,
        y: points.outerTop.y + sa + 15
      })
      macro('hd', {
        from: points.foldTop,
        to: points.tip,
        y: points.outerTop.y + sa + 30
      })
    }
  }

  return part
}
