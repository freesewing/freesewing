import { frontBase } from './frontbase.mjs'
import { backBase } from './backbase.mjs'
import {
  frontOverlap,
  innerPocketPlacement,
  innerPocketWidth,
  innerPocketDepth,
  innerPocketWeltHeight,
  frontCutawayAngle,
  frontCutawayStart,
  frontCutawayEnd,
  hemRadius,
  chestPocketDepth,
  chestPocketWidth,
  chestPocketPlacement,
  chestPocketAngle,
  chestPocketWeltSize,
  lapelStart,
  collarHeight,
  collarNotchDepth,
  collarNotchAngle,
  collarNotchReturn,
  chestShaping,
  buttons,
  buttonLength,
  chestShapingMax,
  lapelReduction,
} from './options.mjs'

function jaegerFront({
  sa,
  snippets,
  Snippet,
  utils,
  store,
  complete,
  points,
  measurements,
  options,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  // Front closure overlap
  points.neckEdge = points.cfNeck.shift(180, measurements.chest * options.frontOverlap)
  points.hemEdge = new Point(points.neckEdge.x, points.cfHem.y)

  // Chest pocket
  points.chestPocketAnchor = new Point(
    points.split.x * options.chestPocketPlacement,
    points.armholePitchCp1.y
  )
  let width = points.split.x * options.chestPocketWidth
  let height = width * options.chestPocketWeltSize

  points.chestPocketTop = points.chestPocketAnchor.shift(90, height / 2)
  points.chestPocketBottom = points.chestPocketAnchor.shift(-90, height / 2)
  points.chestPocketTopLeft = points.chestPocketTop.shift(180 + options.chestPocketAngle, width / 2)
  points.chestPocketTopRight = points.chestPocketTopLeft.rotate(180, points.chestPocketTop)
  points.chestPocketBottomLeft = points.chestPocketBottom.shift(
    180 + options.chestPocketAngle,
    width / 2
  )
  points.chestPocketBottomRight = points.chestPocketBottomLeft.rotate(180, points.chestPocketBottom)
  store.set('chestPocketWidth', width)
  store.set('chestPocketWeltHeight', height)

  // Inner pocket
  points.innerPocketAnchor = new Point(
    points.hips.x * options.innerPocketPlacement,
    points.dartTop.y
  )
  width = points.hips.x * options.innerPocketWidth
  const weltHeight = width * options.innerPocketWeltHeight
  points.innerPocketTop = points.innerPocketAnchor.shift(90, weltHeight)
  points.innerPocketBottom = points.innerPocketAnchor.shift(-90, weltHeight)
  points.innerPocketLeft = points.innerPocketAnchor.shift(180, width / 2)
  points.innerPocketRight = points.innerPocketLeft.flipX(points.innerPocketAnchor)
  points.innerPocketTopLeft = points.innerPocketLeft.shift(90, weltHeight)
  points.innerPocketTopRight = points.innerPocketTopLeft.flipX(points.innerPocketAnchor)
  points.innerPocketBottomLeft = points.innerPocketLeft.shift(-90, weltHeight)
  points.innerPocketBottomRight = points.innerPocketBottomLeft.flipX(points.innerPocketAnchor)
  store.set('innerPocketWeltHeight', weltHeight)
  store.set('innerPocketWidth', width)

  // Slash & spread chest. This is one of those things that's simpler on paper
  points.splitEdge = new Point(points.neckEdge.x, points.split.y)

  const rotate = [
    'splitEdge',
    'neckEdge',
    'cfNeck',
    'cfNeckCp1',
    'neckCp2Front',
    'neck',
    'shoulder',
    'shoulderCp1',
    'armholePitchCp2',
    'armholePitch',
    'armholePitchCp1',
    'armholeHollowCp2',
    'armholeHollow',
    'armholeHollowCp1',
    'splitCp2',
    'frontNeckCpEdge',
  ]
  for (let p of rotate) {
    points[p] = points[p].rotate(options.chestShapingMax * options.chestShaping * -1, points.split)
  }

  // Lapel break point and cutaway point
  points.lapelBreakPoint = new Point(points.hemEdge.x, points.dartTop.y * (1 + options.lapelStart))
  points.cutawayPoint = points.lapelBreakPoint.shift(
    -90,
    points.lapelBreakPoint.dy(points.hemEdge) * options.buttonLength
  )

  // Lapel roll line
  const rollHeight = measurements.neck * options.rollLineCollarHeight
  points.shoulderRoll = points.shoulder.shiftOutwards(points.neck, rollHeight)
  const collarHeight = measurements.neck * options.collarHeight
  points.shoulderRollCb = points.lapelBreakPoint.shiftOutwards(
    points.shoulderRoll,
    store.get('backCollarLength')
  )
  let angle = points.shoulderRoll.angle(points.shoulderRollCb)
  points.collarCbHelp = points.shoulderRollCb.shift(angle - 90, rollHeight)
  points.collarCbBottom = points.collarCbHelp.shift(angle - 90, rollHeight)
  points.collarCbTop = points.collarCbHelp.shift(angle + 90, collarHeight * 2 - rollHeight)

  // Notch
  points.notchMax = utils.beamsIntersect(
    points.lapelBreakPoint,
    points.shoulderRoll,
    points.neckEdge,
    points.frontNeckCpEdge
  )
  points.lapelTip = utils.beamsIntersect(
    // Keeps lapel straight despite chest shaping
    points.hemEdge,
    points.lapelBreakPoint,
    points.notchMax,
    points.cfNeckCp1
  )
  points.notchEdge = points.lapelTip.shiftFractionTowards(points.notchMax, options.lapelReduction)
  points.notch = points.cfNeck.shiftFractionTowards(points.notchMax, options.collarNotchDepth)
  points.notchTip = points.neckEdge.rotate(options.collarNotchAngle * -1, points.notch)
  points.notchTip = points.notch.shiftFractionTowards(points.notchTip, options.collarNotchReturn)
  points.notchTipCp = points.notchTip.shift(
    points.notch.angle(points.notchTip) - 90,
    points.notchTip.dist(points.collarCbTop) / 4
  )
  points.collarCbTopCp = points.collarCbTop.shift(
    points.collarCbBottom.angle(points.collarCbTop) + 90,
    points.notchTip.dist(points.collarCbTop) / 4
  )

  // Redraw front neck line
  points.lapelStraightEnd = new Point(points.lapelBreakPoint.x, points.splitEdge.y)
  points.lapelStraightEndCp1 = points.lapelStraightEnd.shift(
    90,
    points.neckEdge.dy(points.lapelStraightEnd) * 0.7
  )
  angle = points.notch.angle(points.neck)
  points._dir1 = points.notch.shift(angle / 2, 50)
  points._dir2 = points.neck.shift(angle * 1.5 + 180, 50)
  points.collarCorner = points.notch.shiftFractionTowards(points.notchMax, 1.6)

  // Cut rollline back to collar line
  const shoulderRoll = utils.linesIntersect(
    points.shoulderRoll,
    points.lapelBreakPoint,
    points.notch,
    points.collarCorner
  )
  // FIXME: Does this ever happen?
  if (!shoulderRoll) throw new Error('Roll line does not intersect with notch/collarCorner line')
  else points.shoulderRoll = shoulderRoll

  // Round the hem
  points.hemRoundTarget = new Point(points.hem.x, points.cfHem.y)
  points.roundStart = points.cutawayPoint
    .shiftFractionTowards(points.hemEdge, options.frontCutawayStart)
    .rotate(options.frontCutawayAngle, points.cutawayPoint)
  points.roundEnd = points.hemDropEnd.shiftFractionTowards(
    points.cfHem,
    1 - options.frontCutawayEnd
  )
  points.roundVia = utils.beamsIntersect(
    points.cutawayPoint,
    points.roundStart,
    points.hemDropEnd,
    points.cfHem
  )
  points.roundCp1 = points.roundStart.shiftFractionTowards(points.roundVia, options.hemRadius)
  points.roundCp2 = points.roundEnd.shiftFractionTowards(points.roundVia, options.hemRadius)
  const cpDist = points.cutawayPoint.dy(points.roundStart) / 3
  points.cutawayPointCp2 = points.cutawayPoint.shift(-90, cpDist)
  points.roundStartCp1 = points.roundCp1.shiftOutwards(points.roundStart, cpDist)

  // Facing/lining boundary
  points.facingTop = points.neck.shiftFractionTowards(points.shoulder, 0.2)
  points.facingBottom = new Path()
    .move(points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)
    .line(points.hem)
    .intersectsX(points.dartLeft.x * 0.7)
    .pop()

  // Inner pocket facing extension (ipfe)
  points.ipfeAnchor = utils.beamsIntersect(
    points.facingTop,
    points.facingBottom,
    points.innerPocketLeft,
    points.innerPocketRight
  )
  const ipfeHeight = points.innerPocketTopRight.dy(points.innerPocketBottomRight) * 5
  points.ipfeTopRight = points.innerPocketRight.shift(90, ipfeHeight / 2)
  points.ipfeBottomRight = points.ipfeTopRight.flipY(points.innerPocketRight)
  points.ipfeEdge = points.innerPocketRight.shift(0, ipfeHeight / 2)
  points.ipfeViaTopRight = new Point(points.ipfeEdge.x, points.ipfeTopRight.y)
  points.ipfeViaBottomRight = points.ipfeViaTopRight.flipY(points.innerPocketRight)
  // Macros will return the auto-generated IDs
  const ids1 = {
    ipfeBottomRight: macro('round', {
      id: 'ipfeBottomRight',
      from: points.ipfeBottomRight,
      to: points.ipfeEdge,
      via: points.ipfeViaBottomRight,
      radius: ipfeHeight / 2,
    }),
    ipfeTopRight: macro('round', {
      id: 'ipfeTopRight',
      from: points.ipfeTopRight,
      to: points.ipfeEdge,
      via: points.ipfeViaTopRight,
      radius: ipfeHeight / 2,
    }),
  }
  // Create points from them with easy names
  for (const side in ids1) {
    for (const id of ['start', 'cp1', 'cp2', 'end']) {
      points[`${side}${utils.capitalize(id)}`] = points[ids1[side].points[id]].copy()
    }
  }
  points.ipfeStart = utils.beamIntersectsY(
    points.facingTop,
    points.facingBottom,
    points.innerPocketAnchor.y - ipfeHeight
  )
  points.ipfeEnd = utils.beamIntersectsY(
    points.facingTop,
    points.facingBottom,
    points.innerPocketAnchor.y + ipfeHeight
  )
  points.ipfeStartEnd = new Point(
    points.ipfeStart.x + ipfeHeight / 2,
    points.innerPocketAnchor.y - ipfeHeight / 2
  )
  points.ipfeStartVia = new Point(points.ipfeStart.x, points.ipfeStartEnd.y)
  points.ipfeEndEnd = new Point(
    points.ipfeEnd.x + ipfeHeight / 2,
    points.innerPocketAnchor.y + ipfeHeight / 2
  )
  points.ipfeEndVia = new Point(points.ipfeEnd.x, points.ipfeEndEnd.y)
  // Macros will return the auto-generated IDs
  const ids2 = {
    ipfeStart: macro('round', {
      id: 'ipfeStart',
      from: points.ipfeStart,
      to: points.ipfeStartEnd,
      via: points.ipfeStartVia,
      radius: ipfeHeight / 2,
    }),
    ipfeEnd: macro('round', {
      id: 'ipfeEnd',
      from: points.ipfeEnd,
      to: points.ipfeEndEnd,
      via: points.ipfeEndVia,
      radius: ipfeHeight / 2,
    }),
  }
  // Create points from them with easy names
  for (const side in ids2) {
    for (const id of ['start', 'cp1', 'cp2', 'end']) {
      points[`${side}${utils.capitalize(id)}`] = points[ids2[side].points[id]].copy()
    }
  }
  // Rotate control points to smooth out curve
  angle = points.facingTop.angle(points.facingBottom) + 90
  points.ipfeStartCp1 = points.ipfeStartCp1.rotate(angle, points.ipfeStart)
  points.ipfeEndCp1 = points.ipfeEndCp1.rotate(angle, points.ipfeEnd)

  // Clean up - Remove this and uncomment paths below to understand what's going on
  for (let i of Object.keys(paths)) delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]

  /*
  paths.edge = new Path()
    .move(points.neckEdge)
    .line(points.hemEdge);

  paths.slash = new Path()
    .move(points.split).line(points.splitEdge)
    .line(points.neckEdge)
    .line(points.cfNeck)
    .curve(points.frontNeckCpEdge, points.neckCp2Front, points.neck)
    .line(points.shoulder)
    .curve(points.shoulderCp1, points.armholePitchCp2, points.armholePitch)
    .curve(points.armholePitchCp1, points.armholeHollowCp2, points.armholeHollow)
    .curve(points.armholeHollowCp1, points.splitCp2, points.split)
    .attr("class", "stroke-xl lining");

  paths.collarPrep = new Path()
    .move(points.shoulderRoll)
    .line(points.shoulderRollCb)
    .line(points.collarCbHelp)
    .line(points.collarCbBottom)
    .line(points.collarCbTop)
    .line(points.notchTipCp)
    .line(points.collarCbTopCp)

  paths.sdfs = new Path()
    .move(points.cutawayPoint)
    .curve(points.cutawayPointCp2, points.roundStartCp1, points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)

  paths.brzxclx = new Path()
    .move(points.notch)
    .line(points.collarCorner)
    .line(points.neck)

  */

  // Paths
  paths.saBase = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.split)
    .curve(points.splitCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .line(points.collarCorner)
    .line(points.notch)
    .line(points.notchEdge)
    ._curve(points.lapelStraightEndCp1, points.lapelStraightEnd)
    .line(points.cutawayPoint)
    .curve(points.cutawayPointCp2, points.roundStartCp1, points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)
  paths.saBase.hide()

  paths.hemBase = new Path().move(points.roundEnd).line(points.hem)
  paths.hemBase.hide()

  paths.seam = paths.saBase.clone().join(paths.hemBase).attr('class', 'fabric')
  paths.dart = new Path()
    .move(points.dartBottom)
    ._curve(points.dartRightCpBottom, points.dartRight)
    .curve_(points.dartRightCpTop, points.dartTop)
    ._curve(points.dartLeftCpTop, points.dartLeft)
    .curve_(points.dartLeftCpBottom, points.dartBottom)
    .close()
    .attr('class', 'fabric')

  if (sa)
    paths.sa = paths.saBase
      .offset(sa)
      .join(paths.hemBase.offset(sa * 3))
      .close()
      .attr('class', 'fabric sa')

  if (complete) {
    paths.flb = new Path()
      .move(points.facingTop)
      .line(points.ipfeStartStart)
      .curve(points.ipfeStartCp1, points.ipfeStartCp2, points.ipfeStartEnd)
      .line(points.ipfeTopRightStart)
      .curve(points.ipfeTopRightCp1, points.ipfeTopRightCp2, points.ipfeTopRightEnd)
      .curve(points.ipfeBottomRightCp2, points.ipfeBottomRightCp1, points.ipfeBottomRightStart)
      .line(points.ipfeEndEnd)
      .curve(points.ipfeEndCp2, points.ipfeEndCp1, points.ipfeEnd)
      .line(points.facingBottom)
      .attr('class', 'fabric')
    macro('banner', {
      id: 'flbLining',
      path: paths.flb.reverse(),
      text: 'facingLiningBoundaryLiningSide',
      classes: 'center text-xs fill-lining',
      dy: 5,
      repeat: 24,
    })
    macro('banner', {
      id: 'flbFacing',
      path: paths.flb.reverse(),
      text: 'facingLiningBoundaryFacingSide',
      classes: 'center text-xs fill-fabric',
      repeat: 24,
    })

    paths.chestPocket = new Path()
      .move(points.chestPocketTopRight)
      .line(points.chestPocketTopLeft)
      .line(points.chestPocketBottomLeft)
      .line(points.chestPocketBottomRight)
      .line(points.chestPocketTopRight)
      .close()
      .attr('class', 'fabric dashed')

    paths.innerPocket = new Path()
      .move(points.innerPocketTopRight)
      .line(points.innerPocketTopLeft)
      .line(points.innerPocketBottomLeft)
      .line(points.innerPocketBottomRight)
      .line(points.innerPocketTopRight)
      .move(points.innerPocketLeft)
      .line(points.innerPocketRight)
      .close()
      .attr('class', 'fabric dashed')

    paths.breakLine = new Path()
      .move(points.lapelBreakPoint)
      .line(points.shoulderRoll)
      .attr('class', 'fabric help')

    paths.frontPocket = new Path()
      .move(points.frontPocketTopEnd)
      .line(points.frontPocketTopLeft)
      .line(points.frontPocketBottomLeft)
      .line(points.frontPocketBottomEnd)
      .attr('class', 'fabric dashed')

    paths.chestPiece = new Path()
      .move(points.lapelBreakPoint)
      .curve(points.cutawayPoint, points.waist, points.fsArmhole)
      .attr('class', 'canvas help')
    macro('banner', {
      id: 'chestPiece',
      path: paths.chestPiece,
      text: 'chestPiece',
      classes: 'center text-xs fill-canvas',
      repeat: 42,
    })
  }

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Logo
  points.logo = new Point(points.dartBottom.x, points.hips.y)
  snippets.logo = new Snippet('logo', points.logo)

  // Notches
  macro('sprinkle', {
    snippet: 'notch',
    on: [
      'neck',
      'shoulder',
      'armholePitch',
      'chestPocketBottomLeft',
      'chestPocketBottomRight',
      'lapelBreakPoint',
      'notchMax',
      'notch',
      'innerPocketLeft',
      'innerPocketRight',
      'frontPocketTopLeft',
      'frontPocketBottomLeft',
      'armholeHollow',
      'waist',
    ],
  })

  // Buttons
  points.button1 = new Point(points.cfWaist.x, points.lapelBreakPoint.y)
  let buttons = ['button1']
  if (options.buttons > 1) {
    points.button2 = new Point(points.cfWaist.x, points.cutawayPoint.y)
    buttons.push('button2')
    if (options.buttons == 3) {
      points.button3 = points.button1.shiftFractionTowards(points.button2, 0.5)
      buttons.push('button3')
    }
  }
  for (let button of buttons)
    snippets[button] = new Snippet('button', points[button]).attr('data-scale', 2)

  // Grainline
  macro('grainline', {
    from: points.cfHips,
    to: new Point(points.cfArmhole.x, points.collarCorner.y),
  })

  // Dimensions
  macro('vd', {
    id: 'hLapelTipToHps',
    from: points.notchEdge,
    to: points.neck,
    x: points.lapelBreakPoint.x - 15 - sa,
  })
  macro('vd', {
    id: 'hLapelBreakToLapelTip',
    from: points.lapelBreakPoint,
    to: points.notchEdge,
    x: points.lapelBreakPoint.x - 15 - sa,
  })
  macro('vd', {
    id: 'hBetweenButtons',
    from: points.cutawayPoint,
    to: points.lapelBreakPoint,
    x: points.lapelBreakPoint.x - 15 - sa,
  })
  macro('vd', {
    id: 'hHemToLapelBreakPoint',
    from: points.facingBottom,
    to: points.cutawayPoint,
    x: points.lapelBreakPoint.x - 15 - sa,
  })
  macro('vd', {
    id: 'hHemToLapelTip',
    from: points.facingBottom,
    to: points.notchEdge,
    x: points.lapelBreakPoint.x - 30 - sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.facingBottom,
    to: points.neck,
    x: points.lapelBreakPoint.x - 45 - sa,
  })
  macro('hd', {
    id: 'wLapelTipToRollLineTop',
    from: points.notchEdge,
    to: points.notchMax,
    y: points.notchEdge.y - 15 - sa,
  })
  macro('hd', {
    id: 'hLapelTipToCollarNotch',
    from: points.notchEdge,
    to: points.collarCorner,
    y: points.notchEdge.y - 30 - sa,
  })
  macro('hd', {
    id: 'wLapelTipToHps',
    from: points.notchEdge,
    to: points.neck,
    y: points.neck.y - 15 - sa,
  })
  macro('hd', {
    id: 'hLapelStartToHps',
    from: points.lapelStraightEnd,
    to: points.neck,
    y: points.neck.y - 30 - sa,
  })
  macro('hd', {
    id: 'wLapelStartToArmholePitch',
    from: points.lapelStraightEnd,
    to: points.armholePitch,
    y: points.neck.y - 45 - sa,
  })
  macro('hd', {
    id: 'wLaperTipToShoulder',
    from: points.lapelStraightEnd,
    to: points.shoulder,
    y: points.neck.y - 60 - sa,
  })
  macro('hd', {
    id: 'wFull',
    from: points.lapelStraightEnd,
    to: points.fsArmhole,
    y: points.neck.y - 75 - sa,
  })
  macro('ld', {
    id: 'lShoulderSeam',
    from: points.neck,
    to: points.shoulder,
    d: -15,
  })
  macro('ld', {
    id: 'lCollarNotchToHps',
    from: points.collarCorner,
    to: points.neck,
    d: -15,
  })
  macro('ld', {
    id: 'wEdgeToButton',
    from: points.lapelBreakPoint,
    to: points.button1,
    d: -15,
  })
  macro('hd', {
    id: 'wEdgeToInnerPocket',
    from: points.lapelBreakPoint,
    to: points.innerPocketTopLeft,
    y: points.innerPocketTopLeft.y - 35,
  })
  macro('hd', {
    id: 'wInnerPocket',
    from: points.innerPocketTopLeft,
    to: points.innerPocketTopRight,
    y: points.innerPocketTopLeft.y - 35,
  })
  macro('hd', {
    id: 'wEdgeToFacingEdge',
    from: points.lapelBreakPoint,
    to: points.ipfeTopRightEnd,
    y: points.innerPocketTopLeft.y - 50,
  })
  macro('vd', {
    from: points.ipfeBottomRightStart,
    id: 'hInnerPocketFacingHeight',
    to: points.ipfeTopRightStart,
    x: points.ipfeTopRightEnd.x + 15,
  })
  macro('vd', {
    id: 'hInnerPocketWelt',
    from: points.innerPocketBottomRight,
    to: points.innerPocketTopRight,
    x: points.innerPocketTopRight.x - 15,
  })
  macro('hd', {
    id: 'wEdgeToDartTip',
    from: points.lapelBreakPoint,
    to: points.dartTop,
    y: points.dartTop.y + 15,
  })
  macro('ld', {
    id: 'wDart',
    from: points.dartLeft,
    to: points.dartRight,
  })
  macro('vd', {
    id: 'hDart',
    from: points.dartBottom,
    to: points.dartTop,
    x: points.dartRight.x + 15,
  })
  macro('hd', {
    id: 'wEdgeToFlbBottom',
    from: points.lapelBreakPoint,
    to: points.facingBottom,
    y: points.facingBottom.y + 15 + sa,
  })
  macro('hd', {
    id: 'EdgeToDart',
    from: points.lapelBreakPoint,
    to: points.roundEnd,
    y: points.facingBottom.y + 15 + 3 * sa,
  })
  macro('hd', {
    id: 'wEdgeToHemWaist',
    from: points.lapelBreakPoint,
    to: points.hem,
    y: points.facingBottom.y + 30 + 3 * sa,
  })
  macro('vd', {
    id: 'hHemToHip',
    from: points.hem,
    to: points.hips,
    x: points.hem.x + 15 + sa,
  })
  macro('vd', {
    id: 'hHemToDartBottom',
    from: points.hem,
    to: points.dartBottom,
    x: points.hem.x + 30 + sa,
  })
  macro('vd', {
    id: 'hHemToWaist',
    from: points.hem,
    to: points.waist,
    x: points.hem.x + 45 + sa,
  })
  macro('vd', {
    id: 'hHemToInnerPocket',
    from: points.hem,
    to: points.innerPocketRight,
    x: points.hem.x + 60 + sa,
  })
  macro('vd', {
    id: 'hHemToArmhole',
    from: points.hem,
    to: points.fsArmhole,
    x: points.hem.x + 75 + sa,
  })
  macro('vd', {
    id: 'hArmholeToArmholePitch',
    from: points.fsArmhole,
    to: points.armholePitch,
    x: points.fsArmhole.x + 15 + sa,
  })
  macro('vd', {
    id: 'hArmholeToShoulder',
    from: points.fsArmhole,
    to: points.shoulder,
    x: points.fsArmhole.x + 30 + sa,
  })
  macro('vd', {
    id: 'hArmholeToHps',
    from: points.fsArmhole,
    to: points.neck,
    x: points.fsArmhole.x + 45 + sa,
  })
  macro('hd', {
    id: 'wEdgeToPocket',
    from: points.cutawayPoint,
    to: points.frontPocketTopLeft,
    y: points.frontPocketTopLeft.y - 15,
  })
  macro('vd', {
    id: 'hPocket',
    from: points.frontPocketBottomLeft,
    to: points.frontPocketTopLeft,
    x: points.frontPocketTopLeft.x - 15,
  })
  macro('vd', {
    id: 'hArmholeToChestPocket',
    from: points.fsArmhole,
    to: points.chestPocketBottomLeft,
    x: points.chestPocketBottomLeft.x - 15,
  })
  points.cfWaist = new Point(points.button1.x, points.waist.y)
  macro('ld', { from: points.cfWaist, to: points.dartLeft, id: 'wButtonToDart' })
  macro('ld', { from: points.dartRight, to: points.waist, id: 'wDartToSide' })

  return part
}

export const front = {
  name: 'jaeger.front',
  from: frontBase,
  after: backBase,
  options: {
    frontOverlap,
    innerPocketPlacement,
    innerPocketWidth,
    innerPocketDepth,
    innerPocketWeltHeight,
    frontCutawayAngle,
    frontCutawayStart,
    frontCutawayEnd,
    hemRadius,
    chestPocketDepth,
    chestPocketWidth,
    chestPocketPlacement,
    chestPocketAngle,
    chestPocketWeltSize,
    lapelStart,
    collarHeight,
    collarNotchDepth,
    collarNotchAngle,
    collarNotchReturn,
    chestShaping,
    buttons,
    buttonLength,
    chestShapingMax,
    lapelReduction,
  },
  draft: jaegerFront,
}
