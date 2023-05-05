function draft({ Point, points, Path, paths, store, part, measurements, options }) {
  //store.set('hips', hips)
  //store.set('frontHips', hips * options.frontHalf)
  //store.set('backHips',  hips * (1 - options.frontHalf))
  //const seat = measurements.seat * options.seatEase
  //store.set('seat', seat)
  //store.set('frontSeat', seat * options.frontHalf)
  //store.set('backSeat', seat * (1 - options.frontHalf))
  //store.set('hipsToSeat', measurements.waistToSeat - measurements.waistToHips)
  //store.set('hipsToUpperLeg', measurements.waistToUpperLeg - measurements.waistToHips)
  //store.set('seatToUpperLeg', measurements.waistToUpperLeg - measurements.waistToSeat)

  points.topLeft = new Point(0, 0)
  points.topCp = new Point(store.get('backQuarterHips') / 2, 0)
  points.topRight = new Point(store.get('backQuarterHips'), store.get('hips') * 0.01)
  points.bottomLeft = new Point(0, points.topRight.y + store.get('hipsToUpperLeg'))
  points.bottomRight = new Point(store.get('backQuarterSeat'), points.bottomLeft.y)

  // Reduction from hips to seat
  const reduce = store.get('hipsQuarterReduction')
  // Minimal dart that we consider suitable for sewing = 2% of backQuarterHips

  console.log(store.get('hipsQuarterReduction'), measurements, options)

  paths.tmp = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    ._curve(points.topCp, points.topLeft)

  // Complete?
  /*
  if (complete) {

    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo
      .shift(-90, w / 8)
      .attr('data-text', 'hello')
      .attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }
  */

  return part
}

export const back = { name: 'back', draft: draft }
