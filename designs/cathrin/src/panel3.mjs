import { panels } from './panels.mjs'

function draftCathrinPanel3({ macro, sa, points, paths, Point, complete, paperless, part }) {
  points.anchor = points.underbustGap2Right.clone()

  delete paths.outline
  delete paths.panel1
  delete paths.panel2
  delete paths.panel4
  delete paths.panel5
  delete paths.panel6

  // Complete pattern?
  if (complete) {
    points.grainlineTop = new Point(
      points.waistGap2Right.shiftFractionTowards(points.waistGap3Left, 0.5).x,
      points.underbustGap2Right.y
    )
    points.grainlineBottom = new Point(points.grainlineTop.x, points.hipsGap3.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })
    points.title = points.grainlineTop.shift(-90, points.grainlineTop.dy(points.waistGap3Left) / 2)
    macro('title', {
      nr: 3,
      title: '',
      at: points.title,
    })
    if (sa) paths.sa = paths.panel3.offset(sa).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.hipsGap2,
      to: points.hipsGap3,
      y: points.hipsGap2.y + sa + 15,
    })
    macro('ld', {
      from: points.waistGap2Right,
      to: points.waistGap3Left,
    })
    macro('hd', {
      from: points.underbustGap2Right,
      to: points.underbustGap3Left,
      y: points.underbustGap2Right.y - sa - 15,
    })
    macro('vd', {
      from: points.hipsGap2,
      to: points.waistGap2Right,
      x: points.hipsGap2.x - sa - 15,
    })
    macro('vd', {
      from: points.waistGap2Right,
      to: points.underbustGap2Right,
      x: points.hipsGap2.x - sa - 15,
    })
    macro('vd', {
      from: points.hipsGap3,
      to: points.waistGap2Right,
      x: points.hipsGap3.x + sa + 15,
    })
    macro('vd', {
      from: points.waistGap2Right,
      to: points.underbustGap3Left,
      x: points.hipsGap3.x + sa + 15,
    })
  }

  return part
}

export const panel3 = {
  name: 'cathrin.panel3',
  from: panels,
  draft: draftCathrinPanel3,
}
