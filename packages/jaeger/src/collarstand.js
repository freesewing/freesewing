/*
 * This collar would benefit from a redesign
 * but I find collar design to be rather tricky business and
 * would love the input from someone with more pattern design
 * experience, or more tailoring exprience.
 */

export default function (part) {
  let {
    paperless,
    sa,
    store,
    complete,
    points,
    measurements,
    options,
    macro,
    snippets,
    paths,
    Path,
  } = part.shorthand()

  // Only keep what's relevant from the front part
  let collarPoints = [
    'notch',
    'notchTip',
    'collarCorner',
    'neck',
    'shoulderRoll',
    'shoulderRollCb',
    'collarCbTop',
    'collarCbHelp',
    'collarCbBottom',
    'lapelBreakPoint',
  ]
  for (let i of Object.keys(points)) {
    if (collarPoints.indexOf(i) === -1) delete points[i]
  }
  for (let i of Object.keys(paths)) delete paths[i]

  /**
   * Locate collarstand center back bottom point
   * We are initially moving this point too far (1.1 x the length)
   * but we will fix the length of the curve next
   * Because the new endpoint is so close to the original, there's no need to
   * split this curve. We can use the control point as is.
   */
  points.collarstandCbBottom = points.collarCorner
    .shiftOutwards(points.neck, store.get('backCollarLength') * 1.1) // * 1.1 = 10% too far
    .rotate(store.get('shoulderSlope'), points.neck)
  // Adjust curve to correct length
  points.collarstandCbBottom = new Path()
    .move(points.collarCorner)
    ._curve(points.neck, points.collarstandCbBottom)
    .shiftAlong(store.get('backCollarLength') + points.collarCorner.dist(points.neck)) // now it's correct

  // Locate collarstand center back top point
  points.collarCbTopDirection = points.neck.rotate(-90, points.collarstandCbBottom) // right direction, but too far
  points.collarCbTop = points.collarstandCbBottom.shiftTowards(
    points.collarCbTopDirection,
    measurements.neck * options.collarHeight * 2
  )

  // Rotate points
  let angle = -1 * points.collarstandCbBottom.angle(points.neck)
  for (let i of Object.keys(points)) points[i] = points[i].rotate(angle, points.neck)

  // Collarstand center back top point
  points.collarstandCbTop = points.collarstandCbBottom.shiftFractionTowards(points.collarCbTop, 0.3)
  points.collarstandCbTopCp = points.collarstandCbTop.shift(
    points.collarstandCbBottom.angle(points.neck),
    points.collarstandCbBottom.dist(points.neck)
  )

  // Spread collar
  points.notch = points.notch.rotate(options.collarSpread, points.collarCorner)
  points.notchTip = points.notchTip.rotate(options.collarSpread, points.collarCorner)
  points.shoulderRoll = points.shoulderRoll.rotate(options.collarSpread, points.collarCorner)

  // Collarstand tip
  points.collarstandTip = points.collarCorner.shiftFractionTowards(points.shoulderRoll, 0.6)

  // Collar control points
  points.collarCbTopCp = points.collarCbTop.shift(0, points.collarCbTop.dx(points.notchTip) * 0.6)

  // Now draft the collarstand
  points.leftCollarCorner = points.collarCorner.flipX(points.collarCbTop)
  points.leftCollarstandTip = points.collarstandTip.flipX(points.collarCbTop)
  points.leftNeck = points.neck.flipX(points.collarCbTop)
  points.leftCollarstandCbTopCp = points.collarstandCbTopCp.flipX(points.collarCbTop)

  // Clean up
  for (let i of Object.keys(paths)) delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]

  // Paths
  paths.seam = new Path()
    .move(points.collarCorner)
    ._curve(points.neck, points.collarstandCbBottom)
    .curve_(points.leftNeck, points.leftCollarCorner)
    .line(points.leftCollarstandTip)
    ._curve(points.leftCollarstandCbTopCp, points.collarstandCbTop)
    .curve_(points.collarstandCbTopCp, points.collarstandTip)
    .line(points.collarCorner)
    .close()
    .attr('class', 'fabric')

  /*
  paths.foo = new Path()
    .move(points.collarCorner)
    .line(points.notch)
    .line(points.notchTip)
    ._curve(points.collarCbTopCp, points.collarCbTop)
    .move(points.collarCorner)
    ._curve(points.neck, points.collarstandCbBottom)
    .line(points.collarstandCbTop)
    .curve_(points.collarstandCbTopCp, points.collarstandTip)
  */

  if (complete) {
    // Notches
    macro('sprinkle', {
      snippet: 'notch',
      on: ['collarstandCbBottom', 'collarstandCbTop'],
    })
    // Title
    points.title = points.collarstandCbTop.shiftFractionTowards(points.collarCbBottom, 0.5)
    macro('title', {
      at: points.title,
      nr: 8,
      title: 'collarstand',
    })

    // Grainline
    macro('grainline', {
      from: points.collarstandCbTop,
      to: points.collarstandCbBottom,
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('hd', {
        from: points.leftCollarCorner,
        to: points.collarCorner,
        y: points.collarstandCbBottom.y - sa - 15,
      })
      macro('hd', {
        from: points.leftCollarstandTip,
        to: points.collarstandTip,
        y: points.collarstandTip.y + sa + 15,
      })
      macro('vd', {
        from: points.collarstandTip,
        to: points.collarCorner,
        x: points.collarstandTip.x + sa + 15,
      })
      macro('vd', {
        from: points.collarstandCbTop,
        to: points.collarstandCbBottom,
        x: points.collarstandCbTop.x + 15,
      })
    }
  }

  return part
}
