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
    parallelCurveBend: { pct: 50, min: 0, max: 100, menu: 'style.parallelStrapsVariant' },
    parallelBandWidth: { pct: 100, min: 0, max: 100, menu: 'style.parallelStrapsVariant' },
  },
  draft: ({
    part,
    Path,
    Point,
    paths,
    points,
    options,
    measurements,
    macro,
    utils,
    store,
    Snippet,
    snippets,
  }) => {
    // Construct the bottom of the back
    points.bandLeftBottom = new Point(0, 0)
    points.bandMiddleBottom = points.bandLeftBottom.shift(
      0,
      (measurements.underbust / 4) * options.parallelBandWidth
    )
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
    points.crossedCurveCp1 = points.crossedStrapBottom.shiftFractionTowards(
      points.crossedCurveCorner,
      options.crossedCurveBend
    )
    points.crossedCurveCp2 = points.bandLeftTop.shiftFractionTowards(
      points.crossedCurveCorner,
      options.crossedCurveBend
    )

    // Construct the parallel straps variant
    points.parallelStrapRight = points.neckLeftBack.shift(
      180 + measurements.shoulderSlope,
      store.get('front.neckLeftStrapRightBase.dist')
    )
    points.parallelStrapLeft = points.neckLeftBack.shiftOutwards(
      points.parallelStrapRight,
      store.get('front.strapRightStrapLeft.dist')
    )
    points.parallelCurveCorner = utils.beamsIntersect(
      points.bandLeftTop,
      points.bandLeftTop.shift(-store.get('front.wingTopArmCorner.angle'), 100),
      points.bandMiddleTop,
      points.bandMiddleTop.shift(0, 100)
    )
    points.parallelCurveCp1 = points.bandMiddleTop.shiftFractionTowards(
      points.parallelCurveCorner,
      options.parallelCurveBend
    )
    points.parallelCurveCp2 = points.bandLeftTop.shiftFractionTowards(
      points.parallelCurveCorner,
      options.parallelCurveBend
    )
    // Put a notch were the right and left edge of the strap should be sewn
    if (options.backStyle == 'parallelStraps') {
      snippets.backStrapRight = new Snippet(
        'notch',
        utils.beamIntersectsCurve(
          points.parallelStrapRight,
          points.parallelStrapRight.shift(-90, 100),
          points.bandMiddleTop,
          points.parallelCurveCp1,
          points.parallelCurveCp2,
          points.bandLeftTop
        )
      )
      snippets.backStrapLeft = new Snippet(
        'notch',
        utils.beamIntersectsCurve(
          points.parallelStrapLeft,
          points.parallelStrapLeft.shift(-90, 100),
          points.bandMiddleTop,
          points.parallelCurveCp1,
          points.parallelCurveCp2,
          points.bandLeftTop
        )
      )
    }

    paths.parallelStraps = new Path()
      .move(points.bandLeftBottom)
      .line(points.bandMiddleBottom)
      .line(points.bandMiddleTop)
      .curve(points.parallelCurveCp1, points.parallelCurveCp2, points.bandLeftTop)
      .close(points.bandLeftBottom)
      .setHidden(options.backStyle != 'parallelStraps')

    paths.crossedStraps = new Path()
      .move(points.bandLeftBottom)
      .line(points.crossedMiddleBottom)
      .line(points.crossedStrapRight)
      .line(points.crossedStrapLeft)
      .line(points.crossedStrapBottom)
      .curve(points.crossedCurveCp1, points.crossedCurveCp2, points.bandLeftTop)
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

    if (options.backStyle == 'parallelStraps') {
      macro('hd', {
        id: 'wParallelBand',
        from: points.bandLeftBottom,
        to: points.bandMiddleBottom,
        y: points.bandMiddleBottom.y + 15,
      })
      macro('vd', {
        id: 'hParallelBand',
        from: points.bandMiddleBottom,
        to: points.bandMiddleTop,
        x: points.bandMiddleBottom.x + 15,
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
