export default function (part) {
  let { options, Point, Path, points, paths, measurements, store, complete, sa, paperless, macro } =
    part.shorthand()

  var yScaleDoubleLayer
  yScaleDoubleLayer = (1 + store.get('yScale'))/2 // double layer of fabric stretches half as much
  
  // console.log('store',store)
  // console.log('meas',measurements)
  // console.log('opts',options)
  
  
  let actualGussetLength
  actualGussetLength = measurements.seat * options.gussetLength * yScaleDoubleLayer

  // Create points
  points.frontGussetLeft = new Point(store.get('frontGussetLeft').x, 0)
  points.backGussetLeft = new Point(
    store.get('backGussetLeft').x,
    actualGussetLength
  )
  points.frontGussetRight = new Point(store.get('frontGussetRight').x, 0)
  points.backGussetRight = new Point(
    store.get('backGussetRight').x,
    actualGussetLength
  )
  
  let gussetWidthFront
  gussetWidthFront = points.frontGussetRight.x - points.frontGussetLeft.x
  
  let backExposureThreshold = 0.45 // where the gusset becomes triangular

  // Create control points
  if (options.backExposure > backExposureThreshold) {  
    // gusset is roughly triangular
    points.gussetCp1 = points.frontGussetLeft
      .shiftFractionTowards(points.backGussetLeft, 0.3)
      .shift(0, 0.1*gussetWidthFront/options.backExposure)
  } else {
    // ensure that gusset has a 'waist' at ~25% of the way from front to back
    console.log('length',actualGussetLength)
    console.log('width',gussetWidthFront)
    
    let horShift
      horShift = (actualGussetLength/gussetWidthFront > 1.5)
      ? 0.1*gussetWidthFront/backExposureThreshold
      : 0.1*actualGussetLength/(1.5 * backExposureThreshold)
    console.log('shift',horShift)
    points.gussetCp1 = points.frontGussetLeft
      .shift(270,0.3*actualGussetLength) // shift to same height as for high back exposure
      .shift(0, horShift)    
    points.gussetCp1 = points.gussetCp1.shiftFractionTowards(points.frontGussetLeft,(Math.max(0,options.backExposure)-backExposureThreshold))
  }

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
