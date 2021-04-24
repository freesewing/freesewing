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
    sa,
    paperless,
    macro,
  } = part.shorthand()

  let pocketDepth =
    (measurements.crotchDepth - measurements.waistToHips) * options.frontPocketDepthFactor

  points.topLeft = new Point(0, 0)
  points.bottomLeft = points.topLeft.shift(270, pocketDepth)

  points.topRight = points.topLeft.shift(0, pocketDepth * (1 / 3))
  points.bottomRight = points.topRight.shift(290, pocketDepth * (5 / 6))

  points.bottomLeftCP = points.bottomLeft.shift(0, pocketDepth * (1 / 6))
  points.bottomRightCP = points.bottomRight.shift(225, pocketDepth * (1 / 4))

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .curve(points.bottomLeftCP, points.bottomRightCP, points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.topLeft,
      to: points.bottomLeft,
      margin: 5,
      offset: 10,
    })
    points.title = points.topLeft.shift(270, 75).shift(0, 50)
    macro('title', {
      nr: 3,
      at: points.title,
      title: 'pocket',
    })

    points.logo = points.title.shift(270, 75)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo
      .shift(-90, 25)
      .attr('data-text', 'Waralee')
      .attr('data-text-class', 'center')

    if (sa) {
      paths.sa = new Path()
        .move(points.bottomLeft)
        .join(
          new Path()
            .move(points.bottomLeft)
            .curve(points.bottomLeftCP, points.bottomRightCP, points.bottomRight)
            .line(points.topRight)
            .line(points.topLeft)
            .offset(sa)
        )
        .line(points.topLeft)
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y + 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomRight.y,
    })
    macro('vd', {
      from: points.topLeft,
      to: points.bottomLeft,
      x: points.topLeft.x + 15,
    })
    macro('vd', {
      from: points.topRight,
      to: points.bottomRight,
      x: points.bottomRight.x,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.bottomLeft,
      x: points.bottomRight.x,
    })
  }

  return part
}
