import { capitalize } from '@freesewing/core'

function createLowerPoints(part, prefix) {
  const { measurements, options, points } = part.shorthand()
  // These lengths are typically not critical, so use a rough estimate if not given
  // We don't want the user to need these measurements, as this design can also be used for shorter tops
  if (typeof measurements.waistToKnee !== 'undefined') {
    points[prefix + 'Knee'] = points[prefix + 'Waist'].translate(0, measurements.waistToKnee)
  } else {
    points[prefix + 'Knee'] = points[prefix + 'Waist'].translate(
      0,
      measurements.hpsToWaistBack * 1.5
    )
  }
  if (typeof measurements.waistToFloor !== 'undefined') {
    points[prefix + 'Floor'] = points[prefix + 'Waist'].translate(0, measurements.waistToFloor)
  } else {
    points[prefix + 'Floor'] = points[prefix + 'Waist'].translate(
      0,
      measurements.hpsToWaistBack * 2.5
    )
  }
  points.sideTarget = points[prefix + 'Knee'].translate(points.seatBase.x * (1 + options.flare), 0)
}

export function constructFrontPoints(part) {
  const { measurements, options, points, Point } = part.shorthand()
  points.cfBust = new Point(0, measurements.hpsToBust)
  if (measurements.bustSpan) {
    points.bust = new Point(measurements.bustSpan / 2, measurements.hpsToBust)
  } else {
    // Very rough estimate, but only used for potential dart construction
    points.bust = new Point(measurements.chest / 8, measurements.hpsToBust)
  }
  points.chest = new Point(
    (measurements.chest * (1 + options.chestEase)) / 4,
    measurements.hpsToBust
  )
  points.cbWaist = new Point(0, measurements.hpsToWaistBack)
  points.cfWaist = new Point(0, Math.max(measurements.hpsToWaistBack, measurements.hpsToWaistFront))
  points.waist = new Point((measurements.waist * (1 + options.waistEase)) / 4, points.cfWaist.y)
  points.cfArmhole = new Point(
    0,
    points.cbWaist.y -
      measurements.waistToArmpit * (1 - options.armholeDepth - options.bicepsEase / 2)
  )
  points.armhole = new Point(points.armhole.x, points.cfArmhole.y)
  points.armholeCp2 = points.armhole.shift(180, points._tmp1.dx(points.armhole) / 4)

  points.cfUnderbust = new Point(
    0,
    points.cfWaist.y - (measurements.waistToUnderbust ?? measurements.hpsToWaistBack / 6)
  )
  points.underbust = new Point(
    (measurements.chest * (1 + options.chestEase)) / 4,
    points.cfUnderbust.y
  )
  points.cfHips = new Point(0, points.cfWaist.y + measurements.waistToHips)
  points.hips = new Point((measurements.hips * (1 + options.hipsEase)) / 4, points.cfHips.y)

  const seatFront = measurements.seat - measurements.seatBack
  const seatExtra = (measurements.seatBack - seatFront) / 4
  points.cfSeat = new Point(0, points.cfWaist.y + measurements.waistToSeat)
  points.seatBase = new Point((measurements.seat * (1 + options.seatEase)) / 4, points.cfSeat.y)
  points.seat = seatAdjustment(points.seatBase, points.hips, -seatExtra)
  // points.cfSeat = points.cfSeat.shift(-90, -seatExtra * 2)

  createLowerPoints(part, 'cf')
}

export function constructBackPoints(part) {
  const { measurements, options, points, Point } = part.shorthand()
  points.chest = new Point(
    (measurements.chest * (1 + options.chestEase)) / 4,
    measurements.hpsToBust
  )
  points.cbWaist = new Point(0, measurements.hpsToWaistBack)
  points.waist = new Point((measurements.waist * (1 + options.waistEase)) / 4, points.cbWaist.y)
  points.cbUnderbust = new Point(
    0,
    points.cbWaist.y - (measurements.waistToUnderbust ?? measurements.hpsToWaistBack / 6)
  )
  points.underbust = new Point(
    (measurements.chest * (1 + options.chestEase)) / 4,
    points.cbUnderbust.y
  )
  points.cbHips = new Point(0, points.cbWaist.y + measurements.waistToHips)
  points.hips = new Point((measurements.hips * (1 + options.hipsEase)) / 4, points.cbHips.y)

  points.cbSeat = new Point(0, points.cbWaist.y + measurements.waistToSeat)
  const seatFront = measurements.seat - measurements.seatBack
  const seatExtra = (measurements.seatBack - seatFront) / 4
  points.seatBase = new Point((measurements.seat * (1 + options.seatEase)) / 4, points.cbSeat.y)
  points.seat = seatAdjustment(points.seatBase, points.hips, seatExtra)
  // points.cbSeat = points.cbSeat.shift(-90, seatExtra * 2)

  createLowerPoints(part, 'cb')
}

