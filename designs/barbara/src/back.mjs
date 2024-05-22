export const back = {
  name: 'barbara.back',
  measurements: ['underbust', 'hpsToWaistBack', 'shoulderSlope'],
  options: {
    // Style
    backStyle: { dflt: 'crossedStraps', list: ['crossedStraps', 'parallelStraps'], menu: 'style' },
    bandHeight: { pct: 15, min: 0, max: 95, menu: 'style' },
    crossedStrapsWidth: { pct: 70, min: 50, max: 90, menu: 'style' },
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
      (measurements.underbust / 4) * options.crossedStrapsWidth
    )
    points.crossedStrapLeft = points.neckRightBack.shift(
      -measurements.shoulderSlope,
      store.get('front.neckLeftStrapRightBase.dist')
    )
    points.crossedStrapRight = points.crossedStrapLeft.shift(
      -measurements.shoulderSlope,
      store.get('front.strapRightStrapLeft.dist')
    )

    paths.test = new Path()
      .move(points.bandLeftBottom)
      .line(points.bandMiddleBottom)
      .line(points.bandMiddleTop)
      .line(points.bandLeftTop)
      .close(points.bandLeftBottom)
    paths.test.hide()

    paths.crossedStrapsTest = new Path()
      .move(points.bandLeftBottom)
      .line(points.crossedMiddleBottom)
      .line(points.crossedStrapRight)
      .line(points.crossedStrapLeft)

    return part
  },
}
