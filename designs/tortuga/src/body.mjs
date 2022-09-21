import { base, logMeasurement, showPoints } from './base.mjs'
import { sleeveGusset } from './sleeveGusset.mjs'
import { neckGusset } from './neckGusset.mjs'

function draftTortugaBody({
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
  // Garment width

  // By default, the garment width is based on shoulder-to-shoulder
  const multipleShoulderWidth =
    measurements.shoulderToShoulder +
    (measurements.shoulderToShoulder * options.garmentWidth)
  let width = multipleShoulderWidth
  let widthMeasurementUsed = 'Multiple Shoulder-to-shoulder width'
  if (DEBUG) log.debug('Multiple shoulder width: ' + multipleShoulderWidth)

  // However, increase the width to accommodate the largest circumference,
  // chest, waist, hips, or seat, to make sure the garment fits.
  const chestWidth = measurements.chest / 2
  const waistWidth = measurements.waist / 2
  const hipsWidth = measurements.hips / 2
  const seatWidth = measurements.seat / 2
  if (DEBUG) {
    log.debug('Chest width: ' + chestWidth)
    log.debug('Waist width: ' + waistWidth)
    log.debug('Hips width: ' + hipsWidth)
    log.debug('Seat width: ' + seatWidth)
  }
  if (chestWidth > width) {
    width = chestWidth
    widthMeasurementUsed = 'Chest circumference'
  }
  if (waistWidth > width) {
    width = waistWidth
    widthMeasurementUsed = 'Waist circumference'
  }
  if (hipsWidth > width) {
    width = hipsWidth
    widthMeasurementUsed = 'Hips circumference'
  }
  if (seatWidth > width) {
    width = seatWidth
    widthMeasurementUsed = 'Seat circumference'
  }
  if (widthMeasurementUsed !== 'Multiple Shoulder-to-shoulder width')
    log.info('Garment width based on: ' + widthMeasurementUsed)

  // Set our top left and top right points.
  const halfWidth = width / 2
  points.topLeft = points.topCenter.shift(180, halfWidth)
  points.topRight = points.topCenter.shift(0, halfWidth)

  logMeasurement(part, 'width', width)
  logMeasurement(part, 'half width', halfWidth)

  //------------------------------------------------
  // Garment length

  // Garment length is between hips and knees.
  const hipY = measurements.hpsToWaistFront + measurements.waistToHips
  const kneeY = measurements.hpsToWaistFront + measurements.waistToKnee
  const hipToKneeLength = kneeY - hipY
  const equalLength = hipY + hipToKneeLength * options.garmentLength

  const backAdditionalLength = equalLength * options.garmentExtraBackLength
  const backLength = equalLength + backAdditionalLength
  const frontLength = equalLength * 2 - backLength

  logMeasurement(part, 'front length', frontLength)
  logMeasurement(part, 'back length', backLength)
  logMeasurement(part, 'full length', frontLength + backLength)

  // Set our bottom left and bottom right points.
  points.bottomLeft = points.topLeft.shift(DOWN, frontLength)
  points.bottomRight = points.topRight.shift(DOWN, frontLength)
  points.center = points.topCenter.shift(DOWN, length / 2)

  points.bottomLeftBack = points.topLeft.shift(DOWN, backLength)
  points.bottomRightBack = points.topRight.shift(DOWN, backLength)
  points.topLeftSingle = points.topLeft.shift(UP, backLength)
  points.topRightSingle = points.topRight.shift(UP, backLength)

  //------------------------------------------------
  // Neck

  // Neck slit is based on neck size, limited by garment width
  const neckWidth = measurements.neck / 2
  let neckSlitLength = neckWidth + neckWidth * options.neckSlitLength
  if (neckSlitLength > width) neckSlitLength = width * 0.95
  const halfNeckSlitLength = neckSlitLength / 2

  points.neckSlitLeft = points.topCenter.shift(180, halfNeckSlitLength)
  points.neckSlitRight = points.topCenter.shift(0, halfNeckSlitLength)

  paths.neckSlit = new Path()
    .move(points.neckSlitRight)
    .line(points.neckSlitLeft)
    .attr('class', 'fabric dashed')

  logMeasurement(part, 'half neck slit length', halfNeckSlitLength)
  logMeasurement(part, 'full neck slit length', neckSlitLength)

  // Save shoulder length to use in shoulder strap
  const shoulderLength = halfWidth - halfNeckSlitLength
  store.set('shoulderLength', shoulderLength)

  //------------------------------------------------
  // Chest

  // Chest slit is based on HPS-to-bust
  const chestSlitLength = measurements.hpsToBust * options.chestSlitLength
  points.chestSlitTop = points.topCenter.clone()
  points.chestSlitBottom = points.chestSlitTop.shift(DOWN, chestSlitLength)

  // chestSlitLength

  paths.chestSlit = new Path()
    .move(points.chestSlitTop)
    .line(points.chestSlitBottom)
    .attr('class', 'fabric dashed')

  logMeasurement(part, 'chest slit length', chestSlitLength)

  //------------------------------------------------
  // Armscye

  const armscyeLength = measurements.biceps * options.armscyeLength
  points.armscyeBottomLeft = points.topLeft
    .shiftTowards(points.bottomLeft, armscyeLength)
  points.armscyeBottomRight = points.topRight
    .shiftTowards(points.bottomRight, armscyeLength)

  points.armscyeBottomLeftSingle = points.topLeft
    .shiftTowards(points.topLeftSingle, armscyeLength)
  points.armscyeBottomRightSingle = points.topRight
    .shiftTowards(points.topRightSingle, armscyeLength)

  logMeasurement(part, 'armscye length', armscyeLength)

  // Save armscye length to use in sleeve binding
  store.set('armscyeLength', armscyeLength)

  //------------------------------------------------
  // Side Vents

  const sideVentLength = equalLength * options.sideVentLength
  points.sideVentTopLeft = points.bottomLeft.shift(UP, sideVentLength)
  points.sideVentTopRight = points.bottomRight.shift(UP, sideVentLength)

  points.sideVentTopLeftSingle = points.topLeftSingle
    .shift(DOWN, sideVentLength)
  points.sideVentTopRightSingle = points.topRightSingle
    .shift(DOWN, sideVentLength)
  points.sideVentTopLeftBack = points.bottomLeftBack
    .shift(UP, sideVentLength)
  points.sideVentTopRightBack = points.bottomRightBack
    .shift(UP, sideVentLength)

  logMeasurement(part, 'side vent length', sideVentLength)

  //------------------------------------------------
  // Other Paths

  paths.totalPartOutline = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .hide()

  paths.sideSeamLeft = new Path()
    .move(points.armscyeBottomLeft)
    .line(points.sideVentTopLeft)
    .attr('class', 'fabric')

  paths.sideSeamRight = new Path()
    .move(points.sideVentTopRight)
    .line(points.armscyeBottomRight)
    .attr('class', 'fabric')

  paths.sideVentLeft = new Path()
    .move(points.sideVentTopLeft)
    .line(points.bottomLeft)
    .attr('class', 'fabric dashed')

  paths.sideVentRight = new Path()
    .move(points.bottomRight)
    .line(points.sideVentTopRight)
    .attr('class', 'fabric dashed')

  paths.bottom = new Path()
    .move(points.bottomLeft)
    .line(points.bottomRight).attr('class', 'fabric')

  if (frontLength != backLength) {
    paths.sideVentLeftBack = new Path()
      .move(points.sideVentTopLeftBack)
      .line(points.bottomLeftBack)
      .attr('class', 'fabric dashed')

    paths.sideVentRightBack = new Path()
      .move(points.bottomRightBack)
      .line(points.sideVentTopRightBack)
      .attr('class', 'fabric dashed')

    paths.bottomBack = new Path()
      .move(points.bottomLeftBack)
      .line(points.bottomRightBack)
      .attr('class', 'fabric')

    if (points.sideVentTopLeftBack.y > points.bottomLeft.y) {
      paths.extraSeamLeft = new Path()
        .move(points.bottomLeft)
        .line(points.sideVentTopLeftBack)
        .attr('class', 'fabric')
      paths.extraSeamRight = new Path()
        .move(points.sideVentTopRightBack)
        .line(points.bottomRight)
        .attr('class', 'fabric')
    }
  }

  paths.armsceyeLeft = new Path()
    .move(points.topLeft)
    .line(points.armscyeBottomLeft)
    .attr('class', 'fabric dashed')

  paths.armsceyeRight = new Path()
    .move(points.armscyeBottomRight)
    .line(points.topRight)
    .attr('class', 'fabric dashed')

  paths.topSeamRight = new Path()
    .move(points.topRight)
    .line(points.neckSlitRight)
    .attr('class', 'fabric')

  paths.topSeamLeft = new Path()
    .move(points.neckSlitLeft)
    .line(points.topLeft)
    .attr('class', 'fabric')

  if (options.singleFrontBack) {
    paths.topSeamLeft
      .attr('class', 'lashed mark')
    paths.topSeamRight
      .attr('class', 'lashed mark')

    paths.totalPartOutline = new Path()
      .move(points.topLeftSingle)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRightSingle)
      .line(points.topLeftSingle)
      .close()
      .hide()

    paths.sideVentLeftSingle = new Path()
      .move(points.topLeftSingle)
      .line(points.sideVentTopLeftSingle)
      .attr('class', 'fabric dashed')

    paths.sideVentRightSingle = new Path()
      .move(points.sideVentTopRightSingle)
      .line(points.topRightSingle)
      .attr('class', 'fabric dashed')

    paths.sideSeamLeftSingle = new Path()
      .move(points.sideVentTopLeftSingle)
      .line(points.armscyeBottomLeftSingle)
      .attr('class', 'fabric')

    paths.sideSeamRightSingle = new Path()
      .move(points.armscyeBottomRightSingle)
      .line(points.sideVentTopRightSingle)
      .attr('class', 'fabric')

    paths.armsceyeLeft = new Path()
      .move(points.armscyeBottomLeftSingle)
      .line(points.armscyeBottomLeft)
      .attr('class', 'fabric dashed')

    paths.armsceyeRight = new Path()
      .move(points.armscyeBottomRight)
      .line(points.armscyeBottomRightSingle)
      .attr('class', 'fabric dashed')

    paths.top = new Path()
      .move(points.topRightSingle)
      .line(points.topLeftSingle)
      .attr('class', 'fabric')
  }

  // Complete?
  if (complete) {
    let scale = Math.min(1, width / 200)
    let textsize = 'text-md'
    if (scale < .75) textsize = 'text-sm'
    if (scale < .5) textsize = 'text-xs'
    if (DEBUG) {
      log.debug('Body Element scaling: ' + scale)
      log.debug('Body Text size: ' + textsize)
    }

    points.title = points.chestSlitBottom.shiftFractionTowards(
      points.bottomRight.shiftFractionTowards(points.bottomLeft, 0.25),
      0.4
    )
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'Front and Back',
      scale: scale,
    })

    points.logo = points.chestSlitBottom
      .shiftFractionTowards(points.bottomLeft, 0.4)
    snippets.logo = new Snippet('logo', points.logo)
      .attr('data-scale', scale)

    // Arrr!
    let arrr_scale = Math.min(1, width / 200)
    let arrr_textsize = 'text-md'
    let arrr_offset = 0.2
    let arrr_shiftback = 0.5
    if (arrr_scale < 1.0) {
      arrr_textsize = 'text-sm'
      arrr_offset = 0.1
      arrr_shiftback = 0
    }
    if (arrr_scale < 0.7) {
      arrr_textsize = 'text-xs'
      arrr_offset = 0.05
    }
    if (arrr_scale == 1) {
      arrr_scale = width / 75
    }
    if (arrr_scale > 6) {
      arrr_textsize = 'text-xl'
      arrr_shiftback = 0.6
    }
    if (arrr_scale > 9) {
      arrr_textsize = 'text-2xl'
      arrr_shiftback = 0.8
    }
    if (arrr_scale > 12) {
      arrr_textsize = 'text-3xl'
    }
    if (arrr_scale > 15) {
      arrr_textsize = 'text-4xl'
    }
    if (arrr_scale > 20) {
      arrr_textsize = 'text-5xl'
    }
    points.logo_t1 = points.logo
      .shiftTowards(points.topRight, width / 5)
      .shiftFractionTowards(points.logo, arrr_shiftback)
    points.logo_t2 = points.logo_t1
      .shift(UP, width / 20)
      .shift(RIGHT, width / 40)
    points.logo_t0 = points.logo_t1
      .shift(UP, width / 20)
    points.logo_t3 = points.logo_t2
      .shift(UP, width / 40)
      .shift(RIGHT, width / 20)
    points.logo_c23a = points.logo_t2
      .shift(RIGHT, width / 40)
    points.logo_c23b = points.logo_t2
      .shift(UP, width / 90)
      .shift(RIGHT, width / 20)
    points.logo_t4 = points.logo_t3
      .shift(UP, width / 40)
      .shift(LEFT, width / 17)
    points.logo_c34a = points.logo_t3
      .shift(UP, width / 60)
    points.logo_c34b = points.logo_t3
      .shift(UP, width / 40)
      .shift(LEFT, width / 30)
    points.logo_t5 = points.logo_t3.flipX(points.logo_t4)
    points.logo_c45a = points.logo_c34b.flipX(points.logo_t4)
    points.logo_c45b = points.logo_c34a.flipX(points.logo_t4)
    points.logo_c50a = points.logo_c23b.flipX(points.logo_t4)
    points.logo_c50b = points.logo_c23a.flipX(points.logo_t4)

    paths.arrr = new Path()
      .move(points.logo_t0)
      .line(points.logo_t1)
      .line(points.logo_t2)
      .curve(points.logo_c23a, points.logo_c23b, points.logo_t3)
      .curve(points.logo_c34a, points.logo_c34b, points.logo_t4)
      .curve(points.logo_c45a, points.logo_c45b, points.logo_t5)
      .curve(points.logo_c50a, points.logo_c50b, points.logo_t0)
      .close()

    points.arrr = points.logo_t0
      .shiftFractionTowards(points.logo_t4, arrr_offset)
      .shiftFractionTowards(points.logo_t5, arrr_offset)
      .attr('data-text', 'Arrr!')
      .attr('data-text-class', `fill-contrast ${arrr_textsize}`)
    if (DEBUG) {
      log.debug('Arrr scale: ' + arrr_scale)
      log.debug('Arrr offset: ' + arrr_offset)
      log.debug('Arrr textsize: ' + arrr_textsize)
    }

    points.grainlineTop = points.topRight
      .shift(DOWN, frontLength / 10).shift(LEFT, width / 10)
    points.grainlineBottom = points.grainlineTop
      .shift(DOWN, frontLength * 0.6)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
      scale: scale,
    })

    //----------------------------------------
    // Notches and text

    snippets.neckSlitLeftNotch = new Snippet('notch', points.neckSlitLeft)
      .attr('data-scale', scale)
    snippets.neckSlitrightNotch = new Snippet('notch', points.neckSlitRight)
      .attr('data-scale', scale)
    snippets.chestSlitTopNotch = new Snippet('notch', points.chestSlitTop)
      .attr('data-scale', scale)
    snippets.chestSlitBottomNotch =
      new Snippet('notch', points.chestSlitBottom)
        .attr('data-scale', scale)

    points.topText = points.neckSlitLeft
      .shiftFractionTowards(points.topCenter, 0.5)
      .shift(DOWN, Math.min(frontLength / 20, 10))
      .attr('data-text', 'Top')
      .attr('data-text-class', `fill-note ${textsize}`)

    points.bottomText = new Point(0, points.bottomLeft.y)
      .attr('data-text', 'Bottom')
      .attr('data-text-class', `fill-note ${textsize}`)


    snippets.armScyeBottomLeftNotch =
      new Snippet('notch', points.armscyeBottomLeft)
        .attr('data-scale', scale)
    snippets.armScyeBottomRightNotch =
      new Snippet('notch', points.armscyeBottomRight)
        .attr('data-scale', scale)

    if (options.singleFrontBack) {
      snippets.armScyeBottomLeftSingleNotch =
        new Snippet('notch', points.armscyeBottomLeftSingle)
          .attr('data-scale', scale)
      snippets.armScyeBottomRightSingleNotch =
        new Snippet('notch', points.armscyeBottomRightSingle)
          .attr('data-scale', scale)
    }

    snippets.sideVentTopLeftNotch =
      new Snippet('notch', points.sideVentTopLeft)
        .attr('data-scale', scale)
    snippets.sideVentTopRightNotch =
      new Snippet('notch', points.sideVentTopRight)
        .attr('data-scale', scale)

    if (frontLength != backLength) {
      snippets.sideVentTopLeftBackNotch =
        new Snippet('bnotch', points.sideVentTopLeftBack)
          .attr('data-scale', scale)
      snippets.sideVentTopRightBackNotch =
        new Snippet('bnotch', points.sideVentTopRightBack)
          .attr('data-scale', scale)
      delete points.bottomText
      points.bottomCenterFront = new Point(0, points.bottomLeft.y)
        .attr('data-text', 'Front bottom')
        .attr('data-text-class', `right fill-note ${textsize}`)
      points.bottomCenterBack = new Point(0, points.bottomLeftBack.y)
        .attr('data-text', 'Back bottom')
        .attr('data-text-class', `left fill-note ${textsize}`)
    }

    if (options.singleFrontBack) {
      snippets.sideVentTopLeftSingleNotch =
        new Snippet('notch', points.sideVentTopLeftSingle)
          .attr('data-scale', scale)
      snippets.sideVentTopRightSingleNotch =
        new Snippet('notch', points.sideVentTopRightSingle)
          .attr('data-scale', scale)
    }

    if (DEBUG_POINTS) {
      showPoints(points, scale, textsize)
    }
  } // end complete


  // Paperless?
  if (paperless) {
    // Dimensions
    let topSeamY = points.topRight.y
    let bottomSeamY = points.bottomLeftBack.y
    let rightSeamX = points.topRight.x
    let leftSeamX = points.topLeft.x

    // Garment width
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: bottomSeamY + (sa + 15),
    })

    // Half garment width
    macro('hd', {
      from: points.topLeft,
      to: points.topCenter,
      y: topSeamY - (sa + 15),
    })

    // Garment length
    if (options.singleFrontBack) {
      // Full length
      macro('vd', {
        from: points.topRightSingle,
        to: points.bottomRight,
        x: rightSeamX + (sa + 15 * 2),
      })
      const fullLength = points.topRightSingle.dist(points.bottomRight)
      log.info('Body full length: ' + fullLength)

      // Back length
      macro('vd', {
        from: points.topRightSingle,
        to: points.topRight,
        x: rightSeamX + (sa + 15),
      })
      log.info('Body back legnth: ' + backLength)

      // Front length
      macro('vd', {
        from: points.topRight,
        to: points.bottomRight,
        x: rightSeamX + (sa + 15),
      })
      log.info('Body front length: ' + frontLength)

    } else {
      // Superimposed front and back
      // Front Length
      macro('vd', {
        from: points.topRight,
        to: points.bottomRight,
        x: rightSeamX + (sa + 15),
      })
      // Back Length
      if (frontLength != backLength) {
        macro('vd', {
          from: points.topRight,
          to: points.bottomRightBack,
          x: rightSeamX + (sa + (15 * 2)),
        })
      }
    }
    // Shoulder right
    macro('hd', {
      from: points.neckSlitRight,
      to: points.topRight,
      y: topSeamY - (sa + 15),
    })
    // Neck slit right
    macro('hd', {
      from: points.chestSlitTop,
      to: points.neckSlitRight,
      y: topSeamY - (sa + 15),
    })
    // Chest slit
    macro('vd', {
      from: points.chestSlitTop,
      to: points.chestSlitBottom,
      x: points.chestSlitTop.x - (sa + 15),
    })
    // Armscye
    macro('vd', {
      from: points.topLeft,
      to: points.armscyeBottomLeft,
      x: leftSeamX - (sa + 15),
    })
    // Side slit
    macro('vd', {
      from: points.sideVentTopLeft,
      to: points.bottomLeft,
      x: leftSeamX - (sa + 15),
    })
    if (frontLength != backLength) {
      macro('vd', {
        from: points.sideVentTopLeftBack,
        to: points.bottomLeftBack,
        x: leftSeamX - (sa + (15 * 2)),
      })
    }
  }

  return part
}

export const body = {
  name: 'tortuga.body',
  after: [ base, sleeveGusset, neckGusset, ],
  hideDependencies: true,
  draft: draftTortugaBody,
}
