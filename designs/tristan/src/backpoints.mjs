import { backPoints as nobleBackPoints } from '@freesewing/noble'
import { hidePresets } from '@freesewing/core'
import { frontPoints } from './frontpoints.mjs'

export const backPoints = {
  name: 'tristan.backPoints',
  from: nobleBackPoints,
  after: frontPoints,
  hide: hidePresets.HIDE_ALL,
  draft: ({ points, Path, paths, options, snippets, macro, utils, store, part }) => {
    const lacing = true == options.lacing && 'back' == options.lacingLocation

    // Hide Noble paths
    for (const key of Object.keys(paths)) paths[key].hide()
    for (const i in snippets) delete snippets[i]

    delete points.bustDartLeft
    delete points.bustDartLeftCp

    const strapWidth = store.get('strapWidth')

    points.strapInside = points.shoulderDart.shiftTowards(points.hps, strapWidth / 2)
    points.strapOutside = points.shoulderDart.shiftTowards(points.shoulder, strapWidth / 2)

    points.cbCut = new Path()
      .move(points.cbNeck)
      .curve_(points.cbNeckCp2, points.waistCenter)
      .shiftFractionAlong(options.cutDepthBack)

    points.cbCutCp2 = new Path()
      .move(points.cbNeck)
      .curve_(points.cbNeckCp2, points.waistCenter)
      .split(points.cbCut)[1].ops[1].cp1

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

    if (options.hem && !options.peplum) {
      const hemSize = store.get('hemSize')

      const waistCenterHemTemp1 = (lacing ? points.lacingWaist : points.waistCenter).shiftTowards(
        lacing ? points.lacingCut : points.cbCut,
        hemSize
      )
      const dartBottomLeftHemTemp = waistCenterHemTemp1.shift(
        (lacing ? points.lacingWaist : points.cbWaist).angle(points.dartBottomLeft),
        (lacing ? points.lacingWaist : points.cbWaist).dist(points.dartBottomLeft) * 1.5
      )
      const waistCenterHemTemp2 = dartBottomLeftHemTemp.shiftOutwards(waistCenterHemTemp1, 100)

      if (lacing) {
        points.waistCenterHem = utils.beamsIntersect(
          waistCenterHemTemp2,
          dartBottomLeftHemTemp,
          points.lacingWaist,
          points.cbCut
        )
      } else {
        points.waistCenterHem = utils.beamIntersectsCurve(
          waistCenterHemTemp2,
          dartBottomLeftHemTemp,
          points.waistCenter,
          points.waistCenter,
          points.cbCutCp2,
          lacing ? points.lacingCut : points.cbCut
        )
      }
      points.dartBottomLeftHem = utils.beamIntersectsCurve(
        waistCenterHemTemp2,
        dartBottomLeftHemTemp,
        points.dartBottomLeft,
        points.dartLeftCp,
        points.shoulderDartCpDown,
        points.dartTip
      )
      macro('mirror', {
        clone: false,
        mirror: [lacing ? points.lacingWaist : points.waistCenter, points.dartBottomLeft],
        points: ['waistCenterHem', 'dartBottomLeftHem'],
      })

      const waistSideHemTemp1 = points.waistSide.shiftTowards(points.armhole, hemSize)
      const waistDartRightHemTemp = waistSideHemTemp1.shift(
        points.waistSide.angle(points.dartBottomRight),
        points.waistSide.dist(points.dartBottomRight) * 1.5
      )
      const waistSideHemTemp2 = waistDartRightHemTemp.shiftOutwards(waistSideHemTemp1, 100)

      points.waistSideHem = utils.beamIntersectsCurve(
        waistSideHemTemp2,
        waistDartRightHemTemp,
        points.waistSide,
        points.waistSideCp2,
        points.armhole,
        points.armhole
      )
      points.dartBottomRightHem = utils.beamIntersectsCurve(
        waistSideHemTemp2,
        waistDartRightHemTemp,
        points.dartTip,
        points.shoulderDartCpDown,
        points.dartRightCp,
        points.dartBottomRight
      )
      macro('mirror', {
        clone: false,
        mirror: [points.dartBottomRight, points.waistSide],
        points: ['waistSideHem', 'dartBottomRightHem'],
      })
    }

    store.set('backOutsideWaistLength', points.dartBottomRight.dist(points.waistSide))
    store.set('backInsideWaistLength', points.dartBottomLeft.dist(points.waistCenter))

    return part
  },
}
