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
  absoluteOptions,
}) {
  // Simple skirt outline for the front panel
  points.topLeft = new Point(0, 0)
  points.topCp = new Point(store.get('frontQuarterHips') / 2, 0)
  points.topRight = new Point(store.get('frontQuarterHips'), absoluteOptions.waistSlant * -1)
  points.bottomLeft = new Point(0, points.topRight.y + store.get('hipsToUpperLeg'))
  points.bottomRight = new Point(store.get('frontQuarterSeat'), points.bottomLeft.y)

  /*
   * If there's darts at the back, we need to reduce the front hem length
   * because we lengthened the back hem to keep the skirt balanced
   */
  if (store.get('darts')) {
    points.bottomRight = points.bottomRight.shift(180, absoluteOptions.dartWidth)
  }

  // True the side seam
  points.trueBottomRight = points.topRight.shiftTowards(points.bottomRight, store.get('sideSeam'))
  points.trueBottomLeft = new Point(0, points.trueBottomRight.y)

  // Seamline
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.trueBottomRight)
    .line(points.topRight)
    ._curve(points.topCp, points.topLeft)
    .addClass('fabric')

  // Complete?
  if (complete) {
    points.logo = points.topLeft
      .shiftFractionTowards(points.bottomLeft, 0.3)
      .shift(0, points.topRight.x / 3)
    snippets.logo = new Snippet('logo', points.logo)

    points.title = points.logo.shift(-90, 70)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'front',
    })

    paths.cb = new Path()
      .move(points.bottomLeft)
      .line(points.topLeft)
      .addText('centerFront', 'center fill-note')
      .attr('data-text-dy', 8)

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

export const front = { name: 'front', draft: draft }
