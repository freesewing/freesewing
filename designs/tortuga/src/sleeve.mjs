import { base, logMeasurement, showPoints } from './base.mjs'
import { sleeveGusset } from './sleeveGusset.mjs'
import { round } from '@freesewing/core'

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
  units,
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
  store.set('sleeveCircumference', width)

  log.info('Biceps measurement is ' + units(measurements.biceps) +
    ' and sleeve width is ' + units(width) + '.')
  log.info('Sleeve biceps ease: ' +
    units(width - measurements.biceps))

  // Set our top left and top right points.
  const halfWidth = width / 2
  points.topLeft = points.topCenter.shift(LEFT, halfWidth)
  points.topRight = points.topCenter.shift(RIGHT, halfWidth)

  //------------------------------------------------
  // Sleeve length

  // The cuff width previously was calculated in cuff.mjs, but because
  // we need it here and because cuff.mjs is afer: sleeve.mjs, we
  // are putting the code here and storing it.
  // The width of the finished cuff is a percentage of the
  // elbow-to-wrist calculated measurement.
  const elbowToWrist = measurements.elbowToWrist
  const finishedWidth = elbowToWrist * options.cuffWidth
  store.set('cuffFinishedWidth', finishedWidth)

  // Length is from shoulder to wrist, plus/minus an additional percent,
  // minus the cuff width.
  const length = measurements.shoulderToWrist + 
    (measurements.shoulderToWrist * options.sleeveLength) -
    finishedWidth
  logMeasurement(part, "length", length)
  store.set('sleeveLength', length)

  // Set our bottom left and bottom right points.
  points.bottomLeft = points.topLeft.shift(DOWN, length)
  points.bottomRight = points.topRight.shift(DOWN, length)

  // Utility points
  points.bottomCenter = points.topCenter.shift(DOWN, length)
  points.center = points.topCenter.shift(DOWN, length / 2)

  // Sleeve vent
  const elbowToWristLength = measurements.shoulderToWrist -
    measurements.shoulderToElbow

  const ventLength = elbowToWristLength * options.sleeveVentLength
  points.ventTopLeft = points.bottomLeft
    .shift(UP, ventLength)
  points.ventTopRight = points.bottomRight
    .shift(UP, ventLength)
 
  // Sleeve gusset
  const sleeveGussetSideLength = store.get('sleeveGussetSideLength')
  points.gussetBottomLeft = points.topLeft
    .shift(DOWN, sleeveGussetSideLength)
  points.gussetBottomRight = points.topRight
    .shift(DOWN, sleeveGussetSideLength)

  //------------------------------------------------
  // Paths

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()

  if (complete) {

    paths.seam.hide()

    paths.seamTop = new Path()
      .move(points.topRight)
      .line(points.topLeft)
      .attr('class', 'fabric')

    paths.seamBottom = new Path()
      .move(points.bottomLeft)
      .line(points.bottomRight)
      .attr('class', 'fabric')

    paths.ventLeft = new Path()
      .move(points.ventTopLeft)
      .line(points.bottomLeft)
      .attr('class', 'dashed fabric')

    paths.ventRight = new Path()
      .move(points.bottomRight)
      .line(points.ventTopRight)
      .attr('class', 'dashed fabric')

    paths.gussetLeft = new Path()
      .move(points.topLeft)
      .line(points.gussetBottomLeft)
      .attr('class', 'dashed fabric')

    paths.gussetRight = new Path()
      .move(points.gussetBottomRight)
      .line(points.topRight)
      .attr('class', 'dashed fabric')

    paths.seamLeft = new Path()
      .move(points.gussetBottomLeft)
      .line(points.ventTopLeft)
      .attr('class', 'fabric')
    paths.seamRight = new Path()
      .move(points.ventTopRight)
      .line(points.gussetBottomRight)
      .attr('class', 'fabric')
  }

  // Complete?
  if (complete) {
    
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    let scale = Math.min(1, width / 200)
    let textsize = 'text-md'
    if (scale < .75) textsize = 'text-sm'
    if (scale < .5) textsize = 'text-xs'
    if (DEBUG) {
      log.debug('Sleeve element scaling: ' + round(scale))
      log.debug('Sleeve text size: ' + textsize)
    }

    snippets.ventTopLeftNotch = new Snippet('notch', points.ventTopLeft)
    snippets.ventTopRightNotch = new Snippet('notch', points.ventTopRight)
    snippets.gussetBottomLeftNotch = new Snippet('notch',
      points.gussetBottomLeft)
    snippets.gussetBottomRightNotch = new Snippet('notch',
      points.gussetBottomRight)

    points.topText = points.topCenter
      .shift(DOWN, Math.min(length / 20, 10))
      .attr('data-text', 'Shoulder')
      .attr('data-text-class', `fill-note ${textsize}`)

    points.bottomText = points.bottomCenter
      .attr('data-text', 'Wrist')
      .attr('data-text-class', `fill-note ${textsize}`)

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
    // Gusset area
    macro('vd', {
      from: points.topLeft,
      to: points.gussetBottomLeft,
      x: leftSeamX - (sa + 15),
    })
    // Vent
    macro('vd', {
      from: points.ventTopLeft,
      to: points.bottomLeft,
      x: leftSeamX - (sa + 15),
    })
  }

  return part
}

export const sleeve = {
  name: 'tortuga.sleeve',
  after: [ base, sleeveGusset ],
  hideDepencencies: true,
  draft: draftTortugaSleeve,
}
