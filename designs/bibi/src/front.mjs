import { base } from '@freesewing/brian'
import { back } from './back.mjs'
import {
  adjustSidePoints,
  calculateFba,
  constructFrontHem,
  constructFrontPoints,
  correctArmHole,
  createArmHoles,
  plotSideLineMeasurements,
  verticalSplit,
} from './shared.mjs'

export const front = {
  name: 'bibi.front',
  from: base,
  measurements: [
    'hips',
    'waist',
    'hpsToWaistBack',
    'chest',
    'hpsToWaistFront',
    'seat',
    'seatBack',
    'waistToSeat',
    'hpsToBust',
  ],
  optionalMeasurements: ['bustSpan', 'highBust', 'waistToUnderbust', 'waistToKnee', 'waistToFloor'],
  hide: { from: true },
  plugins: [],
  after: back,
  options: {
    dart: { bool: false, menu: 'fit' },
    bustEase: {
      pct: 0,
      min: 0,
      max: 10,
      menu: (settings, mergedOptions) => (mergedOptions.draftForHighBust ? 'fit' : false),
      order: 'EAA',
    },
    necklineDepth: { pct: 25, min: 20, max: 110, menu: 'style' },
    necklineBend: { pct: 50, min: 0, max: 70, menu: 'style' },
    armholeCurveFront: {
      pct: 15,
      min: -10,
      max: 30,
      menu: (settings, mergedOptions) => (mergedOptions.sleeves ? false : 'style.sleeves'),
    },
  },
  draft: bibiFront,
}

