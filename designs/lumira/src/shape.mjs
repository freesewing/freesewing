import { pctBasedOn } from '@freesewing/core'

export const extendPath = (Path, pathToExtend, startLength = 100, endLength = 100) => {
  return new Path()
    .move(pathToExtend.shiftAlong(1).shiftOutwards(pathToExtend.start(), startLength))
    .line(pathToExtend.start())
    .join(pathToExtend)
    .line(
      pathToExtend
        .shiftAlong(pathToExtend.length() - 1)
        .shiftOutwards(pathToExtend.end(), endLength)
    )
}
export const controlPoints = (p1, p2, p3, cpDistanceDivider) => {
  let angle
  if (p1 === undefined) {
    angle = p2.angle(p3) + 180
  } else if (p3 === undefined) {
    angle = p2.angle(p1)
  } else {
    angle = Math.abs(p2.angle(p1) - p2.angle(p3)) / 2
  }
  let cp1 =
    p3 !== undefined ? p2.shift(p2.angle(p3) - angle + 90, p2.dist(p3) / cpDistanceDivider) : null
  let cp2 =
    p1 !== undefined ? p2.shift(p2.angle(p1) + angle - 90, p2.dist(p1) / cpDistanceDivider) : null
  if (p1 !== undefined && p2.sitsRoughlyOn(p1)) {
    return { cp1: p1.clone(), cp2: cp2 }
  }
  if (p3 !== undefined && p2.sitsRoughlyOn(p3)) {
    return { cp1: cp1, cp2: p3.clone() }
  }
  return { cp1: cp1, cp2: cp2 }
}
export const createControlPoints = (points, cpDistanceDivider, names) => {
  for (let i = 0; i < names.length; i++) {
    let cp = controlPoints(
      points[names[i - 1]],
      points[names[i]],
      points[names[i + 1]],
      cpDistanceDivider
    )
    if (cp.cp1) points[names[i] + 'Cp1'] = cp.cp1
    if (cp.cp2) points[names[i] + 'Cp2'] = cp.cp2
  }
}

const reduceWaist = (paths, Path, points, log, pathName, pointName, distance) => {
  const path = extendPath(Path, paths[pathName], 100, 0)
  const newPoint = path.shiftAlong(distance + 100)
  if (newPoint.sitsRoughlyOn(points[pathName + 'Waist'])) {
    return
  }
  points[pathName + pointName] = newPoint
  const pTemp = path.split(points[pathName + pointName])
  if (pTemp.length != 2) {
    log.info('lumira:couldNotreduceWaist')
    return
  }
  paths[pathName] = pTemp[1].hide()
}

const createGusset = (points, paths, Path, store, side, gussetWidth, gussetLength) => {
  points[side + 'GussetCp'] = points[side + 'Gusset'].shiftFractionTowards(
    points.centerUpperLeg,
    0.1
  )
  const x1 = side == 'front' ? points[side + 'GussetJoin'].x : points[side + 'Gusset'].x
  const x2 = side == 'front' ? points[side + 'Gusset'].x : points[side + 'GussetJoin'].x
  if (points[side + 'GussetCp'].x < x1) {
    points[side + 'GussetCp'].x = points[side + 'GussetJoin'].x
  }
  if (points[side + 'GussetCp'].x > x2) {
    points[side + 'GussetCp'].x = points[side + 'Gusset'].x
  }

  const pGusset = new Path()
    .move(points[side + 'GussetJoin'])
    ._curve(points[side + 'GussetCp'], points[side + 'Gusset'])
    .hide()
  const pGussetPoint = pGusset.shiftAlong(1)
  const path = new Path()
    .move(points[side + 'Waist'])
    ._curve(points[side + 'UpperLegCp2'], points[side + 'UpperLeg'])
    .hide()
  const pPoint = path.shiftAlong(1)

  const angle1 =
    side == 'front'
      ? points[side + 'GussetJoin'].angle(pGussetPoint)
      : pPoint.angle(points[side + 'GussetJoin'])
  const angle2 =
    side == 'front'
      ? pPoint.angle(points[side + 'GussetJoin'])
      : points[side + 'GussetJoin'].angle(pGussetPoint)
  if (angle1 > angle2) {
    points[side + 'GussetJoinCp'] = points[side + 'GussetJoin'].shift(
      pPoint.angle(points[side + 'GussetJoin']),
      gussetLength - gussetWidth
    )
  } else {
    points[side + 'GussetJoinCp'] = points[side + 'GussetJoin'].clone()
  }

  paths[side + 'Gusset'] = new Path()
    .move(points[side + 'GussetJoin'])
    .curve(points[side + 'GussetJoinCp'], points[side + 'GussetCp'], points[side + 'Gusset'])
    .hide()
  const frontTemp = paths[side]
    .reverse()
    .shiftAlong(Math.min(gussetLength, paths[side].length()) - 1)
  const gussetTemp = paths[side].shiftAlong(1)
  const gussetAngle = Math.abs(
    points[side + 'GussetJoin'].angle(gussetTemp) - frontTemp.angle(points[side + 'GussetJoin'])
  )
  store.set(side + 'GussetAngle', gussetAngle * 2)

  const sideTop = paths[side].split(points[side + 'GussetJoin'])
  if (sideTop[0].ops !== undefined) {
    paths[side + 'Top'] = sideTop[0].hide()
  } else {
    paths[side + 'Top'] = paths[side].clone()
  }
  paths[side] = paths[side + 'Top']
    .clone()
    .join(paths[side + 'Gusset'])
    .hide()
}

