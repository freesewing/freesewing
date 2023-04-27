import { pctBasedOn } from '@freesewing/core'
import { elastics } from '@freesewing/snapseries'
import { pluginBundle } from '@freesewing/plugin-bundle'

function titanBack({
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
  log,
  part,
}) {
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

  let adjustment_warning = false

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
    let saved = []
    let delta = crossSeamDelta()
    let previous_delta = delta
    let run = 0
    do {
      previous_delta = delta
      run++
      // Remedy A: Slash and spread
      for (const i of rotate) {
        saved[i] = points[i]
        points[i] = points[i].rotate(delta / 15, points.seatOut)
      }
      // Remedy B: Nudge the fork inwards/outwards
      saved.fork = points.fork
      points.fork = points.fork.shift(0, delta / 5)
      saved.forkCp2 = points.forkCp2
      points.forkCp2 = points.crossSeamCurveCp2.rotate(-90, points.fork)
      drawCrossSeam()
      delta = crossSeamDelta()
      // Uncomment the line beloe this to see all iterations
      // paths[`try${run}`] = drawPath().attr('class', 'dotted')
    } while (Math.abs(delta) > 1 && run < 15 && Math.abs(delta) < Math.abs(previous_delta))
    if (Math.abs(delta) > Math.abs(previous_delta)) {
      // The rotations started to produce worse results.
      // Revert back to the previous rotation.
      for (const i of rotate) {
        points[i] = saved[i]
      }
      points.fork = saved.fork
      points.forkCp2 = saved.forkCp2
    }
    if (Math.abs(delta) > 1 || Math.abs(delta) > Math.abs(previous_delta)) {
      log.warning('Unable to adjust the back crotch seam to fit the given measurements.')
      adjustment_warning = true
    }
  }

  // Store inseam & outseam length
  store.set('inseamBack', drawInseam().length())
  store.set('outseamBack', drawOutseam().length())

  // Only now style the waist lower if requested
  if (options.waistHeight < 1 || absoluteOptions.waistbandWidth > 0) {
    points.styleWaistOut = drawOutseam()
      .reverse()
      .shiftAlong(
        measurements.waistToHips * (1 - options.waistHeight) + absoluteOptions.waistbandWidth
      )
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

  store.cutlist.addCut()

  if (complete) {
    points.grainlineTop.y = points.styleWaistOut.y
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
    })
    macro('scalebox', { at: points.knee })
    points.logoAnchor = new Point(points.crossSeamCurveStart.x / 2, points.fork.y)
    snippets.logo = new Snippet('logo', points.logoAnchor)
    points.titleAnchor = points.logoAnchor.shift(-90, 60)
    macro('title', {
      nr: 1,
      title: 'back',
      at: points.titleAnchor,
    })
    /*
    //notches
    if (options.fitGuides) {
      points.waistMid = points.waistOut.shiftFractionTowards(points.waistIn, 0.5)
      points.seatMid = points.waistMid
        .shiftTowards(points.waistIn, measurements.waistToSeat)
        .rotate(90, points.waistMid)
      points.seatInTarget = points.seatOut.shiftOutwards(points.seatMid, measurements.seat / 4)
      points.seatOutTarget = points.seatMid.shiftTowards(points.seatOut, measurements.seat / 4)
      points.hipsInTarget = points.waistIn
        .shiftTowards(points.waistOut, measurements.waistToHips)
        .rotate(-90, points.waistIn)
      points.hipsOutTarget = points.waistOut
        .shiftTowards(points.waistIn, measurements.waistToHips)
        .rotate(90, points.waistOut)
      points.hipsIn = utils.beamsIntersect(
        points.hipsOutTarget,
        points.hipsInTarget,
        points.waistIn,
        points.crossSeamCurveStart
      )
      points.crossSeamCurveStartMid = utils.beamsIntersect(
        points.crossSeamCurveStart,
        points.crossSeamCurveStart.shift(points.waistIn.angle(points.waistOut), 1),
        points.waistMid,
        points.seatMid
      )
      if (points.seatMid.y > points.crossSeamCurveStartMid.y) {
        points.seatIn = utils.lineIntersectsCurve(
          points.seatMid,
          points.seatInTarget,
          points.crossSeamCurveStart,
          points.crossSeamCurveCp1,
          points.crossSeamCurveCp2,
          points.fork
        )
      } else {
        points.seatIn = utils.beamsIntersect(
          points.seatMid,
          points.seatInTarget,
          points.waistIn,
          points.crossSeamCurveStart
        )
      }
      if (options.fitKnee) {
        if (points.waistOut.x > points.seatOut.x) {
          points.hipsOut = utils.lineIntersectsCurve(
            points.hipsOutTarget,
            points.hipsIn.rotate(180, points.hipsOutTarget),
            points.kneeOut,
            points.kneeOutCp2,
            points.seatOut,
            points.waistOut
          )
          points.seatOutNotch = utils.lineIntersectsCurve(
            points.seatMid,
            points.seatOutTarget,
            points.kneeOut,
            points.kneeOutCp2,
            points.seatOut,
            points.waistOut
          )
        } else {
          points.hipsOut = utils.lineIntersectsCurve(
            points.hipsOutTarget,
            points.hipsIn.rotate(180, points.hipsOutTarget),
            points.seatOut,
            points.seatOutCp2,
            points.waistOut,
            points.waistOut
          )
          points.seatOutNotch = points.seatOut
        }
        points.kneeOutNotch = points.kneeOut
        points.kneeInNotch = points.kneeIn
      } else {
        if (points.waistOut.x > points.seatOut.x) {
          points.hipsOut = utils.lineIntersectsCurve(
            points.hipsOutTarget,
            points.hipsIn.rotate(180, points.hipsOutTarget),
            points.floorOut,
            points.kneeOutCp2,
            points.seatOut,
            points.waistOut
          )
          points.seatOutNotch = utils.lineIntersectsCurve(
            points.seatMid,
            points.seatOutTarget,
            points.floorOut,
            points.kneeOutCp2,
            points.seatOut,
            points.waistOut
          )
          points.kneeOutNotch = utils.lineIntersectsCurve(
            points.kneeOut,
            points.kneeIn.rotate(180, points.kneeOut),
            points.floorOut,
            points.kneeOutCp2,
            points.seatOut,
            points.waistOut
          )
        } else {
          points.hipsOut = utils.lineIntersectsCurve(
            points.hipsOutTarget,
            points.hipsIn.rotate(180, points.hipsOutTarget),
            points.seatOut,
            points.seatOutCp2,
            points.waistOut,
            points.waistOut
          )
          points.seatOutNotch = points.seatOut
          points.kneeOutNotch = utils.lineIntersectsCurve(
            points.kneeOut,
            points.kneeIn.rotate(180, points.kneeOut),
            points.floorOut,
            points.kneeOutCp2,
            points.seatOutCp1,
            points.seatOut
          )
        }
        points.kneeInNotch = utils.lineIntersectsCurve(
          points.kneeIn,
          points.kneeOut.rotate(180, points.kneeIn),
          points.fork,
          points.forkCp2,
          points.kneeInCp1,
          points.floorIn
        )
      }
      macro('sprinkle', {
        snippet: 'notch',
        on: ['seatOutNotch', 'kneeInNotch', 'kneeOutNotch'],
      })
      macro('sprinkle', {
        snippet: 'bnotch',
        on: ['crossSeamCurveStart', 'seatIn'],
      })
      paths.seatline = new Path()
        .move(points.seatIn)
        .line(points.seatOutNotch)
        .attr('class', 'fabric help')
        .attr('data-text', 'Seat Line')
        .attr('data-text-class', 'center')
      if (
        measurements.waistToHips * (1 - options.waistHeight) + absoluteOptions.waistbandWidth <
        measurements.waistToHips
      ) {
        snippets.hipsIn = new Snippet('bnotch', points.hipsIn)
        snippets.hipsOut = new Snippet('notch', points.hipsOut)
        paths.hipline = new Path()
          .move(points.hipsIn)
          .line(points.hipsOut)
          .attr('class', 'fabric help')
          .attr('data-text', 'Hip Line')
          .attr('data-text-class', 'center')
      }
    }
    */
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
      paths.saBase.hide()
      paths.hemBase.hide()
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

  if (adjustment_warning) {
    log.warning(
      'We were not able to generate the Back pattern piece correctly. ' +
        'Manual fitting and alteration of this and other pattern pieces ' +
        'are likely to be needed. ' +
        'First, please retake your measurements and generate a new pattern ' +
        'using the new measurements. ' +
        'If you still see this warning with the new pattern, then please ' +
        'make a test garment, check fit, and make alterations as necessary ' +
        'before trying to make the final garment.'
    )
  }

  return part
}

