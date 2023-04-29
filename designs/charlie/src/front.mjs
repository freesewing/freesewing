import { elastics } from '@freesewing/snapseries'
import { pctBasedOn, hidePresets } from '@freesewing/core'
import { front as titanFront } from '@freesewing/titan'

function draftCharlieFront({
  points,
  Point,
  paths,
  Path,
  options,
  complete,
  paperless,
  measurements,
  store,
  macro,
  utils,
  snippets,
  Snippet,
  sa,
  log,
  part,
}) {
  // Helper method to draw the outseam path
  const drawOutseam = () =>
    new Path()
      .move(points.slantTop)
      .line(points.slantCurveStart)
      .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
      .join(sideSeam.split(points.slantCurveEnd).pop())

  // Helper method to draw the outline path
  const drawPath = () => {
    let outseam = drawOutseam()
    return frontInseamPath.clone().join(crotchCurve).join(outseam)
  }

  // Helper object holding the Titan side seam path
  const sideSeam =
    points.waistOut.x < points.seatOut.x
      ? new Path()
          .move(points.styleWaistOut)
          .curve(points.seatOut, points.kneeOutCp1, points.kneeOut)
          .line(points.floorOut)
      : new Path()
          .move(points.styleWaistOut)
          ._curve(points.seatOutCp1, points.seatOut)
          .curve(points.seatOutCp2, points.kneeOutCp1, points.kneeOut)
          .line(points.floorOut)

  // Helper object holding the inseam path
  const frontInseamPath = new Path()
    .move(points.floorIn)
    .line(points.kneeIn)
    .curve(points.kneeInCp2, points.forkCp1, points.fork)

  // Helper object holding the crotchCurve
  const crotchCurve = new Path()
    .move(points.fork)
    .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
    .line(points.styleWaistIn)

  // Mark the bottom of the fly J-seam
  const flyBottom = utils.curveIntersectsY(
    points.crotchSeamCurveStart,
    points.crotchSeamCurveCp2,
    points.crotchSeamCurveCp1,
    points.fork,
    points.cfSeat.shiftFractionTowards(points.crotchSeamCurveCp2, options.flyLength).y
  )

  if (flyBottom) points.flyBottom = flyBottom
  else log.error('Unable to locate the fly bottom. This draft will fail.')

  // Define Fly components
  points.flyExtensionBottom = utils.curveIntersectsY(
    points.crotchSeamCurveStart,
    points.crotchSeamCurveCp2,
    points.crotchSeamCurveCp1,
    points.fork,
    points.cfSeat.shiftFractionTowards(points.crotchSeamCurveCp2, options.flyLength * 1.5).y
  )

  points.flyTop = points.styleWaistOut.shiftFractionTowards(
    points.styleWaistIn,
    1 - options.flyWidth
  )

  points.flyCorner = points.flyTop.shift(
    points.styleWaistIn.angle(points.crotchSeamCurveStart),
    points.styleWaistIn.dist(points.flyBottom)
  )
  points.flyCurveStart = points.flyCorner.shiftTowards(
    points.flyTop,
    points.flyBottom.dist(points.flyCorner)
  )
  points.flyCurveCp1 = points.flyBottom.shiftFractionTowards(points.flyCorner, options.flyCurve)
  points.flyCurveCp2 = points.flyCurveStart.shiftFractionTowards(points.flyCorner, options.flyCurve)

  let topStitchDist = (1 - options.flyWidth) * 8

  points.flyTopSeamline = points.flyTop.shiftTowards(points.styleWaistIn, topStitchDist)

  points.flyBottomSeamLine = utils.curveIntersectsY(
    points.crotchSeamCurveStart,
    points.crotchSeamCurveCp2,
    points.crotchSeamCurveCp1,
    points.fork,
    points.flyBottom.shiftTowards(points.crotchSeamCurveStart, topStitchDist).y
  )

  let waistlineAngle = points.flyTop.angle(points.flyTopSeamline)
  points.flyCurveSeamLine = points.flyCurveStart.shift(waistlineAngle, topStitchDist)

  let curveOffset = (topStitchDist * Math.PI) / 2 // lets the curve scale nicely
  points.flyCurveSeamCp1 = points.flyCurveCp1.shift(
    points.cfSeat.angle(points.crotchSeamCurveStart),
    curveOffset
  )
  points.flyCurveSeamCp2 = points.flyCurveCp2.shift(waistlineAngle, curveOffset)

  paths.flyFacingLine = new Path()
    .move(points.flyTop)
    .line(points.flyCurveStart)
    .curve(points.flyCurveCp2, points.flyCurveCp1, points.flyBottom)
    .setClass('lining dashed')

  let JseamCurve = new Path()
    .move(points.flyCurveSeamLine)
    .curve(points.flyCurveSeamCp2, points.flyCurveSeamCp1, points.flyBottomSeamLine)
  paths.completeJseam = new Path()
    .move(points.flyTopSeamline)
    .join(JseamCurve)
    .setClass('dashed')
    .addText('jseamStitchLine', 'center text-sm')

  paths.flyRightLegExtension = crotchCurve
    .clone()
    .split(points.flyBottom)[1]
    .offset(topStitchDist)
    .line(points.styleWaistIn)
    .reverse()
    .line(points.flyExtensionBottom)
    .reverse()
    .setClass('fabric')
    .addText('rightLegSeamline', 'center fill-note text-sm')

  // Construct pocket slant
  points.slantTop = points.styleWaistIn.shiftFractionTowards(
    points.styleWaistOut,
    1 - options.frontPocketSlantWidth
  )
  points.slantLowest = sideSeam.intersectsY(points.fork.y).pop()
  store.set('slantWidth', points.styleWaistOut.dist(points.slantTop))
  store.set(
    'slantLength',
    sideSeam.split(points.slantLowest).shift().length() * options.frontPocketSlantDepth
  )
  points.slantBottom = sideSeam.shiftAlong(store.get('slantLength'))
  points.slantCurveStart = points.slantBottom.shiftFractionTowards(
    points.slantTop,
    options.frontPocketSlantRound
  )
  points.slantCurveEnd = sideSeam.shiftAlong(
    points.slantBottom.dist(points.slantCurveStart) + store.get('slantLength')
  )
  points.slantCurveCp1 = points.slantBottom.shiftFractionTowards(
    points.slantCurveStart,
    options.frontPocketSlantBend
  )
  points.slantCurveCp2 = sideSeam.shiftAlong(
    points.slantBottom.dist(points.slantCurveCp1) + store.get('slantLength')
  )

  // Construct pocket bag
  points.pocketbagTopRight = points.slantTop.shiftFractionTowards(
    points.styleWaistIn,
    options.frontPocketWidth
  )
  points.pocketbagBottomRight = points.pocketbagTopRight.shift(
    points.slantTop.angle(points.pocketbagTopRight) - 90,
    points.styleWaistIn.dy(points.fork) * options.frontPocketDepth * 1.5
  )
  points.pocketbagBottomCp2 = sideSeam.intersectsY(points.pocketbagBottomRight.y).pop()
  points.pocketbagBottom = points.pocketbagBottomRight.shiftFractionTowards(
    points.pocketbagBottomCp2,
    0.5
  )
  points.pocketbagBottomCp1 = points.slantCurveCp2.rotate(180, points.slantCurveEnd)

  // Construct facing boundary
  points.pocketFacingTop = points.slantTop.shiftFractionTowards(
    points.pocketbagTopRight,
    options.frontPocketFacing
  )
  points.facingDirection = points.slantCurveStart.shift(
    0,
    points.slantTop.dist(points.pocketFacingTop)
  )

  // YOLO
  points.pocketFacingBottom = new Path()
    .move(points.pocketFacingTop)
    .line(points.pocketFacingTop.shiftFractionTowards(points.facingDirection, 4))
    .intersects(
      new Path()
        .move(points.slantCurveStart)
        .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
        .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
        .line(points.pocketbagBottomRight)
    )
    .pop()

  // Anchor for sampling/grid
  points.anchor = points.fork.clone()

  // Draw path
  paths.seam = drawPath().close().attr('class', 'fabric')

  // Store waistband length
  store.set('waistbandFront', points.styleWaistIn.dist(points.slantTop))
  store.set('waistbandFly', points.styleWaistIn.dist(points.flyTop))
  store.set('legWidthFront', points.floorIn.dist(points.floorOut))

  // Store inseam and outseam lengths
  store.set('frontInseamLength', frontInseamPath.length())
  store.set('frontOutseamLength', drawOutseam().length())

  if (complete) {
    points.titleAnchor = new Point(points.knee.x, points.fork.y)
    macro('title', {
      at: points.titleAnchor,
      nr: 2,
      title: 'front',
    })
    snippets.logo = new Snippet('logo', points.titleAnchor.shiftFractionTowards(points.knee, 0.666))
    points.topPleat = utils.beamsIntersect(
      points.styleWaistIn,
      points.styleWaistOut,
      points.knee,
      points.grainlineBottom
    )
    points.slantBottomNotch = new Path()
      .move(points.slantCurveStart)
      .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
      .intersectsY(points.slantBottom.y)
      .pop()
    points.slantTopNotch = points.slantTop.shiftFractionTowards(points.slantCurveStart, 0.1)
    store.set('slantTopNotchDistance', points.slantTop.dist(points.slantTopNotch))
    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'slantBottomNotch',
        'slantTopNotch',
        'topPleat',
        'grainlineBottom',
        'flyBottom',
        'flyExtensionBottom',
        'flyBottomSeamLine',
      ],
    })

    paths.pocketBag = new Path()
      .move(points.slantTop)
      .line(points.slantCurveStart)
      .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
      .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
      .line(points.pocketbagBottomRight)
      .line(points.pocketbagTopRight)
      .move(points.pocketFacingTop)
      .line(points.pocketFacingBottom)
      .setClass('lining dashed')

    // Bartack
    macro('bartack', {
      anchor: points.slantTopNotch,
      angle: points.slantTopNotch.angle(points.slantCurveStart) + 90,
      length: sa ? sa / 1.5 : 7.5,
      suffix: 'slantTop',
    })
    macro('bartack', {
      anchor: points.slantBottomNotch,
      length: sa ? sa / 2 : 5,
      suffix: 'slantBottom',
    })
    // This is too small to do on doll-sized patterns
    if (measurements.waist > 200) {
      macro('bartackFractionAlong', {
        path: JseamCurve.reverse(),
        start: 0,
        end: 0.1,
        suffix: 'stom',
      })
    }

    if (sa) {
      // Draw the main front seam allowance
      paths.sa = drawPath()
        .offset(sa)
        .join(
          new Path()
            .move(points.floorOut)
            .line(points.floorIn)
            .offset(sa * 6)
        )
        .close()
        .trim()
        .setClass('fabric sa')

      // Draw the right leg fly extension
      let FlyRightLegExtensionSa = paths.flyRightLegExtension.offset(sa)
      paths.flyRightLegExtensionSa = FlyRightLegExtensionSa.split(
        FlyRightLegExtensionSa.intersects(paths.sa)[0]
      )[1]
        .setClass('dotted')
        .addText('rightLegSeamAllowance', 'center fill-note text-sm')
    }

    if (paperless) {
      // Clean up paperless dimensions
      macro('rmad')
      delete paths.hint

      macro('hd', {
        from: points.grainlineBottom,
        to: points.floorIn,
        y: points.floorIn.y - 15,
      })
      macro('hd', {
        from: points.floorOut,
        to: points.grainlineBottom,
        y: points.floorIn.y - 15,
      })
      macro('hd', {
        from: points.floorOut,
        to: points.floorIn,
        y: points.floorIn.y - 30,
      })

      let y = points.styleWaistIn.y - sa
      macro('hd', {
        from: points.grainlineFrom,
        to: points.flyTop,
        y: y - 15,
      })
      macro('hd', {
        from: points.grainlineFrom,
        to: points.styleWaistIn,
        y: y - 30,
      })
      macro('hd', {
        from: points.grainlineFrom,
        to: points.flyBottom,
        y: y - 45,
      })
      macro('hd', {
        from: points.grainlineFrom,
        to: points.flyExtensionBottom,
        y: y - 60,
      })
      macro('hd', {
        from: points.grainlineFrom,
        to: points.fork,
        y: y - 75,
      })

      macro('hd', {
        from: points.pocketFacingTop,
        to: points.grainlineFrom,
        y: y - 15,
      })
      macro('hd', {
        from: points.slantTop,
        to: points.grainlineFrom,
        y: y - 30,
      })
      macro('hd', {
        from: points.slantBottomNotch,
        to: points.grainlineFrom,
        y: y - 45,
      })

      let x = points.fork.x + sa
      macro('vd', {
        from: points.floorIn,
        to: points.fork,
        x: x + 15,
      })
      macro('vd', {
        from: points.fork,
        to: points.flyExtensionBottom,
        x: x + 15,
      })
      macro('vd', {
        from: points.fork,
        to: points.flyBottom,
        x: x + 30,
      })
      macro('vd', {
        from: points.fork,
        to: points.slantTop,
        x: x + 45,
      })
      macro('vd', {
        from: points.fork,
        to: points.styleWaistIn,
        x: x + 60,
      })
    }
  }

  return part
}

