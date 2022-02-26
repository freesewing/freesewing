/** Calculates the differece between actual and optimal sleevecap length
 * Positive values mean sleevecap is longer than armhole
 */
function sleevecapDelta(store) {
  return store.get('sleevecapLength') - store.get('sleevecapTarget')
}

function sleevecapAdjust(store) {
  let delta = sleevecapDelta(store)
  let factor = store.get('sleeveFactor')
  if (delta > 0) factor = factor * 0.98
  else factor = factor * 1.02
  store.set('sleeveFactor', factor)
}

function draftSleevecap(part) {
  let { store, measurements, options, Point, points, Path, paths } = part.shorthand()
  // Sleeve center axis

  const biceps = measurements.biceps * (1 + options.bicepsEase)
  points.centerBiceps = new Point(0, 0)
  points.centerCap = points.centerBiceps.shift(
    90,
    (store.get('armscye') / Math.PI) * store.get('sleeveFactor')
  )

  // Left and right biceps points, limit impact to the biceps or sleeveWidthGuarantee setting
  let halfWidth  = biceps * store.get('stretchFactor') / 2;
  points.bicepsLeft = points.centerBiceps.shift(180,halfWidth)
  points.bicepsRight = points.bicepsLeft.flipX(points.centerBiceps)

  // Adapt sleeve center axis
  points.capLeft = new Point(points.bicepsLeft.x, points.centerCap.y)
  points.capRight = points.capLeft.flipX()
  points.centerCap = points.capLeft.shiftFractionTowards(
    points.capRight,
    options.sleevecapTopFactorX
  )

  // Test sine Sleevecap seamline
  const armholeDepth = store.get('armholeDepth');
  const bicepsDiameter = biceps / Math.PI;
  const capHeight = Math.sqrt( armholeDepth*armholeDepth -  bicepsDiameter*bicepsDiameter)
  const sineCPRatio =  0.3642
  points.centerCapS = points.centerBiceps.shift(
    90,
    capHeight//(measurements.biceps * (1 + options.bicepsEase) )
  )

  paths.sineSleevecap = new Path()
    .move(points.bicepsRight)
    .curve(points.bicepsRight.shift(180,halfWidth * sineCPRatio), points.centerCapS.shift(0,halfWidth * sineCPRatio), points.centerCapS)
    .curve(points.centerCapS.shift(180,halfWidth * sineCPRatio), points.bicepsLeft.shift(0,halfWidth * sineCPRatio), points.bicepsLeft)

  // Pitch points
  let width = points.bicepsRight.x
  let height = points.centerCap.y
  points.backPitch = new Point(
    -1 * width * options.sleevecapBackFactorX,
    height * options.sleevecapBackFactorY
  )
  points.frontPitch = new Point(
    width * options.sleevecapFrontFactorX,
    height * options.sleevecapFrontFactorY
  )

  // 4 sleevecap quadrants
  // Base points
  points.capQ1Base = points.frontPitch.shiftFractionTowards(points.bicepsRight, 0.5)
  points.capQ2Base = points.frontPitch.shiftFractionTowards(points.centerCap, 0.5)
  points.capQ3Base = points.backPitch.shiftFractionTowards(points.centerCap, 0.5)
  points.capQ4Base = points.backPitch.shiftFractionTowards(points.bicepsLeft, 0.5)
  // Offset points
  let baseOffset = measurements.biceps * (1 + options.bicepsEase)
  points.capQ1 = points.capQ1Base.shift(
    points.bicepsRight.angle(points.frontPitch) + 90,
    baseOffset * options.sleevecapQ1Offset
  )
  points.capQ2 = points.capQ2Base.shift(
    points.centerCap.angle(points.frontPitch) + 90,
    baseOffset * options.sleevecapQ2Offset
  )
  points.capQ3 = points.capQ3Base.shift(
    points.centerCap.angle(points.backPitch) - 90,
    baseOffset * options.sleevecapQ3Offset
  )
  points.capQ4 = points.capQ4Base.shift(
    points.bicepsLeft.angle(points.backPitch) - 90,
    baseOffset * options.sleevecapQ4Offset
  )

  // Control points
  points.capQ1Cp1 = points.capQ1.shift(
    points.frontPitch.angle(points.bicepsRight),
    baseOffset * options.sleevecapQ1Spread1
  )
  points.capQ1Cp2 = points.capQ1.shift(
    points.frontPitch.angle(points.bicepsRight),
    baseOffset * options.sleevecapQ1Spread2 * -1
  )
  points.capQ2Cp1 = points.capQ2.shift(
    points.centerCap.angle(points.frontPitch),
    baseOffset * options.sleevecapQ2Spread1
  )
  points.capQ2Cp2 = points.capQ2.shift(
    points.centerCap.angle(points.frontPitch),
    baseOffset * options.sleevecapQ2Spread2 * -1
  )
  points.capQ3Cp1 = points.capQ3.shift(
    points.backPitch.angle(points.centerCap),
    baseOffset * options.sleevecapQ3Spread1
  )
  points.capQ3Cp2 = points.capQ3.shift(
    points.backPitch.angle(points.centerCap),
    baseOffset * options.sleevecapQ3Spread2 * -1
  )
  points.capQ4Cp1 = points.capQ4.shift(
    points.bicepsLeft.angle(points.backPitch),
    baseOffset * options.sleevecapQ4Spread1
  )
  points.capQ4Cp2 = points.capQ4.shift(
    points.bicepsLeft.angle(points.backPitch),
    baseOffset * options.sleevecapQ4Spread2 * -1
  )

  // Sleevecap seamline
  paths.sleevecap = new Path()
    .move(points.bicepsRight)
    .curve(points.bicepsRight, points.capQ1Cp1, points.capQ1)
    .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
    .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
    .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
    .curve(points.capQ4Cp2, points.bicepsLeft, points.bicepsLeft)

  // Store sleevecap length
  store.set('sleevecapLength', paths.sleevecap.length())
}

export default (part) => {
  let { store, units, options, Point, measurements, points, paths, raise } = part.shorthand()

  let armholeLength = store.get('frontArmholeLength') + store.get('backArmholeLength')
  let sleevecapEase = armholeLength * options.sleevecapEase
  store.set('sleevecapEase', sleevecapEase)
  store.set('sleevecapTarget', armholeLength + sleevecapEase)

  const armscyeDepth = options.armscyeToWaist * measurements.hpsToWaistBack
  console.debug(`armhole:${armholeLength}, armscye:${store.get('armscye')}, armscyeDepth: ${armscyeDepth}` );

  store.set('sleeveFactor', 1)
  let run = 0
  let delta = 0
  do {
    draftSleevecap(part)
    // Uncomment this line to see all sleevecap iterations
    paths[run] = paths.sleevecap;
    delta = sleevecapDelta(store)
    sleevecapAdjust(store)
    run++
    raise.debug(`Fitting Brian sleevecap. Run ${run}: delta is ${units(delta)}`)
  } while (options.brianFitSleeve === true && run < 50 && Math.abs(sleevecapDelta(store)) > 2)

  // Paths
  paths.sleevecap.attr('class', 'fabric')

  // Anchor point for sampling
  points.gridAnchor = new Point(0, 0)

  return part
}