export const shape = {
  name: 'lumira.shape',
  measurements: [
    'waist',
    'waistBack',
    'hips',
    'seat',
    'seatBack',
    'upperLeg',
    'knee',
    'ankle',
    'heel',
    'inseam',
    'crossSeam',
    'crossSeamFront',
    'waistToFloor',
    'waistToKnee',
    'waistToUpperLeg',
    'waistToSeat',
    'waistToHips',
  ],
  options: {
    // Constants
    gussetcompensation: 1.03,

    // Booleans
    waistband: { bool: true, menu: 'style' },
    backgusset: { bool: false, menu: 'style' },
    cyclingchamois: { bool: false, menu: 'style' },
    frontbulge: {
      bool: false,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.cyclingchamois ? false : 'style'),
    },

    // Percentages
    ease: { pct: -8, min: -30, max: 0, menu: 'fit' },
    leglength: { pct: 100, min: 10, max: 100, ...pctBasedOn('inseam'), menu: 'style' },
    waistlowering: { pct: 35, min: -10, max: 60, ...pctBasedOn('waistToHips'), menu: 'style' },
    gussetwidth: {
      pct: 16,
      min: 5,
      max: 30,
      ...pctBasedOn('crossSeamFront'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.cyclingchamois ? false : 'style'),
    },
    backgussetwidth: {
      pct: 50,
      min: 20,
      max: 75,
      ...pctBasedOn('hips'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.backgusset ? 'fit' : false),
    },
    frontgussetlength: {
      pct: 12.5,
      min: 0,
      max: 30,
      ...pctBasedOn('crossSeamFront'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.frontbulge ? false : 'style'),
    },
    waistbandsize: {
      pct: 90,
      min: 0,
      max: 150,
      ...pctBasedOn('waistToHips'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'style' : false),
    },
    waistreduction: {
      pct: 4,
      min: 0,
      max: 10,
      ...pctBasedOn('waist'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'style' : false),
    },
  },
  draft: ({ measurements, store, Point, points, Path, paths, options, utils, log, part }) => {
    // draft: ({ store, Point, points, Path, paths, options, utils, log, part }) => {
    const cpDistanceDivider = 3.5
    const backGusset = options.cyclingchamois ? true : options.backgusset
    const waistLowering = measurements.waistToHips * options.waistlowering
    const waistReduction = options.waistband ? measurements.waist * options.waistreduction : 0
    const waistbandSize = options.waistband
      ? measurements.waistToHips *
        (options.waistlowering + options.waistbandsize > (backGusset ? 0.9 : 1.5)
          ? (backGusset ? 0.9 : 1.5) - options.waistlowering
          : options.waistbandsize)
      : 0
    const gussetWidth =
      measurements.crossSeamFront * (options.cyclingchamois ? 0.075 : options.gussetwidth * 0.5)
    const backGussetWidth = options.backgussetwidth * 2.34
    const frontGussetLength = measurements.crossSeamFront * options.frontgussetlength
    const frontBulge = options.cyclingchamois ? true : options.frontbulge
    const backGussetLength = measurements.crossSeamFront * options.frontgussetlength

    store.set('waistLowering', waistLowering)
    store.set('waistReduction', waistReduction)
    store.set('waistbandSize', waistbandSize)
    store.set('gussetWidth', gussetWidth)
    store.set('frontGussetLength', frontGussetLength)
    store.set('backGussetLength', backGussetLength)

    const seatBackFrontRatio = measurements.seatBack / measurements.seatFront
    const crossSeamBackFrontRatio = measurements.crossSeamBack / measurements.crossSeamFront
    const waistToInseam = measurements.waistToFloor - measurements.inseam
    const ease = 1 + options.ease
    const legLength = measurements.inseam * options.leglength

    points.centerWaist = new Point(0, 0)
    points.centerFloor = new Point(0, measurements.waistToFloor)
    points.centerAnkle = new Point(0, measurements.waistToFloor - measurements.heel / Math.PI)
    points.centerKnee = new Point(0, measurements.waistToKnee)
    points.centerUpperLeg = new Point(0, measurements.waistToUpperLeg)
    points.centerInseam = new Point(0, waistToInseam)
    points.centerHips = new Point(0, measurements.waistToHips)
    points.centerSeat = new Point(0, measurements.waistToSeat)

    points.frontAnkle = points.centerAnkle.shift(0, (measurements.ankle / 2) * ease)
    points.backAnkle = points.centerAnkle.shift(180, (measurements.ankle / 2) * ease)
    points.frontKnee = points.centerKnee.shift(0, (measurements.knee / 2) * ease)
    points.backKnee = points.centerKnee.shift(180, (measurements.knee / 2) * ease)
    points.frontUpperLeg = points.centerUpperLeg.shift(0, (measurements.upperLeg / 2) * ease)
    points.backUpperLeg = points.centerUpperLeg.shift(180, (measurements.upperLeg / 2) * ease)

    const backWaistAngle = utils.rad2deg(
      Math.asin(
        ((measurements.waistToUpperLeg * seatBackFrontRatio * (crossSeamBackFrontRatio - 1)) /
          measurements.waistBack) *
          0.5 *
          ease
      )
    )
    const frontWaistAngle = utils.rad2deg(
      Math.asin(
        ((measurements.waistToUpperLeg * seatBackFrontRatio * (crossSeamBackFrontRatio - 1)) /
          measurements.waistFront) *
          0.5 *
          ease
      )
    )

    points.backWaist = points.centerWaist.shift(
      180 - backWaistAngle,
      measurements.waistBack * 0.5 * ease
    )
    points.frontWaist = points.centerWaist.shift(
      360 - frontWaistAngle,
      measurements.waistFront * 0.5 * ease
    )
    points.backHips = points.centerHips.shift(180 - backWaistAngle, measurements.hips * 0.25 * ease)

    points.frontHips = points.centerHips.shift(
      360 - frontWaistAngle,
      measurements.hips * 0.25 * ease
    )

    points.backSeat = points.centerSeat.shift(
      180 - backWaistAngle,
      measurements.seatBack * 0.5 * ease
    )

    points.frontSeat = points.centerSeat.shift(
      360 - frontWaistAngle,
      measurements.seatFront * 0.5 * ease
    )

    createControlPoints(points, cpDistanceDivider, ['frontWaist', 'frontSeat', 'frontUpperLeg'])
    createControlPoints(points, cpDistanceDivider, ['backWaist', 'backSeat', 'backUpperLeg'])

    points.frontUpperLegCp2 = points.frontUpperLeg.shiftFractionTowards(points.centerUpperLeg, 0.5)
    points.frontUpperLegCp2Temp = points.frontUpperLeg.shiftFractionTowards(
      points.centerUpperLeg,
      0.5
    )
    points.backUpperLegCp2 = points.backUpperLeg.shiftFractionTowards(points.centerUpperLeg, 0.4)

    paths.center = new Path().move(points.centerWaist).line(points.centerAnkle).hide()

    paths.front = new Path()
      .move(points.frontWaist)
      ._curve(points.frontUpperLegCp2, points.frontUpperLeg)
      .hide()
    paths.back = new Path()
      .move(points.backWaist)
      ._curve(points.backUpperLegCp2, points.backUpperLeg)
      .hide()
    ;['center', 'front', 'back'].forEach((prefix) => {
      reduceWaist(paths, Path, points, log, prefix, 'Waist', waistLowering)
    })

    points.frontHips = paths.front.shiftAlong(measurements.waistToHips - waistLowering)
    points.backHips = paths.back.shiftAlong(measurements.waistToHips - waistLowering)

    paths.frontTop = paths.front.split(points.frontHips)[0].hide()
    paths.backTop = paths.back.split(points.backHips)[0].hide()
    ;['center', 'front', 'back'].forEach((prefix) => {
      points[prefix + 'Waistband'] = points[prefix + 'Waist'].clone()
      reduceWaist(paths, Path, points, log, prefix, 'Waistband', waistbandSize)
    })
    points.backWaistbandTemp = points.backWaistband

    if (!backGusset && options.waistband) {
      reduceWaist(paths, Path, points, log, 'back', 'Waistband', measurements.crossSeamBack * 0.1)
    }
    points.backWaistband
    points.centerWaistbandCp = points.frontWaistband.shiftFractionTowards(
      points.centerWaistband,
      1.2
    )
    points.backWaistbandCp2 = points.backWaistband.shiftFractionTowards(
      points.centerWaistbandCp,
      0.7
    )

    points.frontWaistbandCp = paths.frontTop.shiftAlong(
      Math.min(waistbandSize / 2, paths.frontTop.length() * 0.95)
    )
    points.frontWaist = points.frontWaist.shiftTowards(points.centerWaist, waistReduction / 4)
    paths.frontTop = new Path()
      .move(points.frontWaist)
      ._curve(points.frontWaistbandCp, points.frontWaistband)
      .hide()

    points.backWaistbandCp1 = paths.backTop.shiftAlong(
      Math.min(waistbandSize / 2, paths.backTop.length() * 0.95)
    )
    points.backWaist = points.backWaist.shiftTowards(points.centerWaist, waistReduction / 4)
    paths.backTop = new Path()
      .move(points.backWaist)
      ._curve(points.backWaistbandCp1, points.backWaistband)
      .hide()

    points.frontGusset = paths.front
      .offset(gussetWidth)
      .intersects(extendPath(Path, new Path().move(points.frontUpperLeg).line(points.frontKnee)))[0]
    points.backGusset = paths.back
      .offset(gussetWidth * -1)
      .intersects(extendPath(Path, new Path().move(points.backUpperLeg).line(points.backKnee)))[0]

    points.frontGussetJoin = paths.front
      .reverse()
      .shiftAlong(Math.min(frontGussetLength, paths.front.length()))
    points.backGussetJoin = paths.back
      .reverse()
      .shiftAlong(Math.min(backGussetLength, paths.back.length()))

    if (frontBulge) {
      paths.front = extendPath(Path, paths.front.offset(gussetWidth)).hide()
      const tempWaistline = new Path().move(points.frontWaistband).line(points.centerWaistband)
      points.frontWaistband = paths.front.intersects(tempWaistline)[0]

      if (false === points.frontWaistband.sitsRoughlyOn(paths.front.start())) {
        paths.frontTemp = extendPath(Path, paths.front).hide()
        points.frontWaistband = paths.frontTemp.intersects(tempWaistline)[0]
        paths.front = paths.frontTemp.split(points.frontWaistband)[1].hide()

        paths.front = paths.front.split(points.frontWaistband)[1].hide()
      }

      const kneeToUpperLeg = new Path().move(points.frontUpperLeg).line(points.frontKnee)
      points.frontGusset = paths.front.intersects(kneeToUpperLeg)[0]
      if (false == points.frontGusset.sitsRoughlyOn(paths.front.end())) {
        paths.front = paths.front.split(points.frontGusset)[0].hide()
      }
    } else {
      createGusset(points, paths, Path, store, 'front', gussetWidth, frontGussetLength)
    }

    if (backGusset) {
      paths.backTempGusset = paths.back.offset(-1 * gussetWidth).hide()

      const backHips = paths.back.shiftFractionAlong(0.99)
      const backHipsAngle = points.backHips.angle(backHips) + 90

      points.backUpperLegToHips = new Point(points.backHips.x, points.backUpperLeg.y)
      points.backCircleMiddle = points.backHips.shiftFractionTowards(points.backUpperLegToHips, 0.5)

      points.backCircleHipsCp1 = points.backHips.shift(
        backHipsAngle,
        measurements.hips * 0.25 * 0.5 * ease * backGussetWidth
      )

      points.backCircleUpperLegCp1 = points.backUpperLegToHips.shift(
        0,
        measurements.upperLeg * 0.25 * ease * backGussetWidth
      )

      paths.backTempCircle = new Path()
        .move(points.backHips)
        .curve(points.backCircleHipsCp1, points.backCircleUpperLegCp1, points.backUpperLeg)
        .hide()

      points.backCircleGusset = paths.backTempCircle.intersects(paths.backTempGusset)[1]
      const pathBackGusset = paths.backTempGusset.split(points.backCircleGusset)
      if (undefined !== pathBackGusset[1].ops) {
        paths.backGusset = pathBackGusset[1].hide()
      } else {
        paths.backGusset = paths.backTempGusset.clone().hide()
      }

      paths.backCircle = paths.backTempCircle.split(points.backCircleGusset)[0].hide()
      paths.backGusset = paths.backGusset.split(points.backGusset)[0].hide()

      paths.back = new Path()
        .move(points.backWaistband)
        .line(points.backHips)
        .join(paths.backCircle)
        .join(paths.backGusset)
        .hide()

      paths.backTop = new Path().move(points.backWaistband).line(points.backHips).hide()

      store.set('backGussetLength', paths.backGusset.length())
      store.set('backCircleLength', paths.backCircle.length())
    } else {
      createGusset(points, paths, Path, store, 'back', gussetWidth, backGussetLength)
    }

    store.set('frontLength', paths.front.length())
    ;['front', 'back'].forEach((prefix) => {
      createControlPoints(points, cpDistanceDivider, [
        prefix + 'UpperLeg',
        prefix + 'Knee',
        prefix + 'Ankle',
      ])
    })

    paths.frontLeg = new Path()
      .move(points.frontGusset)
      ._curve(points.frontKneeCp2, points.frontKnee)
      .curve_(points.frontKneeCp1, points.frontAnkle)
      .hide()
    paths.backLeg = new Path()
      .move(points.backGusset)
      ._curve(points.backKneeCp2, points.backKnee)
      .curve_(points.backKneeCp1, points.backAnkle)
      .hide()

    points.centerBottom = points.centerInseam.shift(270, legLength)
    if (points.centerBottom.y > points.centerAnkle.y) {
      points.centerBottom.y = points.centerAnkle.y
    }
    const bottom = new Path()
      .move(points.centerBottom.shift(180, measurements.seat))
      .line(points.centerBottom.shift(0, measurements.seat))
    const frontLeg = extendPath(Path, paths.frontLeg)
    const backLeg = extendPath(Path, paths.backLeg)

    points.frontBottom = frontLeg.intersects(bottom)[0]
    points.backBottom = backLeg.intersects(bottom)[0]
    points.backBottom.name = 'backBottom'

    const flSplit = paths.frontLeg.split(points.frontBottom)
    if (
      false === points.frontBottom.sitsRoughlyOn(points.frontAnkle) &&
      flSplit[0].ops !== undefined
    ) {
      paths.frontLeg = flSplit[0].hide()
    }
    const blSplit = paths.backLeg.split(points.backBottom)
    if (
      false === points.backBottom.sitsRoughlyOn(points.backAnkle) &&
      blSplit[0].ops !== undefined
    ) {
      paths.backLeg = blSplit[0].hide()
    }

    paths.waist = new Path()
      .move(points.frontWaistband)
      .line(points.centerWaistband)
      .curve(points.centerWaistbandCp, points.backWaistbandCp2, points.backWaistband)
      .hide()
    paths.ankle = new Path()
      .move(points.backAnkle)
      .line(points.centerAnkle)
      .line(points.frontAnkle)
      .hide()
    paths.bottom = new Path().move(points.backBottom).line(points.frontBottom).hide()

    store.set('waistLength', paths.waist.length())
    store.set('waistLengthFront', points.frontWaistband.dist(points.centerWaistband))
    store.set('waistLengthBack', store.get('waistLength') - store.get('waistLengthFront'))

    return part.hide()
  },
}
