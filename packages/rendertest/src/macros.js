export default function (part) {
  let { macro, Point, Path, points, paths, store } = part.shorthand()

  let y = store.get('y')
  let w = store.get('w')
  y += 10
  points.ml = new Point(0, y)
  points.mr = new Point(w, y)
  paths.macros = new Path().move(points.ml).line(points.mr).attr('data-text', 'macros')

  y += 40
  macro('title', {
    at: new Point(w / 2, y),
    nr: 5,
    title: 'title'
  })

  y += 40
  macro('grainline', {
    from: new Point(0, y),
    to: new Point(w, y)
  })

  y += 20
  macro('cutonfold', {
    from: new Point(w, y),
    to: new Point(0, y)
  })

  y += 70
  points.dimf = new Point(20, y)
  points.dimt = new Point(w - 20, y + 120)
  points.dimv = new Point(20, y + 80)
  paths.dims = new Path().move(points.dimf)._curve(points.dimv, points.dimt)
  macro('hd', {
    from: points.dimf,
    to: points.dimt,
    text: 'hd',
    y: y - 15
  })
  macro('vd', {
    from: points.dimt,
    to: points.dimf,
    text: 'vd',
    x: 0
  })
  macro('ld', {
    from: points.dimf,
    to: points.dimt,
    text: 'ld'
  })
  macro('pd', {
    path: paths.dims,
    text: 'pd',
    d: 10
  })

  y += 170
  macro('scalebox', {
    at: new Point(w / 2, y)
  })
  store.set('y', y)

  return part
}
