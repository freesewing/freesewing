export const back = {
  name: 'barbara.back',
  measurements: ['underbust', 'hpsToWaistBack'],
  options: {
    // Style
    backStyle: { dflt: 'crossedStraps', list: ['crossedStraps', 'parallelStraps'], menu: 'style' },
    bandHeight: { pct: 15, min: 0, max: 95, menu: 'style' },
  },
  draft: ({ part, Path, Point, paths, points, options, measurements, macro, utils, store }) => {
    // Construct the bottom of the back
    points.bandLeftBottom = new Point(0, 0)
    points.bandMiddleBottom = points.bandLeftBottom.shift(0, measurements.underbust / 4)
    points.bandMiddleTop = points.bandMiddleBottom.shift(
      90,
      measurements.hpsToWaistBack * options.bandHeight
    )
    //points.bandLeftTop = points.bandLeftBottom.shift(
    //
    //)

    paths.test = new Path()
      .move(points.bandLeftBottom)
      .line(points.bandMiddleBottom)
      .line(points.bandMiddleTop)

    return part
  },
}
