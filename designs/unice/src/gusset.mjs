import { pctBasedOn } from '@freesewing/core'
import { back } from './back.mjs'

export const gusset = {
  name: 'unice.gusset',
  measurements: ['waist', 'seat', 'waistToSeat', 'waistToUpperLeg','hips','waistToHips'],
  optionalMeasurements: ['crossSeam','crossSeamFront'],
  options: {
    gussetShift: 0.015, // fraction of seat circumference - could be an advanced option?
    gussetWidth: { pct: 7.2, min: 2, max: 12, menu: 'fit' }, // Gusset width in relation to waist-to-upperleg
    gussetLength: { pct: 12.7, min: 10, max: 16, menu: 'fit' }, // Gusset length in relation to seat
	fabricStretch: { pct: 15, min: 0, max: 100, menu: 'fit' }, // used in Ursula
    fabricStretchX: { pct: 15, min: 0, max: 100, menu: 'fit' }, // horizontal stretch (range set wide for beta testing)
    fabricStretchY: {pct: 0, min: 0, max: 100, menu: 'fit' }, // vertical stretch (range set wide for beta testing)
    rise: { pct: 60, min: 30, max: 100, menu: 'style' }, // extending rise beyond 100% would require adapting paths.sideLeft!
    legOpening: { pct: 45, min: 5, max: 85, menu: 'style' },
    frontDip: { pct: 5.0, min: -5, max: 15, menu: 'style' },
    taperToGusset: { pct: 70, min: 5, max: 100, menu: 'style' },
    // booleans
    useCrossSeam: { bool: true, menu: 'fit' },
  },
  after: back,
  draft: ({
    utils,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro,
    part,
  }) => {

  // Design pattern here
  var yScaleDoubleLayer
  yScaleDoubleLayer = (1 + store.get('yScale'))/2 // double layer of fabric stretches half as much

  // Create points
  points.frontGussetLeft = new Point(store.get('frontGussetLeft').x, 0)
  points.backGussetLeft = new Point(
    store.get('backGussetLeft').x,
    measurements.seat * options.gussetLength * yScaleDoubleLayer
  )
  points.frontGussetRight = new Point(store.get('frontGussetRight').x, 0)
  points.backGussetRight = new Point(
    store.get('backGussetRight').x,
    measurements.seat * options.gussetLength * yScaleDoubleLayer
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
    .setHidden(true)
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
  },
}
