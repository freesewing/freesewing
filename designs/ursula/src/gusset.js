export default function (part) {
  let { options, Point, Path, points, paths, measurements, store, complete, sa, paperless, macro } =
    part.shorthand()

  // Create points
  points.frontGussetLeft = new Point(store.get('frontGussetLeft').x, 0)
  points.backGussetLeft = new Point(
    store.get('backGussetLeft').x,
    measurements.seat * options.gussetLength
  )
  points.frontGussetRight = new Point(store.get('frontGussetRight').x, 0)
  points.backGussetRight = new Point(
    store.get('backGussetRight').x,
    measurements.seat * options.gussetLength
  )

  // Create control points
  points.gussetCp1 = points.frontGussetLeft
    .shiftFractionTowards(points.backGussetLeft, 0.5)
    .shift(180, points.frontGussetRight.x / -15)

  // Flip points to right side
  points.gussetCp2 = points.gussetCp1.flipX(store.get('frontGussetMid'))

  // Create point for title
  points.frontMidMid = points.gussetCp1.shiftFractionTowards(points.gussetCp2, 0.5)

  /* Store lengths for use in elastic */
  paths.gussetLegOpening = new Path()
    .move(points.backGussetRight)
    .curve(points.backGussetRight, points.gussetCp2, points.frontGussetRight)
    .setRender(false)
  store.set('gussetSideLength', paths.gussetLegOpening.length())

  // Draw paths
  paths.seam = new Path()
    .move(points.frontGussetLeft)
    .curve(points.gussetCp1, points.backGussetLeft, points.backGussetLeft)
    .line(points.backGussetRight)
    .curve(points.backGussetRight, points.gussetCp2, points.frontGussetRight)
    .line(points.frontGussetLeft) // Without this, doesn't generate seam allowance
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
    macro('title', {
      at: points.frontMidMid,
      nr: 3,
      title: 'gusset',
    })
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.frontGussetLeft,
      to: points.frontGussetRight,
      y: points.frontGussetLeft.y + sa + 15,
    })
    macro('hd', {
      from: points.backGussetLeft,
      to: points.backGussetRight,
      y: points.backGussetLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.frontGussetRight,
      to: points.backGussetRight,
      x: points.frontGussetRight.x + sa + 15,
    })
  }

  return part
}
