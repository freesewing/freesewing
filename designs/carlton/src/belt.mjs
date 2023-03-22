import { back } from './back.mjs'

function draftCarltonBelt({
  paperless,
  sa,
  snippets,
  Snippet,
  store,
  complete,
  points,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  let length = 1.6 * (store.get('cbToDart') + store.get('dartToSide'))
  let width = store.get('beltWidth')

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(length, 0)
  points.bottomLeft = new Point(0, width)
  points.bottomRight = new Point(length, width)
  points.button = new Point(width / 2, width / 2)
  macro('round', {
    from: points.topRight,
    to: points.bottomLeft,
    via: points.topLeft,
    prefix: 'roundTop',
    radius: width / 4,
  })
  macro('round', {
    from: points.topLeft,
    to: points.bottomRight,
    via: points.bottomLeft,
    prefix: 'roundBottom',
    radius: width / 4,
  })

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

  store.cutlist.addCut({ cut: 4 })

  if (complete) {
    snippets.button = new Snippet('button', points.button).attr('data-scale', 2)
    points.title = new Point(points.bottomRight.x / 2, points.bottomRight.y / 2)
    macro('title', {
      at: points.title,
      nr: 6,
      title: 'belt',
    })
    points.logo = new Point(points.bottomRight.x * 0.75, points.bottomRight.y * 0.65)
    snippets.logo = new Snippet('logo', points.logo)
    snippets.waistNotch = new Snippet(
      'notch',
      points.bottomRight.shiftFractionTowards(points.topRight, 0.5)
    )

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('hd', {
        from: points.roundBottomStart,
        to: points.roundBottomEnd,
        y: points.roundBottomEnd.y + sa + 15,
      })
      macro('hd', {
        from: points.roundBottomStart,
        to: points.button,
        y: points.roundBottomEnd.y + sa + 30,
      })
      macro('hd', {
        from: points.roundBottomStart,
        to: points.bottomRight,
        y: points.roundBottomEnd.y + sa + 45,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + sa + 15,
      })
    }
  }

  return part
}

export const belt = {
  name: 'carlton.belt',
  after: back,
  draft: draftCarltonBelt,
}
