import { shared } from './shared.mjs'

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
  points.topLeft = new Point(absoluteOptions.flyWidth * -1, 0)
  points.bottomLeft = new Point(points.topLeft.x, absoluteOptions.waistbandWidth * 2)

  // Fly shield edge on the buttonhole side
  points.flyTop = new Point(0, 0)
  points.flyBottom = new Point(0, points.bottomLeft.y)

  // Edge of the waistband on the button side
  points.topRight = new Point(store.get('hips'), points.topLeft.y)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)

  // Fold in the middle
  points.midLeft = new Point(points.topLeft.x, points.bottomLeft.y / 2)
  points.midRight = new Point(points.topRight.x, points.midLeft.y)

  // Seamline
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')

  // Complete?
  if (complete) {
    paths.fold = new Path().move(points.midLeft).line(points.midRight).addClass('help note')
    macro('banner', {
      path: paths.fold,
      text: 'foldHere',
      className: 'text-sm fill-note',
      repeat: 50,
    })

    points.logo = points.topLeft
      .shiftFractionTowards(points.bottomLeft, 0.65)
      .shift(0, points.topRight.x / 2)
    snippets.logo = new Snippet('logo', points.logo)

    points.title = points.logo.shift(0, 70)
    macro('title', {
      at: points.title,
      nr: 7,
      title: 'waistband',
    })

    paths.flyEdge = new Path()
      .move(points.flyBottom)
      .line(points.flyTop)
      .addClass('note dashed')
      .addText('flyEdge', 'text-sm fill-note center')

    // Button hole
    points.buttonhole = points.midLeft
      .shiftFractionTowards(points.flyBottom, 0.5)
      .shift(180, absoluteOptions.waistbandWidth / 12)
    snippets.buttonhole = new Snippet('buttonhole-start', points.buttonhole)
      .attr('data-scale', absoluteOptions.waistbandWidth / 16)
      .attr('data-rotate', 90)

    // Button
    points.button = new Point(points.topRight.x - absoluteOptions.flyWidth / 2, points.buttonhole.y)
    snippets.button = new Snippet('button', points.button).attr(
      'data-scale',
      absoluteOptions.waistbandWidth / 16
    )

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (false && paperless) {
    let y = points.topLeft.y - 15 - sa
    // Length
    macro('hd', { y, from: points.topLeft, to: points.flyTop })
    macro('hd', { y, from: points.flyTop, to: points.flyTop })
    macro('hd', { y, from: points.flyTop, to: points.topRight })
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

export const waistband = {
  name: 'collab:waistband',
  draft: draftWaistband,
  after: shared,
}
