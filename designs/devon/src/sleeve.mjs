import { sleeve as bentSleeve } from '@freesewing/bent'
import { front } from './front.mjs'
// import { Point } from '@freesewing/core'

export const sleeve = {
  name: 'devon.sleeve',
  from: bentSleeve,
  after: front,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  measurements: ['shoulderToElbow'],
  options: {
    sleeveAngle: { deg: 7, min: 0, max: 15, menu: 'fit' },
    cuffWidth: { pct: 7.5, min: 0, max: 10, menu: 'fit' },
  },
  draft: ({
    measurements,
    options,
    store,
    points,
    snippets,
    Point,
    Snippet,
    Path,
    paths,
    utils,
    macro,
    part,
  }) => {
    // let maxBack = Math.max(measurements.waistBack, measurements.seatBack) /2
    console.log({ spoints: JSON.parse(JSON.stringify(points)) })

    const cuffWidth = options.cuffWidth * measurements.shoulderToWrist
    const tsAngle = points.tsWristLeft.angle(points.tsWristRight) + 90
    const usAngle = points.usWristLeft.angle(points.usWristRight) + 90
    points.tsHelperLeft = points.tsWristLeft.shift(tsAngle, cuffWidth)
    points.tsHelperRight = points.tsWristRight.shift(tsAngle, cuffWidth)
    points.usHelperLeft = points.usWristLeft.shift(usAngle, cuffWidth)
    points.usHelperRight = points.usWristRight.shift(usAngle, cuffWidth)
    points.tsCuffLeft = utils.beamsIntersect(
      points.tsWristLeft,
      points.tsElbowLeft,
      points.tsHelperLeft,
      points.tsHelperRight
    )
    points.tsCuffRight = utils.beamsIntersect(
      points.tsWristRight,
      points.elbowRight,
      points.tsHelperLeft,
      points.tsHelperRight
    )
    points.usCuffLeft = utils.beamsIntersect(
      points.usWristLeft,
      points.usElbowLeft,
      points.usHelperLeft,
      points.usHelperRight
    )
    points.usCuffRight = utils.beamsIntersect(
      points.usWristRight,
      points.elbowRight,
      points.usHelperLeft,
      points.usHelperRight
    )

    console.log({ spoints: JSON.parse(JSON.stringify(points)) })

    paths.topSleeve = new Path()
      .move(points.tsCuffRight)
      .line(points.elbowRight)
      .curve(points.elbowRightCpTop, points.tsRightEdgeCpBottom, points.tsRightEdge)
      .curve_(points.tsRightEdgeCpTop, points.backPitchPoint)
      .curve(points.backPitchPoint, points.topCpRight, points.top)
      .curve(points.topCpLeft, points.frontPitchPointCpTop, points.frontPitchPoint)
      .curve(points.frontPitchPointCpBottom, points.tsLeftEdgeCpRight, points.tsLeftEdge)
      .curve(points.tsLeftEdge, points.tsElbowLeftCpTop, points.tsElbowLeft)
      .line(points.tsCuffLeft)
      .line(points.tsCuffRight)
      .close()
      .attr('class', 'lining')

    paths.underSleeve = new Path()
      .move(points.usCuffRight)
      .line(points.elbowRight)
      .curve(points.elbowRightCpTop, points.usRightEdgeCpBottom, points.usRightEdge)
      .curve_(points.usRightEdgeCpTop, points.usTip)
      .curve(points.usTipCpBottom, points.usLeftEdgeCpRight, points.usLeftEdgeRight)
      .line(points.usLeftEdge)
      .curve(points.usLeftEdge, points.usElbowLeftCpTop, points.usElbowLeft)
      .line(points.usCuffLeft)
      .line(points.usCuffRight)
      .close()
      .attr('class', 'stroke-xl interfacing')

    return part.hide()
  },
}
