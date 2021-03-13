export default (part) => {
  // Shorthand
  let {
    points,
    Point,
    paths,
    Path,
    measurements,
    options,
    complete,
    paperless,
    store,
    macro,
    utils,
    snippets,
    Snippet,
    sa
  } = part.shorthand()

  if (!options.splitWaistband) return part

  points.topLeft = new Point(0, 0)
  points.top = new Point(measurements.waist * options.waistbandWidth * options.waistbandFactor, 0)
  points.topRight = new Point(points.top.x * 2, 0)
  points.bottomLeft = new Point(0, store.get('waistbandFront') + store.get('waistbandBack'))
  points.bottom = new Point(points.top.x, points.bottomLeft.y)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)

  paths.saBase = new Path()
    .move(points.topRight)
    .line(points.bottomRight)
    .line(points.bottomLeft)
    .setRender(false)
  paths.seam = paths.saBase
    .clone()
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')
    .setRender(true)

  if (complete) {
    points.firstSideNotchRight = points.topRight.shift(-90, store.get('waistbandBack'))
    points.firstSideNotchLeft = new Point(0, points.firstSideNotchRight.y)
    macro('sprinkle', {
      snippet: 'notch',
      on: ['firstSideNotchRight', 'firstSideNotchLeft', 'top']
    })
    points.titleAnchor = points.top.shiftFractionTowards(points.bottom, 0.25)
    points.logoAnchor = points.top.shiftFractionTowards(points.bottom, 0.75)
    macro('title', {
      at: points.titleAnchor,
      nr: '3b',
      title: 'waistbandButtonholeSide',
      rotation: 90
    })
    macro('grainline', {
      from: points.firstSideNotchLeft,
      to: points.firstSideNotchRight
    })
    snippets.logo = new Snippet('logo', points.logoAnchor)
    paths.fold = new Path().move(points.top).line(points.bottom).attr('class', 'fabric help')
    if (sa) {
      paths.sa = paths.saBase
        .offset(sa * -1)
        .join(
          new Path()
            .move(points.bottomLeft)
            .line(points.topLeft)
            .line(points.topRight)
            .offset(sa * -2)
        )
        .close()
        .attr('class', 'fabric sa')
    }

    if (paperless) {
    }
  }

  return part
}
