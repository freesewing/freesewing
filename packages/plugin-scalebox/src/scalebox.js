export default function (so) {
  // Passing `false` will remove the scalebox
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
  // Box points
  this.points.__scaleboxMetricTopLeft = new this.Point(so.at.x - 50, so.at.y - 25)
  this.points.__scaleboxMetricTopRight = new this.Point(so.at.x + 50, so.at.y - 25)
  this.points.__scaleboxMetricBottomLeft = new this.Point(so.at.x - 50, so.at.y + 25)
  this.points.__scaleboxMetricBottomRight = new this.Point(so.at.x + 50, so.at.y + 25)
  this.points.__scaleboxImperialTopLeft = new this.Point(so.at.x - 50.8, so.at.y - 25.4)
  this.points.__scaleboxImperialTopRight = new this.Point(so.at.x + 50.8, so.at.y - 25.4)
  this.points.__scaleboxImperialBottomLeft = new this.Point(so.at.x - 50.8, so.at.y + 25.4)
  this.points.__scaleboxImperialBottomRight = new this.Point(so.at.x + 50.8, so.at.y + 25.4)
  // Text anchor points
  this.points.__scaleboxLead = new this.Point(so.at.x - 45, so.at.y - 15)
  this.points.__scaleboxTitle = this.points.__scaleboxLead.shift(-90, 10)
  this.points.__scaleboxText = this.points.__scaleboxTitle.shift(-90, 12)
  this.points.__scaleboxLink = this.points.__scaleboxText.shift(-90, 5)
  this.points.__scaleboxMetric = new this.Point(so.at.x, so.at.y + 20)
  this.points.__scaleboxImperial = new this.Point(so.at.x, so.at.y + 24)
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
      '__scaleboxLead',
      '__scaleboxTitle',
      '__scaleboxText',
      '__scaleboxLink',
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
  // Lead
  this.points.__scaleboxLead = this.points.__scaleboxLead
    .attr('data-text', so.lead || 'FreeSewing')
    .attr('data-text-class', 'text-sm')
  // Title
  if (so.title) this.points.__scaleboxTitle.attributes.set('data-text', so.title)
  else {
    this.points.__scaleboxTitle = this.points.__scaleboxTitle
      .attr('data-text', this.context.config.name)
      .attr('data-text', 'v' + this.context.config.version)
  }
  this.points.__scaleboxTitle.attributes.add('data-text-class', 'text-lg')
  // Text
  if (typeof so.text === 'string') {
    this.points.__scaleboxText.attr('data-text', so.text)
  } else {
    this.points.__scaleboxText.attr('data-text', 'supportFreesewingBecomeAPatron')
    this.points.__scaleboxLink = this.points.__scaleboxLink
      .attr('data-text', 'freesewing.org/patrons/join')
      .attr('data-text-class', 'text-xs fill-note')
  }
  this.points.__scaleboxText.attr('data-text-class', 'text-xs').attr('data-text-lineheight', 4)
  // Instructions
  this.points.__scaleboxMetric = this.points.__scaleboxMetric
    .attr('data-text', 'theWhiteInsideOfThisBoxShouldMeasure')
    .attr('data-text', '10cm')
    .attr('data-text', 'x')
    .attr('data-text', '5cm')
    .attr('data-text-class', 'text-xs center')
  this.points.__scaleboxImperial = this.points.__scaleboxImperial
    .attr('data-text', 'theBlackOutsideOfThisBoxShouldMeasure')
    .attr('data-text', '4"')
    .attr('data-text', 'x')
    .attr('data-text', '2"')
    .attr('data-text-class', 'text-xs center ')
}
