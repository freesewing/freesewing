import { frontPoints as nobleFrontPoints } from '@freesewing/noble'
import { hidePresets } from '@freesewing/core'
import * as options from './options.mjs'

export const frontPoints = {
  name: 'tristan.frontPoints',
  from: nobleFrontPoints,
  hide: hidePresets.HIDE_ALL,
  options,
  draft: ({ log, points, Path, paths, snippets, options, macro, part }) => {
    const bCircle = 0.552284749831

    // Hide Bella paths
    for (const key of Object.keys(paths)) paths[key].hide()
    for (const i in snippets) delete snippets[i]

    // Remove macros from Bella
    macro('rmtitle')
    macro('rmscalebox')

    console.log({ dist: points.hps.dist(points.shoulder) })
    console.log({ dist: points.shoulderDartInside.dist(points.hps) })
    console.log({ dist: points.shoulderDartOutside.dist(points.shoulder) })

    console.log({ options: JSON.parse(JSON.stringify(options)) })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })

    points.strapInside = points.shoulderDartInside
      .shiftFractionTowards(points.hps, options.strapWidth / 2)
      .addCircle(5)
    points.cfCut = points.cfNeck.shiftFractionTowards(points.cfBust, options.cutDepth).addCircle(5)

    points.cutSeam = new Path()
      .move(points.waistDartLeft)
      .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
      .line(points.shoulderDartInside)
      .intersectsY(points.cfCut.y)[0]
      .addCircle(5)

    points.xx = points.cutSeam
      .shift(
        points.cutSeam.angle(points.shoulderDartInside) + 90,
        points.shoulderDartInside.dist(points.strapInside)
      )
      .addCircle(5)

    points.cfCutCp = points.cfCut
      .shiftFractionTowards(points.cutSeam, 1 - options.cutRoundness)
      .addCircle(5)
    points.strapInsideCp = points.strapInside
      .shiftFractionTowards(points.xx, 1 - options.cutRoundness)
      .addCircle(5)
    return part
  },
}
