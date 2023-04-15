import { back as titanBack } from '@freesewing/titan'
import { pctBasedOn, hidePresets } from '@freesewing/core'
import { elastics, smallSteps } from '@freesewing/snapseries'

function pacoBack({
  store,
  sa,
  points,
  Path,
  paths,
  options,
  measurements,
  complete,
  paperless,
  macro,
  absoluteOptions,
  part,
}) {
  /*
   * Helper method to draw the inseam path
   */
  const drawInseam = () =>
    new Path().move(points.fork).curve(points.forkCp2, points.kneeInCp1, points.floorIn)
  /*
   * Helper method to draw the outseam path
   */
  const drawOutseam = (noPocketFlap = false) => {
    let waistOut = points.styleWaistOut || points.waistOut
    let outseam = new Path()
      .move(points.floorOut)
      .curve(points.kneeOutCp2, points.seatOut, waistOut)
    if (!options.frontPockets || noPocketFlap) return outseam
    else {
      // Split outseam at top and bottom, and inject pocket flap
      let split = outseam.split(points.pocketFlapBottomIn)
      return split[0]
        .join(
          new Path()
            .move(points.pocketFlapBottomIn)
            .line(points.pocketFlapBottomOut)
            .line(points.pocketFlapTopOut)
            .line(points.pocketFlapTopIn)
        )
        .join(split[1].split(points.pocketFlapTopIn).pop())
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

  // Adapt bottom leg width based on heel & heel ease
  let quarterHeel = (measurements.heel * (1 + options.heelEase) * options.legBalance) / 2
  points.floorOut = points.floor.shift(0, quarterHeel)
  points.floorIn = points.floor.shift(180, quarterHeel)
  points.kneeOut = points.knee.shift(0, quarterHeel)
  points.kneeOutCp2 = points.kneeOut
  points.kneeIn = points.knee.shift(180, quarterHeel)
  points.kneeInCp1 = points.kneeIn

  // Shorter leg if we have an elasticated hem
  store.set('ankleElastic', absoluteOptions.ankleElastic)
  if (options.elasticatedHem) {
    for (const p of ['floor', 'floorIn', 'floorOut'])
      points[p] = points[p].shift(90, store.get('ankleElastic'))
  }

  // Adapt waist so we can get these pants over our bum without a zipper
  let delta =
    (measurements.seat * options.legBalance) / 2 - points.styleWaistIn.dist(points.styleWaistOut)
  let angle = points.styleWaistIn.angle(points.styleWaistOut)
  points.styleWaistOut = points.styleWaistOut.shift(angle, delta)
  points.seatOut = points.seatOut.shift(angle, delta)

  // Cut the top of our pants short to make room for the waistband/elastic
  store.set('waistbandWidth', absoluteOptions.waistbandWidth)
  points.styleWaistOut = drawOutseam(true).reverse().shiftAlong(store.get('waistbandWidth'))
  points.styleWaistIn = points.styleWaistIn.shiftTowards(
    points.crossSeamCurveStart,
    store.get('waistbandWidth')
  )

  // Add the (optional) front pocket extention
  if (options.frontPockets) {
    let outseam = drawOutseam(true).reverse()
    points.pocketFlapTopIn = outseam.shiftAlong(absoluteOptions.frontPocketFlapSize)
    points.pocketFlapBottomIn = outseam.shiftAlong(
      absoluteOptions.frontPocketFlapSize + measurements.heel * options.frontPocketHeelRatio
    )
    points.pocketFlapTopOut = points.pocketFlapTopIn
      .shiftTowards(points.pocketFlapBottomIn, absoluteOptions.frontPocketFlapSize)
      .rotate(90, points.pocketFlapTopIn)
    points.pocketFlapBottomOut = points.pocketFlapBottomIn
      .shiftTowards(points.pocketFlapTopIn, absoluteOptions.frontPocketFlapSize)
      .rotate(-90, points.pocketFlapBottomIn)
    points.pocketFlapBottomOut = points.pocketFlapTopOut.shiftOutwards(
      points.pocketFlapBottomOut,
      absoluteOptions.frontPocketFlapSize
    )
  }

  // Add markings for the (optional) back pockets
  if (options.backPockets) {
    const pocketWidth = () =>
      points.styleWaistOut.dist(points.styleWaistIn) * options.backPocketWidthRatio
    let angle = points.styleWaistOut.angle(points.styleWaistIn)
    points.pocketWaistCenter = points.styleWaistIn.shiftFractionTowards(
      points.styleWaistOut,
      options.backPocketWaistRatio
    )
    points.pocketCenter = points.pocketWaistCenter.shift(
      angle + 90,
      points.styleWaistIn.dist(points.crossSeamCurveStart) * options.backPocketHeightRatio
    )
    points.pocketLeft = points.pocketCenter.shift(angle, pocketWidth() / 2)
    points.pocketRight = points.pocketLeft.rotate(180, points.pocketCenter)
    // Pocket bag
    points.pocketBagWaistLeft = points.pocketWaistCenter.shift(angle, pocketWidth() / 1.5)
    points.pocketBagWaistRight = points.pocketBagWaistLeft.rotate(180, points.pocketWaistCenter)
    points.pocketBagBottomCenter = points.pocketCenter.shift(angle + 90, pocketWidth() * 1.5)
    points.pocketBagBottomLeft = points.pocketBagBottomCenter.shift(angle, pocketWidth() / 1.5)
    points.pocketBagBottomRight = points.pocketBagBottomLeft.rotate(
      180,
      points.pocketBagBottomCenter
    )
  }

  // Now draw the outline
  paths.seam = drawPath()

  // Store inseam & outseam length
  store.set('pacoInseamBack', drawInseam().length())
  store.set('pacoOutseamBack', drawOutseam(true).length())
  // Store top&ankle length
  store.set('backWaist', points.styleWaistIn.dist(points.styleWaistOut))
  store.set('backAnkle', points.floorIn.dist(points.floorOut))

  if (complete) {
    if (options.backPockets) {
      paths.pocket = new Path()
        .move(points.pocketLeft)
        .line(points.pocketRight)
        .attr('class', 'farbic lashed')
      paths.pocketBag = new Path()
        .move(points.pocketBagWaistLeft)
        .line(points.pocketBagBottomLeft)
        .line(points.pocketBagBottomRight)
        .line(points.pocketBagWaistRight)
        .attr('class', 'lining lashed')
      macro('sprinkle', {
        snippet: 'bnotch',
        on: ['pocketLeft', 'pocketRight', 'pocketBagWaistLeft', 'pocketBagWaistRight'],
      })
    }

    if (sa) {
      const waistIn = points.styleWaistIn || points.waistIn
      const hemSa = options.elasticatedHem ? sa : 4 * sa
      paths.sa = drawInseam()
        .offset(sa)
        .line(points.floorIn.shift(180, sa).shift(-90, hemSa))
        .line(points.floorOut.shift(0, sa).shift(-90, hemSa))
        .join(drawOutseam().offset(sa).trim())
        .join(
          new Path()
            .move(points.styleWaistOut)
            .line(waistIn)
            .line(points.crossSeamCurveStart)
            .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
            .offset(sa)
        )
        .close()
        .attr('class', 'fabric sa')
    }
  }

  if (paperless) {
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
    if (options.frontPockets) {
      macro('ld', {
        from: points.styleWaistOut,
        to: points.pocketFlapTopIn,
        d: -15,
      })
      macro('ld', {
        from: points.pocketFlapTopIn,
        to: points.pocketFlapBottomIn,
        d: -15,
      })
      macro('ld', {
        from: points.pocketFlapTopIn,
        to: points.pocketFlapTopOut,
        d: -15,
      })
    }
    if (options.backPockets) {
      macro('ld', {
        from: points.styleWaistIn,
        to: points.pocketBagWaistLeft,
        d: -15 - sa,
      })
      macro('ld', {
        from: points.styleWaistIn,
        to: points.pocketWaistCenter,
        d: -30 - sa,
      })
      macro('ld', {
        from: points.pocketCenter,
        to: points.pocketWaistCenter,
        d: -15,
      })
      macro('ld', {
        from: points.pocketBagBottomRight,
        to: points.pocketBagWaistRight,
        d: -15,
      })
    }
  }

  return part
}

export const back = {
  name: 'paco.back',
  from: titanBack,
  hide: hidePresets.HIDE_TREE,
  measurements: ['heel'],
  options: {
    // Constants
    titanPaperless: false,
    fitCrossSeam: true,
    fitCrossSeamFront: true,
    fitCrossSeamBack: true,
    fitGuides: false,
    kneeEase: 0.06,
    fitKnee: false,
    frontPocketHeelRatio: 0.4,
    backPocketWaistRatio: 0.4,
    backPocketHeightRatio: 0.4,
    backPocketWidthRatio: 0.37,
    // Disable this option from Titan
    waistbandHeight: 0,
    // Fit
    waistEase: { pct: 2, min: 0, max: 10, menu: 'fit' },
    seatEase: { pct: 5, min: 0, max: 15, menu: 'fit' },
    // Style
    waistHeight: { pct: 5, min: 0, max: 100, menu: 'style' },
    lengthBonus: { pct: 0, min: -15, max: 10, menu: 'style' },
    crotchDrop: { pct: 2, min: 0, max: 10, menu: 'style' },
    elasticatedHem: { bool: true, menu: 'style' },
    // Elastic
    waistbandWidth: {
      pct: 3,
      min: 1,
      max: 6,
      snap: elastics,
      ...pctBasedOn('waistToFloor'),
      menu: 'elastic',
    },
    ankleElastic: {
      pct: 5,
      min: 1,
      max: 13,
      snap: elastics,
      ...pctBasedOn('waistToFloor'),
      menu: 'elastic',
    },
    heelEase: { pct: 5, min: 0, max: 50, menu: 'elastic' },
    // Pockets
    frontPockets: { bool: true, menu: 'pockets' },
    backPockets: { bool: false, menu: 'pockets' },
    // Not exposed to the user
    frontPocketFlapSize: {
      pct: 3,
      min: 3,
      max: 3,
      snap: smallSteps,
      ...pctBasedOn('waist'),
      menu: false,
    },
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
  },
  draft: pacoBack,
}
