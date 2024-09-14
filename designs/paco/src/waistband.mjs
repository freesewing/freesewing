import { front } from './front.mjs'

function pacoWaistband({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  complete,
  expand,
  macro,
  units,
  part,
}) {
  const l = 2 * (store.get('frontWaist') + store.get('backWaist'))
  const w = store.get('waistbandWidth')

  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `paco:cutWaistband`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(2 * w + 2 * extraSa),
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
  points.topRight = new Point(w * 2, 0)
  points.bottomLeft = new Point(0, l)
  points.bottomMid = new Point(w, l)
  points.bottomRight = new Point(w * 2, l)

  points.eyeletTop = new Point(w * 1.5, w / 2)
  points.eyeletBottom = points.bottomLeft.translate(w * 1.5, w / -2)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')

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
      .setClass('fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.4)
  macro('title', {
    at: points.title,
    nr: 3,
    title: 'waistband',
  })

  // Grainline
  macro('grainline', {
    from: points.topLeft.shift(0, 15),
    to: points.bottomLeft.shift(0, 15),
  })

  // Notches
  macro('sprinkle', { snippet: 'eyelet', on: ['eyeletTop', 'eyeletBottom'] })
  //macro('sprinkle', { snippet: 'notch', on: ['midLeft', 'midRight'] })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.topLeft,
    to: points.topRight,
    y: points.bottomRight.y + sa + 15,
  })
  macro('hd', {
    id: 'wEyeletTop',
    from: points.eyeletTop,
    to: points.topRight,
    y: points.topLeft.y - sa - 15,
  })
  macro('vd', {
    id: 'hEyeletTop',
    from: points.eyeletTop,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })
  macro('vd', {
    from: points.bottomRight,
    to: points.topRight,
    x: points.topLeft.x - 15 - 3 * sa,
  })

  return part
}

export const waistband = {
  name: 'paco.waistband',
  after: front,
  draft: pacoWaistband,
}
