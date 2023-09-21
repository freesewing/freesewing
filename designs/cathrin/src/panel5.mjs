import { panels } from './panels.mjs'

function draftCathrinPanel5({ macro, sa, points, paths, Point, store, part }) {
  points.anchor = points.underbustGap4Right.clone()

  delete paths.outline
  delete paths.panel1
  delete paths.panel2
  delete paths.panel3
  delete paths.panel4
  delete paths.panel6

  if (sa) paths.sa = paths.panel5.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.setCut([
    { cut: 2, from: 'interfacing' },
    { cut: 2, from: 'fabric' },
  ])

  // grainline
  points.grainlineTop = new Point(
    points.waistGap4Right.shiftFractionTowards(points.waistGap5Left, 0.5).x,
    points.underbustGap4Right.y
  )
  points.grainlineBottom = new Point(points.grainlineTop.x, points.hipsGap5.y)
  macro('grainline', {
    from: points.grainlineBottom,
    to: points.grainlineTop,
  })

  // Title
  points.title = points.grainlineTop.shift(-90, points.grainlineTop.dy(points.waistGap5Left) / 2)
  macro('title', {
    nr: 5,
    title: '',
    at: points.title,
    scale: 0.7,
    align: 'center',
  })

  // Dimensions
  macro('hd', {
    id: 'wAtBottom',
    from: points.hipsGap4,
    to: points.hipsGap5,
    y: points.hipsGap4.y + sa + 15,
  })
  macro('ld', {
    id: 'wAtWaist',
    from: points.waistGap4Right,
    to: points.waistGap5Left,
  })
  macro('hd', {
    id: 'wAtTop',
    from: points.underbustGap4Right,
    to: points.underbustGap5Left,
    y: points.underbustGap5Left.y - sa - 15,
  })
  macro('vd', {
    id: 'hLeftBottomToWaist',
    from: points.hipsGap4,
    to: points.waistGap4Right,
    x: points.hipsGap4.x - sa - 15,
  })
  macro('vd', {
    id: 'hLefWaistToTop',
    from: points.waistGap4Right,
    to: points.underbustGap4Right,
    x: points.hipsGap4.x - sa - 15,
  })
  macro('vd', {
    id: 'hRightBottomToWaist',
    from: points.hipsGap5,
    to: points.waistGap4Right,
    x: points.hipsGap5.x + sa + 15,
  })
  macro('vd', {
    id: 'hRightWaistToTop',
    from: points.waistGap4Right,
    to: points.underbustGap5Left,
    x: points.hipsGap5.x + sa + 15,
  })

  return part
}

export const panel5 = {
  name: 'cathrin.panel5',
  from: panels,
  draft: draftCathrinPanel5,
}
