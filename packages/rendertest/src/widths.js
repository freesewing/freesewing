export default function (part, demo = false) {
  const { Point, Path, points, paths, store, options } = part.shorthand()

  if (options.only === 'widths' || demo) {
    let y = store.get('y')
    const w = store.get('w')

    // Stroke widths
    y += 25
    if (!demo)
      paths.noClip = new Path()
        .move(new Point(0, y - 5))
        .line(new Point(10, y - 5))
        .attr('class', 'hidden')
    points.widths = new Point(0, y)
      .attr('data-text', 'Stroke widths')
      .attr('data-text-class', 'text-lg bold')
    for (const width of store.get('widths')) {
      y += 12
      points[`l-${width}`] = new Point(0, y)
      points[`r-${width}`] = new Point(w, y)
      paths[`color${width}`] = new Path()
        .move(points[`l-${width}`])
        .line(points[`r-${width}`])
        .attr('class', `fabric ${width}`)
        .attr('data-text', width === 'default-width' ? '' : `.${width}`)
    }

    // Update y
    store.set('y', y)
  }

  return part
}