function bibiFront({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  absoluteOptions,
  measurements,
  macro,
  complete,
  part,
}) {
  // Hide Brian paths
  for (const key of Object.keys(paths)) paths[key].hide()

  // Re-use points for deeper armhole at the front
  points.armholePitchCp1 = points.frontArmholePitchCp1
  points.armholePitch = points.frontArmholePitch
  points.armholePitchCp2 = points.frontArmholePitchCp2

  // clean up some unnecessary/confusing points
  delete points.frontArmholePitchCp1
  delete points.frontArmholePitch
  delete points.frontArmholePitchCp2
  delete points.backArmholePitchCp1
  delete points.backArmholePitch
  delete points.backArmholePitchCp2
  delete points.cbHem
  delete points.cbNeck

  constructFrontPoints(part)

  // FBA
  points.originalChest = points.chest
  points.originalArmhole = points.armhole
  points.originalArmholeCp2 = points.armholeCp2
  let fba
  if (options.draftForHighBust && measurements.bustSpan && measurements.highBust) {
    fba = calculateFba(
      points.neck.shiftFractionTowards(points.shoulder, 0.5),
      points.bust,
      points.armholeHollow,
      (measurements.bust * (1 + options.bustEase) - measurements.chest) / 2,
      Point
    )
    points.bustOffset = fba.bustOffset
    points.sideOffset0 = fba.sideOffset0
    points.sideOffset1 = fba.sideOffset1
    points.chest = fba.rotateLower(points.chest)
    points.armhole = fba.rotateUpper(points.armhole)
    points.armholeCp2 = fba.rotateUpper(points.armholeCp2)
    points.armholeHollowCp1 = fba.rotateUpper(points.armholeHollowCp1)
    points.armholeHollow = fba.rotateUpper(points.armholeHollow)
    points.armholeHollowCp2 = fba.rotateUpper(points.armholeHollowCp2)
    points.armholePitchCp1 = fba.rotateUpper(points.armholePitchCp1)
    points.armholePitch = fba.rotateUpper(points.armholePitch)
    points.armholePitchCp2 = fba.rotateUpper(points.armholePitchCp2)
    points.shoulderCp1 = fba.rotateUpper(points.shoulderCp1)
    points.shoulder = fba.rotateUpper(points.shoulder)
  }
  adjustSidePoints(part)

  correctArmHole(part)

  const strapWidth = options.sleeves ? 0 : options.strapWidth
  points.neck = points.hps.shiftFractionTowards(
    points.shoulder,
    options.necklineWidth * (1 - strapWidth)
  )

  points.cfNeck = new Point(
    0,
    points.neck.y + options.necklineDepth * points.neck.dy(points.cfBust)
  )
  points.cfNeckCp1 = points.cfNeck.shift(0, points.neck.x * options.necklineBend)
  points.neckCp2 = points.neck
    .shiftTowards(points.shoulder, points.neck.dy(points.cfNeck) * (0.2 + options.necklineBend))
    .rotate(-90, points.neck)

  paths.frontNeck = new Path()
    .move(points.neck)
    .curve(points.neckCp2, points.cfNeckCp1, points.cfNeck)
    .addClass('fabric')
  constructFrontHem(part, options.useWaistRibbing ? -store.get('ribbingHeight') : 0)

  store.set('frontSideSeamLength', paths.sideSeam.length())
  const frontLength = store.get('frontSideSeamLength')
  const backLength = store.get('backSideSeamLength') ?? 0
  const dartLength = frontLength - backLength
  const constructDart = (path, tip, dartLength) => {
    const length = path.length()
    dartLength = Math.max(0, Math.min(dartLength, length))

    const gatherArea = (store.get('gatherAreaLength') ?? 0) + dartLength
    // The length of both the beforeDart and afterDart paths,
    // which are used to create a smooth transition to the dart
    let auxLength = (gatherArea - dartLength) * 0.5

    const offset = length - (store.get('gatherAreaStart') ?? 0) - gatherArea
    const startSplit = path.shiftAlong(offset)
    const startDartAlpha = path.shiftAlong(offset + auxLength)
    const endDartAlpha = path.shiftAlong(offset + auxLength + dartLength)
    const endSplit = path.shiftAlong(offset + gatherArea)

    let tmp = verticalSplit(Path, path, startSplit)
    const pathBefore = tmp[0]
    tmp = verticalSplit(Path, tmp[1], endSplit)
    const pathGather = tmp[0]
    const pathAfter = tmp[1]
    const angleBefore = path.angleAt(startSplit)
    const angleAfter = path.angleAt(endSplit)
    const cpBefore = startSplit.shift(angleBefore, auxLength / 3)
    const cpAfter = endSplit.shift(angleAfter, -auxLength / 3)

    const dartDist = Math.max(tip.dist(startDartAlpha), tip.dist(endDartAlpha))

    const startDart = tip.shiftTowards(startDartAlpha, dartDist)
    const endDart = tip.shiftTowards(endDartAlpha, dartDist)
    const dartMid = startDart.shiftFractionTowards(endDart, 0.5)
    const tipShifted = tip.shiftFractionTowards(dartMid, 0.25)
    const dartCpStart = tipShifted
      .shiftFractionTowards(dartMid, 0.25)
      .shiftFractionTowards(startDart, 0.25)
    const dartCpEnd = tipShifted
      .shiftFractionTowards(dartMid, 0.25)
      .shiftFractionTowards(endDart, 0.25)

    const dartAngleMain = startDart.angle(endDart)
    const dartAngleBefore = startDartAlpha.angle(endDartAlpha)
    const dartAngle = dartAngleBefore * 2 - dartAngleMain
    let dartInnerAngle = tipShifted.angle(endDart) - tipShifted.angle(startDart)
    if (dartInnerAngle < -180) dartInnerAngle += 360
    const cpSplitStart = startDart.shift(dartAngle - dartInnerAngle / 2, -auxLength / 3)
    const cpSplitEnd = endDart.shift(dartAngle + dartInnerAngle / 2, auxLength / 3)

    return {
      beforeDart: pathBefore.clone().curve(cpBefore, cpSplitStart, startDart),
      dart: new Path().move(startDart)._curve(dartCpStart, tipShifted).curve_(dartCpEnd, endDart),
      afterDart: new Path().move(endDart).curve(cpSplitEnd, cpAfter, endSplit).join(pathAfter),
      dartMiddle: new Path().move(dartMid).line(tipShifted),
      startGather: startSplit,
      endGather: endSplit,
      startDart: startDart,
      endDart: endDart,
      dartTip: tipShifted,
      gatherArea: gatherArea,
      gatherPath: pathGather,
      dartLength: dartLength,
      offset: offset,
    }
  }

  const dart = constructDart(paths.sideSeam, points.bust, dartLength)

  store.set('dart', dart)

  points.startGather = dart.startGather
  points.endGather = dart.endGather
  points.startDart = dart.startDart
  points.endDart = dart.endDart
  points.dartTip = dart.dartTip

  paths.sideSeamWithDart = paths.originalSideSeam = paths.sideSeam.clone().hide()
  if (options.dart && dartLength > dart.gatherArea / 5) {
    paths.sideSeam1 = dart.beforeDart.hide()
    paths.dart = dart.dart.addClass('fabric')
    paths.sideSeam2 = dart.afterDart.hide()
    if (complete) {
      paths.dartMiddle = dart.dartMiddle.addClass('help')
    }
    paths.sideSeam = paths.sideSeam1.clone().combine(paths.sideSeam2).addClass('fabric')
    paths.sideSeamWithDart = paths.sideSeam1.clone().join(paths.dart).join(paths.sideSeam2).hide()
  }
  if (complete) {
    snippets.startGather = new Snippet('notch', points.startGather)
    snippets.endGather = new Snippet('notch', points.endGather)
    if (dartLength > dart.gatherArea / 10 && !paths.dart) {
      paths.gatherPath = new Path()
        .move(points.startGather)
        .join(dart.gatherPath.offset(-20))
        .line(points.endGather)
        .addClass('dashed various')
        .addText('gather', 'center various help')
    }
  }
  createArmHoles(part, strapWidth, options.armholeCurveFront, 0)

  store.set('armholeSizeFront', paths.armhole.length())
  store.set('neckSizeFront', paths.frontNeck.length())

  paths.centerLine = new Path().move(points.cfNeck).line(points.cfHem).addClass('fabric')

  points.title = points.bust.shift(0, 5)

  macro('title', { at: points.title, nr: 1, title: 'front' })

  macro('cutonfold', {
    from: points.cfNeck,
    to: points.cfHem,
    grainline: true,
  })

  if (sa) {
    if (paths.sideSeam1) {
      paths.sa = new Path()
        .move(points.cfHem)
        .join(paths.hem.offset(sa * (options.useWaistRibbing ? 1 : 3)))
        .join(paths.sideSeam1.offset(sa))
        .join(paths.sideSeam2.offset(sa))
        .join(paths.armhole.offset(sa * (store.separateSleeves ? 1 : 0)))
        .join(paths.shoulder.offset(sa))
        .line(points.neck)
        .attr('class', 'fabric sa')
    } else {
      paths.sa = new Path()
        .move(points.cfHem)
        .join(paths.hem.offset(sa * (options.useWaistRibbing ? 1 : 3)))
        .join(paths.sideSeam.offset(sa))
        .join(paths.armhole.offset(sa * (store.separateSleeves ? 1 : 0)))
        .join(paths.shoulder.offset(sa))
        .line(points.neck)
        .attr('class', 'fabric sa')
    }
  }

  if (complete) {
    // Waist line
    if (points.hem.y > points.waist.y) {
      paths.waist = new Path().move(points.cfWaist).line(points.waist).attr('class', 'help')
    }

    if (!store.separateSleeves) {
      paths.armholeBinding = paths.armhole
        .offset(-absoluteOptions.bindingHeight)
        .addClass('various help')
    }
    paths.neckBinding = paths.frontNeck
      .offset(-absoluteOptions.bindingHeight)
      .addClass('various help')
  }

  macro('pd', {
    id: 'pArmhole',
    path: paths.armhole.reverse(),
    d: -1 * sa - 15,
  })

  macro('pd', {
    id: 'pNeck',
    path: paths.frontNeck.reverse(),
    d: -1 * sa - 15,
  })

  macro('pd', {
    id: 'pShoulder',
    path: paths.shoulder.reverse(),
    d: -1 * sa - 15,
  })

  macro('hd', {
    id: 'wAtHem',
    from: points.cfHem,
    to: points.hem,
    y: points.hem.y + sa * 2.5 + 15,
  })

  macro('vd', {
    id: 'hHemToNeck',
    from: points.cfHem,
    to: points.cfNeck,
    x: points.cfHem.x - sa - 15,
  })

  macro('vd', {
    id: 'hNeckToArmhole',
    from: points.neck,
    to: points.armhole,
    x: points.armhole.x + sa + 30,
  })

  macro('vd', {
    id: 'hShoulderToArmhole',
    from: points.shoulder,
    to: points.armhole,
    x: points.armhole.x + sa + 15,
  })

  macro('vd', {
    id: 'hSide',
    from: points.armhole,
    to: points.hem,
    x: points.hem.x + sa + 15,
  })

  if (paths.dart) {
    macro('vd', {
      id: 'hDart',
      from: points.endDart,
      to: points.startDart,
      x: points.endDart.x + sa + 15,
    })

    macro('ld', {
      id: 'pDartStart',
      from: points.dartTip,
      to: points.startDart,
      d: -sa - 15,
    })
    macro('ld', {
      id: 'pDartEnd',
      from: points.dartTip,
      to: points.endDart,
      d: sa + 15,
    })
  }

  snippets.bustPoint = new Snippet('notch', points.bust)

  plotSideLineMeasurements(part, paths.sideSeamWithDart)

  return part
}
