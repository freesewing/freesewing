export default function (part) {
  let { utils, store, sa, Point, points, Path, paths, complete, paperless, macro } =
    part.shorthand()

  points.topLeft = new Point(0, 0)
  points.midLeft = new Point(0, store.get('waistbandWidth'))
  points.bottomLeft = new Point(0, store.get('waistbandWidth') * 2)
  points.eyeletLeft = new Point(20, store.get('waistbandWidth') / 2)
  points.eyeletRight = points.eyeletLeft.shift(0, 120)

  points.midTopLeft = points.topLeft.shift(0, 60)
  points.midBottomLeft = points.bottomLeft.shift(0, 60)
  points.midTopRight = points.topLeft.shift(0, 100)
  points.midBottomRight = points.bottomLeft.shift(0, 100)

  points.topRight = points.topLeft.shift(0, 160)
  points.midRight = points.midLeft.shift(0, 160)
  points.bottomRight = points.bottomLeft.shift(0, 160)

  paths.seam = new Path()
    .move(points.midTopLeft)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .line(points.midBottomLeft)
    .move(points.midBottomRight)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.midTopRight)
    .attr('class', 'fabric')

  paths.hint = new Path()
    .move(points.midTopRight)
    .line(points.midTopLeft)
    .move(points.midBottomLeft)
    .line(points.midBottomRight)
    .attr('class', 'fabric dashed')

  macro('hd', {
    from: points.midLeft,
    to: points.midRight,
    y: points.midRight.y + 25,
    text: utils.units(store.get('frontWaist') + store.get('backWaist')),
  })

  if (complete) {
    paths.fold = new Path().move(points.midLeft).line(points.midRight).attr('class', 'help')

    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.4)
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'waistband',
    })
    macro('grainline', {
      from: points.topLeft.shift(0, 15),
      to: points.bottomLeft.shift(0, 15),
    })
    macro('sprinkle', { snippet: 'eyelet', on: ['eyeletLeft', 'eyeletRight'] })
    macro('sprinkle', { snippet: 'notch', on: ['midLeft', 'midRight'] })

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
    }
    paths.saHint = new Path()
      .move(points.bottomLeft.shift(-90, sa).shift(180, sa))
      .line(points.bottomRight.shift(-90, sa).shift(0, sa))
      .attr('class', 'help')

    if (paperless) {
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + 15 + sa,
      })
    }
  }

  return part
}
