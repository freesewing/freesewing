import { front as frontBase } from '@freesewing/brian'
import { back as backBase } from '@freesewing/brian'
import { hidePresets } from '@freesewing/core'

export function draftDianaFrontOrBack({
  measurements,
  sa,
  points,
  Path,
  paths,
  complete,
  paperless,
  macro,
  options,
  Snippet,
  snippets,
  part,
}) {
  let front = true
  if (typeof points.cfHem === 'undefined') front = false

  for (let id in paths) delete paths[id]

  //  Waist shaping
  points.waist.x = (measurements.waist * (1 + options.waistEase)) / 4
  points.hips.x = (measurements.hips * (1 + options.hipsEase)) / 4
  points.hem.x = points.hips.x
  points.hipsCp2 = points.hips.shift(90, measurements.waistToHips / 3)
  points.waistCp1 = points.waist.shift(-90, measurements.waistToHips / 3)
  points.waistCp2 = points.waist.shift(90, measurements.hpsToWaistBack / 4)

  // Rotating whole armhole for front
  let rotateThese = [
    'armholeCp2',
    'armholeHollowCp1',
    'armholeHollow',
    'armholeHollowCp2',
    'armholePitchCp1',
    'armholePitch',
    'armholePitchCp2',
    'shoulderCp1',
    'shoulder',
    'neck',
  ]
  if (front)
    for (let p of rotateThese) points[p] = points[p].rotate(-options.drapeAngle, points.armhole)

  // Neckline shaping
  points.neck = points.neck.shiftFractionTowards(points.shoulder, 1 - options.shoulderSeamLength)
  points.neckCp2.y = 1.2 * points.shoulder.y
  points.cbNeck.y = 1.2 * points.shoulder.y
  points.neckCp2Front = points.neck.shiftTowards(points.shoulder, -points.shoulder.x / 4)
  points.cfNeck.y = points.neckCp2Front.y + 0.7 * (points.neckCp2Front.y - points.neck.y)
  points.cfNeckCp1 = points.cfNeck.shift(0, points.shoulder.x / 4)

  if (front) {
    points.cNeck = points.cfNeck
    points.cHem = points.cfHem
    points.neckCp2 = points.neckCp2Front
  } else {
    points.cNeck = points.cbNeck
    points.cHem = points.cbHem
    points.cfNeckCp1 = points.cNeck
  }

  // Paths
  paths.saBase = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve(points.neckCp2, points.cfNeckCp1, points.cNeck)

  paths.hemBase = new Path().move(points.cHem).line(points.hem)

  paths.saBase.hide()
  paths.hemBase.hide()

  paths.seam = paths.hemBase.join(paths.saBase).line(points.cHem)

  // Complete
  if (complete) {
    snippets.shoulderSeamEndNotch = new Snippet('notch', points.neck)
    if (front) snippets.armholePitchNotch = new Snippet('notch', points.armholePitch)

    macro('cutonfold', false)
    macro('cutonfold', {
      from: points.cNeck,
      to: points.cHem,
      grainline: true,
    })

    if (sa) {
      paths.sa = paths.hemBase.offset(sa * 3).join(paths.saBase.offset(sa))
      paths.sa.line(points.cNeck).move(points.cHem)
      paths.sa.line(paths.sa.start())
      paths.sa.attr('class', 'fabric sa')
    }
  }

  // Paperless
  if (paperless) {
    macro('pd', {
      path: new Path()
        .move(points.armhole)
        .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
        .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
      d: sa + 15,
    })
    macro('pd', {
      path: new Path()
        .move(points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
      d: -15,
    })
    macro('vd', {
      from: points.hips,
      to: points.waist,
      x: points.hips.x + sa + 15,
    })
    macro('vd', {
      from: points.hips,
      to: points.armhole,
      x: points.hips.x + sa + 30,
    })
    macro('vd', {
      from: points.hips,
      to: points.armholePitch,
      x: points.hips.x + sa + 45,
    })
    macro('vd', {
      from: points.hips,
      to: points.shoulder,
      x: points.hips.x + sa + 60,
    })
    macro('vd', {
      from: points.hips,
      to: points.neck,
      x: points.hips.x + sa + 75,
    })
    macro('ld', { from: points.neck, to: points.shoulder, d: sa + 15 })
    macro('vd', {
      from: points.cHem,
      to: points.cNeck,
      x: points.cHem.x - 15,
    })
    macro('hd', {
      from: points.cHem,
      to: points.hem,
      y: points.cHem.y + 3 * sa + 15,
    })
    macro('pd', {
      path: new Path().move(points.cNeck).curve(points.cfNeckCp1, points.neckCp2, points.neck),
      d: -sa - 15,
    })
  }

  return part
}

export const front = {
  name: 'diana.front',
  from: frontBase,
  hide: hidePresets.HIDE_TREE,
  measurements: [
    'biceps',
    'chest',
    'hpsToWaistBack',
    'hips',
    'waist',
    'waistToHips',
    'neck',
    'shoulderSlope',
    'shoulderToShoulder',
    'shoulderToWrist',
    'wrist',
  ],
  optionalMeasurements: ['highBust'],
  options: {
    // Constants
    collarFactor: 5,
    brianFitSleeve: true,
    brianFitCollar: true,
    collarEase: 0,
    backNeckCutout: 0.05,
    shoulderSlopeReduction: 0,
    s3Collar: 0,
    s3Armhole: 0,

    // Angles
    drapeAngle: { deg: 20, min: 10, max: 30, menu: 'style' },

    // Percentages
    acrossBackFactor: { pct: 97, min: 93, max: 100, menu: 'advanced' },
    cuffEase: { pct: 20, min: 0, max: 30, menu: 'fit' },
    lengthBonus: { pct: 0, min: 0, max: 50, menu: 'fit' },
    sleeveLengthBonus: { pct: 0, min: -40, max: 10, menu: 'fit' },
    shoulderSeamLength: { pct: 35, min: 0.1, max: 60, menu: 'style' },

    armholeDepthFactor: { pct: 55, min: 50, max: 70, menu: 'advanced' },

    frontArmholeDeeper: { pct: 0, min: 0, max: 1.5, menu: 'advanced' },

    shoulderEase: { pct: 0, min: -2, max: 6, menu: 'fit' },
    waistEase: { pct: 0, min: -10, max: 20, menu: 'fit' },
    hipsEase: { pct: 0, min: -10, max: 20, menu: 'fit' },
    chestEase: { pct: 0, min: -10, max: 20, menu: 'fit' },
    bicepsEase: { pct: 0, min: -5, max: 50, menu: 'fit' },

    sleevecapEase: { pct: 0, min: 0, max: 10, menu: 'advanced.sleevecap' },
    sleevecapTopFactorX: { pct: 50, min: 25, max: 75, menu: 'advanced.sleevecap' },
    sleevecapTopFactorY: { pct: 100, min: 35, max: 165, menu: 'advanced.sleevecap' },
    sleevecapBackFactorX: { pct: 60, min: 35, max: 65, menu: 'advanced.sleevecap' },
    sleevecapBackFactorY: { pct: 33, min: 30, max: 65, menu: 'advanced.sleevecap' },
    sleevecapFrontFactorX: { pct: 55, min: 35, max: 65, menu: 'advanced.sleevecap' },
    sleevecapFrontFactorY: { pct: 33, min: 30, max: 65, menu: 'advanced.sleevecap' },
    sleevecapQ1Offset: { pct: 3, min: 0, max: 7, menu: 'advanced.sleevecap' },
    sleevecapQ2Offset: { pct: 5.5, min: 0, max: 7, menu: 'advanced.sleevecap' },
    sleevecapQ3Offset: { pct: 4.5, min: 0, max: 7, menu: 'advanced.sleevecap' },
    sleevecapQ4Offset: { pct: 1, min: 0, max: 7, menu: 'advanced.sleevecap' },
    sleevecapQ1Spread1: { pct: 6, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ1Spread2: { pct: 15, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ2Spread1: { pct: 15, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ2Spread2: { pct: 10, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ3Spread1: { pct: 10, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ3Spread2: { pct: 8, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ4Spread1: { pct: 7, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ4Spread2: { pct: 7, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleeveWidthGuarantee: { pct: 90, min: 25, max: 100, menu: 'advanced' },

    // draft for high bust
    draftForHighBust: { bool: false, menu: 'fit' },
  },
  draft: draftDianaFrontOrBack,
}

export const back = {
  name: 'diana.back',
  from: backBase,
  hide: hidePresets.HIDE_TREE,
  measurements: [
    'biceps',
    'chest',
    'hpsToWaistBack',
    'hips',
    'waist',
    'waistToHips',
    'neck',
    'shoulderSlope',
    'shoulderToShoulder',
    'shoulderToWrist',
    'wrist',
  ],
  optionalMeasurements: ['highBust'],
  options: {
    // Constants
    collarFactor: 5,
    brianFitSleeve: true,
    brianFitCollar: true,
    collarEase: 0,
    backNeckCutout: 0.05,
    shoulderSlopeReduction: 0,
    s3Collar: 0,
    s3Armhole: 0,

    // Angles
    drapeAngle: { deg: 20, min: 10, max: 30, menu: 'style' },

    // Percentages
    acrossBackFactor: { pct: 97, min: 93, max: 100, menu: 'advanced' },
    cuffEase: { pct: 20, min: 0, max: 30, menu: 'fit' },
    lengthBonus: { pct: 0, min: 0, max: 50, menu: 'fit' },
    sleeveLengthBonus: { pct: 0, min: -40, max: 10, menu: 'fit' },
    shoulderSeamLength: { pct: 35, min: 0.1, max: 60, menu: 'style' },

    armholeDepthFactor: { pct: 55, min: 50, max: 70, menu: 'advanced' },

    frontArmholeDeeper: { pct: 0, min: 0, max: 1.5, menu: 'advanced' },

    shoulderEase: { pct: 0, min: -2, max: 6, menu: 'fit' },
    waistEase: { pct: 0, min: -10, max: 20, menu: 'fit' },
    hipsEase: { pct: 0, min: -10, max: 20, menu: 'fit' },
    chestEase: { pct: 0, min: -10, max: 20, menu: 'fit' },
    bicepsEase: { pct: 0, min: -5, max: 50, menu: 'fit' },

    sleevecapEase: { pct: 0, min: 0, max: 10, menu: 'advanced.sleevecap' },
    sleevecapTopFactorX: { pct: 50, min: 25, max: 75, menu: 'advanced.sleevecap' },
    sleevecapTopFactorY: { pct: 100, min: 35, max: 165, menu: 'advanced.sleevecap' },
    sleevecapBackFactorX: { pct: 60, min: 35, max: 65, menu: 'advanced.sleevecap' },
    sleevecapBackFactorY: { pct: 33, min: 30, max: 65, menu: 'advanced.sleevecap' },
    sleevecapFrontFactorX: { pct: 55, min: 35, max: 65, menu: 'advanced.sleevecap' },
    sleevecapFrontFactorY: { pct: 33, min: 30, max: 65, menu: 'advanced.sleevecap' },
    sleevecapQ1Offset: { pct: 3, min: 0, max: 7, menu: 'advanced.sleevecap' },
    sleevecapQ2Offset: { pct: 5.5, min: 0, max: 7, menu: 'advanced.sleevecap' },
    sleevecapQ3Offset: { pct: 4.5, min: 0, max: 7, menu: 'advanced.sleevecap' },
    sleevecapQ4Offset: { pct: 1, min: 0, max: 7, menu: 'advanced.sleevecap' },
    sleevecapQ1Spread1: { pct: 6, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ1Spread2: { pct: 15, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ2Spread1: { pct: 15, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ2Spread2: { pct: 10, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ3Spread1: { pct: 10, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ3Spread2: { pct: 8, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ4Spread1: { pct: 7, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleevecapQ4Spread2: { pct: 7, min: 4, max: 20, menu: 'advanced.sleevecap' },
    sleeveWidthGuarantee: { pct: 90, min: 25, max: 100, menu: 'advanced' },

    // draft for high bust
    draftForHighBust: { bool: false, menu: 'fit' },
  },
  draft: draftDianaFrontOrBack,
}
