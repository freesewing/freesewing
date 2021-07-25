export default function (part) {
  const {
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro,
    store
  } = part.shorthand()

  const w = store.get('gussetLength')
  points.top = new Point(0, 0)
  points.bottom = new Point(0, w)
  points.right = points.bottom.rotate(33.0, points.top)
  points.cp1 = new Point(0, w * 6 / 5).rotate(90, points.bottom)
  points.cp2 = new Point(points.right.x, points.right.y * 6 / 5).rotate(-60, points.right)
  points.title = new Point(0, 2 * w / 3).rotate(15, points.top)

  paths.hat = new Path()
    .move(points.right)
    .line(points.top)
    .line(points.bottom)
    .attr('class', 'fabric')

  paths.curve = new Path()
    .move(points.bottom)
    .curve(points.cp1, points.cp2, points.right)
    .attr('class', 'fabric')

  paths.seam = paths.hat.join(paths.curve)

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: new Point(points.top.x, points.top.y + 50),
      to: points.bottom,
      grainline: true
    })
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'gusset'
    })
    points.logo = points.title.shift(-75, 100)
    snippets.logo = new Snippet('logo', points.logo)
    if (sa) {
      paths.sa = paths.hat.offset(sa).join(paths.curve.offset(3 * sa)).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15
    })
  }

  return part
}
