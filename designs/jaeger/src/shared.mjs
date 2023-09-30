/**
 * This calculates a bunch of helper variables and stores them
 */
export const calculateRatios = (part) => {
  let { store, measurements, options } = part.shorthand()

  // Make sure collar height makes sense
  if (options.collarHeight * 2 < options.rollLineCollarHeight)
    options.rollLineCollarHeight = options.collarHeight * 2

  // Calculate different values for reducing from chest to hips via waist
  store.set('chest', measurements.chest * (1 + options.chestEase))
  store.set('waist', measurements.waist * (1 + options.waistEase))
  store.set('hips', measurements.hips * (1 + options.hipsEase))

  store.set('waistReduction', store.get('chest') - store.get('waist'))
  store.set('hipsReduction', store.get('chest') - store.get('hips'))
}

/**
 * Draws the line seperating side panel (back-side boundary, aka bs)
 * Note that this is without shaping, but rather the style line
 * that will be the starting point for shaping the back/side seam
 *
 * On the back, this will be drawn as-is. On the front, it will be
 * drawn, than mirrored so the part that's cut off from the back is
 * added to the front (to become the side later).
 *
 * The optional flip parameter mirrors this for the front part
 */
export const backSideBoundary = (part, flip = false) => {
  let { points, Point, paths, Path } = part.shorthand()

  points.bsArmholeHollow = points.armholeHollow.clone()
  points.bsArmholeHollowCp2 = points.armholeHollowCp2.rotate(90, points.armholeHollow)
  points.bsWaist = new Point(points.bsArmholeHollowCp2.x, points.waist.y)
  points.bsHips = new Point(points.bsWaist.x, points.hips.y)
  points.bsHem = new Point(points.bsWaist.x, points.hem.y)

  if (flip) {
    points.bsArmholeHollowCp1 = points.armholeHollowCp1.clone()
    points.bsArmholeCp2 = points.armholeCp2.clone()
    for (let p of [
      'bsArmholeHollow',
      'bsArmholeHollowCp2',
      'bsWaist',
      'bsHips',
      'bsHem',
      'bsArmholeHollowCp1',
      'bsArmholeCp2',
    ]) {
      points[p] = points[p].flipX(points.armhole)
    }
  }

  /** Uncomment this to see the style line without shaping
   */
  paths.bs = new Path()
    .move(points.bsHem)
    .line(points.bsWaist)
    ._curve(points.bsArmholeHollowCp2, points.bsArmholeHollow)
    .attr('class', 'stroke-xl lining lashed')
  if (flip) paths.bs.curve(points.bsArmholeHollowCp1, points.bsArmholeCp2, points.armhole)
}
