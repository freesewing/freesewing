import { panels } from './panels.mjs'

function draftCathrinPanel4({
  macro,
  sa,
  snippets,
  Snippet,
  points,
  paths,
  Point,
  complete,
  paperless,
  part,
}) {
  points.anchor = points.underbustGap3Right.clone()

  delete paths.outline
  delete paths.panel1
  delete paths.panel2
  delete paths.panel3
  delete paths.panel5
  delete paths.panel6

  // Complete pattern?
  if (complete) {
    points.grainlineTop = new Point(
      points.waistGap3Right.shiftFractionTowards(points.waistGap4Left, 0.5).x,
      points.underbustGap3Right.y
    )
    points.grainlineBottom = new Point(points.grainlineTop.x, points.hipsGap4.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })
    points.title = points.grainlineTop.shift(-90, points.grainlineTop.dy(points.waistGap4Left) / 2)
    macro('title', {
      nr: 4,
      title: '',
      at: points.title,
    })
    points.logo = points.grainlineTop.shiftFractionTowards(points.grainlineBottom, 0.8)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.8)

    if (sa) paths.sa = paths.panel4.offset(sa).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.hipsGap3,
      to: points.hipsGap4,
      y: points.hipsGap3.y + sa + 15,
    })
    macro('ld', {
      from: points.waistGap3Right,
      to: points.waistGap4Left,
    })
    macro('hd', {
      from: points.underbustGap3Right,
      to: points.underbustGap4Left,
      y: points.underbustGap4Left.y - sa - 15,
    })
    macro('vd', {
      from: points.hipsGap3,
      to: points.waistGap3Right,
      x: points.hipsGap3.x - sa - 15,
    })
    macro('vd', {
      from: points.waistGap3Right,
      to: points.underbustGap3Right,
      x: points.hipsGap3.x - sa - 15,
    })
    macro('vd', {
      from: points.hipsGap4,
      to: points.waistGap3Right,
      x: points.hipsGap4.x + sa + 15,
    })
    macro('vd', {
      from: points.waistGap3Right,
      to: points.underbustGap4Left,
      x: points.hipsGap4.x + sa + 15,
    })
  }

  return part
}

export const panel4 = {
  name: 'cathrin.panel4',
  from: panels,
  draft: draftCathrinPanel4,
}
