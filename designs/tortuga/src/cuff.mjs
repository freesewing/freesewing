import { base, logMeasurement, showPoints } from './base.mjs'
import { units } from '@freesewing/core'

function draftTortugaCuff({
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
  // Length and Width

  const elbowToWristLength = measurements.shoulderToWrist -
    measurements.shoulderToElbow

  if (DEBUG) log.debug('Elbow to wrist measurement is ' +
    units(elbowToWristLength))

  // The length is the wrist circumference plus some extra.
  const length = measurements.wrist +
    measurements.wrist * options.cuffLength

  // The width of the finished cuff is a percentage of the
  // elbow-to-wrist calculated measurement.
  const finishedWidth = elbowToWristLength * options.cuffWidth

  // Because the cuff is made of a double-width rectangle
  // folded in half, the actual width of the part needs to be
  // doubled.
  const width = finishedWidth * 2

  // Set our points.
  // The cuff is drawn with the length as the horizontal dimension
  // and the width as the vertical dimension.
  const halfLength= length / 2
  points.topLeft = points.topCenter.shift(LEFT, halfLength)
  points.topRight = points.topCenter.shift(RIGHT, halfLength)
  points.bottomLeft = points.topLeft.shift(DOWN, width)
  points.bottomRight = points.topRight.shift(DOWN, width)

  logMeasurement(part, 'width', width)
  logMeasurement(part, 'finished width', finishedWidth)
  logMeasurement(part, 'length', length)

  // Utility points
  points.bottomCenter = points.topCenter.shift(DOWN, width)
  points.center = points.topCenter.shift(DOWN, width / 2)
  points.centerLeft = points.topLeft.shift(DOWN, width / 2)
  points.centerRight = points.topRight.shift(DOWN, width / 2)

  //------------------------------------------------
  // Paths

  paths.actualPart = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    let scale = Math.min(1, width / 200)
    let buttonscale = Math.min(1, width / 100)
    if (buttonscale == 1) {
      buttonscale = width / 80
    }

    // Closure
    let snippet2 = 'buttonhole'
    if (options.cuffClosure === 'ButtonAndButtonhole') {
      snippet2 = 'button'
    }
    if (options.cuffClosure === 'TwoButtonholes' ||
        options.cuffClosure === 'ButtonAndButtonhole') {

      points.buttonholeLeft = points.bottomLeft
        .shiftFractionTowards(points.centerLeft, 0.5)
        .shiftFractionTowards(points.centerRight, 0.05)
      snippets.leftButtonhole = new Snippet('buttonhole',
        points.buttonholeLeft)
        .attr('data-scale', buttonscale)

      points.buttonholeRight = points.buttonholeLeft.flipX()
      snippets.rightButtonhole = new Snippet(snippet2,
        points.buttonholeRight)
        .attr('data-scale', buttonscale)
    }

    paths.foldline = new Path()
      .move(points.centerLeft)
      .line(points.centerRight)
      .attr('class', 'lashed mark')

    points.title = points.topCenter
      .shiftFractionTowards(points.bottomCenter, 0.25)
      .shiftFractionTowards(points.bottomLeft, 0.1)
    macro('title', {
      at: points.title,
      nr: 7,
      title: 'Cuff',
      scale: scale,
    })

    points.grainlineTop = points.bottomLeft
      .shiftFractionTowards(points.topRight, 0.15)
    points.grainlineBottom = points.bottomRight
      .shiftFractionTowards(points.topLeft, 0.15)
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

    // Length
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: bottomSeamY + (sa + 15),
    })
    // Half Width (the finished width)
    macro('vd', {
      from: points.topRight,
      to: points.bottomCenter,
      x: rightSeamX + (sa + 15),
    })
    // Width
    macro('vd', {
      from: points.topRight,
      to: points.bottomRight,
      x: rightSeamX + (sa + (15 * 2)),
    })
  }

  return part
}

export const cuff = {
  name: 'tortuga.cuff',
  after: base,
  hideDependencies: true,
  draft: draftTortugaCuff,
}
