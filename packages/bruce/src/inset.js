import init from './init'

export default function (part) {
  let { store, sa, Point, points, Path, paths, complete, paperless, macro, Snippet, snippets } =
    part.shorthand()

  // Initialize
  init(part)

  // height is 73.5%
  points.topLeft = new Point(0, 0)
  points.bottomLeft = points.topLeft.shift(-90, store.get('heightInset'))
  points.bottomRight = new Point(store.get('legInset'), points.bottomLeft.y)
  points.tip = new Point(points.bottomRight.x * 1.111, points.bottomRight.y - store.get('gusset'))
  points.tip = points.bottomRight.shiftTowards(
    points.tip,
    store.get('crotchSeamLength') - store.get('gusset') * (1 - store.get('gussetInsetRatio'))
  )
  points.tipCpTop = new Point(store.get('gusset') * 1.2, 0)
  points.tipCpBottom = points.tip.shift(
    points.bottomRight.angle(points.tip) + 90,
    store.get('gusset') * 1.5
  )

  // Store cuve length
  store.set(
    'curve',
    new Path().move(points.tip).curve(points.tipCpBottom, points.tipCpTop, points.topLeft).length()
  )

  // Path
  paths.saBase = new Path()
    .move(points.bottomRight)
    .line(points.tip)
    .curve(points.tipCpBottom, points.tipCpTop, points.topLeft)
    .line(points.bottomLeft)
    .setRender(false)
  paths.hemBase = new Path().move(points.bottomLeft).line(points.bottomRight).setRender(false)
  paths.seam = paths.saBase.join(paths.hemBase).close().attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(paths.hemBase.offset(sa * 2))
        .close()
        .attr('class', 'fabric sa')
    }
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      at: points.title.shift(-90, 15),
      nr: 4,
      title: 'inset',
    })
    macro('grainline', {
      from: points.bottomLeft.shift(0, 15),
      to: points.topLeft.shift(0, 15),
    })
    snippets.notch = new Snippet(
      'notch',
      new Path()
        .move(points.tip)
        .curve(points.tipCpBottom, points.tipCpTop, points.topLeft)
        .shiftFractionAlong(0.5)
    )
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - 15 - sa,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.tip,
      x: points.tip.x + 15 + sa,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomRight.y + 15 + sa,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.tip,
      y: points.bottomRight.y + 30 + sa,
    })
  }

  return part
}