function seatAdjustment(seatBase, anchor, seatExtra) {
  const r = anchor.dist(seatBase)
  return seatBase.rotate((seatExtra / r) * 90, anchor)
}

export function calculateFba(anchor, bust, side, dx, Point) {
  const r = anchor.dist(bust)

  const a0 = Math.asin((bust.x - anchor.x) / r)
  let a1 = Math.asin((bust.x - anchor.x + dx) / r)

  if (isNaN(a1)) {
    a1 = Math.PI / 2
  }

  const bustOffset = new Point(anchor.x + r * Math.sin(a1), anchor.y + r * Math.cos(a1))

  const dy = bustOffset.y - bust.y

  const b = a1 - a0

  const rotateUpper = (point) => point.rotate((b / Math.PI) * 180, anchor)

  const sideOffset0 = rotateUpper(side)
  const sideOffset1 = side.translate(dx, dy)

  const c = sideOffset1.angle(bust) - sideOffset0.angle(bust)

  const rotateLower = (point) => point.translate(dx, dy).rotate(-c, bust)

  return {
    dx: dx,
    dy: dy,
    rotateUpper: rotateUpper,
    rotateLower: rotateLower,
    bustOffset: bustOffset,
    sideOffset0: sideOffset0,
    sideOffset1: sideOffset1,
  }
}

export function correctArmHole(part) {
  const { options, points, utils } = part.shorthand()
  points.armholeCp1 = points.chest

  if (!options.sleeves && points.armhole.y > points.chest.y) {
    points.armhole = utils.beamIntersectsY(points.chest, points.waist, points.armhole.y)
    points.armholeCp2 = points.armhole.shift(180, points._tmp1.dx(points.armhole) / 4)
  }

  if (points.armhole.y > points.armholeCp1.y * 0.8) {
    const frac = Math.min(
      1,
      (points.armhole.y - points.armholeCp1.y * 0.8) / (0.2 * points.armholeCp1.y)
    )
    points.armholeCp1 = points.chest.shiftFractionTowards(
      points.armholeCp2.rotate(90, points.armhole),
      frac
    )
  }
}

function extendSideLine(points, intersectionY) {
  const fraction = (intersectionY - points.seat.y) / points.seat.dy(points.sideTarget)
  return points.seat.shiftFractionTowards(points.sideTarget, fraction)
}

export function constructSideSeam(part, height, bottomSmoothness) {
  const { points, Path, Point } = part.shorthand()
  const base = new Path()
    .move(points.armhole)
    .curve(points.armholeCp1, points.waistCp2, points.waist)
    .smurve(points.hipsCp2, points.hips)
    .smurve(points.seatCp2, points.seat)
  const intersectionY = Math.min(height, points.seat.y) - bottomSmoothness
  let bottom = base.intersectsY(height)[0]
  if (!bottom) {
    // below seat
    bottom = extendSideLine(points, height)
  }
  points.hem = bottom
  let intersection = base.intersectsY(intersectionY)[0]

  if (!intersection) {
    if (intersectionY >= points.seat.y) {
      // below seat
      intersection = extendSideLine(points, intersectionY)
    } else {
      //above armhole
      intersection = points.armhole
    }
  }

  bottom.x = (bottom.x + intersection.x) / 2 // creates a smoother bottom as the bottom is vertical

  points.intersection = intersection

  const angle = base.angleAt(intersection)
  if (!angle) {
    return base
  }
  const intersectionCp1 = intersection.shift(angle, bottomSmoothness * 0.3)
  const intersectionCp2 = new Point(bottom.x, bottom.y - bottomSmoothness * 0.3)

  points.intersectionCp1 = intersectionCp1
  points.intersectionCp2 = intersectionCp2

  let result = base.split(intersection)[0]
  if (!result.curve) {
    result = new Path().move(points.armhole)
  }
  return result.curve(intersectionCp1, intersectionCp2, bottom).reverse()
}

