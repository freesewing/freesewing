// Export macros
export const scaleboxMacros = {
  scalebox: function (so, { store, points, paths, scale, Point, Path }) {
    const prefix = 'scalebox_'
    const id = prefix + so.id
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
    points[id + '_MetricTopLeft'] = new Point(so.at.x - metricWidth / 2, so.at.y - metricHeight / 2)
    points[id + '_MetricTopRight'] = new Point(
      so.at.x + metricWidth / 2,
      so.at.y - metricHeight / 2
    )
    points[id + '_MetricBottomLeft'] = new Point(
      so.at.x - metricWidth / 2,
      so.at.y + metricHeight / 2
    )
    points[id + '_MetricBottomRight'] = new Point(
      so.at.x + metricWidth / 2,
      so.at.y + metricHeight / 2
    )
    points[id + '_ImperialTopLeft'] = new Point(
      so.at.x - imperialWidth / 2,
      so.at.y - imperialHeight / 2
    )
    points[id + '_ImperialTopRight'] = new Point(
      so.at.x + imperialWidth / 2,
      so.at.y - imperialHeight / 2
    )
    points[id + '_ImperialBottomLeft'] = new Point(
      so.at.x - imperialWidth / 2,
      so.at.y + imperialHeight / 2
    )
    points[id + '_ImperialBottomRight'] = new Point(
      so.at.x + imperialWidth / 2,
      so.at.y + imperialHeight / 2
    )
    // Text anchor points
    points[id + '_Lead'] = new Point(so.at.x - 45 * scale, so.at.y - 15 * scale)
    points[id + '_Title'] = points[id + '_Lead'].shift(-90, 10 * scale)
    points[id + '_Text'] = points[id + '_Title'].shift(-90, 12 * scale)
    points[id + '_Link'] = points[id + '_Text'].shift(-90, 5 * scale)
    points[id + '_Metric'] = new Point(so.at.x, so.at.y + 20 * scale)
    points[id + '_Imperial'] = new Point(so.at.x, so.at.y + 24 * scale)
    // Rotation
    if (so.rotate) {
      so.rotate = Number(so.rotate)
      let toRotate = [
        '_MetricTopLeft',
        '_MetricTopRight',
        '_MetricBottomLeft',
        '_MetricBottomRight',
        '_ImperialTopLeft',
        '_ImperialTopRight',
        '_ImperialBottomLeft',
        '_ImperialBottomRight',
        '_Lead',
        '_Title',
        '_Text',
        '_Link',
        '_Metric',
        '_Imperial',
      ]
      for (let pid of toRotate) points[id + pid] = points[id + pid].rotate(so.rotate, so.at)
      for (let pid of toRotate.slice(8)) {
        points[id + pid].attributes.set(
          'data-text-transform',
          `rotate(${so.rotate * -1}, ${points[id + pid].x}, ${points[id + pid].y})`
        )
      }
    }
    // Paths
    paths[id + '_Imperial'] = new Path()
      .attr('class', 'scalebox imperial fill-current')
      .move(points[id + '_ImperialTopLeft'])
      .line(points[id + '_ImperialBottomLeft'])
      .line(points[id + '_ImperialBottomRight'])
      .line(points[id + '_ImperialTopRight'])
      .close()
    paths[id + '_Metric'] = new Path()
      .attr('class', 'scalebox metric fill-bg')
      .move(points[id + '_MetricTopLeft'])
      .line(points[id + '_MetricBottomLeft'])
      .line(points[id + '_MetricBottomRight'])
      .line(points[id + '_MetricTopRight'])
      .close()
    // Lead
    points[id + '_Lead'] = points[id + '_Lead']
      .attr('data-text', so.lead || 'FreeSewing')
      .attr('data-text-class', 'text-sm')
    // Title
    if (so.title) points[id + '_Title'].attributes.set('data-text', so.title)
    else {
      let name = store.data?.name || 'No Name'
      if (name.indexOf('@freesewing/') !== -1) name = name.replace('@freesewing/', '')
      points[id + '_Title'] = points[id + '_Title']
        .attr('data-text', name)
        .attr('data-text', 'v' + (store.data?.version || 'No Version'))
    }
    points[id + '_Title'].attributes.add('data-text-class', 'text-lg')
    // Text
    if (typeof so.text === 'string') {
      points[id + '_Text'].attr('data-text', so.text)
    } else {
      points[id + '_Text'].attr('data-text', 'supportFreesewingBecomeAPatron')
      points[id + '_Link'] = points[id + '_Link']
        .attr('data-text', 'freesewing.org/patrons/join')
        .attr('data-text-class', 'text-sm fill-note')
    }
    points[id + '_Text'].attr('data-text-class', 'text-xs').attr('data-text-lineheight', 4)
    // Instructions
    points[id + '_Metric'] = points[id + '_Metric']
      .attr('data-text', 'theWhiteInsideOfThisBoxShouldMeasure')
      .attr('data-text', `${metricDisplayWidth}`)
      .attr('data-text', 'x')
      .attr('data-text', `${metricDisplayHeight}`)
      .attr('data-text-class', 'text-xs center')
    points[id + '_Imperial'] = points[id + '_Imperial']
      .attr('data-text', 'theBlackOutsideOfThisBoxShouldMeasure')
      .attr('data-text', `${imperialDisplayWidth}`)
      .attr('data-text', 'x')
      .attr('data-text', `${imperialDisplayHeight}`)
      .attr('data-text-class', 'text-xs center ')
  },
  rmscalebox: function (id, { points, paths }) {
    const prefix = 'scalebox_'
    for (let key of [
      '_MetricTopLeft',
      '_MetricTopRight',
      '_MetricBottomRight',
      '_MetricBottomLeft',
      '_ImperialTopLeft',
      '_ImperialTopRight',
      '_ImperialBottomRight',
      '_ImperialBottomLeft',
      '_Lead',
      '_Title',
      '_Text',
      '_Link',
      '_Metric',
      '_Imperial',
    ])
      delete points[prefix + id + key]
    for (let key of ['_Metric', '_Imperial']) delete paths[prefix + id + key]
    return true
  },
  miniscale(so, { points, paths, scale, Point, Path }) {
    const prefix = 'miniscale_'
    const id = prefix + so.id
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
    points[id + '_MetricTopLeft'] = new Point(so.at.x - m, so.at.y - m)
    points[id + '_MetricTopRight'] = new Point(so.at.x + m, so.at.y - m)
    points[id + '_MetricBottomLeft'] = new Point(so.at.x - m, so.at.y + m)
    points[id + '_MetricBottomRight'] = new Point(so.at.x + m, so.at.y + m)
    points[id + '_ImperialTopLeft'] = new Point(so.at.x - i, so.at.y - i)
    points[id + '_ImperialTopRight'] = new Point(so.at.x + i, so.at.y - i)
    points[id + '_ImperialBottomLeft'] = new Point(so.at.x - i, so.at.y + i)
    points[id + '_ImperialBottomRight'] = new Point(so.at.x + i, so.at.y + i)
    // Text anchor points
    points[id + '_Metric'] = new Point(so.at.x, so.at.y - 2 * scale)
    points[id + '_Imperial'] = new Point(so.at.x, so.at.y + 8 * scale)
    // Rotation
    if (so.rotate) {
      so.rotate = Number(so.rotate)
      let toRotate = [
        '_MetricTopLeft',
        '_MetricTopRight',
        '_MetricBottomLeft',
        '_MetricBottomRight',
        '_ImperialTopLeft',
        '_ImperialTopRight',
        '_ImperialBottomLeft',
        '_ImperialBottomRight',
        '_Metric',
        '_Imperial',
      ]
      for (const pid of toRotate) points[id + pid] = points[id + pid].rotate(so.rotate, so.at)
      for (const pid of toRotate.slice(8)) {
        points[id + pid].attributes.set(
          'data-text-transform',
          `rotate(${so.rotate * -1}, ${points[id + pid].x}, ${points[id + pid].y})`
        )
      }
    }
    // Paths
    paths[id + '_Imperial'] = new Path()
      .attr('class', 'scalebox imperial fill-current')
      .move(points[id + '_ImperialTopLeft'])
      .line(points[id + '_ImperialBottomLeft'])
      .line(points[id + '_ImperialBottomRight'])
      .line(points[id + '_ImperialTopRight'])
      .close()
    paths[id + '_Metric'] = new Path()
      .attr('class', 'scalebox metric fill-bg')
      .move(points[id + '_MetricTopLeft'])
      .line(points[id + '_MetricBottomLeft'])
      .line(points[id + '_MetricBottomRight'])
      .line(points[id + '_MetricTopRight'])
      .close()
    // Text
    points[id + '_Metric'] = points[id + '_Metric']
      .attr('data-text', `${metricDisplaySize} x ${metricDisplaySize}`)
      .attr('data-text-class', 'text-xs center')
    points[id + '_Imperial'] = points[id + '_Imperial']
      .attr('data-text', `${imperialDisplaySize} x ${imperialDisplaySize}`)
      .attr('data-text-class', 'text-xs center ')
  },
  rmminiscale(id, { points, paths }) {
    const prefix = 'miniscale_'
    for (const key of [
      '_MetricTopLeft',
      '_MetricTopRight',
      '_MetricBottomRight',
      '_MetricBottomLeft',
      '_ImperialTopLeft',
      '_ImperialTopRight',
      '_ImperialBottomRight',
      '_ImperialBottomLeft',
      '_Metric',
      '_Imperial',
    ])
      delete points[prefix + id + key]
    for (const key of ['_Metric', '_Imperial']) delete paths[prefix + id + key]
    return true
  },
}
