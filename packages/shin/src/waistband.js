export default function (part) {
  let {
    store,
    macro,
    Point,
    Path,
    points,
    paths,
    complete,
    paperless,
    sa,
    utils,
    absoluteOptions,
  } = part.shorthand()

  let height = absoluteOptions.elasticWidth * 2
  points.topLeft = new Point(0, 0)
  points.bottomLeft = new Point(0, height)
  points.topMidLeft = new Point(height, 0)
  points.bottomMidLeft = new Point(height, height)
  points.topMidRight = new Point(height * 1.5, 0)
  points.bottomMidRight = new Point(height * 1.5, height)
  points.topRight = new Point(height * 2.5, 0)
  points.bottomRight = new Point(height * 2.5, height)

  paths.seam = new Path()
    .move(points.topMidLeft)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomMidLeft)
    .move(points.bottomMidRight)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topMidRight)
    .attr('class', 'fabric')
  paths.hint = new Path()
    .move(points.topMidRight)
    .line(points.topMidLeft)
    .move(points.bottomMidLeft)
    .line(points.bottomMidRight)
    .attr('class', 'fabric dashed')

  // Complete?
  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'waistband',
    })
    if (sa) {
      paths.sa = new Path()
        .move(points.topLeft)
        .line(points.bottomLeft)
        .line(points.bottomRight)
        .line(points.topRight)
        .line(points.topLeft)
        .close()
        .offset(sa)
        .attr('class', 'fabric sa')
    }
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y - 10,
      text: utils.units(store.get('hips') * 2),
    })
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}
