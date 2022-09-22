import { base, logMeasurement, showPoints, UNIVERSAL_DEBUG } from './base.mjs'
import { body } from './body.mjs'
import { round } from '@freesewing/core'

function draftTortugaSideGusset({
  measurements,
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  macro,
  log,
  store,
  part,
}) {

  const DEBUG = UNIVERSAL_DEBUG || false
  const DEBUG_POINTS = false

  const RIGHT = 0
  const LEFT = 180
  const UP = 90
  const DOWN = -90

  points.topCenter = new Point(0, 0)

  if (!options.sideGussetUse) return part

  //------------------------------------------------
  // Gusset size

  const sideVentLength = store.get('sideVentLength')
  const sideLength = sideVentLength * options.sideGussetSize
  const hypotenuseLength = Math.sqrt(Math.pow(sideLength, 2) * 2)
  logMeasurement(part, 'side length', sideLength)
  logMeasurement(part, 'hypotenuse length', hypotenuseLength)

  store.set('sideGussetSideLength', sideLength)
  store.set('sideGussetHypotenuseLength', hypotenuseLength)

  const width = sideLength
  const length = sideLength

  // Set our points
  const halfWidth = width / 2
  points.topLeft = points.topCenter.shift(LEFT, halfWidth)
  points.topRight = points.topCenter.shift(RIGHT, halfWidth)
  points.bottomLeft = points.topLeft.shift(DOWN, length)
  points.bottomRight = points.topRight.shift(DOWN, length)

  // Utility points
  points.bottomCenter = points.topCenter.shift(DOWN, width)
  points.center = points.topCenter.shift(DOWN, width / 2)
  points.centerLeft = points.topLeft.shift(DOWN, width / 2)
  points.centerRight = points.topRight.shift(DOWN, width / 2)

  // Points outside the part, to set additional boundary
  points.topLeftBoundary = points.topLeft
    .shift(UP, width / 2)
    .shift(LEFT, width / 2)
  points.bottomLeftBoundary = points.bottomLeft
    .shift(DOWN, width / 2)
    .shift(LEFT, width / 2)
  points.topRightBoundary = points.topRight
    .shift(UP, width / 2)
    .shift(RIGHT, width * 2)
  points.bottomRightBoundary = points.bottomRight
    .shift(DOWN, width / 2)
    .shift(RIGHT, width * 2)

  //------------------------------------------------
  // Paths

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    
    // Invisible boundary path around the part, to
    // allow extra space for titlte and grainline info.:q
    paths.boundaryOutline = new Path()
      .move(points.topLeftBoundary)
      .line(points.bottomLeftBoundary)
      .line(points.bottomRightBoundary)
      .line(points.topRightBoundary)
      .line(points.topLeftBoundary)
      .close()
      .attr('class' , 'help')
      .attr('style', 'stroke-opacity: 0')

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    paths.foldline = new Path()
      .move(points.topLeft)
      .line(points.bottomRight)
      .attr('class', 'lashed mark')

    let scale = Math.min(1, width / 80)
    if (DEBUG) {
      log.debug('Side gusset element scaling: ' + round(scale))
    }

    // Title is outside actual part, inside boundary
    points.title = points.topRight
      .shiftFractionTowards(points.bottomRightBoundary, 0.4)
      .shiftFractionTowards(points.bottomRight, 0.1)
    macro('title', {
      at: points.title,
      nr: 8,
      title: 'Side Gusset',
      scale: scale,
    })

    points.grainlineTop = points.topRight
      .shift(DOWN, length / 4).shift(LEFT, width / 4)
    points.grainlineBottom = points.grainlineTop
      .shift(DOWN, length / 2)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
      scale: scale,
    })

    if (DEBUG_POINTS) {
      showPoints(points, scale, textsize)
    }
  }

  // Paperless?
  if (paperless) {

    delete paths.foldline

    // Dimensions
    let topSeamY = points.topRight.y
    let bottomSeamY = points.bottomLeft.y
    let rightSeamX = points.topRight.x
    let leftSeamX = points.topLeft.x

    // Width
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: bottomSeamY + (sa + 15),
    })
    // Length
    macro('vd', {
      from: points.topRight,
      to: points.bottomRight,
      x: rightSeamX + (sa + 15),
    })
    // Hypotenuse
    macro('ld', {
      from: points.topLeft,
      to: points.bottomRight,
    })
  }

  return part
}

export const sideGusset = {
  name: 'tortuga.sideGusset',
  after: [ base, body, ],
  hideDependencies: true,
  draft: draftTortugaSideGusset,
}
