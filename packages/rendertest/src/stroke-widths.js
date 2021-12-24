export default function (part) {
  const { Point, Path, points, paths, store } = part.shorthand()

  let y = store.get('y')
  const w = store.get('w')

  // Stroke widths
  y += 25
  points.widths = new Point(0,y)
    .attr('data-text', 'Stroke widths')
    .attr('data-text-class', 'text-lg bold')
  for (const width of store.get('widths')) {
    y += 12
    points[`l-${width}`] = new Point(0,y)
    points[`r-${width}`] = new Point(w,y)
    paths[`color${width}`] = new Path()
      .move(points[`l-${width}`])
      .line(points[`r-${width}`])
      .attr('class', `fabric ${width}`)
      .attr('data-text', width === 'default-width' ? '' : `.${width}`)
  }

  // Update y
  store.set('y', y)

  return part
}
