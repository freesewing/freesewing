export default function (part) {
  let { macro, measurements, Point, points, Path, paths, complete, sa, paperless } =
    part.shorthand()

  let width = measurements.hips * 0.16
  let height = width * 1.43

  points.topRight = new Point(width / 2, 0)
  points.topLeft = points.topRight.flipX()
  points.bottomRight = new Point(width / 2, height)
  points.bottomLeft = points.bottomRight.flipX()
  points.weltLeft = new Point(points.topLeft.x + 15, points.topLeft.y + width / 3)
  points.weltRight = new Point(points.topRight.x - 15, points.topRight.y + width / 3)

  macro('round', {
    from: points.topLeft,
    to: points.bottomRight,
    via: points.bottomLeft,
    radius: width / 12,
    prefix: 'left',
  })
  macro('round', {
    from: points.bottomLeft,
    to: points.topRight,
    via: points.bottomRight,
    radius: width / 12,
    prefix: 'right',
  })

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
  paths.welt = new Path()
    .move(points.weltLeft)
    .line(points.weltRight)
    .attr('class', 'lining dashed')

  // Complete pattern?
  if (complete) {
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')
    points.title = new Point(0, height / 2)
    macro('title', { at: points.title, title: 'backInnerPocketBag', nr: 10 })
    points.grainlineTop = new Point(width / -3, 0)
    points.grainlineBottom = new Point(width / -3, height)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['weltLeft', 'weltRight'],
    })
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.weltLeft,
      to: points.weltRight,
      y: points.weltLeft.y + 15,
    })
    macro('hd', {
      from: points.leftStart,
      to: points.rightEnd,
      y: points.leftEnd.y + sa + 15,
    })
    macro('vd', {
      from: points.rightStart,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}
