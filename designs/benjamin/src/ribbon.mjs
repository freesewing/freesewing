function draftBenjaminRibbon (part) {
  let { Point, Path, measurements, store, options, complete, macro, points, paths, sa, paperless } =
    part.shorthand()

  if (options.adjustmentRibbon) {
    part.render = false
    return part
  }

  // Points
  points.bottomLeft = new Point(0, 0.5 * store.get('ribbonWidth'))
  points.topLeft = points.bottomLeft.flipY()
  points.bottomRight = points.bottomLeft.shift(
    0,
    measurements.neck * (1 + options.collarEase) - store.get('knotWidth') * 2
  )
  points.topRight = points.bottomRight.flipY()
  points.titleAnchor = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)

  // Paths
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    macro('title', {
      at: points.titleAnchor,
      nr: 2,
      title: 'ribbon',
      scale: 0.3,
    })

    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + 15 + sa,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + 15 + sa,
      })
    }
  }

  return part
}

export const ribbon = {
  name: 'benjamin.ribbon',
  draft: draftBenjaminRibbon,
}
