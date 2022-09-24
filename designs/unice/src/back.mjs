import { pctBasedOn } from '@freesewing/core'
import { back as ursulaBack } from '@freesewing/ursula'
import { front } from './front.mjs'

export const back = {
  name: 'unice.back',
  measurements: ['waist', 'seat', 'waistToSeat', 'waistToUpperLeg','hips','waistToHips'],
  optionalMeasurements: ['crossSeam','crossSeamFront'],
  options: {
    backToFrontLength: 1.15, // Maybe include this in advanced options?
    backToFrontWidth: 1.1, // Maybe include this in advanced options?
    gussetRatio: 0.7, // Relationship between front and back gusset widths
    backDip: { pct: 2.5, min: -5, max: 15, menu: 'style' },
    backExposure: { pct: 20, min: -30, max: 90, menu: 'style' },
  },
  after: front,
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
	log,
  }) => {

  // Design pattern here

log.info('start back')

  // Create points
  points.backWaistMid = new Point(measurements.seat / 4, 0)
  points.backWaistBandLeft = new Point(
    store.get('sideSeamWaist').x / options.backToFrontWidth,
    store.get('sideSeamWaist').y
  )
  points.backLegOpeningLeft = new Point(
    store.get('sideSeamHip').x / options.backToFrontWidth,
    store.get('sideSeamHip').y
  )

  // back height is given by (estimated) cross seam, minus front and gusset lengths
  // this does not account for vertical stretch yet
  const backHeight = store.get('crossSeam') - store.get('frontHeight') - options.gussetLength * measurements.seat

  // calculate the actual back height, using yScale above and yScaleReduced below leg opening
  const backHeightAbove = store.get('frontHeightAbove') // part above has same height front and back

  let backHeightBelow
  backHeightBelow = store.get('yScale')*(backHeight - backHeightAbove/store.get('yScaleReduced'))

  const backHeightReduced = backHeightBelow + backHeightAbove

  points.backGussetLeft = new Point(
    measurements.seat / 4 -
      ((measurements.waist * options.gussetWidth * store.get('xScale')) / options.gussetRatio) *
        options.backToFrontWidth,
    backHeightReduced
  )
  points.backGussetMid = new Point(
    measurements.seat / 4,
    backHeightReduced
  )

  points.backGussetRight = points.backGussetLeft.flipX(points.backWaistMid)
  points.backLegOpeningRight = points.backLegOpeningLeft.flipX(points.backWaistMid)
  points.backWaistBandRight = points.backWaistBandLeft.flipX(points.backWaistMid)

  points.backWaistBandMid = points.backWaistBandLeft
    .shiftFractionTowards(points.backWaistBandRight, 0.5)
    .shift(270, measurements.waistToUpperLeg * options.backDip)

  /* Middle point for label */
  points.backMidMid = points.backLegOpeningLeft.shiftFractionTowards(
    points.backLegOpeningRight,
    0.5
  )

  // Create control points

  /* Control point for waistband dip */
  points.backWaistBandLeftCp1 = points.backWaistBandMid.shift(0,points.backWaistBandMid.dx(points.backWaistBandLeft) / 3 )

  /* Flip points to right side */
  points.backWaistBandRightCp1 = points.backWaistBandLeftCp1.flipX(points.backWaistMid)

  // Shape back coverage

  /* Only have to do this on one side */
  points.backLegOpeningCorner = utils.beamsIntersect(
    points.backLegOpeningLeft,
    points.backLegOpeningLeft.shift(180, points.backGussetLeft.dy(points.backLegOpeningLeft)),
    points.backGussetLeft,
    points.backGussetLeft.shift(270, points.backGussetLeft.dy(points.backLegOpeningLeft))
  )

  if (options.backExposure >= 0) {
    /* If back exposure is high, like a thong style */
    /* This controls the hip bit */
    points.backLegOpeningLeftCp1 = points.backLegOpeningLeft.shiftFractionTowards(
      points.backLegOpeningCorner,
      options.backExposure
    )
    /* This controls the center bit */
    points.backGussetLeftCp1 = points.backGussetLeft.shiftFractionTowards(
      points.backWaistBandMid,
      options.backExposure
    )
    points.backGussetLeft = points.backGussetLeft.shiftFractionTowards(
      points.backGussetMid,
      options.backExposure
    ) // This narrows the back of the gusset
    points.backGussetRight = points.backGussetLeft.flipX(points.backWaistMid)
  } else {
    /* If back exposure is low and flares out to cover more */
    store.set('adjustedBackExposure',options.backExposure * store.get('adjustedLegOpening')) // flare depends on leg opening
    /* This controls the hip bit */
    points.backLegOpeningLeftCp1 = points.backLegOpeningLeft.shift(
      -45,store.get('adjustedBackExposure') * points.backWaistBandMid.dx(points.backWaistBandLeft))
    /* This controls the taper to gusset */
    points.backGussetLeftCp1 = points.backGussetLeft.shift(115, store.get('adjustedBackExposure') * points.backWaistBandMid.dx(points.backWaistBandLeft))

	/* center of the flare and its control points are on a line parallel to the backGussetLeft to backLegOpeningLeft line
	* first, define the points on that line */
	points.backFlare = points.backGussetLeft.shiftFractionTowards(points.backLegOpeningLeft, 0.5)
    // points.backFlareCp1 = points.backGussetLeft.shiftFractionTowards(points.backLegOpeningLeft, 0.5 - store.get('adjustedBackExposure'))
	points.backFlareCp1 = points.backGussetLeft.shiftFractionTowards(points.backLegOpeningLeft, 0.7)
	points.backFlareCp2 = points.backGussetLeft.shiftFractionTowards(points.backLegOpeningLeft, 0.3)
	/* then shift all three points outward */
    points.backFlareLeft = points.backFlare.shift(
      215,(points.backWaistBandMid.dx(points.backWaistBandLeft)) * store.get('adjustedBackExposure') * 2 )
	points.backFlareLeftCp1 = points.backFlareCp1.shift(
      215,(points.backWaistBandMid.dx(points.backWaistBandLeft)) * store.get('adjustedBackExposure') * 2 )
	points.backFlareLeftCp2 = points.backFlareCp2.shift(
      215,(points.backWaistBandMid.dx(points.backWaistBandLeft)) * store.get('adjustedBackExposure') * 2 )


    /* Flip points to the right */

    points.backFlareRight = points.backFlareLeft.flipX(points.backWaistBandMid)
    points.backFlareRightCp1 = points.backFlareLeftCp1.flipX(points.backWaistMid)
    points.backFlareRightCp2 = points.backFlareLeftCp2.flipX(points.backWaistMid)
  }

  /* Flip points to the right */

  points.backLegOpeningRightCp1 = points.backLegOpeningLeftCp1.flipX(points.backWaistMid)
  points.backGussetRightCp1 = points.backGussetLeftCp1.flipX(points.backWaistMid)

  // Draw paths

  if (options.backExposure >= 0) {
    paths.seam = new Path()
      .move(points.backWaistBandMid)
      .curve(points.backWaistBandLeftCp1, points.backWaistBandLeft, points.backWaistBandLeft) // Waist band dip
      .line(points.backLegOpeningLeft)
      .curve(points.backLegOpeningLeftCp1, points.backGussetLeftCp1, points.backGussetLeft)
      .line(points.backGussetMid)
      .line(points.backGussetRight)
      .curve(points.backGussetRightCp1, points.backLegOpeningRightCp1, points.backLegOpeningRight)
      .line(points.backWaistBandRight)
      .curve(points.backWaistBandRight, points.backWaistBandRightCp1, points.backWaistBandMid) // Waist band dip
      .close()
      .attr('class', 'fabric')
  } else {
    paths.seam = new Path()
      .move(points.backWaistBandMid)
      .curve(points.backWaistBandLeftCp1, points.backWaistBandLeft, points.backWaistBandLeft) // Waist band dip
      .line(points.backLegOpeningLeft)
      .curve(points.backLegOpeningLeftCp1, points.backFlareLeftCp1, points.backFlareLeft)
      .curve(points.backFlareLeftCp2, points.backGussetLeftCp1, points.backGussetLeft)
      .line(points.backGussetMid)
      .line(points.backGussetRight)
      .curve(points.backGussetRightCp1, points.backFlareRightCp2, points.backFlareRight)
      .curve(points.backFlareRightCp1, points.backLegOpeningRightCp1, points.backLegOpeningRight)
      .line(points.backWaistBandRight)
      .curve(points.backWaistBandRight, points.backWaistBandRightCp1, points.backWaistBandMid) // Waist band dip
      .close()
      .attr('class', 'fabric')
  }

  // Store points for use in other parts

  /* Store gusset points for use in gusset */

  store.set('backGussetLeft', points.backGussetLeft)
  store.set('backGussetRight', points.backGussetRight)

  /* Store lengths for use in elastic */

  paths.backLegOpening = (options.backExposure >= 0)         
  ? new Path()
        .move(points.backGussetRight)
        .curve(points.backGussetRightCp1, points.backLegOpeningRightCp1, points.backLegOpeningRight)
        .setHidden(true)
  : new Path()
        .move(points.backGussetRight)
        .curve(points.backGussetRightCp1, points.backFlareRightCp2, points.backFlareRight)
        .curve(points.backFlareRightCp1, points.backLegOpeningRightCp1, points.backLegOpeningRight)
        .setHidden(true)
  store.set('backLegOpeningLength',paths.backLegOpening.length())

  paths.backWaistBand = new Path()
      .move(points.backWaistBandRight)
      .curve(points.backWaistBandRightCp1, points.backWaistBandLeftCp1, points.backWaistBandLeft)
      .setHidden(true)
  store.set('backWaistBandLength',paths.backWaistBand.length())

  // Complete?
  if (complete) {
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  macro('title', {
    at: points.backMidMid,
    nr: 2,
    title: 'back',
  })

  macro('grainline', {
    from: points.backGussetMid,
    to: points.backGussetMid.shiftFractionTowards(points.backWaistBandMid, 0.4),
  })

  points.scaleboxAnchor = points.scalebox = points.backMidMid.shift(90, -50)
  macro('miniscale', { at: points.scalebox })

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.backWaistBandRight,
      to: points.backWaistBandLeft,
      y: points.backWaistBandRight.y + sa - 15,
    })
    macro('hd', {
      from: points.backLegOpeningRight,
      to: points.backLegOpeningLeft,
      y: points.backLegOpeningRight.y + sa - 15,
    })
    macro('hd', {
      from: points.backGussetLeft,
      to: points.backGussetRight,
      y: points.backGussetLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.backWaistBandMid,
      to: points.backGussetMid,
      x: points.backWaistBandMid.x + sa + 15,
    })
    if (options.backExposure >= 0) {
      macro('pd', {
        path: new Path()
          .move(points.backGussetRight)
          .curve(
            points.backGussetRightCp1,
            points.backLegOpeningRightCp1,
            points.backLegOpeningRight
          ),
        d: 15,
      })
    } else {
      macro('pd', {
        path: new Path()
          .move(points.backGussetRight)
          .curve(points.backGussetRightCp1, points.backFlareRightCp2, points.backFlareRight)
          .curve(
            points.backFlareRightCp1,
            points.backLegOpeningRightCp1,
            points.backLegOpeningRight
          ),
        d: 15,
      })
    }
  }

    return part
  },
}
