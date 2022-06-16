export default function (part) {
  /**
   * The straight waistband is just a rectangle with the width
   * of double the waistband width, since it will be folded
   */
  const {
    store,
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
    absoluteOptions,
  } = part.shorthand()

  // Calculate the corners of the rectangle and other auxiliar points
  points.center = new Point(0, 0)
  points.centerLeft = new Point(store.get('topCircumference') / -2, 0)
  points.centerRight = new Point(
    store.get('topCircumference') / 2 + store.get('waistbandOverlap'),
    0
  )
  points.topRight = points.centerRight.shift(90, absoluteOptions.waistbandWidth)
  points.topLeft = points.centerLeft.shift(90, absoluteOptions.waistbandWidth)
  points.bottomRight = points.topRight.flipY()
  points.bottomLeft = points.topLeft.flipY()

  // Draft the rectangle
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Draft the foldline
  paths.fold = new Path()
    .move(points.centerRight)
    .line(points.centerLeft)
    .attr('class', 'fabric dashed')

  // Complete pattern?
  if (complete) {
    points.title = points.center.shiftFractionTowards(points.centerRight, 0.5)
    macro('title', { at: points.title, nr: 2, title: 'straightWaistband' })
    points.grainlineFrom = points.centerLeft.shiftFractionTowards(points.topLeft, 0.5)
    points.grainlineTo = points.grainlineFrom.flipX()
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })
    points.button = points.centerRight
      .shiftFractionTowards(points.bottomRight, 0.5)
      .shift(180, store.get('waistbandOverlap') / 2)
    points.buttonhole = points.centerLeft
      .shiftFractionTowards(points.bottomLeft, 0.5)
      .shift(0, store.get('waistbandOverlap') / 2)
    snippets.button = new Snippet('button', points.button)
    snippets.buttonhole = new Snippet('buttonhole', points.buttonhole)
    points.centerNotch = new Point((-1 * store.get('waistbandOverlap')) / 2, points.bottomLeft.y)
    points.buttonNotch = points.bottomRight.shift(180, store.get('waistbandOverlap'))
    macro('sprinkle', {
      snippet: 'notch',
      on: ['centerNotch', 'buttonNotch', 'bottomLeft'],
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}
