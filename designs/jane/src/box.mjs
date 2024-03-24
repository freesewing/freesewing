function draftBox({ options, Point, Path, points, paths, Snippet, snippets, sa, macro, part }) {
  const w = 500 * options.size
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(w, 0)
  points.bottomLeft = new Point(0, w / 2)
  points.bottomRight = new Point(w, w / 2)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  snippets.logo = new Snippet('logo', points.logo)
  points.text = points.logo.shift(-90, w / 8).addText('hello', 'center')

  if (sa) {
    paths.sa = paths.seam.offset(sa).addClass('fabric sa')
  }

  macro('hd', {
    id: 'hWidth',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + sa + 15,
  })
  macro('vd', {
    id: 'vHeight',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })

  return part
}

export const box = {
  name: 'box',
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  draft: draftBox,
}
