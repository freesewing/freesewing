import { stretchToScale } from '@freesewing/core'

function draftUmbraBase({
  options,
  Point,
  Path,
  points,
  paths,
  measurements,
  complete,
  store,
  utils,
  expand,
  units,
  macro,
  part,
}) {
  /*
   * Helper Functions
   */
  /**
   * Interpolates between 3 given values.
   * A factor of 0 will return `v1`, a factor of 0.5 will return `v2` and a factor of 1 will return `v3`.
   * In between factors will interpolate linearly between the neighbouring values.
   * Factors outside the range 0..1 are unsupported.
   *
   * @param v1 {number} First value
   * @param v2 {number} Second value
   * @param v3 {number} Third value
   * @param factor {number} factor
   * @return {number}
   */
  function interpolateValue(v1, v2, v3, factor) {
    if (factor < 0.5) {
      return 2 * (v2 * factor + v1 * (0.5 - factor))
    }
    return 2 * (v3 * (factor - 0.5) + v2 * (1 - factor))
  }

  /**
   * Interpolates between 3 given points.
   * A factor of 0 will return `p1`, a factor of 0.5 will return `p2` and a factor of 1 will return `p3`.
   * In between factors will interpolate linearly between the neighbouring points.
   *
   * @param p1 {Point} First point
   * @param p2 {Point} Second point
   * @param p3 {Point} Third point
   * @param factor {number} factor
   * @return {Point}
   */
  function interpolatePoint(p1, p2, p3, factor) {
    return new Point(
      interpolateValue(p1.x, p2.x, p3.x, factor),
      interpolateValue(p1.y, p2.y, p3.y, factor)
    )
  }

  /*
   * Calculate stretch for easy access
   */
  const stretch = {
    x: utils.stretchToScale(options.xStretch),
    y: utils.stretchToScale(options.yStretch),
    elastic: utils.stretchToScale(options.elasticStretch),
  }

  let minFabricWidth = options.minFabricWidth * measurements.seat

  /*
   * Create points
   * All center front (cf) points have x=0
   * All side points have positive Y-coordinate
   * Note that we're only drafting half of the shape as it's symmetric
   */

  /*
   * Waist line
   */
  points.cfWaist = new Point(0, 0)
  points.sideWaist = new Point((measurements.waist / 4) * stretch.x, 0)

  /*
   * Hip line
   */
  points.cfHips = new Point(0, measurements.waistToHips * stretch.y)
  points.sideHips = new Point((measurements.hips / 4) * stretch.x, points.cfHips.y)

  /*
   * Seat line
   */
  points.cfSeat = new Point(0, measurements.waistToSeat * stretch.y)
  points.sideSeat = new Point((measurements.seat / 4) * stretch.x, points.cfSeat.y)

  /*
   * The absolute middle, will be used to mirror the waistline to the back
   */
  const waistToMiddle = measurements.crossSeam / 2
  points.cfMiddle = new Point(0, stretch.y * waistToMiddle)

  /*
   * The gusset position (slimmest part in the crotch)
   */
  points.cfGusset = new Point(
    0,
    stretch.y *
      interpolateValue(
        measurements.waistToSeat,
        measurements.crossSeamFront,
        waistToMiddle,
        options.gussetPosition
      )
  )
  points.sideGusset = new Point(waistToMiddle * options.gussetWidth * stretch.x, points.cfGusset.y)

  /*
   * This path plots the width of the body from the waist to the seat to position the waistband according to height
   */
  paths.bodySide = new Path()
    .move(points.sideWaist)
    .line(points.sideHips)
    .line(points.sideSeat)
    .hide()

  /*
   * Waistband line
   */
  points.cfWaistband = points.cfSeat.shiftFractionTowards(points.cfHips, options.rise)
  const intersection = paths.bodySide.intersectsY(points.cfWaistband.y)
  if (intersection == null || intersection.length === 0) {
    // If the waistband is somehow above the waistline, continue to use the waist measurement
    // This is mostly to prevent errors when the user entered an abnormally low distance between waist and hips
    // together with a very high rise
    points.sideWaistbandBase = new Point(points.sideWaist.x, points.cfWaistband.y)
  } else {
    points.sideWaistbandBase = intersection[0]
  }

  /*
   * Start of the leg opening
   */
  points.sideLegBase = points.sideSeat.shiftTowards(
    points.sideWaistbandBase,
    options.legRise * points.cfGusset.dist(points.cfHips)
  )

  // Enforce minimum fabric width above leg opening
  if (
    points.sideLegBase.dist(points.sideWaistbandBase) < minFabricWidth ||
    points.sideLegBase.y < points.sideWaistbandBase.y
  ) {
    points.sideLegBase = points.sideWaistbandBase.shiftTowards(points.sideSeat, minFabricWidth)
  }

  /*
   * Determine crotch seam split position
   */
  points.cfMaxSplit = new Point(0, 2 * stretch.y * waistToMiddle - points.sideLegBase.y)
  points.cfBackGusset = points.cfGusset.shiftFractionTowards(
    points.cfMaxSplit,
    options.splitPosition
  )

  /*
   * Now add the front gusset control point
   */
  points.gussetFrontCp = points.sideGusset.shift(
    90,
    points.sideLegBase.dy(points.sideGusset) * options.frontExposure
  )

  /*
   * Flip front side waistband positions to back
   */
  for (const flip of ['cfWaist', 'cfWaistband', 'sideWaistbandBase', 'sideLegBase']) {
    points[`${flip}Back`] = points[flip].flipY(points.cfMiddle)
  }

  // Make the front smaller by options.frontReduction
  points.sideWaistbandFront = new Point(
    points.sideWaistbandBase.x * (1 - options.frontReduction),
    points.sideWaistbandBase.y
  )
  points.sideLegFront = new Point(
    points.sideLegBase.x * (1 - options.frontReduction),
    points.sideLegBase.y
  )

  // Add the reduced distance to the back part
  points.sideWaistbandBack = points.sideWaistbandBaseBack.shift(
    0,
    points.sideWaistbandFront.dist(points.sideWaistbandBase)
  )
  points.sideLegBack = points.sideLegBaseBack.shift(0, points.sideLegFront.dist(points.sideLegBase))
  // correct for different length
  points.sideLegBack = points.sideWaistbandBack.shiftTowards(
    points.sideLegBack,
    points.sideWaistbandFront.dist(points.sideLegFront)
  )

  /*
   * Dip the waistband at the front
   */
  points.cfWaistbandDipCp1Front = utils.beamIntersectsX(
    points.sideWaistbandFront,
    points.sideLegFront.rotate(-90, points.sideWaistbandFront),
    points.sideWaistbandFront.x / 2
  )
  points.cfWaistbandDipFront = new Point(
    0,
    points.cfWaistbandDipCp1Front.y + waistToMiddle * options.frontDip
  )
  points.cfWaistbandDipCp2Front = new Point(
    points.cfWaistbandDipCp1Front.x * options.frontDipShape,
    points.cfWaistbandDipFront.y
  )
  points.cfWaistbandDipCp1Front = points.cfWaistbandDipCp1Front.shiftFractionTowards(
    points.sideWaistbandFront,
    options.frontDipShape
  )

  /*
   * Dip the waistband at the back
   */
  points.cfWaistbandDipCp1Back = utils.beamIntersectsX(
    points.sideWaistbandBack,
    points.sideLegBack.rotate(-90, points.sideWaistbandBack),
    points.sideWaistbandBack.x / 2
  )
  points.cfWaistbandDipBack = new Point(
    0,
    points.cfWaistbandDipCp1Back.y - waistToMiddle * options.backDip
  )
  points.cfWaistbandDipCp2Back = new Point(
    points.cfWaistbandDipCp1Back.x * options.backDipShape,
    points.cfWaistbandDipBack.y
  )
  points.cfWaistbandDipCp1Back = points.cfWaistbandDipCp1Back.shiftFractionTowards(
    points.sideWaistbandBack,
    options.backDipShape
  )

  /*
   * We curve at the same angle as the front waistband dip here.
   * Not doing so would mean that when the front exposure is high,
   * and thus the fabric at the side gets narrow,
   * Both curves would not be parallel which looks messy.
   */
  const dipAngle = points.sideLegFront.angle(points.sideWaistbandFront) + 90
  points.sideLegCpFront = points.sideLegFront.shift(
    dipAngle,
    (points.sideGusset.dx(points.sideLegFront) / 3) * (1 - options.frontReduction)
  )
  points.sideLegCp1Back = points.sideLegBack.shift(
    -dipAngle,
    points.sideGusset.dx(points.sideLegBack) * 0.25
  )

  /*
   * Now add the back gusset control point
   */
  points.gussetBackCp2 = points.sideGusset.shift(
    90,
    points.sideLegCp1Back.dy(points.sideGusset) * 0.25
  )

  /*
   * Make checking for bulge easy
   */
  store.set('bulge', options.bulge >= 2)

  /*
   * Construct the control points for the back curve.
   * First create a simple back curve that mimics the one from Uma
   */
  paths.simpleBackCurve = new Path()
    .move(points.sideLegBaseBack)
    .curve(points.sideLegCp1Back, points.gussetBackCp2, points.sideGusset)
    .hide()

  const backMaxY = points.cfWaistbandDipBack.y - points.sideLegBase.dist(points.sideWaistbandBase)

  /*
   * Determine the default back curve center point and angle by probing a fraction along that curve
   */
  const curvePointFraction = 0.6
  const epsilon = 0.01
  points.backCurveCenterDefault = paths.simpleBackCurve.shiftFractionAlong(curvePointFraction)
  const curvePointAngle = paths.simpleBackCurve
    .shiftFractionAlong(curvePointFraction - epsilon)
    .angle(paths.simpleBackCurve.shiftFractionAlong(curvePointFraction + epsilon))

  /*
   * Determine control point for maximum coverage
   */
  points.backCurveCenterMax = new Point(
    points.sideLegBase.x * 0.7,
    points.cfMiddle.shiftFractionTowards(points.sideLegBaseBack, 0.3).y
  )
  /*
   * Determine control point for minimum coverage (thong-like)
   */
  points.backCurveCenterMin = points.cfWaistbandBack
    .shiftFractionTowards(points.cfMiddle, 0.5)
    .shift(0, minFabricWidth / 2)

  /* This is the additional point */
  points.sideFullnessBack = interpolatePoint(
    points.backCurveCenterMax,
    points.backCurveCenterDefault,
    points.backCurveCenterMin,
    options.backExposure
  )

  if (points.sideFullnessBack.y > backMaxY) {
    points.sideFullnessBack = new Point(points.sideFullnessBack.x, backMaxY)
  }

  /* Determine the angle for the line at that point */
  const shiftAngle = interpolateValue(160, curvePointAngle, 90, options.backExposure)
  const shiftAmount =
    points.cfSeat.dist(points.sideSeat) * interpolateValue(0.5, 0.1, 0.5, options.backExposure)

  /* Determine control points */
  points.sideLegCp2Back = points.sideFullnessBack.shift(shiftAngle, -shiftAmount)
  if (points.sideLegCp2Back.y > backMaxY) {
    points.sideLegCp2Back = new Point(points.sideLegCp2Back.x, backMaxY)
  }
  points.gussetBackCp1 = points.sideFullnessBack.shift(shiftAngle, shiftAmount)
  points.gussetBackCp2 = points.sideGusset.shift(
    90,
    points.sideFullnessBack.dy(points.sideGusset) / 4
  )
  points.gussetFrontCp = points.sideGusset.shift(
    90,
    points.sideLegCpFront.dy(points.sideGusset) * options.frontExposure
  )

  /*
   * Construct leg curve for the back part
   */
  paths.backCurve = new Path()
    .move(points.sideLegBack)
    .curve(points.sideLegCp1Back, points.sideLegCp2Back, points.sideFullnessBack)
    .curve(points.gussetBackCp1, points.gussetBackCp2, points.sideGusset)
    .hide()

  /*
   * Determine split point for crotch seam
   */
  const intersectsY = paths.backCurve.intersectsY(points.cfBackGusset.y)[0]

  let backCurveParts = []
  if (intersectsY && !Array.isArray(intersectsY)) {
    points.backGussetSplit = intersectsY
    backCurveParts = paths.backCurve.split(points.backGussetSplit)
  }
  if (!(backCurveParts && backCurveParts.length > 1)) {
    points.backGussetSplit = points.sideGusset
    backCurveParts = [paths.backCurve]
  }

  /*
   * This is the part of the back curve that will be used for the back part
   */
  paths.elasticLegBack = backCurveParts[0].hide()

  paths.back = new Path()
    .move(points.cfWaistbandDipBack)
    .curve(points.cfWaistbandDipCp2Back, points.cfWaistbandDipCp1Back, points.sideWaistbandBack)
    .join(paths.elasticLegBack)
    .line(points.cfBackGusset)
    .hide()

  // Determine center position of bulge
  // TODO: Add measurement or make adjustable?
  points.cfBulgeSplit = points.cfMiddle.shiftFractionTowards(points.cfHips, 0.5)

  // Enforce minimum fabric width above bulge split
  if (points.cfBulgeSplit.y < points.cfWaistbandDipFront.y + minFabricWidth) {
    points.cfBulgeSplit = points.cfWaistbandDipFront.shift(-90, minFabricWidth)
  }

  points.rotationOrigin = new Point(points.sideGusset.x, points.cfBulgeSplit.y)

  for (const pid of [
    'backGussetSplit',
    'cfMiddle',
    'cfGusset',
    'cfBackGusset',
    'sideGusset',
    'gussetFrontCp',
  ]) {
    if (store.get('bulge')) {
      points[`${pid}Bulge`] = points[pid].rotate(options.bulge, points.rotationOrigin)
    } else {
      points[`${pid}Bulge`] = points[pid]
    }
  }

  points.bulgeCp = points.cfBulgeSplit.shift(
    -90,
    points.cfBulgeSplit.dy(points.cfGussetBulge) * options.bulgeFullness
  )

  points.cfGussetBulgeCp = points.cfGussetBulge.shift(
    90 + options.bulge,
    points.cfGussetBulge.dist(points.cfBulgeSplit) * 0.5
  )

  points.gussetFrontCpBulge = points.gussetFrontCpBulge.shiftFractionTowards(
    points.sideGussetBulge,
    options.bulge / 200
  )

  /*
   * Rotate control points and bottom part of the back curve around the rotationOrigin to create the bulge
   */
  if (store.get('bulge')) {
    points[`bulgeCpBulge`] = points['bulgeCp'].rotate(options.bulge, points.rotationOrigin)
  } else {
    points[`bulgeCpBulge`] = points['bulgeCp']
  }

  points.bulgeCpBottom = points.bulgeCpBulge
    .shiftFractionTowards(points.bulgeCp, options.bulgeFullness)
    .shiftFractionTowards(points.cfBulgeSplit, 0.5)

  let rotatedPath
  if (backCurveParts.length <= 1) {
    rotatedPath = null
  } else if (store.get('bulge')) {
    rotatedPath = backCurveParts[1].rotate(options.bulge, points.rotationOrigin)
  } else {
    rotatedPath = backCurveParts[1]
  }

  paths.elasticLegFront = new Path().move(points.backGussetSplitBulge)

  if (rotatedPath) {
    paths.elasticLegFront = paths.elasticLegFront.join(rotatedPath)
  }

  paths.elasticLegFront
    .curve(points.gussetFrontCpBulge, points.sideLegCpFront, points.sideLegFront)
    .hide()

  /*
   * Construct pockets if desired
   */
  if (options.pockets !== 'none') {
    points.sidePocketHeight = points.sideWaistbandFront.shiftTowards(
      points.sideLegFront,
      Math.min(
        options.pocketHeight * points.cfHips.dist(points.cfSeat),
        points.sideWaistbandFront.dist(points.sideLegFront) / 3
      )
    )
    points.cfPocketHeight = points.cfWaistbandDipFront.shiftTowards(
      points.cfMiddle,
      points.sidePocketHeight.dist(points.sideWaistbandFront)
    )
    points.cfPocketHeightCp = new Point(
      (points.sidePocketHeight.x / 2) * options.frontDipShape,
      points.cfPocketHeight.y
    )
    if (expand) {
      macro('mirror', {
        mirror: [new Point(0, 0), new Point(0, 100)],
        points: ['cfPocketHeightCp', 'sidePocketHeight'],
        clone: true,
      })

      paths.pocketHeight = new Path()
        .move(points.sidePocketHeight)
        ._curve(points.cfPocketHeightCp, points.cfPocketHeight)
        .curve_(points.mirroredCfPocketHeightCp, points.mirroredSidePocketHeight)
        .reverse()
        .addClass('help lining')
        .addText('umbra:foldLining', 'center lining')
    } else {
      paths.pocketHeight = new Path()
        .move(points.sidePocketHeight)
        ._curve(points.cfPocketHeightCp, points.cfPocketHeight)
        .reverse()
        .addClass('help lining')
        .addText('umbra:foldLining', 'center lining')
    }
    if (!complete) {
      paths.pocketHeight.hide()
    }

    const pocketSeamX = points.sideHips.x * options.pocketGap
    points.pocketSeamTop = new Path()
      .move(points.sideWaistbandFront)
      .curve(
        points.cfWaistbandDipCp1Front,
        points.cfWaistbandDipCp2Front,
        points.cfWaistbandDipFront
      )
      .intersectsX(pocketSeamX)[0]

    paths.pocketPilotPath = new Path()
      .move(points.pocketSeamTop)
      .curve_(
        points.pocketSeamTop.shift(-80, measurements.crossSeamFront / 2),
        new Point(points.sideLegFront.x, points.sideGussetBulge.y)
      )
      .setClass('mark')
      .hide()

    const intersects = paths.elasticLegFront.intersects(paths.pocketPilotPath)
    if (intersects.length > 0) {
      points.pocketSeamBottom = intersects[0]
      paths.pocketPilotPath2 = new Path()
        .move(points.pocketSeamBottom)
        .line(points.pocketSeamBottom.shift(125, measurements.crossSeam))
        .hide()
      points.pocketSeamMiddle = paths.pocketPilotPath2.intersectsX(pocketSeamX)[0]

      points.pocketSeamBottomCp = new Point(
        pocketSeamX,
        (points.pocketSeamBottom.y * 2 + points.pocketSeamMiddle.y) / 3
      )

      if (complete) {
        paths.pocketShape = new Path()
          .move(points.pocketSeamTop)
          .line(points.pocketSeamMiddle)
          .curve_(points.pocketSeamBottomCp, points.pocketSeamBottom)
          .addClass('mark dashed')
          .addText('umbra:pocketseam', 'center mark')
      }

      if (options.pockets === 'zipper') {
        // Construct zipper path. This uses some absolute mm values as zipper widths are standardized.
        // Let's assume a 5 mm zipper.
        const zipperLeft = pocketSeamX + 10
        const zipperRight = Math.min(
          points.sidePocketHeight.x - 10,
          zipperLeft + measurements.hips / 10
        )
        const a = paths.pocketHeight.intersectsX(zipperLeft)[0]
        const b = paths.pocketHeight.intersectsX(zipperRight)[0]

        const angle = a.angle(b)

        points.leftZipperTop = a.shift(angle + 90, 2.5)
        points.leftZipperBottom = points.leftZipperTop.shift(angle - 90, 5)
        points.rightZipperTop = b.shift(angle + 90, 2.5)
        points.rightZipperBottom = points.rightZipperTop.shift(angle - 90, 5)

        if (complete) {
          paths.zipper = new Path()
            .move(points.leftZipperBottom)
            .line(points.rightZipperBottom)
            .line(points.rightZipperTop)
            .line(points.leftZipperTop)
            .close()
            .reverse()
            .addClass('mark dashed')
            .addText('umbra:zipper', 'mark')

          if (expand) {
            macro('mirror', {
              mirror: [new Point(0, 0), new Point(0, 100)],
              points: ['leftZipperBottom', 'rightZipperBottom', 'rightZipperTop', 'leftZipperTop'],
              clone: true,
            })

            paths.mirroredZipper = new Path()
              .move(points.mirroredRightZipperTop)
              .line(points.mirroredLeftZipperTop)
              .line(points.mirroredLeftZipperBottom)
              .line(points.mirroredRightZipperBottom)
              .close()
              .addClass('mark dashed')
              .addText('umbra:zipper', 'mark')
          }
        }
        paths.zipperCut = new Path()
          .move(points.leftZipperBottom)
          .line(points.leftZipperTop)
          .move(points.rightZipperTop)
          .line(points.rightZipperBottom)
          .move(a)
          .line(b)
          .addClass('fabric')
        paths.pocketHeight.hide()
      }
    }
  }

  // Compute elastic lengths
  store.set(
    'waistbandElasticLength',
    new Path()
      .move(points.cfWaistbandDipBack)
      .curve(points.cfWaistbandDipCp2Back, points.cfWaistbandDipCp1Back, points.sideWaistbandBack)
      .move(points.cfWaistbandDipFront)
      .curve(
        points.cfWaistbandDipCp2Front,
        points.cfWaistbandDipCp1Front,
        points.sideWaistbandFront
      )
      .hide()
      .length() *
      2 *
      stretch.elastic
  )

  store.set(
    'legElasticLength',
    (paths.elasticLegBack.length() + paths.elasticLegFront.length()) * stretch.elastic
  )

  /*
   * Also flag this to the user, as well as the expand possibility
   */
  if (!expand) {
    store.flag.preset('expandIsOff')
  } else {
    store.flag.preset('expandIsOn')
  }
  store.flag.note({
    msg: `umbra:waistbandElasticLength`,
    replace: { length: units(store.get('waistbandElasticLength')) },
  })
  store.flag.note({
    msg: `umbra:legElasticLength`,
    replace: { length: units(store.get('legElasticLength')) },
  })
  store.flag.note({
    msg: `umbra:minStretch`,
    replace: {
      pct: Math.round(100 * (measurements.seat / store.get('waistbandElasticLength') - 1)) + '%',
    },
  })

  /*
   * Hide this part, others will extend it
   */
  return part
}

