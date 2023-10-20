import { back } from './back.mjs'

function pacoBackPocketBag({
  sa,
  points,
  Path,
  paths,
  snippets,
  store,
  options,
  complete,
  expand,
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
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `paco:cutBackPocketBag`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(points.pocketBagWaistLeft.dist(points.pocketBagWaistRight) + extraSa),
        l: units(points.pocketBagWaistLeft.dist(points.pocketBagBottomLeft) * 2 + extraSa),
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

  // Rotate all points around topRight, so the part is aligned vertically
  const list = [
    'pocketBagWaistLeft',
    'pocketBagWaistRight',
    'pocketBagBottomLeft',
    'pocketBagBottomRight',
    'pocketLeft',
    'pocketRight',
  ]
  const angle = -1 * points.pocketLeft.angle(points.pocketRight)
  for (const point in points) {
    if (list.indexOf(point) !== -1)
      points[point] = points[point].rotate(angle, points.pocketBagWaistLeft)
  }

  paths.seam = new Path()
    .move(points.pocketBagWaistLeft)
    .line(points.pocketBagBottomLeft)
    .line(points.pocketBagBottomRight)
    .line(points.pocketBagWaistRight)
    .line(points.pocketBagWaistLeft)
    .close()
    .attr('class', 'lining')

  if (complete)
    paths.cut = new Path()
      .move(points.pocketLeft)
      .line(points.pocketRight)
      .attr('class', 'lining lashed')

  if (sa) {
    paths.sa = new Path()
      .move(points.pocketBagBottomRight)
      .line(points.pocketBagWaistRight)
      .line(points.pocketBagWaistLeft)
      .line(points.pocketBagBottomLeft)
      .offset(sa)
    paths.sa = new Path()
      .move(points.pocketBagBottomRight)
      .join(paths.sa)
      .line(points.pocketBagBottomLeft)
      .attr('class', 'lining sa')
  }

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'lining', onFold: true })

  // Title
  points.title = points.pocketBagWaistLeft.shiftFractionTowards(points.pocketBagBottomRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 6,
    title: 'backPocketBag',
    align: 'center',
  })

  // Cutonfold
  macro('cutonfold', {
    to: points.pocketBagBottomRight,
    from: points.pocketBagBottomLeft,
  })

  // Grainline
  macro('grainline', {
    from: points.pocketBagBottomLeft.shift(0, 15),
    to: points.pocketBagWaistLeft.shift(0, 15),
  })

  // Notches
  macro('sprinkle', {
    snippet: 'bnotch',
    on: ['pocketLeft', 'pocketRight', 'pocketBagWaistLeft', 'pocketBagWaistRight'],
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.pocketBagBottomLeft,
    to: points.pocketBagBottomRight,
    y: points.pocketBagBottomLeft.y + 15 + sa,
  })
  macro('hd', {
    id: 'wCut',
    from: points.pocketLeft,
    to: points.pocketRight,
    y: points.pocketLeft.y + 15 + sa,
  })
  macro('vd', {
    id: 'hTopToCut',
    from: points.pocketRight,
    to: points.pocketBagWaistRight,
    x: points.pocketBagBottomRight.x + 15 + sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.pocketBagBottomRight,
    to: points.pocketBagWaistRight,
    x: points.pocketBagBottomRight.x + 30 + sa,
  })

  return part
}

export const backPocketBag = {
  name: 'paco.backPocketBag',
  from: back,
  draft: pacoBackPocketBag,
}
