import { front } from './front.mjs'
import { bustPlugin } from '@freesewing/plugin-bust'
// import { lengthBonus } from './options.mjs'

function donaFbaFront({
  measurements,
  Point,
  points,
  Path,
  paths,
  macro,
  options,
  Snippet,
  snippets,
  utils,
  sa,
  complete,
  log,
  part,
}) {
  /*
   * Simone is Simon with an FBA (Full Bust Adjustment)
   * Which means that we draft simon with the high bust measurement instead
   * of the chest circumference (full bust). This is handled auto-magically by plugin-bust
   *
   * Once drafted, we add the FBA, which is what happens in this file
   */

  /*
   * How much room to we need to create to fit the breasts?
   * Note that:
   *  - measurements.bust is added by the bust plugin
   *  - we divide by two since we add room on right and left side
   *  - we also add the equivalent chest ease to the extra room we create
   *
   */
  const FBA = ((1 + options.chestEase) * (measurements.bust - measurements.highBust)) / 2
  /*
   * If the FBA is negative, that means the high bust measurement is higher than the
   * front bust. That's not uncommon for people who don't have much breast tissue but
   * it generates a negative dart which is confusing and incorrect. So in that case, just
   * return the original part from simon
   */
  if (FBA < 0) {
    log.info('No FBA required, using unaltered Simon front')
    return part
  }

  /*
   * Locate bust point
   */
  points.bust = new Point(measurements.bustSpan / 2, points.neck.y + measurements.hpsToBust)

  /*
   * Figure out how much do we need to open a dart to create the required FBA room
   */
  let one = points.armholePitch.dist(points.bust) // We consider this to be 1
  let cosBust = (points.bust.dx(points.armholePitch) / one) * -1 // Which means this gives us the cos of the bust point
  let cosRot = ((points.bust.dx(points.armholePitch) - FBA) / one) * -1 // And this gives us the cos of the target
  const FBARot = utils.rad2deg(Math.acos(cosBust)) - utils.rad2deg(Math.acos(cosRot)) // Now just acos these and subtract

  /*
   * We now now how much room we must create (FBA) and how big our dart will be (FBARot)
   * But there's one thing that requires our attention: The bust point
   * When you do an FBA on an existing pattern for womenswear, the bust point is assumed
   * to be incorrect (since the pattern is drafted for smaller breasts).
   * In our case, we know for a fact that the bust point is in the correct location because
   * it's based on the model's measurements. (bust span and high point shoulder (HPS) to bust).
   * So we need to find the bust point that would end up in the right place AFTER we do the FBA
   * For this, we'll just rotate it FBARot in the other direction
   * In other words, we are pre-rotating points.bust now, so it gets rotated
   * back to its original position during the FBA procedure.
   * For convenience and clarity, we're defining points.realBustPoint here.
   * However, points.bust will eventually be identical to points.realBustPoint
   * after the FBA procedure.
   */
  points.realBustPoint = points.bust.clone()
  points.bust = points.bust.rotate(FBARot * -1, points.armholePitch)

  //
  // Cut to the side seam
  //
  points._dartDirection = points.bust.shift(options.bustDartAngle * -1, measurements.bust / 3)

  // Help method to find side cut
  const sideCut1 = () =>
    utils.lineIntersectsCurve(
      points.bust,
      points._dartDirection,
      points.waist,
      points.waistCp2,
      points.armhole,
      points.armhole
    )
  let bustSideCut1 = sideCut1()
  if (!bustSideCut1) {
    // No intersection found. Adapt dart direction to force intersection.
    points._dartDirection = new Path()
      .move(points.waist)
      .curve_(points.waistCp2, points.armhole)
      .shiftFractionAlong(0.5)
    bustSideCut1 = sideCut1()
  }
  points.bustSideCut1 = bustSideCut1

  //
  // Mark bust at waist and hem level
  //
  points.bustWaist = new Point(points.bust.x, points.waist.y)
  points.bustHem = new Point(points.bust.x, points.hem.y)

  //
  // Now rotate entire side around armhole hollow to create room for FBA
  //
  const rot1 = [
    'bust',
    'bustSideCut1',
    'bustWaist',
    'bustHem',
    'hem',
    'hips',
    'hipsCp2',
    'waistCp1',
    'waist',
    'waistCp2',
    'armhole',
    'armholeCp2',
    'armholeHollowCp1',
    'armholeHollow',
    'armholeHollowCp2',
    'armholePitchCp1',
  ]
  for (let p of rot1) points[`${p}_rot1`] = points[p].rotate(FBARot, points.armholePitch)
  //
  //  Help line to show the initial cut lines and first rotation
  //  Uncomment this if you'd like to understand what's going on
  //
  //
  /*
  paths.fbaCut1 = new Path()
    .move(points.armholePitch)
    .line(points.bust)
    .line(points.bustSideCut1)
    .move(points.bust)
    .line(points.bustHem)
    .attr('class', 'various dashed')
  paths.rot1 = new Path()
    .move(points.armholePitch)
    .line(points.bust_rot1)
    .line(points.bustHem_rot1)
    .line(points.hem_rot1)
    .line(points.hips_rot1)
    .curve(points.hipsCp2_rot1, points.waistCp1_rot1, points.waist_rot1)
    .curve_(points.waistCp2_rot1, points.armhole_rot1)
    .curve(points.armholeCp2_rot1, points.armholeHollowCp1_rot1, points.armholeHollow_rot1)
    .curve(points.armholeHollowCp2_rot1, points.armholePitchCp1_rot1, points.armholePitch)
    .close()
    .attr('class', 'lining lashed')
  */

  //
  // Split the side seam at the dart, and extrct control points from the Path object
  //
  const toSplit = new Path()
    .move(points.waist_rot1)
    .curve_(points.waistCp2_rot1, points.armhole_rot1)
    .split(points.bustSideCut1_rot1)
  paths.fbaAboveDart = toSplit.pop()
  paths.fbaBelowDart = toSplit.pop()
  paths.fbaAboveDart.hide()
  paths.fbaBelowDart.hide()
  points.belowDartCpTop_rot1 = paths.fbaBelowDart.ops[1].cp2
  points.belowDartCpBottom_rot1 = paths.fbaBelowDart.ops[1].cp1
  points.aboveDartCpBottom_rot1 = paths.fbaAboveDart.ops[1].cp1 // (only one CP on this part
  //
  // Now rotate the bottom part around the (rotated) bust point so it's straight again
  //
  const rot2 = [
    'bust',
    'bustSideCut1',
    'bustWaist',
    'bustHem',
    'hem',
    'hips',
    'hipsCp2',
    'waistCp1',
    'waist',
    'waistCp2',
    'armhole',
    'armholeCp2',
    'armholeHollowCp1',
    'armholeHollow',
    'armholeHollowCp2',
    'armholePitchCp1',
    'belowDartCpTop',
    'belowDartCpBottom',
  ]
  for (let p of rot2)
    points[`${p}_rot2`] = points[`${p}_rot1`].rotate(FBARot * -1, points.bust_rot1)

  //
  // Help line to show the second rotation
  // Uncomment this if you'd like to understand what's going on
  //
  /*
  paths.fbaCut2 = new Path()
    .move(points.bust_rot2)
    .line(points.bustHem_rot2)
    .line(points.hem_rot2)
    .line(points.hips_rot2)
    .curve(points.hipsCp2_rot2, points.waistCp1_rot2, points.waist_rot2)
    .curve(points.belowDartCpBottom_rot2, points.belowDartCpTop_rot2, points.bustSideCut1_rot2)
    .line(points.bust_rot2)
    .line(points.bustSideCut1_rot1)
    .curve_(points.aboveDartCpBottom_rot1, points.armhole_rot1)
    .curve(points.armholeCp2_rot1, points.armholeHollowCp1_rot1, points.armholeHollow_rot1)
    .curve(points.armholeHollowCp2_rot1, points.armholePitchCp1_rot1, points.armholePitch)
    .line(points.bust_rot2)
    .attr('class', 'interfacing lashed')
  */

  //
  // Bust darts don't actually run entirely up to the bust point but stop a bit short
  // How short is controlled by the bustDartLength option
  // First we'll find the middle of the dart, then shift towards the bust point along it
  // for as far as the bustDartLength option tells us to
  //
  points.bustDartCenter = points.bustSideCut1_rot2.shiftFractionTowards(
    points.bustSideCut1_rot1,
    0.5
  )
  points.bustDartTip = points.bustDartCenter.shiftFractionTowards(
    points.bust_rot2,
    options.bustDartLength
  )

  //
  // Draw the front dart. Or if we're not adding a front dart, narrow the side from the waist down
  // taking into account the contour option to see how abrupt we should narrow the body below the breasts
  //
  if (options.frontDarts) {
    let reduce = points.waist.dx(points.waist_rot2)
    points.frontDartTip = points.bustWaist_rot2.shiftFractionTowards(
      points.bust_rot2,
      options.frontDartLength
    )
    points.frontDartRight = new Point(
      points.frontDartTip.x + reduce / 2,
      points.hem_rot2.y - points.frontDartTip.dy(points.hem_rot2) * options.contour
    )
    points.frontDartLeft = points.frontDartRight.flipX(points.frontDartTip)
    points.frontDartLeftCp = points.frontDartLeft.shift(
      90,
      points.frontDartTip.dy(points.frontDartLeft) / 2
    )
    points.frontDartRightCp = points.frontDartLeftCp.flipX(points.frontDartTip)
    points.frontDartHemLeft = new Point(points.frontDartLeft.x, points.hem_rot2.y)
    points.frontDartHemRight = new Point(points.frontDartRight.x, points.hem_rot2.y)
    paths.frontDart = new Path()
      .move(points.frontDartHemRight)
      .line(points.frontDartRight)
      .curve_(points.frontDartRightCp, points.frontDartTip)
      ._curve(points.frontDartLeftCp, points.frontDartLeft)
      .line(points.frontDartHemLeft)
      .attr('class', 'fabric dotted')
  } else {
    let waistDelta = points.waist.dx(points.waist_rot2) * options.contour
    let hipsDelta = points.hips.dx(points.hips_rot2)
    for (let p of ['waist_rot2', 'waistCp1_rot2', 'belowDartCpBottom_rot2'])
      points[p] = points[p].shift(180, waistDelta)
    for (let p of ['hipsCp2_rot2', 'hips_rot2', 'hem_rot2'])
      points[p] = points[p].shift(180, hipsDelta)
  }

  //
  // Now overwrite the points that need to be adapted
  //
  let clone1 = [
    'armhole',
    'armholeCp2',
    'armholeHollowCp1',
    'armholeHollow',
    'armholeHollowCp2',
    'armholePitchCp1',
  ]
  for (let p of clone1) points[p] = points[`${p}_rot1`].clone()
  let clone2 = ['hem', 'hips', 'hipsCp2', 'waistCp1', 'waist', 'bust']
  for (let p of clone2) points[p] = points[`${p}_rot2`].clone()
  points.cfHem = new Point(points.cfHem.x, points.bustHem_rot2.y)
  points.waistCp2 = points.belowDartCpBottom_rot2.clone()
  points.dartBottomCp = points.belowDartCpTop_rot2.clone()
  points.dartBottom = points.bustSideCut1_rot2.clone()
  points.dartTop = points.bustSideCut1_rot1.clone()
  points.dartTopCp = points.aboveDartCpBottom_rot1.clone()
  points.cfArmhole = new Point(0, points.armhole.y)
  points.cfWaist = new Point(0, points.waist.y)
  points.cfHips = new Point(0, points.hips.y)
  points.cfBust = new Point(0, points.bust.y)

  //
  // Smooth out the armhole to avoid a kink where we rotated
  // Note that this will ever so slightly shorten the armhole.
  // But that will just end up being sleevecap ease
  //
  points.armholePitch = points.armholePitchCp1_rot1.shiftTowards(
    points.armholePitchCp2,
    points.armholePitch.dist(points.armholePitchCp1_rot1)
  )
  // This is a problem because ever since the S3 options in Brian
  // we re-use paths.frontArmhole which now does not match up with
  // the armholePitch point we moved above. So let's hack the path's
  // starting point.
  // See https://github.com/freesewing/freesewing/issues/1335
  paths.frontArmhole.ops[0].to.x = points.armholePitch.x
  paths.frontArmhole.ops[0].to.y = points.armholePitch.y

  //
  // Put the snippets in the right place
  //
  for (let s in snippets) delete snippets[s]
  macro('sprinkle', {
    snippet: 'notch',
    on: [
      'armhole',
      'armholePitch',
      'cfArmhole',
      'cfWaist',
      'cfHem',
      'hips',
      'waist',
      'bust',
      'cfBust',
    ],
  })
  points.logo = new Point(points.armhole.x / 2, points.armhole.y)
  snippets.logo = new Snippet('logo', points.logo)

  // begin changes to modify into a dress pattern

  // calculate maximum garment length (floor length)
  // let maxlength = measurements.hpsToWaistBack + measurements.waistToFloor
  let maxlength = points.waist.y + measurements.waistToFloor

  // set points defining max center front hem position and max outer hem position
  points.cfHemMax = new Point(points.cfHem.x, maxlength)
  points.outHemMax = new Point(points.hem_rot2.x * options.hemExpansion, points.cfHemMax.y)

  // set the actual center front hem position to percentage of the maximal position
  points.cfHem = points.cfHem.shiftFractionTowards(points.cfHemMax, options.lengthBonus)
  points.hem = points.hem.shiftFractionTowards(points.outHemMax, options.lengthBonus)

  // establish a construction line and use it to calculate outside hem position
  paths.hemConstructor = new Path().move(points.hips_rot2).line(points.outHemMax).hide()
  points.hemCalc = new Point(paths.hemConstructor.intersectsY(points.cfHem.y))

  // draw the new hem path
  paths.test = new Path().move(points.cfHem).line(points.hemCalc)

  // end changes to modify into a dress pattern

  //
  // Now recreate the paths and let Simon take it from here
  //
  paths.dart = new Path().move(points.dartBottom).line(points.bustDartTip).line(points.dartTop)
  paths.saBaseFromHips = new Path()
    .move(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve(points.belowDartCpBottom_rot2, points.dartBottomCp, points.dartBottom)
    .move(points.dartTop)
    .curve_(points.dartTopCp, points.armhole)
  paths.saBaseFromArmhole = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .join(paths.frontArmhole)
    .line(points.s3CollarSplit)
    .join(paths.frontCollar)

  switch (options.hemStyle) {
    case 'baseball':
      points.bballStart = points.cfHem.shiftFractionTowards(points.hem, 0.5)
      // Don't let front dart fall into curved part of hem
      if (options.frontDarts && points.bballStart.x > points.frontDartRight.x) {
        points.bballStart.x = points.frontDartRight.x
      }
      points.bballEnd = points.hem.shiftFractionTowards(points.hips, options.hemCurve)
      points.bballCp1 = points.bballStart.shiftFractionTowards(points.hem, 0.5)
      points.bballCp2 = new Point(points.bballCp1.x, points.bballEnd.y)
      paths.saBase = new Path().move(points.bballEnd).line(points.hips).join(paths.saBaseFromHips)
      paths.hemBase = new Path()
        .move(points.cfHem)
        .line(points.bballStart)
        .curve(points.bballCp1, points.bballCp2, points.bballEnd)
      break
    case 'slashed':
      macro('round', {
        from: points.hips,
        to: points.cfHem,
        via: points.hem,
        radius: points.hips.dist(points.hem) * options.hemCurve,
        prefix: 'slash',
      })
      paths.saBase = new Path().move(points.hips).join(paths.saBaseFromHips)
      paths.hemBase = new Path()
        .move(points.cfHem)
        .line(points.slashEnd)
        .curve(points.slashCp2, points.slashCp1, points.slashStart)
      break
    default:
      paths.saBase = new Path().move(points.hem).line(points.hips).join(paths.saBaseFromHips)
      paths.hemBase = new Path().move(points.cfHem).line(points.hem)
  }

  paths.seam = paths.hemBase
    .join(paths.saBase)
    .join(paths.saBaseFromArmhole)
    // .join(paths.test)
    .attr('class', 'fabric')

  paths.saBaseFromHips.hide()
  paths.saBaseFromArmhole.hide()
  paths.saBase.hide()

  if (complete && sa) {
    paths.saFrench = paths.saBase.offset(sa * options.ffsa).attr('class', 'fabric sa')
    paths.saFromArmhole = paths.saBaseFromArmhole.offset(sa).attr('class', 'fabric sa')
    paths.hemSa = paths.hemBase.offset(sa * 3).attr('class', 'fabric sa')
    paths.saConnect = new Path()
      .move(paths.hemSa.end())
      .line(paths.saFrench.start())
      .move(paths.saFrench.end())
      .line(paths.saFromArmhole.start())
      .attr('class', 'fabric sa')
    delete paths.sa
  }

  return part
}

export const fbaFront = {
  name: 'dona.fbaFront',
  from: front,
  measurements: ['highBust', 'waistToFloor', 'hpsToWaistBack', 'bustSpan', 'hpsToBust'],
  hide: {
    self: true,
    from: true,
    inherited: false,
  },
  plugins: [bustPlugin],
  options: {
    draftForHighBust: true,
    minimalDartShaping: 5,
    bustDartAngle: { deg: 10, min: 0, max: 20, menu: 'advanced' },
    bustDartLength: { pct: 80, min: 50, max: 90, menu: 'advanced' },
    frontDarts: { bool: false, menu: 'advanced' },
    frontDartLength: { pct: 45, min: 30, max: 60, menu: 'advanced' },
    contour: { pct: 50, min: 30, max: 75, menu: 'style' },
    bustAlignedButtons: {
      dflt: 'disabled',
      list: ['even', 'split', 'disabled'],
      menu: 'style.closure',
    },
    lengthBonus: { pct: 75, min: 25, max: 100, menu: 'fit' },
    hemExpansion: { pct: 150, min: 100, max: 200, menu: 'fit' },
  },
  draft: donaFbaFront,
}
