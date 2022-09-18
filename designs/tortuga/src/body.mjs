import { pluginBundle } from '@freesewing/plugin-bundle'

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
  part,
}) {
  const DEBUG = true
  const DEBUG_POINTS = false

  //  const RIGHT = 0
  const LEFT = 180
  const UP = 90
  const DOWN = -90

  points.topCenter = new Point(0, 0)

  //------------------------------------------------
  // Garment width

  // By default, the garment width is based on shoulder-to-shoulder
  const multipleShoulderWidth =
    measurements.shoulderToShoulder + measurements.shoulderToShoulder * options.garmentWidth
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
  log.info('Garment width based on: ' + widthMeasurementUsed)
  if (DEBUG) log.debug('Garment width: ' + width)

  // Set our top left and top right points.
  const halfWidth = width / 2
  points.topLeft = points.topCenter.shift(180, halfWidth)
  points.topRight = points.topCenter.shift(0, halfWidth)

  //------------------------------------------------
  // Garment length

  // Garment length is between hips and knees.
  const hipY = measurements.hpsToWaistFront + measurements.waistToHips
  const kneeY = measurements.hpsToWaistFront + measurements.waistToKnee
  const hipToKneeLength = kneeY - hipY
  const equalLength = hipY + hipToKneeLength * options.garmentLength

  let length = equalLength

  const backAdditionalLength = equalLength * options.garmentExtraBackLength
  const backLength = equalLength + backAdditionalLength
  const frontLength = equalLength * 2 - backLength

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

  //------------------------------------------------
  // Armscye

  const armscyeLength = measurements.biceps * options.armscyeLength
  points.armscyeBottomLeft = points.topLeft.shiftTowards(points.bottomLeft, armscyeLength)
  points.armscyeBottomRight = points.topRight.shiftTowards(points.bottomRight, armscyeLength)

  points.armscyeBottomLeftSingle = points.topLeft.shiftTowards(points.topLeftSingle, armscyeLength)
  points.armscyeBottomRightSingle = points.topRight.shiftTowards(
    points.topRightSingle,
    armscyeLength
  )

  //------------------------------------------------
  // Side Vents

  const sideVentLength = length * options.sideVentLength
  points.sideVentTopLeft = points.bottomLeft.shift(UP, sideVentLength)
  points.sideVentTopRight = points.bottomRight.shift(UP, sideVentLength)

  points.sideVentTopLeftSingle = points.topLeftSingle.shift(DOWN, sideVentLength)
  points.sideVentTopRightSingle = points.topRightSingle.shift(DOWN, sideVentLength)
  points.sideVentTopLeftBack = points.bottomLeftBack.shift(UP, sideVentLength)
  points.sideVentTopRightBack = points.bottomRightBack.shift(UP, sideVentLength)

  //------------------------------------------------
  // Other Paths

  paths.totalPartOutline = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()

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

  paths.bottom = new Path().move(points.bottomLeft).line(points.bottomRight).attr('class', 'fabric')

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
    delete paths.topSeamLeft
    delete paths.topSeamRight

    paths.totalPartOutline = new Path()
      .move(points.topLeftSingle)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRightSingle)
      .line(points.topLeftSingle)
      .close()

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

    points.logo = points.chestSlitBottom.shiftFractionTowards(points.bottomLeft, 0.4)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', scale)

    points.grainlineTop = points.topRight.shift(DOWN, frontLength / 10).shift(LEFT, width / 10)
    points.grainlineBottom = points.grainlineTop.shift(DOWN, frontLength * 0.6)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
      scale: scale,
    })

    //----------------------------------------
    // Notches

    snippets.neckSlitLeftNotch = new Snippet('notch', points.neckSlitLeft)
    snippets.neckSlitrightNotch = new Snippet('notch', points.neckSlitRight)
    snippets.chestSlitTopNotch = new Snippet('notch', points.chestSlitTop)
    snippets.chestSlitBottomNotch = new Snippet('notch', points.chestSlitBottom)

    snippets.armScyeTopLeftNotch = new Snippet('notch', points.topLeft)
    snippets.armScyeTopRightNotch = new Snippet('notch', points.topRight)
    snippets.armScyeBottomLeftNotch = new Snippet('notch', points.armscyeBottomLeft)
    snippets.armScyeBottomRightNotch = new Snippet('notch', points.armscyeBottomRight)

    if (options.singleFrontBack) {
      snippets.armScyeBottomLeftSingleNotch = new Snippet('notch', points.armscyeBottomLeftSingle)
      snippets.armScyeBottomRightSingleNotch = new Snippet('notch', points.armscyeBottomRightSingle)
    }

    snippets.sideVentTopLeftNotch = new Snippet('notch', points.sideVentTopLeft)
    snippets.sideVentTopRightNotch = new Snippet('notch', points.sideVentTopRight)

    if (frontLength != backLength) {
      snippets.sideVentTopLeftBackNotch = new Snippet('bnotch', points.sideVentTopLeftBack)
      snippets.sideVentTopRightBackNotch = new Snippet('bnotch', points.sideVentTopRightBack)
      points.bottomCenterFront = new Point(0, points.bottomLeft.y)
        .attr('data-text', 'Front bottom')
        .attr('data-text-class', 'right fill-note')
      points.bottomCenterBack = new Point(0, points.bottomLeftBack.y)
        .attr('data-text', 'Back bottom')
        .attr('data-text-class', 'left fill-note')
    }

    if (options.singleFrontBack) {
      snippets.sideVentTopLeftSingleNotch = new Snippet('notch', points.sideVentTopLeftSingle)
      snippets.sideVentTopRightSingleNotch = new Snippet('notch', points.sideVentTopRightSingle)
    }

    if (sa) {
      //      paths.sa = paths.cutline.offset(-sa).attr('class', 'fabric sa')
    }

    if (DEBUG_POINTS) {
      for (const p in points) {
        if (p.indexOf('_') > -1) continue
        if (p.indexOf('title') > -1) continue
        points[p].attr('data-circle', 2).attr('data-circle-class', 'fill-note')
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
    if (options.singleFrontBack) topSeamY = points.topRightSingle.y

    // Garment width
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + (sa + 15),
    })
    // Garment length
    if (options.singleFrontBack) {
      // Full length
      macro('vd', {
        from: points.bottomRight,
        to: points.topRightSingle,
        x: points.topRight.x + (sa + 15),
      })
      macro('vd', {
        from: points.topLeftSingle,
        to: points.topLeft,
        x: points.topLeft.x - (sa + 15),
      })
    } else {
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + (sa + 15),
      })
    }
    // Shoulder right
    macro('hd', {
      from: points.topRight,
      to: points.neckSlitRight,
      y: topSeamY - (sa + 15),
    })
    // Neck slit right
    macro('hd', {
      from: points.neckSlitRight,
      to: points.chestSlitTop,
      y: topSeamY - (sa + 15),
    })
    // Half garment width
    macro('hd', {
      from: points.chestSlitTop,
      to: points.topLeft,
      y: topSeamY - (sa + 15),
    })
    // chest slit
    macro('vd', {
      from: points.chestSlitTop,
      to: points.chestSlitBottom,
      x: points.topLeft.x - (sa + 15),
    })
  }

  return part
}

