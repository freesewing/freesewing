export default function (part) {
  let { macro, points, Path, paths, complete, sa, paperless } = part.shorthand()

  // Make bag 2cm longer
  points.topRight = points.topRight.shift(90, 20)
  points.topLeft = points.topLeft.shift(90, 20)

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
    macro('title', { at: points.title, title: 'backInnerPocketBag', nr: 11 })
  }

  // Paperless?
  if (paperless) {
  }

  return part
}
