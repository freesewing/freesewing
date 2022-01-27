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

  const width = store.get('sleevePlacketWidth')
  const length = measurements.shoulderToWrist * options.sleevePlacketLength

  points.midLeft = new Point(0, 0)
  points.midLen = points.midLeft.shift(0, length)
  points.midRight = points.midLeft.shift(0, length + width * 1.25)
  points.fold1Left = points.midLeft.shift(90, width / 2)
  points.fold2Left = points.midLeft.shift(-90, width / 2)
  points.boxTopRight = points.midRight.shift(90, width / 2)
  points.boxBottomRight = points.midRight.shift(-90, width / 2)
  points.boxTopLeft = points.fold1Left.shift(0, length - width * 0.25)
  points.boxBottomLeft = points.fold2Left.shift(0, length - width * 0.25)
  points.boxTip = points.midLen.shift(0, width * 1.5)
  points.fold1Right = points.boxTopRight.shift(0, width * 0.5)
  points.fold2Right = points.boxBottomRight.shift(0, width * 0.5)
  points.topLeft = points.fold1Left.shift(90, width / 2 - 1.5)
  points.topRight = points.fold1Right.shift(90, width / 2 - 1.5)
  points.bottomRight = points.fold2Right.shift(-90, width * 1.5 - 1.5)
  points.bottomLeft = points.fold2Left.shift(-90, width * 1.5 - 1.5)
  points.fold3Left = new Point(0, width * 1.5)
  points.fold3Right = new Point(length, width * 1.5)
  points.cutBottom = new Point(length, points.bottomLeft.y)
  points.cutLeft = points.fold3Right.shift(90, width * 0.1 + 1.5)
  points.cutRight = points.fold2Right.shift(-90, width / 2 - 1.5)
  points.zig = points.cutRight.shift(180, width * 0.6)
  points.zag = new Point(points.bottomRight.x - width, points.cutLeft.y)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.topRight)
    .line(points.cutRight)
    .line(points.zig)
    .line(points.zag)
    .line(points.cutLeft)
    .line(points.cutBottom)
    .line(points.bottomLeft)
    .close()
    .attr('class', 'fabric')

  paths.outline = new Path()
    .move(points.fold1Left)
    .line(points.boxTopRight)
    .line(points.boxTip)
    .line(points.boxBottomRight)
    .line(points.fold2Left)
    .move(points.boxTopLeft)
    .line(points.boxBottomLeft)
    .attr('class', 'dashed')

  paths.folds = new Path()
    .move(points.fold3Left)
    .line(points.fold3Right)
    .move(points.boxBottomRight)
    .line(points.fold2Right)
    .line(points.boxTip)
    .line(points.fold1Right)
    .line(points.boxTopRight)
    .attr('class', 'dotted')

  // Complete pattern?
  if (complete) {
    // Title
    points.title = new Point(length / 4, 0)
    macro('title', {
      at: points.title,
      nr: 10,
      title: 'sleevePlacketOverlap',
      scale: 0.6,
    })

    // Button
    points.buttonhole = new Point(length / 2, 0)
    snippets.buttonhole = new Snippet('buttonhole', points.buttonhole).attr('data-rotate', 90)

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
    macro('hd', {
      from: points.bottomLeft,
      to: points.cutBottom,
      y: points.bottomLeft.y + 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.zag,
      y: points.bottomLeft.y + 30,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.zig,
      y: points.bottomLeft.y + 45,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.cutRight,
      y: points.bottomLeft.y + 60,
    })
    macro('vd', {
      from: points.fold1Right,
      to: points.topRight,
      x: points.topRight.x + 15,
    })
    macro('vd', {
      from: points.boxTip,
      to: points.topRight,
      x: points.topRight.x + 30,
    })
    macro('vd', {
      from: points.fold2Right,
      to: points.topRight,
      x: points.topRight.x + 45,
    })
    macro('vd', {
      from: points.cutRight,
      to: points.topRight,
      x: points.topRight.x + 60,
    })
    macro('vd', {
      from: points.zag,
      to: points.topRight,
      x: points.topRight.x + 75,
    })
    macro('vd', {
      from: points.cutBottom,
      to: points.topRight,
      x: points.topRight.x + 90,
    })
    macro('hd', {
      from: points.topLeft,
      to: points.boxTopLeft,
      y: points.topLeft.y - 15,
    })
    macro('hd', {
      from: points.topLeft,
      to: points.boxTopRight,
      y: points.topLeft.y - 30,
    })
  }

  return part
}
