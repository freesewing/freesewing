import { hidePresets, pctBasedOn } from '@freesewing/core'
import { elastics } from '@freesewing/snapseries'
import { front as titanFront } from '@freesewing/titan'
import { safeSplit } from './utils.mjs'

function draftPaulFront({
  points,
  Point,
  paths,
  Path,
  options,
  complete,
  measurements,
  store,
  macro,
  utils,
  snippets,
  sa,
  log,
  part,
}) {
  paths.titanSeam = paths.seam.clone().setClass('lining help').hide()

  delete points.kneeOutCp1
  delete points.kneeInCp1
  delete points.kneeOutCp2
  delete points.kneeInCp2

  points.forkCp1 = points.fork.shiftFractionTowards(points.forkCp1, 4)

  // Adapt bottom leg based on heel and heel ease
  let quarterHeel = (measurements.heel * (1 + options.ankleEase) * (1 - options.legBalance)) / 2
  points.floorOut = points.floor.shift(180, quarterHeel)
  points.floorIn = points.floor.shift(0, quarterHeel)

  // Helper method to draw the outline path
  const drawPath = (withPocket = false) => {
    let result
    if (options.gusset) {
      result = safeSplit(paths.inseam, points.inseamGussetIntersection)[0]
        .join(paths.gussetCut)
        .join(safeSplit(paths.crotchCurve, points.crotchCurveGussetIntersection)[1])
    } else {
      result = paths.inseam.clone().join(paths.crotchCurve)
    }
    if (!withPocket) {
      return result.join(outseam)
    } else {
      return result
        .line(points.flyTop)
        .line(points.pocketTop)
        .join(paths.pocketCurve)
        .line(points.pocketLeft)
        .join(safeSplit(outseam, points.pocketLeft)[1])
    }
  }

  const bonusLength = (options.length - 1) * points.fork.dy(points.floor)

  // Helper object holding the Titan side seam path
  let outseam = new Path()
    .move(points.styleWaistOut)
    .curve(
      points.seatOut,
      points.floorOut.translate(0, points.floorOut.dy(points.kneeIn) * options.ankleShape),
      points.floorOut
    )

  if (options.length > 1) {
    outseam.line(points.floorOut.translate(0, bonusLength))
  }

  // Mark the bottom of the fly J-seam
  points.flyBottom = utils.curveIntersectsY(
    points.crotchSeamCurveStart,
    points.crotchSeamCurveCp2,
    points.crotchSeamCurveCp1,
    points.fork,
    points.cfSeat.shiftFractionTowards(points.crotchSeamCurveCp2, options.flyLength).y
  )

  points.flyTop = points.styleWaistOut.shiftFractionTowards(
    points.styleWaistIn,
    1 - options.flyWidth
  )

  // Adjust waistband curve for pocket and fly
  points.pocketTop = points.styleWaistOut.shiftFractionTowards(
    points.flyTop,
    options.pocketOpeningWidth
  )

  const flyAngle = points.flyBottom.angle(points.styleWaistIn)

  points.pocketAngleAdjust = points.flyTop.shift(flyAngle - 90, 10)

  points.styleWaistIn = utils.beamsIntersect(
    points.flyBottom,
    points.styleWaistIn,
    points.flyTop,
    points.pocketAngleAdjust
  )

  // Helper object holding the inseam path
  let inseam = new Path()

  if (options.length > 1) {
    inseam.move(points.floorIn.translate(0, bonusLength))
    inseam.line(points.floorIn)
  } else {
    inseam.move(points.floorIn)
  }

  inseam.curve(
    points.floorIn.translate(0, points.floorIn.dy(points.kneeIn) * options.ankleShape),
    points.kneeIn,
    points.fork
  )

  if (options.length < 1) {
    inseam = inseam.split(inseam.intersectsY(points.floor.y + bonusLength)[0])[1]
    outseam = outseam.split(outseam.intersectsY(points.floor.y + bonusLength)[0])[0]
  }

  points.inseamBottom = inseam.start()

  points.grainlineBottom = points.grainlineBottom.clone()
  points.grainlineBottom.y = outseam.end().y

  paths.inseam = inseam.hide()
  paths.outseam = outseam.hide()

  // Helper object holding the crotchCurve
  let crotchCurveTmp = new Path()
    .move(points.fork)
    .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
    .line(points.styleWaistIn)

  // Define Fly components
  points.flyExtensionBottom = utils.curveIntersectsY(
    points.crotchSeamCurveStart,
    points.crotchSeamCurveCp2,
    points.crotchSeamCurveCp1,
    points.fork,
    points.cfSeat.shiftFractionTowards(points.crotchSeamCurveCp2, options.flyLength * 1.5).y
  )

  points.flyCorner = points.flyTop.shift(
    points.styleWaistIn.angle(points.flyBottom),
    points.styleWaistIn.dist(points.flyBottom)
  )
  points.flyCurveStart = points.flyCorner.shiftTowards(
    points.flyTop,
    points.flyBottom.dist(points.flyCorner)
  )
  points.flyCurveCp1 = points.flyBottom.shiftFractionTowards(points.flyCorner, options.flyCurve)
  points.flyCurveCp2 = points.flyCurveStart.shiftFractionTowards(points.flyCorner, options.flyCurve)

  let topStitchDist = (1 - options.flyWidth) * 8

  let pointsToLinearize = ['cfSeat', 'crotchSeamCurveStart']
  for (const point of pointsToLinearize) {
    let p = points[point]
    const a = p.dist(points.styleWaistIn)
    const b = p.dist(points.flyBottom)
    const factor = a / (a + b)
    points[point] = points.styleWaistIn.shiftFractionTowards(points.flyBottom, factor)
  }

  // Make sure fly edge is straight
  let split = crotchCurveTmp.split(points.flyBottom)
  if (split[0] !== null) {
    crotchCurveTmp = split[0]
  }
  paths.crotchCurve = crotchCurveTmp.line(points.styleWaistIn).hide()

  paths.flyFacingLine = new Path()
    .move(points.flyTop)
    .line(points.flyCurveStart)
    .curve(points.flyCurveCp2, points.flyCurveCp1, points.flyBottom)
    .addClass('dotted note')
    .hide()

  if (complete) {
    paths.flyFacingLine.unhide()
  }

  const flyLine = paths.crotchCurve.clone().split(points.flyBottom)[1]
  paths.flyRightLegExtension = flyLine
    .offset(topStitchDist)
    .line(points.styleWaistIn)
    .reverse()
    .line(points.flyExtensionBottom)
    .reverse()
    .setClass('fabric')

  if (complete) {
    paths.flyRightText = paths.flyRightLegExtension
      .clone()
      .setClass('hidden')
      .addText('right seamline', 'center note')
    paths.flyLeftText = flyLine
      .clone()
      .unhide()
      .setClass('hidden')
      .addText('left seamline / front center', 'center note')
  }

  // prepare gusset
  let gussetMin = points.flyExtensionBottom.x
  let gussetMax = points.fork.x
  const gussetIntersection = inseam.intersectsX(
    Math.max(points.inseamBottom.x, gussetMax - (gussetMax - gussetMin) * options.gussetSize)
  )[0]
  points.inseamGussetIntersection = gussetIntersection ?? points.fork
  points.crotchCurveGussetIntersection = paths.crotchCurve.shiftAlong(
    options.gussetWidth * points.fork.dist(points.flyExtensionBottom) * options.gussetSize
  )
  store.set('innerGussetLegSize', points.inseamGussetIntersection.dist(points.fork))
  store.set(
    'outerFrontGussetLegSize',
    points.inseamGussetIntersection.dist(points.crotchCurveGussetIntersection)
  )
  store.set('gussetFrontWidth', points.fork.dist(points.crotchCurveGussetIntersection))
  paths.gussetCut = new Path()
    .move(points.inseamGussetIntersection)
    .line(points.crotchCurveGussetIntersection)
    .setClass('mark')
    .hide()

  // front pocket
  let height = points.styleWaistOut.dy(points.floorOut) * options.pocketOpeningHeight
  store.set('pocketOpeningHeight', height)
  points.pocketLeft =
    height > paths.outseam.length() ? paths.outseam.end() : paths.outseam.shiftAlong(height)
  points.pocketCorner = points.pocketTop.translate(0, points.styleWaistOut.dy(points.pocketLeft))
  points.pocketCornerCp1 = points.pocketCorner.shiftTowards(
    points.pocketTop,
    height * options.pocketCurveShape
  )
  points.pocketCornerCp2 = points.pocketCorner.shiftFractionTowards(
    points.pocketLeft,
    options.pocketCurveShape
  )

  paths.pocketCurve = new Path()
    .move(points.pocketTop)
    .curve(points.pocketCornerCp1, points.pocketCornerCp2, points.pocketLeft)
    .hide()

  // Anchor for sampling/grid
  points.anchor = points.fork.clone()

  // Draw path
  paths.seam = drawPath(options.frontPockets).close().attr('class', 'fabric')

  if (sa) {
    paths.sa = macro('sa', {
      paths: [
        drawPath(options.frontPockets),
        {
          p: macro('hem', {
            path1: outseam,
            path2: inseam,
            hemWidth: sa * options.hemWidth,
            lastFoldWidth: sa * options.hemWidth,
          }),
          offset: 0,
        },
      ],
    })

    let FlyRightLegExtensionSa = macro('sa', {
      paths: ['flyRightLegExtension', null],
    })
    const ints = FlyRightLegExtensionSa.intersects(paths.sa)
    paths.flyRightLegExtensionSa = FlyRightLegExtensionSa.split(ints[0])[1]
      .split(ints[1])[0]
      .setClass('sa')
  }

  // Store waistband length
  store.set('waistbandFront', points.styleWaistIn.dist(points.styleWaistOut))
  store.set('waistbandFly', points.styleWaistIn.dist(points.flyTop))
  store.set('legWidthFront', points.floorIn.dist(points.floorOut))

  // Store inseam and outseam lengths
  store.set('frontInseamLength', inseam.length())
  store.set('frontOutseamLength', outseam.length())
  store.set('crotchSeamLength', paths.crotchCurve.length())

  points.titleAnchor = new Point(points.knee.x, points.fork.y)
  macro('title', {
    at: points.titleAnchor,
    nr: 2,
    title: 'front',
  })

  delete paths.hint

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.titleAnchor = new Point(points.knee.x, points.fork.y)
  macro('title', {
    at: points.titleAnchor,
    nr: 2,
    title: 'front',
  })

  // Logo
  delete snippets.logo

  points.grainlineTop = utils.beamsIntersect(
    points.styleWaistIn,
    points.styleWaistOut,
    points.knee,
    points.grainlineBottom
  )

  if (options.frontPockets) {
    const pocketCurveIntersect = paths.pocketCurve.intersectsBeam(
      points.knee,
      points.grainlineBottom
    )
    if (pocketCurveIntersect.length > 0) {
      points.grainlineTop = pocketCurveIntersect[0]
    }
  }

  macro('sprinkle', {
    snippet: 'notch',
    on: ['flyBottom', 'flyExtensionBottom', 'inseamGussetIntersection'],
  })
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  // Dimensions
  macro('rmad')
  macro('hd', {
    id: 'wHem',
    from: points.floorOut,
    to: points.floorIn,
    y: points.floorIn.y - 10,
  })
  macro('pd', {
    id: 'pOutseam',
    path: paths.outseam,
  })
  if (options.frontPockets) {
    macro('hd', {
      id: 'wPocket',
      from: points.styleWaistOut,
      to: points.pocketTop,
      y: points.styleWaistOut.y - 10,
    })
    macro('vd', {
      id: 'hPocket',
      from: points.styleWaistOut,
      to: points.pocketLeft,
      x: points.pocketLeft.x,
    })
  }
  macro('hd', {
    id: 'wTop',
    from: points.styleWaistOut,
    to: points.styleWaistIn,
    y: points.styleWaistOut.y - 30,
  })
  if (options.gusset) {
    macro('vd', {
      id: 'vGusset',
      from: points.inseamGussetIntersection,
      to: points.crotchCurveGussetIntersection,
      x: points.crotchCurveGussetIntersection.x + 10,
    })
    macro('vd', {
      id: 'vInseam',
      from: points.inseamGussetIntersection,
      to: points.floorIn,
      x: points.inseamGussetIntersection.x + 10,
    })
    macro('vd', {
      id: 'vCrotch',
      from: points.crotchCurveGussetIntersection,
      to: points.styleWaistIn,
      x: points.crotchCurveGussetIntersection.x + 10,
    })
  } else {
    macro('vd', {
      id: 'vInseam',
      from: points.fork,
      to: points.floorIn,
      x: points.fork.x + 10,
    })
    macro('vd', {
      id: 'vCrotch',
      from: points.fork,
      to: points.styleWaistIn,
      x: points.fork.x + 10,
    })
  }
  macro('vd', {
    id: 'vFly',
    from: points.flyBottom,
    to: points.styleWaistIn,
    x: points.flyBottom.x + 10,
  })
  return part
}

