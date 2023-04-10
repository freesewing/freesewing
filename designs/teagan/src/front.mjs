import { base } from '@freesewing/brian'
import { hidePresets } from '@freesewing/core'

function teaganFront({
  utils,
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
  complete,
  paperless,
  macro,
  log,
  units,
  getId,
  part,
}) {
  // Hide Brian paths
  for (let key of Object.keys(paths)) paths[key].hide()

  // Adapt fit to waist
  if (options.curveToWaist) {
    let midWidth, lowerWidth
    
    midWidth = measurements.waist * (1 + options.curvedWaistEase)/4
    lowerWidth = measurements.hips * (1 + options.hipsEase)/4
    points.hem.x = lowerWidth
    points.hips.x = lowerWidth
    points.waist.x = midWidth
    
    // control points should be somewhat evenly spaced around waist
    let cpAbove, cpBelow
    cpAbove = points.armhole.dy(points.waist) * 0.6
    cpBelow = points.hips.dy(points.waist) * 0.25
    points.waistCp1 = points.waist.shift(90, cpBelow*2/3 - cpAbove/3)
    points.waistCp2 = points.waist.shift(90, cpAbove*2/3 - cpBelow/3)
    points.hipsCp2 = points.hips.shift(90,points.waist.dy(points.hips) * 0.3)
    
    // warn if we're making a barrel-shaped shirt
    if (midWidth > lowerWidth) {
      log.warning('width at waist exceeds width at hips; consider disabling the curve to waist option for a more standard shape')
    }
  } else {
    let width
    if (measurements.waist > measurements.hips)
      width = (measurements.waist * (1 + options.hipsEase)) / 4
    else width = (measurements.hips * (1 + options.hipsEase)) / 4
    points.hem.x = width
    points.hips.x = width
    points.waist.x = width
    points.waistCp2 = points.waist.shift(90, points.armhole.dy(points.waist) / 3)
  }
  
  

  // Clone cb (center back) into cf (center front)
  for (let key of ['Neck', 'Shoulder', 'Armhole', 'Hips', 'Hem']) {
    points[`cf${key}`] = points[`cb${key}`].clone()
  }

  // Neckline
  points.cfNeck = new Point(0, options.necklineDepth * measurements.hpsToWaistBack)
  points.cfNeckCp1 = points.cfNeck.shift(0, points.neck.x * options.necklineBend * 2)
  points.neck = points.hps.shiftFractionTowards(points.shoulder, options.necklineWidth)
  points.neckCp2 = points.neck
    .shiftTowards(points.shoulder, points.neck.dy(points.cfNeck) * (0.2 + options.necklineBend))
    .rotate(-90, points.neck)

  // Redraw armhole
  points.shoulderCp1 = utils.beamIntersectsY(
    points.shoulder,
    points.shoulderCp1,
    points.armholePitch.y
  )
  points.armholeHollowCp2 = utils.beamIntersectsX(
    points.armholeHollow,
    points.armholeHollowCp2,
    points.armholePitch.x
  )

  // Log info for full length
  log.info(['fullLengthFromHps', units(points.hps.dy(points.hem))])

  // Draw seamline
  paths.hemBase = new Path().move(points.cfHem).line(points.hem).hide()
  if (options.curveToWaist) {
    paths.sideSeam = new Path()
      .move(points.hem)
      .curve(points.hipsCp2,points.waistCp1, points.waist)
      .curve_(points.waistCp2,points.armhole)
      .hide()
  } else {
    paths.sideSeam = new Path()
      .move(points.hem)
      .curve_(points.waistCp2,points.armhole)
      .hide()
  }
  paths.saBase = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve(points.neckCp2, points.cfNeckCp1, points.cfNeck)
    .hide()
  paths.seam = new Path()
    .move(points.cfHem)
    .join(paths.hemBase)
    .join(paths.sideSeam)
    .join(paths.saBase)
    .line(points.cfHem)
    .close()
    .attr('class', 'fabric')

  // Store front sleevecap length
  store.set(
    'frontArmholeLength',
    new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.shoulderCp1, points.shoulder)
      .length()
  )

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfHem,
      grainline: true,
    })
    points.title = new Point(points.waist.x / 2, points.waist.y)
    macro('title', { at: points.title, nr: 1, title: 'front' })
    points.logo = points.title.shift(-90, 75)
    snippets.logo = new Snippet('logo', points.logo)

    if (sa) {
      paths.sa = new Path()
        .move(points.cfHem)
        .join(paths.hemBase.offset(sa * 3))
        .join(paths.sideSeam.offset(sa))
        .join(paths.saBase.offset(sa))
        .line(points.cfNeck)
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    // These dimensions will be inherited by the back part
    macro('hd', {
      from: points.cfHem,
      to: points.hem,
      y: points.hem.y + sa * 2.5 + 15,
    })
    if (options.curveToWaist) {
      macro('hd', {
        from: points.waist,
        to: points.hem,
        y: points.hem.y + sa * 2.5 + 30
      })
      macro('vd', {
        from: points.hem,
        to: points.waist,
        x: points.waist.x - 15,
      })
    }
    macro('vd', {
      from: points.hem,
      to: points.armhole,
      x: points.armhole.x + sa + 15,
    })
    macro('vd', {
      from: points.hem,
      to: points.shoulder,
      x: points.armhole.x + sa + 30,
    })
    macro('vd', {
      from: points.hem,
      to: points.neck,
      x: points.armhole.x + sa + 45,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.neck,
      y: points.neck.y - sa - 15,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.shoulder,
      y: points.neck.y - sa - 30,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.armhole,
      y: points.neck.y - sa - 45,
    })
    // These dimensions are only for the front
    let id = getId()
    macro('vd', {
      id,
      from: points.cfHem,
      to: points.cfNeck,
      x: points.cfHem.x - sa - 15,
    })
    store.set('frontOnlyDimensions', [id])
  }

  return part
}

export const front = {
  name: 'teagan.front',
  from: base,
  measurements: ['hips', 'waist'],
  hide: hidePresets.HIDE_TREE,
  options: {
    bicepsEase: 0.05,
    shoulderEase: 0,
    collarEase: 0,
    shoulderSlopeReduction: 0,
    sleeveWidthGuarantee: 0.85,
    frontArmholeDeeper: 0.005,
    // Brian overrides
    chestEase: { pct: 12, min: 5, max: 25, menu: 'fit' },
    sleeveLength: { pct: 30, min: 20, max: 100, menu: 'fit' },
    lengthBonus: { pct: 5, min: -20, max: 60, menu: 'style' },
    backNeckCutout: { pct: 8, min: 4, max: 12, menu: 'fit' },
    // Teagan specific
    draftForHighBust: { bool: false, menu: 'fit' },
    curveToWaist: { bool: false, menu: 'fit' },
    curvedWaistEase: { pct: 25, min: 8, max: 40, menu: 'fit' },
    hipsEase: { pct: 18, min: 8, max: 30, menu: 'fit' },
    necklineDepth: { pct: 25, min: 20, max: 40, menu: 'style' },
    necklineWidth: { pct: 30, min: 10, max: 50, menu: 'style' },
    necklineBend: { pct: 30, min: 0, max: 70, menu: 'style' },
  },
  draft: teaganFront,
}
