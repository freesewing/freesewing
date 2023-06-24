import { shared } from './shared.mjs'

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
  // Reduction from hips to seat
  const reduce = store.get('hipsQuarterReduction')
  // Minimal dart that we consider suitable for sewing
  const minDart = absoluteOptions.minDartWidth

  /*
   * Do we need to add darts?
   * Shaping happens at both back panels, so everthing we take out is doubled.
   * In addition, shaping happens on both side seam and dart, so doubled again
   * So only if the total reduction is more than 4x the minimal dart width do we add darts
   */
  store.set(
    'darts',
    store.get('hipsQuarterReduction') > 4 * absoluteOptions.minDartWidth ? true : false
  )

  // How much shaping should we add in the panel?
  const shaping = store.get('darts') ? reduce - absoluteOptions.dartWidth * 2 : reduce

  /*
   * We start with drawing a simple skirt outline for the back panel
   */
  points.topLeft = new Point(shaping / 2, 0)
  points.topCp = new Point(store.get('backQuarterHips') / 2, 0)
  points.topRight = new Point(
    points.topLeft.x + store.get('backQuarterHips'),
    absoluteOptions.waistSlant
  )
  points.bottomLeft = new Point(0, points.topRight.y + absoluteOptions.length)
  points.bottomRight = new Point(store.get('backQuarterSeat'), points.bottomLeft.y)

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
   * Add back darts, but only if they are not too narrow to sew
   */
  if (store.get('darts')) {
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
  }

  /*
   * Draw the back pockets, or at least their outline
   * We only create the points here, we will only include this outline of the user requests a
   * complete pattern (see below)
   */
  points.waistCenter = points.topLeft.shiftFractionTowards(points.topRight, 0.5)
  points.hemCenter = new Point(points.waistCenter.x, points.bottomRight.y)
  points.pocketBottomRight = points.hemCenter.shiftFractionTowards(points.bottomRight, 0.75)
  points.pocketBottomLeft = points.hemCenter.shiftFractionTowards(points.bottomRight, -0.75)
  points.pocketTopRight = points.pocketBottomRight.shift(
    -90,
    points.pocketBottomRight.dy(points.topRight) * options.backPocketHeight
  )
  points.pocketTopLeft = new Point(points.pocketBottomLeft.x, points.pocketTopRight.y)
  points.chamferLeft = points.pocketBottomLeft.shiftFractionTowards(
    points.pocketBottomRight,
    options.pocketChamferSize
  )
  points.chamferRight = points.pocketBottomRight.shiftFractionTowards(
    points.pocketBottomLeft,
    options.pocketChamferSize
  )
  points.chamferLeftTop = points.chamferLeft.rotate(90, points.pocketBottomLeft)
  points.chamferRightTop = new Point(points.pocketBottomRight.x, points.chamferLeftTop.y)

  /*
   * Also draw the back pocket flap outline
   * We only create the points here, we will only include this outline of the user requests a
   * complete pattern (see below)
   */
  points.flapTopLeft = points.pocketTopRight.shiftFractionTowards(points.pocketTopLeft, 1.02)
  points.flapTopRight = points.pocketTopLeft.shiftFractionTowards(points.pocketTopRight, 1.02)
  points.flapBottomLeft = points.flapTopLeft.shift(
    -90,
    points.flapTopLeft.dy(points.pocketBottomLeft) / 3
  )
  points.flapBottomRight = points.flapTopRight.shift(
    -90,
    points.flapTopLeft.dy(points.pocketBottomLeft) / 4
  )

  /*
   * Draw the actual seamline
   */
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
  // Apply CSS classes and close the seamline path
  paths.seam.addClass('fabric').close()

  // Store the side seam length so we can match it in the front part
  store.set('sideSeam', points.topRight.dist(points.bottomRight))

  /*
   * This complete setting controls whether we just draw and outline (handy for laser cutting and so on)
   * or a complete * pattern with all embellishments.
   */
  if (complete) {
    /*
     * Add skully, the FreeSewing logo :)
     */
    points.logo = points.topLeft
      .shiftFractionTowards(points.bottomLeft, 0.3)
      .shift(0, points.topRight.x / 4)
    snippets.logo = new Snippet('logo', points.logo)

    /*
     * Add a title for this part
     */
    points.title = points.logo.shift(-90, 70)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'back',
    })

    /*
     * Add a grainline to indicate the fabric grain
     */
    points.grainlineTop = points.topRight.shift(225, 25)
    points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomRight.y - 25)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })

    /*
     * Draw the outline of the back pocket on the pattern in dashed line so that people
     * have a visual guide for where the pocket should go when constructing the skirt
     */
    paths.pocket = new Path()
      .move(points.pocketTopLeft)
      .line(points.chamferLeftTop)
      .line(points.chamferLeft)
      .line(points.chamferRight)
      .line(points.chamferRightTop)
      .line(points.pocketTopRight)
      .line(points.pocketTopLeft)
      .close()
      .addClass('note dashed stroke-sm')

    /*
     * Some thing with the pocket flap. Note that drawing both pocket and pocket flap
     * also helps people know which side is up, so to speak.
     */
    paths.flap = new Path()
      .move(points.flapTopRight)
      .line(points.flapTopLeft)
      .line(points.flapBottomLeft)
      .line(points.flapBottomRight)
      .line(points.flapTopRight)
      .close()
      .addClass('note dashed stroke-sm')

    /*
     * Add a note on the center back seam (CB) to clarify this is center back
     */
    paths.cb = new Path()
      .move(points.bottomLeft)
      .line(points.topLeft)
      .addText('centerBack', 'center fill-note text-sm')
      .attr('data-text-dy', 8)
    /*
     * Add a note on the side seam to clarify this is the side
     */
    paths.side = new Path()
      .move(points.bottomRight)
      .line(points.topRight)
      .addClass('hidden')
      .addText('sideSeam', 'center fill-note text-sm')
      .attr('data-text-dy', -1)
    /*
     * Add a note on the hem to clarify this is the hem
     */
    paths.hem = new Path()
      .move(points.bottomLeft)
      .line(points.bottomRight)
      .addClass('hidden')
      .addText('hem', 'center fill-note text-sm')
      .attr('data-text-dy', -1)
    /*
     * Add a note on the top seam to clarify this is where the waistband shoud be attached
     */
    points.topRight
      .addText('attachWaistband', 'fill-note right text-sm')
      .attr('data-text-dy', 8)
      .attr('data-text-dx', -8)
    points.topLeft
      .addText('attachWaistband', 'fill-note left text-sm')
      .attr('data-text-dy', 8)
      .attr('data-text-dx', 8)

    /*
     * Add (back) notches
     */
    const notches = ['pocketTopLeft', 'pocketTopRight']
    if (store.get('darts')) notches.push('dartLeft', 'dartRight', 'dartTip')
    macro('sprinkle', {
      snippet: 'bnotch',
      on: notches,
    })

    /*
     * Does the user want seam allowance (sa) included on the pattern?
     */
    if (sa) {
      /*
       * Our dart complicates matters, so we need a version without the dart as the SA base
       * We also need to make sure the hem allowance is different/bigger
       */
      paths.saBase = new Path()
        .move(points.topLeft)
        .line(points.bottomLeft)
        .line(points.bottomLeft.shift(-90, 2 * sa)) // extra hem SA
        .line(points.bottomRight.shift(-90, 2 * sa)) // extra hem SA
        .line(points.bottomRight)
        .line(points.topRight)
        .join(paths.hipLine)
        .close()
        .hide()
      paths.sa = paths.saBase.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    if (points.topLeft.x > points.bottomLeft.x) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + 3 * sa + 30,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + 3 * sa + 15,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topLeft.y - sa - 15,
      })
      macro('hd', {
        from: points.bottomLeft,
        to: points.topRight,
        y: points.topLeft.y - sa - 30,
      })
    } else {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + 3 * sa + 15,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + 3 * sa + 30,
      })
      macro('hd', {
        from: points.bottomLeft,
        to: points.topRight,
        y: points.topLeft.y - sa - 15,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topLeft.y - sa - 30,
      })
    }
    if (store.get('darts')) {
      macro('hd', {
        from: points.topLeft,
        to: points.dartLeft,
        y: points.topLeft.y + 15,
      })
      macro('hd', {
        from: points.dartRight,
        to: points.topRight,
        y: points.topLeft.y + 15,
      })
      macro('hd', {
        from: points.dartLeft,
        to: points.dartRight,
        y: points.dartTip.y + 15,
      })
      macro('vd', {
        from: points.dartTip,
        to: points.dartRight,
        x: points.dartRight.x + 15,
      })
    }
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}

export const back = {
  name: 'collab:back',
  draft: draftBack,
  after: shared,
}
