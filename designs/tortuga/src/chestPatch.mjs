import { base, logMeasurement, showPoints, UNIVERSAL_DEBUG } from './base.mjs'
import { round } from '@freesewing/core'

function draftTortugaChestPatch({
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

  if (options.chestPatch == 'none') return part

  //------------------------------------------------
  // Patch size

  const sideLength = measurements.neck / 15

  const width = sideLength
  const length = sideLength

  // Set our points

  // For a square patch.
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

  // For a heart-shaped patch.
  points.heartBottom = points.bottomCenter
  points.heartLeft = points.topLeft
    .shift(LEFT, halfWidth / 2)
    .shift(DOWN, halfWidth / 4)
  points.heartRight = points.heartLeft.flipX(points.heartCenter)
  const heartSideLength = points.heartBottom.dist(points.heartLeft)
  points.heartCenter = points.topCenter.shift(UP, halfWidth / 3)
  points.heartTopLeft = points.heartLeft
    .shiftFractionTowards(points.heartCenter, 0.5)
    .shift(UP, width / 2.5)
  points.heartTopRight = points.heartTopLeft.flipX(points.heartCenter)
  points.heartLeftCp2 = points.heartLeft.shift(UP, halfWidth / 2)
  points.heartLeftCp1 = points.heartTopLeft.shift(LEFT, halfWidth / 2)
  points.heartRightCp1 = points.heartLeftCp2.flipX(points.heartCenter)
  points.heartRightCp2 = points.heartLeftCp1.flipX(points.heartCenter)
  points.heartLeftCp4 = points.heartTopLeft.shift(RIGHT, halfWidth / 2)
  points.heartLeftCp3 = points.heartCenter.shift(UP, halfWidth / 3 ) 
  points.heartRightCp3 = points.heartLeftCp4.flipX(points.heartCenter)
  points.heartRightCp4 = points.heartLeftCp3.flipX(points.heartCenter)

  if (options.chestPatch === 'square') {
    logMeasurement(part, 'square side length', sideLength)
  } else {
    logMeasurement( part, 'heart width',
      points.heartLeft.dist(points.heartRight))
    logMeasurement( part, 'heart height',
      points.heartTopRight.dy(points.heartBottom))
  }

  // Points outside the part, to set additional boundary
  let topLeftToUse = points.topLeft.clone()
  if (options.chestPatch === 'heart')
    topLeftToUse = points.heartTopLeft.clone()
  points.topLeftBoundary =
    new Point(points.topLeft.x, topLeftToUse.y)
    .shift(UP, width)
    .shift(LEFT, width)
  points.bottomLeftBoundary = points.bottomLeft
    .shift(DOWN, width)
    .shift(LEFT, width)
  points.topRightBoundary =
    new Point(points.topRight.x, topLeftToUse.y)
    .shift(UP, width)
    .shift(RIGHT, width * 3)
  points.bottomRightBoundary = points.bottomRight
    .shift(DOWN, width)
    .shift(RIGHT, width * 3)

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

  if (options.chestPatch === 'heart') {
    paths.seam = new Path()
      .move(points.heartBottom)
      .line(points.heartRight)
      .curve(points.heartRightCp1, points.heartRightCp2, points.heartTopRight)
      .curve(points.heartRightCp3, points.heartRightCp4, points.heartCenter)
      .curve(points.heartLeftCp3, points.heartLeftCp4, points.heartTopLeft)
      .curve(points.heartLeftCp1, points.heartLeftCp2, points.heartLeft)
      .line(points.heartBottom)
      .close()
      .attr('class', 'fabric')
  }

  // Complete?
  if (complete) {
    
    // Invisible boundary path around the part, to
    // allow extra space for titlte and grainline info.
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
      log.debug('Chest patch element scaling: ' + round(scale))
    }

    // Title is outside actual part, inside boundary
    points.title = points.topRight
      .shiftFractionTowards(points.bottomRightBoundary, 0.4)
      .shiftFractionTowards(points.bottomRight, 0.1)
      .shiftFractionTowards(points.topRightBoundary, 0.1)
    macro('title', {
      at: points.title,
      nr: 10,
      title: 'Chest Patch',
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
    if (options.chestPatch === 'heart') rightSeamX = points.heartRight.x

    if (options.chestPatch === 'heart') {
      // Width
      macro('hd', {
        from: points.heartLeft,
        to: points.heartRight,
        y: bottomSeamY + (sa + 15),
      })
      // Length
      macro('vd', {
        from: points.heartTopRight,
        to: points.heartBottom,
        x: rightSeamX + (sa + 15),
      })
    } else {
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
  }

  return part
}

export const chestPatch = {
  name: 'tortuga.chestPatch',
  after: base,
  hideDependencies: true,
  draft: draftTortugaChestPatch,
}
