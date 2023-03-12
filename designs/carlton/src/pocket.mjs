import { front } from './front.mjs'

function draftCarltonPocket({
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
  points.topLeft = new Point(0, 0)
  points.bottomRight = new Point(store.get('pocketWidth'), store.get('pocketHeight'))
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  points.edgeLeft = points.bottomLeft.shiftFractionTowards(points.topLeft, 1.25)
  points.edgeRight = new Point(points.topRight.x, points.edgeLeft.y)
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
      .move(points.edgeLeft)
      .line(points.roundLeftStart)
      .curve(points.roundLeftCp1, points.roundLeftCp2, points.roundLeftEnd)
      .line(points.roundRightStart)
      .curve(points.roundRightCp1, points.roundRightCp2, points.roundRightEnd)
  } else {
    paths.seam = new Path().move(points.edgeLeft).line(points.bottomLeft).line(points.bottomRight)
  }

  paths.seam = paths.seam
    .line(points.edgeRight)
    .line(points.edgeLeft)
    .close()
    .attr('class', 'fabric')

  paths.fold = new Path().move(points.topLeft).line(points.topRight).attr('class', 'fabric dashed')

  store.cutlist.addCut()

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      at: points.title,
      nr: 10,
      title: 'pocket',
    })

    macro('grainline', {
      from: points.bottomLeft.shift(0, 10 + (store.get('pocketRadius') || 0)),
      to: points.edgeLeft.shift(0, 10 + (store.get('pocketRadius') || 0)),
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + sa + 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.edgeRight,
        x: points.topRight.x + sa + 30,
      })
      macro('hd', {
        from: points.edgeLeft,
        to: points.edgeRight,
        y: points.edgeRight.y - sa - 15,
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

export const pocket = {
  name: 'carlton.pocket',
  after: front,
  draft: draftCarltonPocket,
}
