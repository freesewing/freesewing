import { back } from './back.mjs'
import { front } from './front.mjs'
import { init } from './init.mjs'

function draftBruceSide({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  complete,
  paperless,
  macro,
  utils,
  snippets,
  Snippet,
  log,
  part,
}) {
  let adjustment_warning = false

  // Initialize
  init(part)

  // Top left
  points.zero = new Point(0, 0)
  points.topLeft = points.zero.shift(90, store.get('rise'))

  // Top right
  points.topRight = new Point(store.get('hipsSide'), points.topLeft.y)

  // Bottom right
  points.bottomRight = points.topRight.shift(-90, store.get('fullLength'))

  // Find bottom left
  let isect = utils.circlesIntersect(
    points.bottomRight,
    store.get('legSide'),
    points.topLeft,
    store.get('backSeamLength')
  )
  if (isect) {
    points.bottomLeft = isect[0]
  } else {
    // The circles are too far apart to intersect. Print a warning message
    // and compromise by placing the bottom left point at the midpoint.
    log.warning('Unable to calculate a correct bottom left point on the side part.')
    adjustment_warning = true
    points.bottomLeft = points.bottomRight.shiftFractionTowards(points.topLeft, 0.5)
  }

  // Store side seam length
  store.set('sideSeamLength', points.topRight.dist(points.bottomRight))

  // Handle back rise
  points.topLeft = points.topLeft.shift(90, store.get('sideRise'))
  points.topRight = points.topRight.shift(90, store.get('frontRise'))

  // Path
  paths.saBase = new Path()
    .move(points.bottomLeft)
    .line(points.topLeft)
    .line(points.topRight)
    .line(points.bottomRight)
  paths.hemBase = new Path().move(points.bottomRight).line(points.bottomLeft)
  paths.saBase.hide()
  paths.hemBase.hide()
  paths.seam = paths.saBase.join(paths.hemBase).close().attr('class', 'fabric')

  // Anchor point for sampling
  points.anchor = points.topLeft

  // Complete pattern?
  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      at: points.title.shift(90, 30),
      nr: 3,
      title: 'side',
    })
    macro('scalebox', { at: points.title.shift(-90, 40) })
    if (sa) {
      paths.sa = paths.saBase
        .offset(sa * -1)
        .join(paths.hemBase.offset(sa * -2))
        .close()
        .attr('class', 'fabric sa')
    }
    macro('grainline', {
      from: new Point(points.bottomRight.x / 2, points.bottomRight.y),
      to: new Point(points.bottomRight.x / 2, points.topRight.y),
    })
    snippets.frontNotch = new Snippet(
      'notch',
      points.topRight.shiftTowards(points.bottomRight, store.get('frontNotch'))
    )
    snippets.backNotch = new Snippet(
      'bnotch',
      points.topLeft.shiftFractionTowards(points.bottomLeft, 0.5)
    )
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - 15 - sa,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + 15 + sa,
    })
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y - 15 - sa,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + 15 + sa,
    })
  }

  if (adjustment_warning) {
    log.warning(
      'We were not able to generate the Side pattern piece correctly. ' +
        'Manual fitting and alteration of this and other pattern pieces ' +
        'are likely to be needed. ' +
        'First, please retake your measurements and generate a new pattern ' +
        'using the new measurements. ' +
        'If you still see this warning with the new pattern, then please ' +
        'make a test garment, check fit, and make alterations as necessary ' +
        'before trying to make the final garment.'
    )
  }

  return part
}

export const side = {
  name: 'bruce.side',
  after: [back, front],
  draft: draftBruceSide,
}