export const front = {
  name: 'charlie.front',
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
  ],
  options: {
    // Constants (from Titan)
    titanPaperless: true,
    fitCrossSeam: true,
    fitCrossSeamFront: true,
    fitCrossSeamBack: true,
    fitGuides: false,
    // Lock titan options
    fitKnee: true,
    // Charlie constants
    waistbandReduction: 0.25, // See src/index.js
    waistbandFactor: 0.1,

    // Fit (from Titan)
    waistEase: { pct: 1, min: 0, max: 5, menu: 'fit' },
    seatEase: { pct: 5, min: 0, max: 10, menu: 'fit' },
    kneeEase: { pct: 15, min: 10, max: 30, menu: 'fit' },

    // Style (from Titan)
    waistHeight: { pct: -4, min: -15, max: 40, menu: 'style' },
    waistbandWidth: {
      pct: 3,
      min: 1,
      max: 6,
      snap: elastics,
      ...pctBasedOn('waistToFloor'),
      menu: 'style',
    },
    //waistbandWidth: { pct: 3.5, min: 2, max: 5 },
    lengthBonus: { pct: 2, min: -20, max: 10, menu: 'style' },
    crotchDrop: { pct: 2, min: 0, max: 15, menu: 'style' },

    // Advanced (from Titan)
    crossSeamCurveStart: { pct: 85, min: 60, max: 100, menu: 'advanced' },
    crossSeamCurveBend: { pct: 65, min: 45, max: 85, menu: 'advanced' },
    crossSeamCurveAngle: { deg: 12, min: 0, max: 20, menu: 'advanced' },
    crotchSeamCurveStart: { pct: 80, min: 60, max: 95, menu: 'advanced' },
    crotchSeamCurveBend: { pct: 80, min: 45, max: 100, menu: 'advanced' },
    crotchSeamCurveAngle: { deg: 25, min: 0, max: 35, menu: 'advanced' },
    grainlinePosition: { pct: 50, min: 30, max: 60, menu: 'advanced' },
    legBalance: { pct: 57.5, min: 52.5, max: 62.5, menu: 'advanced' },
    waistBalance: { pct: 55, min: 30, max: 90, menu: 'advanced' },

    // Front pockets
    frontPocketSlantDepth: { pct: 85, min: 70, max: 100, menu: 'pockets.frontpockets' },
    frontPocketSlantWidth: { pct: 25, min: 15, max: 35, menu: 'pockets.frontpockets' },
    frontPocketSlantRound: { pct: 30, min: 5, max: 50, menu: 'pockets.frontpockets' },
    frontPocketSlantBend: { pct: 25, min: 5, max: 50, menu: 'pockets.frontpockets' },
    frontPocketWidth: { pct: 55, min: 45, max: 65, menu: 'pockets.frontpockets' },
    frontPocketDepth: { pct: 100, min: 85, max: 110, menu: 'pockets.frontpockets' },
    frontPocketFacing: { pct: 45, min: 25, max: 65, menu: 'pockets.frontpockets' },

    // Fly
    flyCurve: { pct: 72, min: 50, max: 100, menu: 'advanced.fly' },
    flyLength: { pct: 45, min: 30, max: 60, menu: 'advanced.fly' },
    flyWidth: { pct: 15, min: 10, max: 20, menu: 'advanced.fly' },
  },
  draft: draftCharlieFront,
}
