import { back as bellaBack } from '@freesewing/bella'
import { hidePresets } from '@freesewing/core'
import * as options from './options.mjs'

export const backPoints = {
  name: 'noble.backPoints',
  from: bellaBack,
  hide: hidePresets.HIDE_ALL,
  options,
  draft: ({ points, Path, paths, options, snippets, log, part }) => {
    // Hide Bella paths
    for (const key of Object.keys(paths)) paths[key].hide()
    for (const i in snippets) delete snippets[i]

    delete points.bustDartLeft
    delete points.bustDartLeftCp

    points.shoulderDart = points.hps.shiftFractionTowards(
      points.shoulder,
      options.shoulderDartPosition
    )

    const aUp = points.dartTip.angle(points.shoulderDart)
    const aDown = points.dartBottomRight.angle(points.dartTip)
    const aDiff = Math.abs(aUp - aDown)

    // let dartCpAdjustment = Math.abs( options.shoulderDartPosition -.5) +.05
    const dartCpAdjustment = aDiff / 50

    points.shoulderDartCpUp = points.shoulderDart.shiftFractionTowards(
      points.dartTip,
      1 - dartCpAdjustment
    )
    points.shoulderDartCpDown = points.shoulderDart.shiftFractionTowards(
      points.dartTip,
      1 + dartCpAdjustment
    )

    const length = {
      i: new Path()
        .move(points.dartBottomLeft)
        .curve(points.dartLeftCp, points.shoulderDartCpDown, points.dartTip)
        .curve(points.shoulderDartCpUp, points.shoulderDart, points.shoulderDart)
        .length(),
    }

    let iteration = 0
    let diff = 0
    let angle = 0
    do {
      if (length.o) angle = diff * (length.o > length.i ? -0.1 : 0.1)

      points.dartBottomRight = points.dartBottomRight.rotate(angle, points.waistSide)

      length.o = new Path()
        .move(points.shoulderDart)
        .curve(points.shoulderDart, points.shoulderDartCpUp, points.dartTip)
        .curve(points.shoulderDartCpDown, points.dartRightCp, points.dartBottomRight)
        .length()

      diff = length.o - length.i
      iteration++
    } while (diff < -0.5 || (diff > 0.5 && iteration < 100))
    if (iteration >= 100) {
      log.error('Something is not quite right here!')
    }

    return part
  },
}
