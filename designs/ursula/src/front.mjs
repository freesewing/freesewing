function ursulaFront({
  options,
  Point,
  Path,
  points,
  paths,
  measurements,
  //  Snippet,
  //  snippets,
  store,
  utils,
  complete,
  sa,
  paperless,
  macro,
  part,
}) {
  // Stretch utility method

  store.set('xScale', utils.stretchToScale(options.fabricStretch))

  // Design pattern here

  // Create points

  points.frontWaistMid = new Point(measurements.seat / 4, 0)
  points.frontWaistLeft = new Point(
    measurements.seat / 4 - (measurements.waist / 4) * store.get('xScale'),
    0
  )
  points.frontHipLeft = new Point(
    measurements.seat / 4 - (measurements.seat / 4) * store.get('xScale'),
    measurements.waistToSeat
  ) // Consider renaming from "hip" to "seat"
  points.frontGussetLeft = new Point(
    measurements.seat / 4 - (measurements.waist * options.gussetWidth * store.get('xScale')) / 1.2,
    measurements.waistToUpperLeg
  )
  points.frontGussetMid = new Point(measurements.seat / 4, measurements.waistToUpperLeg)

  /* Flip points to right side */
  points.frontGussetRight = points.frontGussetLeft.flipX(points.frontWaistMid)
  points.frontHipRight = points.frontHipLeft.flipX(points.frontWaistMid)
  points.frontWaistRight = points.frontWaistLeft.flipX(points.frontWaistMid)

  /* Waist band is based on waist at top, hip at bottom */
  points.frontWaistBandLeft = points.frontHipLeft.shiftFractionTowards(
    points.frontWaistLeft,
    options.rise
  )
  points.frontWaistBandRight = points.frontWaistBandLeft.flipX(points.frontWaistMid)
  points.frontWaistBandMid = points.frontWaistBandLeft
    .shiftFractionTowards(points.frontWaistBandRight, 0.5)
    .shift(270, measurements.waistToUpperLeg * options.frontDip) /* Waist band dip */

  /* Leg opening is based on waist band and hip */
  //  points.frontLegOpeningLeft = points.frontHipLeft.shiftFractionTowards(points.frontWaistBandLeft, options.legOpening) // Waist band side point
  //  points.frontLegOpeningRight = points.frontLegOpeningLeft.flipX(points.frontWaistMid) // Waist band side point

  ///////////// Replace the point it's shifting towards with a beamsIntersect() of the
  ///////////// side (frontWaistLeft and frontHipLeft) and the lowest point of the waistband (backWaistBandMid
  ///////////// and backWaistBandLeftCp1 should work)
  ///////////// or maybe beamIntersectsY() of backWaistBandMid.y  ??

  points.frontLegOpeningLeft = points.frontHipLeft.shiftFractionTowards(
    points.frontWaistBandLeft,
    options.legOpening
  ) // Waist band low point
  points.frontLegOpeningRight = points.frontLegOpeningLeft.flipX(points.frontWaistMid) // Waist band low point

  /* Middle point for label */
  points.frontMidMid = points.frontLegOpeningLeft.shiftFractionTowards(
    points.frontLegOpeningRight,
    0.5
  )

  // Create control points

  /* Control points for leg opening curves */
  points.frontLegOpeningLeftCp1 = points.frontLegOpeningLeft.shift(
    180,
    points.frontGussetLeft.dy(points.frontLegOpeningLeft) / 3
  )
  points.frontGussetLeftCp1 = points.frontGussetLeft
    //    .shift(270, points.frontGussetLeft.dy(points.frontHipLeft) * 4 * options.taperToGusset); // Consider changing this so it's relative
    .shift(270, points.frontGussetLeft.dy(points.frontWaistBandMid) * options.taperToGusset)

  /* Control point for waistband dip */
  points.frontWaistBandLeftCp1 = new Point(
    points.frontWaistBandRight.x / 3,
    points.frontWaistBandMid.y
  )

  /* Flip control points to right side */
  points.frontGussetRightCp1 = points.frontGussetLeftCp1.flipX(points.frontWaistMid)
  points.frontLegOpeningRightCp1 = points.frontLegOpeningLeftCp1.flipX(points.frontWaistMid)
  points.frontWaistBandRightCp1 = points.frontWaistBandLeftCp1.flipX(points.frontWaistMid)

  // Draw paths

  paths.seam = new Path()
    .move(points.frontWaistBandMid)
    .curve(points.frontWaistBandLeftCp1, points.frontWaistBandLeft, points.frontWaistBandLeft) // Waist band dip
    .line(points.frontLegOpeningLeft)
    .curve(points.frontLegOpeningLeftCp1, points.frontGussetLeftCp1, points.frontGussetLeft)
    .line(points.frontGussetMid)
    .line(points.frontGussetRight)
    .curve(points.frontGussetRightCp1, points.frontLegOpeningRightCp1, points.frontLegOpeningRight)
    .line(points.frontWaistBandRight)
    .curve(points.frontWaistBandRight, points.frontWaistBandRightCp1, points.frontWaistBandMid) // Waist band dip
    .close()
    .attr('class', 'fabric')

  // Store points for use in other parts

  /* Store side seam points for use in back */

  store.set('sideSeamWaist', points.frontWaistBandLeft)
  store.set('sideSeamHip', points.frontLegOpeningLeft)

  /* Store gusset points for use in gusset */

  store.set('frontGussetLeft', points.frontGussetLeft)
  store.set('frontGussetRight', points.frontGussetRight)
  store.set('frontGussetMid', points.frontGussetMid)

  /* Store lengths for use in elastic */

  paths.frontLegOpening = new Path()
    .move(points.frontGussetRight)
    .curve(points.frontGussetRightCp1, points.frontLegOpeningRightCp1, points.frontLegOpeningRight)
    .hide()
  store.set('frontLegOpeningLength', paths.frontLegOpening.length())

  paths.frontWaistBand = new Path()
    .move(points.frontWaistBandRight)
    .curve(points.frontWaistBandRightCp1, points.frontWaistBandLeftCp1, points.frontWaistBandLeft)
    .hide()
  store.set('frontWaistBandLength', paths.frontWaistBand.length())

  // Complete?
  if (complete) {
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  macro('title', {
    at: points.frontMidMid,
    nr: 1,
    title: 'front',
  })

  macro('grainline', {
    from: points.frontGussetMid,
    to: points.frontGussetMid.shiftFractionTowards(points.frontWaistBandMid, 0.5),
  })

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.frontWaistBandRight,
      to: points.frontWaistBandLeft,
      y: points.frontWaistBandRight.y + sa - 15,
    })
    macro('hd', {
      from: points.frontLegOpeningRight,
      to: points.frontLegOpeningLeft,
      y: points.frontLegOpeningRight.y + sa - 15,
    })
    macro('hd', {
      from: points.frontGussetLeft,
      to: points.frontGussetRight,
      y: points.frontGussetLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.frontWaistBandMid,
      to: points.frontGussetMid,
      x: points.frontWaistBandMid.x + sa + 15,
    })
    macro('ld', {
      from: points.frontWaistBandLeft,
      to: points.frontLegOpeningLeft,
      d: points.frontWaistBandLeft.y + sa - 15,
    })
    macro('pd', {
      path: new Path()
        .move(points.frontGussetRight)
        .curve(
          points.frontGussetRightCp1,
          points.frontLegOpeningRightCp1,
          points.frontLegOpeningRight
        ),
      d: 15,
    })
    /*    macro('vd', {
      from: points.frontWaistBandLeft,
      to: points.frontWaistBandMid,
      x: points.frontWaistBandMid.x + sa + 15,
    }) */
  }

  return part
}

export const front = {
  name: 'ursula.front',
  measurements: ['waist', 'seat', 'waistToSeat', 'waistToUpperLeg'], // Potentially useful: 'hips', 'waistToHips'
  options: {
    gussetWidth: { pct: 7.2, min: 4, max: 12, menu: 'fit' }, // Gusset width in relation to seat
    fabricStretch: { pct: 15, min: 5, max: 25, menu: 'fit' },
    rise: { pct: 46, min: 30, max: 100, menu: 'style' },
    legOpening: { pct: 54, min: 5, max: 85, menu: 'style' },
    frontDip: { pct: 5.0, min: -5, max: 15, menu: 'style' },
    taperToGusset: { pct: 70, min: 5, max: 100, menu: 'style' },
  },
  draft: ursulaFront,
}
