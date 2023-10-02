import { topSleeve as bentTopSleeve } from '@freesewing/bent'
import { front as bentFront } from '@freesewing/bent'
import { front } from './front.mjs'
import { back } from './back.mjs'

function draftCarltonTopSleeve({
  sa,
  store,
  complete,
  points,
  measurements,
  options,
  macro,
  utils,
  Point,
  paths,
  Path,
  Snippet,
  snippets,
  part,
}) {
  // Add cuff
  let length = measurements.shoulderToWrist * options.cuffLength
  let angle = points.tsWristRight.angle(points.tsWristLeft)
  points.cuffBottomRight = points.tsWristRight.shift(angle + 90, length)
  points.cuffBottomLeft = points.tsWristLeft.shift(angle + 90, length)
  // Macro will return the auto-generated IDs
  const ids = macro('round', {
    id: 'round',
    to: points.tsWristRight,
    from: points.cuffBottomLeft,
    via: points.cuffBottomRight,
    radius: length / 3,
  })
  // Create points from them with easy names
  for (const id of ['start', 'cp1', 'cp2', 'end']) {
    points[`round${utils.capitalize(id)}`] = points[ids.points[id]].copy()
  }
  store.set('topCuffWidth', points.tsWristLeft.dist(points.tsWristRight))
  store.set('cuffLength', length)
  store.set('cuffRadius', length / 3)

  // Clean up
  for (let i in paths) delete paths[i]

  // Paths
  paths.seam = new Path()
    .move(points.tsLeftEdge)
    ._curve(points.tsElbowLeftCpTop, points.tsElbowLeft)
    .line(points.tsWristLeft)
    .line(points.cuffBottomLeft)
    .line(points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)
    .line(points.tsWristRight)
    .line(points.elbowRight)
    .curve(points.elbowRightCpTop, points.tsRightEdgeCpBottom, points.tsRightEdge)
    .curve_(points.tsRightEdgeCpTop, points.backPitchPoint)
    ._curve(points.topCpRight, points.top)
    .curve(points.topCpLeft, points.frontPitchPointCpTop, points.frontPitchPoint)
    .curve(points.frontPitchPointCpBottom, points.tsLeftEdgeCpRight, points.tsLeftEdge)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  if (complete) {
    paths.cuff = new Path().move(points.tsWristLeft).line(points.usWristRight).addClass('note help')
  }

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.removeCut()
  store.cutlist.addCut([
    { cut: 2, from: 'fabric' },
    { cut: 2, from: 'lining' },
  ])

  // Title
  macro('rmtitle')
  macro('title', {
    at: points.armCenter,
    nr: 3,
    title: 'topsleeve',
    align: 'center',
  })

  // Grainline
  macro('grainline', {
    from: points.boxBottom,
    to: points.top,
  })

  // Scalebox
  macro('scalebox', { at: new Point(points.top.x, points.elbowRight.y * 0.666) })

  // Logo
  points.logo = new Point(points.top.x, points.elbowRight.y * 1.1)
  snippets.logo = new Snippet('logo', points.logo)

  // Notches
  snippets.sleeveTop = new Snippet('notch', points.top)

  // Extra notch at the front of the sleevecap
  const frontMax = new Path()
    .move(points.top)
    .curve(points.topCpLeft, points.frontPitchPointCpTop, points.frontPitchPoint)
    .length()
  const frontDist = store.get('frontArmholePitchToShoulder') + store.get('sleevecapEase') / 2
  if (frontDist === frontMax) points.sleeveNotchFront = points.frontPitchPoint.copy()
  else if (frontDist > frontMax)
    points.sleeveNotchFront = new Path()
      .move(points.frontPitchPoint)
      .curve(points.frontPitchPointCpBottom, points.tsLeftEdgeCpRight, points.tsLeftEdge)
      .shiftAlong(frontDist - frontMax)
  else
    points.sleeveNotchFront = new Path()
      .move(points.top)
      .curve(points.topCpLeft, points.frontPitchPointCpTop, points.frontPitchPoint)
      .shiftAlong(frontDist)
  snippets.frontSleeveNotch = new Snippet('notch', points.sleeveNotchFront)

  // Extra notch at the back of the sleevecap (often falls on the undersleeve)
  const backMax = new Path()
    .move(points.top)
    .curve_(points.topCpRight, points.backPitchPoint)
    .length()
  const backDist = store.get('backArmholePitchToShoulder') + store.get('sleevecapEase') / 2
  if (backDist === backMax) {
    points.sleeveNotchBack = points.backPitchPoint.copy()
    snippets.backSleeveNotch = new Snippet('bnotch', points.sleeveNotchBack)
  } else if (backDist < backMax) {
    points.sleeveNotchBack = new Path()
      .move(points.top)
      .move(points.top)
      .curve_(points.topCpRight, points.backPitchPoint)
      .shiftAlong(backDist)
    snippets.backSleeveNotch = new Snippet('bnotch', points.sleeveNotchBack)
  } else store.set('undersleeveTipToNotch', backDist - backMax)

  // Dimensions
  macro('ld', {
    id: 'lCuff',
    from: points.tsWristLeft,
    to: points.tsWristRight,
    d: -15,
  })
  macro('vd', {
    id: 'hCuffToElbowFront',
    from: points.tsWristLeft,
    to: points.tsElbowLeft,
    x: points.tsLeftEdge.x - sa - 15,
  })
  macro('vd', {
    id: 'hCuffToArmholeFront',
    from: points.tsWristLeft,
    to: points.tsLeftEdge,
    x: points.tsLeftEdge.x - sa - 30,
  })
  macro('ld', {
    id: 'lCuffFoldover',
    from: points.cuffBottomLeft,
    to: points.tsWristLeft,
    d: 15 + sa,
  })
  macro('vd', {
    id: 'hCuffFoldover',
    from: points.cuffBottomRight,
    to: points.usWristRight,
    x: points.usWristRight.x + 15 + sa,
  })
  macro('vd', {
    id: 'hCuffToElbowBack',
    from: points.usWristRight,
    to: points.elbowRight,
    x: points.elbowRight.x + 15 + sa,
  })
  macro('vd', {
    id: 'hCuffBackToArmholeFront',
    from: points.usWristRight,
    to: points.tsRightEdge,
    x: points.elbowRight.x + 30 + sa,
  })
  macro('vd', {
    id: 'hCuffToArmholeBack',
    from: points.usWristRight,
    to: points.backPitchPoint,
    x: points.elbowRight.x + 45 + sa,
  })
  macro('vd', {
    id: 'hCuffToTop',
    from: points.usWristRight,
    to: points.top,
    x: points.elbowRight.x + 60 + sa,
  })
  macro('vd', {
    id: 'hCuffToTop',
    from: points.cuffBottomRight,
    to: points.top,
    x: points.elbowRight.x + 75 + sa,
  })
  macro('ld', {
    id: 'wElbow',
    from: points.tsElbowLeft,
    to: points.elbowRight,
  })
  macro('ld', {
    id: 'wAtArmholeFront',
    from: points.tsLeftEdge,
    to: points.tsRightEdge,
  })
  macro('hd', {
    id: 'wArmholeFrontToTop',
    from: points.tsLeftEdge,
    to: points.top,
    y: points.top.y - sa - 15,
  })
  macro('hd', {
    id: 'wArmholeFrontToArmholeBack',
    from: points.tsLeftEdge,
    to: points.backPitchPoint,
    y: points.top.y - sa - 30,
  })
  macro('hd', {
    id: 'wFull',
    from: points.tsLeftEdge,
    to: points.tsRightEdge,
    y: points.top.y - sa - 45,
  })

  return part
}

