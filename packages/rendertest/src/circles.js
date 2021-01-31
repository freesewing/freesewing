export default function (part) {
  let { Point, Path, points, paths, store } = part.shorthand()

  let y = store.get('y')
  let w = store.get('w')
  let colors = store.get('colors')

  points.crl = new Point(0, y)
  points.crr = new Point(w, y)
  paths.circles = new Path().move(points.crl).line(points.crr).attr('data-text', 'circles')
  y += w / 2
  for (let i = 1; i < 50; i++) {
    points['cr' + i] = new Point(w / 2, y)
      .attr('data-circle', i * (w / 100))
      .attr('data-circle-class', colors[i % colors.length])
  }
  y += w / 2
  store.set('y', y)

  return part
}
