export const draftRibbing = function(part, length) {
  let {
    store,
    measurements,
    options,
    points,
    paths,
    Path,
    Point,
    sa,
    complete,
    paperless,
    macro,
    units
  } = part.shorthand()
  if (typeof store.get('ribbingHeight') === 'undefined') {
    store.set('ribbingHeight', measurements.hpsToHipsBack * options.ribbingHeight)
  }
  let height = store.get('ribbingHeight')
  let gap = 25
  let lead = 50
  if (length < 125) lead = length / 3

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(height * 2, 0)
  points.leftGapStart = new Point(0, lead)
  points.rightGapEnd = new Point(points.topRight.x, lead)
  points.leftGapEnd = new Point(0, lead + gap)
  points.rightGapStart = new Point(points.topRight.x, lead + gap)
  points.bottomLeft = new Point(0, gap + 2 * lead)
  points.bottomRight = new Point(points.topRight.x, gap + 2 * lead)

  paths.seam = new Path()
    .move(points.rightGapEnd)
    .line(points.topRight)
    .line(points.topLeft)
    .line(points.leftGapStart)
    .move(points.leftGapEnd)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.rightGapStart)
    .attr('class', 'various')

  paths.hint = new Path()
    .move(points.leftGapStart)
    .line(points.leftGapEnd)
    .move(points.rightGapStart)
    .line(points.rightGapEnd)
    .attr('class', 'various dashed')

  if (complete) {
    points.title = new Point(points.bottomRight.x / 2, points.bottomRight.y / 2)
    if (sa) {
      paths.sa = new Path()
        .move(points.topLeft)
        .line(points.bottomLeft)
        .line(points.bottomRight)
        .line(points.topRight)
        .line(points.topLeft)
        .close()
        .offset(sa)
        .attr('class', 'various sa')
    }
  }

  if (paperless) {
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
      text: units(length)
    })
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topRight.y - sa - 15
    })
  }
}
