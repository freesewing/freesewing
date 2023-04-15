import { front } from './front.mjs'

function draftCarltonInnerPocketTab({
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
  points.topRight = new Point(store.get('innerPocketWidth') * 1.2, 0)
  points.bottom = new Point(
    store.get('innerPocketWidth') * 0.6,
    store.get('innerPocketWidth') * 0.6
  )
  points.top = new Point(store.get('innerPocketWidth') * 0.6, 0)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottom)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'lining')

  paths.hint = new Path().move(points.top).line(points.bottom).attr('class', 'lining dashed')

  store.cutlist.addCut({ cut: 1, material: 'lining' })

  if (complete) {
    points.title = points.top.shiftFractionTowards(points.bottom, 0.5)
    macro('title', {
      at: points.title,
      nr: 15,
      title: 'innerPocketTab',
    })

    macro('grainline', {
      from: points.top,
      to: points.top.shift(-45, points.top.x * 0.7),
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

    if (paperless) {
      macro('hd', {
        from: points.topLeft,
        to: points.top,
        y: points.topLeft.y - sa - 15,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topLeft.y - sa - 30,
      })
      macro('vd', {
        from: points.bottom,
        to: points.topRight,
        x: points.topRight.x + sa + 15,
      })
    }
  }

  return part
}

export const innerPocketTab = {
  name: 'carlton.innerPocketTab',
  after: front,
  draft: draftCarltonInnerPocketTab,
}
