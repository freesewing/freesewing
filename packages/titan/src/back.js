export default (part) => {
  /*
   * Helper method to draw the inseam path
   */
  const drawInseam = () =>
    options.fitKnee
      ? new Path()
          .move(points.fork)
          .curve(points.forkCp2, points.kneeInCp1, points.kneeIn)
          .line(points.floorIn)
      : new Path().move(points.fork).curve(points.forkCp2, points.kneeInCp1, points.floorIn)
  /*
   * Helper method to draw the outseam path
   */
  const drawOutseam = () => {
    let waistOut = points.styleWaistOut || points.waistOut
    if (options.fitKnee) {
      if (points.waistOut.x > points.seatOut.x)
        return new Path()
          .move(points.floorOut)
          .line(points.kneeOut)
          .curve(points.kneeOutCp2, points.seatOut, waistOut)
      else
        return new Path()
          .move(points.floorOut)
          .line(points.kneeOut)
          .curve(points.kneeOutCp2, points.seatOutCp1, points.seatOut)
          .curve_(points.seatOutCp2, waistOut)
    } else {
      if (points.waistOut.x > points.seatOut.x)
        return new Path().move(points.floorOut).curve(points.kneeOutCp2, points.seatOut, waistOut)
      else
        return new Path()
          .move(points.floorOut)
          .curve(points.kneeOutCp2, points.seatOutCp1, points.seatOut)
          .curve_(points.seatOutCp2, waistOut)
    }
  }
  /*
   * Helper method to draw the outline path
   */
  const drawPath = () => {
    let waistIn = points.styleWaistIn || points.waistIn
    return drawInseam()
      .line(points.floorOut)
      .join(drawOutseam())
      .line(waistIn)
      .line(points.crossSeamCurveStart)
      .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
      .close()
  }
  /*
   * Helper method to calculate the length of the cross seam
   */
  const crossSeamDelta = () =>
    new Path()
      .move(points.waistIn)
      .line(points.crossSeamCurveStart)
      .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
      .length() - measurements.crossSeamBack
  /*
   * Helper method to (re)draw the cross seam
   */
  const drawCrossSeam = () => {
    points.crossSeamCurveStart = points.waistIn.shiftFractionTowards(
      points.cbSeat,
      options.crossSeamCurveStart
    )
    points.crossSeamCurveMax = utils.beamsIntersect(
      points.waistIn,
      points.cbSeat,
      points.fork,
      points.fork.shift(0, 666)
    )
    points.crossSeamCurveCp1 = points.crossSeamCurveStart.shiftFractionTowards(
      points.crossSeamCurveMax,
      options.crossSeamCurveBend
    )
    points.crossSeamCurveCp2 = points.fork
      .shiftFractionTowards(points.crossSeamCurveMax, options.crossSeamCurveBend)
      .rotate(options.crossSeamCurveAngle, points.fork)
  }

  // Shorthand
  let {
    points,
    Point,
    paths,
    Path,
    measurements,
    options,
    complete,
    paperless,
    store,
    macro,
    utils,
    snippets,
    Snippet,
    sa,
    absoluteOptions,
  } = part.shorthand()

  // Let's get to work
  points.waistX = new Point(-1 * measurements.waistBackArc * (1 + options.waistEase), 0)
  points.upperLegY = new Point(0, measurements.waistToUpperLeg)
  points.seatX = new Point(-1 * measurements.seatBackArc * (1 + options.seatEase), 0)
  points.seatY = new Point(0, measurements.waistToSeat)
  points.seatOut = points.seatY
  points.cbSeat = new Point(points.seatX.x, points.seatY.y)

  // Determine fork location
  points.fork = new Point(
    measurements.seatBackArc * (1 + options.seatEase) * -1.25,
    points.upperLegY.y * (1 + options.crotchDrop)
  )

  // Grainline location, map out center of knee and floor
  points.grainlineTop = points.upperLegY.shiftFractionTowards(
    points.fork,
    options.grainlinePosition
  )
  points.knee = new Point(points.grainlineTop.x, measurements.waistToKnee)
  points.floor = new Point(
    points.grainlineTop.x,
    measurements.waistToFloor * (1 + options.lengthBonus)
  )
  points.grainlineBottom = points.floor

  // Figure out width at the knee
  let kneeTotal = measurements.knee * (1 + options.kneeEase)
  if (!options.fitKnee) {
    // Based the knee width on the seat, unless that ends up being less
    let altKneeTotal = measurements.seatFront
    if (altKneeTotal > kneeTotal) kneeTotal = altKneeTotal
  }
  // Store for re-use in front part
  store.set('kneeTotal', kneeTotal)
  store.set('kneeBack', kneeTotal * options.legBalance)
  store.set('kneeFront', kneeTotal * (1 - options.legBalance))
  let halfKnee = store.get('kneeBack') / 2
  points.kneeOut = points.knee.shift(0, halfKnee)
  points.kneeIn = points.kneeOut.flipX(points.knee)

  /*
   * Not shaping the ankle as that's a style choice.
   * As this is a block, just go straight down from the knee.
   */
  points.floorOut = points.floor.shift(0, halfKnee)
  points.floorIn = points.floorOut.flipX(points.floor)

  // Control points to shape the legs towards the seat
  points.kneeInCp1 = points.kneeIn.shift(90, points.fork.dy(points.knee) / 3)
  points.kneeOutCp2 = points.kneeOut.shift(90, points.fork.dy(points.knee) / 3)
  points.seatOutCp1 = points.seatOut.shift(-90, points.seatOut.dy(points.knee) / 3)
  points.seatOutCp2 = points.seatOut.shift(90, points.seatOut.y / 2)

  // Balance the waist
  if (points.cbSeat.x < points.waistX.x) {
    let delta = points.cbSeat.dx(points.waistX)
    points.waistIn = points.waistX.shift(180, delta * (1 - options.waistBalance))
  } else points.waistIn = points.waistX
  let width = points.waistX.x
  points.waistOut = points.waistIn.shift(180, width)

  // Cross seam
  drawCrossSeam()

  //Uncomment the line below to see the seam prior to fitting the cross seam
  // paths.seam1 = drawPath().attr('class', 'dashed lining')

  // Should we fit the cross seam?
  if (options.fitCrossSeam && options.fitCrossSeamBack) {
    let rotate = ['waistIn', 'waistOut']
    let delta = crossSeamDelta()
    let run = 0
    do {
      run++
      // Remedy A: Slash and spread
      for (const i of rotate) points[i] = points[i].rotate(delta / 15, points.seatOut)
      // Remedy B: Nudge the fork inwards/outwards
      points.fork = points.fork.shift(0, delta / 5)
      points.forkCp2 = points.crossSeamCurveCp2.rotate(-90, points.fork)
      drawCrossSeam()
      delta = crossSeamDelta()
      // Uncomment the line beloe this to see all iterations
      // paths[`try${run}`] = drawPath().attr('class', 'dotted')
    } while (Math.abs(delta) > 1 && run < 15)
  }

  // Store inseam & outseam length
  store.set('inseamBack', drawInseam().length())
  store.set('outseamBack', drawOutseam().length())

  // Only now style the waist lower if requested
  if (options.waistHeight < 1 || absoluteOptions.waistbandWidth > 0) {
    points.styleWaistOut = drawOutseam()
      .reverse()
      .shiftAlong(measurements.waistToHips * (1 - options.waistHeight) + absoluteOptions.waistbandWidth)
    points.styleWaistIn = utils.beamsIntersect(
      points.styleWaistOut,
      points.styleWaistOut.shift(points.waistOut.angle(points.waistIn), 10),
      points.waistIn,
      points.crossSeamCurveStart
    )
  } else {
    points.styleWaistIn = points.waistIn.clone()
    points.styleWaistOut = points.waistOut.clone()
  }
  // Adapt the vertical placement of the seat control point to the lowered waist
  points.seatOutCp2.y = points.seatOut.y - points.styleWaistOut.dy(points.seatOut) / 2

  // Paths
  paths.seam = drawPath().attr('class', 'fabric')

  if (complete) {
    points.grainlineTop.y = points.styleWaistOut.y
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
    })
    macro('scalebox', { at: points.knee })
    points.logoAnchor = new Point(points.crossSeamCurveStart.x / 2, points.crossSeamCurveStart.y)
    snippets.logo = new Snippet('logo', points.logoAnchor)
    points.titleAnchor = points.logoAnchor.shift(-90, 60)
    macro('title', {
      nr: 1,
      title: 'back',
      at: points.titleAnchor,
    })

    if (sa) {
      paths.saBase = drawOutseam()
        .join(
          new Path()
            .move(points.styleWaistOut)
            .line(points.styleWaistIn)
            .line(points.crossSeamCurveStart)
            .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
        )
        .join(drawInseam())
      paths.hemBase = new Path().move(points.floorIn).line(points.floorOut)
      paths.sa = paths.hemBase
        .offset(sa * 3)
        .join(paths.saBase.offset(sa))
        .close()
        .attr('class', 'fabric sa')
      paths.saBase.render = false
      paths.hemBase.render = false
    }

    if (paperless && options.titanPaperless) {
      // Help construct cross seam
      paths.hint = new Path()
        .move(points.crossSeamCurveStart)
        .line(points.crossSeamCurveMax)
        .line(points.fork)
        .attr('class', 'note lashed')
      macro('hd', {
        from: points.floorIn,
        to: points.floorOut,
        y: points.floorIn.y - 30,
      })
      macro('hd', {
        from: points.floorIn,
        to: points.floor,
        y: points.floorIn.y - 15,
      })
      macro('hd', {
        from: points.floor,
        to: points.floorOut,
        y: points.floorIn.y - 15,
      })
      macro('vd', {
        from: points.floorOut,
        to: points.styleWaistOut,
        x:
          (points.seatOut.x > points.styleWaistOut.x ? points.seatOut.x : points.styleWaistOut.x) +
          sa +
          15,
      })
      macro('vd', {
        from: points.floorIn,
        to: points.fork,
        x: points.fork.x - sa - 15,
      })
      macro('vd', {
        from: points.fork,
        to: points.styleWaistIn,
        x: points.fork.x - sa - 15,
      })
      macro('vd', {
        from: points.floorIn,
        to: points.styleWaistIn,
        x: points.fork.x - sa - 30,
      })
      macro('vd', {
        from: points.crossSeamCurveStart,
        to: points.styleWaistIn,
        x: points.crossSeamCurveStart.x - sa - 15,
      })
      macro('hd', {
        from: points.styleWaistIn,
        to: points.grainlineTop,
        y: points.styleWaistIn.y - sa - 15,
      })
      macro('hd', {
        from: points.crossSeamCurveStart,
        to: points.grainlineTop,
        y: points.styleWaistIn.y - sa - 30,
      })
      macro('hd', {
        from: points.crossSeamCurveMax,
        to: points.grainlineTop,
        y: points.styleWaistIn.y - sa - 45,
      })
      macro('hd', {
        from: points.fork,
        to: points.grainlineTop,
        y: points.styleWaistIn.y - sa - 60,
      })
      macro('hd', {
        from: points.grainlineTop,
        to: points.styleWaistOut,
        y: points.styleWaistIn.y - sa - 15,
      })
      if (points.seatOut.x > points.styleWaistOut.x) {
        macro('hd', {
          from: points.grainlineTop,
          to: points.seatOut,
          y: points.styleWaistIn.y - sa - 30,
        })
      }
    }
  }

  return part
}
