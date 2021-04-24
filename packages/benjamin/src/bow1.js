export default function (part) {
  let { Point, points, Path, paths, complete, macro, sa, store, paperless } = part.shorthand()

  points.bandBottomLeft = points.bandBottomLeft.shift(0, 0)
  points.bandTopLeft = points.bandBottomLeft.flipY()

  points.grainlineStart = new Point(0, 0)

  macro('grainline', {
    from: points.grainlineStart,
    to: points.tip.shift(180, 20),
  })

  paths.seam = new Path()
    .move(points.bandTopLeft)
    .line(points.bandBottomLeft)
    .join(paths.bow)
    .line(points.bandTopLeft)
    .close()
    .attr('class', 'fabric')
    .setRender(true)

  if (complete) {
    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.bandBottomLeft,
        to: points.tip2Bottom,
        y: store.get('baseY'),
      })
    }
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa').setRender(true)
    }
    macro('title', {
      at: points.titleAnchor,
      nr: 1,
      title: 'bowTie',
      scale: store.get('tipWidth') / 75,
    })
    points.scaleboxAnchor = points.bandTopLeft.shift(30, 80)
    macro('scalebox', { at: points.scaleboxAnchor })
  }

  return part
}
