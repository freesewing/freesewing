export default (part) => {
  // Shorthand
  let {
    points,
    Point,
    paths,
    Path,
    options,
    complete,
    paperless,
    store,
    macro,
    snippets,
    Snippet,
    sa,
    absoluteOptions,
  } = part.shorthand()

  store.set('waistbandWidth', absoluteOptions.waistbandWidth)

  if (options.waistbandCurve > 0) {
    return part
  }

  points.topLeft = new Point(0, 0)
  points.top = new Point(store.get('waistbandWidth'), 0)
  points.topRight = new Point(points.top.x * 2, 0)
  points.bottomLeft = new Point(
    0,
    2 * store.get('waistbandBack') + 2 * store.get('waistbandFront') + store.get('waistbandFly')
  )
  points.bottom = new Point(points.top.x, points.bottomLeft.y)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)

  points.cfRight = points.topRight.shift(-90, store.get('waistbandFly'))
  points.cfLeft = new Point(0, points.cfRight.y)
  points.rsRight = points.cfRight.shift(-90, store.get('waistbandFront'))
  points.rsLeft = new Point(0, points.rsRight.y)
  points.cbRight = points.rsRight.shift(-90, store.get('waistbandBack'))
  points.cbLeft = new Point(0, points.cbRight.y)
  points.lsRight = points.cbRight.shift(-90, store.get('waistbandBack'))
  points.lsLeft = new Point(0, points.lsRight.y)

  paths.saBase = new Path()
    .move(points.topLeft)
    .line(points.topRight)
    .line(points.bottomRight)
    .line(points.bottomLeft)
    .setRender(false)
  paths.seam = paths.saBase.clone().close().attr('class', 'fabric').setRender(true)

  if (complete) {
    macro('sprinkle', {
      snippet: 'notch',
      on: ['cfRight', 'cfLeft', 'rsRight', 'rsLeft', 'cbRight', 'cbLeft', 'lsRight', 'lsLeft'],
    })
    points.titleAnchor = points.top.shiftFractionTowards(points.bottom, 0.4)
    points.logoAnchor = points.top.shiftFractionTowards(points.bottom, 0.6)
    macro('title', {
      at: points.titleAnchor,
      nr: 11,
      title: 'waistband',
      rotation: 90,
    })
    macro('grainline', {
      from: points.rsLeft.shift(90, 30),
      to: points.rsRight.shift(90, 30),
    })
    paths.cf = new Path()
      .move(points.cfLeft)
      .line(points.cfRight)
      .attr('class', 'dashed')
      .attr('data-text', 'centerFront')
      .attr('data-text-class', 'center')
    paths.cf2 = new Path()
      .move(points.bottomLeft)
      .line(points.bottomRight)
      .attr('class', 'hidden')
      .attr('data-text', 'centerFront')
      .attr('data-text-class', 'center')
    paths.cb = new Path()
      .move(points.cbLeft)
      .line(points.cbRight)
      .attr('class', 'dashed')
      .attr('data-text', 'centerBack')
      .attr('data-text-class', 'center')
    paths.rs = new Path()
      .move(points.rsLeft)
      .line(points.rsRight)
      .attr('class', 'dashed')
      .attr('data-text', 'rightSide')
      .attr('data-text-class', 'center')
    paths.ls = new Path()
      .move(points.lsLeft)
      .line(points.lsRight)
      .attr('class', 'dashed')
      .attr('data-text', 'leftSide')
      .attr('data-text-class', 'center')
    snippets.logo = new Snippet('logo', points.logoAnchor)
    paths.fold = new Path().move(points.top).line(points.bottom).attr('class', 'fabric help')
    points.button = new Point(points.topRight.x * 0.7, points.cfRight.y * 0.6)
    let buttonScale = points.top.x / 14
    snippets.button = new Snippet('button', points.button).attr('data-scale', buttonScale)
    points.buttonhole = new Point(points.button.x, points.bottom.y - points.cfRight.y * 0.4)
    snippets.buttonhole = new Snippet('buttonhole-start', points.buttonhole).attr(
      'data-scale',
      buttonScale
    )
    if (sa) {
      paths.sa = paths.saBase
        .offset(sa * -1)
        .join(
          new Path()
            .move(points.bottomLeft)
            .line(points.topLeft)
            .offset(sa * -2)
        )
        .close()
        .attr('class', 'fabric sa')
    }

    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.bottomRight.x + sa + 15,
      })
    }
  }

  return part
}