export const back = {
  name: 'titan.back',
  plugins: [pluginBundle],
  measurements: [
    'crossSeam',
    'crossSeamFront',
    'knee',
    'seat',
    'seatBack',
    'waist',
    'waistBack',
    'waistToFloor',
    'waistToKnee',
    'waistToHips',
    'waistToSeat',
    'waistToUpperLeg',
  ],
  options: {
    // Constants
    titanPaperless: true,
    fitCrossSeam: true,
    fitCrossSeamFront: true,
    fitCrossSeamBack: true,
    fitGuides: true,
    // Fit
    waistEase: { pct: 2, min: 0, max: 10, menu: 'fit' },
    seatEase: { pct: 2, min: 0, max: 10, menu: 'fit' },
    kneeEase: { pct: 6, min: 1, max: 25, menu: 'fit' },
    // Style
    waistHeight: { pct: 100, min: 0, max: 100, menu: 'style' },
    lengthBonus: { pct: 2, min: -20, max: 10, menu: 'style' },
    crotchDrop: { pct: 2, min: 0, max: 15, menu: 'style' },
    fitKnee: { bool: false, menu: 'style' },
    // Advanced
    legBalance: { pct: 57.5, min: 52.5, max: 62.5, menu: 'advanced' },
    crossSeamCurveStart: { pct: 85, min: 60, max: 100, menu: 'advanced' },
    crossSeamCurveBend: { pct: 65, min: 45, max: 85, menu: 'advanced' },
    crossSeamCurveAngle: { deg: 12, min: 0, max: 20, menu: 'advanced' },
    crotchSeamCurveStart: { pct: 80, min: 60, max: 95, menu: 'advanced' },
    crotchSeamCurveBend: { pct: 80, min: 45, max: 100, menu: 'advanced' },
    crotchSeamCurveAngle: { deg: 25, min: 0, max: 35, menu: 'advanced' },
    waistBalance: { pct: 60, min: 30, max: 90, menu: 'advanced' },
    grainlinePosition: { pct: 45, min: 30, max: 60, menu: 'advanced' },
    waistbandWidth: {
      pct: 3,
      min: 1,
      max: 6,
      snap: elastics,
      ...pctBasedOn('waistToFloor'),
      menu: 'advanced',
    },
  },
  draft: titanBack,
}
