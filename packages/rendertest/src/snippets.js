export default function (part, demo = false) {
  const { Point, Path, points, paths, snippets, Snippet, store, options } = part.shorthand()

  if (options.only === 'snippets' || demo) {
    let y = store.get('y')
    let w = store.get('w')

    const snips = {
      logo: 35,
      notch: 15,
      bnotch: 15,
      button: 15,
      buttonhole: 25,
      'buttonhole-start': 15,
      'buttonhole-end': 25,
      'snap-socket': 25,
      'snap-stud': 15,
    }
    y += 20
    if (!demo)
      paths.noClip = new Path()
        .move(new Point(0, y - 5))
        .line(new Point(10, y - 5))
        .attr('class', 'hidden')
    else
      points.snippets = new Point(0, y)
        .attr('data-text', 'Snippets')
        .attr('data-text-class', 'text-lg bold')
    y += 10
    points['sl1'] = new Point(w * 0.25, y)
    points['sl2'] = new Point(w * 0.5, y)
    points['sl3'] = new Point(w * 0.75, y)
    points['sl1']
      .attr('data-text', 'data-scale: 1\ndata-rotate: 0')
      .attr('data-text-class', 'center text')
      .attr('data-text-lineheight', 7)
    points['sl2']
      .attr('data-text', 'data-scale: 1.25\ndata-rotate: 0')
      .attr('data-text-class', 'center text')
      .attr('data-text-lineheight', 7)
    points['sl3']
      .attr('data-text', 'data-scale: 0.75\ndata-rotate: 90')
      .attr('data-text-class', 'center text')
      .attr('data-text-lineheight', 7)
    y += 55
    for (let i in snips) {
      points['snt' + i] = new Point(0, y)
      points['snt' + i].attr('data-text', i)
      points['sn1' + i] = new Point(w * 0.3, y)
      points['sn2' + i] = new Point(w * 0.55, y)
      points['sn3' + i] = new Point(w * 0.8, y)
      snippets['sn1' + i] = new Snippet(i, points['sn1' + i])
      snippets['sn2' + i] = new Snippet(i, points['sn2' + i])
      snippets['sn2' + i].attr('data-scale', 1.25)
      snippets['sn3' + i] = new Snippet(i, points['sn3' + i])
      snippets['sn3' + i].attr('data-scale', 0.75).attr('data-rotate', 90)
      y += snips[i]
    }
    store.set('y', y)
    if (!demo) paths.noClip.line(new Point(w, y))
  }

  return part
}
