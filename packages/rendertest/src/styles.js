export default function (part, demo = false) {
  const { Point, Path, points, paths, store, options } = part.shorthand()

  if (options.only === 'styles' || demo) {
    let y = store.get('y')
    const w = store.get('w')

    // Stroke styles
    y += 25
    if (!demo)
      paths.noClip = new Path()
        .move(new Point(0, y - 5))
        .line(new Point(10, y - 5))
        .attr('class', 'hidden')
    points.styles = new Point(0, y)
      .attr('data-text', 'Stroke styles')
      .attr('data-text-class', 'text-lg bold')
    for (const style of store.get('styles')) {
      y += 12
      points[`l-${style}`] = new Point(0, y)
      points[`r-${style}`] = new Point(w, y)
      paths[`color${style}`] = new Path()
        .move(points[`l-${style}`])
        .line(points[`r-${style}`])
        .attr('class', `fabric ${style}`)
        .attr('data-text', style === 'default-style' ? '' : `.${style}`)
    }

    // Update y
    store.set('y', y)
  }

  return part
}
