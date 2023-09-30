import { panels } from './panels.mjs'

function draftCathrinPanel3({ macro, sa, points, paths, Point, store, part }) {
  points.anchor = points.underbustGap2Right.clone()

  delete paths.outline
  delete paths.panel1
  delete paths.panel2
  delete paths.panel4
  delete paths.panel5
  delete paths.panel6

  if (sa) paths.sa = paths.panel3.offset(sa).attr('class', 'fabric sa')

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
    points.waistGap2Right.shiftFractionTowards(points.waistGap3Left, 0.5).x,
    points.underbustGap2Right.y
  )
  points.grainlineBottom = new Point(points.grainlineTop.x, points.hipsGap3.y)
  macro('grainline', {
    from: points.grainlineBottom,
    to: points.grainlineTop,
  })

  // Title
  points.title = points.grainlineTop.shift(-90, points.grainlineTop.dy(points.waistGap3Left) / 2)
  macro('title', {
    nr: 3,
    title: '',
    at: points.title,
    scale: 0.7,
    align: 'center',
  })

  // Dimensions
  macro('hd', {
    id: 'wBottom',
    from: points.hipsGap2,
    to: points.hipsGap3,
    y: points.hipsGap2.y + sa + 15,
  })
  macro('ld', {
    id: 'wAtWaist',
    from: points.waistGap2Right,
    to: points.waistGap3Left,
  })
  macro('hd', {
    id: 'wAtTop',
    from: points.underbustGap2Right,
    to: points.underbustGap3Left,
    y: points.underbustGap2Right.y - sa - 15,
  })
  macro('vd', {
    id: 'hCenterBottomToWaist',
    from: points.hipsGap2,
    to: points.waistGap2Right,
    x: points.hipsGap2.x - sa - 15,
  })
  macro('vd', {
    id: 'hCenterBottomToWaist',
    from: points.waistGap2Right,
    to: points.underbustGap2Right,
    x: points.hipsGap2.x - sa - 15,
  })
  macro('vd', {
    id: 'hSideBottomToWaist',
    from: points.hipsGap3,
    to: points.waistGap2Right,
    x: points.hipsGap3.x + sa + 15,
  })
  macro('vd', {
    id: 'hSideWaistToTop',
    from: points.waistGap2Right,
    to: points.underbustGap3Left,
    x: points.hipsGap3.x + sa + 15,
  })

  return part
}

export const panel3 = {
  name: 'cathrin.panel3',
  from: panels,
  draft: draftCathrinPanel3,
}
