import { frontPoints as nobleFrontPoints } from '@freesewing/noble'
import { hidePresets } from '@freesewing/core'
import * as options from './options.mjs'

export const frontPoints = {
  name: 'tristan.frontPoints',
  from: nobleFrontPoints,
  hide: hidePresets.HIDE_ALL,
  options,
  draft: ({
    log,
    measurements,
    Point,
    points,
    Path,
    paths,
    snippets,
    options,
    macro,
    utils,
    store,
    part,
  }) => {
    const bCircle = 0.552284749831

    // Hide Noble paths
    for (const key of Object.keys(paths)) paths[key].hide()
    for (const i in snippets) delete snippets[i]

    // Remove macros from Noble
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
    store.set('strapWidth', strapWidth)
    console.log({ strapWidth: strapWidth })

    console.log({ options: JSON.parse(JSON.stringify(options)) })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })

    points.strapInside = points.shoulderDartInside.shiftTowards(points.hps, strapWidth / 2)
    points.strapOutside = points.shoulderDartOutside.shiftTowards(points.shoulder, strapWidth / 2)

    points.shoulder = points.strapOutside

    // .line(points.armhole)
    //   .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
    // .curve_(points.armholePitchCp2, points.shoulder)
    points.cfCut = points.cfNeck.shiftFractionTowards(points.cfBust, options.cutDepthFront)
    console.log({ cut: points.cfNeck.dist(points.cfCut) })

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
      .addCircle(6)

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

    points.armholeCutCp = points.armhole
      .shiftFractionTowards(points.bustDartTip, options.armholeFrontIn)
      .addCircle(4)
    // points.armholeCutCp = points.armhole.shiftFractionTowards(
    //   points.cutSeamOutside,
    //   1 - options.cutRoundnessFront
    // ).addCircle(4)

    points.strapOutsideCp = points.strapOutside.shiftFractionTowards(
      points.bustDartTip.shift(
        points.cutSeamOutside.angle(points.shoulderDartOutside) - 90,
        strapWidth / 2
      ),
      options.armholeFrontDepth
    )
    // points.strapOutsideCp = points.strapOutside.shiftFractionTowards(
    //   points.cutSeamOutside.shift(
    //     points.cutSeamOutside.angle(points.shoulderDartOutside) - 90,
    //     strapWidth / 2
    //   ),
    //   1 - options.cutRoundnessFront
    // )

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

    // var iter = 0
    // while (
    //   armHole.intersects(
    //     new Path()
    //       .move(points.strapOutside)
    //       .curve(points.strapOutsideCp, points.armholeCutCp, points.armhole)
    //   ).length != 0 &&
    //   ++iter < 250
    // ) {
    //   points.armholeCutCp = points.armholeCutCp.shiftFractionTowards(points.cutSeamOutside, 0.05)
    // }

    // armhole adjustment
    if (points.sideHem.y < points.waistDartRight.y) {
      points.sideHem.y = points.waistDartRight.y
    }
    return part
  },
}
