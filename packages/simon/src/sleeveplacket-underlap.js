export default (part) => {
  const {
    measurements,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    options,
    store,
  } = part.shorthand()

  const width = Math.min(store.get('sleevePlacketWidth') / 2, 10)
  const length = measurements.shoulderToWrist * options.sleevePlacketLength

  points.midLeft = new Point(0, 0)
  points.midRight = points.midLeft.shift(0, length)
  points.fold1Left = points.midLeft.shift(90, width)
  points.fold2Left = points.midLeft.shift(-90, width)
  points.fold1Right = points.fold1Left.shift(0, length)
  points.fold2Right = points.fold2Left.shift(0, length)
  points.topLeft = points.midLeft.shift(90, width * 2 - 1.5)
  points.topRight = points.midRight.shift(90, width * 2 - 1.5)
  points.bottomLeft = points.midLeft.shift(-90, width * 2 - 1.5)
  points.bottomRight = points.midRight.shift(-90, width * 2 - 1.5)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.topRight)
    .line(points.bottomRight)
    .line(points.bottomLeft)
    .close()
    .attr('class', 'fabric')

  paths.folds = new Path()
    .move(points.fold1Left)
    .line(points.fold1Right)
    .move(points.fold2Left)
    .line(points.fold2Right)
    .move(points.midLeft)
    .line(points.midRight)
    .attr('class', 'help')

  // Complete pattern?
  if (complete) {
    // Title
    points.title = new Point(length / 4, 0)
    macro('title', {
      at: points.title,
      nr: 9,
      title: 'sleevePlacketUnderlap',
      scale: 0.6,
      append: true,
    })

    // Button
    points.button = new Point(length / 2, width / 2)
    snippets.button = new Snippet('button', points.button)

    if (sa) {
      paths.sa = new Path()
        .move(points.bottomLeft)
        .line(points.bottomLeft.shift(180, sa))
        .line(points.topLeft.shift(180, sa))
        .line(points.topLeft)
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.fold2Right,
      to: points.fold1Right,
      x: points.topRight.x + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + 30,
    })
    if (complete) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.button,
        y: points.bottomRight.y + 15,
      })
    }
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomRight.y + 30,
    })
  }

  return part
}
