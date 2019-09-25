export default part => {
  let {
    store,
    measurements,
    sa,
    Point,
    points,
    Path,
    paths,
    complete,
    paperless,
    macro,
    options,
    Snippet,
    snippets,
    utils
  } = part.shorthand()

  /*
   * Simone is Simon with an FBA (Full Bust Adjustment)
   * Which means that we draft simon with the high bust measurement instead
   * of the chest circumference (full bust). This is handled auto-magically by plugin-bust
   *
   * Once drafted, we add the FBA, which is what happens in this file
   */

  /*
   * How much room to we need to create to fit the breasts?
   * Note that measurements.bust is added by the bust plugin
   * and that we divide by two since we add room on right and left side
   */
  const FBA = (measurements.bust - measurements.highBust) / 2

  /*
   * Locate bust point
   */
  points.bust = new Point(
    measurements.bustSpan / 2,
    points.neck.y + measurements.highPointShoulderToBust
  )

  /*
   * Figure out how much do we need to open a dart to create the required FBA room
   * Obviously, we don't guess, we use maths :)
   */
  let one = points.armholeHollow.dist(points.bust) // We consider this to be 1
  let cosBust = (points.bust.dx(points.armholeHollow) / one) * -1 // Which means this gives us the cos of the bust point
  let cosRot = ((points.bust.dx(points.armholeHollow) - FBA) / one) * -1 // And this gives us the cos of the target
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
   */
  points.realBustPoint = points.bust.clone()
  points.bust = points.bust.rotate(FBARot * -1, points.armholeHollow)

  /*
   * Cut to the side seam
   */
  points._dartDirection = points.bust.shift(options.bustDartAngle * -1, measurements.bust / 4)
  points.bustSideCut1 = utils.lineIntersectsCurve(
    points.bust,
    points._dartDirection,
    points.waist,
    points.waistCp2,
    points.armhole,
    points.armhole
  )

  /*
   * Mark bust at waist and hem level
   */
  points.bustWaist = new Point(points.bust.x, points.waist.y)
  points.bustHem = new Point(points.bust.x, points.hem.y)

  /*
   * Now rotate entire side around armhole hollow to create room for FBA
   */
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
    'armholeHollowCp1'
  ]
  for (let p of rot1) points[`${p}_rot1`] = points[p].rotate(FBARot, points.armholeHollow)
  /*
   *  Help line to show the initial cut lines and first rotation
   *  Uncomment this if you'd like to understand what's going on
  paths.fbaCut1 = new Path()
    .move(points.armholeHollow)
    .line(points.bust)
    .line(points.bustSideCut1)
    .move(points.bust)
    .line(points.bustHem)
    .attr('class', 'various dashed')
  paths.rot1 = new Path()
    .move(points.armholeHollow)
    .line(points.bust_rot1)
    .line(points.bustHem_rot1)
    .line(points.hem_rot1)
    .line(points.hips_rot1)
    .curve(points.hipsCp2_rot1, points.waistCp1_rot1, points.waist_rot1)
    .curve_(points.waistCp2_rot1, points.armhole_rot1)
    .curve(points.armholeCp2_rot1, points.armholeHollowCp1_rot1, points.armholeHollow)
    .close()
    .attr('class', 'lining lashed')
  */

  /*
   * Split the side seam at the dart, and extrac control points from the Path object
   */
  const toSplit = new Path()
    .move(points.waist_rot1)
    .curve_(points.waistCp2_rot1, points.armhole_rot1)
    .split(points.bustSideCut1_rot1)
  paths.fbaAboveDart = toSplit.pop()
  paths.fbaBelowDart = toSplit.pop()
  paths.fbaAboveDart.render = false
  paths.fbaBelowDart.render = false
  points.belowDartCpTop_rot1 = paths.fbaBelowDart.ops[1].cp2
  points.belowDartCpBottom_rot1 = paths.fbaBelowDart.ops[1].cp1
  points.aboveDartCpBottom_rot1 = paths.fbaAboveDart.ops[1].cp1 // (only one CP on this part

  /*
   * Now rotate the bottom part around the (rotated) bust point so it's straight again
   */
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
    'belowDartCpTop',
    'belowDartCpBottom'
  ]
  for (let p of rot2)
    points[`${p}_rot2`] = points[`${p}_rot1`].rotate(FBARot * -1, points.bust_rot1)

  /*
   * Help line to show the second rotation
   *  Uncomment this if you'd like to understand what's going on
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
    .curve(points.armholeCp2_rot1, points.armholeHollowCp1_rot1, points.armholeHollow)
    .line(points.bust_rot2)
    .attr('class', 'interfacing lashed')
  */

  /*
   * Bust darts don't actually run entirely up to the bust point but stop a bit short
   * How short is controlled by the bustDartLength option
   * First we'll find the middle of the dart, then shift towards the bust point along it
   * for as far as the bustDartLength option tells us to
   */
  points.bustDartCenter = points.bustSideCut1_rot2.shiftFractionTowards(
    points.bustSideCut1_rot1,
    0.5
  )
  points.bustDartTip = points.bustDartCenter.shiftFractionTowards(
    points.bust_rot2,
    options.bustDartLength
  )

  /*
   * Draw the front dart. Or if we're not adding a front dart, narrow the side from the waist down
   */
  if (options.frontDarts) {
    let reduce = points.waist.dx(points.waist_rot2)
    points.frontDartTip = points.bustWaist_rot2.shiftFractionTowards(
      points.bust_rot2,
      options.frontDartLength
    )
    points.frontDartWaistRight = points.bustWaist_rot2.shift(0, reduce / 2)
    points.frontDartWaistLeft = points.bustWaist_rot2.shift(180, reduce / 2)
    points.frontDartWaistLeftCpTop = points.frontDartWaistLeft.shift(
      90,
      points.frontDartTip.dy(points.waist_rot2) / 2
    )
    points.frontDartWaistRightCpTop = points.frontDartWaistRight.shift(
      90,
      points.frontDartTip.dy(points.waist_rot2) / 2
    )
    points.frontDartHemLeft = new Point(points.frontDartWaistLeft.x, points.hem_rot2.y)
    points.frontDartHemRight = new Point(points.frontDartWaistRight.x, points.hem_rot2.y)
    paths.frontDart = new Path()
      .move(points.frontDartHemRight)
      .line(points.frontDartWaistRight)
      .curve_(points.frontDartWaistRightCpTop, points.frontDartTip)
      ._curve(points.frontDartWaistLeftCpTop, points.frontDartWaistLeft)
      .line(points.frontDartHemLeft)
      .attr('class', 'fabric dotted')
  } else {
    let waistX = points.waist.x
    let hipsX = points.hips.x
    for (let p of ['waist_rot2', 'waistCp1_rot2', 'belowDartCpBottom_rot2']) points[p].x = waistX
    for (let p of ['hipsCp2_rot2', 'hips_rot2', 'hem_rot2']) points[p].x = hipsX
  }

  /*
   * Now overwrite the points that need to be adapted, and re-create the seam path.
   * After that, we'll let Simon take it from here
   */
  let clone1 = ['armhole', 'armholeCp2', 'armholeHollowCp1']
  for (let p of clone1) points[p] = points[`${p}_rot1`].clone()
  let clone2 = ['hem', 'hips', 'hipsCp2', 'waistCp1', 'waist']
  for (let p of clone2) points[p] = points[`${p}_rot2`].clone()
  points.cfHem = new Point(points.cfHem.x, points.bustHem_rot2.y)
  points.waistCp2 = points.belowDartCpBottom_rot2.clone()
  points.dartBottomCp = points.belowDartCpTop_rot2.clone()
  points.dartBottom = points.bustSideCut1_rot2.clone()
  points.dartTop = points.bustSideCut1_rot1.clone()
  points.dartTopCp = points.aboveDartCpBottom_rot1.clone()

  /*
   * Recreate the base paths, and let Simon take it from here
   */
  paths.saBaseFromHips = new Path()
    .move(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve(points.belowDartCpBottom_rot2, points.dartBottomCp, points.dartBottom)
    .line(points.bustDartTip)
    .line(points.dartTop)
    .curve_(points.dartTopCp, points.armhole)
  paths.saBaseFromArmhole = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck)

  switch (options.hemStyle) {
    case 'baseball':
      points.bballStart = points.cfHem.shiftFractionTowards(points.hem, 0.5)
      // Don't let front dart fall into curved part of hem
      if (options.frontDarts && points.bballStart.x > points.frontDartWaistRight.x) {
        points.bballStart.x = points.frontDartWaistRight.x
      }
      points.bballEnd = points.hem.shiftFractionTowards(points.hips, options.hemCurve)
      points.bballCp1 = points.bballStart.shiftFractionTowards(points.hem, 0.5)
      points.bballCp2 = new Point(points.bballCp1.x, points.bballEnd.y)
      paths.saBase = new Path()
        .move(points.bballEnd)
        .line(points.hips)
        .join(paths.saBaseFromHips)
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
        prefix: 'slash'
      })
      paths.saBase = new Path().move(points.hips).join(paths.saBaseFromHips)
      paths.hemBase = new Path()
        .move(points.cfHem)
        .line(points.slashEnd)
        .curve(points.slashCp2, points.slashCp1, points.slashStart)
      break
    default:
      paths.saBase = new Path()
        .move(points.hem)
        .line(points.hips)
        .join(paths.saBaseFromHips)
      paths.hemBase = new Path().move(points.cfHem).line(points.hem)
  }

  paths.seam = paths.hemBase
    .join(paths.saBase)
    .join(paths.saBaseFromArmhole)
    .attr('class', 'fabric')

  return part
}
