export const front = {
  name: 'barbara.front',
  measurements: [
    'underbust',
    'hpsToBust',
    'bustPointToUnderbust',
    'highBustFront',
    'shoulderToShoulder',
    'shoulderSlope',
    'neck',
    'waistToArmpit',
    'waistToUnderbust',
  ],
  options: {
    // Static
    underbustFactor: 0.25,
    highBustFrontFactor: 0.5,
    // Fit
    underbustEase: { pct: 10, min: 0, max: 20, menu: 'fit' },
    wingHeight: { pct: 80, min: 10, max: 100, menu: 'fit' },
    // Style
    necklineDrop: { pct: 25, min: 0, max: 75, menu: 'style' },
    necklineBend: { pct: 100, min: 0, max: 100, menu: 'style' },
    strapNecklineAngle: { pct: 0, min: 0, max: 100, menu: 'style' },
    shoulderStrapPlacement: { pct: 30, min: 5, max: 90, menu: 'style' },
    shoulderStrapWidth: { pct: 14, min: 10, max: 20, menu: 'style' },
  },
  draft: ({ part, Path, Point, paths, points, options, measurements, macro, utils }) => {
    // Construct the bottom of the front
    points.wingBottom = new Point(0, 0)
    //points.wingTop = points.wingBottom.shift(
    //  90,
    //  (measurements.waistToArmpit - measurements.waistToUnderbust) * options.wingHeight
    //)
    points.middleBottom = points.wingBottom.shift(
      0,
      measurements.underbust * options.underbustFactor
    )
    points.middleTop = points.middleBottom.shift(
      90,
      measurements.bustPointToUnderbust + measurements.hpsToBust * options.necklineDrop
    )
    points.armpit = new Point(
      points.middleBottom.x - measurements.highBustFront * options.highBustFrontFactor,
      points.wingBottom.y - (measurements.waistToArmpit - measurements.waistToUnderbust) //* options.wingHeight
    )
    points.wingTop = points.wingBottom.shiftFractionTowards(points.armpit, options.wingHeight)
    // Construct the shoudler strap from the edge of the neck
    points.neckLeft = points.middleBottom.translate(
      -(measurements.neck / (2 * 3.14)),
      -(measurements.bustPointToUnderbust + measurements.hpsToBust)
    )
    points.strapRight = points.neckLeft.shift(
      180 + measurements.shoulderSlope,
      (measurements.shoulderToShoulder / 2 - points.neckLeft.dx(points.middleBottom)) *
        options.shoulderStrapPlacement
    )
    points.strapLeft = points.strapRight.shiftTowards(
      points.neckLeft,
      -(measurements.shoulderToShoulder / 2 - points.neckLeft.dx(points.middleBottom)) *
        options.shoulderStrapWidth
    )
    // Construct the chest curve
    points.necklineCorner = utils.beamsIntersect(
      points.strapRight,
      points.strapLeft.rotate(
        90 - measurements.shoulderSlope * options.strapNecklineAngle,
        points.strapRight
      ),
      points.middleTop,
      points.middleBottom.rotate(-90, points.middleTop)
    )
    points.middleTopCp1 = points.middleTop.shiftFractionTowards(
      points.necklineCorner,
      options.necklineBend
    )
    points.strapRightCp2 = points.strapRight.shiftFractionTowards(
      points.necklineCorner,
      options.necklineBend
    )

    paths.test = new Path()
      .move(points.wingBottom)
      .line(points.middleBottom)
      .line(points.middleTop)
      .curve(points.middleTopCp1, points.strapRightCp2, points.strapRight)
      .line(points.strapLeft)
      .line(points.wingTop)
      .close()

    // Paperless support
    macro('vd', {
      id: 'hUnderbustToStrap',
      from: points.middleBottom,
      to: points.strapRight,
      x: points.middleBottom.x + 30,
    })
    macro('vd', {
      id: 'hMiddle',
      from: points.middleBottom,
      to: points.middleTop,
      x: points.middleBottom.x + 15,
    })
    macro('vd', {
      id: 'hWing',
      from: points.wingBottom,
      to: points.wingTop,
      x: points.wingBottom.x - 15,
    })
    macro('hd', {
      id: 'wMiddleToStrap',
      from: points.strapRight,
      to: points.middleBottom,
      y: points.strapRight.y - 15,
    })
    macro('ld', {
      id: 'wStrap',
      from: points.strapLeft,
      to: points.strapRight,
      noEndMarker: true,
      noStartMarker: true,
      d: 15,
    })

    return part
  },
}
