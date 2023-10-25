import { collarStand } from './collarstand.mjs'
import { collarRoll } from './options.mjs'

/*
 * This collar would benefit from a redesign
 * but I find collar design to be rather tricky business and
 * would love the input from someone with more pattern design
 * experience, or more tailoring exprience.
 */

function jaegerCollar({ sa, snippets, points, options, macro, paths, Path, store, part }) {
  // Add extra fabric for collar roll
  store.set('collarRoll', points.collarstandCbTop.dist(points.collarCbTop) * options.collarRoll)
  points.collarCbTopRoll = points.collarCbTop.shift(-90, store.get('collarRoll'))
  points.collarCbTopCpRoll = points.collarCbTopCp.shift(-90, store.get('collarRoll'))
  points.notchTipRoll = points.notch.shiftOutwards(points.notchTip, store.get('collarRoll'))

  // Mirror to create left half
  let mirror = [
    'collarstandCbTopCp',
    'collarstandTip',
    'notch',
    'notchTip',
    'collarCbTopCp',
    'notchTipRoll',
    'collarCbTopCpRoll',
  ]
  for (let i of mirror) points[i + 'Left'] = points[i].flipX(points.collarCbTop)

  // Clean up
  for (let i of Object.keys(paths)) delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]

  // Paths
  paths.seam = new Path()
    .move(points.collarstandCbTop)
    .curve_(points.collarstandCbTopCpLeft, points.collarstandTipLeft)
    .line(points.notchLeft)
    .line(points.notchTipRollLeft)
    ._curve(points.collarCbTopCpRollLeft, points.collarCbTopRoll)
    .curve_(points.collarCbTopCpRoll, points.notchTipRoll)
    .line(points.notch)
    .line(points.collarstandTip)
    ._curve(points.collarstandCbTopCp, points.collarstandCbTop)
    .close()
    .attr('class', 'fabric')

  paths.roll = new Path()
    .move(points.notchTip)
    ._curve(points.collarCbTopCp, points.collarCbTop)
    .curve_(points.collarCbTopCpLeft, points.notchTipLeft)
    .attr('class', 'stroke-sm dashed')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  // Notches
  macro('sprinkle', {
    snippet: 'notch',
    on: ['collarstandCbTop', 'notchTip', 'notchTipLeft'],
  })
  // Title
  points.title = points.collarstandCbTopCp.shiftFractionTowards(points.collarCbTopCpRoll, 0.5)
  macro('title', {
    at: points.title,
    nr: 7,
    title: 'collar',
  })

  // Grainline
  macro('grainline', {
    from: points.collarCbTopRoll,
    to: points.collarstandCbTop,
  })

  // Dimensions
  macro('hd', {
    id: 'wAtTop',
    from: points.collarstandTipLeft,
    to: points.collarstandTip,
    y: points.collarstandCbTop.y - sa - 15,
  })
  macro('hd', {
    id: 'Full',
    from: points.notchLeft,
    to: points.notch,
    y: points.collarstandCbTop.y - sa - 30,
  })
  macro('hd', {
    id: 'wAtBottom',
    from: points.notchTipRollLeft,
    to: points.notchTipRoll,
    y: points.notchTipRoll.y + sa + 15,
  })
  macro('hd', {
    from: points.notchTipLeft,
    to: points.notchTip,
    y: points.notchTipRoll.y + sa + 30,
  })
  macro('vd', {
    id: 'hAtCenter',
    from: points.collarCbTopRoll,
    to: points.collarstandCbTop,
    x: points.collarCbTopRoll.x + 15,
  })
  macro('ld', {
    id: 'lTopSide',
    from: points.notch,
    to: points.collarstandTip,
    d: -1 * sa - 15,
  })
  macro('ld', {
    id: 'lBottomSideNarrow',
    from: points.notchTip,
    to: points.notch,
    d: -15 - sa,
  })
  macro('ld', {
    id: 'lBottomSideFull',
    from: points.notchTipRoll,
    to: points.notch,
    d: -30 - sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.notchTipRoll,
    to: points.collarstandCbTop,
    x: points.notch.x + sa + 40,
  })

  return part
}

export const collar = {
  name: 'jaeger.collar',
  from: collarStand,
  options: { collarRoll },
  draft: jaegerCollar,
}
