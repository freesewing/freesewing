import { topSleeve as bentTopSleeve } from '@freesewing/bent'
import { sleeveVentLength, sleeveVentWidth } from './options.mjs'
import { hidePresets } from '@freesewing/core'

function jaegerTopSleeve({
  paperless,
  sa,
  utils,
  complete,
  points,
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
  points.ventFoldRight = points.tsWristLeft.shiftOutwards(points.tsWristRight, width)
  points.ventHelper = points.tsWristRight.shiftFractionTowards(
    points.elbowRight,
    options.sleeveVentLength
  )
  points.ventSlopeEnd = points.ventHelper
    .shiftTowards(points.tsWristRight, width)
    .rotate(90, points.ventHelper)
  points.ventSlopeStart = utils.beamsIntersect(
    points.tsWristRight,
    points.elbowRight,
    points.ventSlopeEnd,
    points.ventHelper.rotate(-1 * slope, points.ventSlopeEnd)
  )

  // Hem
  let hemSa = sa ? 3 * sa : 30
  points.hemHelperLeft = points.tsWristLeft
    .shiftTowards(points.tsWristRight, hemSa)
    .rotate(90, points.tsWristLeft)
  points.hemHelperRight = points.tsWristRight
    .shiftTowards(points.tsWristLeft, hemSa)
    .rotate(-90, points.tsWristRight)
  points.hemLeftIntersection = utils.beamsIntersect(
    points.hemHelperLeft,
    points.hemHelperRight,
    points.tsWristLeft,
    points.tsElbowLeft
  )
  points.hemRightIntersection = utils.beamsIntersect(
    points.hemHelperLeft,
    points.hemHelperRight,
    points.tsWristRight,
    points.elbowRight
  )
  points.hemVentIntersection = utils.beamsIntersect(
    points.hemHelperLeft,
    points.hemHelperRight,
    points.ventFoldRight,
    points.ventSlopeEnd
  )
  points.hemLeft = points.hemLeftIntersection.rotate(
    points.tsWristLeft.angle(points.hemLeftIntersection) * -2,
    points.tsWristLeft
  )
  points.hemRight = points.hemRightIntersection.rotate(
    points.tsWristRight.angle(points.hemRightIntersection) * -2,
    points.tsWristRight
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
    .curve(points.elbowRightCpTop, points.tsRightEdgeCpBottom, points.tsRightEdge)
    .curve_(points.tsRightEdgeCpTop, points.backPitchPoint)
    ._curve(points.topCpRight, points.top)
    .curve(points.topCpLeft, points.frontPitchPointCpTop, points.frontPitchPoint)
    .curve(points.frontPitchPointCpBottom, points.tsLeftEdgeCpRight, points.tsLeftEdge)
    ._curve(points.tsElbowLeftCpTop, points.tsElbowLeft)
    .line(points.tsWristLeft)
    .line(points.hemLeft)
    .line(points.ventRight)
    .line(points.ventFoldRight)
    .close()
    .attr('class', 'fabric')

  paths.ventHint = new Path()
    .move(points.ventSlopeStart)
    .line(points.tsWristRight)
    .attr('class', 'stroke-sm help')

  paths.hem = new Path()
    .move(points.tsWristLeft)
    .line(points.ventFoldRight)
    .attr('class', 'fabric lashed')

  if (complete) {
    macro('scalebox', { at: points.elbowCenter })
    // Notches
    macro('sprinkle', {
      snippet: 'notch',
      on: ['top', 'tsElbowLeft', 'elbowRight'],
    })
    // Title
    points.title = points.tsLeftEdge.shiftFractionTowards(points.tsRightEdge, 0.5)
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'topSleeve',
    })

    // Grainline
    macro('grainline', {
      from: points.boxBottom,
      to: points.top,
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('ld', {
        from: points.tsWristLeft,
        to: points.tsWristRight,
        d: 15,
      })
      macro('ld', {
        from: points.tsWristLeft,
        to: points.ventFoldRight,
        d: 30,
      })
      macro('ld', {
        from: points.hemLeft,
        to: points.ventRight,
        d: -15 - sa,
      })
      macro('ld', {
        from: points.hemLeft,
        to: points.tsWristLeft,
        d: 15 + sa,
      })
      macro('ld', {
        from: points.tsWristRight,
        to: points.ventSlopeStart,
        d: 15,
      })
      macro('ld', {
        from: points.ventFoldRight,
        to: points.ventSlopeEnd,
        d: 15,
      })
      macro('ld', {
        from: points.tsWristRight,
        to: points.ventFoldRight,
        d: -15,
      })
      macro('vd', {
        from: points.ventRight,
        to: points.top,
        x: points.ventSlopeEnd.x + sa + 15,
      })
      macro('vd', {
        from: points.tsWristLeft,
        to: points.tsElbowLeft,
        x: points.tsLeftEdge.x - sa - 15,
      })
      macro('vd', {
        from: points.tsWristLeft,
        to: points.tsLeftEdge,
        x: points.tsLeftEdge.x - sa - 30,
      })
      macro('vd', {
        from: points.tsLeftEdge,
        to: points.top,
        x: points.tsLeftEdge.x - sa - 30,
      })
      macro('vd', {
        from: points.tsWristLeft,
        to: points.top,
        x: points.tsLeftEdge.x - sa - 45,
      })
      macro('ld', {
        from: points.tsLeftEdge,
        to: points.tsRightEdge,
      })
      macro('ld', {
        from: points.tsElbowLeft,
        to: points.elbowRight,
      })
      macro('hd', {
        from: points.tsLeftEdge,
        to: points.top,
        y: points.top.y - sa - 15,
      })
      macro('hd', {
        from: points.tsLeftEdge,
        to: points.backPitchPoint,
        y: points.top.y - sa - 30,
      })
      macro('hd', {
        from: points.tsLeftEdge,
        to: points.tsRightEdge,
        y: points.top.y - sa - 45,
      })
    }
  }

  return part
}

export const topSleeve = {
  name: 'jaeger.topSleeve',
  from: bentTopSleeve,
  hide: hidePresets.HIDE_TREE,
  options: { sleeveVentLength, sleeveVentWidth },
  draft: jaegerTopSleeve,
}
