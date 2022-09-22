import { base, logMeasurement, showPoints } from './base.mjs'
import { round } from '@freesewing/core'

function draftTortugaSideAndSleevePatch({
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

  if (!options.sidePatch) return part

  //------------------------------------------------
  // Patch size

  const sideLength = measurements.neck / 15
  logMeasurement(part, 'square side length', sideLength)

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
    .shift(UP, width)
    .shift(LEFT, width)
  points.bottomLeftBoundary = points.bottomLeft
    .shift(DOWN, width)
    .shift(LEFT, width)
  points.topRightBoundary = points.topRight
    .shift(UP, width)
    .shift(RIGHT, width * 4)
  points.bottomRightBoundary = points.bottomRight
    .shift(DOWN, width)
    .shift(RIGHT, width * 4)

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

    let scale = Math.min(1, width / 60)
    if (DEBUG) {
      log.debug('Side patch element scaling: ' + round(scale))
    }

    // Title is outside actual part, inside boundary
    points.title = points.topRight
      .shiftFractionTowards(points.bottomRightBoundary, 0.4)
      .shiftFractionTowards(points.bottomRight, 0.1)
      .shiftFractionTowards(points.topRightBoundary, 0.1)
    macro('title', {
      at: points.title,
      nr: 9,
      title: 'Side and Sleeve Patch',
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

export const sideAndSleevePatch = {
  name: 'tortuga.sideAndSleevePatch',
  after: base,
  hideDependencies: true,
  draft: draftTortugaSideAndSleevePatch,
}
