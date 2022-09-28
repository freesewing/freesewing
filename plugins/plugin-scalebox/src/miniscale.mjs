export function miniscale(so, { points, paths, Point, Path, scale }) {
  // Passing `false` will remove the miniscale
  if (so === false) {
    for (const id of [
      '__miniscaleMetricTopLeft',
      '__miniscaleMetricTopRight',
      '__miniscaleMetricBottomRight',
      '__miniscaleMetricBottomLeft',
      '__miniscaleImperialTopLeft',
      '__miniscaleImperialTopRight',
      '__miniscaleImperialBottomRight',
      '__miniscaleImperialBottomLeft',
      '__miniscaleMetric',
      '__miniscaleImperial',
    ])
      delete points[id]
    for (const id of ['__miniscaleMetric', '__miniscaleImperial']) delete paths[id]
    return true
  }

  // Convert scale to a value between 0 and 5, inclusive.
  const scaleIndex = Math.ceil(6 * Math.max(0.1, Math.min(1, scale))) - 1

  // Metric size in mm / display value and imperial size in mm / display value for each scale index.
  const sizes = [
    [10, '1cm', 25.4 * 0.375, '⅜″'],
    [13, '1.3cm', 25.4 * 0.5, '½″'],
    [16, '1.6cm', 25.4 * 0.625, '⅝″'],
    [19, '1.9cm', 25.4 * 0.75, '¾″'],
    [22, '2.2cm', 25.4 * 0.875, '⅞″'],
    [25, '2.5cm', 25.4 * 1, '1″'],
  ]
  const m = sizes[scaleIndex][0] / 2
  const i = sizes[scaleIndex][2] / 2
  const metricDisplaySize = sizes[scaleIndex][1]
  const imperialDisplaySize = sizes[scaleIndex][3]
  // Box points
  points.__miniscaleMetricTopLeft = new Point(so.at.x - m, so.at.y - m)
  points.__miniscaleMetricTopRight = new Point(so.at.x + m, so.at.y - m)
  points.__miniscaleMetricBottomLeft = new Point(so.at.x - m, so.at.y + m)
  points.__miniscaleMetricBottomRight = new Point(so.at.x + m, so.at.y + m)
  points.__miniscaleImperialTopLeft = new Point(so.at.x - i, so.at.y - i)
  points.__miniscaleImperialTopRight = new Point(so.at.x + i, so.at.y - i)
  points.__miniscaleImperialBottomLeft = new Point(so.at.x - i, so.at.y + i)
  points.__miniscaleImperialBottomRight = new Point(so.at.x + i, so.at.y + i)
  // Text anchor points
  points.__miniscaleMetric = new Point(so.at.x, so.at.y - 2 * scale)
  points.__miniscaleImperial = new Point(so.at.x, so.at.y + 8 * scale)
  // Rotation
  if (so.rotate) {
    so.rotate = Number(so.rotate)
    let toRotate = [
      '__miniscaleMetricTopLeft',
      '__miniscaleMetricTopRight',
      '__miniscaleMetricBottomLeft',
      '__miniscaleMetricBottomRight',
      '__miniscaleImperialTopLeft',
      '__miniscaleImperialTopRight',
      '__miniscaleImperialBottomLeft',
      '__miniscaleImperialBottomRight',
      '__miniscaleMetric',
      '__miniscaleImperial',
    ]
    for (const pid of toRotate) points[pid] = points[pid].rotate(so.rotate, so.at)
    for (const pid of toRotate.slice(8)) {
      points[pid].attributes.set(
        'data-text-transform',
        `rotate(${so.rotate * -1}, ${points[pid].x}, ${points[pid].y})`
      )
    }
  }
  // Paths
  paths.__miniscaleImperial = new Path()
    .attr('class', 'scalebox imperial fill-current')
    .move(points.__miniscaleImperialTopLeft)
    .line(points.__miniscaleImperialBottomLeft)
    .line(points.__miniscaleImperialBottomRight)
    .line(points.__miniscaleImperialTopRight)
    .close()
  paths.__miniscaleMetric = new Path()
    .attr('class', 'scalebox metric fill-bg')
    .move(points.__miniscaleMetricTopLeft)
    .line(points.__miniscaleMetricBottomLeft)
    .line(points.__miniscaleMetricBottomRight)
    .line(points.__miniscaleMetricTopRight)
    .close()
  // Text
  points.__miniscaleMetric = points.__miniscaleMetric
    .attr('data-text', `${metricDisplaySize} x ${metricDisplaySize}`)
    .attr('data-text-class', 'text-xs center')
  points.__miniscaleImperial = points.__miniscaleImperial
    .attr('data-text', `${imperialDisplaySize} x ${imperialDisplaySize}`)
    .attr('data-text-class', 'text-xs center ')
}
