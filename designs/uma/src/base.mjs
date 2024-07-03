import { stretchToScale } from '@freesewing/core'

function draftUmaBase({
  options,
  Point,
  Path,
  points,
  paths,
  measurements,
  store,
  utils,
  expand,
  units,
  part,
}) {
  /*
   * Calculate stretch for easy access
   */
  const stretch = {
    x: utils.stretchToScale(options.xStretch),
    y: utils.stretchToScale(options.yStretch),
  }
  const gussetLength = measurements.seat * options.gussetLength * stretch.y

  /*
   * Back exposure as used for calculating paths should never be below
   * 0.25. If it's lower than that, we'll do a specific on the back
   * part after splitting the curves
   */
  const minBackExposure = options.backExposure < 0.25 ? 0.25 : options.backExposure

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
   * Seat line
   */
  points.cfSeat = new Point(0, measurements.waistToSeat * stretch.y)
  points.sideSeat = new Point((measurements.seat / 4) * stretch.x, points.cfSeat.y)

  /*
   * The absolute middle
   * The gusset can shift backwards/forwards, but this point remains stable
   */
  points.cfMiddle = new Point(0, stretch.y * measurements.waistToUpperLeg + gussetLength / 2)
  points.sideMiddle = new Point(
    measurements.waistToUpperLeg * options.gussetWidth * stretch.x,
    points.cfMiddle.y
  )

  /*
   * Gusset front and back edge
   * These mark the y-coordinate for the front/back edge of the gusset
   * We'll split the curve on that y-coordinate later
   */
  points.cfMidGusset = points.cfMiddle
    .shift(-90, gussetLength / 2)
    .shift(90, gussetLength * options.gussetPosition)
  points.cfFrontGusset = points.cfMidGusset.shift(90, gussetLength / 2)
  points.cfBackGusset = points.cfMidGusset.shift(-90, gussetLength / 2)

  /*
   * Waistband line
   */
  points.cfWaistband = points.cfSeat.shiftFractionTowards(points.cfWaist, options.rise)
  points.sideWaistband = utils.beamIntersectsY(
    points.sideWaist,
    points.sideSeat,
    points.cfWaistband.y
  )

  /*
   * Dip the waistband at the front
   */
  points.cfWaistbandDip = points.cfWaistband.shift(
    -90,
    measurements.waistToUpperLeg * options.frontDip
  )
  points.cfWaistbandDipCp = new Point(points.sideWaistband.x / 2, points.cfWaistbandDip.y)

  /*
   * Start of the leg opening
   */
  points.sideLeg = points.sideSeat.shiftFractionTowards(points.sideWaistband, options.legRise)

  /*
   * We curve at the same angle as the front waistband dip here.
   * Not doing so would mean that when the front exposure is high,
   * and thus the fabric at the side gets narrow,
   * Both curves would not be parallel which looks messy.
   */
  const dipAngle = points.sideWaistband.angle(points.cfWaistbandDipCp)
  points.sideLegCp = points.sideLeg.shift(dipAngle, points.sideMiddle.dx(points.sideLeg) / 3)

  /*
   * Now add the front gusset control point
   */
  points.gussetFrontCp = points.sideMiddle.shift(
    90,
    points.sideLegCp.dy(points.sideMiddle) * options.frontExposure
  )

  /*
   * Now extend the gusset into the back part
   */
  for (const flip of ['cfWaist', 'cfWaistband', 'sideWaistband', 'sideLeg']) {
    points[`${flip}Back`] = points[flip].flipY(points.cfMiddle)
  }

  /*
   * Dip the waistband at the back
   */
  points.cfWaistbandDipBack = points.cfWaistbandBack.shift(
    90,
    measurements.waistToUpperLeg * options.backDip
  )
  points.cfWaistbandDipCpBack = new Point(
    points.sideWaistbandBack.x / 2,
    points.cfWaistbandDipBack.y
  )

  /*
   * We curve at the same angle as the back waitband dip here.
   * Not doing so would mean that when the back exposure is high,
   * and thus the fabric at the side gets narrow,
   * Both curves would not be parallel which looks messy.
   */
  const dipAngleBack = points.sideWaistbandBack.angle(points.cfWaistbandDipCpBack)
  points.sideLegCpBack = points.sideLegBack.shift(
    dipAngleBack,
    points.sideMiddle.dx(points.sideLegBack) * minBackExposure
  )

  /*
   * If the back exposure is very high (more than 80%) we need to draft a thong style
   * and that requires narrowing the gusset as we make our way from front to back
   */
  const thongFactor = minBackExposure > 0.8 ? 1 - (minBackExposure - 0.8) * 4 : 1

  /*
   * Now add the back gusset control point
   */
  points.gussetBackCp = points.sideMiddle
    .shift(90, points.sideLegCpBack.dy(points.sideMiddle) * minBackExposure)
    .shift(180, points.sideMiddle.x * (1 - thongFactor))

  /*
   * Force the sideMiddle point to lie on the line between front and back
   * control points. This only kicks in when backExposure > 80 and thus
   * thongFactor is not 1
   */
  if (thongFactor !== 1) {
    points.sideMiddle = utils.beamIntersectsY(
      points.gussetFrontCp,
      points.gussetBackCp,
      points.sideMiddle.y
    )
  }

  /*
   * Make checking for bulge easy
   */
  store.set('bulge', options.bulge >= 2)

  /*
   * Split back from gusset unless bulge is set
   * or the gusset is moved all the way forward
   */
  if (store.get('bulge')) {
    /*
     * If bulge is set or gussetPosition is lower than 2% or higher than 98%
     * we do not split the curve to seperate the back from the gusset
     * and just as as if it's 0% or 100% respectively because splitting a curve
     * so close to its edge is pointless and prone to bugs in the bezier math.
     * For bulge, front and gusset are 1 part anyway.
     */
    store.set('gusset', false)
    points.backGussetSplit = points.sideMiddle.copy()
    paths.frontAndGussetCurve = new Path()
      .move(points.sideMiddle)
      .curve(points.gussetFrontCp, points.sideLegCp, points.sideLeg)
      .hide()
    paths.frontAndGusset = new Path()
      .move(points.cfWaistbandDip)
      .line(points.cfMiddle)
      .line(points.sideMiddle)
      .join(paths.frontAndGussetCurve)
      .line(points.sideWaistband)
      .curve_(points.cfWaistbandDipCp, points.cfWaistbandDip)
      .close()
      .addClass('lining')

    /*
     * If people want to max out the back exposure, we need to flare
     * out the back part, which requires some more splits
     */
    if (options.backExposure < 0.25) {
      paths.backCurve = new Path()
        .move(points.sideMiddle)
        .curve(points.gussetBackCp, points.sideLegCpBack, points.sideLegBack)
        .addClass('stroke-xl lining')
        .hide()
      points.backCurveGussetSplit = paths.backCurve.shiftFractionAlong(0.15)
      points.backCurveBackSplit = paths.backCurve.reverse().shiftFractionAlong(0.05)
      const angle = points.backCurveGussetSplit.angle(points.backCurveBackSplit)
      const dist = points.backCurveGussetSplit.dist(points.backCurveBackSplit)
      const shift = points.sideMiddle.x * 2 * (0.25 - options.backExposure)
      points.backCurveBump = points.backCurveGussetSplit
        .shiftFractionTowards(points.backCurveBackSplit, 0.5)
        .shift(angle + 90, shift)
      points.backCurveBumpCp1 = points.backCurveBump.shift(angle, dist / 4)
      points.backCurveBumpCp2 = points.backCurveBump.shift(angle, dist / -4)

      let parts = paths.backCurve.split(points.backCurveBackSplit)
      paths.backCurveBackRest = parts[0].reverse().hide()
      paths.backCurveBack = parts[1].hide()
      parts = paths.backCurve.split(points.backCurveGussetSplit)
      paths.backCurveGusset = parts[0].hide()
      paths.backCurveGussetRest = parts[1].hide()

      points.backCurveGussetCp = points.backCurveGussetSplit.shiftTowards(
        paths.backCurveBackRest.ops[1].cp1,
        shift
      )
      points.backCurveBackCp = points.backCurveBackSplit.shiftTowards(
        paths.backCurveGussetRest.ops[1].cp1,
        shift
      )
      paths.bump = new Path()
        .move(points.backCurveBackSplit)
        .curve(points.backCurveBackCp, points.backCurveBumpCp1, points.backCurveBump)
        .smurve(points.backCurveGussetCp, points.backCurveGussetSplit)
        .hide()

      paths.back = new Path()
        .move(points.cfWaistbandDipBack)
        .curve_(points.cfWaistbandDipCpBack, points.sideWaistbandBack)
        .line(points.sideLegBack)
        .join(paths.backCurveBack.reverse())
        .join(paths.bump)
        .join(paths.backCurveGusset.reverse())
        .line(points.cfMiddle)
        .addClass('note')

      paths.legElastic = new Path()
        .move(points.sideLegBack)
        .join(paths.backCurveBack.reverse())
        .join(paths.bump)
        .join(paths.backCurveGusset.reverse())
        .hide()
    } else {
      paths.back = new Path()
        .move(points.cfWaistbandDipBack)
        .curve_(points.cfWaistbandDipCpBack, points.sideWaistbandBack)
        .line(points.sideLegBack)
        .curve(points.sideLegCpBack, points.gussetBackCp, points.sideMiddle)
        .line(points.cfMiddle)
        .addClass('note')

      paths.legElastic = new Path()
        .move(points.sideLegBack)
        .curve(points.sideLegCpBack, points.gussetBackCp, points.sideMiddle)
        .addClass('stroke-2xl lining')
        .hide()
    }

    /*
     * If the users wants a bulge, front and gusset will become 1 part
     * Note that this won't kick in until bulge is at least 2%
     *
     * If not, we will split the front from the gusset
     */
    if (store.get('bulge')) {
      /*
       * First, we rotate the curve to create room for the bulge
       */
      for (const pid of ['gussetFrontCp', 'backGussetSplit', 'cfMiddle']) {
        points[`${pid}Bulge`] = points[pid].rotate(options.bulge, points.cfWaistbandDip)
      }
      points.bulgeCp = points.cfWaistbandDip.shift(
        -90,
        points.cfWaistbandDip.dy(points.cfMiddleBulge) / 1.5
      )
      paths.bulge = new Path()
        .move(points.cfWaistbandDip)
        .curve_(points.bulgeCp, points.cfMiddleBulge)
        .line(points.backGussetSplitBulge)
        .curve(points.gussetFrontCpBulge, points.sideLegCp, points.sideLeg)
        .line(points.sideWaistband)
        .curve_(points.cfWaistbandDipCp, points.cfWaistbandDip)
        .line(points.cfWaistbandDip)
        .close()

      paths.legElastic
        .move(points.backGussetSplitBulge)
        .curve(points.gussetFrontCpBulge, points.sideLegCp, points.sideLeg)
        .hide()
    }

    /*
     * Make life easier by setting these points even if the path is not split
     */
    points.backGussetSplit = points.sideMiddle.copy()
    points.backGussetSplitCpTop = points.gussetBackCp.copy()
    points.backGussetSplitCpBottom = points.sideLegCpBack.copy()
  } else {
    /*
     * More realistically, we'll need to split this curve to
     * seperate the back from the gusset
     */
    store.set('gusset', true)
    /*
     * First split at the back
     */
    points.backGussetSplit = utils.curveIntersectsY(
      points.sideLegBack,
      points.sideLegCpBack,
      points.gussetBackCp,
      points.sideMiddle,
      points.cfBackGusset.y
    )
    const backCurveParts = new Path()
      .move(points.sideLegBack)
      .curve(points.sideLegCpBack, points.gussetBackCp, points.sideMiddle)
      .split(points.backGussetSplit)

    /*
     * Add the controls points of the split path to the part points
     */
    points.backGussetSplitCpBottom = backCurveParts[0].ops[1].cp1
    points.backGussetSplitCpTop = backCurveParts[0].ops[1].cp2

    /*
     * Then split at the front
     */
    points.frontGussetSplit = utils.curveIntersectsY(
      points.sideMiddle,
      points.gussetFrontCp,
      points.sideLegCp,
      points.sideLeg,
      points.cfFrontGusset.y
    )
    const frontCurveParts = new Path()
      .move(points.sideMiddle)
      .curve(points.gussetFrontCp, points.sideLegCp, points.sideLeg)
      .split(points.frontGussetSplit)
    /*
     * Add the controls points of the split path to the part points
     */
    points.frontGussetSplitCpBottom = frontCurveParts[1].ops[1].cp1
    points.frontGussetSplitCpTop = frontCurveParts[1].ops[1].cp2
    points.gussetFrontSplitCpTop = frontCurveParts[0].ops[1].cp2
    points.gussetFrontSplitCpBottom = frontCurveParts[0].ops[1].cp1
    points.gussetBackSplitCpTop = backCurveParts[1].ops[1].cp2
    points.gussetBackSplitCpBottom = backCurveParts[1].ops[1].cp1

    paths.gusset = new Path()
      .move(points.backGussetSplit)
      .join(backCurveParts[1])
      .join(frontCurveParts[0])
      .line(points.cfFrontGusset)
      .line(points.cfBackGusset)
      .line(points.backGussetSplit)
      .close()
      .addClass('lining')
    paths.front = new Path()
      .move(points.cfWaistbandDip)
      .line(points.cfFrontGusset)
      .line(points.frontGussetSplit)
      .join(frontCurveParts[1])
      .line(points.sideWaistband)
      .curve_(points.cfWaistbandDipCp, points.cfWaistbandDip)
      .close()
      .addClass('note')

    /*
     * If people want to max out the back exposure, we need to flare
     * out the back part, which requires some more splits
     */
    if (options.backExposure < 0.25) {
      paths.backCurve = new Path()
        .move(points.backGussetSplit)
        .curve(points.backGussetSplitCpTop, points.backGussetSplitCpBottom, points.sideLegBack)
        .addClass('stroke-xl lining')
        .hide()
      const fraction = 0.05
      points.backCurveGussetSplit = paths.backCurve.shiftFractionAlong(fraction)
      points.backCurveBackSplit = paths.backCurve.reverse().shiftFractionAlong(fraction)
      const angle = points.backCurveGussetSplit.angle(points.backCurveBackSplit)
      const dist = points.backCurveGussetSplit.dist(points.backCurveBackSplit)
      const shift = points.sideMiddle.x * 2 * (0.25 - options.backExposure)
      points.backCurveBump = points.backCurveGussetSplit
        .shiftFractionTowards(points.backCurveBackSplit, 0.5)
        .shift(angle + 90, shift)
      points.backCurveBumpCp1 = points.backCurveBump.shift(angle, dist / 4)
      points.backCurveBumpCp2 = points.backCurveBump.shift(angle, dist / -4)

      let parts = paths.backCurve.split(points.backCurveBackSplit)
      paths.backCurveBackRest = parts[0].hide()
      paths.backCurveBack = parts[1].hide()
      parts = paths.backCurve.split(points.backCurveGussetSplit)
      paths.backCurveGusset = parts[0].hide()
      paths.backCurveGussetRest = parts[1].hide()

      points.backCurveGussetCp = points.backCurveGussetSplit.shiftTowards(
        paths.backCurveBackRest.ops[1].cp1,
        shift
      )
      points.backCurveBackCp = points.backCurveBackSplit.shiftTowards(
        paths.backCurveGussetRest.ops[1].cp1,
        shift
      )
      paths.bump = new Path()
        .move(points.backCurveBackSplit)
        .curve(points.backCurveBackCp, points.backCurveBumpCp1, points.backCurveBump)
        .smurve(points.backCurveGussetCp, points.backCurveGussetSplit)
        .hide()

      paths.back = new Path()
        .move(points.cfWaistbandDipBack)
        .curve_(points.cfWaistbandDipCpBack, points.sideWaistbandBack)
        .line(points.sideLegBack)
        .join(paths.backCurveBack.reverse())
        .join(paths.bump)
        .join(paths.backCurveGusset.reverse())
        .line(points.cfBackGusset)
        .addClass('note')

      paths.legElastic = new Path()
        .move(points.sideLegBack)
        .join(paths.backCurveBack.reverse())
        .join(paths.bump)
        .join(paths.backCurveGusset.reverse())
        .curve(points.gussetBackSplitCpBottom, points.gussetBackSplitCpTop, points.sideMiddle)
        .curve(points.gussetFrontCp, points.sideLegCp, points.sideLeg)
        .hide()
    } else {
      paths.back = new Path()
        .move(points.cfWaistbandDipBack)
        .curve_(points.cfWaistbandDipCpBack, points.sideWaistbandBack)
        .line(points.sideLegBack)
        .join(backCurveParts[0])
        .line(points.cfBackGusset)
        .addClass('note')

      paths.legElastic = new Path()
        .move(points.sideLegBack)
        .curve(points.sideLegCpBack, points.gussetBackCp, points.sideMiddle)
        .curve(points.gussetFrontCp, points.sideLegCp, points.sideLeg)
        .hide()
    }
  }

  /*
   * Set the elastic length in the store
   */
  store.set('legElasticLength', paths.legElastic.hide().length())
  store.set(
    'waistbandElasticLength',
    (new Path()
      .move(points.cfWaistbandDip)
      .curve_(points.cfWaistbandDipCp, points.sideWaistband)
      .length() +
      new Path()
        .move(points.cfWaistbandDipBack)
        .curve_(points.cfWaistbandDipCpBack, points.sideWaistbandBack)
        .length()) *
      2
  )

  /*
   * Also flag this to the user, as well as the expand possibility
   */
  if (!expand) store.flag.preset('expandIsOff')
  else store.flag.preset('expandIsOn')
  store.flag.note({
    msg: `uma:legElasticLength`,
    replace: { length: units(store.get('legElasticLength')) },
  })
  store.flag.note({
    msg: `uma:waistbandElasticLength`,
    replace: { length: units(store.get('waistbandElasticLength')) },
  })

  /*
   * Hide this part, others will extend it
   */
  return part
}

