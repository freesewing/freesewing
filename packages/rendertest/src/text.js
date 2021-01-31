export default function (part) {
  let { Point, Path, points, paths, store } = part.shorthand()

  let y = store.get('y')
  let w = store.get('w')
  let text = ['xs', 'sm', '', 'l', 'xl', 'xxl']
  y += 10
  points.tl = new Point(0, y)
  points.tr = new Point(w, y)
  paths.text = new Path().move(points.tl).line(points.tr).attr('data-text', 'text')
  y += 10
  points.tlc = new Point(0, y)
  points.trc = new Point(w, y)
  paths.textc = new Path()
    .move(points.tlc)
    .line(points.trc)
    .attr('data-text', 'text.center')
    .attr('data-text-class', 'center')
  y += 10
  points.tlr = new Point(0, y)
  points.trr = new Point(w, y)
  paths.textr = new Path()
    .move(points.tlr)
    .line(points.trr)
    .attr('data-text', 'text.right')
    .attr('data-text-class', 'right')
  for (let i = 0; i < text.length; i++) {
    y += 15
    points['t' + i] = new Point(0, y)
      .attr('data-text', 'text' + (text[i] === '' ? '' : '.text-' + text[i]))
      .attr('data-text-class', 'text-' + text[i])
  }
  store.set('y', y)

  return part
}
