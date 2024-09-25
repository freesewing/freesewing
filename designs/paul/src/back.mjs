import { back as titanBack } from '@freesewing/titan'
import { front } from './front.mjs'
import { hidePresets } from '@freesewing/core'
import { safeSplit } from './utils.mjs'

function draftPaulBack({
  points,
  Point,
  paths,
  Path,
  options,
  measurements,
  store,
  macro,
  snippets,
  sa,
  log,
  units,
  utils,
  complete,
  part,
}) {
  paths.titanSeam = paths.seam.clone().setClass('lining help').hide()

  delete points.kneeOutCp1
  delete points.kneeInCp1
  delete points.kneeOutCp2
  delete points.kneeInCp2

  points.forkCp2 = points.fork.shiftFractionTowards(points.forkCp2, 4)

  // Store titan waistband length
  store.set('waistbandBack', points.styleWaistIn.dist(points.styleWaistOut))

  // Adapt bottom leg width based on heel & heel ease
  let quarterHeel = (measurements.heel * (1 + options.ankleEase) * options.legBalance) / 2
  points.floorOut = points.floor.shift(0, quarterHeel)
  points.floorIn = points.floor.shift(180, quarterHeel)

  /*
   * Helper method to draw the outline path
   */
  const drawPath = (yoke = false) => {
    let waistIn = points.styleWaistIn || points.waistIn
    let result = drawOutseam(yoke)
    if (!yoke) {
      result = result
        .curve(points.outCp, points.backDartRightCp, points.backDartRight)
        .noop('dart')
        .line(points.backDartLeft)
        .curve(points.backDartLeftCp, points.cbCp, waistIn)
        .line(points.crossSeamCurveStart)
        .join(paths.crossSeam)
    } else {
      result = result
        .curve_(points.yokeCp2, points.dartTip)
        .curve_(points.yokeCp1, points.yokeIn)
        .join(safeSplit(paths.crossSeam, points.yokeIn).pop())
    }
    if (options.gusset) {
      return safeSplit(result, points.crotchCurveGussetIntersection)[0]
        .join(paths.gussetCut.reverse())
        .join(safeSplit(drawInseam(), points.inseamGussetIntersection)[1])
    } else {
      return result.join(drawInseam())
    }
  }
  const bonusLength = (options.length - 1) * points.fork.dy(points.floor)

  function drawInseam() {
    let inseam = new Path()
      .move(points.fork)
      .curve(
        points.forkCp2,
        points.floorIn.translate(0, points.floorOut.dy(points.kneeIn) * options.ankleShape),
        points.floorIn
      )
    if (options.length > 1) {
      inseam.line(points.floorIn.translate(0, bonusLength))
    }
    if (options.length < 1) {
      inseam = safeSplit(inseam, inseam.intersectsY(points.floor.y + bonusLength)[0])[0]
    }
    return inseam
  }

  function drawOutseam(yoke = false) {
    let outSeam = new Path()
    if (options.length > 1) {
      outSeam.move(points.floorOut.translate(0, bonusLength))
      outSeam.line(points.floorOut)
    } else {
      outSeam.move(points.floorOut)
    }
    outSeam.curve(
      points.floorOut.translate(0, points.floorOut.dy(points.kneeIn) * options.ankleShape),
      points.seatOutCp1,
      points.styleWaistOut
    )
    if (options.length < 1) {
      outSeam = safeSplit(outSeam, outSeam.intersectsY(points.floor.y + bonusLength)[0])[1]
    }
    if (yoke) {
      return safeSplit(outSeam, points.yokeOut)[0]
    }
    return outSeam
  }

  points.grainlineBottom = points.grainlineBottom.clone()
  points.grainlineBottom.y = drawInseam().end().y

  /*
   * Helper method to calculate the inseam delta
   */
  const inseamDelta = () => drawInseam().length() - store.get('frontInseamLength')
  /*
   * Helper method to calculate the outseam delta
   */
  const outseamDelta = () => drawOutseam().length() - store.get('frontOutseamLength')

  // Our style changes will have influenced the inseam & outseam a bit
  // but not enough to do a full slash & rotate. So let's just fix the
  // inseam, and then lengthen/shorten the outseam at the waist
  let dIn = inseamDelta()
  points.floor = points.floor.shift(90, dIn)
  points.floorIn = points.floorIn.shift(90, dIn)
  points.floorOut = points.floorOut.shift(90, dIn)
  points.grainlineBottom = points.grainlineBottom.shift(90, dIn)
  points.styleWaistOut = points.floorOut.shiftOutwards(points.styleWaistOut, outseamDelta() * -1)

  // Mark back pocket
  let base = points.styleWaistIn.dist(points.styleWaistOut)
  let angle = points.styleWaistIn.angle(points.styleWaistOut)
  points.dartCenter = points.styleWaistIn.shiftFractionTowards(
    points.styleWaistOut,
    options.yokeHorizontalCenter
  )
  points.dartPilot = points.dartCenter.shift(angle - 90, 666)
  points.dartTip = utils
    .beamsIntersect(points.dartCenter, points.dartPilot, points.cbSeat, points.seatOut)
    .shiftFractionTowards(points.dartCenter, 1 - options.yokeHeight)

  // // Back dart
  points.tmp1 = points.dartCenter.rotate(options.yokeAngle, points.dartTip)
  points.tmp2 = points.dartCenter.rotate(-options.yokeAngle, points.dartTip)
  points.backDartLeft = points.dartTip.shiftFractionTowards(points.tmp1, 1.05)
  points.backDartRight = points.dartTip.shiftFractionTowards(points.tmp2, 1.05)
  let newBase =
    points.styleWaistIn.dist(points.backDartLeft) + points.styleWaistOut.dist(points.backDartRight)
  let delta = base - newBase
  // Adapt waist to new darted reality
  for (let p of ['styleWaistIn', 'crossSeamCurveStart', 'crossSeamCurveCp1']) {
    points[p] = points[p].shift(angle + 180, delta / 2)
  }
  points.styleWaistOut = points.styleWaistOut.shift(angle, delta / 2)

  // Keep the seat control point vertically between the (lowered) waist and seat line
  points.seatOutCp2.y = points.styleWaistOut.y + points.styleWaistOut.dy(points.seatOut) / 2

  // Shape waist
  let dist = points.styleWaistOut.dist(points.dartCenter) / 3
  points.cbCp = points.styleWaistIn
    .shiftTowards(points.crossSeamCurveStart, dist)
    .rotate(90, points.styleWaistIn)
  points.backDartLeftCp = points.backDartLeft
    .shiftTowards(points.dartTip, dist)
    .rotate(-90, points.backDartLeft)
  points.backDartRightCp = points.backDartRight
    .shiftTowards(points.dartTip, dist)
    .rotate(90, points.backDartRight)
  points.outCp = points.styleWaistOut
    .shiftTowards(points.seatOut, dist)
    .rotate(-90, points.styleWaistOut)

  // store.set(
  //   'waistbandBack',
  //   new Path()
  //     .move(points.styleWaistIn)
  //     .curve(points.cbCp, points.backDartLeftCp, points.backDartLeft)
  //     .length() +
  //     new Path()
  //       .move(points.backDartRight)
  //       .curve(points.backDartRightCp, points.outCp, points.styleWaistOut)
  //       .length()
  // )

  store.set('legWidthBack', points.floorIn.dist(points.floorOut))

  paths.crossSeam = new Path()
    .move(points.styleWaistIn)
    .line(points.crossSeamCurveStart)
    .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
    .hide()

  let extraBack = 0
  try {
    points.yokeOut = drawOutseam()
      .reverse()
      .shiftAlong(
        points.styleWaistOut.dist(points.seatOut) * options.yokeHeight * options.yokeBalance
      )
  } catch {
    points.yokeOut = drawOutseam().start()
  }

  points.yokePilotTarget = points.yokeOut.rotate(180 + options.yokeAngle, points.dartTip)
  points.yokePilotTarget = points.dartTip.shiftFractionTowards(points.yokePilotTarget, 66)
  paths.yokePilot = new Path()
    .move(points.dartTip)
    .line(points.yokePilotTarget)
    .addClass('lining help')
    .hide()
  const intersections = paths.yokePilot.intersects(paths.crossSeam)
  points.yokeIn = intersections.length === 0 ? points.styleWaistIn : intersections.pop()
  let yokeCpDist = points.yokeOut.dist(points.yokeIn) * 0.2
  let yokeCpAngle = points.yokeOut.angle(points.yokeIn)
  points.yokeCp1 = points.dartTip.shift(yokeCpAngle, yokeCpDist)
  points.yokeCp2 = points.dartTip.shift(yokeCpAngle + 180, yokeCpDist)
  points.yokeOutRotated = points.yokeOut.rotate(options.yokeAngle * 2, points.dartTip)
  points.styleWaistOutRotated = points.styleWaistOut.rotate(options.yokeAngle * 2, points.dartTip)

  paths.yokeJoin = new Path()
    .move(points.yokeOut)
    .curve_(points.yokeCp2, points.dartTip)
    .curve_(points.yokeCp1, points.yokeIn)
    .hide()
  store.set('yokeBottom', paths.yokeJoin.length())

  points.inseamGussetIntersection = drawInseam().shiftAlong(store.get('innerGussetLegSize'))
  points.crotchCurveGussetIntersection = paths.crossSeam
    .reverse()
    .shiftAlong(store.get('gussetFrontWidth') * options.gussetBalance)
  paths.gussetCut = new Path()
    .move(points.inseamGussetIntersection)
    .line(points.crotchCurveGussetIntersection)
    .setClass('mark')
    .hide()
  store.set(
    'outerBackGussetLegSize',
    points.inseamGussetIntersection.dist(points.crotchCurveGussetIntersection)
  )
  store.set('gussetBackWidth', points.fork.dist(points.crotchCurveGussetIntersection))

  points.pocketCenter = paths.yokeJoin
    .shiftFractionAlong(0.6)
    .translate(0, points.yokeIn.dy(points.fork) / 2)

  points.pocketTopIn = points.pocketCenter.shiftFractionTowards(points.yokeIn, 0.75)
  points.pocketTopOut = points.pocketCenter.shiftFractionTowards(points.yokeOut, 0.6)
  points.pocketTopCenter = points.pocketTopIn.shiftFractionTowards(points.pocketTopOut, 0.5)
  let topAngle = points.pocketTopIn.angle(points.pocketTopOut)
  const maxAngle = 345
  if (topAngle > 180 && topAngle < maxAngle) {
    topAngle = maxAngle
    points.pocketTopIn = points.pocketTopCenter.shift(
      180 + topAngle,
      points.pocketTopIn.dist(points.pocketTopCenter)
    )
    points.pocketTopOut = points.pocketTopCenter.shift(
      topAngle,
      points.pocketTopIn.dist(points.pocketTopCenter)
    )
  }
  const size = points.pocketTopIn.dist(points.pocketTopOut)
  points.pocketBottomCenter = points.pocketTopCenter.shift(topAngle - 90, size * 1.1)
  points.pocketBottomOut = points.pocketBottomCenter.shift(topAngle + 25, size * 0.45)
  points.pocketBottomIn = points.pocketBottomCenter.shift(180 + topAngle - 25, size * 0.45)
  const dist1 = points.yokeIn.dist(points.pocketTopIn)
  points.pocketBottomIn = points.pocketBottomIn
    .shiftTowards(points.crossSeamCurveCp1, options.backPocketAsymmetry * dist1)
    .shiftFractionTowards(points.fork, options.backPocketAsymmetry * 0.3)

  paths.backPocketBase = new Path()
    .move(points.pocketTopIn)
    .line(points.pocketBottomIn)
    .line(points.pocketBottomCenter)
    .line(points.pocketBottomOut)
    .line(points.pocketTopOut)
    .setClass('various dashed')
    .hide()

  if (sa) {
    paths.backPocketSa = macro('sa', {
      paths: [
        paths.backPocketBase,
        {
          p: macro('hem', {
            path1: paths.backPocketBase,
            path2: paths.backPocketBase,
            hemWidth: sa,
          }),
          offset: 0,
        },
      ],
    }).setClass('various sa')
  }

  paths.backPocket = paths.backPocketBase.clone().unhide().close()

  if (!complete || !options.backPockets) {
    paths.backPocket.hide()
    if (sa) paths.backPocketSa.hide()
  }

  // Anchor for sampling/grid
  // This breaks the samples for reason not clear. See #
  // points.anchor = points.fork.clone()

  // paths.template = drawPath().addClass('help')
  paths.saBase = drawPath(true)
  paths.seam = paths.saBase
    .insop('dart', new Path().line(points.dartTip))
    .close()
    .attr('class', 'fabric')
  paths.saBase.hide()

  if (sa)
    paths.sa = macro('sa', {
      paths: [
        'saBase',
        {
          p: macro('hem', {
            path1: drawInseam(),
            path2: drawOutseam(),
            hemWidth: sa * options.hemWidth,
            lastFoldWidth: sa * options.hemWidth,
          }),
          offset: 0,
        },
      ],
    })

  // Sanity check, to make sure inseams and outseams match front and back
  const backInseamLength = drawInseam().length()
  const frontInseamLength = store.get('frontInseamLength')
  const inseamDiff = frontInseamLength - backInseamLength
  let inseamDesc = 'Paul back inseam is longer than front'
  if (inseamDiff > 0) inseamDesc = 'Paul front inseam is longer than back'
  if (Math.abs(inseamDiff) > 1) {
    log.warn(inseamDesc + ' by ' + utils.round(Math.abs(inseamDiff)) + ' mm')
    log.debug('Paul frontInseam: ' + utils.round(frontInseamLength).toString())
    log.debug('Paul backInseam: ' + utils.round(backInseamLength).toString())
  }
  const backOutseamLength = drawOutseam().length()
  const frontOutseamLength = store.get('frontOutseamLength')
  const outseamDiff = frontOutseamLength - backOutseamLength
  let outseamDesc = 'Paul back outseam is longer than front'
  if (outseamDiff > 0) outseamDesc = 'Paul front outseam is longer than back'
  if (Math.abs(outseamDiff) > 1) {
    log.warn(outseamDesc + ' by ' + utils.round(Math.abs(outseamDiff)) + ' mm')
    log.debug('Paul frontOutseam: ' + utils.round(frontOutseamLength).toString())
    log.debug('Paul backOutseam: ' + utils.round(backOutseamLength).toString())
  }

  const grainlineTopTmp = paths.yokeJoin.intersectsX(points.grainlineBottom.x).pop()
  if (grainlineTopTmp) {
    points.grainlineTop = grainlineTopTmp
  }
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.titleAnchor = new Point(points.knee.x, points.fork.y)
  macro('title', {
    at: points.titleAnchor,
    nr: 1,
    title: 'back',
  })

  // Logo
  delete snippets.logo

  // Scalebox
  macro('rmscalebox')

  // Notches
  macro('sprinkle', {
    snippet: 'bnotch',
    on: ['inseamGussetIntersection'],
  })

  log.info(
    `Inseam height: ${units(points.fork.dy(points.floorIn))} | ` +
      `Inseam (curve) length: ${units(drawInseam().length())} | ` +
      `Outseam length (excl. waistband): ${units(drawOutseam().length())} | ` +
      `Cross seam back: ${units(paths.crossSeam.length())} | ` +
      `Cross seam front: ${units(store.get('crotchSeamLength'))} | ` +
      `Waist: ${units((store.get('waistbandBack') + store.get('waistbandFront')) * 2)} | ` +
      `Bottom leg width: ${units((store.get('legWidthBack') + store.get('legWidthFront')) / 2)}`
  )

  // Dimensions
  macro('rmad')
  delete paths.hint

  macro('hd', {
    id: 'wHem',
    from: points.floorIn,
    to: points.floorOut,
    y: points.floorIn.y - 10,
  })

  macro('pd', {
    id: 'pOutseam',
    path: drawOutseam(true),
  })
  macro('hd', {
    id: 'wTop',
    from: points.yokeIn,
    to: points.yokeOut,
    y: points.yokeOut.y + 10,
  })
  macro('pd', {
    id: 'pYokeJoin',
    path: paths.yokeJoin.reverse(),
    d: -10,
  })
  if (options.gusset) {
    macro('vd', {
      id: 'vGusset',
      from: points.inseamGussetIntersection,
      to: points.crotchCurveGussetIntersection,
      x: points.crotchCurveGussetIntersection.x - 10,
    })
    macro('vd', {
      id: 'vInseam',
      from: points.inseamGussetIntersection,
      to: points.floorIn,
      x: points.inseamGussetIntersection.x - 10,
    })
    macro('vd', {
      id: 'vCrotch',
      from: points.crotchCurveGussetIntersection,
      to: points.yokeIn,
      x: points.crotchCurveGussetIntersection.x - 10,
    })
  } else {
    macro('vd', {
      id: 'vInseam',
      from: points.fork,
      to: points.floorIn,
      x: points.fork.x - 10,
    })
    macro('vd', {
      id: 'vCrotch',
      from: points.fork,
      to: points.styleWaistIn,
      x: points.fork.x - 10,
    })
  }

  return part
}

export const back = {
  name: 'paul.back',
  from: titanBack,
  after: front,
  hide: hidePresets.HIDE_TREE,
  options: {
    backPockets: { bool: true, menu: 'construction' },
    yokeHorizontalCenter: { pct: 55, min: 48, max: 62, menu: 'style.yoke' },
    yokeAngle: { deg: 8.66, min: 0, max: 15, menu: 'style.yoke' },
    yokeHeight: { pct: 25, min: 15, max: 75, menu: 'style.yoke' },
    yokeBalance: { pct: 80, min: 50, max: 180, menu: 'style.yoke' },
    backPocketAsymmetry: { pct: 0, min: 0, max: 50, menu: 'style.backPockets' },
  },
  draft: draftPaulBack,
}
