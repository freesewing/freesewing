import { base, logMeasurement, showPoints } from './base.mjs'

function draftTortugaSleeveGusset({
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
  // Gusset size

  const sideLength =
    measurements.shoulderToElbow * options.sleeveGussetLength
  const hypotenuseLength = Math.sqrt(Math.pow(sideLength, 2) * 2)
  logMeasurement(part, 'side length', sideLength)
  logMeasurement(part, 'hypotenuse length', hypotenuseLength)

  store.set('sleeveGussetSideLength', sideLength)
  store.set('sleeveGussetHypotenuseLength', hypotenuseLength)

  const width = sideLength
  const length = sideLength

  // Set our points
  const halfWidth = width / 2
  points.topLeft = points.topCenter.shift(LEFT, halfWidth)
  points.topRight = points.topCenter.shift(RIGHT, halfWidth)
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
      .shiftFractionTowards(points.bottomLeft, 0.3)
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'Sleeve Gusset',
      scale: scale,
    })

    points.grainlineTop = points.topRight
      .shift(DOWN, length / 5).shift(LEFT, width / 8)
    points.grainlineBottom = points.grainlineTop
      .shift(DOWN, length / 2)
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

export const sleeveGusset = {
  name: 'tortuga.sleeveGusset',
  after: base,
  hideDependencies: true,
  draft: draftTortugaSleeveGusset,
}