export const front = {
  name: 'paul.front',
  from: titanFront,
  hide: hidePresets.HIDE_TREE,
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
    'heel',
  ],
  options: {
    // Constants (from Titan)
    fitCrossSeam: true,
    fitCrossSeamFront: true,
    fitCrossSeamBack: true,
    fitGuides: false,
    fitKnee: true,
    lengthBonus: 0, // we're using out own length option to shorten the pants

    // Fit (from Titan)
    waistEase: { pct: 1, min: -5, max: 5, menu: 'fit' },
    seatEase: { pct: 2, min: -10, max: 10, menu: 'fit' },
    kneeEase: { pct: 15, min: 0, max: 30, menu: 'fit' },

    // Style (from Titan)
    waistHeight: { pct: 6, min: -15, max: 110, menu: 'style' },
    waistbandWidth: {
      pct: 3,
      min: 1,
      max: 6,
      snap: elastics,
      ...pctBasedOn('waistToFloor'),
      menu: 'style',
    },
    crotchDrop: { pct: 2, min: 0, max: 15, menu: 'style' },
    length: { pct: 100, min: 1, max: 120, menu: 'style' },

    // Advanced (from Titan)
    crossSeamCurveStart: { pct: 85, min: 60, max: 100, menu: 'advanced' },
    crossSeamCurveBend: { pct: 65, min: 45, max: 85, menu: 'advanced' },
    crossSeamCurveAngle: { deg: 12, min: 0, max: 20, menu: 'advanced' },
    crotchSeamCurveStart: 1,
    crotchSeamCurveBend: { pct: 80, min: 45, max: 100, menu: 'advanced' },
    crotchSeamCurveAngle: { deg: 25, min: 0, max: 35, menu: 'advanced' },
    grainlinePosition: { pct: 50, min: 30, max: 60, menu: 'advanced' },
    legBalance: { pct: 57.5, min: 52.5, max: 62.5, menu: 'advanced' },
    waistBalance: { pct: 55, min: 30, max: 90, menu: 'advanced' },

    // Fly
    flyCurve: { pct: 72, min: 50, max: 100, menu: 'style.fly' },
    flyLength: { pct: 45, min: 30, max: 60, menu: 'style.fly' },
    flyWidth: { pct: 15, min: 10, max: 20, menu: 'style.fly' },

    // Ease at ankle
    ankleEase: { pct: 5, min: 0, max: 100, menu: 'style' },
    ankleShape: { pct: 75, min: 0, max: 100, menu: 'style' },

    // Front pockets
    frontPockets: { bool: true, menu: 'construction' },
    pocketOpeningWidth: {
      pct: 80,
      min: 40,
      max: 90,
      menu: (_, mergedOptions) => (mergedOptions.frontPockets ? 'style.frontPockets' : false),
    },
    pocketOpeningHeight: {
      pct: 8,
      min: 4,
      max: 20,
      menu: (_, mergedOptions) => (mergedOptions.frontPockets ? 'style.frontPockets' : false),
    },
    pocketCurveShape: {
      pct: 15,
      min: 5,
      max: 50,
      menu: (_, mergedOptions) => (mergedOptions.frontPockets ? 'style.frontPockets' : false),
    },
    pocketDepth: {
      pct: 70,
      min: 25,
      max: 100,
      menu: (_, mergedOptions) => (mergedOptions.frontPockets ? 'style.frontPockets' : false),
    },

    // Gusset
    gusset: { bool: true, menu: 'construction' },
    gussetBalance: {
      pct: 250,
      min: 100,
      max: 400,
      menu: (_, mergedOptions) => (mergedOptions.gusset ? 'style.gusset' : false),
    },
    gussetSize: {
      pct: 40,
      min: 10,
      max: 60,
      menu: (_, mergedOptions) => (mergedOptions.gusset ? 'style.gusset' : false),
    },
    gussetWidth: {
      pct: 25,
      min: 10,
      max: 50,
      menu: (_, mergedOptions) => (mergedOptions.gusset ? 'style.gusset' : false),
    },
    hemWidth: 1.5,
  },
  draft: draftPaulFront,
}
