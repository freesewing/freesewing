import { backPocketBag } from './backpocketbag.mjs'

function pacoBackPocketWelt({
  sa,
  Point,
  points,
  Path,
  paths,
  snippets,
  options,
  expand,
  store,
  units,
  macro,
  part,
}) {
  // Clean up before returning.
  // See https://github.com/freesewing/freesewing/issues/2878
  for (const path in paths) delete paths[path]
  for (const snippet in snippets) delete snippets[snippet]
  macro('rmscalebox')
  macro('rmtitle')

  // Don't bother of we're not drafting back pockets
  if (!options.backPockets) return part.hide()

  const w = points.pocketBagWaistLeft.dist(points.pocketBagWaistRight)
  const h = points.pocketLeft.dist(points.pocketRight) * options.weltFactor

  // Define these here, as they are used in backpocketinterfacing to calculate w/h
  points.topLeft = new Point(points.pocketBagWaistLeft.x, points.pocketLeft.y)
  points.topRight = new Point(points.pocketBagWaistRight.x, points.topLeft.y)
  points.bottomLeft = points.topLeft.shift(-90, h * 2)
  points.bottomRight = points.topRight.shift(-90, h * 2)

  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `paco:cutBackPocketWelt`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(h + extraSa),
        l: units(w + extraSa),
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
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.4)
  macro('title', {
    at: points.title,
    nr: 7,
    title: 'backPocketWelt',
    align: 'center',
    scale: 0.666,
  })

  // Grainline
  macro('grainline', {
    from: points.topLeft.shift(0, 15),
    to: points.bottomLeft.shift(0, 15),
  })

  // Notches
  macro('sprinkle', {
    snippet: 'bnotch',
    on: ['pocketLeft', 'pocketRight', 'pocketBagWaistLeft', 'pocketBagWaistRight'],
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + 15 + sa,
  })
  macro('hd', {
    id: 'wBetweenNotches',
    from: points.pocketLeft,
    to: points.pocketRight,
    y: points.topLeft.y - 15 - sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topLeft,
    x: points.topRight.x + 15 + sa,
  })

  return part
}

export const backPocketWelt = {
  name: 'paco.backPocketWelt',
  from: backPocketBag,
  options: {
    weltFactor: 0.15,
  },
  draft: pacoBackPocketWelt,
}
