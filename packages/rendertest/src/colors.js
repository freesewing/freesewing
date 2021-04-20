export default function (part) {
  let { Point, Path, points, paths, store } = part.shorthand()

  let y = store.get('y')
  let w = store.get('w')
  let colors = store.get('colors')
  let sizes = ['xs', 'sm', '', 'l', 'xl']
  let utility = ['dotted', 'dashed', 'lashed', 'sa', 'help', 'hidden']

  for (let i = 0; i < utility.length; i++) {
    y += 15
    points['l' + i] = new Point(0, y)
    points['r' + i] = new Point(w, y)
    paths['heading' + i] = new Path()
      .move(points['l' + i])
      .line(points['r' + i])
      .attr('class', colors[i])
      .attr('data-text', colors[i])
    for (let j = 0; j < sizes.length; j++) {
      y += 10
      points['sl' + i + j] = new Point(0, y)
      points['sr' + i + j] = new Point(w, y)
      paths['size' + i + j] = new Path()
        .move(points['sl' + i + j])
        .line(points['sr' + i + j])
        .attr('class', colors[i])
        .attr('class', 'stroke-' + sizes[j])
        .attr('data-text', 'path.' + colors[i] + (sizes[j] === '' ? '' : '.stroke-' + sizes[j]))
        .attr('data-text-class', 'center')
    }
    for (let j = 0; j < utility.length; j++) {
      y += 10
      points['ul' + i + j] = new Point(0, y)
      points['ur' + i + j] = new Point(w, y)
      paths['util' + i + j] = new Path()
        .move(points['ul' + i + j])
        .line(points['ur' + i + j])
        .attr('class', colors[i])
        .attr('class', utility[j])
        .attr('data-text', 'path.' + colors[i] + '.' + utility[j])
        .attr('data-text-class', 'center')
    }
  }

  y += 10
  points.ftl = new Point(0, y)
  points.ftr = new Point(w, y)
  paths.snip = new Path().move(points.ftl).line(points.ftr).attr('data-text', 'fill')
  y += 15
  for (let i of colors) {
    let h = 10
    points['_bl' + i] = new Point(0, y)
    points['_br' + i] = new Point(w, y)
    points['_tr' + i] = new Point(w, y - h)
    points['_tl' + i] = new Point(0, y - h)
    paths['box' + i] = new Path()
      .move(points['_bl' + i])
      .line(points['_br' + i])
      .line(points['_tr' + i])
      .line(points['_tl' + i])
      .close()
      .attr('class', i)
      .attr('class', 'fill-' + i)
      .attr('data-text', '.fill-' + i)
    if (i === 'fabric') paths['box' + i].attr('data-text-class', 'fill-mark')
    y += h * 1.2
  }
  store.set('y', y)

  return part
}
