import { collar } from './collar.mjs'

/*
 * This collar would benefit from a redesign
 * but I find collar design to be rather tricky business and
 * would love the input from someone with more pattern design
 * experience, or more tailoring exprience.
 */

function jaegerUnderCollar({ sa, snippets, points, macro, store, paths, Path, options, part }) {
  // Clean up
  for (let i of Object.keys(paths)) delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]

  // Paths
  paths.seam = new Path()
    .move(points.collarCorner)
    ._curve(points.neck, points.collarstandCbBottom)
    .curve_(points.leftNeck, points.leftCollarCorner)
    .line(points.leftCollarstandTip)
    .line(points.notchLeft)
    .line(points.notchTipRollLeft)
    ._curve(points.collarCbTopCpRollLeft, points.collarCbTopRoll)
    .curve_(points.collarCbTopCpRoll, points.notchTipRoll)
    .line(points.notch)
    .line(points.collarCorner)
    .close()
    .attr('class', 'various')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'various sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut([
    { cut: 1, from: 'special' },
    { cut: 1, from: 'canvas' },
  ])

  // Title
  points.title = points.collarCbTopCp
    .shiftFractionTowards(points.collarstandCbTopCp, 0.4)
    .shiftFractionTowards(points.collarstandCbTop, 0.5)
  macro('rmtitle')
  macro('title', {
    at: points.title,
    nr: 6,
    title: 'Under-collar-and-stand',
    scale: 0.6,
  })

  // Dimensions
  macro('rmad')
  macro('hd', {
    id: 'wAtTop',
    from: points.collarstandCbBottom,
    to: points.collarCorner,
    y: points.collarstandCbBottom.y - 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.collarstandCbBottom,
    to: points.notch,
    y: points.collarstandCbBottom.y - 30,
  })
  macro('hd', {
    id: 'wAtBottom',
    from: points.collarCbTop,
    to: points.notchTip,
    y: points.notchTip.y + 15,
  })
  macro('vd', {
    id: 'hAtCb',
    to: points.collarstandCbBottom,
    from: points.collarCbTop,
    x: points.collarCbTop.x - sa - 15,
  })
  macro('ld', {
    id: 'lTopSide',
    to: points.collarCorner,
    from: points.notch,
    d: -1 * sa - 15,
  })
  macro('ld', {
    id: 'lBottomSide',
    from: points.notchTip,
    to: points.notch,
    d: -15 - sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.notchTip,
    to: points.collarstandCbBottom,
    x: points.notch.x + sa + 40,
  })

  return part
}

export const underCollar = {
  name: 'jaeger.underCollar',
  from: collar,
  draft: jaegerUnderCollar,
}
