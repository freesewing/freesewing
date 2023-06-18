function draftWaistband({
  Point,
  points,
  Path,
  paths,
  store,
  part,
  measurements,
  options,
  complete,
  sa,
  paperless,
  snippets,
  Snippet,
  macro,
  absoluteOptions,
}) {
  // Edge of the waistband on the buttonhole side
  points.topLeft = new Point(0, 0)
  points.bottomLeft = new Point(0, absoluteOptions.waistbandWidth * 2)

  // Center front on the buttonhole side
  points.cfLeftTop = new Point(store.get('hips') * options.surpassCf, 0)
  points.cfLeftBottom = new Point(points.cfLeftTop.x, points.bottomLeft.y)

  // Center front on button side
  points.cfRightTop = points.cfLeftTop.shift(0, store.get('hips'))
  points.cfRightBottom = new Point(points.cfRightTop.x, points.cfLeftBottom.y)

  // Edge of the waistband on the button side
  points.topRight = new Point(
    store.get('hips') + absoluteOptions.waistbandWidth * options.waistbandOverlap,
    0
  )
  points.bottomLeft = new Point(0, absoluteOptions.waistbandWidth * 2)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
  points.midLeft = new Point(0, points.bottomLeft.y / 2)
  points.midRight = new Point(points.topRight.x, points.bottomLeft.y / 2)

  // Seamline
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .addClass('fabric')

  paths.fold = new Path().move(points.midLeft).line(points.midRight).addClass('help note')

  // Complete?
  if (complete) {
    points.logo = points.topLeft
      .shiftFractionTowards(points.bottomLeft, 0.65)
      .shift(0, points.topRight.x / 2)
    snippets.logo = new Snippet('logo', points.logo)

    points.title = points.logo.shift(-90, 70)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'front',
    })

    paths.cfLeft = new Path()
      .move(points.cfLeftBottom)
      .line(points.cfLeftTop)
      .addClass('note dashed')
      .addText('centerFront', 'text-sm fill-note center')
    paths.cfRight = new Path()
      .move(points.cfRightBottom)
      .line(points.cfRightTop)
      .addClass('dashed note')
      .addText('centerFront', 'text-sm fill-note center')

    points.button = points.midRight.shiftFractionTowards(points.cfRightBottom, 0.5)
    snippets.button = new Snippet('button', points.button).attr(
      'data-scale',
      absoluteOptions.waistbandWidth / 16
    )

    // Button hold on waistband
    points.buttonhole = new Point(points.cfLeftTop.x, points.button.y).shift(
      180,
      absoluteOptions.waistbandWidth / 16
    )
    snippets.buttonhole = new Snippet('buttonhole-start', points.buttonhole)
      .attr('data-scale', absoluteOptions.waistbandWidth / 16)
      .attr('data-rotate', 90)

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    let y = points.topLeft.y - 15 - sa
    // Length
    macro('hd', { y, from: points.topLeft, to: points.cfLeftTop })
    macro('hd', { y, from: points.cfLeftTop, to: points.cfRightTop })
    macro('hd', { y, from: points.cfRightTop, to: points.topRight })
    y -= 15
    macro('hd', { y, from: points.topLeft, to: points.topRight })
    // Button
    macro('hd', {
      from: points.button,
      to: points.bottomRight,
      y: points.bottomRight.y + 15 + sa,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.button,
      x: points.bottomRight.x + 15 + sa,
    })
    // Buttonhole
    let x = points.topLeft.x - 15 - sa
    macro('vd', { x, from: points.bottomLeft, to: points.buttonhole })
    // Width
    x -= 15
    macro('vd', { x, from: points.bottomLeft, to: points.midLeft })
    x -= 15
    macro('vd', { x, from: points.bottomLeft, to: points.topLeft })
  }

  return part
}

export const waistband = { name: 'waistband', draft: draftWaistband }
