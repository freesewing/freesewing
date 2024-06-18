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

    points.wireLLeft = new Point(points.rootsMiddle.x - measurements.interBreastsRoots / 2, 0)
    points.wireLRight = points.wireLLeft.shift(
      -measurements.breastRootAngle + 180,
      measurements.breastRootWidth
    )
    points.wireLMiddle = points.wireLLeft
      .shiftFractionTowards(points.wireLRight, 0.5)
      .shift(-measurements.breastRootAngle - 90, measurements.breastRootDepth)
    let cpYFirstHalf = (measurements.breastRootFirstHalfDepth - 0.25) / 0.75
    let cpYSecondHalf = (measurements.breastRootSecondHalfDepth - 0.25) / 0.75
    points.wireLLeftCp1 = utils.beamsIntersect(
      points.wireLLeft,
      points.wireLLeft.shift(
        -measurements.breastRootAngle + 180 + measurements.breastRootLeftAngle,
        100
      ),
      points.wireLLeft.shift(-measurements.breastRootAngle + 180 + 135, cpYFirstHalf),
      points.wireLMiddle.shift(-measurements.breastRootAngle + 180 + 135, cpYFirstHalf)
    )
    points.wireLMiddleCp2 = utils.beamsIntersect(
      points.wireLMiddle,
      points.wireLMiddle.shift(
        -measurements.breastRootAngle + 90 + (180 + measurements.breastRootBottomAngle),
        100
      ),
      points.wireLLeft.shift(-measurements.breastRootAngle + 180 + 135, cpYFirstHalf),
      points.wireLMiddle.shift(-measurements.breastRootAngle + 180 + 135, cpYFirstHalf)
    )
    points.wireLMiddleCp1 = utils.beamsIntersect(
      points.wireLMiddle,
      points.wireLMiddle.shift(
        -measurements.breastRootAngle + 90 + measurements.breastRootBottomAngle,
        100
      ),
      points.wireLRight.shift(-measurements.breastRootAngle + 180 + 45, cpYSecondHalf),
      points.wireLMiddle.shift(-measurements.breastRootAngle + 180 + 45, cpYSecondHalf)
    )
    points.wireLRightCp2 = utils.beamsIntersect(
      points.wireLRight,
      points.wireLRight.shift(
        -measurements.breastRootAngle + 180 + measurements.breastRootRightAngle,
        100
      ),
      points.wireLRight.shift(-measurements.breastRootAngle + 180 + 45, cpYSecondHalf),
      points.wireLMiddle.shift(-measurements.breastRootAngle + 180 + 45, cpYSecondHalf)
    )

    // Mark the bottom of the wire with a point
    points.wireLBottom = utils.curveIntersectsX(
      points.wireLLeft,
      points.wireLLeftCp1,
      points.wireLMiddleCp2,
      points.wireLMiddle,
      points.wireLLeft.shift(180 - measurements.breastRootAngle, measurements.breastRootWidth / 2).x
    )

    paths.underwire = new Path()
      .move(points.wireLLeft)
      .curve(points.wireLLeftCp1, points.wireLMiddleCp2, points.wireLMiddle)
      .curve(points.wireLMiddleCp1, points.wireLRightCp2, points.wireLRight)
      .addClass('fabric')
      .reverse()

    macro('pd', {
      path: paths.underwire,
      d: 15,
      force: true,
    })
    //macro('ld', {
    //    id: 'lcp1',
    //    from: points.left,
    //    to: points.cp1,
    //    d: 0
    //})
    //macro('ld', {
    //    id: 'lcp2',
    //    from: points.right,
    //    to: points.cp2,
    //    d: 0
    //})

    return part
  },
}
