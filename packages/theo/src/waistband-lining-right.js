export default function (part) {
  let { Point, macro, snippets, Snippet, points, paths, Path, complete, sa, paperless } =
    part.shorthand()

  points[0] = points[0].shift(180, 80)
  points[3] = points[3].shift(180, 80)

  paths.seam = new Path()
    .move(points[0])
    .line(points[1])
    .line(points[2])
    .line(points[3])
    .line(points[0])
    .close()
    .attr('class', 'lining')

  // Complete pattern?
  if (complete) {
    if (sa) paths.sa = paths.seam.offset(-1 * sa).attr('class', 'lining sa')
    points.title = points[0].shiftFractionTowards(points[2], 0.5)
    macro('title', {
      at: points.title,
      title: 'waistbandLiningRight',
      nr: '5b',
      scale: 0.5,
      rotation: -90,
    })
    points.logo = points.title.shift(90, 70)
    snippets.logo = new Snippet('logo', points.logo)
    points.grainlineTop = new Point(points[2].x / 2, 0)
    points.grainlineBottom = new Point(points[2].x / 2, points[2].y, 0)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points[3],
      to: points[2],
      y: points[2].y + sa + 15,
    })
    macro('vd', {
      from: points[2],
      to: points[1],
      x: points[2].x + sa + 15,
    })
  }

  return part
}
