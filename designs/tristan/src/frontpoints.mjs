import { frontPoints as nobleFrontPoints } from '@freesewing/noble'
import { pctBasedOn, hidePresets } from '@freesewing/core'

export const frontPoints = {
  name: 'tristan.frontPoints',
  from: nobleFrontPoints,
  hide: hidePresets.HIDE_ALL,
  options: {
    // Static
    armholeBackDepth: 0.6,
    armholeBackIn: 0.6,
    armholeDartPosition: 0.5,
    armholeFrontDepth: 0.65,
    armholeFrontIn: 0.2,
    backArmholeCurvature: 0.63,
    backArmholePitchDepth: 0.035,
    backArmholeSlant: 5,
    backDartHeight: 0.46,
    backHemSlope: 2.5,
    backNeckCutout: 0.06,
    bustDartCurve: 1,
    bustDartLength: 0.9,
    dartPosition: 'shoulder',
    frontArmholeCurvature: 0.63,
    frontArmholePitchDepth: 0.29,
    shoulderToShoulderCorrection: 0.995,

    // Percentages
    bustSpanEase: { pct: 0, min: -5, max: 20, ...pctBasedOn('bustSpan'), menu: 'fit' },
    armholeDepth: { pct: 44, min: 38, max: 55, menu: 'style' },
    cutDepthBack: { pct: 40, min: 5, max: 90, menu: 'style' },
    cutDepthFront: { pct: 80, min: 0, max: 125, menu: 'style' },
    cutRoundnessBack: { pct: 20, min: 0, max: 100, menu: 'style' },
    cutRoundnessFront: { pct: 10, min: 0, max: 100, menu: 'style' },
    shoulderDartPosition: { pct: 50, min: 10, max: 90, menu: 'style' },
    strapWidth: { pct: 45, min: 5, max: 90, menu: 'style' },
    upperDartLength: { pct: 90, min: 80, max: 95, menu: 'advanced' },
    waistDartLength: { pct: 90, min: 75, max: 95, menu: 'advanced' },

    // Options
    // peplum: { bool: false, menu: 'style' },
    // peplumSize: { pct: 10, min: 5, max: 50, menu: 'peplum' },
  },
  draft: ({ points, Path, paths, snippets, options, macro, store, part }) => {
    const bCircle = 0.552284749831

    // Hide Noble paths
    for (const key of Object.keys(paths)) paths[key].hide()
    for (const i in snippets) delete snippets[i]

    // Remove macros from Noble
    macro('rmtitle')
    macro('rmscalebox')

    const shoulderWidthInside = points.shoulderDartInside.dist(points.hps)
    const shoulderWidthOutside = points.shoulderDartOutside.dist(points.shoulder)
    let strapWidth = (shoulderWidthInside + shoulderWidthOutside) * options.strapWidth

    console.log({
      r: strapWidth / shoulderWidthOutside,
      sw: shoulderWidthOutside,
      strap: strapWidth,
    })

    if (strapWidth / 2 > shoulderWidthInside) {
      strapWidth = shoulderWidthInside * 2
    }
    if (strapWidth / 2 > shoulderWidthOutside) {
      strapWidth = shoulderWidthOutside * 2
    }
    store.set('strapWidth', strapWidth)

    points.strapInside = points.shoulderDartInside.shiftTowards(points.hps, strapWidth / 2)
    points.strapOutside = points.shoulderDartOutside.shiftTowards(points.shoulder, strapWidth / 2)

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

    points.armholeCutCp = points.armhole.shiftFractionTowards(
      points.bustDartTip,
      options.armholeFrontIn
    )

    points.strapOutsideCp = points.strapOutside.shiftFractionTowards(
      points.bustDartTip.shift(
        points.cutSeamOutside.angle(points.shoulderDartOutside) - 90,
        strapWidth / 2
      ),
      options.armholeFrontDepth
    )

    if (points.strapOutsideCp.x > points.armholeDartCpBottom.x) {
      points.strapOutsideCp.x = points.armholeDartCpBottom.x
    }
    if (points.strapOutsideCp.y > points.armholeDartCpBottom.y) {
      points.strapOutsideCp.y = points.armholeDartCpBottom.y
    }

    // armhole adjustment
    if (points.sideHem.y < points.waistDartRight.y) {
      points.sideHem.y = points.waistDartRight.y
    }

    store.set('frontOutsideWaistLength', points.waistDartRight.dist(points.sideHem))
    store.set('frontInsideWaistLength', points.waistDartLeft.dist(points.cfHem))
    store.set('frontLength', points.cfNeck.dist(points.cfHem))

    return part
  },
}
