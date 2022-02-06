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
      '__scaleboxImperial',
    ])
      delete this.points[id]
    for (let id of ['__scaleboxMetric', '__scaleboxImperial']) delete this.paths[id]
    return true
  }

  const scale = this.context.settings.scale

  // Convert scale to a value between 0 and 9, inclusive.
  const scaleIndex = Math.round(10 * Math.max(0.1, Math.min(1, this.context.settings.scale))) - 1

  // Metric width and height in mm and display width and height for each scale index.
  const metricSizes = [
    [ 10, 5,  "1cm",  "0.5cm"],
    [ 20, 10, "2cm",  "1cm"],
    [ 30, 15, "3cm",  "1.5cm"],
    [ 40, 20, "4cm",  "2cm"],
    [ 50, 25, "5cm",  "2.5cm"],
    [ 60, 30, "6cm",  "3cm"],
    [ 70, 35, "7cm",  "3.5cm"],
    [ 80, 40, "8cm",  "4cm"],
    [ 90, 45, "9cm",  "4.5cm"],
    [100, 50, "10cm", "5cm"],
  ]

  const metricWidth         = metricSizes[scaleIndex][0]
  const metricHeight        = metricSizes[scaleIndex][1]
  const metricDisplayWidth  = metricSizes[scaleIndex][2]
  const metricDisplayHeight = metricSizes[scaleIndex][3]

  // Imperial width and height in mm and display width and heigth for each scale index.
  const imperialSizes = [
    [25.4 * 0.5,   25.4 * 0.25,  '½″',   '¼″'],
    [25.4 * 0.875, 25.4 * 0.5,   '⅞″',   '½″'],
    [25.4 * 1.25,  25.4 * 0.625, '1 ¼″', '⅝″'],
    [25.4 * 1.625, 25.4 * 0.875, '1 ⅝″', '⅞″'],
    [25.4 * 2,     25.4 * 1,     '2″',   '1″'],
    [25.4 * 2.375, 25.4 * 1.25,  '2 ⅜″', '1 ¼″'],
    [25.4 * 2.875, 25.4 * 1.5,   '2 ⅞″', '1 ½″'],
    [25.4 * 3.25,  25.4 * 1.625, '3 ¼″', '1 ⅝″'],
    [25.4 * 3.625, 25.4 * 1.875, '3 ⅝″', '1 ⅞″'],
    [25.4 * 4,     25.4 * 2,     '4″',   '2″'],
  ]

  const imperialWidth         = imperialSizes[scaleIndex][0]
  const imperialHeight        = imperialSizes[scaleIndex][1]
  const imperialDisplayWidth  = imperialSizes[scaleIndex][2]
  const imperialDisplayHeight = imperialSizes[scaleIndex][3]

  // Box points
  this.points.__scaleboxMetricTopLeft = new this.Point(so.at.x - metricWidth / 2, so.at.y - metricHeight / 2)
  this.points.__scaleboxMetricTopRight = new this.Point(so.at.x + metricWidth / 2, so.at.y - metricHeight / 2)
  this.points.__scaleboxMetricBottomLeft = new this.Point(so.at.x - metricWidth / 2, so.at.y + metricHeight / 2)
  this.points.__scaleboxMetricBottomRight = new this.Point(so.at.x + metricWidth / 2, so.at.y + metricHeight / 2)
  this.points.__scaleboxImperialTopLeft = new this.Point(so.at.x - imperialWidth / 2, so.at.y - imperialHeight / 2)
  this.points.__scaleboxImperialTopRight = new this.Point(so.at.x + imperialWidth / 2, so.at.y - imperialHeight / 2)
  this.points.__scaleboxImperialBottomLeft = new this.Point(so.at.x - imperialWidth / 2, so.at.y + imperialHeight / 2)
  this.points.__scaleboxImperialBottomRight = new this.Point(so.at.x + imperialWidth / 2, so.at.y + imperialHeight / 2)
  // Text anchor points
  this.points.__scaleboxLead = new this.Point(so.at.x - 45 * scale, so.at.y - 15 * scale)
  this.points.__scaleboxTitle = this.points.__scaleboxLead.shift(-90, 10 * scale)
  this.points.__scaleboxText = this.points.__scaleboxTitle.shift(-90, 12 * scale)
  this.points.__scaleboxLink = this.points.__scaleboxText.shift(-90, 5 * scale)
  this.points.__scaleboxMetric = new this.Point(so.at.x, so.at.y + 20 * scale)
  this.points.__scaleboxImperial = new this.Point(so.at.x, so.at.y + 24 * scale)
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
      '__scaleboxImperial',
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
    .attr('class', 'scalebox imperial fill-current')
    .move(this.points.__scaleboxImperialTopLeft)
    .line(this.points.__scaleboxImperialBottomLeft)
    .line(this.points.__scaleboxImperialBottomRight)
    .line(this.points.__scaleboxImperialTopRight)
    .close()
  this.paths.__scaleboxMetric = new this.Path()
    .attr('class', 'scalebox metric fill-bg')
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
      .attr('data-text-class', 'text-sm fill-note')
  }
  this.points.__scaleboxText.attr('data-text-class', 'text-xs').attr('data-text-lineheight', 4)
  // Instructions
  this.points.__scaleboxMetric = this.points.__scaleboxMetric
    .attr('data-text', 'theWhiteInsideOfThisBoxShouldMeasure')
    .attr('data-text', `${metricDisplayWidth}`)
    .attr('data-text', 'x')
    .attr('data-text', `${metricDisplayHeight}`)
    .attr('data-text-class', 'text-xs center')
  this.points.__scaleboxImperial = this.points.__scaleboxImperial
    .attr('data-text', 'theBlackOutsideOfThisBoxShouldMeasure')
    .attr('data-text', `${imperialDisplayWidth}`)
    .attr('data-text', 'x')
    .attr('data-text', `${imperialDisplayHeight}`)
    .attr('data-text-class', 'text-xs center ')
}
