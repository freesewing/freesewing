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
  // Simple skirt outline for the front panel
  points.topLeft = new Point(0, 0)
  points.cfRightTop = new Point(store.get('hips'), 0)
  points.topRight = new Point(
    store.get('hips') + absoluteOptions.waistbandWidth * options.waistbandOverlap,
    0
  )
  points.bottomLeft = new Point(0, absoluteOptions.waistbandWidth * 2)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
  points.cfRightBottom = new Point(points.cfRightTop.x, points.bottomRight.y)
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
      .shiftFractionTowards(points.bottomLeft, 0.3)
      .shift(0, points.topRight.x / 3)
    snippets.logo = new Snippet('logo', points.logo)

    points.title = points.logo.shift(-90, 70)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'front',
    })

    paths.cfLeft = new Path()
      .move(points.bottomLeft)
      .line(points.topLeft)
      .addClass('hidden')
      .addText('centerFront', 'text-sm fill-note center')
      .attr('data-text-dy', 7)
    paths.cfRight = new Path()
      .move(points.cfRightBottom)
      .line(points.cfRightTop)
      .addClass('dashed note')
      .addText('centerFront', 'text-sm fill-note center')
      .attr('data-text-dy', 7)

    points.button = points.midRight.shiftFractionTowards(points.cfRightBottom, 0.5)
    snippets.button = new Snippet('button', points.button).attr(
      'data-scale',
      absoluteOptions.waistbandWidth / 16
    )

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part
}

export const waistband = { name: 'waistband', draft: draftWaistband }
