import { base, logMeasurement, showPoints } from './base.mjs'

function draftTortugaCollar({
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

  // The length is the neck circumference plus an extra amount.
  const length = measurements.neck + 
    measurements.neck * options.collarLength

  // The width of the finished collar is a percentage of the neck
  // circumference.
  const finishedWidth = measurements.neck * options.collarWidth

  // Because the collar is made of a double-width rectangle
  // folded in half, the actual width of the part needs to be
  // doubled.
  const width = finishedWidth * 2

  // Set our points.
  // The collar is drawn with the length as the horizontal dimension
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
    let scale = Math.min(1, width / 300)
    let buttonscale = Math.min(1, width / 150)
    if (buttonscale == 1) {
      buttonscale = width / 175
    }

    // Closure
    let snippet2 = 'buttonhole'
    if (options.collarClosure === 'OneSetOfButtonAndButtonhole' ||
      options.collarClosure === 'TwoSetsOfButtonsAndButtonholes') {
      snippet2 = 'button'
    }
    // Button/hole set 1, nearest bottom of collar
    if (options.collarClosure === 'TwoSetsOfButtonholes' ||
      options.collarClosure === 'OneSetOfButtonholes' ||
      options.collarClosure === 'TwoSetsOfButtonsAndButtonholes' || 
      options.collarClosure === 'OneSetOfButtonAndButtonhole') {

      points.buttonholeBottomLeft = points.bottomLeft
        .shift(RIGHT, finishedWidth / 5)
        .shift(UP, finishedWidth / 4)
      snippets.leftButtonholeBottom = new Snippet('buttonhole',
        points.buttonholeBottomLeft)
        .attr('data-scale', buttonscale)
      points.buttonholeBottomRight = points.buttonholeBottomLeft.flipX()
      snippets.rightButtonholeBottom = new Snippet(snippet2,
        points.buttonholeBottomRight)
        .attr('data-scale', buttonscale)
    }
    // Button/hole set 2, above button/hole 1
    if (options.collarClosure === 'TwoSetsOfButtonholes' ||
      options.collarClosure === 'TwoSetsOfButtonsAndButtonholes') {

      points.buttonholeTopLeft = points.buttonholeBottomLeft
        .shift(UP, width / 8)
      snippets.leftButtonholeTop = new Snippet('buttonhole',
        points.buttonholeTopLeft)
        .attr('data-scale', buttonscale)
      points.buttonholeTopRight = points.buttonholeBottomRight
        .shift(UP, width / 8)
      snippets.rightButtonholeTop = new Snippet(snippet2,
        points.buttonholeTopRight)
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
      nr: 6,
      title: 'Collar',
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
      from: points.centerRight,
      to: points.bottomRight,
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

export const collar = {
  name: 'tortuga.collar',
  after: base,
  hideDependencies: true,
  draft: draftTortugaCollar,
}
