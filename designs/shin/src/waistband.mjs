import { back } from './back.mjs'

function shinWaistband({
  store,
  macro,
  Point,
  Path,
  points,
  paths,
  sa,
  expand,
  units,
  absoluteOptions,
  part,
}) {
  const height = absoluteOptions.elasticWidth * 2.5
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(height, 0)
  points.bottomLeft = new Point(0, store.get('hips') * 2)
  points.bottomRight = new Point(height, points.bottomLeft.y)

  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `shin:cutWaistband`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(height + 2 * sa),
        l: units(store.get('hips') * 2 + 2 * sa),
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

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .addClass('fabric')

  if (sa)
    paths.sa = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .offset(sa)
      .addClass('fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 3,
    title: 'waistband',
    align: 'center',
    scale: 0.666,
  })

  // Grainline
  points.grainlineFrom = points.bottomLeft.shiftFractionTowards(points.bottomRight, 1 / 8)
  points.grainlineTo = new Point(points.grainlineFrom.x, points.topLeft.y)
  macro('grainline', {
    from: points.topLeft.shift(-90, 20),
    to: points.topRight.shift(-90, 20),
  })

  // Dimensions
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomRight.y + sa + 15,
  })

  return part
}

export const waistband = {
  name: 'shin.waistband',
  after: back,
  draft: shinWaistband,
}
