import { base, logMeasurement } from './base.mjs'

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
    let scale = Math.min(1, width / 300)

    points.title = points.topCenter
      .shiftFractionTowards(points.bottomCenter, 0.2)
      .shiftFractionTowards(points.bottomRight, 0.1)
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'Neck Gusset',
      scale: scale,
    })

    points.logo = points.bottomCenter
      .shiftFractionTowards(points.bottomLeft, 0.3)
      .shiftFractionTowards(points.topLeft, 0.2)

    snippets.logo = new Snippet('logo', points.logo)
      .attr('data-scale', scale)

    points.grainlineTop = points.topRight
      .shift(DOWN, length / 8).shift(LEFT, width / 10)
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
      for (const p in points) {
        if (p.indexOf('_') > -1) continue
        if (p.indexOf('title') > -1) continue
        if (p.indexOf('logo') > -1) continue
        if (p.indexOf('grainline') > -1) continue
        points[p]
          .attr('data-circle', 3)
          .attr('data-circle-class', 'fill-note')
        points[p + 'label'] = points[p]
          .shiftTowards(points.center, 15)
          .attr('data-text', '(' + p + ')')
          .attr('data-text-class', 'text-lg center fill-note')
      }
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
  hideDependencies, true,
  draft: draftTortugaNeckGusset,
}
