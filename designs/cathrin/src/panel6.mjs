import { panels } from './panels.mjs'

function draftCathrinPanel6({ macro, sa, points, paths, Point, store, part }) {
  points.anchor = points.backRise.clone()

  delete paths.outline
  delete paths.panel1
  delete paths.panel2
  delete paths.panel3
  delete paths.panel4
  delete paths.panel5

  if (sa) paths.sa = paths.panel6.offset(sa).attr('class', 'fabric sa')

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
    points.waistGap5Right.shiftFractionTowards(points.waistCB, 0.5).x,
    points.underbustGap5Right.y
  )
  points.grainlineBottom = new Point(points.grainlineTop.x, points.hipsGap5.y)
  macro('grainline', {
    from: points.grainlineBottom,
    to: points.grainlineTop,
  })

  // Title
  points.title = points.grainlineTop.shift(-90, points.grainlineTop.dy(points.waistGap5Right) / 2)
  macro('title', {
    nr: 6,
    title: '',
    at: points.title,
    scale: 0.7,
    align: 'center',
  })

  // Scalebox
  points.scalebox = new Point(points.grainlineTop.x, points.hipsGap5.y - 55)
  macro('scalebox', {
    at: points.scalebox,
    rotate: 90,
  })

  // Dimensions
  macro('hd', {
    id: 'wBottom',
    from: points.hipsGap5,
    to: points.backDrop,
    y: points.backDrop.y + sa + 15,
  })
  macro('ld', {
    id: 'wAtWaist',
    from: points.waistGap5Right,
    to: points.waistCB,
  })
  macro('hd', {
    id: 'wAtTop',
    from: points.underbustGap5Right,
    to: points.backRise,
    y: points.backRise.y - sa - 15,
  })
  macro('vd', {
    id: 'hLeftTopWaist',
    from: points.hipsGap5,
    to: points.waistGap5Right,
    x: points.hipsGap5.x - sa - 15,
  })
  macro('vd', {
    id: 'hLeftWaistToTop',
    from: points.waistGap5Right,
    to: points.underbustGap5Right,
    x: points.hipsGap5.x - sa - 15,
  })
  macro('vd', {
    id: 'hRightBottomToWaist',
    from: points.backDrop,
    to: points.waistCB,
    x: points.backDrop.x + sa + 15,
  })
  macro('vd', {
    id: 'hRightWaistToTop',
    from: points.waistCB,
    to: points.backRise,
    x: points.backDrop.x + sa + 15,
  })

  return part
}

export const panel6 = {
  name: 'cathrin.panel6',
  from: panels,
  draft: draftCathrinPanel6,
}
