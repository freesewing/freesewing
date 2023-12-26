import { front } from './front.mjs'

function pacoCuff({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  options,
  complete,
  expand,
  units,
  macro,
  part,
}) {
  if (!options.elasticatedCuff) return part.hide()

  const l = store.get('frontAnkle') + store.get('backAnkle')
  const w = store.get('ankleElastic') * 1.05

  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `paco:cutCuff`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(w * 2 + 2 * extraSa),
        l: units(l + extraSa),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  points.topLeft = new Point(0, 0)
  points.topMid = new Point(w, 0)
  points.topRight = new Point(2 * w, 0)
  points.bottomLeft = new Point(0, l)
  points.bottomMid = new Point(w, l)
  points.bottomRight = new Point(2 * w, l)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (complete)
    paths.fold = new Path().move(points.topMid).line(points.bottomMid).attr('class', 'help')

  if (sa)
    paths.sa = new Path()
      .move(points.topLeft.shift(180, 2 * sa))
      .line(points.bottomLeft.shift(180, 2 * sa))
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft.shift(180, 2 * sa))
      .close()
      .offset(sa)
      .attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 4,
    title: 'cuff',
    align: 'center',
  })

  // Grainline
  macro('grainline', {
    from: points.topMid.shift(0, 15),
    to: points.bottomMid.shift(0, 15),
  })

  // Dimensions
  macro('vd', {
    id: 'hfull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + 15 + sa,
  })
  macro('hd', {
    id: 'wfull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomRight.y + 15 + sa,
  })

  return part
}

export const cuff = {
  name: 'paco.cuff',
  after: front,
  draft: pacoCuff,
}
