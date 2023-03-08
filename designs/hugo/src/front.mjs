import { front as brianFront } from '@freesewing/brian'
import { hidePresets } from '@freesewing/core'
import {
  collarEase,
  armholeDepthFactor,
  shoulderEase,
  shoulderSlopeReduction,
  frontArmholeDeeper,
  s3Collar,
  s3Armhole,
  chestEase,
  hipsEase,
  lengthBonus,
  ribbingHeight,
} from './options.mjs'

function hugoFront({
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
  part,
}) {
  // Remove clutter
  for (const i in paths) delete paths[i]

  // Remove notch inherited from Brian
  delete snippets.armholePitchNotch

  // Fit the hips
  points.hem.x = (measurements.hips * (1 + options.hipsEase)) / 4
  points.hemCp2 = new Point(points.hem.x, points.cfWaist.y)

  // Absolute values for percentages
  store.set(
    'lengthBonus',
    options.lengthBonus * (measurements.hpsToWaistBack + measurements.waistToHips)
  )
  store.set(
    'ribbing',
    (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight
  )

  // Ribbing
  points.cfRibbing = points.cfHem.shift(90, store.get('ribbing'))
  points.ribbing = points.hem.shift(90, store.get('ribbing'))

  // Raglan tip
  let neckOpening = new Path()
    .move(points.cfNeck)
    .curve(points.cfNeckCp1, points.neckCp2, points.neck)
  points.raglanTipFront = neckOpening.shiftFractionAlong(0.8)
  let neckOpeningParts = neckOpening.split(points.raglanTipFront)

  // Pocket
  points.pocketHem = points.cfRibbing.shiftFractionTowards(points.ribbing, 0.6)
  points.pocketCf = points.cfHem.shift(
    90,
    measurements.hpsToWaistBack * 0.33 + store.get('ribbing')
  )
  points.pocketTop = new Point(points.pocketHem.x, points.pocketCf.y)
  points.pocketTip = points.pocketHem
    .shift(90, points.pocketHem.x / 3)
    .rotate(-30, points.pocketHem)
  points.pocketTopCp = utils.beamsIntersect(
    points.pocketTop,
    points.pocketHem,
    points.pocketTip,
    points.pocketHem.rotate(90, points.pocketTip)
  )

  // Paths
  paths.saBase = new Path()
    .move(points.cfRibbing)
    .line(points.ribbing)
    .curve_(points.hemCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .line(points.raglanTipFront)
    .join(neckOpeningParts[0].reverse())
  paths.saBase.hide()
  paths.seam = paths.saBase.clone().unhide().close().attr('class', 'fabric')
  paths.pocket = new Path()
    .move(points.pocketHem)
    .line(points.pocketTip)
    .curve(points.pocketTip, points.pocketTopCp, points.pocketTop)
    .line(points.pocketCf)
    .attr('class', 'fabric help')
  // Store shoulder seam length, neck opening path, shoulder slope and raglan length
  store.set('shoulderLength', points.neck.dist(points.shoulder))
  store.set('neckOpeningPartFront', neckOpeningParts[1])
  store.set('neckOpeningAnchorFront', points.neck)
  store.set('shoulderSlopeDeltaY', points.neck.dy(points.shoulder))
  store.set(
    'raglen',
    new Path()
      .move(points.raglanTipFront)
      .line(points.armholeHollow)
      .curve(points.armholeHollowCp1, points.armholeCp2, points.armhole)
      .length()
  )
  store.set('neckOpeningLenFront', neckOpening.length())
  store.set('neckCutoutFront', points.cfNeck.y)

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfRibbing,
      grainline: true,
    })
    points.title = new Point(points.armhole.x / 2, points.armhole.y)
    macro('title', { at: points.title, nr: 1, title: 'front' })
    store.set('notchFront', points.raglanTipFront.dist(points.armholeHollow) / 2)
    points.sleeveNotch = points.raglanTipFront.shiftTowards(
      points.armholeHollow,
      store.get('notchFront')
    )
    snippets.sleeveNotch = new Snippet('notch', points.sleeveNotch)
    store.set('frontRaglanTipToNotch', points.raglanTipFront.dist(points.sleeveNotch))
    points.logo = points.title.shift(-90, 70)
    snippets.logo = new Snippet('logo', points.logo)
    if (sa) {
      paths.sa = paths.saBase.offset(sa).line(points.cfNeck).attr('class', 'fabric sa')
      paths.sa.move(points.cfRibbing).line(paths.sa.start())
    }
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.cfRibbing,
      to: points.cfNeck,
      x: points.cfNeck.x - 15,
    })
    macro('vd', {
      from: points.cfRibbing,
      to: points.raglanTipFront,
      x: points.cfNeck.x - 30,
    })
    macro('vd', {
      from: points.ribbing,
      to: points.armhole,
      x: points.ribbing.x + 15 + sa,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.raglanTipFront,
      y: points.raglanTipFront.y - 15 - sa,
    })
    macro('hd', {
      from: points.raglanTipFront,
      to: points.armhole,
      y: points.raglanTipFront.y - 15 - sa,
    })
    macro('hd', {
      from: points.cfRibbing,
      to: points.pocketTop,
      y: points.cfRibbing.y + 15 + sa,
    })
    macro('hd', {
      from: points.cfRibbing,
      to: points.pocketTip,
      y: points.cfRibbing.y + 30 + sa,
    })
    macro('hd', {
      from: points.cfRibbing,
      to: points.ribbing,
      y: points.cfRibbing.y + 45 + sa,
    })
    macro('vd', {
      from: points.pocketHem,
      to: points.pocketTop,
      x: points.pocketTip.x + 15,
    })
  }

  return part
}

export const front = {
  name: 'hugo.front',
  from: brianFront,
  hide: hidePresets.HIDE_TREE,
  measurements: ['hips', 'waistToHips'],
  options: {
    collarEase,
    armholeDepthFactor,
    shoulderEase,
    shoulderSlopeReduction,
    frontArmholeDeeper,
    s3Collar,
    s3Armhole,
    chestEase,
    hipsEase,
    lengthBonus,
    ribbingHeight,
  },
  draft: hugoFront,
}