export const base = {
  name: 'uma.base',
  measurements: ['waist', 'seat', 'waistToSeat', 'waistToUpperLeg'],
  options: {
    // Fit options

    /*
     * xStretch is for the horizontal fabric stretch
     */
    xStretch: { pct: 15, min: 0, max: 30, menu: 'fit' },

    /*
     * yStretch is for the vertical fabric stretch
     */
    yStretch: { pct: 5, min: 0, max: 15, menu: 'fit' },

    /*
     * The gusset width, based on the seam measurement
     */
    gussetWidth: {
      pct: 15,
      min: 5,
      max: 24,
      menu: 'fit',
      toAbs: (val, { measurements }, mergedOptions) =>
        measurements.waistToUpperLeg *
        mergedOptions.gussetWidth *
        2 *
        stretchToScale(mergedOptions.xStretch),
    },

    /*
     * gussetLength controls the length of the gusset as a factor of the seat measurement
     */
    gussetLength: { pct: 12.7, min: 10, max: 16, menu: 'fit' }, // Gusset length in relation to seat

    /*
     * gussetPosition allows you to shift the gusset towards the front or back
     */
    gussetPosition: { pct: 70, min: 5, max: 95, menu: 'fit' },

    /*
     * The bulge option allows you to create room in the front
     * to keep for a snack, or other things you might want to carry there.
     */
    bulge: { deg: 0, min: 0, max: 30, menu: 'fit' },

    // Style options

    /*
     * Rise controls the waist height
     */
    rise: { pct: 50, min: 30, max: 100, menu: 'style' },

    /*
     * legRise controls how high the leg opening is cut out
     */
    legRise: { pct: 54, min: 5, max: 95, menu: 'style' },

    /*
     * Front dip dips the front waistband
     */
    frontDip: { pct: 10.0, min: 0, max: 25, menu: 'style' },

    /*
     * frontExposure determines how much skin is on display at the front
     * Note that frontDip will also influence this
     */
    frontExposure: { pct: 70, min: 5, max: 100, menu: 'style' },

    /*
     * Front dip dips the back waistband
     */
    backDip: { pct: -5, min: -15, max: 10, menu: 'style' },

    /*
     * backExposure determines how much skin is on display at the back
     * Note that backDip will also influence this
     */
    backExposure: { pct: 30, min: 0, max: 115, menu: 'style' },
  },
  draft: draftUmaBase,
  hide: { self: true },
}
