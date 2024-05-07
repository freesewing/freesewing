import { base } from '@freesewing/brian'
import {
  adjustSidePoints,
  constructBackHem,
  constructBackPoints,
  correctArmHole,
  createArmHoles,
  plotSideLineMeasurements,
} from './shared.mjs'
import { sleeve } from './sleeve.mjs'

export const back = {
  name: 'bibi.back',
  from: base,
  measurements: ['hips', 'waist', 'hpsToWaistBack', 'chest', 'seat', 'seatBack', 'waistToSeat'],
  optionalMeasurements: ['bustSpan', 'highBust', 'waistToUnderbust', 'waistToKnee', 'waistToFloor'],
  hide: { from: true },
  after: sleeve,
  options: {
    // Brian overrides
    s3Collar: 0,
    s3Armhole: 0,
    brianFitSleeve: true,
    brianFitCollar: false,
    bicepsEase: { pct: 5, min: 0, max: 50, menu: 'fit' },
    collarEase: 0,
    shoulderSlopeReduction: 0,
    sleeveWidthGuarantee: 0.85,
    frontArmholeDeeper: 0.01,
    legacyArmholeDepth: false,
    // Unused as legacyArmholeDepth is disabled, hide option in documentation
    armholeDepthFactor: 0.5,
    shoulderEase: { pct: 0, min: -2, max: 6, menu: 'fit' },
    // Note: we reuse Brian's cuff ease as "armhole fullness"
    cuffEase: {
      pct: 20,
      min: 0,
      max: 200,
      menu: (settings, mergedOptions) =>
        mergedOptions.sleeves === false ? false : 'style.sleeves',
    },
    armholeDepth: {
      pct: 2,
      min: -10,
      max: 50,
      menu: (settings, mergedOptions) =>
        mergedOptions?.legacyArmholeDepth ? false : 'style.sleeves',
    },
    armholeCurveBack: {
      pct: 30,
      min: -10,
      max: 120,
      menu: (settings, mergedOptions) => (mergedOptions.sleeves ? false : 'style.sleeves'),
    },
    armholeDropBack: {
      pct: 20,
      min: -50,
      max: 50,
      menu: (settings, mergedOptions) => (mergedOptions.sleeves ? false : 'style.sleeves'),
    },

    lengthBonus: { pct: 0, min: -30, max: 30, menu: 'style.length' },
    draftForHighBust: { bool: true, menu: 'fit' },
    // Bibi specific
    fitWaist: { bool: true, menu: 'fit', order: 'EBA' },
    waistEase: {
      pct: 1,
      min: -10,
      max: 20,
      menu: (settings, mergedOptions) => (mergedOptions.fitWaist ? 'fit' : false),
      order: 'EBB',
    },
    hipsEase: { pct: 2, min: -5, max: 50, menu: 'fit', order: 'ECA' },
    seatEase: { pct: 2, min: -5, max: 50, menu: 'fit', order: 'EDA' },
    chestEase: { pct: 2, min: -5, max: 25, menu: 'fit', order: 'EAB' },

    length: {
      dflt: 'seat',
      list: ['underbust', 'waist', 'hips', 'seat', 'knee', 'floor'],
      menu: 'style.length',
    },
    flare: {
      pct: 5,
      min: 0,
      max: 150,
      menu: (settings, mergedOptions) =>
        (mergedOptions.length === 'seat' && mergedOptions.lengthBonus > 0) ||
        mergedOptions.length === 'knee' ||
        mergedOptions.length === 'floor'
          ? 'style.length'
          : false,
    },
    necklineWidth: { pct: 15, min: -5, max: 90, menu: 'style' },
    strapWidth: {
      pct: 40,
      min: 5,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.sleeves ? false : 'style.sleeves'),
    },
    sleeves: { bool: true, menu: 'style.sleeves' },

    backNeckCutout: { pct: 6, min: 2, max: 110, menu: 'style' },
    backNeckBend: { pct: 50, min: 0, max: 70, menu: 'style' },
  },
  draft: bibiBack,
}

