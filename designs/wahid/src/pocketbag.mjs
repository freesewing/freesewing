import { front } from './front.mjs'

function wahidPocketbag({
  points,
  Point,
  paths,
  Path,
  measurements,
  options,
  macro,
  complete,
  paperless,
  store,
  part,
}) {
  let pw = measurements.hips * options.pocketWidth // Pocket width
  let ph = store.get('pocketBagLength') // Pocket height
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(pw + 30, 0)
  points.bottomLeft = new Point(0, ph + 10)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
  macro('round', {
    from: points.topLeft,
    to: points.bottomRight,
    via: points.bottomLeft,
    radius: pw / 8,
    hidden: true,
    prefix: 'roundLeft',
  })
  macro('round', {
    from: points.bottomLeft,
    to: points.topRight,
    via: points.bottomRight,
    radius: pw / 8,
    hidden: true,
    prefix: 'roundRight',
  })
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.roundLeftStart)
    .curve(points.roundLeftCp1, points.roundLeftCp2, points.roundLeftEnd)
    .line(points.roundRightStart)
    .curve(points.roundRightCp1, points.roundRightCp2, points.roundRightEnd)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'lining')
  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      nr: 7,
      title: 'pocketBag',
      at: points.title,
    })
  }

  macro('grainline', {
    from: points.roundLeftEnd,
    to: new Point(points.roundLeftEnd.x, points.topLeft.y),
  })
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + 15,
    })
  }
  return part
}

export const pocketBag = {
  name: 'wahid.pocketBag',
  after: front,
  draft: wahidPocketbag,
}
