function createLowerPoints(points, measurements, options, prefix) {
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

export function constructFrontPoints(points, Point, measurements, options) {
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
  points.cfWaist = new Point(0, measurements.hpsToWaistFront)
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

  createLowerPoints(points, measurements, options, 'cf')
}

export function constructBackPoints(points, Point, measurements, options) {
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

  createLowerPoints(points, measurements, options, 'cb')
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

export function correctArmHole(points, paths, Path, options, utils) {
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

export function constructSideSeam(Path, Point, points, height, bottomSmoothness) {
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

export function adjustSidePoints(points, options) {
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

export function constructBackHem(points, measurements, options, Point, paths, Path) {
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

  const hemBottom = centerPoint.y + bonusLengthMeasurement * options.lengthBonus
  points.cbHem = new Point(
    0,
    centerPoint.y + bonusLengthMeasurement * options.lengthBonus + extraBackLength
  )
  points.midHem = new Point(points.hem.x * 0.66, points.cbHem.y)
  paths.sideSeam = constructSideSeam(
    Path,
    Point,
    points,
    hemBottom,
    getBottomSmoothness(hemBottom, points)
  ).addClass('fabric')

  paths.hem = new Path()
    .move(points.cbHem)
    .curve(points.midHem, points.midHem, points.hem)
    .addClass('fabric')
}

export function constructFrontHem(points, measurements, options, Point, paths, Path) {
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

  const hemBottom = centerPoint.y + bonusLengthMeasurement * options.lengthBonus
  points.cfHem = new Point(0, centerPoint.y + bonusLengthMeasurement * options.lengthBonus)
  points.midHem = new Point(points.hem.x * 0.66, points.cfHem.y)
  paths.sideSeam = constructSideSeam(
    Path,
    Point,
    points,
    hemBottom,
    getBottomSmoothness(hemBottom, points)
  ).addClass('fabric')

  paths.hem = new Path()
    .move(points.cfHem)
    .curve(points.midHem, points.midHem, points.hem)
    .addClass('fabric')
}

export function createArmHoles(
  options,
  store,
  points,
  paths,
  Path,
  snippets,
  Snippet,
  strapWidth,
  notchType = 'notch'
) {
  if (options.sleeves) {
    if (store.get('capSleeves')) {
      const sleeveCapFactor = (options.sleeveLength + 0.2) * 4
      const capLength = sleeveCapFactor * store.get('sleeveCapHeight')
      points.sleeveCap = points.shoulder.shift(
        points.neck.angle(points.shoulder) - 15 + options.cuffEase * 15,
        capLength
      )
      points.sleeveCapStart = points.shoulder.shift(
        points.neck.angle(points.shoulder),
        capLength * -0.2
      )
      points.sleeveCapCp = points.sleeveCap
        .shiftTowards(points.armholePitchCp1, capLength * 0.2)
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
      .shiftTowards(points.hps, 0.4 * points.strapTop.dy(points.armhole))
      .rotate(90, points.strapTop)

    // Increase weight of armhole to prevent corner
    points.armholeHollowCp2 = points.armholeHollow.shiftFractionTowards(points.armholeHollowCp2, 3)
    paths.armhole = new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.strapTopCp1, points.strapTop)
      .addClass('fabric')
    paths.shoulder = new Path().move(points.strapTop).line(points.neck).addClass('fabric')
  }
}

export function plotSideLineMeasurements(points, sideSeam, utils, macro) {
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
