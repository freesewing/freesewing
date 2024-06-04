export const wire = {
  name: 'barbara.wire',
  measurements: [
    'breastRootWidth',
    'breastRootDepth',
    'breastRootFirstHalfDepth',
    'breastRootSecondHalfDepth',
  ],
  options: {},
  draft: ({ part, Path, paths, Point, points, options, measurements, utils, macro }) => {
    /**
     *  The point of this part is to be able to replicate the underwire of a bra on freesewing
     *  to be later used to shape the cups
     */

    let phiAngle = 9.5

    points.left = new Point(0, 0)
    points.right = points.left.shift(phiAngle, measurements.breastRootWidth)
    points.middle = points.left
      .shiftFractionTowards(points.right, 0.5)
      .shift(phiAngle - 90, measurements.breastRootDepth)

    // Calculate the y coordinates of each control points
    //let cpYDepth = (measurements.breastRootDepth - 0.25) / 0.75
    let cpYFirstHalf = (measurements.breastRootFirstHalfDepth - 0.25) / 0.75
    let cpYSecondHalf = (measurements.breastRootSecondHalfDepth - 0.25) / 0.75
    let alphaAngle = 99
    let betaAngle = 100
    let epsilonAngle = 95

    points.leftCp1 = utils.beamsIntersect(
      points.left,
      points.left.shift(phiAngle - alphaAngle, 100),
      points.left.shift(phiAngle - 135, cpYFirstHalf),
      points.middle.shift(phiAngle - 135, cpYFirstHalf)
    )
    points.middleCp2 = utils.beamsIntersect(
      points.middle,
      points.middle.shift(phiAngle + 90 + (180 - epsilonAngle), 100),
      points.left.shift(phiAngle - 135, cpYFirstHalf),
      points.middle.shift(phiAngle - 135, cpYFirstHalf)
    )
    points.middleCp1 = utils.beamsIntersect(
      points.middle,
      points.middle.shift(phiAngle + 90 - epsilonAngle, 100),
      points.right.shift(phiAngle - 45, cpYSecondHalf),
      points.middle.shift(phiAngle - 45, cpYSecondHalf)
    )
    points.rightCp2 = utils.beamsIntersect(
      points.right,
      points.right.shift(phiAngle - betaAngle, 100),
      points.right.shift(phiAngle - 45, cpYSecondHalf),
      points.middle.shift(phiAngle - 45, cpYSecondHalf)
    )

    paths.underwire = new Path()
      .move(points.left)
      .curve(points.leftCp1, points.middleCp2, points.middle)
      .curve(points.middleCp1, points.rightCp2, points.right)

    //points.cp1 = utils.beamsIntersect(
    //    points.left,
    //    points.left.shift( phiAngle - alphaAngle, 100 ),
    //    points.left.shift( phiAngle - 90, cpYDepth),
    //    points.right.shift( phiAngle - 90, cpYDepth)
    //)
    //points.cp2 = utils.beamsIntersect(
    //    points.right,
    //    points.right.shift( phiAngle - betaAngle, 100),
    //    points.left.shift( phiAngle - 90, cpYDepth),
    //    points.right.shift( phiAngle - 90, cpYDepth)
    //)
    //
    //paths.underwire = new Path()
    //    .move(points.left)
    //    .curve(points.cp1, points.cp2, points.right)

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