export const base = {
  name: 'umbra.base',
  measurements: [
    'waist',
    'seat',
    'waistToSeat',
    'crossSeam',
    'crossSeamFront',
    'waistToHips',
    'hips',
  ],
  options: {
    // Fit options

    /*
     * xStretch is for the horizontal fabric stretch
     */
    xStretch: { pct: 15, min: 0, max: 75, menu: 'fit' },

    /*
     * yStretch is for the vertical fabric stretch
     */
    yStretch: { pct: 5, min: 0, max: 50, menu: 'fit' },

    /*
     * additional stretch factor for the elastics
     */
    elasticStretch: { pct: 5, min: 0, max: 10, menu: 'fit' },

    /*
     * gussetPosition allows you to shift the gusset towards the front or back
     */
    gussetPosition: { pct: 50, min: 20, max: 100, menu: 'fit' },

    /*
     * The gusset width, based on the crossSeam measurement
     */
    gussetWidth: {
      pct: 12,
      min: 3,
      max: 20,
      menu: 'fit',
      toAbs: (val, { measurements }, mergedOptions) =>
        measurements.crossSeam * mergedOptions.gussetWidth * stretchToScale(mergedOptions.xStretch),
    },

    /*
     * splitPosition allows you to shift the split towards the front or back
     */
    splitPosition: { pct: 11, min: 0, max: 45, menu: 'fit' },

    /*
     * The bulge option allows you to create room in the front
     * to keep for a snack, or other things you might want to carry there.
     */
    bulge: { deg: 0, min: 0, max: 30, menu: 'fit' },

    /*
     * This option allows you to create extra room in the bulge
     */
    bulgeFullness: {
      pct: 75,
      min: 25,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions?.bulge < 2 ? false : 'fit'),
    },

    // Style options

    /*
     * The minimum fabric width of the thong and waistband part.
     * Only has an effect when the back exposure is low or the leg rise is high.
     */
    minFabricWidth: {
      pct: 2,
      min: 0.5,
      max: 5,
      menu: 'style',
      toAbs: (val, { measurements }) => measurements.seat * val,
    },

    /*
     * frontReduction determines how much less wide the front part is compared to the back part
     * This can improve fit and make the appearance slimmer, but potentially reduces the size of pockets
     */
    frontReduction: { pct: 10, min: 0, max: 30, menu: 'style' },

    /*
     * Rise controls the waist height
     */
    rise: {
      pct: 75,
      min: 20,
      max: 150,
      menu: 'style',
      toAbs: (val, { measurements }, mergedOptions) =>
        (measurements.crossSeam / 2 -
          measurements.waistToSeat +
          (measurements.waistToSeat - measurements.waistToHips) * mergedOptions.rise) *
        stretchToScale(mergedOptions.xStretch),
    },

    /*
     * legRise controls how high the leg opening is cut out
     */
    legRise: { pct: 0, min: -20, max: 40, menu: 'style' },

    /*
     * Front dip dips the front waistband
     */
    frontDip: { pct: 2.5, min: -5, max: 15, menu: 'style' },

    /*
     * Determines the shape of the front dip
     */
    frontDipShape: { pct: 75, min: 0, max: 95, menu: 'style' },

    /*
     * frontExposure determines how much skin is on display at the front
     * Note that frontDip will also influence this
     */
    frontExposure: { pct: 70, min: 5, max: 100, menu: 'style' },

    /*
     * Front dip dips the back waistband
     */
    backDip: { pct: -2.5, min: -15, max: 10, menu: 'style' },

    /*
     * Determines the shape of the back dip
     */
    backDipShape: { pct: 80, min: 0, max: 95, menu: 'style' },

    /*
     * backExposure determines how much skin is on display at the back
     * Note that backDip will also influence this
     */
    backExposure: { pct: 15, min: 0, max: 100, menu: 'style' },

    pockets: {
      dflt: 'none',
      list: ['none', 'inside', 'zipper'],
      menu: 'style',
      extraNote: 'Select if you want pockets',
    },

    pocketGap: {
      pct: 25,
      min: 15,
      max: 35,
      menu: (settings, mergedOptions) => (mergedOptions?.pockets === 'none' ? false : 'style'),
      toAbs: (val, { measurements }, mergedOptions) =>
        (measurements.hips / 2) * mergedOptions.pocketGap * stretchToScale(mergedOptions.xStretch),
    },

    pocketHeight: {
      pct: 20,
      min: 10,
      max: 30,
      menu: (settings, mergedOptions) => (mergedOptions?.pockets === 'none' ? false : 'style'),
    },

    /*
     * If the back part should be flipped
     */
    flipBack: {
      menu: 'advanced',
      bool: true,
      extraNote:
        'Select if the back part should be flipped into upright orientation, set to false for development and easier debugging of control points',
    },
  },
  draft: draftUmbraBase,
  hide: { self: true },
}