export function adjustSidePoints(part) {
  const { options, points } = part.shorthand()
  // Remove waist fitting if option is disabled
  if (!options.fitWaist || points.waist.x > points.armhole.x) {
    if (points.waist.x < points.armhole.x) {
      points.waist.x = points.armhole.x
    }
    points.waistCp2 = points.waist.shiftFractionTowards(points.armhole, 0.2)
    if (points.hips.x < points.waist.x) {
      points.hips.x = points.waist.x
    }
  }

  // prevent barrel shape
  if (points.hips.x < points.waist.x) {
    points.hips.x = points.waist.x
  }
  // prevent excessive hips narrowing
  if (points.hips.x < (points.waist.x + points.seat.x) / 2) {
    points.hips.x = (points.waist.x + points.seat.x) / 2
  }
  // prevent smaller seat than hips
  if (points.seat.x < points.hips.x) {
    points.seat.x = points.hips.x
  }
  // prevent excessive waist narrowing
  if (points.waist.x < 2 * points.hips.x - points.seat.x) {
    points.waist.x = 2 * points.hips.x - points.seat.x
  }

  // curve points
  points.waistCp2 = points.waist.shift(90, points.armhole.dy(points.waist) * 0.2)
  points.seatCp2 = points.seat.shift(90, points.hips.dy(points.seat) * 0.3)
  points.hipsCp2 = points.waist.shiftFractionTowards(points.hips, 0.6)
}

function getBottomSmoothness(bottom, points) {
  return (Math.min(bottom, points.seat.y) - points.armhole.y) * 0.3
}

export function constructBackHem(part, bonusLength = 0) {
  const { measurements, options, points, paths, Path, Point, log } = part.shorthand()
  let centerPoint

  // Extra length for butt
  let extraBackLength = 0
  let bonusLengthMeasurement = measurements.hpsToWaistBack
  switch (options.length) {
    case 'underbust':
      centerPoint = points.cbUnderbust
      bonusLengthMeasurement = measurements.waistToUnderbust
      break
    case 'waist':
      centerPoint = points.cbWaist
      break
    case 'hips':
      centerPoint = points.cbHips
      break
    case 'seat':
      centerPoint = points.cbSeat
      extraBackLength = (measurements.seatBack - measurements.seat / 2) / 2
      bonusLengthMeasurement *= 2
      break
    case 'knee':
      centerPoint = points.cbKnee
      extraBackLength = (measurements.seatBack - measurements.seat / 2) / 2
      bonusLengthMeasurement *= 3
      break
    case 'floor':
      centerPoint = points.cbFloor
      extraBackLength = (measurements.seatBack - measurements.seat / 2) / 2
      bonusLengthMeasurement *= 3
  }

  if (!centerPoint) {
    centerPoint = points.cbSeat
  }

  let hemBottom = centerPoint.y + bonusLengthMeasurement * options.lengthBonus + bonusLength
  if (hemBottom <= points.armhole.y * 1.1) {
    log.warn('Adjusting hem as it would be above or too close to armhole.')
    hemBottom = points.armhole.y * 1.1
  }
  if (hemBottom <= points.underbust.y) {
    log.warn('Adjusting hem as it would be above the underbust.')
    hemBottom = points.underbust.y
  }
  points.cbHem = new Point(0, hemBottom + extraBackLength)
  paths.sideSeam = constructSideSeam(
    part,
    hemBottom,
    getBottomSmoothness(hemBottom, points)
  ).addClass('fabric')

  points.midHem = new Point(points.hem.x * 0.66, points.cbHem.y)
  paths.hem = new Path()
    .move(points.cbHem)
    .curve(points.midHem, points.midHem, points.hem)
    .addClass('fabric')
}

