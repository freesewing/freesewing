import { frontPoints as nobleFrontPoints } from '@freesewing/noble'
import { hidePresets } from '@freesewing/core'
import * as options from './options.mjs'
import { utils } from 'mocha'

export const frontPoints = {
  name: 'tristan.frontPoints',
  from: nobleFrontPoints,
  hide: hidePresets.HIDE_ALL,
  options,
  draft: ({ log, points, Path, paths, snippets, options, macro, utils, part }) => {
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

    const shoulderWidthInside = points.shoulderDartInside.dist(points.hps)
    const shoulderWidthOutside = points.shoulderDartOutside.dist(points.shoulder)
    let strapWidth = (shoulderWidthInside + shoulderWidthOutside) * options.strapWidth

    if (strapWidth / 2 > shoulderWidthInside) {
      strapWidth = shoulderWidthInside * 2
    }
    if (strapWidth / 2 > shoulderWidthOutside) {
      strapWidth = shoulderWidthOutside * 2
    }

    console.log({ options: JSON.parse(JSON.stringify(options)) })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })

    points.strapInside = points.shoulderDartInside.shiftTowards(points.hps, strapWidth / 2)
    points.strapOutside = points.shoulderDartOutside.shiftTowards(points.shoulder, strapWidth / 2)

    points.shoulder = points.strapOutside

    // .line(points.armhole)
    //   .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
    // .curve_(points.armholePitchCp2, points.shoulder)
    points.cfCut = points.cfNeck.shiftFractionTowards(points.cfBust, options.cutDepthFront)

    points.cutSeamInside = new Path()
      .move(points.waistDartLeft)
      .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
      .line(points.shoulderDartInside)
      .intersectsY(points.cfCut.y)[0]

    points.cutSeamOutside = new Path()
      .move(points.waistDartRight)
      .curve(points.waistCpUp, points.waistUpDartRightCpDown, points.waistUpDartRight)
      .curve(
        points.waistUpDartRightCpUp,
        points.shoulderDartTipCpDownOutside,
        points.shoulderDartOutside
      )
      .intersectsY(points.cfCut.y)[0]

    points.cfCutCp = points.cfCut.shiftFractionTowards(
      points.cutSeamInside,
      1 - options.cutRoundnessFront
    )
    points.strapInsideCp = points.strapInside.shiftFractionTowards(
      points.cutSeamInside.shift(
        points.cutSeamInside.angle(points.shoulderDartInside) + 90,
        strapWidth / 2
      ),
      1 - options.cutRoundnessFront
    )

    points.armholeCutCp = points.armhole.shiftFractionTowards(
      points.cutSeamOutside,
      1 - options.cutRoundnessFront
    )

    points.strapOutsideCp = points.strapOutside.shiftFractionTowards(
      points.cutSeamOutside.shift(
        points.cutSeamOutside.angle(points.shoulderDartOutside) - 90,
        strapWidth / 2
      ),
      1 - options.cutRoundnessFront
    )

    const armHole = new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
      .curve_(points.armholePitchCp2, points.shoulder)

    console.log({
      intersects: armHole.intersects(
        new Path()
          .move(points.strapOutside)
          .curve(points.strapOutsideCp, points.armholeCutCp, points.armhole)
      ).length,
    })

    var iter = 0
    while (
      armHole.intersects(
        new Path()
          .move(points.strapOutside)
          .curve(points.strapOutsideCp, points.armholeCutCp, points.armhole)
      ).length != 0 &&
      ++iter < 250
    ) {
      points.armholeCutCp = points.armholeCutCp.shiftFractionTowards(points.cutSeamOutside, 0.05)
    }

    return part
  },
}
