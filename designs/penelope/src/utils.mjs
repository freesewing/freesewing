function dartCalcFront(options, seatWaistDiff, waist, nrOfDarts) {
  return (
    ((waist * options.dartMinimumWidth +
      (Math.max(
        Math.min(seatWaistDiff, waist * options.dartMaximumDifference),
        waist * options.dartMinimumDifference
      ) -
        waist * options.dartMinimumDifference) /
        4) /
      nrOfDarts) *
    (0.5 + options.dartToSideSeamFactor)
  )
}

function dartCalcBack(options, seatWaistDiff, waist, nrOfDarts) {
  return (
    ((waist * options.dartMinimumWidth +
      (seatWaistDiff -
        waist * options.dartBackControl1 -
        (seatWaistDiff - waist * options.dartBackControl1) / options.dartBackControl2) /
        options.dartBackControl3) /
      nrOfDarts) *
    (0.5 + options.dartToSideSeamFactor)
  )
}

function dartCalc(store, options, seat, seatEase, waist, waistEase) {
  seat += seatEase
  waist += waistEase
  const seatWaistDiff = Math.max(seat - waist, 0)

  let nrOfDarts = options.nrOfDarts

  let frontDartSize = dartCalcFront(options, seatWaistDiff, waist, nrOfDarts)

  // If the front darts are too small and we have more than one, remove one.
  if (frontDartSize <= options.dartMinimumWidth * nrOfDarts && nrOfDarts > 1) {
    nrOfDarts--
    frontDartSize = dartCalcFront(options, seatWaistDiff, waist, nrOfDarts)
  }

  // See if the dart created by the side seam becomes too small:
  if (seatWaistDiff / 4 - frontDartSize < options.dartSideMinimum) {
    frontDartSize = 0
  }

  let backDartSize = dartCalcBack(options, seatWaistDiff, waist, nrOfDarts)
  // If the back darts are too small and we have more than one, remove one.
  if (backDartSize < options.dartMinimumWidth * nrOfDarts && nrOfDarts > 1) {
    nrOfDarts = 1
    frontDartSize = dartCalcFront(options, seatWaistDiff, waist, nrOfDarts)
    backDartSize = dartCalcBack(options, seatWaistDiff, waist, nrOfDarts)
  }

  store.set('frontDartSize', frontDartSize)
  store.set('backDartSize', backDartSize)
  store.set('nrOfDarts', nrOfDarts)
}

/**
 * Method to add a dart onto a curve
 * The dart is added at an 90 degree angle with the curve for a certain depth and Width
 * @param part             The part that will provide that Paths
 * @param curvePath        The curve the dart needs to divide
 * @param distance         Distance from $p1 where the middle of the dart will be
 * @param dartSize         The width of the dart opening at the curve
 * @param dartDepth        The depth of the dart
 *
 * @return                 Object with three path attributes; left, dart, right
 */
function addDartToCurve(part, curvePath, distance, dartSize, dartDepth) {
  const { options } = part.shorthand()

  if (dartSize > curvePath.length()) {
    // Curve too small to fit dart!
    return null
  }
  if (distance < dartSize / 1.9) {
    distance = dartSize / 2.1
  }
  if (curvePath.length() - distance < dartSize) {
    distance = curvePath.length() - dartSize / 1.95
  }
  const dartMiddle = curvePath.shiftAlong(distance)
  const curvePaths = curvePath.split(dartMiddle)

  if (curvePaths[0].length() < dartSize / 2 || curvePaths[1].length() < dartSize / 2) {
    // Curve too small to fit dart!
    return null
  }
  const dartLeft = curvePaths[0].reverse().shiftAlong(dartSize / 2)
  const dartRight = curvePaths[1].shiftAlong(dartSize / 2)

  const distanceFactor = 0.0015
  const leftCPdistance = Math.min(
    curvePaths[0].length() * distanceFactor,
    curvePaths[0].ops[1].to.dist(curvePaths[0].ops[1].cp2)
  )
  const rightCPdistance = Math.min(
    curvePaths[1].length() * distanceFactor,
    curvePaths[1].ops[0].to.dist(curvePaths[1].ops[1].cp1)
  )

  const dartBottom = dartMiddle.shift(dartLeft.angle(dartRight) - 90, dartDepth)

  const leftDartCP = dartLeft.shift(dartLeft.angle(dartBottom) - 90, leftCPdistance)
  const rightDartCP = dartRight.shift(dartRight.angle(dartBottom) + 90, rightCPdistance)

  const curveLeftOfDart = new part.Path()
    .move(curvePaths[0].ops[0].to)
    .curve(curvePaths[0].ops[1].cp1, leftDartCP, dartLeft)
    .hide()
  const curveRightOfDart = new part.Path()
    .move(dartRight)
    .curve(rightDartCP, curvePaths[1].ops[1].cp2, curvePaths[1].ops[1].to)
    .hide()

  let dart = null
  if (options.curvedDarts) {
    if (
      dartBottom.angle(dartLeft) - dartBottom.angle(dartRight) <
      options.curvedDartControlAngle * 2
    ) {
      dart = new part.Path().move(dartLeft).line(dartBottom).line(dartRight).hide()
    } else {
      const dartBottomCp2 = dartBottom
        .shiftFractionTowards(dartMiddle, options.curvedDartBottomControlOffset)
        .rotate(options.curvedDartControlAngle, dartBottom)
      const dartBottomCp1 = dartBottom
        .shiftFractionTowards(dartMiddle, options.curvedDartBottomControlOffset)
        .rotate(360 - options.curvedDartControlAngle, dartBottom)
      const dartLeftCp1 = dartLeft.shiftFractionTowards(
        dartBottom,
        options.curvedDartTopControlOffset
      )
      const dartRightCp2 = dartRight.shiftFractionTowards(
        dartBottom,
        options.curvedDartTopControlOffset
      )

      dart = new part.Path()
        .move(dartLeft)
        .curve(dartLeftCp1, dartBottomCp2, dartBottom)
        .curve(dartBottomCp1, dartRightCp2, dartRight)
        .hide()
    }
  } else {
    dart = new part.Path().move(dartLeft).line(dartBottom).line(dartRight).hide()
  }

  const curveWithDart = {
    left: curveLeftOfDart,
    dart: dart,
    right: curveRightOfDart,
  }

  return curveWithDart
}

export { addDartToCurve, dartCalc }
