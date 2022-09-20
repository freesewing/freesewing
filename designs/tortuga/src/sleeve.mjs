import { base, logMeasurement, showPoints } from './base.mjs'
import { units } from '@freesewing/core'

function draftTortugaSleeve({
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

  //------------------------------------------------
  // Sleeve width

  const width = measurements.biceps + 
    measurements.biceps * options.sleeveWidth
  logMeasurement(part, 'width', width)

  if (DEBUG) {
    log.debug('Biceps measurement is ' + units(measurements.biceps) +
      ' and sleeve width is ' + units(width) + '.')
  }

  // Set our top left and top right points.
  const halfWidth = width / 2
  points.topLeft = points.topCenter.shift(LEFT, halfWidth)
  points.topRight = points.topCenter.shift(RIGHT, halfWidth)

  //------------------------------------------------
  // Sleeve length

  // Garment length is between hips and knees.
  const length = measurements.shoulderToWrist + 
    measurements.shoulderToWrist * options.sleeveLength
  logMeasurement(part, "length", length)

  // Set our bottom left and bottom right points.
  points.bottomLeft = points.topLeft.shift(DOWN, length)
  points.bottomRight = points.topRight.shift(DOWN, length)

  // Utility points
  points.bottomCenter = points.topCenter.shift(DOWN, length)
  points.center = points.topCenter.shift(DOWN, length / 2)

  //------------------------------------------------
  // Other Paths

  paths.totalPartOutline = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()

  // Complete?
  if (complete) {
    let scale = Math.min(1, width / 200)

    points.title = points.topCenter
      .shiftFractionTowards(points.bottomCenter, 0.3)
      .shiftFractionTowards(points.bottomLeft, 0.2)
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'Sleeve',
      scale: scale,
    })

    points.logo = points.title
      .shiftFractionTowards(points.bottomCenter, 0.4)
    snippets.logo = new Snippet('logo', points.logo)
      .attr('data-scale', scale)

    points.grainlineTop = points.topRight
      .shift(DOWN, length / 10).shift(LEFT, width / 10)
    points.grainlineBottom = points.grainlineTop
      .shift(DOWN, length * 0.6)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
      scale: scale,
    })

    //----------------------------------------
    // Notches


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

    // Garment width
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: bottomSeamY + (sa + 15),
    })
    // Garment length
    macro('vd', {
      from: points.topRight,
      to: points.bottomRight,
      x: rightSeamX + (sa + 15),
    })
  }

  return part
}

export const sleeve = {
  name: 'tortuga.sleeve',
  after: base,
  hideDepencencies: true,
  draft: draftTortugaSleeve,
}
