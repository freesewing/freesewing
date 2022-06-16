export default function (part) {
  let { store, sa, Point, points, Path, paths, options, complete, paperless, macro } =
    part.shorthand()
  if (!options.elasticatedHem) {
    part.render = false
    return part
  }

  let len = store.get('frontAnkle') + store.get('backAnkle')
  points.topLeft = new Point(0, 0)
  points.midLeft = new Point(0, store.get('ankleElastic') * 1.05)
  points.bottomLeft = new Point(0, store.get('ankleElastic') * 2.1)

  points.topRight = points.topLeft.shift(0, len)
  points.midRight = points.midLeft.shift(0, len)
  points.bottomRight = points.bottomLeft.shift(0, len)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    paths.fold = new Path().move(points.midLeft).line(points.midRight).attr('class', 'help')

    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.4)
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'cuff',
    })
    macro('grainline', {
      from: points.topLeft.shift(0, 15),
      to: points.bottomLeft.shift(0, 15),
    })

    if (sa) {
      paths.sa = new Path()
        .move(points.topLeft)
        .line(points.bottomLeft.shift(-90, 2 * sa))
        .line(points.bottomRight.shift(-90, 2 * sa))
        .line(points.topRight)
        .line(points.topLeft)
        .close()
        .offset(sa)
        .attr('class', 'fabric sa')
      paths.saHint = new Path()
        .move(points.bottomLeft.shift(-90, sa).shift(180, sa))
        .line(points.bottomRight.shift(-90, sa).shift(0, sa))
        .attr('class', 'help')
    }
  }

  if (paperless) {
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + 15 + sa,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomRight.y + 15 + sa,
    })
  }

  return part
}
