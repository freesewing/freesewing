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
    bicepsEase: 0.05,
    collarEase: 0,
    shoulderSlopeReduction: 0,
    sleeveWidthGuarantee: 0.85,
    frontArmholeDeeper: 0.01,
    legacyArmholeDepth: false,
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
    strapWidth: {
      pct: 40,
      min: 5,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.sleeves ? false : 'style.sleeves'),
    },
    sleeves: { bool: true, menu: 'style.sleeves' },

    backNeckCutout: { pct: 10, min: 6, max: 30, menu: 'style' },
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
  for (let key of Object.keys(paths)) paths[key].hide()

  // Re-use points for deeper armhole at the front
  points.armholePitchCp1 = points.backArmholePitchCp1
  points.armholePitch = points.backArmholePitch
  points.armholePitchCp2 = points.backArmholePitchCp2

  // clean up some unnecessary points
  delete points.frontArmholePitchCp1
  delete points.frontArmholePitch
  delete points.frontArmholePitchCp2
  delete points.backArmholePitchCp1
  delete points.backArmholePitch
  delete points.backArmholePitchCp2

  constructBackPoints(points, Point, measurements, options)

  adjustSidePoints(points, options)

  correctArmHole(points, paths, Path, options, utils)
  //
  // points.cfNeck = new Point(0, options.necklineDepth * measurements.hpsToWaistFront)
  // points.cfNeckCp1 = points.cfNeck.shift(0, points.neck.x * options.necklineBend * 2)
  // points.neck = points.hps.shiftFractionTowards(
  //   points.shoulder,
  //   options.necklineWidth * (1 - options.strapWidth)
  // )
  // points.neckCp2 = points.neck
  //   .shiftTowards(points.shoulder, points.neck.dy(points.cfNeck) * (0.2 + options.necklineBend))
  //   .rotate(-90, points.neck)
  //
  // paths.frontNeck = new Path()
  //   .move(points.neck)
  //   .curve(points.neckCp2, points.cfNeckCp1, points.cfNeck)

  points.cbHem = new Point(0, points.cbWaist.y + measurements.waistToHips * options.lengthBonus)

  constructBackHem(points, measurements, options, Point, paths, Path)

  store.set('backSideSeamLength', paths.sideSeam.length())

  let strapWidth = options.sleeves ? 0 : options.strapWidth
  points.neck = points.hps.shiftFractionTowards(
    points.shoulder,
    options.necklineWidth * (1 - strapWidth)
  )

  points.cbNeck = new Point(
    0,
    points.neck.y + options.backNeckCutout * points.neck.dy(points.armhole)
  )

  // points.cbNeckCp1 = points.cfNeck.shift(0, points.neck.x * options.necklineBend * 2)
  // points.neckCp2 = points.neck
  //   .shiftTowards(points.shoulder, points.neck.dy(points.cfNeck) * (0.2 + options.necklineBend))
  //   .rotate(-90, points.neck)

  points.neckCp2 = points.neck.shiftTowards(points.shoulder, 10).rotate(-90, points.neck)
  points.neckCp2 = utils.beamIntersectsY(points.neck, points.neckCp2, points.cbNeck.y)

  points.neckCp1 = new Point(points.neck.x / 3, points.cbNeck.y)

  paths.backNeck = new Path()
    .move(points.neck)
    .curve(points.neckCp2, points.neckCp1, points.cbNeck)
    .addClass('fabric')
  createArmHoles(options, store, points, paths, Path, snippets, Snippet, strapWidth, 'bnotch')

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
    from: points.cfNeck,
    to: points.cbHem,
    grainline: true,
  })

  points.scaleboxAnchor = points.logo.shift(-90, 10)

  macro('scalebox', {
    at: points.scaleboxAnchor,
  })

  snippets.logo = new Snippet('logo', points.logo)

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
    id: 'hNeckToArmhole',
    from: points.neck,
    to: points.armhole,
    x: points.armhole.x + sa + 15,
  })

  plotSideLineMeasurements(points, paths.sideSeam, utils, macro)

  return part
}