function bibiBack({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  measurements,
  macro,
  complete,
  utils,
  part,
}) {
  // Hide Brian paths
  for (const key of Object.keys(paths)) paths[key].hide()

  // Re-use points for deeper armhole at the front
  points.armholePitchCp1 = points.backArmholePitchCp1
  points.armholePitch = points.backArmholePitch
  points.armholePitchCp2 = points.backArmholePitchCp2

  // clean up some unnecessary/confusing points
  delete points.frontArmholePitchCp1
  delete points.frontArmholePitch
  delete points.frontArmholePitchCp2
  delete points.backArmholePitchCp1
  delete points.backArmholePitch
  delete points.backArmholePitchCp2
  delete points.cfNeck
  delete points.cfNeckCp1

  constructBackPoints(points, Point, measurements, options)

  adjustSidePoints(points, options)

  correctArmHole(points, paths, Path, options, utils)

  points.cbHem = new Point(0, points.cbWaist.y + measurements.waistToHips * options.lengthBonus)

  constructBackHem(points, measurements, options, Point, paths, Path)

  store.set('backSideSeamLength', paths.sideSeam.length())

  const strapWidth = options.sleeves ? 0 : options.strapWidth
  points.neck = points.hps.shiftFractionTowards(
    points.shoulder,
    options.necklineWidth * (1 - strapWidth)
  )

  points.cbNeck = new Point(
    0,
    points.neck.y + options.backNeckCutout * points.neck.dy(points.cbChest)
  )
  points.cbNeckCp1 = points.cbNeck.shift(0, points.neck.x * options.backNeckBend)
  points.neckCp2 = points.neck
    .shiftTowards(points.shoulder, points.neck.dy(points.cbNeck) * (0.2 + options.backNeckBend))
    .rotate(-90, points.neck)

  paths.backNeck = new Path()
    .move(points.neck)
    .curve(points.neckCp2, points.cbNeckCp1, points.cbNeck)
    .addClass('fabric')
  createArmHoles(
    options,
    store,
    points,
    paths,
    Path,
    snippets,
    Snippet,
    strapWidth,
    options.armholeCurveBack,
    options.armholeDropBack,
    utils,
    'bnotch'
  )

  paths.centerLine = new Path().move(points.cbNeck).line(points.cbHem).addClass('fabric')

  store.set(
    'gatherAreaStart',
    Math.min(points.armhole.dy(points.cbWaist) / 10, paths.sideSeam.length() * 0.1)
  )
  store.set(
    'gatherAreaLength',
    Math.min(paths.sideSeam.length() * 0.8, points.armhole.dy(points.cbWaist) * 0.5)
  )

  const reverse = paths.sideSeam.reverse()
  snippets.gatherAreaStart = new Snippet('notch', reverse.shiftAlong(store.get('gatherAreaStart')))
  snippets.gatherAreaBack = new Snippet(
    'notch',
    reverse.shiftAlong(store.get('gatherAreaStart') + store.get('gatherAreaLength'))
  )

  if (sa) {
    paths.sa = new Path()
      .move(points.cbHem)
      .join(paths.hem.offset(sa * 3))
      .join(paths.sideSeam.offset(sa))
      .join(paths.armhole.offset(sa))
      .join(paths.shoulder.offset(sa))
      .join(paths.backNeck.offset(sa))
      .line(points.cbNeck)
      .attr('class', 'fabric sa')
  }

  macro('cutonfold', {
    from: points.cbNeck,
    to: points.cbHem,
    grainline: true,
  })

  delete snippets.logo

  points.title = points.cbHem.shift(45, 60)

  macro('title', { at: points.title, nr: 2, title: 'back' })

  if (complete && points.hem.y > points.waist.y)
    paths.waist = new Path().move(points.cbWaist).line(points.waist).attr('class', 'help')

  macro('pd', {
    id: 'pArmhole',
    path: paths.armhole.reverse(),
    d: -1 * sa - 15,
  })

  macro('pd', {
    id: 'pNeck',
    path: paths.backNeck.reverse(),
    d: -1 * sa - 15,
  })

  macro('pd', {
    id: 'pShoulder',
    path: paths.shoulder.reverse(),
    d: -1 * sa - 15,
  })

  macro('hd', {
    id: 'wAtHem',
    from: points.cbHem,
    to: points.hem,
    y: points.cbHem.y + sa * 2.5 + 15,
  })

  macro('vd', {
    id: 'hHemToNeck',
    from: points.cbHem,
    to: points.cbNeck,
    x: points.cbHem.x - sa - 15,
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

  macro('vd', {
    id: 'hNeckToArmhole',
    from: points.neck,
    to: points.armhole,
    x: points.armhole.x + sa + 30,
  })

  plotSideLineMeasurements(points, paths.sideSeam, utils, macro)

  return part
}
