export default function(so) {
  // Passing `false` will remove the miniscale
  if (so === false) {
    for (let id of [
      '__scaleboxMetricTopLeft',
      '__scaleboxMetricTopRight',
      '__scaleboxMetricBottomRight',
      '__scaleboxMetricBottomLeft',
      '__scaleboxImperialTopLeft',
      '__scaleboxImperialTopRight',
      '__scaleboxImperialBottomRight',
      '__scaleboxImperialBottomLeft',
      '__scaleboxLead',
      '__scaleboxTitle',
      '__scaleboxText',
      '__scaleboxLink',
      '__scaleboxMetric',
      '__scaleboxImperial'
    ])
      delete this.points[id]
    for (let id of ['__scaleboxMetric', '__scaleboxImperial']) delete this.paths[id]
    return true
  }
  const m = 12.5
  const i = 12.7
  // Box points
  this.points.__scaleboxMetricTopLeft = new this.Point(so.at.x - m, so.at.y - m)
  this.points.__scaleboxMetricTopRight = new this.Point(so.at.x + m, so.at.y - m)
  this.points.__scaleboxMetricBottomLeft = new this.Point(so.at.x - m, so.at.y + m)
  this.points.__scaleboxMetricBottomRight = new this.Point(so.at.x + m, so.at.y + m)
  this.points.__scaleboxImperialTopLeft = new this.Point(so.at.x - i, so.at.y - i)
  this.points.__scaleboxImperialTopRight = new this.Point(so.at.x + i, so.at.y - i)
  this.points.__scaleboxImperialBottomLeft = new this.Point(so.at.x - i, so.at.y + i)
  this.points.__scaleboxImperialBottomRight = new this.Point(so.at.x + i, so.at.y + i)
  // Text anchor points
  this.points.__scaleboxMetric = new this.Point(so.at.x, so.at.y - 2)
  this.points.__scaleboxImperial = new this.Point(so.at.x, so.at.y + 8)
  // Rotation
  if (so.rotate) {
    let points = [
      '__scaleboxMetricTopLeft',
      '__scaleboxMetricTopRight',
      '__scaleboxMetricBottomLeft',
      '__scaleboxMetricBottomRight',
      '__scaleboxImperialTopLeft',
      '__scaleboxImperialTopRight',
      '__scaleboxImperialBottomLeft',
      '__scaleboxImperialBottomRight',
      '__scaleboxMetric',
      '__scaleboxImperial'
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
  this.paths.__scaleboxImperial = new this.Path()
    .attr('class', 'scalebox imperial')
    .move(this.points.__scaleboxImperialTopLeft)
    .line(this.points.__scaleboxImperialBottomLeft)
    .line(this.points.__scaleboxImperialBottomRight)
    .line(this.points.__scaleboxImperialTopRight)
    .close()
  this.paths.__scaleboxMetric = new this.Path()
    .attr('class', 'scalebox metric')
    .move(this.points.__scaleboxMetricTopLeft)
    .line(this.points.__scaleboxMetricBottomLeft)
    .line(this.points.__scaleboxMetricBottomRight)
    .line(this.points.__scaleboxMetricTopRight)
    .close()
  // Text
  this.points.__scaleboxMetric = this.points.__scaleboxMetric
    .attr('data-text', '2.5cm x 2.5cm')
    .attr('data-text-class', 'text-xs center')
  this.points.__scaleboxImperial = this.points.__scaleboxImperial
    .attr('data-text', '1" x 1"')
    .attr('data-text-class', 'text-xs center ')
}
