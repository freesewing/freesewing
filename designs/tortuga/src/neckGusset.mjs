import { base, logMeasurement, showPoints } from './base.mjs'

function draftTortugaNeckGusset({
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
    measurements.shoulderToShoulder * options.neckGussetLength
  const hypotenuseLength = Math.sqrt(Math.pow(sideLength, 2) * 2)
  logMeasurement(part, 'side length', sideLength)
  logMeasurement(part, 'hypotenuse length', hypotenuseLength)

  store.set('neckGussetSideLength', sideLength)
  store.set('neckGussetHypotenuseLength', hypotenuseLength)

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
    let scale = Math.min(1, width / 175)

    points.title = points.topCenter
      .shiftFractionTowards(points.bottomCenter, 0.1)
      .shiftFractionTowards(points.bottomLeft, 0.5)
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'Neck Gusset',
      scale: scale,
    })

    points.grainlineTop = points.topRight
      .shift(DOWN, length / 4).shift(LEFT, width / 5)
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

export const neckGusset = {
  name: 'tortuga.neckGusset',
  after: base,
  hideDependencies: true,
  draft: draftTortugaNeckGusset,
}
