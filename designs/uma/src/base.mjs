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
  for (const flip of ['cfWaist', 'cfWaistband', 'sideWaistband', 'sideLeg'])
    points[`${flip}Back`] = points[flip].flipY(points.cfMiddle)

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
    points.sideMiddle.dx(points.sideLegBack) * options.backExposure
  )

  /*
   * Now add the back gusset control point
   */
  points.gussetBackCp = points.sideMiddle.shift(
    90,
    points.sideLegCpBack.dy(points.sideMiddle) * options.backExposure
  )

  /*
   * Make checking for bulge easy
   */
  store.set('bulge', options.bulge >= 2 ? true : false)

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
    paths.back = new Path()
      .move(points.cfMiddle)
      .line(points.cfWaistbandDipBack)
      .curve_(points.cfWaistbandDipCpBack, points.sideWaistbandBack)
      .line(points.sideLegBack)
      .curve(points.sideLegCpBack, points.gussetBackCp, points.sideMiddle)
      .line(points.cfMiddle)
      .close()
      .addClass('note')

    /*
     * If the users wants a bulge, front and gusset will become 1 part
     * Note that this won't kick in until bulge is at least 2%
     *
     * If not, we will split the front from the gusset
     */
    if (options.bulge && options.bulge >= 2) {
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
    paths.back = new Path()
      .move(points.cfBackGusset)
      .line(points.cfWaistbandDipBack)
      .curve_(points.cfWaistbandDipCpBack, points.sideWaistbandBack)
      .line(points.sideLegBack)
      .join(backCurveParts[0])
      .line(points.cfBackGusset)
      .close()
      .addClass('note')
  }

  /*
   * Set the elastic length in the store
   */
  store.set(
    'legElasticLength',
    new Path()
      .move(points.sideLegBack)
      .curve(points.sideLegCpBack, points.gussetBackCp, points.sideMiddle)
      .curve(points.gussetFrontCp, points.sideLegCp, points.sideLeg)
      .length()
  )
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
  return part.hide()
}

export const base = {
  name: 'uma.base',
  measurements: ['waist', 'seat', 'waistToSeat', 'waistToUpperLeg'],
  options: {
    // Fit options

    /*
     * xStretch is for the horizontal fabric stretch
     */
    xStretch: { pct: 15, min: 0, max: 50, menu: 'fit' },

    /*
     * yStretch is for the vertical fabric stretch
     */
    yStretch: { pct: 15, min: 0, max: 50, menu: 'fit' },

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
    rise: { pct: 46, min: 30, max: 100, menu: 'style' },

    /*
     * legRise controls how high the leg opening is cut out
     */
    legRise: { pct: 54, min: 5, max: 95, menu: 'style' },

    /*
     * Front dip dips the front waistband
     */
    frontDip: { pct: 5.0, min: -5, max: 15, menu: 'style' },

    /*
     * frontExposure determines how much skin is on display at the front
     * Note that frontDip will also influence this
     */
    frontExposure: { pct: 70, min: 5, max: 100, menu: 'style' },

    /*
     * Front dip dips the back waistband
     */
    backDip: { pct: 2.5, min: -5, max: 15, menu: 'style' },

    /*
     * backExposure determines how much skin is on display at the back
     * Note that backDip will also influence this
     */
    backExposure: { pct: 30, min: 25, max: 125, menu: 'style' },
  },
  draft: draftUmaBase,
}
