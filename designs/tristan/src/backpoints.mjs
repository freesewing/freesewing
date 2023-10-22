import { backPoints as nobleBackPoints } from '@freesewing/noble'
import { hidePresets } from '@freesewing/core'
import * as options from './options.mjs'
import { frontPoints } from './frontpoints.mjs'

export const backPoints = {
  name: 'tristan.backPoints',
  from: nobleBackPoints,
  after: frontPoints,
  hide: hidePresets.HIDE_ALL,
  options,
  draft: ({ points, Path, paths, options, snippets, log, store, part }) => {
    // Hide Noble paths
    for (const key of Object.keys(paths)) paths[key].hide()
    for (const i in snippets) delete snippets[i]

    delete points.bustDartLeft
    delete points.bustDartLeftCp

    const strapWidth = store.get('strapWidth')

    console.log({ BP_options: JSON.parse(JSON.stringify(options)) })
    console.log({ BP_points: JSON.parse(JSON.stringify(points)) })
    console.log({ BP_paths: JSON.parse(JSON.stringify(paths)) })

    points.strapInside = points.shoulderDart.shiftTowards(points.hps, strapWidth / 2)
    points.strapOutside = points.shoulderDart.shiftTowards(points.shoulder, strapWidth / 2)

    points.shoulder = points.strapOutside

    // points.cbCut = points.cbNeck.shiftFractionTowards(points.waistCenter, options.cutDepthBack)
    points.cbCut = new Path()
      .move(points.cbNeck)
      .curve_(points.cbNeckCp2, points.waistCenter)
      .shiftFractionAlong(options.cutDepthBack)

    points.cbCutCp2 = new Path()
      .move(points.cbNeck)
      .curve_(points.cbNeckCp2, points.waistCenter)
      .split(points.cbCut)[1].ops[1].cp2

    points.cutSeamInside = new Path()
      .move(points.dartBottomLeft)
      .curve(points.dartLeftCp, points.shoulderDartCpDown, points.dartTip)
      .curve(points.shoulderDartCpUp, points.shoulderDart, points.shoulderDart)
      .intersectsY(points.cbCut.y)[0]

    points.cutSeamOutside = new Path()
      .move(points.shoulderDart)
      .curve(points.shoulderDart, points.shoulderDartCpUp, points.dartTip)
      .curve(points.shoulderDartCpDown, points.dartRightCp, points.dartBottomRight)
      .intersectsY(points.cbCut.y)[0]

    points.cbCutCp = points.cbCut.shiftFractionTowards(
      points.cutSeamInside,
      1 - options.cutRoundnessBack
    )

    points.strapInsideCp = points.strapInside.shiftFractionTowards(
      points.cutSeamInside.shift(
        points.cutSeamInside.angle(points.shoulderDart) + 90,
        strapWidth / 2
      ),
      1 - options.cutRoundnessBack
    )

    points.armholeCutCp = points.armhole.shiftFractionTowards(
      points.cutSeamOutside,
      1 - options.cutRoundnessBack
    )

    points.strapOutsideCp = points.strapOutside.shiftFractionTowards(
      points.cutSeamOutside.shift(
        points.cutSeamOutside.angle(points.shoulderDart) - 90,
        strapWidth / 2
      ),
      1 - options.cutRoundnessBack
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
