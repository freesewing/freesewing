export const wire = {
  name: 'barbara.wire',
  measurements: [
    'underbust',
    'leftBreastRootWidth',
    'leftBreastRootDepth',
    'leftBreastRootFirstHalfDepth',
    'leftBreastRootSecondHalfDepth',
    'leftBreastRootAngle',
    'leftBreastRootLeftAngle',
    'leftBreastRootRightAngle',
    'leftBreastRootBottomAngle',
    'rightBreastRootWidth',
    'rightBreastRootDepth',
    'rightBreastRootFirstHalfDepth',
    'rightBreastRootSecondHalfDepth',
    'rightBreastRootAngle',
    'rightBreastRootLeftAngle',
    'rightBreastRootRightAngle',
    'rightBreastRootBottomAngle',
    'interBreastsRoots',
  ],
  options: {
    interBreastsRootsShift: { pct: 100, min: 95, max: 105, menu: 'fit' },
    showBreastsRoots: { bool: true, menu: 'Advanced' },
  },
  draft: ({ part, Path, paths, Point, points, options, measurements, utils, macro, store }) => {
    /**
     *  The point of this part is to be able to replicate the underwire of a bra on freesewing
     *  to be later used to shape the cups
     */

    points.rootsMiddle = new Point((measurements.underbust / 4) * options.interBreastsRootsShift, 0)

    // Construct the left underwire
    points.wireLRight = new Point(points.rootsMiddle.x - measurements.interBreastsRoots / 2, 0)
    points.wireLLeft = points.wireLRight.shift(
      -measurements.leftBreastRootAngle + 180,
      measurements.leftBreastRootWidth
    )
    points.wireLMiddle = points.wireLRight
      .shiftFractionTowards(points.wireLLeft, 0.5)
      .shift(-measurements.leftBreastRootAngle - 90, measurements.leftBreastRootDepth)

    // Calculate the y coordinates of each control points
    let cpYLeftFirstHalf = (measurements.leftBreastRootFirstHalfDepth - 0.25) / 0.75
    let cpYLeftSecondHalf = (measurements.leftBreastRootSecondHalfDepth - 0.25) / 0.75

    points.wireLRightCp1 = utils.beamsIntersect(
      points.wireLRight,
      points.wireLRight.shift(
        -measurements.leftBreastRootAngle + 180 + measurements.leftBreastRootLeftAngle,
        100
      ),
      points.wireLRight.shift(-measurements.leftBreastRootAngle + 180 + 135, cpYLeftFirstHalf),
      points.wireLMiddle.shift(-measurements.leftBreastRootAngle + 180 + 135, cpYLeftFirstHalf)
    )
    points.wireLMiddleCp2 = utils.beamsIntersect(
      points.wireLMiddle,
      points.wireLMiddle.shift(
        -measurements.leftBreastRootAngle + 90 + (180 + measurements.leftBreastRootBottomAngle),
        100
      ),
      points.wireLRight.shift(-measurements.leftBreastRootAngle + 180 + 135, cpYLeftFirstHalf),
      points.wireLMiddle.shift(-measurements.leftBreastRootAngle + 180 + 135, cpYLeftFirstHalf)
    )
    points.wireLMiddleCp1 = utils.beamsIntersect(
      points.wireLMiddle,
      points.wireLMiddle.shift(
        -measurements.leftBreastRootAngle + 90 + measurements.leftBreastRootBottomAngle,
        100
      ),
      points.wireLLeft.shift(-measurements.leftBreastRootAngle + 180 + 45, cpYLeftSecondHalf),
      points.wireLMiddle.shift(-measurements.leftBreastRootAngle + 180 + 45, cpYLeftSecondHalf)
    )
    points.wireLLeftCp2 = utils.beamsIntersect(
      points.wireLLeft,
      points.wireLLeft.shift(
        -measurements.leftBreastRootAngle + 180 + measurements.leftBreastRootRightAngle,
        100
      ),
      points.wireLLeft.shift(-measurements.leftBreastRootAngle + 180 + 45, cpYLeftSecondHalf),
      points.wireLMiddle.shift(-measurements.leftBreastRootAngle + 180 + 45, cpYLeftSecondHalf)
    )

    // Mark the bottom of the wire with a point
    points.wireLBottom = utils.curveIntersectsX(
      points.wireLRight,
      points.wireLRightCp1,
      points.wireLMiddleCp2,
      points.wireLMiddle,
      points.wireLRight.shift(
        180 - measurements.leftBreastRootAngle,
        measurements.leftBreastRootWidth / 2
      ).x
    )

    // Construct the right underwire
    points.wireRLeft = new Point(points.rootsMiddle.x + measurements.interBreastsRoots / 2, 0)
    points.wireRRight = points.wireRLeft.shift(
      measurements.rightBreastRootAngle,
      measurements.rightBreastRootWidth
    )
    points.wireRMiddle = points.wireRLeft
      .shiftFractionTowards(points.wireRRight, 0.5)
      .shift(measurements.rightBreastRootAngle - 90, measurements.rightBreastRootDepth)

    // Calculate the y coordinates of each control points
    let cpYRightFirstHalf = (measurements.rightBreastRootFirstHalfDepth - 0.25) / 0.75
    let cpYRightSecondHalf = (measurements.rightBreastRootSecondHalfDepth - 0.25) / 0.75

    points.wireRLeftCp1 = utils.beamsIntersect(
      points.wireRLeft,
      points.wireRLeft.shift(
        measurements.rightBreastRootAngle - measurements.rightBreastRootLeftAngle,
        100
      ),
      points.wireRLeft.shift(measurements.rightBreastRootAngle - 135, cpYRightFirstHalf),
      points.wireRMiddle.shift(measurements.rightBreastRootAngle - 135, cpYRightFirstHalf)
    )
    points.wireRMiddleCp2 = utils.beamsIntersect(
      points.wireRMiddle,
      points.wireRMiddle.shift(
        measurements.rightBreastRootAngle + 90 + (180 - measurements.rightBreastRootBottomAngle),
        100
      ),
      points.wireRLeft.shift(measurements.rightBreastRootAngle - 135, cpYRightFirstHalf),
      points.wireRMiddle.shift(measurements.rightBreastRootAngle - 135, cpYRightFirstHalf)
    )
    points.wireRMiddleCp1 = utils.beamsIntersect(
      points.wireRMiddle,
      points.wireRMiddle.shift(
        measurements.rightBreastRootAngle + 90 - measurements.rightBreastRootBottomAngle,
        100
      ),
      points.wireRRight.shift(measurements.rightBreastRootAngle - 45, cpYRightSecondHalf),
      points.wireRMiddle.shift(measurements.rightBreastRootAngle - 45, cpYRightSecondHalf)
    )
    points.wireRRightCp2 = utils.beamsIntersect(
      points.wireRRight,
      points.wireRRight.shift(
        measurements.rightBreastRootAngle - measurements.rightBreastRootRightAngle,
        100
      ),
      points.wireRRight.shift(measurements.rightBreastRootAngle - 45, cpYRightSecondHalf),
      points.wireRMiddle.shift(measurements.rightBreastRootAngle - 45, cpYRightSecondHalf)
    )

    // Mark the bottom of the wire with a point
    points.wireRBottom = utils.curveIntersectsX(
      points.wireRLeft,
      points.wireRLeftCp1,
      points.wireRMiddleCp2,
      points.wireRMiddle,
      points.wireRLeft.shift(
        measurements.rightBreastRootAngle,
        measurements.rightBreastRootWidth / 2
      ).x
    )

    paths.underwireLeft = new Path()
      .move(points.wireLRight)
      .curve(points.wireLRightCp1, points.wireLMiddleCp2, points.wireLMiddle)
      .curve(points.wireLMiddleCp1, points.wireLLeftCp2, points.wireLLeft)
      .reverse()
      .addClass('fabric')

    paths.underwireRight = new Path()
      .move(points.wireRLeft)
      .curve(points.wireRLeftCp1, points.wireRMiddleCp2, points.wireRMiddle)
      .curve(points.wireRMiddleCp1, points.wireRRightCp2, points.wireRRight)
      .addClass('fabric')

    // Data storage
    store.set('wire.underwireLeft', paths.underwireLeft)
    store.set('wire.underwireRight', paths.underwireRight)
    store.set('wire.underwireLeftHeight', points.wireLBottom.dy(points.wireLRight))
    store.set('wire.underwireRightHeight', points.wireRBottom.dy(points.wireRLeft))
    store.set('wire.pointsLeft', [
      points.wireLRight,
      points.wireLRightCp1,
      points.wireLMiddleCp2,
      points.wireLMiddle,
      points.wireLMiddleCp1,
      points.wireLLeftCp2,
      points.wireLLeft,
      points.wireLBottom,
    ])
    store.set('wire.pointsRight', [
      points.wireRLeft,
      points.wireRLeftCp1,
      points.wireRMiddleCp2,
      points.wireRMiddle,
      points.wireRMiddleCp1,
      points.wireRRightCp2,
      points.wireRRight,
      points.wireRBottom,
    ])

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

    part.setHidden(!options.showBreastsRoots)
    return part
  },
}
