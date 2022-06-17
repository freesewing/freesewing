export default function (part, demo = false) {
  const { Point, Path, points, paths, store, options } = part.shorthand()

  if (options.only === 'colors' || demo) {
    let y = store.get('y')
    const w = store.get('w')

    // Stroke colors
    y += 10
    if (!demo)
      paths.noClip = new Path()
        .move(new Point(0, y - 5))
        .line(new Point(10, y - 5))
        .attr('class', 'hidden')
    points.colors = new Point(0, y)
      .attr('data-text', 'Stroke colors')
      .attr('data-text-class', 'text-lg bold')
    for (const color of store.get('colors').sort()) {
      y += 12
      points[`l-${color}`] = new Point(0, y)
      points[`r-${color}`] = new Point(w, y)
      paths[`color${color}`] = new Path()
        .move(points[`l-${color}`])
        .line(points[`r-${color}`])
        .attr('class', color)
        .attr('data-text', `.${color}`)
    }

    // Update y
    store.set('y', y)
  }

  return part
}