export function constructFrontHem(part, bonusLength = 0) {
  const { measurements, options, points, paths, Path, Point, log } = part.shorthand()
  let centerPoint
  let bonusLengthMeasurement = measurements.hpsToWaistBack
  switch (options.length) {
    case 'underbust':
      centerPoint = points.cfUnderbust
      bonusLengthMeasurement = measurements.waistToUnderbust
      break
    case 'waist':
      centerPoint = points.cfWaist
      break
    case 'hips':
      centerPoint = points.cfHips
      break
    case 'seat':
      centerPoint = points.cfSeat
      bonusLengthMeasurement *= 2
      break
    case 'knee':
      centerPoint = points.cfKnee
      bonusLengthMeasurement *= 3
      break
    case 'floor':
      centerPoint = points.cfFloor
      bonusLengthMeasurement *= 3
  }

  if (!centerPoint) {
    centerPoint = points.cfSeat
  }

  let hemBottom = centerPoint.y + bonusLengthMeasurement * options.lengthBonus + bonusLength
  if (hemBottom <= points.armhole.y * 1.1) {
    log.warn('Adjusting hem as it would be above or too close to armhole.')
    hemBottom = points.armhole.y * 1.1
  }
  if (hemBottom <= points.underbust.y) {
    log.warn('Adjusting hem as it would be above the underbust.')
    hemBottom = points.underbust.y
  }
  points.cfHem = new Point(0, hemBottom)
  paths.sideSeam = constructSideSeam(
    part,
    hemBottom,
    getBottomSmoothness(hemBottom, points)
  ).addClass('fabric')
  points.midHem = new Point(points.hem.x * 0.66, points.cfHem.y)

  paths.hem = new Path()
    .move(points.cfHem)
    .curve(points.midHem, points.midHem, points.hem)
    .addClass('fabric')
}

export function createArmHoles(part, strapWidth, armholeCurve, armholeDrop, notchType = 'notch') {
  const { store, options, points, paths, Path, snippets, Snippet, utils } = part.shorthand()
  if (options.sleeves) {
    if (store.get('capSleeves')) {
      const sleeveCapFactor = (options.sleeveLength + 0.2) * 4
      const capLength = sleeveCapFactor * store.get('sleeveCapHeight')
      points.sleeveCap = points.shoulder.shift(
        points.neck.angle(points.shoulder) - 30 + options.cuffEase * 15,
        capLength
      )
      points.sleeveCapStart = points.shoulder.shift(
        points.neck.angle(points.shoulder),
        capLength * -0.2
      )
      points.armholePitchCp1 = points.sleeveCap.shiftFractionTowards(
        points.sleeveCapStart.rotate(90, points.sleeveCap),
        0.5
      )
      points.sleeveCapCp = points.sleeveCap
        .shiftTowards(points.armholePitchCp1, capLength * 0.3)
        .rotate(-90, points.sleeveCap)
      paths.shoulder = new Path()
        .move(points.sleeveCap)
        .curve(points.sleeveCapCp, points.shoulder, points.sleeveCapStart)
        .line(points.neck)
        .addClass('fabric')
      paths.armhole = new Path()
        .move(points.armhole)
        .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
        .curve(points.armholeHollowCp2, points.armholePitchCp1, points.sleeveCap)
        .addClass('fabric')
    } else {
      paths.shoulder = new Path().move(points.shoulder).line(points.neck).addClass('fabric')
      paths.armhole = new Path()
        .move(points.armhole)
        .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
        .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .addClass('fabric')
      snippets.armholePitchNotch = new Snippet(notchType, points.armholePitch)
    }
  } else {
    points.strapTop = points.neck.shift(
      points.shoulder.angle(points.hps),
      -strapWidth * points.shoulder.dist(points.hps)
    )
    points.strapTopCp1 = points.strapTop
      .shiftTowards(points.hps, 0.2 * points.strapTop.dy(points.armhole))
      .rotate(90, points.strapTop)

    // Increase weight of armhole control points because we don't use armholeHollow here anymore
    points.armholeCp2 = points.armhole.shiftFractionTowards(points.armholeCp2, 3)

    points.armholeIntersection = utils.beamsIntersect(
      points.strapTop,
      points.strapTopCp1,
      points.armhole,
      points.armholeCp2
    )
    points.armholeIntersectionDrop = points.armholeIntersection.shiftFractionTowards(
      points.strapTop,
      -armholeDrop
    )

    points.armholeCp2 = points.armholeCp2.shiftFractionTowards(
      points.armholeIntersection,
      armholeCurve
    )
    points.strapTopCp1 = points.strapTopCp1.shiftFractionTowards(
      points.armholeIntersectionDrop,
      armholeCurve
    )

    paths.armhole = new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.strapTopCp1, points.strapTop)
      .addClass('fabric')
    paths.shoulder = new Path().move(points.strapTop).line(points.neck).addClass('fabric')
  }
}

