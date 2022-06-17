function dartCalcFront(options, seatWaistDiff, nrOfDarts) {
  /*
  console.log(
    "F: seatWaistDiff: " + seatWaistDiff + " nrOfDarts: " + nrOfDarts
  );
  */
  return (
    ((options.dartMinimumWidth +
      (Math.max(
        Math.min(seatWaistDiff, options.dartMaximumDifference),
        options.dartMinimumDifference
      ) -
        options.dartMinimumDifference) /
        4) /
      nrOfDarts) *
    (0.5 + options.dartToSideSeamFactor)
  )
}

function dartCalcBack(options, seatWaistDiff, nrOfDarts) {
  /*
  console.log(
    "B: seatWaistDiff: " + seatWaistDiff + " nrOfDarts: " + nrOfDarts
  );
  */
  return (
    ((options.dartMinimumWidth +
      (seatWaistDiff -
        options.dartBackControl1 -
        (seatWaistDiff - options.dartBackControl1) / options.dartBackControl2) /
        options.dartBackControl3) /
      nrOfDarts) *
    (0.5 + options.dartToSideSeamFactor)
  )
}

function dartCalc(store, options, seat, seatEase, waist, waistEase) {
  seat += seatEase
  waist += waistEase
  let seatWaistDiff = Math.max(seat - waist, 0)

  let nrOfDarts = options.nrOfDarts

  let frontDartSize = dartCalcFront(options, seatWaistDiff, nrOfDarts)

  /*
  console.log({
    frontDartSize: frontDartSize,
    dartMinimumWidth: options.dartMinimumWidth,
    nrOfDarts: nrOfDarts
  });
  */

  // If the front darts are too small and we have more than one, remove one.
  if (frontDartSize <= options.dartMinimumWidth * nrOfDarts && nrOfDarts > 1) {
    nrOfDarts--
    frontDartSize = dartCalcFront(options, seatWaistDiff, nrOfDarts)
  }

  // See if the dart created by the side seam becomes too small:
  if (seatWaistDiff / 4 - frontDartSize < options.dartSideMinimum) {
    frontDartSize = 0
  }
  //        if( seatWaistDiff/4 -frontDartSize < options.dartSideMinimum || frontDartSize < options.dartMinimumWidth *nrOfDarts ) {
  //            nrOfDarts = 1;
  //        }

  /*
  console.log({
    frontDartSize: frontDartSize,
    dartMinimumWidth: options.dartMinimumWidth,
    nrOfDarts: nrOfDarts
  });
  */

  let backDartSize = dartCalcBack(options, seatWaistDiff, nrOfDarts)
  // If the back darts are too small and we have more than one, remove one.
  if (backDartSize < options.dartMinimumWidth * nrOfDarts && nrOfDarts > 1) {
    nrOfDarts = 1
    frontDartSize = dartCalcFront(options, seatWaistDiff, nrOfDarts)
    backDartSize = dartCalcBack(options, seatWaistDiff, nrOfDarts)
  }

  /*
  console.log({
    backDartSize: backDartSize,
    dartMinimumWidth: options.dartMinimumWidth,
    nrOfDarts: nrOfDarts
  });
  */

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
  let dartMiddle = curvePath.shiftAlong(distance)

  let curvePaths = curvePath.split(dartMiddle)
  let dartLeft = curvePaths[0].reverse().shiftAlong(dartSize / 2)
  let dartRight = curvePaths[1].shiftAlong(dartSize / 2)

  let distanceFactor = 0.15
  let leftCPdistance = Math.min(
    curvePaths[0].length() * distanceFactor,
    curvePaths[0].ops[1].to.dist(curvePaths[0].ops[1].cp2)
  )
  let rightCPdistance = Math.min(
    curvePaths[1].length() * distanceFactor,
    curvePaths[1].ops[0].to.dist(curvePaths[1].ops[1].cp1)
  )

  let dartBottom = dartMiddle.shift(dartLeft.angle(dartRight) - 90, dartDepth)

  let leftDartCP = dartLeft.shift(dartLeft.angle(dartBottom) - 90, leftCPdistance)
  let rightDartCP = dartRight.shift(dartRight.angle(dartBottom) + 90, rightCPdistance)

  let curveLeftOfDart = new part.Path()
    .move(curvePaths[0].ops[0].to)
    .curve(curvePaths[0].ops[1].cp1, leftDartCP, dartLeft)
    .setRender(false)
  let curveRightOfDart = new part.Path()
    .move(dartRight)
    .curve(rightDartCP, curvePaths[1].ops[1].cp2, curvePaths[1].ops[1].to)
    .setRender(false)

  let dart = new part.Path().move(dartLeft).line(dartBottom).line(dartRight).setRender(false)

  let curveWithDart = {
    left: curveLeftOfDart,
    dart: dart,
    right: curveRightOfDart,
  }

  /*
  part.points.dartMiddle = dartMiddle ;
  part.points.dartLeft = dartLeft ;
  part.points.dartRight = dartRight ;
  part.points.dartBottom = dartBottom ;
  */

  return curveWithDart
}

export { addDartToCurve, dartCalc }
