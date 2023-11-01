import { backPoints as nobleBackPoints } from '@freesewing/noble'
import { hidePresets } from '@freesewing/core'
import { frontPoints } from './frontpoints.mjs'

export const backPoints = {
  name: 'tristan.backPoints',
  from: nobleBackPoints,
  after: frontPoints,
  hide: hidePresets.HIDE_ALL,
  // options,
  draft: ({ points, Path, paths, options, snippets, log, store, part }) => {
    const lacing = true == options.lacing && 'back' == options.lacingLocation

    // Hide Noble paths
    for (const key of Object.keys(paths)) paths[key].hide()
    for (const i in snippets) delete snippets[i]

    delete points.bustDartLeft
    delete points.bustDartLeftCp

    const strapWidth = store.get('strapWidth')

    points.strapInside = points.shoulderDart.shiftTowards(points.hps, strapWidth / 2)
    points.strapOutside = points.shoulderDart.shiftTowards(points.shoulder, strapWidth / 2)

    // points.shoulder = points.strapOutside

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

    points.armholeCutCp = points.armhole.shift(
      180,
      options.armholeBackIn * points.armhole.dist(points.dartTip)
    )
    // .addCircle(4)

    points.strapOutsideCp = points.strapOutside.shiftFractionTowards(
      points.dartTip.shift(points.dartTip.angle(points.shoulderDart) - 90, strapWidth / 2),
      options.armholeFrontDepth
    )

    if (lacing) {
      points.lacingCut = points.cbCut.shift(
        0,
        (points.strapInsideCp.x - points.cbCut.x) * options.lacingWidth
      )
      points.lacingWaist = points.waistCenter.shiftTowards(
        points.dartBottomLeft,
        (points.strapInsideCp.x - points.cbCut.x) * options.lacingWidth
      )
    }

    store.set('backOutsideWaistLength', points.dartBottomRight.dist(points.waistSide))
    store.set('backInsideWaistLength', points.dartBottomLeft.dist(points.waistCenter))

    return part
  },
}