export const topSleeve = {
  name: 'carlton.topSleeve',
  from: bentTopSleeve,
  after: [bentFront, front, back],
  hide: {
    from: true,
    inherited: true,
  },
  measurements: ['shoulderToWrist'],
  options: {
    cuffLength: { pct: 15, min: 10, max: 20, menu: 'style' },
    // The remainder of options are for Bent sleeves.
    brianFitSleeve: true,
    brianFitCollar: true,
    collarFactor: 4.8,
    chestShapingMax: 5,
    lengthBonus: 0,
    collarEase: 0.145,
    acrossBackFactor: { pct: 97, min: 93, max: 100, menu: 'fit' },
    armholeDepthFactor: { pct: 65, min: 50, max: 70, menu: 'fit' },
    bicepsEase: { pct: 20, min: 0, max: 50, menu: 'fit' },
    cuffEase: { pct: 60, min: 30, max: 100, menu: 'fit' },
    shoulderEase: { pct: 0, min: -2, max: 6, menu: 'fit' },
    sleeveBend: { deg: 10, min: 0, max: 20, menu: 'fit' },
    sleeveLengthBonus: { pct: 7, min: 0, max: 20, menu: 'fit' },
    s3Collar: { pct: 0, min: -100, max: 100, menu: 'style' },
    s3Armhole: { pct: 0, min: -100, max: 100, menu: 'style' },
    draftForHighBust: { bool: false, menu: 'fit' },
    backNeckCutout: { pct: 5, min: 2, max: 8, menu: 'advanced' },
    frontArmholeDeeper: { pct: 0.5, min: 0, max: 1.5, menu: 'advanced' },
    shoulderSlopeReduction: { pct: 12, min: 0, max: 80, menu: 'advanced' },
    sleevecapHeight: { pct: 45, min: 40, max: 60, menu: 'advanced' },
    sleevecapEase: { pct: 1, min: 0, max: 10, menu: 'advanced' },
  },
  draft: draftCarltonTopSleeve,
}
