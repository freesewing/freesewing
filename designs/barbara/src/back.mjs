export const back = {
  name: 'barbara.back',
  measurements: ['underbust', 'hpsToWaistBack', 'shoulderSlope', 'waistToUnderbust'],
  options: {
    // Style
    backStyle: {
      dflt: 'parallelStraps',
      list: ['crossedStraps', 'parallelStraps'],
      menu: (_settings, mergedOptions) =>
        mergedOptions?.braType == 'wiredBra' || mergedOptions?.braType == 'wirelessBra'
          ? false
          : 'style',
    },
    bandHeight: { pct: 100, min: 0, max: 100, menu: 'style.parallelStrapsVariant' },
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
    if (store.get('braType') == 'wiredBra' || store.get('braType') == 'wirelessBra') {
      options.backStyle = 'parallelStraps'
    }

    // Construct the bottom of the back
    points.bandLeftBottomAnchor = new Point(0, 0)
    points.bandMiddleBottomAnchor = points.bandLeftBottomAnchor.shift(
      0,
      (measurements.underbust / 4) * options.parallelBandWidth
    )
    points.bandLeftBottom = points.bandLeftBottomAnchor.shift(
      -90,
      measurements.waistToUnderbust * options.bandDepth
    )
    points.bandMiddleBottom = points.bandMiddleBottomAnchor.shift(
      -90,
      measurements.waistToUnderbust * options.bandDepth
    )
    points.bandLeftTop = points.bandLeftBottomAnchor.shift(
      store.get('front.wingTopAngle'),
      store.get('front.wingTopDist')
    )
    points.bandMiddleTop = points.bandMiddleBottom.shift(
      90,
      points.bandLeftTop.dy(points.bandLeftBottom) * options.bandHeight
    )

    // Place the sides of the neck
    points.neckLeftBack = points.bandMiddleBottomAnchor.translate(
      -store.get('neckRadius'),
      -measurements.hpsToWaistBack
    )
    points.neckRightBack = points.neckLeftBack.shift(0, store.get('neckRadius') * 2)

    // Construct the crossed straps variant
    points.crossedMiddleBottom = points.bandLeftBottomAnchor.shift(
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
      .close()
      .setHidden(options.backStyle != 'parallelStraps')
      .addClass('fabric')

    paths.crossedStraps = new Path()
      .move(points.bandLeftBottomAnchor)
      .line(points.crossedMiddleBottom)
      .line(points.crossedStrapRight)
      .line(points.crossedStrapLeft)
      .line(points.crossedStrapBottom)
      .curve(points.crossedCurveCp1, points.crossedCurveCp2, points.bandLeftTop)
      .close(points.bandLeftBottomAnchor)
      .setHidden(options.backStyle != 'crossedStraps')
      .addClass('fabric')

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
        from: points.bandLeftBottomAnchor,
        to: points.crossedMiddleBottom,
        y: points.bandLeftBottomAnchor.y + 15,
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
        x: points.bandMiddleBottomAnchor.x + 15,
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
