function draft({
  Point,
  points,
  Path,
  paths,
  store,
  part,
  measurements,
  options,
  complete,
  sa,
  paperless,
  snippets,
  Snippet,
  macro,
}) {
  points.topLeft = new Point(0, 0)
  points.topCp = new Point(store.get('backQuarterHips') / 2, 0)
  points.topRight = new Point(store.get('backQuarterHips'), store.get('hips') * 0.01)
  points.bottomLeft = new Point(0, points.topRight.y + store.get('hipsToUpperLeg'))
  points.bottomRight = new Point(store.get('backQuarterSeat'), points.bottomLeft.y)

  // Reduction from hips to seat
  const reduce = store.get('hipsQuarterReduction')
  // Minimal dart that we consider suitable for sewing = 2% of backQuarterHips

  console.log(store.get('hipsQuarterReduction'), measurements, options)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    ._curve(points.topCp, points.topLeft)

  // Complete?
  if (complete) {
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y - sa - 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    // macro('vd', {
    //   from: points.bottomRight,
    //   to: points.topRight,
    //   x: points.topRight.x + sa + 15,
    // })
  }

  return part
}

export const back = { name: 'back', draft: draft }
