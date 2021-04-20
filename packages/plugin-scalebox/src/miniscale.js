export default function (so) {
  // Passing `false` will remove the miniscale
  if (so === false) {
    for (let id of [
      '__miniscaleMetricTopLeft',
      '__miniscaleMetricTopRight',
      '__miniscaleMetricBottomRight',
      '__miniscaleMetricBottomLeft',
      '__miniscaleImperialTopLeft',
      '__miniscaleImperialTopRight',
      '__miniscaleImperialBottomRight',
      '__miniscaleImperialBottomLeft',
      '__miniscaleMetric',
      '__miniscaleImperial'
    ])
      delete this.points[id]
    for (let id of ['__miniscaleMetric', '__miniscaleImperial']) delete this.paths[id]
    return true
  }
  const m = 12.5
  const i = 12.7
  // Box points
  this.points.__miniscaleMetricTopLeft = new this.Point(so.at.x - m, so.at.y - m)
  this.points.__miniscaleMetricTopRight = new this.Point(so.at.x + m, so.at.y - m)
  this.points.__miniscaleMetricBottomLeft = new this.Point(so.at.x - m, so.at.y + m)
  this.points.__miniscaleMetricBottomRight = new this.Point(so.at.x + m, so.at.y + m)
  this.points.__miniscaleImperialTopLeft = new this.Point(so.at.x - i, so.at.y - i)
  this.points.__miniscaleImperialTopRight = new this.Point(so.at.x + i, so.at.y - i)
  this.points.__miniscaleImperialBottomLeft = new this.Point(so.at.x - i, so.at.y + i)
  this.points.__miniscaleImperialBottomRight = new this.Point(so.at.x + i, so.at.y + i)
  // Text anchor points
  this.points.__miniscaleMetric = new this.Point(so.at.x, so.at.y - 2)
  this.points.__miniscaleImperial = new this.Point(so.at.x, so.at.y + 8)
  // Rotation
  if (so.rotate) {
    let points = [
      '__miniscaleMetricTopLeft',
      '__miniscaleMetricTopRight',
      '__miniscaleMetricBottomLeft',
      '__miniscaleMetricBottomRight',
      '__miniscaleImperialTopLeft',
      '__miniscaleImperialTopRight',
      '__miniscaleImperialBottomLeft',
      '__miniscaleImperialBottomRight',
      '__miniscaleMetric',
      '__miniscaleImperial'
    ]
    for (let pid of points) this.points[pid] = this.points[pid].rotate(so.rotate, so.at)
    for (let pid of points.slice(8)) {
      this.points[pid].attributes.set(
        'data-text-transform',
        `rotate(${so.rotate * -1}, ${this.points[pid].x}, ${this.points[pid].y})`
      )
    }
  }
  // Paths
  this.paths.__miniscaleImperial = new this.Path()
    .attr('class', 'scalebox imperial')
    .move(this.points.__miniscaleImperialTopLeft)
    .line(this.points.__miniscaleImperialBottomLeft)
    .line(this.points.__miniscaleImperialBottomRight)
    .line(this.points.__miniscaleImperialTopRight)
    .close()
  this.paths.__miniscaleMetric = new this.Path()
    .attr('class', 'scalebox metric')
    .move(this.points.__miniscaleMetricTopLeft)
    .line(this.points.__miniscaleMetricBottomLeft)
    .line(this.points.__miniscaleMetricBottomRight)
    .line(this.points.__miniscaleMetricTopRight)
    .close()
  // Text
  this.points.__miniscaleMetric = this.points.__miniscaleMetric
    .attr('data-text', '2.5cm x 2.5cm')
    .attr('data-text-class', 'text-xs center')
  this.points.__miniscaleImperial = this.points.__miniscaleImperial
    .attr('data-text', '1" x 1"')
    .attr('data-text-class', 'text-xs center ')
}
