import { pocket } from './pocket.mjs'

function draftCarltonPocketLining({
  paperless,
  sa,
  store,
  complete,
  points,
  options,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  points.topLeft = points.bottomLeft.shiftFractionTowards(points.topLeft, 0.75)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  if (options.pocketRadius > 0) {
    macro('round', {
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      radius: store.get('pocketRadius'),
      prefix: 'roundLeft',
    })
    macro('round', {
      from: points.bottomLeft,
      to: points.topRight,
      via: points.bottomRight,
      radius: store.get('pocketRadius'),
      prefix: 'roundRight',
    })

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.roundLeftStart)
      .curve(points.roundLeftCp1, points.roundLeftCp2, points.roundLeftEnd)
      .line(points.roundRightStart)
      .curve(points.roundRightCp1, points.roundRightCp2, points.roundRightEnd)
  } else {
    paths.seam = new Path().move(points.topLeft).line(points.bottomLeft).line(points.bottomRight)
  }

  paths.seam = paths.seam.line(points.topRight).line(points.topLeft).close().attr('class', 'lining')

  delete paths.fold

  store.cutlist.addCut({ material: 'lining' })

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      at: points.title,
      nr: 16,
      title: 'pocketLining',
    })

    macro('grainline', {
      from: points.bottomLeft.shift(0, 10 + (store.get('pocketRadius') || 0)),
      to: points.topLeft.shift(0, 10 + (store.get('pocketRadius') || 0)),
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

    if (paperless) {
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + sa + 15,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topRight.y - sa - 15,
      })
      if (options.pocketRadius > 0) {
        macro('hd', {
          from: points.roundRightStart,
          to: points.roundRightEnd,
          y: points.bottomRight.y + sa + 15,
        })
      }
    }
  }

  return part
}

export const pocketLining = {
  name: 'carlton.pocketLining',
  from: pocket,
  draft: draftCarltonPocketLining,
}
