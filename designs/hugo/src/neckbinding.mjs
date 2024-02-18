import { front } from './front.mjs'
import { back } from './back.mjs'
import { hoodCenter } from './hoodcenter.mjs'

function hugoNeckBinding({ store, sa, Point, points, Path, paths, macro, part, expand, units }) {
  const length =
    store.get('neckOpeningLenFront') * 2 +
    store.get('neckOpeningLenBack') * 2 +
    store.get('hoodCenterWidth')
  const width = length / 44.2

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `hugo:cutNeckBinding`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(width + extraSa),
        l: units(length + extraSa),
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

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(length, 0)
  points.bottomRight = new Point(length, width)
  points.bottomLeft = new Point(0, width)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Seam allowance
  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  // Grainline
  macro('grainline', {
    from: points.topLeft
      .shiftFractionTowards(points.topRight, 0.15)
      .shiftFractionTowards(points.bottomLeft, 0.6),
    to: points.topRight
      .shiftFractionTowards(points.topLeft, 0.15)
      .shiftFractionTowards(points.bottomRight, 0.6),
  })

  //title
  points.title = new Point(length / 2, width * 3)
  macro('title', {
    at: points.title,
    nr: 10,
    title: 'neckBinding',
    scale: 0.4,
  })

  // Dimensions
  macro('hd', {
    id: 'length',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + sa + 15,
  })
  macro('vd', {
    id: 'width',
    from: points.topRight,
    to: points.bottomRight,
    x: points.topRight.x + sa + 15,
  })

  return part
}

export const neckBinding = {
  name: 'hugo.neckBinding',
  after: [front, back, hoodCenter],
  draft: hugoNeckBinding,
}
