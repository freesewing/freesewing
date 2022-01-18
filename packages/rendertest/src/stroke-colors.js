export default function (part) {
  const { Point, Path, points, paths, store } = part.shorthand()

  let y = store.get('y')
  const w = store.get('w')

  // Stroke colors
  y += 10
  points.colors = new Point(0,y)
    .attr('data-text', 'Stroke colors')
    .attr('data-text-class', 'text-lg bold')
  for (const color of store.get('colors').sort()) {
    y += 12
    points[`l-${color}`] = new Point(0,y)
    points[`r-${color}`] = new Point(w,y)
    paths[`color${color}`] = new Path()
      .move(points[`l-${color}`])
      .line(points[`r-${color}`])
      .attr('class', color)
      .attr('data-text', `.${color}`)
  }

  // Update y
  store.set('y', y)

  return part
}
