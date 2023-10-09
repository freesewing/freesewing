import { front } from './front.mjs'

function wahidPocketbag({
  points,
  Point,
  paths,
  Path,
  measurements,
  utils,
  options,
  macro,
  store,
  part,
}) {
  const pw = measurements.hips * options.pocketWidth // Pocket width
  const ph = store.get('pocketBagLength') // Pocket height
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(pw + 30, 0)
  points.bottomLeft = new Point(0, ph + 10)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
  // Macro will return the auto-generated IDs
  const ids = {
    roundLeft: macro('round', {
      id: 'roundLeft',
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      radius: pw / 8,
      hidden: true,
    }),
    roundRight: macro('round', {
      id: 'roundRight',
      from: points.bottomLeft,
      to: points.topRight,
      via: points.bottomRight,
      radius: pw / 8,
      hidden: true,
    }),
  }
  // Create points from them with easy names
  for (const side in ids) {
    for (const id of ['start', 'cp1', 'cp2', 'end']) {
      points[`${side}${utils.capitalize(id)}`] = points[ids[side].points[id]].copy()
    }
  }

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

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'lining' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    nr: 5,
    title: 'pocketBag',
    at: points.title,
    align: 'center',
  })

  // Grainline
  macro('grainline', {
    from: points.roundLeftEnd,
    to: new Point(points.roundLeftEnd.x, points.topLeft.y),
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + 15,
  })

  return part
}

export const pocketBag = {
  name: 'wahid.pocketBag',
  after: front,
  draft: wahidPocketbag,
}
