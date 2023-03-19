import { front } from './front.mjs'

function draftCarltonInnerPocketWelt({
  paperless,
  sa,
  store,
  complete,
  points,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  points.topLeft = new Point(0, 0)
  points.bottomRight = new Point(
    store.get('innerPocketWidth') * 1.4,
    store.get('innerPocketWeltHeight') * 6
  )
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  points.leftMid = new Point(0, points.bottomRight.y / 2)
  points.rightMid = new Point(points.bottomRight.x, points.bottomRight.y / 2)
  points.realTopLeft = new Point(
    store.get('innerPocketWidth') * 0.2,
    store.get('innerPocketWeltHeight') * 2
  )
  points.realTopRight = new Point(store.get('innerPocketWidth') * 1.2, points.realTopLeft.y)
  points.realBottomLeft = new Point(points.realTopLeft.x, store.get('innerPocketWeltHeight') * 4)
  points.realBottomRight = new Point(points.realTopRight.x, points.realBottomLeft.y)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  paths.fold = new Path().move(points.leftMid).line(points.rightMid).attr('class', 'dashed')

  paths.welt = new Path()
    .move(points.realTopLeft)
    .line(points.realBottomLeft)
    .line(points.realBottomRight)
    .line(points.realTopRight)
    .line(points.realTopLeft)
    .close()
    .attr('class', 'lashed')

  store.cutlist.addCut()
  store.cutlist.addCut({ material: 'lmhCanvas' })

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      at: points.title,
      nr: 13,
      title: 'innerPocketWelt',
    })

    macro('grainline', {
      from: points.bottomLeft.shift(0, 10),
      to: points.topLeft.shift(0, 10),
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('vd', {
        from: points.realBottomRight,
        to: points.realTopRight,
        x: points.topRight.x + sa + 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + sa + 30,
      })
      macro('hd', {
        from: points.realBottomLeft,
        to: points.realBottomRight,
        y: points.bottomLeft.y + sa + 15,
      })
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 30,
      })
    }
  }
  return part
}

export const innerPocketWelt = {
  name: 'carlton.innerPocketWelt',
  after: front,
  draft: draftCarltonInnerPocketWelt,
}
