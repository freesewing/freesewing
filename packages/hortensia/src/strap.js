export default function (part) {
  let { store, options, Point, Path, points, paths, complete, sa, paperless, macro } =
    part.shorthand()

  let w = options.handleWidth
  let h = store.get('depth') * options.strapLength
  if (sa > w * 0.8) {
    sa = w * 0.8
  }

  points.topLeft = new Point(-w, 0)
  points.topMiddle = new Point(0, 0)
  points.topRight = new Point(w, 0)
  points.bottomLeft = new Point(-w, h)
  points.bottomMiddle = new Point(0, h)
  points.bottomRight = new Point(w, h)

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
    .attr('data-text', 'FoldLine')
    .attr('data-text-class', 'center text-xs')
    .attr('class', 'lining dashed')

  // Complete?
  if (complete) {
    points.title = points.topMiddle.shiftFractionTowards(points.bottomMiddle, 0.25)
    macro('title', {
      at: points.title,
      nr: 5,
      title: 'Strap',
      rotation: 90,
      scale: 0.25,
    })
    points.__titleNr.attr('data-text-class', 'center')
    points.__titleName.attr('data-text-class', 'center')
    points.__titlePattern.attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
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
