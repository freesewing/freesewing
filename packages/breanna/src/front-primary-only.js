import { applyBustDarts, getDartInsertionPoint, getPrimaryDartRotationList } from './dart-utils'

export default part => {
  let {
    sa,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    Point,
    measurements,
    options,
    utils,
    store
  } = part.shorthand()

  // Save us some typing
  let loc = store.get('primaryBustDartLocation')
  let angle = store.get('bustDartAngle')
  // The 06:00 dart was drawn in the base front part
  if (loc !== 600) {
    // Keep original bust dart points
    points.origBustDart1 = points.primaryBustDart1.clone()
    points.origBustDart2 = points.primaryBustDart2.clone()
    points.primaryBustDart1 = getDartInsertionPoint(points, utils, loc, angle)

    // Rotate bust dart
    points.primaryBustDart2 = points.primaryBustDart1.rotate(angle, points.primaryBustDartTip)

    // Rotate rest of the block
    for (let p of getPrimaryDartRotationList(loc))
      points[p] = points[p].rotate(angle, points.primaryBustDartTip)

    // Redraw the waist
    points.cfWaistCp2 = points.cfWaist.shiftFractionTowards(points.origBustDart2, 0.5)
    points.waistCp1 = points.waist.shiftFractionTowards(points.origBustDart2, 0.5)

    // Let's keep the center front vertical as it is the grainline/cut-on-fold
    if (loc >= 1100) {
      let tilt = 270 - points.cfNeck.angle(points.cfWaist)
      for (let p in points) points[p] = points[p].rotate(tilt, points.cfNeck)
    }
  }

  // At this point, we should only continue of there's no secondary bust dart
  let secondary = store.get('secondaryBustDartLocation')
  if (secondary !== 0 && secondary !== loc) return part

  // Make bust darts practical
  applyBustDarts(points, options, utils)

  /*
   * Paths
   *
   * We are using the 'noop' method of a path here, which is pretty low-level freesewing stuff
   * By passing the noop method with an ID, we are merely marking this among the different path
   * (drawing operations). This allows us to easily inject operations at this point later,
   * which is exactly what the insertDraft() method does.
   * Doing this allows us to use the same base path for both the seam line and SA outline
   */
  let template = new Path()
  let dart = new Path()
    .line(points.primaryBustDart1)
    .line(points.primaryBustDartTip)
    .line(points.primaryBustDart2)
  let saDart = new Path()
    .line(points.primaryBustDart1)
    .line(points.primaryBustDartEdge)
    .line(points.primaryBustDart2)

  switch (loc) {
    case 600:
      template
        .move(points.cfNeck)
        .line(points.cfWaist)
        .noop('primary')
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 700:
      template
        .move(points.cfNeck)
        .noop('primary')
        .curve(points.cfWaistCp2, points.waistCp1, points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 800:
    case 900:
    case 1000:
      template
        .move(points.cfNeck)
        .noop('primary')
        .line(points.cfWaist)
        .curve(points.cfWaistCp2, points.waistCp1, points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1100:
      template
        .move(points.primaryBustDart1)
        .noop('primary')
        .line(points.cfWaist)
        .curve(points.cfWaistCp2, points.waistCp1, points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.primaryBustDart1)
      break
    case 1130:
      template
        .move(points.cfNeck)
        .line(points.cfWaist)
        .curve(points.cfWaistCp2, points.waistCp1, points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .noop('primary')
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1200:
    case 1230:
      template
        .move(points.cfNeck)
        .line(points.cfWaist)
        .curve(points.cfWaistCp2, points.waistCp1, points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .noop('primary')
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1300:
      template
        .move(points.cfNeck)
        .line(points.cfWaist)
        .curve(points.cfWaistCp2, points.waistCp1, points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .noop('primary')
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1330:
      template
        .move(points.cfNeck)
        .line(points.cfWaist)
        .curve(points.cfWaistCp2, points.waistCp1, points.waist)
        .line(points.armhole)
        .noop('primary')
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1400:
    case 1500:
    case 1600:
    case 1700:
      template
        .move(points.cfNeck)
        .line(points.cfWaist)
        .curve(points.cfWaistCp2, points.waistCp1, points.waist)
        .noop('primary')
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
  }

  paths.seam = template
    .insop('primary', dart)
    .close()
    .attr('class', 'fabric stroke-xl')
  paths.saBase = template
    .insop('primary', saDart)
    .close()
    .attr('class', 'lining lashed')

  return part
}
