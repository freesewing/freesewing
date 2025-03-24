import { frontPoints as nobleFrontPoints } from '@freesewing/noble'
import { pctBasedOn, hidePresets } from '@freesewing/core'

export const frontPoints = {
  name: 'tristan.frontPoints',
  from: nobleFrontPoints,
  //   hide: hidePresets.HIDE_ALL,
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
    shoulderDartPosition: 0.5,

    // Percentages
    bustSpanEase: { pct: 0, min: -5, max: 20, ...pctBasedOn('bustSpan'), menu: 'fit' },
    armholeDepth: { pct: 44, min: 38, max: 55, menu: 'style' },
    cutDepthBack: { pct: 40, min: 5, max: 90, menu: 'style' },
    cutDepthFront: { pct: 80, min: 0, max: 125, menu: 'style' },
    cutRoundnessBack: { pct: 20, min: 0, max: 100, menu: 'style' },
    cutRoundnessFront: { pct: 10, min: 0, max: 100, menu: 'style' },
    // shoulderDartPosition: { pct: 50, min: 10, max: 90, menu: 'style' },
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
  draft: ({ Point, points, Path, paths, snippets, options, macro, store, utils, units, part }) => {
    // Hide Noble paths
    // for (const key of Object.keys(paths)) paths[key].hide()
    // for (const i in snippets) delete snippets[i]

    // Remove macros from Noble
    // macro('rmtitle')
    // macro('rmscalebox')
    // macro('rmcutonfold')

    points.cfNeck.addCircle(3)

    paths.insideSeam = new Path()
      .move(points.cfHem)
      .line(points.waistDartLeft)
      .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
      .line(points.shoulderDartInside)
      .line(points.hps)
      .curve(points.hpsCp2, points.cfNeckCp1, points.cfNeck)

    paths.seam = paths.insideSeam
      .join(new Path().move(points.cfNeck).line(points.cfHem))
      .close()
      .attr('class', 'fabric')

    paths.princessSeam = new Path()
      .move(points.shoulderDartOutside)
      .curve(
        points.shoulderDartTipCpDownOutside,
        points.waistUpDartRightCpUp,
        points.waistUpDartRight
      )
      .curve(points.waistUpDartRightCpDown, points.waistCpUp, points.waistDartRight)
      .hide()
    paths.armhole = new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
      .curve_(points.armholePitchCp2, points.shoulder)
      .hide()

    paths.seamB = new Path()
      .move(points.waistDartRight)
      .line(points.sideHem)
      .line(points.armhole)
      .join(paths.armhole)
      .line(points.shoulderDartOutside)
      .join(paths.princessSeam)
      .close()
      .attr('class', 'fabric')

    // const w = 500 * options.size
    // points.topLeft = new Point(0, 0)
    // points.topRight = new Point(w, 0)
    // points.bottomLeft = new Point(0, w / 2)
    // points.bottomRight = new Point(w, w / 2)

    // paths.seam2 = new Path()
    //     .move(points.topLeft)
    //     .line(points.bottomLeft)
    //     .line(points.bottomRight)
    //     .line(points.topRight)
    //     .line(points.topLeft)
    //     .close()
    //     .attr('class', 'fabric')

    return part
  },
}
