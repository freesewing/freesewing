export const back = {
  name: 'barbara.back',
  measurements: ['underbust', 'hpsToWaistBack', 'shoulderSlope'],
  options: {
    // Style
    backStyle: { dflt: 'crossedStraps', list: ['crossedStraps', 'parallelStraps'], menu: 'style' },
    bandHeight: { pct: 15, min: 0, max: 95, menu: 'style' },
    crossedStrapsBandWidth: { pct: 70, min: 50, max: 90, menu: 'style.crossedStrapsVariant' },
    crossedCurveBend: { pct: 75, min: 0, max: 100, menu: 'style.crossedStrapsVariant' },
    crossedCurveStart: { pct: 95, min: 0.1, max: 100, menu: 'style.crossedStrapsVariant' },
  },
  draft: ({ part, Path, Point, paths, points, options, measurements, macro, utils, store }) => {
    // Construct the bottom of the back
    points.bandLeftBottom = new Point(0, 0)
    points.bandMiddleBottom = points.bandLeftBottom.shift(0, measurements.underbust / 4)
    points.bandMiddleTop = points.bandMiddleBottom.shift(
      90,
      measurements.hpsToWaistBack * options.bandHeight
    )
    points.bandLeftTop = points.bandLeftBottom.shift(
      store.get('front.wingTopAngle'),
      store.get('front.wingTopDist')
    )

    // Place the sides of the neck
    points.neckLeftBack = points.bandMiddleBottom.translate(
      -store.get('neckRadius'),
      -measurements.hpsToWaistBack
    )
    points.neckRightBack = points.neckLeftBack.shift(0, store.get('neckRadius') * 2)

    // Construct the crossed straps variant
    points.crossedMiddleBottom = points.bandLeftBottom.shift(
      0,
      (measurements.underbust / 4) * options.crossedStrapsBandWidth
    )
    points.crossedStrapLeft = points.neckRightBack.shift(
      -measurements.shoulderSlope,
      store.get('front.neckLeftStrapRightBase.dist')
    )
    points.crossedStrapRight = points.crossedStrapLeft.shift(
      -measurements.shoulderSlope,
      store.get('front.strapRightStrapLeft.dist')
    )
    points.crossedStrapBottomBase = utils.beamIntersectsY(
      points.crossedStrapLeft,
      points.crossedStrapLeft.shift(
        points.crossedStrapRight.angle(points.crossedMiddleBottom),
        100
      ),
      points.bandLeftTop.y
    )
    points.crossedStrapBottom = points.crossedStrapLeft.shiftFractionTowards(
      points.crossedStrapBottomBase,
      options.crossedCurveStart
    )
    // Construct the curve of the crossed straps variant
    points.crossedCurveCorner = utils.beamsIntersect(
      points.bandLeftTop,
      points.bandLeftTop.shift(-store.get('front.wingTopArmCorner.angle'), 100),
      points.crossedStrapLeft,
      points.crossedStrapBottom
    )
    points.crossedStrapBottomCp1 = points.crossedStrapBottom.shiftFractionTowards(
      points.crossedCurveCorner,
      options.crossedCurveBend
    )
    points.crossedBandLeftTopCp2 = points.bandLeftTop.shiftFractionTowards(
      points.crossedCurveCorner,
      options.crossedCurveBend
    )

    paths.test = new Path()
      .move(points.bandLeftBottom)
      .line(points.bandMiddleBottom)
      .line(points.bandMiddleTop)
      .line(points.bandLeftTop)
      .close(points.bandLeftBottom)
      .hide()

    paths.crossedStraps = new Path()
      .move(points.bandLeftBottom)
      .line(points.crossedMiddleBottom)
      .line(points.crossedStrapRight)
      .line(points.crossedStrapLeft)
      .line(points.crossedStrapBottom)
      .curve(points.crossedStrapBottomCp1, points.crossedBandLeftTopCp2, points.bandLeftTop)
      .close(points.bandLeftBottom)
      .setHidden(options.backStyle != 'crossedStraps')

    // Paperless support
    if (options.backStyle == 'crossedStraps') {
      macro('vd', {
        id: 'hUnderbustToStrap',
        from: points.crossedMiddleBottom,
        to: points.crossedStrapRight,
        x: points.crossedStrapRight.x + 15,
      })
      macro('vd', {
        id: 'hStrapTop',
        from: points.crossedStrapBottom,
        to: points.crossedStrapLeft,
        x: points.crossedStrapBottom.x - 15,
      })
      macro('hd', {
        id: 'wStrapTop',
        from: points.crossedStrapBottom,
        to: points.crossedStrapLeft,
        y: points.crossedStrapLeft.y - 15,
      })
      macro('hd', {
        id: 'wBand',
        from: points.bandLeftBottom,
        to: points.crossedMiddleBottom,
        y: points.bandLeftBottom.y + 15,
      })
      macro('hd', {
        id: 'wStrapBottom',
        from: points.crossedMiddleBottom,
        to: points.crossedStrapRight,
        y: points.crossedMiddleBottom.y + 15,
      })
    }

    macro('ld', {
      id: 'lWing',
      from: points.bandLeftBottom,
      to: points.bandLeftTop,
      d: 15,
    })

    return part
  },
}
