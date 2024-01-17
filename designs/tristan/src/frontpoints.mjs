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
    hemSize: {
      pct: 5.62,
      min: 1,
      max: 25,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) =>
        mergedOptions.hem === false || mergedOptions.peplum === true ? false : 'options',
    },
    upperDartLength: { pct: 90, min: 80, max: 95, menu: 'advanced' },
    waistDartLength: { pct: 90, min: 75, max: 95, menu: 'advanced' },

    // Options
    zipperLocation: { dflt: 'side', list: ['front', 'side', 'back'], menu: 'options' },
    hem: {
      bool: false,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions.peplum === true ? false : 'options'),
    },
    lacing: { bool: true, menu: 'options' },
    lacingLocation: {
      dflt: 'front',
      list: ['front', 'back'],
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions.lacing === false ? false : 'options'),
    },
    lacingWidth: {
      pct: 20,
      min: 0,
      max: 50,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions.lacing === false ? false : 'options'),
    },
  },
  draft: ({ points, Path, paths, snippets, options, macro, store, utils, units, part }) => {
    const lacing = true == options.lacing && 'front' == options.lacingLocation

    // Hide Noble paths
    for (const key of Object.keys(paths)) paths[key].hide()
    for (const i in snippets) delete snippets[i]

    // Remove macros from Noble
    macro('rmtitle')
    macro('rmscalebox')
    macro('rmcutonfold')

    points.sideWaist = points.sideHem.clone()
    points.sideWaistInitial = points.sideHemInitial.clone()
    points.cfWaist = points.cfHem.clone()

    store.cutlist.removeCut()

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

    if (strapWidth != (shoulderWidthInside + shoulderWidthOutside) * options.strapWidth) {
      store.flag.info({
        msg: 'tristan:strapWidthAdjusted',
        replace: {
          width: units(strapWidth),
        },
      })
    }

    points.strapInside = points.shoulderDartInside.shiftTowards(points.hps, strapWidth / 2)
    points.strapOutside = points.shoulderDartOutside.shiftTowards(points.shoulder, strapWidth / 2)

    points.cfCut = points.cfNeck.shiftFractionTowards(points.cfBust, options.cutDepthFront)

    paths.cutSeamInside = new Path()
      .move(points.waistDartLeft)
      .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
      .line(points.shoulderDartInside)
      .hide()
    points.cutSeamInside = paths.cutSeamInside.intersectsY(points.cfCut.y)[0]

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
    // if (points.sideWaist.y < points.waistDartRight.y) {
    //   points.sideWaist.y = points.waistDartRight.y
    // }

    if (lacing) {
      points.lacingCut = points.cfCut.shift(
        0,
        (points.strapInsideCp.x - points.cfCut.x) * options.lacingWidth
      )
      points.lacingWaist = points.cfWaist.shiftTowards(
        points.waistDartLeft,
        (points.strapInsideCp.x - points.cfCut.x) * options.lacingWidth
      )
    }

    if (options.hem && !options.peplum) {
      const hemSize = points.cfWaist.dist(points.cfNeck) * options.hemSize
      store.set('hemSize', hemSize)

      points.cfHem = (lacing ? points.lacingCut : points.cfCut).shiftOutwards(
        lacing ? points.lacingWaist : points.cfWaist,
        hemSize
      )
      points.cfHemIn = (lacing ? points.lacingWaist : points.cfWaist).shiftTowards(
        lacing ? points.lacingCut : points.cfCut,
        hemSize
      )
      const waistDartLeftHemInTemp = points.cfHemIn.shift(
        points.cfWaist.angle(points.waistDartLeft),
        points.cfWaist.dist(points.waistDartLeft) * 1.5
      )
      points.waistDartLeftHem = utils.beamIntersectsCurve(
        points.cfHemIn,
        waistDartLeftHemInTemp,
        points.waistDartLeft,
        points.waistDartLeftCp,
        points.shoulderDartTipCpDownInside,
        points.shoulderDartTip
      )

      points.sideWaistHem = points.armhole.shiftOutwards(points.sideWaist, hemSize)
      points.sideWaistHemIn = points.sideWaist.shiftTowards(points.armhole, hemSize)
      const waistDartRightHemInTemp = points.sideWaistHemIn.shift(
        points.sideWaist.angle(points.waistDartRight),
        points.sideWaist.dist(points.waistDartRight) * 1.5
      )
      points.waistDartRightHem = utils.beamIntersectsCurve(
        points.sideWaistHemIn,
        waistDartRightHemInTemp,
        points.waistDartRight,
        points.waistDartRightCp,
        points.waistUpDartRightCpDown,
        points.waistUpDartRight
      )
      macro('mirror', {
        clone: false,
        mirror: [points.cfWaist, points.waistDartLeft],
        points: ['waistDartLeftHem'],
      })
      macro('mirror', {
        clone: false,
        mirror: [points.sideWaist, points.waistDartRight],
        points: ['waistDartRightHem'],
      })
    }

    store.set('frontOutsideWaistLength', points.waistDartRight.dist(points.sideWaist))
    store.set(
      'frontInsideWaistLength',
      points.waistDartLeft.dist(lacing ? points.lacingWaist : points.cfWaist)
    )
    store.set('frontLength', points.cfNeck.dist(points.cfWaist))
    store.set('sideSeamLength', points.armhole.dist(points.sideWaist))

    return part
  },
}
