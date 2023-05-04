// Export macros
export const scaleboxMacros = {
  scalebox: function (so, { store, points, paths, scale, Point, Path }) {
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
        delete points[id]
      for (let id of ['__scaleboxMetric', '__scaleboxImperial']) delete paths[id]
      return true
    }

    const transform = function (anchor) {
      return `translate(${anchor.x}, ${anchor.y}) scale(${scale}) translate(${anchor.x * -1}, ${
        anchor.y * -1
      })`
    }

    // Convert scale to a value between 0 and 9, inclusive.
    const scaleIndex = Math.round(10 * Math.max(0.1, Math.min(1, scale))) - 1

    // Metric width and height in mm and display width and height for each scale index.
    const metricSizes = [
      [10, 5, '1cm', '0.5cm'],
      [20, 10, '2cm', '1cm'],
      [30, 15, '3cm', '1.5cm'],
      [40, 20, '4cm', '2cm'],
      [50, 25, '5cm', '2.5cm'],
      [60, 30, '6cm', '3cm'],
      [70, 35, '7cm', '3.5cm'],
      [80, 40, '8cm', '4cm'],
      [90, 45, '9cm', '4.5cm'],
      [100, 50, '10cm', '5cm'],
    ]

    const metricWidth = metricSizes[scaleIndex][0]
    const metricHeight = metricSizes[scaleIndex][1]
    const metricDisplayWidth = metricSizes[scaleIndex][2]
    const metricDisplayHeight = metricSizes[scaleIndex][3]

    // Imperial width and height in mm and display width and heigth for each scale index.
    const imperialSizes = [
      [25.4 * 0.5, 25.4 * 0.25, '½″', '¼″'],
      [25.4 * 0.875, 25.4 * 0.5, '⅞″', '½″'],
      [25.4 * 1.25, 25.4 * 0.625, '1 ¼″', '⅝″'],
      [25.4 * 1.625, 25.4 * 0.875, '1 ⅝″', '⅞″'],
      [25.4 * 2, 25.4 * 1, '2″', '1″'],
      [25.4 * 2.375, 25.4 * 1.25, '2 ⅜″', '1 ¼″'],
      [25.4 * 2.875, 25.4 * 1.5, '2 ⅞″', '1 ½″'],
      [25.4 * 3.25, 25.4 * 1.625, '3 ¼″', '1 ⅝″'],
      [25.4 * 3.625, 25.4 * 1.875, '3 ⅝″', '1 ⅞″'],
      [25.4 * 4, 25.4 * 2, '4″', '2″'],
    ]

    const imperialWidth = imperialSizes[scaleIndex][0]
    const imperialHeight = imperialSizes[scaleIndex][1]
    const imperialDisplayWidth = imperialSizes[scaleIndex][2]
    const imperialDisplayHeight = imperialSizes[scaleIndex][3]

    // Box points
    points.__scaleboxMetricTopLeft = new Point(
      so.at.x - metricWidth / 2,
      so.at.y - metricHeight / 2
    )
    points.__scaleboxMetricTopRight = new Point(
      so.at.x + metricWidth / 2,
      so.at.y - metricHeight / 2
    )
    points.__scaleboxMetricBottomLeft = new Point(
      so.at.x - metricWidth / 2,
      so.at.y + metricHeight / 2
    )
    points.__scaleboxMetricBottomRight = new Point(
      so.at.x + metricWidth / 2,
      so.at.y + metricHeight / 2
    )
    points.__scaleboxImperialTopLeft = new Point(
      so.at.x - imperialWidth / 2,
      so.at.y - imperialHeight / 2
    )
    points.__scaleboxImperialTopRight = new Point(
      so.at.x + imperialWidth / 2,
      so.at.y - imperialHeight / 2
    )
    points.__scaleboxImperialBottomLeft = new Point(
      so.at.x - imperialWidth / 2,
      so.at.y + imperialHeight / 2
    )
    points.__scaleboxImperialBottomRight = new Point(
      so.at.x + imperialWidth / 2,
      so.at.y + imperialHeight / 2
    )
    // Text anchor points
    points.__scaleboxLead = points.__scaleboxImperialTopLeft
      .shift(-90, 7 * scale)
      .shift(0, 2 * scale)
    points.__scaleboxTitle = points.__scaleboxLead.shift(-90, 10 * scale)
    points.__scaleboxText = points.__scaleboxTitle.shift(-90, 12 * scale)
    points.__scaleboxLink = points.__scaleboxText.shift(-90, 5 * scale)
    points.__scaleboxMetric = new Point(so.at.x, so.at.y + 20 * scale)
    points.__scaleboxImperial = new Point(so.at.x, so.at.y + 24 * scale)
    // Rotation
    if (so.rotate) {
      so.rotate = Number(so.rotate)
      let toRotate = [
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
      for (let pid of toRotate) points[pid] = points[pid].rotate(so.rotate, so.at)
      for (let pid of toRotate.slice(8)) {
        points[pid].attributes.set(
          'data-text-transform',
          `rotate(${so.rotate * -1}, ${points[pid].x}, ${points[pid].y})`
        )
      }
    }
    // Paths
    paths.__scaleboxImperial = new Path()
      .attr('class', 'scalebox imperial fill-current')
      .move(points.__scaleboxImperialTopLeft)
      .line(points.__scaleboxImperialBottomLeft)
      .line(points.__scaleboxImperialBottomRight)
      .line(points.__scaleboxImperialTopRight)
      .close()
    paths.__scaleboxMetric = new Path()
      .attr('class', 'scalebox metric fill-bg')
      .move(points.__scaleboxMetricTopLeft)
      .line(points.__scaleboxMetricBottomLeft)
      .line(points.__scaleboxMetricBottomRight)
      .line(points.__scaleboxMetricTopRight)
      .close()
    // Lead
    points.__scaleboxLead
      .attr('data-text', so.lead || 'FreeSewing')
      .attr('data-text-class', 'text-sm')
      .attr('data-text-transform', transform(points.__scaleboxLead))
    // Title
    if (so.title) points.__scaleboxTitle.attributes.set('data-text', so.title)
    else {
      let name = store.data?.name || 'No Name'
      if (name.indexOf('@freesewing/') !== -1) name = name.replace('@freesewing/', '')
      points.__scaleboxTitle = points.__scaleboxTitle
        .attr('data-text', name)
        .attr('data-text', 'v' + (store.data?.version || 'No Version'))
    }
    points.__scaleboxTitle.attr('data-text-transform', transform(points.__scaleboxTitle))
    points.__scaleboxTitle.attributes.add('data-text-class', 'text-lg')
    // Text
    if (typeof so.text === 'string') {
      points.__scaleboxText.attr('data-text', so.text)
    } else {
      points.__scaleboxText.attr('data-text', 'supportFreesewingBecomeAPatron')
      points.__scaleboxLink = points.__scaleboxLink
        .attr('data-text', 'freesewing.org/patrons/join')
        .attr('data-text-class', 'text-sm fill-note')
    }
    points.__scaleboxLink.attr('data-text-transform', transform(points.__scaleboxLink))
    points.__scaleboxText
      .attr('data-text-transform', transform(points.__scaleboxText))
      .attr('data-text-class', 'text-xs')
      .attr('data-text-lineheight', 4)
    // Instructions
    points.__scaleboxMetric = points.__scaleboxMetric
      .attr('data-text', 'theWhiteInsideOfThisBoxShouldMeasure')
      .attr('data-text', `${metricDisplayWidth}`)
      .attr('data-text', 'x')
      .attr('data-text', `${metricDisplayHeight}`)
      .attr('data-text-class', 'text-xs center')
      .attr('data-text-transform', transform(points.__scaleboxMetric))
    points.__scaleboxImperial = points.__scaleboxImperial
      .attr('data-text', 'theBlackOutsideOfThisBoxShouldMeasure')
      .attr('data-text', `${imperialDisplayWidth}`)
      .attr('data-text', 'x')
      .attr('data-text', `${imperialDisplayHeight}`)
      .attr('data-text-class', 'text-xs center ')
      .attr('data-text-transform', transform(points.__scaleboxImperial))
  },
  miniscale(so, { points, paths, scale, Point, Path }) {
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
  },
}
