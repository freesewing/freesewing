import { back } from './back.mjs'

function draftCarltonBelt({
  sa,
  snippets,
  Snippet,
  store,
  points,
  macro,
  utils,
  Point,
  paths,
  Path,
  part,
}) {
  const length = 1.6 * (store.get('cbToDart') + store.get('dartToSide'))
  const width = store.get('beltWidth')

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(length, 0)
  points.bottomLeft = new Point(0, width)
  points.bottomRight = new Point(length, width)
  points.button = new Point(width / 2, width / 2)
  // Macros will return the auto-generated IDs
  const ids = {
    roundTop: macro('round', {
      id: 'roundTop',
      from: points.topRight,
      to: points.bottomLeft,
      via: points.topLeft,
      radius: width / 4,
    }),
    roundBottom: macro('round', {
      id: 'roundBottom',
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      radius: width / 4,
    }),
  }
  // Create points from them with easy names
  for (const side in ids) {
    for (const id of ['start', 'cp1', 'cp2', 'end']) {
      points[`${side}${utils.capitalize(id)}`] = points[ids[side].points[id]].copy()
    }
  }

  // Paths
  paths.seam = new Path()
    .move(points.roundTopStart)
    .curve(points.roundTopCp1, points.roundTopCp2, points.roundTopEnd)
    .line(points.roundBottomStart)
    .curve(points.roundBottomCp1, points.roundBottomCp2, points.roundBottomEnd)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.roundTopStart)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.addCut({ cut: 4, from: 'fabric' })

  // Button & buttonhole
  snippets.button = new Snippet('button', points.button).attr('data-scale', 2)
  snippets.buttonhole = new Snippet('buttonhole', points.button).scale(2).rotate(90)

  // Title
  points.title = new Point(points.bottomRight.x / 2, points.bottomRight.y / 2)
  macro('title', {
    at: points.title,
    nr: 6,
    title: 'belt',
  })

  // Logo
  points.logo = new Point(points.bottomRight.x * 0.75, points.bottomRight.y * 0.65)
  snippets.logo = new Snippet('logo', points.logo)

  // Notches
  snippets.waistNotch = new Snippet(
    'notch',
    points.bottomRight.shiftFractionTowards(points.topRight, 0.5)
  )

  // Dimensions
  macro('hd', {
    id: 'wRoundedCorner',
    from: points.roundBottomStart,
    to: points.roundBottomEnd,
    y: points.roundBottomEnd.y + sa + 15,
  })
  macro('hd', {
    id: 'wToButton',
    from: points.roundBottomStart,
    to: points.button,
    y: points.roundBottomEnd.y + sa + 30,
  })
  macro('hd', {
    id: 'wFull',
    from: points.roundBottomStart,
    to: points.bottomRight,
    y: points.roundBottomEnd.y + sa + 45,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })

  return part
}

export const belt = {
  name: 'carlton.belt',
  after: back,
  draft: draftCarltonBelt,
}
