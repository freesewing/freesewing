import { dimensions } from './shared'

export default function (part) {
  let {
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    complete,
    paperless,
    macro,
    utils,
    units,
    measurements,
  } = part.shorthand()

  // Lower back neck a bit
  points.cbNeck.y = measurements.neck / 10

  points.strapLeftCp2 = utils.beamsIntersect(
    points.strapLeft,
    points.strapCenter.rotate(90, points.strapLeft),
    points.cbNeck,
    points.cbNeck.shift(0, 10)
  )

  points.armholeCp2 = points.armhole.shiftFractionTowards(
    points.armholeCorner,
    options.backlineBend
  )
  points.strapRightCp1 = points.strapRight.shiftFractionTowards(
    points.armholeCorner,
    options.backlineBend
  )

  points.anchor = points.cbNeck.clone()

  // Seamline
  paths.seam = new Path()
    .move(points.cbNeck)
    .line(points.cbHem)
    .line(points.hem)
    .curve_(points.hipsCp2, points.armhole)
    .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
    .line(points.strapLeft)
    .line(points.strapLeft)
    .curve(points.strapLeftCp2, points.cbNeck, points.cbNeck)
    .close()
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    let neckOpeningLength =
      new Path()
        .move(points.strapLeft)
        .curve(points.strapLeftCp2, points.cbNeck, points.cbNeck)
        .length() + store.get('frontNeckOpeningLength')
    let armholeLength =
      new Path()
        .move(points.armhole)
        .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
        .length() + store.get('frontArmholeLength')
    points.bindingAnchor = new Point(points.armhole.x / 4, points.armhole.y)
      .attr('data-text', 'cutTwoStripsToFinishTheArmholes')
      .attr('data-text', ':\n')
      .attr('data-text', `2x: ${units(sa * 6 || 60)} x ${units(armholeLength * 0.95 + 2 * sa)}`)
      .attr('data-text', '\n \n')
      .attr('data-text', 'cutOneStripToFinishTheNeckOpening')
      .attr('data-text', ':\n')
      .attr('data-text', 'width')
      .attr('data-text', ':')
      .attr(
        'data-text',
        `${units((sa || 10) * 6)} x ${units(neckOpeningLength * 2 * 0.95 + 2 * sa)}`
      )
    //.attr('data-text-class', 'text-sm')

    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfHem,
      grainline: true,
    })

    macro('title', { at: points.title, nr: 2, title: 'back' })
    points.scaleboxAnchor = points.scalebox = points.title.shift(90, 100)
    macro('scalebox', { at: points.scalebox })
  }

  // Paperless?
  if (paperless) {
    dimensions(macro, points, sa)
    macro('vd', {
      from: points.cbHem,
      to: points.cbNeck,
      x: points.cbHem.x - sa - 15,
    })
  }

  return part
}
