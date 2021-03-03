export default function (part) {
  let { Point, Path, points, paths, snippets, Snippet, store } = part.shorthand()

  let y = store.get('y')
  let w = store.get('w')

  let snips = {
    logo: 25,
    notch: 15,
    bnotch: 15,
    button: 15,
    buttonhole: 15
  }
  y += 10
  points.tl = new Point(0, y)
  points.tr = new Point(w, y)
  paths.texts = new Path().move(points.tl).line(points.tr).attr('data-text', 'snippets')
  y += 10
  points['sl1'] = new Point(w * 0.25, y)
  points['sl2'] = new Point(w * 0.5, y)
  points['sl3'] = new Point(w * 0.75, y)
  points['sl1']
    .attr('data-text', 'data-scale: 1\ndata-rotate: 0')
    .attr('data-text-class', 'center text-sm')
    .attr('data-text-lineheight', 5)
  points['sl2']
    .attr('data-text', 'data-scale: 1.25\ndata-rotate: 0')
    .attr('data-text-class', 'center text-sm')
    .attr('data-text-lineheight', 5)
  points['sl3']
    .attr('data-text', 'data-scale: 0.75\ndata-rotate: 90')
    .attr('data-text-class', 'center text-sm')
    .attr('data-text-lineheight', 5)
  y += 55
  for (let i in snips) {
    points['snt' + i] = new Point(0, y)
    points['snt' + i].attr('data-text', i)
    points['sn1' + i] = new Point(w * 0.25, y)
    points['sn2' + i] = new Point(w * 0.5, y)
    points['sn3' + i] = new Point(w * 0.75, y)
    snippets['sn1' + i] = new Snippet(i, points['sn1' + i])
    snippets['sn2' + i] = new Snippet(i, points['sn2' + i])
    snippets['sn2' + i].attr('data-scale', 1.25)
    snippets['sn3' + i] = new Snippet(i, points['sn3' + i])
    snippets['sn3' + i].attr('data-scale', 0.75).attr('data-rotate', 90)
    y += snips[i]
  }
  store.set('y', y)

  return part
}
