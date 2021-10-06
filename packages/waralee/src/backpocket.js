export default function (part) {
  let {
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
  } = part.shorthand()

  let pocketDepth = options.backPocketDepth

  points.topLeft = new Point(0, 0)
  points.bottomLeft = points.topLeft.shift(
    270,
    (pocketDepth + 30) * 2 +
      options.backPocketVerticalOffset * (measurements.crotchDepth - measurements.waistToHips)
  )

  points.topRight = points.topLeft.shift(
    0,
    options.backPocketSize * (measurements.crotchDepth - measurements.waistToHips) + 24
  )
  points.bottomRight = points.topRight.shift(
    270,
    (pocketDepth + 30) * 2 +
      options.backPocketVerticalOffset * (measurements.crotchDepth - measurements.waistToHips)
  )

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    points.title = points.topLeft.shift(270, 75).shift(0, 50)
    macro('title', {
      nr: 4,
      at: points.title,
      title: 'backPocket',
    })

    points.logo = points.title.shift(270, 75)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo
      .shift(-90, 25)
      .attr('data-text', 'Waralee')
      .attr('data-text-class', 'center')
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y + 15,
    })
    macro('vd', {
      from: points.topLeft,
      to: points.bottomLeft,
      x: points.topLeft.x + 15,
    })
  }

  return part
}
