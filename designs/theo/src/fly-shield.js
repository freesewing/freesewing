export default function (part) {
  let { macro, points, Path, paths, complete, sa, paperless } = part.shorthand()

  // Add points to make shift not impact curves
  points.leftTop = points[-100101].shift(180, 20)
  points.new43 = points[43].shift(180, 20)

  // New path
  paths.seam = new Path()
    .move(points.leftTop)
    .join(paths.waist)
    .line(points[41])
    .curve(points[45], points[44], points[43])
    .line(points.new43)
    .join(paths.fly.translate(-20, 0))
    .line(points.leftTop)
    .close()
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    if (sa) paths.sa = paths.seam.offset(sa * -1).attr('class', 'fabric sa')
    macro('title', {
      at: points.title,
      title: 'flyShield',
      nr: 7,
      scale: 0.7,
    })
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.leftTop,
      to: points.splitWaist,
      y: points.splitWaist.y - sa - 15,
    })
    macro('hd', {
      from: points.new43,
      to: points.splitWaist,
      y: points.splitWaist.y - sa - 30,
    })
    macro('vd', {
      from: points.new43,
      to: points.splitWaist,
      x: points.splitWaist.x + sa + 15,
    })
  }

  return part
}
