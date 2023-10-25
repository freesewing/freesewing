function draft({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  macro,
  store,
  part,
}) {
  // Pocket seams here
  const pocketLength = 800 * options.length
  const pocketWidth = 500 * options.width
  const pocketEdge = options.edge

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(pocketWidth, 0)
  points.bottomLeft = new Point(0, pocketLength)
  points.bottomRight = new Point(pocketWidth, pocketLength)

  // Center point
  points.center = new Point(pocketWidth / 2, 0)

  // Slit end
  points.middle = points.center.shift(270, pocketLength * 0.525)

  // Top
  points.centerRight = points.center.shift(0, pocketWidth * pocketEdge)
  points.centerLeft = points.center.shift(180, pocketWidth * pocketEdge)

  // Taper point
  points.taperRight = new Point(pocketWidth, pocketLength * 0.4375)
  points.taperLeft = new Point(0, pocketLength * 0.4375)

  // Control points curve
  points.leftCp1 = points.bottomLeft.shiftFractionTowards(points.taperLeft, 2 / 7)
  points.leftCp2 = points.bottomLeft.shiftFractionTowards(points.bottomRight, 0.2)
  points.rightCp1 = points.bottomRight.shiftFractionTowards(points.taperRight, 2 / 7)
  points.rightCp2 = points.bottomRight.shiftFractionTowards(points.bottomLeft, 0.2)

  paths.seam = new Path()
    .move(points.centerLeft)
    .line(points.taperLeft)
    .line(points.leftCp1)
    .curve_(points.bottomLeft, points.leftCp2)
    .line(points.rightCp2)
    .curve_(points.bottomRight, points.rightCp1)
    .line(points.taperRight)
    .line(points.centerRight)
    .line(points.centerLeft)
    .close()

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  if (complete)
    paths.slit = new Path().move(points.center).line(points.middle).addClass('fabric dashed')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = new Point(points.middle.x, points.middle.y / 2)
  macro('title', {
    at: points.title,
    nr: 1,
    title: 'pocket',
    align: 'center',
  })

  // Logo
  points.logo = points.title.shift(-90, 90)
  snippets.logo = new Snippet('logo', points.logo)

  // Scalebox
  points.scalebox = points.middle.shift(270, pocketWidth / 5)
  macro('scalebox', { at: points.scalebox })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.leftCp1,
    to: points.rightCp1,
    y: points.bottomLeft.y + sa + 30,
  })
  macro('vd', {
    id: 'hCut',
    to: points.center,
    from: points.middle,
    x: points.topRight.x + sa + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.rightCp2,
    to: points.centerRight,
    x: points.topRight.x + sa + 30,
  })
  macro('vd', {
    id: 'hRound',
    from: points.rightCp2,
    to: new Point(points.rightCp2.x, points.rightCp1.y),
    x: points.topRight.x + sa + 15,
  })
  macro('hd', {
    id: 'wAtTop',
    from: points.centerLeft,
    to: points.centerRight,
    y: points.topLeft.y - sa - 15,
  })
  macro('hd', {
    id: 'wRound',
    from: new Point(points.rightCp2.x, points.rightCp1.y),
    to: points.rightCp1,
    y: points.bottomLeft.y + sa + 15,
  })

  return part
}

export const pocket = {
  name: 'lucy.pocket',
  options: {
    width: { pct: 50, min: 30, max: 100, menu: 'style' },
    length: { pct: 50, min: 30, max: 100, menu: 'style' },
    edge: { pct: 25, min: 20, max: 50, menu: 'style' },
  },
  draft,
}
