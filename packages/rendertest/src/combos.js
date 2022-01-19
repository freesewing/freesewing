export default function (part, demo = false) {
  const { Point, Path, points, paths, store, options } = part.shorthand()

  if (options.only === 'combos' || demo) {
    let y = store.get('y')
    const w = store.get('w')

    // Stroke combos
    y += 25
    if (!demo)
      paths.noClip = new Path()
        .move(new Point(0, y - 5))
        .line(new Point(10, y - 5))
        .attr('class', 'hidden')
    points.combos = new Point(0, y)
      .attr('data-text', 'Combining stroke classes')
      .attr('data-text-class', 'text-lg bold')

    y += 12
    points.combo1l = new Point(0, y)
    points.combo1r = new Point(w, y)
    paths.combo1 = new Path()
      .move(points.combo1l)
      .line(points.combo1r)
      .attr('class', 'lining sa')
      .attr('data-text', `.lining.sa`)

    y += 12
    points.combo2l = new Point(0, y)
    points.combo2r = new Point(w, y)
    paths.combo2 = new Path()
      .move(points.combo2l)
      .line(points.combo2r)
      .attr('class', 'stroke-lg various help')
      .attr('data-text', `.stroke-lg various help`)

    // Update y
    store.set('y', y)
  }

  return part
}
