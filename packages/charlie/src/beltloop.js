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

  let length = measurements.waist * options.waistbandWidth * options.waistbandFactor * 1.2
  let width = length / 5

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(width, 0)
  points.bottomLeft = new Point(0, length)
  points.bottomRight = new Point(width, length)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    macro('title', {
      at: new Point(width / 4, length / 4),
      nr: 666,
      title: 'beltLoop',
      scale: 0.3,
      rotation: 90
    })
    if (sa)
      paths.sa = new Path()
        .move(points.topLeft.shift(180, sa).shift(90, 2 * sa))
        .line(points.bottomLeft.shift(180, sa).shift(-90, 2 * sa))
        .line(points.bottomRight.shift(0, sa).shift(-90, 2 * sa))
        .line(points.topRight.shift(0, sa).shift(90, 2 * sa))
        .line(points.topLeft.shift(180, sa).shift(90, 2 * sa))
        .close()
        .attr('class', 'sa fabric')

    if (paperless) {
    }
  }

  return part
}
