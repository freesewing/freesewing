/*
 * We can't simply use the Brian sleevecap here because as breasts get bigger
 * the front part of the armhole seam will get a lot longer. With the default
 * sleevecap from our menswear block, we'd end up with a more or less symmetrical
 * sleeve which we now have to fit in a very asymetrical armhole -> not good.
 * So, instead we draft an initial sleevecap aiming for twice the length of
 * the back armhole seam. Then, we will adjust (only) the front part of the
 * sleevecap until the length is correct.
 *
 * Apart from the two-step approach, the overal construction is similar as in Brian.
 */

/** Calculates the differece between actual and optimal sleevecap length
 * Positive values mean sleevecap is longer than armhole
 */
function sleevecapDelta(store, twoBacks = false, options = null) {
  return twoBacks
    ? store.get('sleevecapLength') -
        store.get('backArmholeLength') * 2 * (1 + options.sleevecapEase)
    : store.get('sleevecapLength') - store.get('sleevecapTarget')
}

function sleevecapAdjust(store, twoBacks = false, options = null) {
  let delta = sleevecapDelta(store, twoBacks, options)
  let factor = store.get('sleeveFactor')
  if (delta > 10) factor = factor * 0.75
  else if (delta > 0) factor = factor * 0.9
  else factor = factor * 1.05
  store.set('sleeveFactor', factor)
}

function draftSleevecap(part, run) {
  let { store, measurements, options, Point, points, Path, paths } = part.shorthand()
  // Sleeve center axis
  points.centerBiceps = new Point(0, 0)
  points.centerCap = points.centerBiceps.shift(
    90,
    options.sleevecapTopFactorY *
      ((measurements.biceps / 2) * (1 + options.bicepsEase) * store.get('sleeveFactor'))
  )

  // Left and right biceps points, limit impact of sleeveFactor to 25%
  let halfWidth = (measurements.biceps * (1 + options.bicepsEase)) / 2
  points.bicepsLeft = points.centerBiceps.shift(
    180,
    halfWidth * options.sleeveWidthGuarantee +
      halfWidth * (1 - options.sleeveWidthGuarantee) * store.get('sleeveFactor')
  )
  points.bicepsRight = points.bicepsLeft.flipX()

  // Adapt sleeve center axis
  points.capLeft = new Point(points.bicepsLeft.x, points.centerCap.y)
  points.capRight = points.capLeft.flipX()
  points.centerCap = points.capLeft.shiftFractionTowards(
    points.capRight,
    options.sleevecapTopFactorX
  )

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
    ._curve(points.capQ1Cp1, points.capQ1)
    .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
    .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
    .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
    .curve_(points.capQ4Cp2, points.bicepsLeft)

  // Store sleevecap length
  store.set('sleevecapLength', paths.sleevecap.length())
  if (run === 0) {
    let armholeLength, sleevecapEase
    armholeLength = 2 * store.get('backArmholeLength')
    sleevecapEase = armholeLength * options.sleevecapEase
    store.set('sleevecapEase', sleevecapEase)
    store.set('sleevecapTarget', armholeLength + sleevecapEase)

    // Uncomment this line to see all sleevecap iterations
    //paths[run] = paths.sleevecap;
  }
}

function redrawSleevecapFront(part, delta) {
  let { store, points, Path, paths } = part.shorthand()
  let factor = points.bicepsRight.x
  for (let p of [
    'bicepsRight',
    'capQ1Cp1',
    'capQ1',
    'capQ1Base',
    'capQ1Cp2',
    'frontPitch',
    'capQ2Cp1',
    'capQ2',
    'capQ2Base',
    'capQ2Cp2',
  ]) {
    points[p].x += (points[p].x / factor) * delta * -1
  }

  // Sleevecap seamline
  paths.sleevecap = new Path()
    .move(points.bicepsRight)
    ._curve(points.capQ1Cp1, points.capQ1)
    .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
    .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
    .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
    .curve_(points.capQ4Cp2, points.bicepsLeft)

  // Store sleevecap length
  store.set('sleevecapLength', paths.sleevecap.length())
}

export default (part) => {
  let { store, options, Point, points, paths } = part.shorthand()

  // Step 1: sleevecap for 2 backs joined together (twoBacks = true)
  store.set('sleeveFactor', 1)
  let run = 0
  do {
    draftSleevecap(part, run)
    sleevecapAdjust(store, true, options)
    run++
  } while (
    options.breannaFitSleeve === true &&
    run < 50 &&
    Math.abs(sleevecapDelta(store, true, options)) > 2
  )

  //
  let armholeLength = store.get('frontArmholeLength') + store.get('backArmholeLength')
  let sleevecapEase = armholeLength * options.sleevecapEase
  store.set('sleevecapEase', sleevecapEase)
  store.set('sleevecapTarget', armholeLength + sleevecapEase)

  // Step 2: sleevecap for back joined with front (twoBacks = false)
  run = 0
  do {
    redrawSleevecapFront(part, sleevecapDelta(store))
    sleevecapAdjust(store)
    run++
  } while (options.breannaFitSleeve === true && run < 50 && Math.abs(sleevecapDelta(store)) > 2)

  // Paths
  paths.sleevecap.attr('class', 'fabric')

  // Anchor point for sampling
  points.gridAnchor = new Point(0, 0)

  return part
}
