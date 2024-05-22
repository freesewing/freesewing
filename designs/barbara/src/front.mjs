export const front = {
  name: 'barbara.front',
  measurements: [
    'underbust',
    'hpsToBust',
    'bustPointToUnderbust',
    'highBustFront',
    'bustFront',
    'bustSpan',
    'shoulderToShoulder',
    'shoulderSlope',
    'neck',
    'waistToArmpit',
    'waistToUnderbust',
  ],
  options: {
    // Static
    highBustFrontFactor: 0.5,
    // Fit
    underbustEase: { pct: 10, min: 0, max: 20, menu: 'fit' },
    // Style
    armSideBend: { pct: 50, min: 0, max: 100, menu: 'style' },
    armSideDrop: { pct: 50, min: 0, max: 100, menu: 'style' },
    wingHeight: { pct: 80, min: 0, max: 100, menu: 'style' },
    necklineDrop: { pct: 25, min: 0, max: 75, menu: 'style' },
    necklineBend: { pct: 100, min: 0, max: 100, menu: 'style' },
    strapArmAngle: { pct: 100, min: 0, max: 100, menu: 'style' },
    strapNecklineAngle: { pct: 0, min: 0, max: 100, menu: 'style' },
    shoulderStrapPlacement: { pct: 30, min: 10, max: 85, menu: 'style' },
    shoulderStrapWidth: { pct: 14, min: 0, max: 50, menu: 'style' },
    strapHeight: { pct: 0, min: 0, max: 100, menu: 'style' },
    dartLength: { pct: 0, min: 0, max: 45, menu: 'style' },
    withDart: { bool: false, menu: 'advanced' },
  },
  draft: ({ part, Path, Point, paths, points, options, measurements, macro, utils, store }) => {
    // Construct the bottom of the front
    points.wingBottom = new Point(0, 0)
    points.middleBottom = points.wingBottom.shift(0, measurements.underbust / 4)
    points.middleTop = points.middleBottom.shift(
      90,
      (measurements.bustPointToUnderbust + measurements.hpsToBust) * options.necklineDrop
    )
    points.armpit = new Point(
      points.middleBottom.x - measurements.highBustFront * options.highBustFrontFactor,
      points.wingBottom.y - (measurements.waistToArmpit - measurements.waistToUnderbust)
    )
    points.wingTop = points.wingBottom.shiftFractionTowards(points.armpit, options.wingHeight)

    // Construct the shoudler strap from the edge of the neck
    points.neckLeft = points.middleBottom.translate(
      -(measurements.neck / (2 * 3.14)),
      -(measurements.bustPointToUnderbust + measurements.hpsToBust)
    )
    points.strapRightBase = points.neckLeft.shift(
      180 + measurements.shoulderSlope,
      (measurements.shoulderToShoulder / 2 -
        points.neckLeft.dx(points.middleBottom) -
        (measurements.shoulderToShoulder / 2 - points.neckLeft.dx(points.middleBottom)) *
          options.shoulderStrapWidth) *
        options.shoulderStrapPlacement
    )
    points.strapRight = points.strapRightBase.shift(
      -90,
      points.strapRightBase.dy(points.middleTop) * options.strapHeight
    )
    points.strapLeft = points.strapRight.shift(
      180 + measurements.shoulderSlope,
      (measurements.shoulderToShoulder / 2 - points.neckLeft.dx(points.middleBottom)) *
        options.shoulderStrapWidth
    )
    points.strapLeftAlt = points.strapRight.shift(
      180,
      (measurements.shoulderToShoulder / 2 - points.neckLeft.dx(points.middleBottom)) *
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

    // Construct the arm curve
    points.armCorner = utils.beamsIntersect(
      points.strapLeft,
      points.strapRight.rotate(
        -90 - measurements.shoulderSlope * options.strapArmAngle,
        points.strapLeft
      ),
      points.wingTop,
      points.wingTop.shift(45 * options.armSideDrop, 100)
    )
    points.strapLeftCp1 = points.strapLeft.shiftFractionTowards(
      points.armCorner,
      options.armSideBend
    )
    points.wingTopCp2 = points.wingTop.shiftFractionTowards(points.armCorner, options.armSideBend)

    // Pinpoint the apex
    points.apex = new Point(
      points.middleBottom.x - measurements.bustSpan / 2,
      points.neckLeft.y + measurements.hpsToBust
    )

    // Construct the underbust dart
    let dartAngle =
      (45 *
        (4 * measurements.bustPointToUnderbust -
          (2 * measurements.bustFront - measurements.underbust))) /
      measurements.bustPointToUnderbust

    points.dartTop = points.apex.shift(-90, points.apex.dy(points.wingBottom) * options.dartLength)

    points.dartLeft = utils.beamsIntersect(
      points.apex,
      points.apex.shift(-90 - dartAngle / 2, 100),
      points.wingBottom,
      points.middleBottom
    )
    points.dartRight = utils.beamsIntersect(
      points.apex,
      points.apex.shift(-90 + dartAngle / 2, 100),
      points.wingBottom,
      points.middleBottom
    )

    paths.strapOnChest = new Path()
      .move(points.wingBottom)
      .line(points.middleBottom)
      .line(points.middleTop)
      .curve(points.middleTopCp1, points.strapRightCp2, points.strapRight)
      .line(points.strapLeftAlt)
      .curve(points.strapLeftCp1, points.wingTopCp2, points.wingTop)
      .close()

    paths.strapOnChestWithDart = new Path()
      .move(points.wingBottom)
      .line(points.dartLeft)
      .line(points.dartTop)
      .line(points.dartRight)
      .line(points.middleBottom)
      .line(points.middleTop)
      .curve(points.middleTopCp1, points.strapRightCp2, points.strapRight)
      .line(points.strapLeftAlt)
      .curve(points.strapLeftCp1, points.wingTopCp2, points.wingTop)
      .close()

    paths.strapToShoulder = new Path()
      .move(points.wingBottom)
      .line(points.middleBottom)
      .line(points.middleTop)
      .curve(points.middleTopCp1, points.strapRightCp2, points.strapRight)
      .line(points.strapLeft)
      .curve(points.strapLeftCp1, points.wingTopCp2, points.wingTop)
      .close()

    paths.strapToShoulderWithDart = new Path()
      .move(points.wingBottom)
      .line(points.dartLeft)
      .line(points.dartTop)
      .line(points.dartRight)
      .line(points.middleBottom)
      .line(points.middleTop)
      .curve(points.middleTopCp1, points.strapRightCp2, points.strapRight)
      .line(points.strapLeft)
      .curve(points.strapLeftCp1, points.wingTopCp2, points.wingTop)
      .close()

    if (options.strapHeight != 0) {
      paths.strapToShoulder.hide()
      paths.strapToShoulderWithDart.hide()
    } else {
      paths.strapOnChest.hide()
      paths.strapOnChestWithDart.hide()
    }

    if (options.withDart) {
      paths.strapToShoulder.hide()
      paths.strapOnChest.hide()
    } else {
      paths.strapToShoulderWithDart.hide()
      paths.strapOnChestWithDart.hide()
    }

    // Store data
    store.set('front.wingTopAngle', points.wingBottom.angle(points.wingTop))
    store.set('front.wingTopDist', points.wingBottom.dist(points.wingTop))

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
    macro('hd', {
      id: 'wMiddleToStrap',
      from: points.strapRight,
      to: points.middleBottom,
      y: points.strapRight.y - 15,
    })
    macro('ld', {
      id: 'hWing',
      from: points.wingBottom,
      to: points.wingTop,
      d: 15,
    })
    if (options.strapHeight != 0) {
      macro('hd', {
        id: 'wStrapToWing',
        from: points.wingTop,
        to: points.strapLeftAlt,
        y: points.strapRight.y - 15,
      })
      macro('ld', {
        id: 'wStrap',
        from: points.strapLeftAlt,
        to: points.strapRight,
        noEndMarker: true,
        noStartMarker: true,
        d: 15,
      })
    } else {
      macro('hd', {
        id: 'wStrapToWing',
        from: points.wingTop,
        to: points.strapLeft,
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
    }

    return part
  },
}
