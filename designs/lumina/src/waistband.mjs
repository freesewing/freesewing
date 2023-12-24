import { cbqc } from '@freesewing/core'
import { points } from './points.mjs'

export const waistband = {
  name: 'lumina.waistband',
  after: points,
  draft: ({
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
    macro,
    log,
    utils,
    part,
  }) => {
    if (false === options.waistband) {
      return part.hide()
    }

    const waistLength = store.get('waistLength')
    const waistbandLength = store.get('waistbandLength')
    const waistbandSize = store.get('waistbandSize')
    if (waistbandSize <= 0) {
      return part.hide()
    }

    console.log({ store: JSON.parse(JSON.stringify(store)) })

    points.origin = new Point(0, 0) //.addCircle(3)

    const angleRad = Math.asin((Math.abs(waistbandLength - waistLength) * 0.5) / waistbandSize)
    const radius = (waistLength * 0.5) / Math.sin(angleRad)
    const baseAngle = waistLength < waistbandLength ? 270 : 90
    console.log({ baseAngle: baseAngle })
    let angle = utils.rad2deg(angleRad)

    let diff = 0
    let iter = 0
    let segments, cpDistance
    do {
      angle += diff * 0.025
      segments = 360 / angle

      cpDistance = (4 / 3) * Math.tan(Math.PI / (segments * 2)) * radius

      points.waistFront = points.origin.shift(baseAngle + angle, radius).addCircle(2)
      points.waistBack = points.origin.shift(baseAngle - angle, radius).addCircle(2)
      points.waistFrontCP = points.waistFront.shift(baseAngle - 90 + angle, cpDistance).addCircle(5)
      points.waistBackCP = points.waistBack.shift(baseAngle + 90 - angle, cpDistance).addCircle(5)

      paths.waist = new Path()
        .move(points.waistBack)
        .curve(points.waistBackCP, points.waistFrontCP, points.waistFront)

      diff = waistLength - paths.waist.length()
      console.log({ i: iter, d: diff, a: angle })
    } while (iter++ < 100 && (diff < -0.5 || diff > 0.5))
    if (iter >= 100) {
      log.info('lumina:couldNoFitWaistband')
      return part.hide()
    }

    points.waistbandFront = points.waistFront.shift(270 + angle, waistbandSize)
    points.waistbandBack = points.waistBack.shift(270 - angle, waistbandSize)

    cpDistance =
      (4 / 3) *
      Math.tan(Math.PI / (segments * 2)) *
      (radius + waistbandSize * (waistLength < waistbandLength ? 1 : -1))
    points.waistbandFrontCP = points.waistbandFront
      .shift(baseAngle - 90 + angle, cpDistance)
      .addCircle(5)
    points.waistbandBackCP = points.waistbandBack
      .shift(baseAngle + 90 - angle, cpDistance)
      .addCircle(5)

    paths.waistband = new Path()
      .move(points.waistbandBack)
      .curve(points.waistbandBackCP, points.waistbandFrontCP, points.waistbandFront)

    diff = waistbandLength - paths.waistband.length()
    console.log({ d: diff, a: angle })
    console.log({
      wl: waistLength,
      wpl: paths.waist.length(),
      wbl: waistbandLength,
      wbpl: paths.waistband.length(),
    })

    return part

    points.frontTop = new Point(0, 0).addCircle(3)
    points.frontBottom = points.frontTop.shift(270, waistbandSize).addCircle(5)

    let rotateAngle = 180 * 5
    do {
      points.backTop = points.frontTop.shift(rotateAngle * 0.2, waistLength).addCircle(7)
      points.backBottom = points.frontBottom.shift(rotateAngle * 0.2, waistbandLength).addCircle(9)
      rotateAngle++

      const angle = points.backTop.angle(points.backBottom)
      points.backTopCp = points.backTop.shift(angle + 90, waistLength * cbqc).addCircle(10)
      points.backBottomCp = points.backBottom.shift(angle + 90, waistbandLength * cbqc)
    } while (points.backTopCp.y < 0)

    diff = 0
    iter = 0
    const direction = waistLength > waistbandLength ? -1 : 1

    console.log({ wl: waistLength, wbl: waistbandLength })
    do {
      points.frontTopCp = points.frontTop.shift(180, waistLength * cbqc)
      points.frontBottomCp = points.frontBottom.shift(180, waistbandLength * cbqc)

      const angle = points.backTop.angle(points.backBottom)

      points.backTop = points.backTop.shift(angle, diff)
      points.backBottom = points.backBottom.shift(angle, diff)

      points.backTopCp = points.backTop.shift(angle + 90, waistLength * cbqc).addCircle(10)
      points.backBottomCp = points.backBottom.shift(angle + 90, waistbandLength * cbqc)

      paths.top = new Path()
        .move(points.frontTop)
        .curve(points.frontTopCp, points.backTopCp, points.backTop)
      paths.bottom = new Path()
        .move(points.frontBottom)
        .curve(points.frontBottomCp, points.backBottomCp, points.backBottom)

      diff = paths.top.length() - waistLength
      if (diff > -1 && diff < 1) {
        diff = paths.bottom.length() - waistbandLength
      }

      console.log({ i: iter, d: diff, t: paths.top.length(), b: paths.bottom.length() })
    } while (iter++ < 1 && (diff < -1 || diff > 1))
    return part
  },
}
