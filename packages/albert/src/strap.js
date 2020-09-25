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
    macro
  } = part.shorthand()

  let chestWidth = measurements.chestCircumference / 4
  let bibWidth = chestWidth * options.bibWidth
  let apronWidth =
    Math.max(measurements.hipsCircumference, measurements.waistCircumference) *
    (1 - options.backOpening)
  let backOpening =
    apronWidth - Math.max(measurements.hipsCircumference, measurements.waistCircumference)

  let hSpan = backOpening / 2 + bibWidth / 2
  let vSpan =
    measurements.hpsToWaistBack +
    measurements.hpsToWaistFront -
    measurements.hpsToWaistFront * options.bibLength

  let strapLength =
    Math.sqrt(hSpan * hSpan + vSpan * vSpan) + measurements.chestCircumference * options.chestDepth
  let strapWidth = options.strapWidth * sa

  console.log('chestWidth ' + chestWidth)
  console.log('backOpening ' + backOpening)
  console.log('hSpan ' + hSpan)
  console.log('vSpan ' + vSpan)
  console.log('strapLength ' + strapLength)

  points.topLeft = new Point(0, 0)
  points.topMiddle = new Point(strapWidth, 0)
  points.topRight = new Point(strapWidth * 2, 0)
  points.bottomLeft = new Point(0, strapLength)
  points.bottomMiddle = new Point(strapWidth, strapLength)
  points.bottomRight = new Point(strapWidth * 2, strapLength)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  paths.fold = new Path()
    .move(points.topMiddle)
    .line(points.bottomMiddle)
    .attr('class', 'various dashed')
    .attr('data-text', 'fold')
    .attr('data-text-class', 'text-xs center')

  // Complete?
  if (complete) {
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.5)
    points.title = points.logo.shift(-90, 50)
    macro('title', {
      nr: 2,
      at: points.title,
      title: 'Strap'
    })
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - sa - 15
    })
  }

  return part
}
