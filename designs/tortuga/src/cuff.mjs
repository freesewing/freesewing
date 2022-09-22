import { base, logMeasurement, showPoints, UNIVERSAL_DEBUG } from './base.mjs'
import { shoulderStrap } from './shoulderStrap.mjs'
import { sleeve } from './sleeve.mjs'
import { round } from '@freesewing/core'

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
  units,
  part,
}) {

  const DEBUG = UNIVERSAL_DEBUG || false
  const DEBUG_POINTS = false

  const RIGHT = 0
  const LEFT = 180
  const UP = 90
  const DOWN = -90

  points.topCenter = new Point(0, 0)

  //------------------------------------------------
  // Length and Width

  // Retrieve the width calculated in sleeve.mjs
  const finishedWidth = store.get('cuffFinishedWidth')

  // Because the cuff is made of a double-width rectangle
  // folded in half, the actual width of the fabric needs to be
  // doubled.
  const width = finishedWidth * 2

  // The length is the wrist circumference plus some extra.
  const length = measurements.wrist +
     measurements.wrist * options.cuffLength

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
  store.set('cuffWidth', width)
  store.set('cuffLength', length)

  // Utility points
  points.bottomCenter = points.topCenter.shift(DOWN, width)
  points.center = points.topCenter.shift(DOWN, width / 2)
  points.centerLeft = points.topLeft.shift(DOWN, width / 2)
  points.centerRight = points.topRight.shift(DOWN, width / 2)

  //------------------------------------------------
  // Finished sleeve length

  // The cuff waits after shoulderStrap and sleeve in order
  // to have the information needed to calculate the total sleeve
  // length.

  const bodyShoulderLength = store.get('shoulderLength')
  const sleeveLength = store.get('sleeveLength')
  const cuffLength = finishedWidth
  const fullFabricSleeveAndShoulderLength =
    bodyShoulderLength + sleeveLength + cuffLength
  
  // The amount of sleeve provided by the body part.
  const bodySleeveLength = bodyShoulderLength - measurements.neckToShoulder
  log.info('Amount of sleeve provided by body part: ' +
    units(bodySleeveLength))

  // Equivalent sleeve length is the length of the garment fabric
  // measured from the shoulder to the wrist, taking into account
  // the amount of sleeve provided by the body part.
  // It is what most people think of as the length of the sleeve
  // in the finished garment.
  const equivalentSleeveLength = fullFabricSleeveAndShoulderLength -
    measurements.neckToShoulder
  log.info('Actual finished garment sleeve length: ' +
    units(equivalentSleeveLength))
  log.info('Shoulder to wrist measurement is ' +
    units(measurements.shoulderToWrist) +
    ' and actual finished sleeve length is ' +
    units(equivalentSleeveLength) + '.')
  const excessSleeveLength = equivalentSleeveLength -
    measurements.shoulderToWrist
  log.info('Excess sleeve length: ' + units(excessSleeveLength))

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

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    let scale = Math.min(1, width / 200)
    let buttonscale = Math.min(1, width / 100)
    if (buttonscale == 1) {
      buttonscale = width / 80
    }
    if (DEBUG) {
      log.debug('Cuff element scaling: ' + round(scale))
      log.debug('Cuff button/hole scaling: ' + round(buttonscale))
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

export const cuff = {
  name: 'tortuga.cuff',
  after: [ base, shoulderStrap, sleeve, ],
  hideDependencies: true,
  draft: draftTortugaCuff,
}
