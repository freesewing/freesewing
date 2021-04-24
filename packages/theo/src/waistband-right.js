export default function (part) {
  let { Point, points, macro, paths, complete, sa, paperless } = part.shorthand()

  paths.seam.attributes.set('class', 'fabric')

  // Complete pattern?
  if (complete) {
    if (sa) paths.sa = paths.seam.offset(-1 * sa).attr('class', 'fabric sa')
    points.title = points[0].shiftFractionTowards(points[2], 0.5)
    macro('title', {
      at: points.title,
      title: 'waistbandRight',
      nr: '4b',
      scale: 0.5,
      rotation: -90,
    })
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
