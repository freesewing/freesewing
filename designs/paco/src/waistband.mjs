import { front } from './front.mjs'

function pacoWaistband({
  utils,
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  complete,
  paperless,
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
    store.flag.note({
      msg: `paco:cutWaistband`,
      replace: {
        w: units(w + 4 * sa),
        l: units(l + 2 * sa),
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
  points.midLeft = new Point(0, store.get('waistbandWidth'))
  points.bottomLeft = new Point(0, store.get('waistbandWidth') * 2)
  points.eyeletLeft = new Point(20, store.get('waistbandWidth') / 2)
  points.eyeletRight = points.eyeletLeft.shift(0, l - 40)

  points.topRight = points.topLeft.shift(0, l)
  points.midRight = points.midLeft.shift(0, l)
  points.bottomRight = points.bottomLeft.shift(0, l)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')

  if (complete)
    paths.fold = new Path().move(points.midLeft).line(points.midRight).attr('class', 'help')

  if (sa)
    paths.sa = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft.shift(-90, 2 * sa))
      .line(points.bottomRight.shift(-90, 2 * sa))
      .line(points.topRight)
      .line(points.topLeft)
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
  macro('sprinkle', { snippet: 'eyelet', on: ['eyeletLeft', 'eyeletRight'] })
  macro('sprinkle', { snippet: 'notch', on: ['midLeft', 'midRight'] })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.midLeft,
    to: points.midRight,
    y: points.bottomRight.y + 3 * sa + 15,
  })
  macro('hd', {
    id: 'wEyeletLeft',
    from: points.midLeft,
    to: points.eyeletLeft,
    y: points.topRight.y - sa - 15,
  })
  macro('hd', {
    id: 'wEyeletRight',
    from: points.eyeletRight,
    to: points.midRight,
    y: points.topRight.y - sa - 15,
  })
  macro('vd', {
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + 15 + sa,
  })

  return part
}

export const waistband = {
  name: 'paco.waistband',
  after: front,
  draft: pacoWaistband,
}
