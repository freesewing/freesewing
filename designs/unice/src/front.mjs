export const front = {
  name: 'unice.front',
  measurements: ['waist', 'seat', 'waistToSeat', 'waistToUpperLeg', 'hips', 'waistToHips'],
  optionalMeasurements: ['crossSeam', 'crossSeamFront'],
  options: {
    gussetShift: 0.015, // fraction of seat circumference - could be an advanced option?
    gussetWidth: { pct: 7.2, min: 2, max: 12, menu: 'fit' }, // Gusset width in relation to waist-to-upperleg
    gussetLength: { pct: 12.7, min: 10, max: 16, menu: 'fit' }, // Gusset length in relation to seat
    fabricStretchX: { pct: 15, min: 0, max: 100, menu: 'fit' }, // horizontal stretch (range set wide for beta testing)
    fabricStretchY: { pct: 0, min: 0, max: 100, menu: 'fit' }, // vertical stretch (range set wide for beta testing)
    rise: { pct: 60, min: 30, max: 100, menu: 'style' }, // extending rise beyond 100% would require adapting paths.sideLeft!
    legOpening: { pct: 45, min: 5, max: 85, menu: 'style' },
    frontDip: { pct: 5.0, min: -5, max: 15, menu: 'style' },
    frontCurve: { pct: 0, min: 0, max: 25, menu: 'style' },
    taperToGusset: { pct: 70, min: 5, max: 100, menu: 'style' },
    // booleans
    useCrossSeam: { bool: true, menu: 'fit' },
    adjustStretch: { bool: true, menu: 'fit' }, // to not stretch fabric to the limits
  },
  draft: ({
    utils,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    measurements,
    complete,
    paperless,
    macro,
    part,
    log,
    units,
  }) => {
    // Stretch utility method

    // Use stretch inputs to calculate four different scale factors: horizontal/vertical and 'regular'/'reduced', depending on direction of the tension
    // xScale: for parts that go across the body (= stretched horizontally)
    // xScaleReduced: parts that are not under (horizontal) tension, e.g. the gusset
    // yScale: for parts which are stretched vertically but not horizontally (anything below leg opening)
    // yScaleReduced: parts which are already under horizontal stretch, which limits vertical stretch

    if (options.adjustStretch) {
      // roughly 15% of stretch is reserved for comfort
      // horizontal: first, 'regular' stretch (for parts that go across the body)
      if (options.fabricStretchX < 0.3) {
        // subtract 15, but never go below 0
        store.set('xScale', utils.stretchToScale(Math.max(0, options.fabricStretchX - 0.15)))
      } else {
        store.set('xScale', utils.stretchToScale(options.fabricStretchX / 2))
        // rough approximation of rule of thumb quoted in Sanne's July 29, 2021 showcase
      }
      // use half of whatever the regular stretch is (no util available, convert from stretch to fraction manually
      store.set('xScaleReduced', (1 + store.get('xScale')) / 2)

      // vertical:
      if (options.fabricStretchY < 0.3) {
        // subtract 15, but never go below 0
        store.set('yScale', utils.stretchToScale(Math.max(0, options.fabricStretchY - 0.15)))
      } else {
        store.set('yScale', utils.stretchToScale(options.fabricStretchY / 2))
        // rough approximation of rule of thumb quoted in Sanne's July 29, 2021 showcase
      }
      // reduced vertical stretch calculated below, same as for non-adjusted case
    } else {
      // in order: regular, then reduced horizontal stretch, followed by regular vertical stretch
      store.set('xScale', utils.stretchToScale(options.fabricStretchX))
      store.set('xScaleReduced', utils.stretchToScale(options.fabricStretchX / 2))
      store.set('yScale', utils.stretchToScale(options.fabricStretchY))
    }
    if (options.fabricStretchY < 0.2) {
      store.set('yScaleReduced', 1)
    } else {
      // reduced yScale gradually increases from equivalent of stretch 0 to 5%, then cuts off (uses third-order polynomial)
      // function to approximate Sanne's guidelines given in Discord (roughly 2.5% for stretch 30-40%, 5% above that)
      store.set(
        'yScaleReduced',
        utils.stretchToScale(Math.min(0.05, 6.25 * Math.pow(options.fabricStretchY - 0.2, 3)))
      )
    }

    // // Design pattern here

    // determine height of front part: use cross seam (and cross seam front) if selected and available
    // NOTE: neither crossSeam not frontHeight are adjusted for (vertical) stretch
    if (options.useCrossSeam && measurements.crossSeam) {
      store.set('crossSeam', measurements.crossSeam)
    } else {
      // use original approximation: front and back are roughly waistToUpperLeg high, plus gusset length
      store.set(
        'crossSeam',
        measurements.waistToUpperLeg * (1 + options.backToFrontLength) +
          options.gussetLength * measurements.seat
      )
    }
    // optionally use crossSeamFront to determine relative length of front and back
    // this does not account for vertical stretch yet
    if (options.useCrossSeam && measurements.crossSeamFront) {
      // subtract half the gusset length from cross seam front, and an additional 3.5% of the seat circumference to move the gusset upward (to match commercial panties)
      store.set(
        'frontHeight',
        measurements.crossSeamFront -
          measurements.seat * (0.5 * options.gussetLength + options.gussetShift)
      )
    } else {
      // subtract gusset length, divide by roughly 2
      store.set(
        'frontHeight',
        (store.get('crossSeam') - options.gussetLength * measurements.seat) /
          (1 + options.backToFrontLength)
      )
    }

    // front curve and/or front dip
    // front curve and front dip accomplish the same goal in two different ways:
    // goal: reduce front height at the center
    // front dip: curve waist band (pattern part is smile-shaped)
    // front curve: start by curving the waist band, then straigthten the part (top of pattern part is roughly horizontal)
    // if combined: apply front curve first, then front dip

    let frontDipOrCurve1, frontDipOrCurve2
    if (options.frontCurve > 0) {
      frontDipOrCurve1 = options.frontCurve
      frontDipOrCurve2 = options.frontDip
    } else {
      frontDipOrCurve1 = options.frontDip
      frontDipOrCurve2 = 0
    }

    // Create points

    // side seam is on a line from upper leg to seat to hips (optional?) to waist
    points.frontWaistMid = new Point(measurements.seat / 4, 0)
    points.frontWaistLeft = new Point(
      measurements.seat / 4 - (measurements.waist / 4) * store.get('xScale'),
      0
    )
    points.frontSeatLeft = new Point(
      measurements.seat / 4 - (measurements.seat / 4) * store.get('xScale'),
      measurements.waistToSeat * store.get('yScaleReduced')
    )
    points.frontUpperLegLeft = new Point(
      measurements.seat / 4 - (measurements.seat / 4) * store.get('xScale'), // assume same circ. as seat
      measurements.waistToUpperLeg * store.get('yScaleReduced')
    )
    points.frontHipLeft = new Point(
      measurements.seat / 4 - (measurements.hips / 4) * store.get('xScale'),
      measurements.waistToHips * store.get('yScaleReduced')
    )

    // use these points to define an invisible path
    paths.sideLeft = new Path()
      .move(points.frontUpperLegLeft)
      .line(points.frontSeatLeft)
      .line(points.frontHipLeft)
      .line(points.frontWaistLeft)
      .setHidden(true) // only show when debugging

    /* Waist band is somewhere on the sideLeft path */
    points.frontWaistBandLeft = paths.sideLeft.shiftFractionAlong(options.rise)
    points.frontWaistBandRight = points.frontWaistBandLeft.flipX(points.frontWaistMid) // will be recalculated later if options.frontCurve is used
    points.frontWaistBandMid = points.frontWaistBandLeft
      .shiftFractionTowards(points.frontWaistBandRight, 0.5)
      .shift(
        270,
        measurements.waistToUpperLeg * frontDipOrCurve1 * store.get('yScaleReduced')
      ) /* Waist band dip (or curve)*/

    /* Leg opening is also on the sideLeft path, and cannot be higher than rise */
    /* Minimum side seam length is defined as 3.5% of the sideLeft path (which is at least waistToUpperLeg long) */
    store.set('adjustedLegOpening', Math.min(options.legOpening, options.rise - 0.035)) // TODO: account for rise having a different domain

    points.frontLegOpeningLeft = paths.sideLeft.shiftFractionAlong(store.get('adjustedLegOpening'))

    // calculate the actual front height, using yScale above and yScaleReduced below leg opening
    store.set('frontHeightAbove', points.frontWaistLeft.dy(points.frontLegOpeningLeft))
    // NOTE: if options.frontCurve > 0, this ought to be adjusted further later on

    var frontHeightBelow
    frontHeightBelow =
      store.get('yScale') *
      (store.get('frontHeight') - store.get('frontHeightAbove') / store.get('yScaleReduced'))

    var frontHeightReduced
    frontHeightReduced = frontHeightBelow + store.get('frontHeightAbove')

    // gusset width uses modified xScale (barely stretches) and depends on waistToUpperLeg - least sensitive to girth
    points.frontGussetLeft = new Point(
      measurements.seat / 4 -
        measurements.waistToUpperLeg * options.gussetWidth * store.get('xScaleReduced') * 1.9,
      frontHeightReduced
    )
    points.frontGussetMid = new Point(measurements.seat / 4, frontHeightReduced)

    // Store points for use in other parts

    /* Store side seam points for use in back */
    // NOTE: do this *before* converting the dip to a curve

    store.set('sideSeamWaist', points.frontWaistBandLeft)
    store.set('sideSeamHip', points.frontLegOpeningLeft)

    /* Store gusset points for use in gusset */

    store.set('frontGussetLeft', points.frontGussetLeft)
    store.set('frontGussetMid', points.frontGussetMid)

    // Create control points

    /* Control points for leg opening curves */
    points.frontLegOpeningLeftCp1 = points.frontLegOpeningLeft.shift(
      180,
      points.frontGussetLeft.dy(points.frontLegOpeningLeft) / 3
    )

    /* Control point above gusset moves higher as taperToGusset (= front exposure) increases, but is limited by both the leg opening (allow minimal arching only) and the rise (leg opening must not intersect the waist band) */
    points.frontGussetLeftCp1 = points.frontGussetLeft.shift(
      270,
      Math.max(
        Math.max(
          (points.frontGussetLeft.dy(points.frontWaistMid) * options.taperToGusset) / 2,
          points.frontGussetLeft.dy(points.frontLegOpeningLeft) * 2
        ),
        points.frontGussetLeft.dy(points.frontWaistBandMid)
      )
    )

    // straighten the part (if needed)
    let curveAsAngle
    if (options.frontCurve > 0) {
      // create copies of the original points
      points.frontWaistBandLeftPreCurve = points.frontWaistBandLeft.clone()
      points.frontLegOpeningLeftPreCurve = points.frontLegOpeningLeft.clone()
      points.frontLegOpeningLeftCp1PreCurve = points.frontLegOpeningLeftCp1.clone()

      // convert the dip to a curve
      curveAsAngle = points.frontWaistBandLeft.angle(points.frontWaistBandMid)
      points.frontWaistBandLeft = points.frontWaistBandLeft.rotate(
        -curveAsAngle,
        points.frontWaistBandMid
      )
      points.frontLegOpeningLeft = points.frontLegOpeningLeft.rotate(
        -curveAsAngle,
        points.frontWaistBandMid
      )
      points.frontLegOpeningLeftCp1 = points.frontLegOpeningLeftCp1.rotate(
        -curveAsAngle,
        points.frontWaistBandMid
      )

      // (ignore these two TODOs for now)
      // TODO: recalculate the front height and portions 'above' and 'below'
      // TODO: adjust the height of the 'below' part
    } else {
      curveAsAngle = 0
    }

    // recalculate frontWaistBandRight
    points.frontWaistBandRight = points.frontWaistBandLeft.flipX(points.frontWaistMid)

    // if front is both curved and dipped, apply the dip
    // frontDipOrCurve2 is zero if this isn't needed, so apply regardless of value
    points.frontWaistBandMid = points.frontWaistBandMid.shift(
      270,
      measurements.waistToUpperLeg * frontDipOrCurve2 * store.get('yScaleReduced')
    )

    // Control point for waistband dip
    points.frontWaistBandLeftCp1 = points.frontWaistBandMid.shift(
      0,
      points.frontWaistBandMid.dx(points.frontWaistBandLeft) / 3
    )

    // report the expected 'drop' in waist band from side to center (when worn)
    log.info([
      'expectedDropFromWaistToCenterFront',
      units(measurements.waistToUpperLeg * (options.frontCurve + options.frontDip)),
    ])

    // Flip points to right side
    points.frontLegOpeningRight = points.frontLegOpeningLeft.flipX(points.frontWaistMid)
    points.frontGussetRight = points.frontGussetLeft.flipX(points.frontWaistMid)
    points.frontHipRight = points.frontSeatLeft.flipX(points.frontWaistMid)
    points.frontWaistRight = points.frontWaistLeft.flipX(points.frontWaistMid)
    points.frontGussetRightCp1 = points.frontGussetLeftCp1.flipX(points.frontWaistMid)
    points.frontLegOpeningRightCp1 = points.frontLegOpeningLeftCp1.flipX(points.frontWaistMid)
    points.frontWaistBandRightCp1 = points.frontWaistBandLeftCp1.flipX(points.frontWaistMid)

    // store frontGussetRight
    store.set('frontGussetRight', points.frontGussetRight)

    // Middle point for label
    points.frontMidMid = points.frontLegOpeningLeft.shiftFractionTowards(
      points.frontLegOpeningRight,
      0.5
    )

    // Draw paths

    paths.seam = new Path()
      .move(points.frontWaistBandMid)
      .curve(points.frontWaistBandLeftCp1, points.frontWaistBandLeft, points.frontWaistBandLeft) // Waist band dip
      .line(points.frontLegOpeningLeft)
      .curve(points.frontLegOpeningLeftCp1, points.frontGussetLeftCp1, points.frontGussetLeft)
      .line(points.frontGussetMid)
      .line(points.frontGussetRight)
      .curve(
        points.frontGussetRightCp1,
        points.frontLegOpeningRightCp1,
        points.frontLegOpeningRight
      )
      .line(points.frontWaistBandRight)
      .curve(points.frontWaistBandRight, points.frontWaistBandRightCp1, points.frontWaistBandMid) // Waist band dip
      .close()
      .attr('class', 'fabric')

    /* Store lengths for use in elastic */

    paths.frontLegOpening = new Path()
      .move(points.frontGussetRight)
      .curve(
        points.frontGussetRightCp1,
        points.frontLegOpeningRightCp1,
        points.frontLegOpeningRight
      )
      .setHidden(true)
    store.set('frontLegOpeningLength', paths.frontLegOpening.length())

    paths.frontWaistBand = new Path()
      .move(points.frontWaistBandRight)
      .curve(points.frontWaistBandRightCp1, points.frontWaistBandLeftCp1, points.frontWaistBandLeft)
      .setHidden(true)
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
        from: points.frontWaistBandLeft,
        to: points.frontWaistBandRight,
        y: points.frontWaistBandRight.y + sa - 15,
      })
      macro('hd', {
        from: points.frontLegOpeningLeft,
        to: points.frontLegOpeningRight,
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
        d: sa - 15,
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
  },
}
