import { back as bellaBack } from '@freesewing/bella'
import { hidePresets } from '@freesewing/core'
import * as options from './options.mjs'

function nobleBackPoints({ points, Path, paths, options, snippets, log, part }) {
  // Hide Bella paths
  for (let key of Object.keys(paths)) paths[key].hide()
  for (let i in snippets) delete snippets[i]

  delete points.__titleNr
  delete points.__titleName
  delete points.__titlePattern
  delete points.scaleboxAnchor
  delete points.__scaleboxImperialBottomLeft
  delete points.__scaleboxMetricBottomLeft
  delete points.__scaleboxImperialTopLeft
  delete points.__scaleboxMetricTopLeft
  delete points.__scaleboxImperialTopRight
  delete points.__scaleboxMetricTopRight
  delete points.__scaleboxImperialBottomRight
  delete points.__scaleboxMetricBottomRight
  delete points.__scaleboxLead
  delete points.__scaleboxTitle
  delete points.__scaleboxText
  delete points.__scaleboxLink
  delete points.__scaleboxImperial
  delete points.__scaleboxMetric
  delete points.bustDartLeft
  delete points.bustDartLeftCp

  points.shoulderDart = points.hps.shiftFractionTowards(
    points.shoulder,
    options.shoulderDartPosition
  )

  let aUp = points.dartTip.angle(points.shoulderDart)
  let aDown = points.dartBottomRight.angle(points.dartTip)
  let aDiff = Math.abs(aUp - aDown)

  // let dartCpAdjustment = Math.abs( options.shoulderDartPosition -.5) +.05
  let dartCpAdjustment = aDiff / 50

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
}

export const backPoints = {
  name: 'noble.backPoints',
  from: bellaBack,
  hide: hidePresets.HIDE_ALL,
  options,
  draft: nobleBackPoints,
}
