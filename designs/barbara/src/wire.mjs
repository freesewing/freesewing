export const wire = {
  name: 'barbara.wire',
  measurements: [
    'underbust',
    'breastRootWidth',
    'breastRootDepth',
    'breastRootFirstHalfDepth',
    'breastRootSecondHalfDepth',
    'breastRootAngle',
    'breastRootLeftAngle',
    'breastRootRightAngle',
    'breastRootBottomAngle',
    'interBreastsRoots',
  ],
  options: {
    interBreastsRootsShift: { pct: 100, min: 95, max: 105, menu: 'fit' },
  },
  draft: ({ part, Path, paths, Point, points, options, measurements, utils, macro }) => {
    /**
     *  The point of this part is to be able to replicate the underwire of a bra on freesewing
     *  to be later used to shape the cups
     */

    points.rootsMiddle = new Point((measurements.underbust / 4) * options.interBreastsRootsShift, 0)

    // Construct the left underwire
    points.wireLRight = new Point(points.rootsMiddle.x - measurements.interBreastsRoots / 2, 0)
    points.wireLLeft = points.wireLRight.shift(
      -measurements.breastRootAngle + 180,
      measurements.breastRootWidth
    )
    points.wireLMiddle = points.wireLRight
      .shiftFractionTowards(points.wireLLeft, 0.5)
      .shift(-measurements.breastRootAngle - 90, measurements.breastRootDepth)

    // Calculate the y coordinates of each control points
    let cpYLeftFirstHalf = (measurements.breastRootFirstHalfDepth - 0.25) / 0.75
    let cpYLeftSecondHalf = (measurements.breastRootSecondHalfDepth - 0.25) / 0.75

    points.wireLRightCp1 = utils.beamsIntersect(
      points.wireLRight,
      points.wireLRight.shift(
        -measurements.breastRootAngle + 180 + measurements.breastRootLeftAngle,
        100
      ),
      points.wireLRight.shift(-measurements.breastRootAngle + 180 + 135, cpYLeftFirstHalf),
      points.wireLMiddle.shift(-measurements.breastRootAngle + 180 + 135, cpYLeftFirstHalf)
    )
    points.wireLMiddleCp2 = utils.beamsIntersect(
      points.wireLMiddle,
      points.wireLMiddle.shift(
        -measurements.breastRootAngle + 90 + (180 + measurements.breastRootBottomAngle),
        100
      ),
      points.wireLRight.shift(-measurements.breastRootAngle + 180 + 135, cpYLeftFirstHalf),
      points.wireLMiddle.shift(-measurements.breastRootAngle + 180 + 135, cpYLeftFirstHalf)
    )
    points.wireLMiddleCp1 = utils.beamsIntersect(
      points.wireLMiddle,
      points.wireLMiddle.shift(
        -measurements.breastRootAngle + 90 + measurements.breastRootBottomAngle,
        100
      ),
      points.wireLLeft.shift(-measurements.breastRootAngle + 180 + 45, cpYLeftSecondHalf),
      points.wireLMiddle.shift(-measurements.breastRootAngle + 180 + 45, cpYLeftSecondHalf)
    )
    points.wireLLeftCp2 = utils.beamsIntersect(
      points.wireLLeft,
      points.wireLLeft.shift(
        -measurements.breastRootAngle + 180 + measurements.breastRootRightAngle,
        100
      ),
      points.wireLLeft.shift(-measurements.breastRootAngle + 180 + 45, cpYLeftSecondHalf),
      points.wireLMiddle.shift(-measurements.breastRootAngle + 180 + 45, cpYLeftSecondHalf)
    )

    // Mark the bottom of the wire with a point
    points.wireLBottom = utils.curveIntersectsX(
      points.wireLRight,
      points.wireLRightCp1,
      points.wireLMiddleCp2,
      points.wireLMiddle,
      points.wireLRight.shift(180 - measurements.breastRootAngle, measurements.breastRootWidth / 2)
        .x
    )

    // Construct the right underwire
    points.wireRLeft = new Point(points.rootsMiddle.x + measurements.interBreastsRoots / 2, 0)
    points.wireRRight = points.wireRLeft.shift(
      measurements.breastRootAngle,
      measurements.breastRootWidth
    )
    points.wireRMiddle = points.wireRLeft
      .shiftFractionTowards(points.wireRRight, 0.5)
      .shift(measurements.breastRootAngle - 90, measurements.breastRootDepth)

    // Calculate the y coordinates of each control points
    let cpYRightFirstHalf = (measurements.breastRootFirstHalfDepth - 0.25) / 0.75
    let cpYRightSecondHalf = (measurements.breastRootSecondHalfDepth - 0.25) / 0.75

    points.wireRLeftCp1 = utils.beamsIntersect(
      points.wireRLeft,
      points.wireRLeft.shift(measurements.breastRootLeftAngle - measurements.breastRootAngle, 100),
      points.wireRLeft.shift(measurements.breastRootAngle - 135, cpYRightFirstHalf),
      points.wireRMiddle.shift(measurements.breastRootAngle - 135, cpYRightFirstHalf)
    )
    points.wireRMiddleCp2 = utils.beamsIntersect(
      points.wireRMiddle,
      points.wireRMiddle.shift(
        measurements.breastRootAngle + 90 + (180 - measurements.breastRootBottomAngle),
        100
      ),
      points.wireRLeft.shift(measurements.breastRootAngle - 135, cpYRightFirstHalf),
      points.wireRMiddle.shift(measurements.breastRootAngle - 135, cpYRightFirstHalf)
    )
    points.wireRMiddleCp1 = utils.beamsIntersect(
      points.wireRMiddle,
      points.wireRMiddle.shift(
        measurements.breastRootAngle + 90 - measurements.breastRootBottomAngle,
        100
      ),
      points.wireRRight.shift(measurements.breastRootAngle - 45, cpYRightSecondHalf),
      points.wireRMiddle.shift(measurements.breastRootAngle - 45, cpYRightSecondHalf)
    )
    points.wireRRightCp2 = utils.beamsIntersect(
      points.wireRRight,
      points.wireRRight.shift(
        measurements.breastRootAngle - measurements.breastRootRightAngle,
        100
      ),
      points.wireRRight.shift(measurements.breastRootAngle - 45, cpYRightSecondHalf),
      points.wireRMiddle.shift(measurements.breastRootAngle - 45, cpYRightSecondHalf)
    )

    // Mark the bottom of the wire with a point
    points.wireRBottom = utils.curveIntersectsX(
      points.wireRLeft,
      points.wireRLeftCp1,
      points.wireRMiddleCp2,
      points.wireRMiddle,
      points.wireRLeft.shift(measurements.breastRootAngle, measurements.breastRootWidth / 2).x
    )

    paths.underwireLeft = new Path()
      .move(points.wireLRight)
      .curve(points.wireLRightCp1, points.wireLMiddleCp2, points.wireLMiddle)
      .curve(points.wireLMiddleCp1, points.wireLLeftCp2, points.wireLLeft)
      .addClass('fabric')
      .reverse()

    paths.underwireRight = new Path()
      .move(points.wireRLeft)
      .curve(points.wireRLeftCp1, points.wireRMiddleCp2, points.wireRMiddle)
      .curve(points.wireRMiddleCp1, points.wireRRightCp2, points.wireRRight)
      .addClass('fabric')

    macro('pd', {
      id: 'lengthUnderwireLeft',
      path: paths.underwireLeft,
      d: 15,
      force: true,
    })
    macro('pd', {
      id: 'lengthUnderwireRight',
      path: paths.underwireRight,
      d: 15,
      force: true,
    })

    return part
  },
}
