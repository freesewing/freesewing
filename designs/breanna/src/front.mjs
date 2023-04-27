import { frontBase } from './front-base.mjs'
import { back } from './back.mjs'

import { frontWithPrimaryOnly } from './front-primary-only.mjs'
import { frontWithPrimaryAt600 } from './front-primary-600.mjs'
import { frontWithPrimaryAt700 } from './front-primary-700.mjs'
import { frontWithPrimaryAt800 } from './front-primary-800.mjs'
import { frontWithPrimaryAt1100 } from './front-primary-1100.mjs'
import { frontWithPrimaryAt1130 } from './front-primary-1130.mjs'
import { frontWithPrimaryAt1200 } from './front-primary-1200.mjs'
import { frontWithPrimaryAt1300 } from './front-primary-1300.mjs'
import { frontWithPrimaryAt1330 } from './front-primary-1330.mjs'
import { frontWithPrimaryAt1400 } from './front-primary-1400.mjs'
import {
  applyBustDarts,
  getPrimaryDartRotationList,
  getSecondaryDartRotationList,
  getDartInsertionPoint,
  getDartLocationsAsNumbers,
  getDartPaths,
  getSaDartPaths,
} from './dart-utils.mjs'

function draftBreannaFront({
  options,
  store,
  utils,
  points,
  Path,
  paths,
  sa,
  complete,
  paperless,
  macro,
  snippets,
  Snippet,
  part,
}) {
  /*
   * We're starting from front-base here, which is injected into this part
   * It has a single primary bust dart at 06:00
   */

  // Store bust dart locations in the store for easy re-use
  let [loc1, loc2] = getDartLocationsAsNumbers(options)
  store.set('primaryBustDartLocation', loc1)
  store.set('secondaryBustDartLocation', loc2)

  // Save us some typing
  let angle = store.get('bustDartAngle')

  // Keep original bust dart points
  points.origBustDart1 = points.primaryBustDart1.clone()
  points.origBustDart2 = points.primaryBustDart2.clone()

  // Move the primary bust dart if it's not at 06:00
  if (loc1 !== 600) {
    // Find and rotate bust dart
    points.primaryBustDart1 = getDartInsertionPoint(points, utils, loc1, angle)
    points.primaryBustDart2 = points.primaryBustDart1.rotate(angle, points.primaryBustDartTip)

    // Rotate rest of the block
    for (let p of getPrimaryDartRotationList(loc1))
      points[p] = points[p].rotate(angle, points.primaryBustDartTip)

    // Let's keep the center front vertical as it is the grainline/cut-on-fold
    if (loc1 >= 1100) {
      let tilt = 270 - points.cfNeck.angle(points.cfWaist)
      for (let p in points) points[p] = points[p].rotate(tilt, points.cfNeck)
    }
  }
  if (loc2 === 0 || loc1 === loc2) {
    // Primary bust dart only

    // Apply correct bust dart length
    applyBustDarts(points, options, utils)

    // Load path template
    let template = frontWithPrimaryOnly(part)
    let [primary] = getDartPaths(Path, points)
    let [saPrimary] = getSaDartPaths(Path, points)

    // Insert dart into template
    paths.seam = template.insop('primary', primary)
    paths.saBase = template.insop('primary', saPrimary)
  } else {
    // Primary and secondary bust dart

    // Angle of the secondary bust dart = Reduction of the primary bust dart
    angle = angle * (1 - options.primaryBustDartShaping)

    // Figure out where the dart goes
    points.secondaryBustDart1 = getDartInsertionPoint(points, utils, loc2, angle)
    points.secondaryBustDart2 = points.secondaryBustDart1.rotate(angle, points.primaryBustDartTip)
    points.secondaryBustDartTip = points.primaryBustDartTip.clone()

    // Rotate the dart
    for (let p of getSecondaryDartRotationList(loc1, loc2)) {
      points[p] = points[p].rotate(angle, points.secondaryBustDartTip)
    }

    // Apply correct bust dart length
    applyBustDarts(points, options, utils)

    // Let's keep the center front vertical as it is the grainline/cut-on-fold
    let tilt = 270 - points.cfNeck.angle(loc1 === 700 ? points.primaryBustDart1 : points.cfWaist)
    for (let p in points) points[p] = points[p].rotate(tilt, points.cfNeck)

    // Load path template
    let template
    if (loc1 <= 600) template = frontWithPrimaryAt600(part)
    else if (loc1 <= 700) template = frontWithPrimaryAt700(part)
    else if (loc1 <= 1000) template = frontWithPrimaryAt800(part)
    else if (loc1 <= 1100) template = frontWithPrimaryAt1100(part)
    else if (loc1 <= 1130) template = frontWithPrimaryAt1130(part)
    else if (loc1 <= 1230) template = frontWithPrimaryAt1200(part)
    else if (loc1 <= 1300) template = frontWithPrimaryAt1300(part)
    else if (loc1 <= 1330) template = frontWithPrimaryAt1330(part)
    else template = frontWithPrimaryAt1400(part)

    // Insert darts into template
    let [primary, secondary] = getDartPaths(Path, points)
    let [saPrimary, saSecondary] = getSaDartPaths(Path, points)
    paths.seam = template.insop('primary', primary).insop('secondary', secondary)
    paths.saBase = template.insop('primary', saPrimary).insop('secondary', saSecondary)

    // Secondary dart hint
    paths.secondaryBustDartHint = new Path()
      .move(points.secondaryBustDart1)
      .line(points.secondaryBustDartEdge)
      .line(points.secondaryBustDart2)
      .attr('class', 'fabric dotted stroke-sm')
  }
  // Primary dart hint
  paths.primaryBustDartHint = new Path()
    .move(points.primaryBustDart1)
    .line(points.primaryBustDartEdge)
    .line(points.primaryBustDart2)
    .attr('class', 'fabric dotted stroke-sm')

  // All done. Just set final path properties before we get to SA/final/paperless
  paths.seam.close().attr('class', 'fabric')
  paths.saBase.close().hide()

  // Anchor point
  points.gridAnchor = points.cfNeck.clone()

  // CutonfoldAndGrainline
  macro('cutonfold', {
    from: points.cfNeck,
    to: points.cfWaist,
    grainline: true,
  })

  store.cutlist.addCut({ cut: 1 })

  // Complete pattern?
  if (complete) {
    // Logo
    points.logo = points.cfNeck.shift(-60, 70)
    snippets.logo = new Snippet('logo', points.logo)

    // Title
    points.title = points.logo.shift(-90, 70)
    macro('title', { nr: 2, title: 'front', at: points.title })

    // Notches
    snippets.bustNotch = new Snippet('notch', points.bustPoint)
    snippets.armholePitch = new Snippet('notch', points.armholePitch)

    if (sa) paths.sa = paths.saBase.offset(sa).attr('class', 'sa')
  }

  // Paperless?
  if (paperless) {
    let tl = paths.seam.edge('topLeft')
    let br = paths.seam.edge('bottomRight')
    macro('vd', {
      from: points.cfWaist,
      to: points.bustPoint,
      x: tl.x - 15 - sa,
    })
    macro('vd', {
      from: points.cfWaist,
      to: points.cfNeck,
      x: tl.x - 30 - sa,
    })
    macro('vd', {
      from: points.cfWaist,
      to: points.hps,
      x: tl.x - 45 - sa,
    })
    macro('vd', {
      from: points.waist,
      to: points.armhole,
      x: br.x + 15 + sa,
    })
    macro('vd', {
      from: points.waist,
      to: points.armholePitch,
      x: br.x + 30 + sa,
    })
    macro('vd', {
      from: points.waist,
      to: points.shoulder,
      x: br.x + 45 + sa,
    })
    macro('vd', {
      from: points.waist,
      to: points.hps,
      x: br.x + 60 + sa,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.hps,
      y: tl.y - 15 - sa,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.shoulder,
      y: tl.y - 30 - sa,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.armhole,
      y: tl.y - 30 - sa,
    })
    macro('hd', {
      from: points.cfWaist,
      to: points.bustPoint,
      y: br.y + 15 + sa,
    })
    macro('hd', {
      from: points.cfWaist,
      to: points.waist,
      y: br.y + 30 + sa,
    })
    macro('ld', {
      from: points.primaryBustDart1,
      to: points.primaryBustDart2,
      d: 15,
    })
    macro('ld', {
      from: points.primaryBustDart2,
      to: points.primaryBustDartTip,
      d: 15,
    })
    macro('ld', {
      from: points.primaryBustDart2,
      to: points.primaryBustDartTip,
      d: 15,
    })
    if (loc2 !== 0 && loc1 !== loc2) {
      macro('ld', {
        from: points.secondaryBustDart2,
        to: points.secondaryBustDartTip,
        d: 15,
      })
    }
  }

  return part
}

export const front = {
  name: 'breanna.front',
  from: frontBase,
  after: back,
  draft: draftBreannaFront,
}
