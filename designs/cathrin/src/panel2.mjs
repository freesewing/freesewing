import { panels } from './panels.mjs'

function draftCathrinPanel2({ macro, sa, points, paths, Point, store, part }) {
  points.anchor = points.underbustGap1Right.clone()

  delete paths.outline
  delete paths.panel1
  delete paths.panel3
  delete paths.panel4
  delete paths.panel5
  delete paths.panel6

  if (sa) paths.sa = paths.panel2.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cut list
  store.cutlist.setCut([
    { cut: 2, from: 'interfacing' },
    { cut: 2, from: 'fabric' },
  ])

  // Grainline
  points.grainlineTop = new Point(
    points.waistGap1Right.shiftFractionTowards(points.waistGap2Left, 0.5).x,
    points.underbustGap1Right.y
  )
  points.grainlineBottom = new Point(points.grainlineTop.x, points.hipsGap2.y)
  macro('grainline', {
    from: points.grainlineBottom,
    to: points.grainlineTop,
  })

  // Title
  points.title = points.grainlineTop.shift(-90, points.grainlineTop.dy(points.waistGap2Left) / 2)
  macro('title', {
    nr: 2,
    title: 'panel2',
    at: points.title,
    align: 'center',
    scale: 0.7,
  })

  // Dimensions
  macro('hd', {
    id: 'wBottom',
    from: points.hipsGap1,
    to: points.hipsGap2,
    y: points.hipsGap1.y + sa + 15,
  })
  macro('ld', {
    id: 'wAtWaist',
    from: points.waistGap1Right,
    to: points.waistGap2Left,
  })
  macro('hd', {
    id: 'wAtTop',
    from: points.underbustGap1Right,
    to: points.underbustGap2Left,
    y: points.underbustGap1Right.y - sa - 15,
  })
  macro('vd', {
    id: 'hCenterBottomToWaist',
    from: points.hipsGap1,
    to: points.waistGap1Right,
    x: points.hipsGap1.x - sa - 15,
  })
  macro('vd', {
    id: 'hCenterWaistToTop',
    from: points.waistGap1Right,
    to: points.underbustGap1Right,
    x: points.hipsGap1.x - sa - 15,
  })
  macro('vd', {
    id: 'hSideBottomToWaist',
    from: points.hipsGap2,
    to: points.waistGap1Right,
    x: points.hipsGap2.x + sa + 15,
  })
  macro('vd', {
    id: 'hSideWaistToTop',
    from: points.waistGap1Right,
    to: points.underbustGap2Left,
    x: points.hipsGap2.x + sa + 15,
  })

  return part
}

export const panel2 = {
  name: 'cathrin.panel2',
  from: panels,
  draft: draftCathrinPanel2,
}
