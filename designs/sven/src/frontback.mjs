import { front as brianFront, back as brianBack } from '@freesewing/brian'
import { hidePresets } from '@freesewing/core'

function svenFrontBack({
  store,
  measurements,
  sa,
  Point,
  points,
  Path,
  paths,
  macro,
  options,
  part,
}) {
  let front = true
  if (typeof points.cfHem === 'undefined') front = false

  // Fit the hips
  points.hem.x = (measurements.hips * (1 + options.hipsEase)) / 4
  points.hipsCp2 = new Point(points.hem.x, front ? points.cfWaist.y : points.cbWaist.y)

  if (options.ribbing) {
    // Adapt length for ribbing
    let ribbingHeight =
      (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight
    store.setIfUnset('ribbingHeight', ribbingHeight)
    points.hem = points.hem.shift(90, ribbingHeight)
    if (front) points.cfHem = points.cfHem.shift(90, ribbingHeight)
    else points.cbHem = points.cbHem.shift(90, ribbingHeight)
  }

  // Paths
  paths.saBase = new Path()
    .move(points.hem)
    .curve_(points.hipsCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
  if (front) paths.saBase = paths.saBase.join(paths.frontArmhole)
  else paths.saBase = paths.saBase.join(paths.backArmhole)
  paths.saBase.line(points.s3CollarSplit)
  if (front) paths.saBase = paths.saBase.join(paths.frontCollar)
  else paths.saBase = paths.saBase.join(paths.backCollar)
  if (front) paths.hemBase = new Path().move(points.cfHem).line(points.hem)
  else paths.hemBase = new Path().move(points.cbHem).line(points.hem)

  paths.saBase.hide()
  paths.hemBase.hide()

  paths.seam = paths.hemBase.join(paths.saBase)
  if (front) paths.seam.line(points.cfHem)
  else paths.seam.line(points.cbHem)
  paths.seam.attr('class', 'fabric')

  // Seam allowance
  if (sa) {
    paths.sa = paths.hemBase.offset(sa * (options.ribbing ? 1 : 3)).join(paths.saBase.offset(sa))
    if (front) paths.sa.line(points.cfNeck).move(points.cfHem)
    else paths.sa.line(points.cbNeck).move(points.cbHem)
    paths.sa.line(paths.sa.start())
    paths.sa.attr('class', 'fabric sa')
  }

  /*
   * Annotations
   */
  // Dimensions
  macro('rmad')
  macro('pd', {
    id: 'lArmhole',
    path: new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
    d: sa + 15,
  })
  macro('pd', {
    id: 'lShoulderToArmholePitch',
    path: new Path()
      .move(points.armholePitch)
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
    d: -15,
  })
  macro('vd', {
    id: 'hHemToHips',
    from: points.hem,
    to: points.waist,
    x: points.hips.x + sa + 15,
  })
  macro('vd', {
    id: 'hHemToArmhole',
    from: points.hem,
    to: points.armhole,
    x: points.hips.x + sa + 30,
  })
  macro('vd', {
    id: 'hHemToArmholePitch',
    from: points.hem,
    to: points.armholePitch,
    x: points.hips.x + sa + 45,
  })
  macro('vd', {
    id: 'hHemToShoulder',
    from: points.hem,
    to: points.shoulder,
    x: points.hips.x + sa + 60,
  })
  macro('vd', {
    id: 'hFull',
    from: points.hem,
    to: points.neck,
    x: points.hips.x + sa + 75,
  })
  macro('ld', { from: points.neck, to: points.shoulder, d: sa + 15, id: 'lShoulderSeam' })
  points.cxHem = new Point(0, points.hem.y)
  points.cxNeck = points.cbNeck ? points.cbNeck.copy() : points.cfNeck.copy()
  macro('hd', {
    id: 'wAtHem',
    from: points.cxHem,
    to: points.hem,
    y: points.hem.y + sa + 15,
  })
  macro('hd', {
    id: 'wAtArmhole',
    from: points.cxHem,
    to: points.armhole,
    y: points.hem.y + sa + 30,
  })
  macro('hd', {
    id: 'wNeckToHps',
    from: points.cxNeck,
    to: points.s3CollarSplit,
    y: points.s3CollarSplit.y - sa - 15,
  })
  macro('hd', {
    id: 'wNeckToShoulder',
    from: points.cxNeck,
    to: points.s3ArmholeSplit,
    y: points.s3CollarSplit.y - sa - 15,
  })
  macro('hd', {
    id: 'wNeckToArmhole',
    from: points.cxNeck,
    to: points.armhole,
    y: points.s3CollarSplit.y - sa - 45,
  })
  macro('hd', {
    id: 'wArmholeToPitch',
    from: points.armholePitch,
    to: points.armhole,
    y: points.armhole.y,
  })

  return part
}

const measurements = ['hips', 'waist']
export const hipsEase = { pct: 8, min: -4, max: 20, menu: 'fit' }
export const ribbing = { bool: true, menu: 'style' }
const options = {
  waistEase: 0.08,
  collarEase: { pct: 10, min: 5, max: 30, menu: 'fit' },
  lengthBonus: { pct: 15, min: 0, max: 30, menu: 'style' },
  sleeveLengthBonus: { pct: 3, min: 0, max: 10, menu: 'style' },
  ribbingHeight: { pct: 8, min: 3, max: 15, menu: 'style' },
  hipsEase,
  ribbing,
}

export const front = {
  name: 'sven.front',
  from: brianFront,
  options,
  hide: hidePresets.HIDE_TREE,
  measurements,
  draft: svenFrontBack,
}

export const back = {
  name: 'sven.back',
  from: brianBack,
  options,
  hide: hidePresets.HIDE_TREE,
  measurements,
  draft: svenFrontBack,
}
