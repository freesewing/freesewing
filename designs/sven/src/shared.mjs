export const draftRibbing = function (
  { store, measurements, options, points, paths, Path, Point, sa, macro, units, part },
  length
) {
  const height = (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight
  if (part.context.settings.sample) store.set('ribbingHeight', height)
  else store.setIfUnset('ribbingHeight', height)

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(height * 2, 0)
  points.bottomLeft = new Point(0, length)
  points.bottomRight = new Point(height * 2, length)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'various')
  if (sa) paths.sa = paths.seam.offset(sa).addClass('various sa')

  points.title = new Point(points.bottomRight.x / 2, points.bottomRight.y / 2)

  macro('vd', {
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
    text: units(length),
  })
  macro('hd', {
    from: points.topLeft,
    to: points.topRight,
    y: points.topRight.y - sa - 15,
  })
}
