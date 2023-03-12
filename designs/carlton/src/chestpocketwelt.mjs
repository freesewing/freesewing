import { front } from './front.mjs'

function draftCarltonChestPocketWelt({
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
  points.bottomRight = new Point(store.get('chestPocketWidth') * 2, store.get('chestPocketHeight'))
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  points.topMid = new Point(store.get('chestPocketWidth'), points.topRight.y)
  points.bottomMid = new Point(points.topMid.x, points.bottomRight.y)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  paths.fold = new Path().move(points.topMid).line(points.bottomMid).attr('class', 'dashed')

  store.cutlist.addCut()
  store.cutlist.addCut({ material: 'lmhCanvas' })

  if (complete) {
    points.title = new Point(points.bottomRight.x / 4, points.bottomRight.y / 2)
    macro('title', {
      at: points.title,
      nr: 12,
      title: 'chestPocketWelt',
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 15,
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

export const chestPocketWelt = {
  name: 'carlton.chestPocketWelt',
  after: front,
  draft: draftCarltonChestPocketWelt,
}
