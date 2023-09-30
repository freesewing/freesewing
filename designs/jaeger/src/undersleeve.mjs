import { underSleeve as bentUnderSleeve } from '@freesewing/bent'
import { sleeveVentLength, sleeveVentWidth } from './options.mjs'
import { hidePresets } from '@freesewing/core'

function jaegerUnderSleeve({
  sa,
  utils,
  points,
  store,
  measurements,
  options,
  macro,
  paths,
  Path,
  part,
}) {
  // Vent
  let slope = 15
  let width = measurements.wrist * (1 + options.cuffEase) * options.sleeveVentWidth
  points.ventFoldRight = points.usWristLeft.shiftOutwards(points.usWristRight, width)
  points.ventHelper = points.usWristRight.shiftFractionTowards(
    points.elbowRight,
    options.sleeveVentLength
  )
  points.ventSlopeEnd = points.ventHelper
    .shiftTowards(points.usWristRight, width)
    .rotate(90, points.ventHelper)
  points.ventSlopeStart = utils.beamsIntersect(
    points.usWristRight,
    points.elbowRight,
    points.ventSlopeEnd,
    points.ventHelper.rotate(-1 * slope, points.ventSlopeEnd)
  )

  // Hem
  let hemSa = sa ? 3 * sa : 30
  points.hemHelperLeft = points.usWristLeft
    .shiftTowards(points.usWristRight, hemSa)
    .rotate(90, points.usWristLeft)
  points.hemHelperRight = points.usWristRight
    .shiftTowards(points.usWristLeft, hemSa)
    .rotate(-90, points.usWristRight)
  points.hemLeftIntersection = utils.beamsIntersect(
    points.hemHelperLeft,
    points.hemHelperRight,
    points.usWristLeft,
    points.usElbowLeft
  )
  points.hemRightIntersection = utils.beamsIntersect(
    points.hemHelperLeft,
    points.hemHelperRight,
    points.usWristRight,
    points.elbowRight
  )
  points.hemVentIntersection = utils.beamsIntersect(
    points.hemHelperLeft,
    points.hemHelperRight,
    points.ventFoldRight,
    points.ventSlopeEnd
  )
  points.hemLeft = points.hemLeftIntersection.rotate(
    points.usWristLeft.angle(points.hemLeftIntersection) * -2,
    points.usWristLeft
  )
  points.hemRight = points.hemRightIntersection.rotate(
    points.usWristRight.angle(points.hemRightIntersection) * -2,
    points.usWristRight
  )
  points.ventRight = points.hemVentIntersection.rotate(
    points.ventFoldRight.angle(points.hemVentIntersection) * -2,
    points.ventFoldRight
  )

  // Clean up - Remove this and uncomment paths below to understand what's going on
  for (let i of Object.keys(paths)) delete paths[i]

  // Paths
  paths.seam = new Path()
    .move(points.ventFoldRight)
    .line(points.ventSlopeEnd)
    .line(points.ventSlopeStart)
    .line(points.elbowRight)
    .curve(points.elbowRightCpTop, points.usRightEdgeCpBottom, points.usRightEdge)
    .curve_(points.usRightEdgeCpTop, points.usTip)
    .curve(points.usTipCpBottom, points.usLeftEdgeCpRight, points.usLeftEdgeRight)
    .line(points.usLeftEdge)
    ._curve(points.usElbowLeftCpTop, points.usElbowLeft)
    .line(points.usWristLeft)
    .line(points.hemLeft)
    .line(points.ventRight)
    .line(points.ventFoldRight)
    .close()
    .attr('class', 'fabric')

  paths.ventHint = new Path()
    .move(points.ventSlopeStart)
    .line(points.usWristRight)
    .attr('class', 'stroke-sm help')

  paths.hem = new Path()
    .move(points.usWristLeft)
    .line(points.ventFoldRight)
    .attr('class', 'fabric lashed')
  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut([
    { cut: 2, from: 'fabric' },
    { cut: 2, from: 'lining' },
  ])

  // Notches
  macro('sprinkle', {
    snippet: 'notch',
    on: ['top', 'usElbowLeft', 'elbowRight'],
  })

  // Title
  points.title = points.tsLeftEdge.shiftFractionTowards(points.tsRightEdge, 0.5)
  macro('title', {
    at: points.title,
    nr: 5,
    title: 'underSleeve',
  })

  // Grainline
  macro('grainline', {
    from: points.boxBottom,
    to: points.armCenter,
  })

  // Dimensions
  macro('ld', {
    id: 'lAtWrist',
    from: points.usWristLeft,
    to: points.usWristRight,
    d: 15,
  })
  macro('ld', {
    id: 'lAtWristPlusVent',
    from: points.usWristLeft,
    to: points.ventFoldRight,
    d: 30,
  })
  macro('ld', {
    id: 'lFoldoverCuff',
    from: points.hemLeft,
    to: points.ventRight,
    d: -15 - sa,
  })
  macro('ld', {
    id: 'hFoldoverCuff',
    from: points.hemLeft,
    to: points.usWristLeft,
    d: 15 + sa,
  })
  macro('ld', {
    id: 'lVent',
    from: points.usWristRight,
    to: points.ventSlopeStart,
    d: 15,
  })
  macro('ld', {
    id: 'lVentShort',
    from: points.ventFoldRight,
    to: points.ventSlopeEnd,
    d: 15,
  })
  macro('ld', {
    id: 'wVent',
    from: points.usWristRight,
    to: points.ventFoldRight,
    d: -15,
  })
  macro('vd', {
    id: 'hWristToElbow',
    from: points.usWristLeft,
    to: points.usElbowLeft,
    x: points.usLeftEdge.x - sa - 15,
  })
  macro('vd', {
    id: 'hFrontWristToArmhole',
    from: points.usWristLeft,
    to: points.usLeftEdge,
    x: points.usLeftEdge.x - sa - 30,
  })
  macro('vd', {
    id: 'hArmhole',
    from: points.usLeftEdge,
    to: points.usTip,
    x: points.usLeftEdge.x - sa - 30,
  })
  macro('vd', {
    id: 'hWristToSleeveTip',
    from: points.usWristLeft,
    to: points.usTip,
    x: points.usLeftEdge.x - sa - 45,
  })
  macro('ld', {
    id: 'wAtElbow',
    from: points.usElbowLeft,
    to: points.elbowRight,
  })
  macro('hd', {
    id: 'wArmhole',
    from: points.usLeftEdge,
    to: points.usTip,
    y: points.usTip.y - sa - 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.usLeftEdge,
    to: points.elbowRight,
    y: points.usTip.y - sa - 30,
  })

  return part
}

export const underSleeve = {
  name: 'jaeger.underSleeve',
  from: bentUnderSleeve,
  options: { sleeveVentLength, sleeveVentWidth },
  hide: hidePresets.HIDE_TREE,
  draft: jaegerUnderSleeve,
}