export function plotSideLineMeasurements(part, sideSeam) {
  const { points, macro, utils } = part.shorthand()
  const offsets = {
    seat: points.seat.y,
    hips: points.hips.y,
    waist: points.waist.y,
    underbust: points.underbust.y,
    dart: points.dartTip?.y,
    armhole: points.armhole.y + 0.01,
  }
  let prevY = (points.cfHem ?? points.cbHem).y
  const strings = Object.keys(offsets)
  for (let i = 0; i < strings.length; i++) {
    const key = strings[i]
    let y = offsets[key]
    if (!y || y > points.hem.y) {
      continue
    }
    let intersects = sideSeam.intersectsY(y)
    if (intersects.length === 0) {
      // Intersecting the path exactly on the corner points sometimes doesn't work
      // See issue #3367
      y += 0.001
      intersects = sideSeam.intersectsY(y)
    }
    if (intersects.length > 0) {
      const sidePoint = intersects[0]
      const centerPoint = sidePoint.clone()
      centerPoint.x = 0
      const prevPoint = centerPoint.clone()
      prevPoint.y = prevY
      prevY = y
      macro('hd', {
        id: 'wAt' + utils.capitalize(key),
        from: centerPoint,
        to: sidePoint,
        y: y,
      })
      macro('vd', {
        id: 'hBelow' + utils.capitalize(key),
        from: centerPoint,
        to: prevPoint,
        x: 30,
      })
    }
  }
}

export function draftRibbing(part, length) {
  const { store, measurements, options, points, paths, Path, Point, expand, sa, macro, units } =
    part.shorthand()
  // Don't run this every time, except when sampling
  if (typeof store.get('ribbingHeight') === 'undefined' || part.context.settings.sample) {
    store.set(
      'ribbingHeight',
      (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight
    )
  }
  const height = store.get('ribbingHeight')

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `bibi:cut${capitalize(part.name.split('.')[1])}`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(2 * height + extraSa),
        l: units(length + extraSa),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(height * 2, 0)
  points.topFold = new Point(height, 0)
  points.bottomLeft = new Point(0, length)
  points.bottomRight = new Point(points.topRight.x, length)
  points.bottomFold = new Point(points.topFold.x, length)

  paths.seam = new Path()
    .move(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .close()
    .addClass('various')

  paths.fold = new Path().move(points.topFold).line(points.bottomFold).addClass('various help')

  if (sa) paths.sa = paths.seam.offset(sa).addClass('various sa')

  /*
   * Annotations
   */
  // Title
  points.title = new Point(points.bottomRight.x / 3, points.bottomRight.y / 3)

  // Dimensions
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.topLeft,
    to: points.topRight,
    y: points.topRight.y - sa - 15,
  })
}

export function draftKnitBinding(part, length) {
  const { store, absoluteOptions, points, paths, Path, Point, expand, sa, macro, units } =
    part.shorthand()
  // Don't run this every time, except when sampling
  if (typeof store.get('bindingHeight') === 'undefined' || part.context.settings.sample) {
    store.set('bindingHeight', absoluteOptions.bindingHeight)
  }
  const height = store.get('bindingHeight')

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `bibi:cut${capitalize(part.name.split('.')[1])}`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(4 * height),
        l: units(length + extraSa),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(height * 4, 0)
  points.topFold = new Point(height, 0)
  points.bottomLeft = new Point(0, length)
  points.bottomRight = new Point(points.topRight.x, length)
  points.bottomFold = new Point(points.topFold.x, length)

  paths.seam = new Path()
    .move(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .close()
    .addClass('various')

  paths.fold = new Path().move(points.topFold).line(points.bottomFold).addClass('various help')

  if (sa) {
    paths.sa = new Path()
      .move(points.topLeft)
      .line(points.topLeft.translate(0, -sa))
      .line(points.topRight.translate(0, -sa))
      .line(points.topRight)
      .move(points.bottomLeft)
      .line(points.bottomLeft.translate(0, sa))
      .line(points.bottomRight.translate(0, sa))
      .line(points.bottomRight)
      .addClass('various sa')
  }

  /*
   * Annotations
   */
  // Title
  points.title = new Point(points.bottomRight.x / 3, points.bottomRight.y / 3)

  // Dimensions
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.topLeft,
    to: points.topRight,
    y: points.topRight.y - sa - 15,
  })
  macro('hd', {
    id: 'wFold',
    from: points.bottomFold,
    to: points.bottomRight,
    y: points.bottomFold.y + sa + 15,
  })
}
