// Export macros
export const scaleboxMacros = {
  scalebox: function (so, { store, points, paths, scale, Point, Path }) {
    let prefix
    if (so.id) {
      prefix = '_' + so.id
    } else {
      prefix = ''
    }
    const id = prefix + '_scalebox'
    // Passing `false` will remove the scalebox
    if (so === false) {
      for (const pointName in points) {
        if (pointName.match('_scalebox')) delete points[pointName]
      }
      for (const pathName in paths) {
        if (pathName.match('_scalebox')) delete paths[pathName]
      }
      return true
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
    points[id + 'MetricTopLeft'] = new Point(so.at.x - metricWidth / 2, so.at.y - metricHeight / 2)
    points[id + 'MetricTopRight'] = new Point(so.at.x + metricWidth / 2, so.at.y - metricHeight / 2)
    points[id + 'MetricBottomLeft'] = new Point(
      so.at.x - metricWidth / 2,
      so.at.y + metricHeight / 2
    )
    points[id + 'MetricBottomRight'] = new Point(
      so.at.x + metricWidth / 2,
      so.at.y + metricHeight / 2
    )
    points[id + 'ImperialTopLeft'] = new Point(
      so.at.x - imperialWidth / 2,
      so.at.y - imperialHeight / 2
    )
    points[id + 'ImperialTopRight'] = new Point(
      so.at.x + imperialWidth / 2,
      so.at.y - imperialHeight / 2
    )
    points[id + 'ImperialBottomLeft'] = new Point(
      so.at.x - imperialWidth / 2,
      so.at.y + imperialHeight / 2
    )
    points[id + 'ImperialBottomRight'] = new Point(
      so.at.x + imperialWidth / 2,
      so.at.y + imperialHeight / 2
    )
    // Text anchor points
    points[id + 'Lead'] = new Point(so.at.x - 45 * scale, so.at.y - 15 * scale)
    points[id + 'Title'] = points[id + 'Lead'].shift(-90, 10 * scale)
    points[id + 'Text'] = points[id + 'Title'].shift(-90, 12 * scale)
    points[id + 'Link'] = points[id + 'Text'].shift(-90, 5 * scale)
    points[id + 'Metric'] = new Point(so.at.x, so.at.y + 20 * scale)
    points[id + 'Imperial'] = new Point(so.at.x, so.at.y + 24 * scale)
    // Rotation
    if (so.rotate) {
      so.rotate = Number(so.rotate)
      let toRotate = [
        id + 'MetricTopLeft',
        id + 'MetricTopRight',
        id + 'MetricBottomLeft',
        id + 'MetricBottomRight',
        id + 'ImperialTopLeft',
        id + 'ImperialTopRight',
        id + 'ImperialBottomLeft',
        id + 'ImperialBottomRight',
        id + 'Lead',
        id + 'Title',
        id + 'Text',
        id + 'Link',
        id + 'Metric',
        id + 'Imperial',
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
    paths[id + 'Imperial'] = new Path()
      .attr('class', 'scalebox imperial fill-current')
      .move(points[id + 'ImperialTopLeft'])
      .line(points[id + 'ImperialBottomLeft'])
      .line(points[id + 'ImperialBottomRight'])
      .line(points[id + 'ImperialTopRight'])
      .close()
    paths[id + 'Metric'] = new Path()
      .attr('class', 'scalebox metric fill-bg')
      .move(points[id + 'MetricTopLeft'])
      .line(points[id + 'MetricBottomLeft'])
      .line(points[id + 'MetricBottomRight'])
      .line(points[id + 'MetricTopRight'])
      .close()
    // Lead
    points[id + 'Lead'] = points[id + 'Lead']
      .attr('data-text', so.lead || 'FreeSewing')
      .attr('data-text-class', 'text-sm')
    // Title
    if (so.title) points[id + 'Title'].attributes.set('data-text', so.title)
    else {
      let name = store.data?.name || 'No Name'
      if (name.indexOf('@freesewing/') !== -1) name = name.replace('@freesewing/', '')
      points[id + 'Title'] = points[id + 'Title']
        .attr('data-text', name)
        .attr('data-text', 'v' + (store.data?.version || 'No Version'))
    }
    points[id + 'Title'].attributes.add('data-text-class', 'text-lg')
    // Text
    if (typeof so.text === 'string') {
      points[id + 'Text'].attr('data-text', so.text)
    } else {
      points[id + 'Text'].attr('data-text', 'supportFreesewingBecomeAPatron')
      points[id + 'Link'] = points[id + 'Link']
        .attr('data-text', 'freesewing.org/patrons/join')
        .attr('data-text-class', 'text-sm fill-note')
    }
    points[id + 'Text'].attr('data-text-class', 'text-xs').attr('data-text-lineheight', 4)
    // Instructions
    points[id + 'Metric'] = points[id + 'Metric']
      .attr('data-text', 'theWhiteInsideOfThisBoxShouldMeasure')
      .attr('data-text', `${metricDisplayWidth}`)
      .attr('data-text', 'x')
      .attr('data-text', `${metricDisplayHeight}`)
      .attr('data-text-class', 'text-xs center')
    points[id + 'Imperial'] = points[id + 'Imperial']
      .attr('data-text', 'theBlackOutsideOfThisBoxShouldMeasure')
      .attr('data-text', `${imperialDisplayWidth}`)
      .attr('data-text', 'x')
      .attr('data-text', `${imperialDisplayHeight}`)
      .attr('data-text-class', 'text-xs center ')
  },
  miniscale(so, { points, paths, scale, Point, Path }) {
    let prefix
    if (so.id) {
      prefix = '_' + so.id
    } else {
      prefix = ''
    }
    const id = prefix + '_miniscale'
    // Passing `false` will remove the miniscale
    if (so === false) {
      for (const pointName in points) {
        if (pointName.match('_miniscale')) delete points[pointName]
      }
      for (const pathName in paths) {
        if (pathName.match('_miniscale')) delete paths[pathName]
      }
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
    points[id + 'MetricTopLeft'] = new Point(so.at.x - m, so.at.y - m)
    points[id + 'MetricTopRight'] = new Point(so.at.x + m, so.at.y - m)
    points[id + 'MetricBottomLeft'] = new Point(so.at.x - m, so.at.y + m)
    points[id + 'MetricBottomRight'] = new Point(so.at.x + m, so.at.y + m)
    points[id + 'ImperialTopLeft'] = new Point(so.at.x - i, so.at.y - i)
    points[id + 'ImperialTopRight'] = new Point(so.at.x + i, so.at.y - i)
    points[id + 'ImperialBottomLeft'] = new Point(so.at.x - i, so.at.y + i)
    points[id + 'ImperialBottomRight'] = new Point(so.at.x + i, so.at.y + i)
    // Text anchor points
    points[id + 'Metric'] = new Point(so.at.x, so.at.y - 2 * scale)
    points[id + 'Imperial'] = new Point(so.at.x, so.at.y + 8 * scale)
    // Rotation
    if (so.rotate) {
      so.rotate = Number(so.rotate)
      let toRotate = [
        id + 'MetricTopLeft',
        id + 'MetricTopRight',
        id + 'MetricBottomLeft',
        id + 'MetricBottomRight',
        id + 'ImperialTopLeft',
        id + 'ImperialTopRight',
        id + 'ImperialBottomLeft',
        id + 'ImperialBottomRight',
        id + 'Metric',
        id + 'Imperial',
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
    paths[id + 'Imperial'] = new Path()
      .attr('class', 'scalebox imperial fill-current')
      .move(points[id + 'ImperialTopLeft'])
      .line(points[id + 'ImperialBottomLeft'])
      .line(points[id + 'ImperialBottomRight'])
      .line(points[id + 'ImperialTopRight'])
      .close()
    paths[id + 'Metric'] = new Path()
      .attr('class', 'scalebox metric fill-bg')
      .move(points[id + 'MetricTopLeft'])
      .line(points[id + 'MetricBottomLeft'])
      .line(points[id + 'MetricBottomRight'])
      .line(points[id + 'MetricTopRight'])
      .close()
    // Text
    points[id + 'Metric'] = points[id + 'Metric']
      .attr('data-text', `${metricDisplaySize} x ${metricDisplaySize}`)
      .attr('data-text-class', 'text-xs center')
    points[id + 'Imperial'] = points[id + 'Imperial']
      .attr('data-text', `${imperialDisplaySize} x ${imperialDisplaySize}`)
      .attr('data-text-class', 'text-xs center ')
  },
}
