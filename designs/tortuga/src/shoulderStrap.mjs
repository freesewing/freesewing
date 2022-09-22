import { base, logMeasurement, showPoints } from './base.mjs'
import { neckGusset } from './neckGusset.mjs'
import { body } from './body.mjs'
import { round } from '@freesewing/core'

function draftTortugaShoulderStrap({
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

  const DEBUG = true
  const DEBUG_POINTS = false

  const RIGHT = 0
  const LEFT = 180
  const UP = 90
  const DOWN = -90

  points.topCenter = new Point(0, 0)

  if (!options.shoulderStrapUse) return part

  //------------------------------------------------
  // Length and Width

  // The shoulder strap length covers the shoulder seam and the neck
  // gusset (half of the hypotenuse).
  const neckGussetHypotenuseLength = store.get('neckGussetHypotenuseLength')
  const shoulderLength = store.get('bodyShoulderLength')
  const length = shoulderLength + (neckGussetHypotenuseLength / 2)
  store.set('shoulderLength', length)

  // The width is a percentage of the length
  const width = length * options.shoulderStrapWidth

  // Set our points
  const halfWidth = width / 2
  points.topLeft = points.topCenter.shift(LEFT, halfWidth)
  points.topRight = points.topCenter.shift(RIGHT, halfWidth)
  points.bottomLeft = points.topLeft.shift(DOWN, length)
  points.bottomRight = points.topRight.shift(DOWN, length)

  logMeasurement(part, 'width', width)
  logMeasurement(part, 'length', length)

  // Utility points
  points.bottomCenter = points.topCenter.shift(DOWN, length)
  points.center = points.topCenter.shift(DOWN, length / 2)
  points.centerLeft = points.topLeft.shift(DOWN, length / 2)
  points.centerRight = points.topRight.shift(DOWN, length / 2)

  // Points outside the part, to set additional boundary
  points.topLeftBoundary = points.topLeft
    .shift(UP, width / 2)
    .shift(LEFT, width / 2)
  points.bottomLeftBoundary = points.topLeftBoundary
    .shift(DOWN, length + width)
  points.topRightBoundary = points.topLeftBoundary
      .shift(RIGHT, width * 5)
  points.bottomRightBoundary = points.bottomLeftBoundary
      .shift(RIGHT, width * 5)

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

    let scale = Math.min(1, width / 35)
    if (DEBUG) {
      log.debug('Shoulder strap element scaling: ' + round(scale))
    }

    // Title is outside actual part, inside boundary
    points.title = points.topRight
      .shiftFractionTowards(points.bottomRightBoundary, 0.3)
      .shiftFractionTowards(points.bottomRight, 0.2)
    macro('title', {
      at: points.title,
      nr: 5,
      title: 'Shoulder Strap',
      scale: scale,
    })

    points.grainlineTop = points.topRight
      .shiftFractionTowards(points.bottomLeft, 0.25)
    points.grainlineBottom = points.bottomRight
      .shiftFractionTowards(points.topLeft, 0.25)
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
  }

  return part
}

export const shoulderStrap = {
  name: 'tortuga.shoulderStrap',
  after: [ base, neckGusset, body, ],
  hideDependencies: true,
  draft: draftTortugaShoulderStrap,
}
