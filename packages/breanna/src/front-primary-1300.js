import {
  insertDart,
  applyBustDarts,
  getDartPaths,
  getSaDartPaths,
  getDartInsertionPoint
} from './dart-utils'

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
  let [primary, secondary] = getDartPaths(Path, points)
  let [saPrimary, saSecondary] = getSaDartPaths(Path, points)

  switch (store.get('secondaryBustDartLocation')) {
    case 1330:
      template
        .move(points.cfNeck)
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .noop('secondary')
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .noop('primary')
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1400:
    case 1500:
    case 1600:
      template
        .move(points.cfNeck)
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.secondaryBustDart1)
        .noop('secondary')
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .noop('primary')
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1700:
      template
        .move(points.cfNeck)
        .line(points.cfWaist)
        .line(points.waist)
        .noop('secondary')
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .noop('primary')
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
  }

  paths.seam = insertDart(insertDart(template, primary, 'primary'), secondary, 'secondary')
    .close()
    .attr('class', 'fabric stroke-xl')
  paths.saBase = insertDart(insertDart(template, saPrimary, 'primary'), saSecondary, 'secondary')
    .close()
    .attr('class', 'lining lashed')

  return part
}
