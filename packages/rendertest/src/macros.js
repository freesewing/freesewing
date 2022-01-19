export default function (part, demo = false) {
  const { macro, Point, Path, points, paths, store, options } = part.shorthand()

  if (options.only === 'macros' || demo) {
    let y = store.get('y')
    const w = store.get('w')
    y += 10
    if (!demo)
      paths.noClip = new Path().move(new Point(0, y)).line(new Point(10, y)).attr('class', 'hidden')
    else
      points.macros = new Point(0, y)
        .attr('data-text', 'Macros')
        .attr('data-text-class', 'text-lg bold')

    // title
    y += 60
    macro('title', {
      at: new Point(10, y),
      nr: 5,
      title: 'title',
    })

    // grainline
    y += 40
    macro('grainline', {
      from: new Point(0, y),
      to: new Point(w, y),
    })

    // cutonfold
    y += 35
    macro('cutonfold', {
      from: new Point(0, y),
      to: new Point(w, y),
    })

    // cutonfold * grainline
    y += 30
    macro('cutonfold', {
      from: new Point(0, y),
      to: new Point(w, y),
      grainline: true,
      prefix: 'combo',
    })

    // hd, vd, ld, and pd
    y += 30
    points.dimf = new Point(20, y)
    points.dimt = new Point(w - 20, y + 120)
    points.dimv = new Point(20, y + 80)
    paths.dims = new Path().move(points.dimf)._curve(points.dimv, points.dimt)
    macro('hd', {
      from: points.dimf,
      to: points.dimt,
      text: 'hd',
      y: y - 15,
    })
    macro('vd', {
      from: points.dimt,
      to: points.dimf,
      text: 'vd',
      x: 0,
    })
    macro('ld', {
      from: points.dimf,
      to: points.dimt,
      text: 'ld',
    })
    macro('pd', {
      path: paths.dims,
      text: 'pd',
      d: 10,
    })

    // scalebox
    y += 170
    macro('scalebox', {
      at: new Point(w / 2, y),
    })

    // miniscale
    y += 45
    macro('miniscale', {
      at: new Point(w / 2, y),
    })

    store.set('y', y)
  }

  return part
}
