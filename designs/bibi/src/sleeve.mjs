import { sleevecap as brianSleeveCap } from '@freesewing/brian'
import { hidePresets } from '@freesewing/core'

export const sleeve = {
  name: 'bibi.sleeve',
  from: brianSleeveCap,
  hide: hidePresets.HIDE_TREE,
  options: {
    sleeveLength: {
      pct: 20,
      min: -20,
      max: 110,
      menu: (settings, mergedOptions) =>
        mergedOptions.sleeves === false ? false : 'style.sleeves',
    },
    cuffEase: {
      pct: 20,
      min: 0,
      max: 200,
      menu: (settings, mergedOptions) =>
        mergedOptions.sleeves === false ? false : 'style.sleeves',
    },
  },
  measurements: ['shoulderToWrist', 'wrist'],
  draft: bibiSleeve,
}

function bibiSleeve({
  options,
  store,
  measurements,
  points,
  paths,
  Point,
  Path,
  sa,
  macro,
  snippets,
  Snippet,
  part,
}) {
  points.sleeveTip = paths.sleevecap.edge('top')
  points.sleeveTop = new Point(0, points.sleeveTip.y) // Always in center

  // Determine the sleeve length
  store.set('sleeveLength', measurements.shoulderToWrist * options.sleeveLength)

  store.set('capSleeves', options.sleeveLength < 0.05)

  store.set('sleeveCapHeight', -points.sleeveTop.y)
  if (store.get('capSleeves')) {
    return part.hide()
  }

  if (!options.sleeves) {
    store.set('sleeveLength', 0)
    return part.hide()
  }

  // Wrist
  points.centerWrist = points.sleeveTop.shift(-90, measurements.shoulderToWrist)
  points.wristRight = points.centerWrist.shift(0, (measurements.wrist * (1 + options.cuffEase)) / 2)
  points.wristLeft = points.wristRight.rotate(180, points.centerWrist)

  points.cuffRight = points.bicepsRight.shiftFractionTowards(
    points.wristRight,
    options.sleeveLength
  )
  points.cuffLeft = points.bicepsLeft.shiftFractionTowards(points.wristLeft, options.sleeveLength)
  points.centerCuff = points.cuffRight.shiftFractionTowards(points.cuffLeft, 0.5)

  // Paths
  paths.sleevecap.hide()
  paths.seam = new Path()
    .move(points.bicepsLeft)
    .move(points.cuffLeft)
    .move(points.cuffRight)
    .line(points.bicepsRight)
    .join(paths.sleevecap)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */

  // Anchor point for sampling
  points.gridAnchor = new Point(0, 0)

  // Grainline
  macro('grainline', {
    from: points.centerCuff,
    to: points.centerBiceps,
  })

  // Cut list
  store.cutlist.addCut({ cut: 2, from: 'fabric' })

  // Logo
  points.logo = points.centerBiceps.shiftFractionTowards(points.centerCuff, 0.3)
  snippets.logo = new Snippet('logo', points.logo)

  // Title
  macro('title', { at: points.centerBiceps, nr: 3, title: 'sleeve' })

  // Notches
  points.frontNotch = paths.sleevecap.shiftAlong(store.get('frontArmholeToArmholePitch'))
  points.backNotch = paths.sleevecap.reverse().shiftAlong(store.get('backArmholeToArmholePitch'))
  snippets.frontNotch = new Snippet('notch', points.frontNotch)
  snippets.backNotch = new Snippet('bnotch', points.backNotch)

  // Dimensions
  macro('vd', {
    id: 'hCuffToArmhole',
    from: points.cuffLeft,
    to: points.bicepsLeft,
    x: points.bicepsLeft.x - sa - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.cuffLeft,
    to: points.sleeveTip,
    x: points.bicepsLeft.x - sa - 30,
  })
  macro('hd', {
    id: 'wFull',
    from: points.bicepsLeft,
    to: points.bicepsRight,
    y: points.sleeveTip.y - sa - 30,
  })
  macro('hd', {
    id: 'wCuff',
    from: points.cuffLeft,
    to: points.cuffRight,
    y: points.cuffLeft.y + sa + 30,
  })
  macro('pd', {
    id: 'lSleevevap',
    path: paths.sleevecap.reverse(),
    d: -1 * sa - 15,
  })

  return part
}
