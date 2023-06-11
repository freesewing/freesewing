/*
 * This function drafts the back panel of the skirt
 */
function draftBack({
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
  /*
   * We start with drawing a simple skirt outline for the back panel
   * We just have to take the waistband into account
   */
  points.topLeft = new Point(0, 0)
  points.topCp = new Point(store.get('backQuarterHips') / 2, 0)
  points.topRight = new Point(store.get('backQuarterHips'), absoluteOptions.waistSlant)
  points.bottomLeft = new Point(
    0,
    points.topRight.y + store.get('hipsToUpperLeg') - absoluteOptions.waistbandWidth
  )
  points.bottomRight = new Point(store.get('backQuarterSeat'), points.bottomLeft.y)

  // Reduction from hips to seat
  const reduce = store.get('hipsQuarterReduction')
  // Minimal dart that we consider suitable for sewing
  const minDart = absoluteOptions.minDartWidth

  /*
   * Add back darts, but only if they are not too narrow to sew
   * Shaping happens at both back panels, so everthing we take out is doubled.
   * In addition, shaping happens on both side seam and dart, so doubled again
   * So only if the total reduction is more than 4x the minimal dart width do we add darts
   */
  if (store.get('hipsQuarterReduction') > 4 * absoluteOptions.minDartWidth) {
    // Let's make it easy to know we've added darts but setting it in the store
    store.set('darts', true)
    /*
     * To find the top of the dart is easy if the waistline is a straight line.
     * However, if the `waistSlant` option is non-zero, the waistline will be a curve.
     * So we need to follow that curve to find a point on it to use as the middle for the dart.
     * Store the hipline curve/line so we can re-use it later, but hide it from the output.
     */
    paths.hipLine =
      options.waistSlant > 0
        ? new Path().move(points.topRight)._curve(points.topCp, points.topLeft).hide()
        : new Path().move(points.topRight).line(points.topLeft).hide()

    /*
     * Find the middle of the hipline
     */
    points.dartTopMiddle = paths.hipLine.shiftFractionAlong(0.5)
    /*
     * Bottom of the dart is controlled by the dart length option which is a factor
     * of the distance between hipline and seatline.
     */
    points.dartTip = points.dartTopMiddle.shift(-90, absoluteOptions.dartLength)
    /*
     * Now open up the dart
     */
    const len = paths.hipLine.length()
    points.dartRight = paths.hipLine.shiftAlong(len / 2 - absoluteOptions.dartWidth)
    points.dartLeft = paths.hipLine.shiftAlong(len / 2 + absoluteOptions.dartWidth)
    /*
     * Finally, move the topRight point outwards to compensate for the draft shaping
     * If the hipLine is curved, this is not a 100% accurate match as we need to extende the
     * curve further than it goes. However, by going in a straight line from the dartRight
     * to the topRight point, we will follow the general direction of the curve and things will
     * smooth out
     */
    points.topRight = points.dartRight.shiftOutwards(points.topRight, absoluteOptions.dartWidth * 2)
    /*
     * We do half of the same for the bottom to ensure a nice balance in the skirt
     */
    points.bottomRight = points.bottomRight.shift(0, absoluteOptions.dartWidth)
  }

  // Seamline
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
  if (store.get('darts')) {
    paths.seam = paths.seam
      .join(paths.hipLine.split(points.dartRight).shift())
      .line(points.dartTip)
      .line(points.dartLeft)
      .join(paths.hipLine.split(points.dartLeft).pop())
  } else paths.seam._curve(points.topCp, points.topLeft)
  // Apply CSS classes
  paths.seam.addClass('fabric')

  // Store the side seam length so we can match it in the front part
  store.set('sideSeam', points.topRight.dist(points.bottomRight))

  // Complete?
  if (complete) {
    points.logo = points.topLeft
      .shiftFractionTowards(points.bottomLeft, 0.3)
      .shift(0, points.topRight.x / 4)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(-90, 70)
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'back',
    })

    paths.cb = new Path()
      .move(points.bottomLeft)
      .line(points.topLeft)
      .addText('centerBack', 'center fill-note text-sm')
      .attr('data-text-dy', 8)
    paths.side = new Path()
      .move(points.bottomRight)
      .line(points.topRight)
      .addClass('hidden')
      .addText('sideSeam', 'center fill-note text-sm')
      .attr('data-text-dy', -1)
    paths.hem = new Path()
      .move(points.bottomLeft)
      .line(points.bottomRight)
      .addClass('hidden')
      .addText('hem', 'center fill-note text-sm')
      .attr('data-text-dy', -1)
    points.topRight
      .addText('attachWaistband', 'fill-note right text-sm')
      .attr('data-text-dy', 8)
      .attr('data-text-dx', -8)
    points.topLeft
      .addText('attachWaistband', 'fill-note left text-sm')
      .attr('data-text-dy', 8)
      .attr('data-text-dx', 8)

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

export const back = { name: 'back', draft: draftBack }