export const body = {
  name: 'tortuga.body',
  measurements: [
    'neck',
    'chest',
    'waist',
    'hips',
    'seat',
    'shoulderToShoulder',
    'hpsToBust',
    'hpsToWaistFront',
    'waistToHips',
    'waistToKnee',
    'shoulderToElbow',
    'shoulderToWrist',
    'biceps',
    'wrist',
  ],
  options: {
    // Single front and back piece? or
    singleFrontBack: { bool: false, menu: 'body' },
    // Length of garment: percent from hips (0) to knee (100)
    garmentLength: { pct: 75, min: 0, max: 100, menu: 'body' },
    // Width of garment, percent added to shoulder-to-shoulder,
    // automatically increased if needed to accommodate largest
    // circumference chest/waist/hips/seat.
    garmentWidth: { pct: 50, min: 25, max: 100, menu: 'body' },
    // Amount of extra back length, as percentage of the normal length.
    garmentExtraBackLength: { pct: 0, min: 0, max: 5, menu: 'body' },
    // Add reinforcement patches to the shoulder seams?
    shoulderPatch: { bool: false, menu: 'body' },
    // Length of vertical chest slit, as percentage of HPS-to-bust.
    chestSlitLength: { pct: 100, min: 50, max: 125, menu: 'body' },
    // Add a reinforcement patch to the bottom of the chest slit?
    // If so, what style?
    chestSlitPatch: {
      dflt: 'none',
      list: ['none', 'house', 'jewel', 'triangle', 'heart'],
      menu: 'body',
    },
    // Length of side vents, as percentage of absolute garment length.
    sideVentLength: { pct: 5, min: 1, max: 10, menu: 'body' },
    // Add gussets to the top of the side vents?
    sideGussetUse: { bool: false, menu: 'body' },
    // Length of side gusset square hypoteneuse, as percentage of
    // side vent length.
    sideGussetSize: { pct: 5, min: 1, max: 30, menu: 'body' },
    // Add a reinforcement patch to the top of the side vents?
    // If so, what style?
    sideVentPatch: {
      dflt: 'none',
      list: ['none', 'triangle', 'house', 'jewel'],
      menu: 'body',
    },
    // Add back gathers to the collar back?
    collarBackGathers: { bool: false, menu: 'body' },
    // Length of horizontal neck slit, as percent added to neck width,
    // automatically limited by shoulder length.
    neckSlitLength: { pct: 100, min: 100, max: 200, menu: 'neck' },
    // Length of neck gusset square hypoteneuse, as percentage of
    // shoulder-to-shoulder length.
    neckGussetLength: { pct: 10, min: 5, max: 30, menu: 'neck' },
    // Width of collar, as percentage of neck circumference.
    collarWidth: { pct: 25, min: 5, max: 50, menu: 'neck' },
    // Length of sleeve, as percent added to shoulder-to-wrist.
    sleeveLength: { pct: 10, min: 0, max: 50, menu: 'sleeve' },
    // Width of sleeve, as percent added to biceps.
    sleeveWidth: { pct: 30, min: 10, max: 100, menu: 'sleeve' },
    // Length of sleeve that is the shoulder-cap section of the body
    // part (as opposed to the sleeve part), as percentage of
    // HPS-to-wrist length.
    shoulderSleeveLength: { pct: 0, min: 0, max: 100, menu: 'sleeve' },
    // Length of armscye, as percent of biceps circumference.
    armscyeLength: { pct: 100, min: 80, max: 120, menu: 'sleeve' },
    // Length of underarm gusset square hypoteneuse, as percentage of
    // shoulder to elbow length.
    underarmGussetLength: { pct: 50, min: 20, max: 80, menu: 'sleeve' },
    // Length of sleeve vents, as percentage of elbow-to-wrist length.
    sleeveVentLength: { pct: 3, min: 1, max: 20, menu: 'sleeve' },
    // Width of cuff, as percentage of elbow-to-wrist length.
    cuffWidth: { pct: 5, min: 1, max: 5, menu: 'sleeve' },
  },
  plugins: [pluginBundle],
  draft: draftTortugaBody,
}
