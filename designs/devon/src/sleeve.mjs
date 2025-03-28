import { sleeve as brianSleeve } from '@freesewing/brian'
import { front } from './front.mjs'
import { Point } from '@freesewing/core'

export const sleeve = {
  name: 'devon.sleeve',
  from: brianSleeve,
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

    points.frontNotch = paths.sleevecap.shiftAlong(store.get('armholeYokeFront'))
    points.backNotch = paths.sleevecap.reverse().shiftAlong(store.get('armholeYokeBack'))
    snippets.frontNotch = new Snippet('notch', points.frontNotch)
    snippets.backNotch = new Snippet('bnotch', points.backNotch)

    let psplit = paths.sleevecap.split(points.frontNotch)
    paths.sleevecapFront = psplit[0].attr('class', 'canvas').hide()
    psplit = psplit[1].split(points.backNotch)
    paths.sleevecapBack = psplit[1].attr('class', 'canvas').hide()
    paths.sleevecap = psplit[0]

    points.bicepsBack = points.bicepsLeft.shiftFractionTowards(points.bicepsRight, 0.25)
    points.bicepsCenter = points.bicepsLeft.shiftFractionTowards(points.bicepsRight, 0.5)
    points.bicepsFront = points.bicepsLeft.shiftFractionTowards(points.bicepsRight, 0.75)

    points.shoulderBack = new Point(points.bicepsBack.x, points.sleeveTop.y)
    points.shoulderCenter = new Point(points.bicepsCenter.x, points.sleeveTop.y)
    points.shoulderFront = new Point(points.bicepsFront.x, points.sleeveTop.y)

    points.elbowCenter = points.sleeveTop.shift(-90, measurements.shoulderToElbow)
    points.elbowBack = points.bicepsBack.copy()
    points.elbowFront = points.bicepsFront.copy()
    points.elbowBack.y = points.elbowFront.y = points.elbowCenter.y
    points.elbowLeft = utils.beamIntersectsY(
      points.wristLeft,
      points.bicepsLeft,
      points.elbowCenter.y
    )
    points.elbowRight = utils.beamIntersectsY(
      points.wristRight,
      points.bicepsRight,
      points.elbowCenter.y
    )

    points.cuffCenter = points.centerWrist.shift(
      90,
      options.cuffWidth * measurements.shoulderToWrist
    )
    points.cuffLeft = utils.beamIntersectsY(
      points.wristLeft,
      points.bicepsLeft,
      points.cuffCenter.y
    )
    points.cuffRight = utils.beamIntersectsY(
      points.wristRight,
      points.bicepsRight,
      points.cuffCenter.y
    )
    points.cuffBack = points.bicepsBack.copy()
    points.cuffFront = points.bicepsFront.copy()
    points.cuffBack.y = points.cuffFront.y = points.cuffCenter.y

    const rotate = [
      'elbowCenter',
      'elbowBack',
      'elbowFront',
      'elbowBack',
      'elbowLeft',
      'elbowRight',
      'cuffCenter',
      'cuffLeft',
      'cuffRight',
      'cuffBack',
      'cuffFront',
    ]
    for (let p of rotate) {
      points['_' + p] = points[p].rotate(options.sleeveAngle, points.elbowBack)
    }

    paths.temp1 = new Path()
      .move(points.bicepsLeft)
      .line(points.bicepsRight)
      .attr('class', 'interfacing')
    paths.temp2 = new Path()
      .move(points.elbowLeft)
      .line(points.elbowRight)
      .attr('class', 'interfacing')
    paths.temp3 = new Path()
      .move(points.cuffLeft)
      .line(points.cuffRight)
      .attr('class', 'interfacing')
    paths.temp4 = new Path()
      .move(points.bicepsBack)
      .line(points.cuffBack)
      .attr('class', 'interfacing')
    paths.temp5 = new Path()
      .move(points.bicepsCenter)
      .line(points.cuffCenter)
      .attr('class', 'interfacing')
    paths.temp6 = new Path()
      .move(points.bicepsFront)
      .line(points.cuffFront)
      .attr('class', 'interfacing')

    paths.temp11 = new Path()
      .move(points._elbowLeft)
      .line(points._elbowFront)
      .attr('class', 'various')
    paths.temp12 = new Path()
      .move(points._cuffLeft)
      .line(points._cuffFront)
      .attr('class', 'various')
    paths.temp13 = new Path()
      .move(points._elbowLeft)
      .line(points._cuffLeft)
      .attr('class', 'various')
    paths.temp14 = new Path()
      .move(points._elbowBack)
      .line(points._cuffBack)
      .attr('class', 'various')
    paths.temp15 = new Path()
      .move(points._elbowCenter)
      .line(points._cuffCenter)
      .attr('class', 'various')
    paths.temp16 = new Path()
      .move(points._elbowFront)
      .line(points._cuffFront)
      .attr('class', 'various')

    points.underSleevecapBack = points.backNotch
    points.underSleevecapFront = points.frontNotch
    points.underBicepsBack = new Point(points.underSleevecapBack.x, points.bicepsFront.y)
    points.underBicepsFront = new Point(points.underSleevecapFront.x, points.bicepsFront.y)

    points.underElbowRight = points._elbowCenter.shiftTowards(
      points._elbowFront,
      points._elbowFront.dist(points._elbowRight)
    )
    points.underCuffRight = points._cuffCenter.shiftTowards(
      points._cuffFront,
      points._cuffFront.dist(points._cuffRight)
    )
    points.underElbowLeft = points._elbowCenter.shiftTowards(
      points._elbowBack,
      points._elbowBack.dist(points._elbowLeft)
    )
    points.underCuffLeft = points._cuffCenter.shiftTowards(
      points._cuffBack,
      points._cuffBack.dist(points._cuffLeft)
    )

    const sides = ['Back', 'Front']
    for (let s of sides) {
      macro('mirror', {
        mirror: [points[`cuff${s}`], points[`shoulder${s}`]],
        paths: [`sleevecap${s}`],
        points: [`underSleevecap${s}`, `underBiceps${s}`],
        clone: true,
      })
    }

    points.topCuffLeft = points._cuffBack.shiftTowards(
      points._cuffCenter,
      points.mirroredUnderSleevecapBack.dist(points.underSleevecapBack)
    )
    points.underCuffLeft = points.underCuffLeft.shiftTowards(
      points._cuffBack,
      points.mirroredUnderSleevecapBack.dist(points.underSleevecapBack)
    )
    points.topCuffRight = points._cuffFront.shiftTowards(
      points._cuffCenter,
      points.mirroredUnderSleevecapFront.dist(points.underSleevecapFront)
    )
    points.underCuffRight = points.underCuffRight.shiftTowards(
      points._cuffFront,
      points.mirroredUnderSleevecapFront.dist(points.underSleevecapFront)
    )

    points._elbowFront = points._elbowFront.shiftTowards(
      points._elbowCenter,
      points.mirroredUnderSleevecapFront.dist(points.underSleevecapFront)
    )
    // points._elbowBack = points.elbowBack.shiftTowards(
    //   points._elbowCenter,
    //   points.mirroredUnderSleevecapFront.dist(points.underSleevecapFront)
    // )
    points._elbowBack = points.elbowBack.shiftTowards(
      points._elbowLeft,
      points.mirroredUnderSleevecapFront.dist(points.underSleevecapFront)
    )
    points.underElbowLeft = points.underElbowLeft.shiftTowards(
      points._elbowLeft,
      points.mirroredUnderSleevecapFront.dist(points.underSleevecapFront) * 2
    )

    points.underBicepsBack = points.underBicepsBack.shiftTowards(
      points.bicepsLeft,
      points.bicepsBack.dist(points.underBicepsBack)
    )
    points.mirroredUnderBicepsBack = points.mirroredUnderBicepsBack.shiftTowards(
      points.bicepsLeft,
      points.bicepsBack.dist(points.underBicepsBack) / 2
    )

    points.topCuffRight = points.topCuffRight.shiftTowards(
      points._cuffCenter,
      points.underCuffLeft.dist(points.topCuffLeft)
    )
    points.underCuffLeft = points.topCuffLeft.copy()

    paths.under = new Path()
      .move(points.mirroredUnderSleevecapFront)
      .join(paths.mirroredSleevecapFront.reverse())
      .join(paths.mirroredSleevecapBack.reverse())
      .curve(points.mirroredUnderBicepsBack, points.underElbowLeft, points.underCuffLeft)
      // .line(points.mirroredUnderBicepsBack)
      // .line(points.underElbowLeft)
      // .line(points.underCuffLeft)
      .line(points.underCuffRight)
      .curve(
        points.underElbowRight,
        points.mirroredUnderBicepsFront,
        points.mirroredUnderSleevecapFront
      )
      // .line(points.underElbowRight)
      // .line(points.mirroredUnderBicepsFront)
      // .line(points.mirroredUnderSleevecapFront)
      .attr('class', 'lining')

    paths.top = new Path()
      .move(points.underSleevecapFront)
      .join(paths.sleevecap)
      .curve(points.underBicepsBack, points._elbowBack, points.topCuffLeft)
      // .line(points.underBicepsBack)
      // .line(points._elbowBack)
      // .line(points.topCuffLeft)
      .line(points.topCuffRight)
      .curve(points._elbowFront, points.bicepsFront, points.underSleevecapFront)
      // .line(points._elbowFront)
      // .line(points.underBicepsFront)
      // .line(points.underSleevecapFront)
      .attr('class', 'note')

    console.log({ points: JSON.parse(JSON.stringify(points)) })

    console.log({
      side: 'sleeve',
      cuffWidth: points.wristLeft.dist(points.cuffRight),
      newCuffWidth:
        points.topCuffLeft.dist(points.topCuffRight) +
        points.underCuffLeft.dist(points.underCuffRight),
    })

    return part
  },
}
