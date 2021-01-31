export default (part) => {
  let { points, Point, paths, Path, complete, paperless, store, macro } = part.shorthand()

  points.topLeft = new Point(0, 0)
  points.bottomRight = new Point(store.get('backTip') * 3.5, store.get('backTip'))
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)

    macro('title', {
      nr: 7,
      title: 'loop',
      at: points.title
    })
  }

  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomRight.y + 15
    })
    macro('vd', {
      from: points.topRight,
      to: points.bottomRight,
      x: points.topRight.x + 15
    })
  }

  return part
}
