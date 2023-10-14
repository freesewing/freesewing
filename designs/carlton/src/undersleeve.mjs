import { underSleeve as bentUnderSleeve } from '@freesewing/bent'
import { front as bentFront } from '@freesewing/bent'

function draftCarltonUnderSleeve({
  sa,
  store,
  complete,
  points,
  utils,
  measurements,
  options,
  macro,
  Point,
  paths,
  Path,
  Snippet,
  snippets,
  part,
}) {
  // Add cuff
  let length = measurements.shoulderToWrist * options.cuffLength
  let angle = points.usWristRight.angle(points.usWristLeft)
  points.cuffBottomRight = points.usWristRight.shift(angle + 90, length)
  points.cuffBottomLeft = points.usWristLeft.shift(angle + 90, length)
  // Macro will return the auto-generated IDs
  const ids = macro('round', {
    id: 'round',
    to: points.usWristRight,
    from: points.cuffBottomLeft,
    via: points.cuffBottomRight,
    radius: length / 3,
  })
  // Create points from them with easy names
  for (const id of ['start', 'cp1', 'cp2', 'end']) {
    points[`round${utils.capitalize(id)}`] = points[ids.points[id]].copy()
  }
  store.set('underCuffWidth', points.usWristLeft.dist(points.usWristRight))

  // Clean up
  for (let i in paths) delete paths[i]

  // Paths
  paths.seam = new Path()
    .move(points.usLeftEdge)
    ._curve(points.usElbowLeftCpTop, points.usElbowLeft)
    .line(points.usWristLeft)
    .line(points.cuffBottomLeft)
    .line(points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)
    .line(points.usWristRight)
    .line(points.elbowRight)
    .curve(points.elbowRightCpTop, points.usRightEdgeCpBottom, points.usRightEdge)
    .curve_(points.usRightEdgeCpTop, points.usTip)
    .curve(points.usTipCpBottom, points.usLeftEdgeCpRight, points.usLeftEdgeRight)
    .line(points.usLeftEdge)
    .close()
    .addClass('fabric')

  if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')

  if (complete)
    paths.cuff = new Path().move(points.usWristLeft).line(points.usWristRight).addClass('note help')

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.addCut({ cut: 2, from: 'fabric' })
  store.cutlist.addCut({ cut: 2, from: 'lining' })

  // Notches
  const tipToNotch = store.get('undersleeveTipToNotch')
  if (tipToNotch)
    snippets.backSleeveNotch = new Snippet(
      'bnotch',
      new Path()
        .move(points.usTip)
        .curve(points.usTipCpBottom, points.usLeftEdgeCpRight, points.usLeftEdge)
        .shiftAlong(tipToNotch)
    )

  // Title
  macro('title', {
    at: new Point(points.armCenter.x, points.elbowLeft.y * 0.666),
    nr: 4,
    title: 'undersleeve',
    align: 'center',
  })

  // Grainline
  macro('grainline', {
    from: points.boxBottom,
    to: new Point(points.top.x, points.usLeftEdge.y),
  })

  // Dimensions
  macro('ld', {
    id: 'lWrist',
    from: points.usWristLeft,
    to: points.usWristRight,
    d: -15,
  })
  macro('vd', {
    id: 'hWristToElbow',
    from: points.usWristLeft,
    to: points.usElbowLeft,
    x: points.usLeftEdge.x - sa - 15,
  })
  macro('vd', {
    id: 'hWristToArmholeFront',
    from: points.usWristLeft,
    to: points.usLeftEdge,
    x: points.usLeftEdge.x - sa - 30,
  })
  macro('ld', {
    id: 'lCuffFoldOver',
    from: points.cuffBottomLeft,
    to: points.usWristLeft,
    d: 15 + sa,
  })
  macro('vd', {
    id: 'hCuffFoldOver',
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
    id: 'wristToTipBack',
    from: points.usWristRight,
    to: points.usTip,
    x: points.elbowRight.x + 30 + sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.cuffBottomRight,
    to: points.usTip,
    x: points.elbowRight.x + 45 + sa,
  })
  macro('ld', {
    id: 'wAtElbow',
    from: points.usElbowLeft,
    to: points.elbowRight,
  })
  macro('ld', {
    id: 'wAtTopFront',
    from: points.usLeftEdge,
    to: points.usRightEdge,
    d: -15,
  })
  macro('hd', {
    id: 'wAtTop',
    from: points.usLeftEdge,
    to: points.usTip,
    y: points.usTip.y - sa - 15,
  })
  macro('vd', {
    id: 'hSleevecap',
    from: points.usLeftEdge,
    to: points.usTip,
    x: points.usLeftEdge.x - sa - 15,
  })

  return part
}

export const underSleeve = {
  name: 'carlton.underSleeve',
  from: bentUnderSleeve,
  after: bentFront,
  hide: {
    from: true,
    after: true,
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
  draft: draftCarltonUnderSleeve,
}
