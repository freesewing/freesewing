import { panels } from './panels.mjs'

function draftCathrinPanel5({ macro, sa, points, paths, Point, complete, paperless, part }) {
  points.anchor = points.underbustGap4Right.clone()

  delete paths.outline
  delete paths.panel1
  delete paths.panel2
  delete paths.panel3
  delete paths.panel4
  delete paths.panel6

  // Complete pattern?
  if (complete) {
    points.grainlineTop = new Point(
      points.waistGap4Right.shiftFractionTowards(points.waistGap5Left, 0.5).x,
      points.underbustGap4Right.y
    )
    points.grainlineBottom = new Point(points.grainlineTop.x, points.hipsGap5.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })
    points.title = points.grainlineTop.shift(-90, points.grainlineTop.dy(points.waistGap5Left) / 2)
    macro('title', {
      nr: 5,
      title: '',
      at: points.title,
    })
    if (sa) paths.sa = paths.panel5.offset(sa).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.hipsGap4,
      to: points.hipsGap5,
      y: points.hipsGap4.y + sa + 15,
    })
    macro('ld', {
      from: points.waistGap4Right,
      to: points.waistGap5Left,
    })
    macro('hd', {
      from: points.underbustGap4Right,
      to: points.underbustGap5Left,
      y: points.underbustGap5Left.y - sa - 15,
    })
    macro('vd', {
      from: points.hipsGap4,
      to: points.waistGap4Right,
      x: points.hipsGap4.x - sa - 15,
    })
    macro('vd', {
      from: points.waistGap4Right,
      to: points.underbustGap4Right,
      x: points.hipsGap4.x - sa - 15,
    })
    macro('vd', {
      from: points.hipsGap5,
      to: points.waistGap4Right,
      x: points.hipsGap5.x + sa + 15,
    })
    macro('vd', {
      from: points.waistGap4Right,
      to: points.underbustGap5Left,
      x: points.hipsGap5.x + sa + 15,
    })
  }

  return part
}

export const panel5 = {
  name: 'cathrin.panel5',
  from: panels,
  draft: draftCathrinPanel5,
}
