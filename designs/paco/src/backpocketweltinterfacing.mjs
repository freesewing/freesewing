import { backPocketWelt } from './backpocketwelt.mjs'

function pacoBackPocketWeltInterfacing({
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

  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `paco:cutBackPocketWeltInterfacing`,
      notes: ['flag:saUnused', 'flag:partHiddenByExpand'],
      replace: {
        w: units(points.topLeft.dist(points.bottomLeft)),
        l: units(points.topLeft.dist(points.topRight)),
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
    .attr('class', 'interfacing')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'interfacing' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 8,
    title: 'pocketWeltInterfacing',
    align: 'center',
    scale: 0.666,
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
    y: points.bottomLeft.y + 15,
  })
  macro('hd', {
    id: 'wBetweenNotches',
    from: points.pocketLeft,
    to: points.pocketRight,
    y: points.topLeft.y - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + 15,
  })

  return part
}

export const backPocketWeltInterfacing = {
  name: 'paco.backPocketWeltInterfacing',
  from: backPocketWelt,
  draft: pacoBackPocketWeltInterfacing,
}
