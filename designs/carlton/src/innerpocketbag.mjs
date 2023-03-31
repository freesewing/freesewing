import { front } from './front.mjs'

function draftCarltonInnerPocketBag({
  units,
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
  points.bottomRight = new Point(
    store.get('innerPocketWidth'),
    (store.get('innerPocketWidth') * options.innerPocketDepth) / 2
  )
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  points.startLeft = points.topLeft.shiftFractionTowards(points.bottomLeft, 0.33)
  points.endLeft = points.topLeft.shiftFractionTowards(points.bottomLeft, 0.66)
  points.startRight = points.topRight.shiftFractionTowards(points.bottomRight, 0.33)
  points.endRight = points.topRight.shiftFractionTowards(points.bottomRight, 0.66)

  paths.seam = new Path()
    .move(points.startRight)
    .line(points.topRight)
    .line(points.topLeft)
    .line(points.startLeft)
    .move(points.endLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.endRight)
    .attr('class', 'lining')

  paths.hint = new Path()
    .move(points.startLeft)
    .line(points.endLeft)
    .move(points.endRight)
    .line(points.startRight)
    .attr('class', 'lining dashed')

  store.cutlist.addCut({ material: 'lining' })

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      at: points.title,
      nr: 14,
      title: 'innerPocketBag',
    })

    macro('grainline', {
      from: points.bottomLeft.shift(0, 10),
      to: points.topLeft.shift(0, 10),
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')
    }
    macro('ld', {
      from: points.bottomRight.shift(180, 15),
      to: points.topRight.shift(180, 15),
      text: units(store.get('innerPocketWidth') * options.innerPocketDepth * 2),
    })

    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 15,
      })
    }
  }

  return part
}

export const innerPocketBag = {
  name: 'carlton.innerPocketBag',
  after: front,
  options: {
    innerPocketDepth: { pct: 110, min: 75, max: 140, menu: 'pockets' },
  },
  draft: draftCarltonInnerPocketBag,
}
