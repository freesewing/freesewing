import { back as titanBack } from '@freesewing/titan'

function draftLilyBack({
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
  part,
  log,
  units,
}) {
  //TODO: implement stretch setting to replace ease
  // work-around: flag it
  const stretchAsEase = -options.fabricStretch / 10
  const easeTol = 0.005
  if (
    Math.abs(options.waistEase - stretchAsEase) > easeTol ||
    Math.abs(options.seatEase - stretchAsEase) > easeTol ||
    Math.abs(options.kneeEase - stretchAsEase) > easeTol
  ) {
    store.flag.note({
      msg: `lily:adjustEase`,
      replace: {
        stretch: units(options.fabricStretch),
        ease: stretchAsEase,
      },
      suggest: {
        text: 'adjustEase',
        icon: 'options',
        update: {
          settings: [
            'options',
            {
              ...options,
              waistEase: stretchAsEase,
              seatEase: stretchAsEase,
              kneeEase: stretchAsEase,
            },
          ],
        },
      },
    })
  }

  /*
   * Helper method to draw the inseam path
   */
  const drawInseam = () =>
    new Path()
      .move(points.fork)
      .curve(points.forkCp2, points.kneeInCp1, points.kneeIn)
      .curve(points.kneeInCp2, points.floorInCp2, points.floorIn)
  /*
   * Helper method to draw the outseam path
   */
  const drawOutseam = () => {
    const waistOut = points.styleWaistOutLily || points.waistOut
    if (points.waistOut.x > points.seatOut.x)
      return new Path()
        .move(points.floorOut)
        .curve(points.floorOutCp2, points.kneeOutCp1, points.kneeOut)
        .curve(points.kneeOutCp2, points.seatOut, waistOut)
    else
      return new Path()
        .move(points.floorOut)
        .curve(points.floorOutCp2, points.kneeOutCp1, points.kneeOut)
        .curve(points.kneeOutCp2, points.seatOutCp1, points.seatOut)
        .curve_(points.seatOutCp2, waistOut)
  }
  /*
   * Helper method to draw the outline path
   */
  const drawPath = () => {
    const waistIn = points.styleWaistInLily || points.waistIn
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
      points.fork.shift(0, 1) // beams have infinite length anyway
    )
    points.crossSeamCurveCp1 = points.crossSeamCurveStart.shiftFractionTowards(
      points.crossSeamCurveMax,
      options.crossSeamCurveBend
    )
    points.crossSeamCurveCp2 = points.fork
      .shiftFractionTowards(points.crossSeamCurveMax, options.crossSeamCurveBend)
      .rotate(options.crossSeamCurveAngle, points.fork)
  }

  // NOTE: majority of points re-used from titan

  // shape at the ankle (unlike titan)
  const halfAnkle =
    measurements.ankle * (1 + options.fabricStretch) > measurements.heel
      ? (1 - options.fabricStretch / 10) * (measurements.ankle / 4)
      : measurements.heel / 4 / (1 + options.fabricStretch)
  // NOTE: for shortened leggings, this may not have been necessary...

  points.floorOut = points.floor.shift(0, halfAnkle)
  points.floorIn = points.floorOut.flipX(points.floor)

  store.set('halfAnkle', halfAnkle)

  points.floorInCp2 = points.floorIn.shift(90, points.knee.dy(points.floor) / 3)
  points.kneeInCp2 = points.kneeIn.shift(90, -points.knee.dy(points.floor) / 3)
  points.floorOutCp2 = points.floorOut.shift(90, points.knee.dy(points.floor) / 3)
  points.kneeOutCp1 = points.kneeOut.shift(90, -points.knee.dy(points.floor) / 3)

  // other control points have already been calculated in titan:
  // Control points to shape the legs towards the seat
  // Balance the waist

  // Cross seam
  drawCrossSeam()

  //Uncomment the line below to see the seam prior to fitting the cross seam
  // paths.seam1 = drawPath().attr('class', 'dashed lining')

  // Should we fit the cross seam?
  if (options.fitCrossSeam && options.fitCrossSeamBack) {
    let delta = crossSeamDelta()
    let run = 0
    do {
      run++
      // Remedy A: Slash and spread
      for (const i of ['waistIn', 'waistOut'])
        points[i] = points[i].rotate(delta / 15, points.seatOut)
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
  // Note: redo this for lily even though it was already done for titan;
  //  calculation for titan happened using its own seam lengths
  store.set('waistbandWidth', absoluteOptions.waistbandWidth) // used in lilyWaistband
  if (options.waistHeight < 1 || absoluteOptions.waistbandWidth > 0) {
    points.styleWaistOutLily = drawOutseam()
      .reverse()
      .shiftAlong(
        measurements.waistToHips * (1 - options.waistHeight) + absoluteOptions.waistbandWidth
      )
    points.styleWaistInLily = utils.beamsIntersect(
      points.styleWaistOutLily,
      points.styleWaistOutLily.shift(points.waistOut.angle(points.waistIn), 10),
      points.waistIn,
      points.crossSeamCurveStart
    )
  } else {
    points.styleWaistInLily = points.waistIn.clone()
    points.styleWaistOutLily = points.waistOut.clone()
  }
  // Adapt the vertical placement of the seat control point to the lowered waist
  points.seatOutCp2.y = points.seatOut.y - points.styleWaistOutLily.dy(points.seatOut) / 2
  store.set('backWaist', points.styleWaistInLily.dist(points.styleWaistOutLily))

  // Paths
  paths.seam = drawPath().attr('class', 'fabric')

  // adjust the length (at the bottom)
  let extendBeyondKnee = 1
  if (options.lengthReduction > 0) {
    let requestedLength = (1 - options.lengthReduction) * measurements.waistToFloor
    // leggings must reach to fork at least, so define a minimum
    const waistToFork = points.waistX.dy(points.fork)
    if (waistToFork >= 0.99 * requestedLength) {
      log.warn('length reduction capped; cutting off at fork')
      // add one percent to waistToFork to ensure that path length is nonzero
      requestedLength = waistToFork * 1.01
    }

    // work-around to avoid splitting exactly at the knee
    //   (due to a bug, splitting a path at a node is not possible)
    if (
      0.999 < requestedLength / measurements.waistToKnee &&
      requestedLength / measurements.waistToKnee < 1.001
    ) {
      requestedLength = 1.001 * measurements.waistToKnee
    }
    points.bottom = points.waistX.shift(270, requestedLength)
    let upperPoint, upperCp
    if (requestedLength < measurements.waistToKnee) {
      extendBeyondKnee = 0

      // 'cut' between fork and knee
      if (points.waistOut.x > points.seatOut.x) {
        upperPoint = points.styleWaistOutLily
        upperCp = points.seatOut
      } else {
        upperPoint = points.seatOut
        upperCp = points.seatOutCp1
      }
      points.bottomOut = utils.beamIntersectsCurve(
        points.bottom.shift(0, 999),
        points.bottom.shift(180, 999),
        points.kneeOut,
        points.kneeOutCp2,
        upperCp,
        upperPoint
      )

      points.bottomIn = utils.beamIntersectsCurve(
        points.bottom.shift(0, 999),
        points.bottom.shift(180, 999),
        points.kneeIn,
        points.kneeInCp1,
        points.forkCp2,
        points.fork
      )
    } else {
      // 'cut' between knee and 'floor'
      points.bottomOut = utils.beamIntersectsCurve(
        points.bottom.shift(0, 999),
        points.bottom.shift(180, 999),
        points.kneeOut,
        points.kneeOutCp1,
        points.floorOutCp2,
        points.floorOut
      )

      points.bottomIn = utils.beamIntersectsCurve(
        points.bottom.shift(0, 999),
        points.bottom.shift(180, 999),
        points.kneeIn,
        points.kneeInCp2,
        points.floorInCp2,
        points.floorIn
      )
    }

    // define the three parts of the path, then combine
    paths.bottom = new Path().move(points.bottomIn).line(points.bottomOut)

    const halves = paths.seam.split(points.bottomIn)
    paths.upperInseam = halves[0]
    const halves2 = halves[1].split(points.bottomOut)
    paths.upperOutseam = halves2[1]

    paths.seam = paths.upperInseam.join(paths.bottom).join(paths.upperOutseam)

    // store requestedLength for use in front part
    store.set('requestedLength', requestedLength)
  } else {
    // define the same three parts of the path as when length reduction is enabled, then combine

    // first define the points (also used for paperless)
    points.bottom = points.floor
    points.bottomIn = points.floorIn
    points.bottomOut = points.floorOut

    paths.bottom = new Path().move(points.bottomIn).line(points.bottomOut)

    // note: upperOutseam contains waist and cross seam as well
    paths.upperInseam = drawInseam()
    paths.upperOutseam = drawOutseam().join(
      new Path()
        .move(points.styleWaistOutLily)
        .line(points.styleWaistInLily)
        .line(points.crossSeamCurveStart)
        .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
    )
    paths.bottom.hide()
    paths.upperInseam.hide()
    paths.upperOutseam.hide()
  }

  points.grainlineTop.y = points.styleWaistOutLily.y
  points.grainlineBottom.y = points.bottom.y
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })
  points.logoAnchor = new Point(points.crossSeamCurveStart.x / 2, points.fork.y)
  snippets.logo = new Snippet('logo', points.logoAnchor)
  points.scalebox = points.logoAnchor.shiftFractionTowards(
    points.styleWaistOutLily.shiftFractionTowards(points.styleWaistInLily, 0.5),
    0.5
  )
  macro('scalebox', { at: points.scalebox })
  points.titleAnchor = points.logoAnchor.shift(-90, 60)
  macro('title', {
    nr: 1,
    title: 'back',
    at: points.titleAnchor,
  })

  //notches
  if (options.fitGuides) {
    points.waistMid = points.waistOut.shiftFractionTowards(points.waistIn, 0.5)
    // shift + rotate (below) is equivalent to shifting measurements.waistToSeat perpendicular to the waistIn-waistMid line
    points.seatMid = points.waistMid
      .shiftTowards(points.waistIn, measurements.waistToSeat)
      .rotate(90, points.waistMid)
    points.seatInTarget = points.seatOut.shiftOutwards(points.seatMid, measurements.seat / 4)
    points.seatOutTarget = points.seatMid.shiftTowards(points.seatOut, measurements.seat / 4)
    // shift + rotate (below) is equivalent to shifting measurements.waistToHips perpendicular to the waistIn-waistOut line
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
    if (points.waistOut.x > points.seatOut.x) {
      points.hipsOut = utils.lineIntersectsCurve(
        points.hipsIn,
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
        points.hipsIn,
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
    macro('sprinkle', {
      snippet: 'notch',
      on: ['seatOutNotch'],
    })
    if (extendBeyondKnee) {
      macro('sprinkle', {
        snippet: 'notch',
        on: ['kneeInNotch', 'kneeOutNotch'],
      })
    }
    macro('sprinkle', {
      snippet: 'bnotch',
      on: ['crossSeamCurveStart', 'seatIn'],
    })

    if (complete) {
      paths.seatline = new Path()
        .move(points.seatIn)
        .line(points.seatOutNotch)
        .addClass('fabric help')
        .addText('Seat Line', 'center')
      if (
        measurements.waistToHips * (1 - options.waistHeight) + absoluteOptions.waistbandWidth <
        measurements.waistToHips
      ) {
        snippets.hipsIn = new Snippet('bnotch', points.hipsIn)
        snippets.hipsOut = new Snippet('notch', points.hipsOut)
        paths.hipline = new Path()
          .move(points.hipsIn)
          .line(points.hipsOut)
          .addClass('fabric help')
          .addText('Hip Line', 'center')
      }
    }
  }

  if (sa) {
    paths.saBase = paths.upperOutseam.join(paths.upperInseam).hide()
    paths.hemBase = paths.bottom.hide()
    paths.sa = paths.hemBase
      .offset(sa * 3)
      .join(paths.saBase.offset(sa))
      .close()
      .addClass('fabric sa')
  }

  if (paperless) {
    // Help construct cross seam
    paths.hint = new Path()
      .move(points.crossSeamCurveStart)
      .line(points.crossSeamCurveMax)
      .line(points.fork)
      .addClass('note lashed')
    macro('hd', {
      id: 'wHem',
      from: points.bottomIn,
      to: points.bottomOut,
      y: points.bottomIn.y - 30,
    })
    macro('hd', {
      id: 'wHemLeft',
      from: points.bottomIn,
      to: points.bottom,
      y: points.bottomIn.y - 15,
    })
    macro('hd', {
      id: 'wHemRight',
      from: points.bottom,
      to: points.bottomOut,
      y: points.bottomIn.y - 15,
    })
    macro('vd', {
      id: 'hHemToSideWaist',
      from: points.bottomOut,
      to: points.styleWaistOutLily,
      x:
        (points.seatOut.x > points.styleWaistOutLily.x
          ? points.seatOut.x
          : points.styleWaistOutLily.x) +
        sa +
        15,
    })
    macro('vd', {
      id: 'hHemToFork',
      from: points.bottomIn,
      to: points.fork,
      x: points.fork.x - sa - 15,
    })
    macro('vd', {
      id: 'hForkToCbWaist',
      from: points.fork,
      to: points.styleWaistInLily,
      x: points.fork.x - sa - 15,
    })
    macro('vd', {
      id: 'hFull',
      from: points.bottomIn,
      to: points.styleWaistInLily,
      x: points.fork.x - sa - 30,
    })
    macro('vd', {
      id: 'hStartCrotchCurveToCbWaist',
      from: points.crossSeamCurveStart,
      to: points.styleWaistInLily,
      x: points.crossSeamCurveStart.x - sa - 15,
    })
    macro('hd', {
      id: 'wCbWaistToPleat',
      from: points.styleWaistInLily,
      to: points.grainlineTop,
      y: points.styleWaistInLily.y - sa - 15,
    })
    macro('hd', {
      id: 'wStartCrotchCurveToPleat',
      from: points.crossSeamCurveStart,
      to: points.grainlineTop,
      y: points.styleWaistInLily.y - sa - 30,
    })
    macro('hd', {
      id: 'wForkProjectionToPleat',
      from: points.crossSeamCurveMax,
      to: points.grainlineTop,
      y: points.styleWaistInLily.y - sa - 45,
    })
    macro('hd', {
      id: 'wForkToPleat',
      from: points.fork,
      to: points.grainlineTop,
      y: points.styleWaistInLily.y - sa - 60,
    })
    macro('hd', {
      id: 'wPleatToSideWaist',
      from: points.grainlineTop,
      to: points.styleWaistOutLily,
      y: points.styleWaistInLily.y - sa - 15,
    })
    if (points.seatOut.x > points.styleWaistOutLily.x) {
      macro('hd', {
        id: 'wPleatToSideWaistAlt',
        from: points.grainlineTop,
        to: points.seatOut,
        y: points.styleWaistInLily.y - sa - 30,
      })
    }
  }

  return part
}

export const back = {
  name: 'lily.back',
  from: titanBack,
  //after: titanFront,
  measurements: [
    'ankle',
    'heel', // secondary measurement, used instead of ankle
  ],
  options: {
    fitGuides: { bool: false, menu: 'advanced' },
    fitKnee: true,
    legBalance: 0.5, // between back and front parts
    waistBalance: 0.5,
    crotchDrop: { pct: 0, min: 0, max: 15, menu: 'advanced' }, // 'downgrade' to advanced menu
    waistHeight: { ...titanBack.options.waistHeight, pct: 50 }, // halfway between waist and hips
    fabricStretch: { pct: 40, min: 0, max: 50, menu: 'fit' },
    waistEase: { pct: -4, min: -20, max: 0, menu: 'fit' }, // -fabricStretch/10,
    seatEase: { pct: -4, min: -20, max: 0, menu: 'fit' }, // -fabricStretch/10,
    kneeEase: { pct: -4, min: -20, max: 0, menu: 'fit' }, // -fabricStretch/10,
    lengthBonus: 0,
    lengthReduction: {
      pct: 0,
      min: 0,
      max: 100,
      toAbs: (pct, { measurements }) => measurements.waistToFloor * pct,
      menu: 'style',
    },
    waistbandWidth: { ...titanBack.options.waistbandWidth, menu: 'style' },
  },
  hide: 'HIDE_TREE',
  draft: draftLilyBack,
}
