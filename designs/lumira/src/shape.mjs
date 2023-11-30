import { pctBasedOn } from '@freesewing/core'

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
    cyclingchamois: { bool: false, menu: 'style' },
    frontbulge: {
      bool: false,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.cyclingchamois ? false : 'style'),
    },

    // Percentages
    ease: { pct: -10, min: -30, max: 0, menu: 'fit' },
    waistlowering: { pct: 35, min: 0, max: 60, ...pctBasedOn('waistToHips'), menu: 'style' },
    gussetwidth: {
      pct: 16,
      min: 5,
      max: 30,
      ...pctBasedOn('crossSeamFront'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.cyclingchamois ? false : 'style'),
    },
    backgussetwidth: { pct: 50, min: 20, max: 75, ...pctBasedOn('hips'), menu: 'fit' },
    frontgussetlength: {
      pct: 12.5,
      min: 0,
      max: 80,
      ...pctBasedOn('crossSeamFront'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.frontbulge ? false : 'style'),
    },
    waistbandsize: {
      pct: 55,
      min: 0,
      max: 90,
      ...pctBasedOn('waistToHips'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'style' : false),
    },
    waistreduction: {
      pct: 1,
      min: 0,
      max: 10,
      ...pctBasedOn('waist'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'style' : false),
    },
  },
  draft: ({ measurements, store, Point, points, Path, paths, options, utils, part }) => {
    const cpDistanceDivider = 3.5
    const waistLowering = measurements.waistToHips * options.waistlowering
    const waistReduction = options.waistband ? measurements.waist * options.waistreduction : 0
    const waistbandSize = options.waistband
      ? measurements.waistToHips *
        (options.waistlowering + options.waistbandsize > 0.98
          ? 0.98 - options.waistlowering
          : options.waistbandsize)
      : 0
    const gussetWidth =
      measurements.crossSeamFront * (options.cyclingcchamois ? 0.075 : options.gussetwidth * 0.5)
    const backGussetWidth = options.backgussetwidth * 2.34
    const frontGussetLength = measurements.crossSeamFront * options.frontgussetlength
    const frontBulge = options.cyclingchamois ? true : options.frontbulge

    store.set('waistLowering', waistLowering)
    store.set('waistReduction', waistReduction)
    store.set('waistbandSize', waistbandSize)
    store.set('gussetWidth', gussetWidth)
    store.set('frontGussetLength', frontGussetLength)

    const ReduceWaist = (pathName, pointName, distance) => {
      const newPoint = paths[pathName].shiftAlong(distance)
      if (newPoint.sitsRoughlyOn(points[pathName + 'Waist'])) {
        return
      }
      points[pathName + pointName] = newPoint
      const pTemp = paths[pathName].split(points[pathName + pointName])
      if (pTemp.length != 2) {
        log.info('couldNotReduceWaist')
        console.log('couldNotReduceWaist')
        return
      }
      paths[pathName] = pTemp[1].hide()
    }
    const ControlPoints = (p1, p2, p3) => {
      var angle
      if (p1 === undefined) {
        angle = p2.angle(p3) + 180
      } else if (p3 === undefined) {
        angle = p2.angle(p1)
      } else {
        angle = Math.abs(p2.angle(p1) - p2.angle(p3)) / 2
      }
      return {
        cp1:
          p3 !== undefined
            ? p2.shift(p2.angle(p3) - angle + 90, p2.dist(p3) / cpDistanceDivider)
            : null,
        cp2:
          p1 !== undefined
            ? p2.shift(p2.angle(p1) + angle - 90, p2.dist(p1) / cpDistanceDivider)
            : null,
      }
    }
    const CreateControlPoints = (names) => {
      for (var i = 0; i < names.length; i++) {
        var cp = ControlPoints(points[names[i - 1]], points[names[i]], points[names[i + 1]])
        if (cp.cp1) points[names[i] + 'Cp1'] = cp.cp1
        if (cp.cp2) points[names[i] + 'Cp2'] = cp.cp2
      }
    }
    const ExtendPath = (path, length = 100) => {
      return new Path()
        .move(path.shiftAlong(1).shiftOutwards(path.start(), length))
        .line(path.start())
        .join(path)
        .line(path.shiftAlong(path.length() - 1).shiftOutwards(path.end(), length))
    }

    const seatBackFrontRatio = measurements.seatBack / measurements.seatFront
    const crossSeamBackFrontRatio = measurements.crossSeamBack / measurements.crossSeamFront
    const waistToInseam = measurements.waistToFloor - measurements.inseam
    const ease = 1 + options.ease

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

    CreateControlPoints(['frontWaist', 'frontSeat', 'frontUpperLeg'])
    CreateControlPoints(['backWaist', 'backSeat', 'backUpperLeg'])

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
      ReduceWaist(prefix, 'Waist', waistLowering)
    })

    points.frontHips = paths.front.shiftAlong(measurements.waistToHips - waistLowering)
    points.backHips = paths.back.shiftAlong(measurements.waistToHips - waistLowering)

    paths.frontTop = paths.front.split(points.frontHips)[0].hide()
    paths.backTop = paths.back.split(points.backHips)[0].hide()
    ;['center', 'front', 'back'].forEach((prefix) => {
      points[prefix + 'Waistband'] = points[prefix + 'Waist'].clone()
      ReduceWaist(prefix, 'Waistband', waistbandSize)
    })

    points.frontWaistbandCp = paths.frontTop.shiftAlong(waistbandSize / 2)
    points.frontWaist = points.frontWaist.shiftTowards(points.centerWaist, waistReduction / 4)
    paths.frontTop = new Path()
      .move(points.frontWaist)
      ._curve(points.frontWaistbandCp, points.frontWaistband)
      .hide()

    points.backWaistbandCp = paths.backTop.shiftAlong(waistbandSize / 2)
    points.backWaist = points.backWaist.shiftTowards(points.centerWaist, waistReduction / 4)
    paths.backTop = new Path()
      .move(points.backWaist)
      ._curve(points.backWaistbandCp, points.backWaistband)
      .hide()

    points.frontGusset = points.frontUpperLeg.shiftTowards(points.frontKnee, gussetWidth)
    points.backGusset = points.backUpperLeg.shiftTowards(points.backKnee, gussetWidth)

    points.frontGussetJoin = paths.front.reverse().shiftAlong(frontGussetLength)

    if (frontBulge) {
      paths.front = ExtendPath(paths.front.offset(gussetWidth)).hide()
      points.frontWaistband = paths.front.intersects(
        new Path().move(points.frontWaistband).line(points.centerWaistband)
      )[0]
      console.log({
        path: paths.front,
        // intersectingPath: paths.waistTemp,
        intersectPoint: points.frontWaistband,
        results: s,
      })

      // paths.front1 = paths.front.clone().unhide()
      if (false == points.frontWaistband.sitsRoughlyOn(paths.front.start())) {
        var s = paths.front.split(points.frontWaistband)
        const sl = Math.floor(paths.front.length() * 10)
        if (sl != Math.floor(s[0].length() + s[1].length())) {
          paths.front = ExtendPath(paths.front.offset(0.01)).hide()
          points.frontWaistband = paths.front.intersects(
            new Path().move(points.frontWaistband).line(points.centerWaistband)
          )[0]
        }
        console.log({
          pf: paths.front,
          p: points.frontWaistband,
          hi1: paths.front.split(points.frontWaistband),
        })
        // paths.front1a = paths.front.split(points.frontWaistband)[0].addClass('note')
        // paths.front1b = paths.front.split(points.frontWaistband)[1].addClass('lining')
        paths.front = paths.front.split(points.frontWaistband)[1].hide()
      }

      //////
      // something goes wrong here
      //////

      // paths.front2 = paths.front.clone().unhide().addClass('lining')
      const kneeToUpperLeg = new Path().move(points.frontUpperLeg).line(points.frontKnee)
      console.log({
        pf: paths.front,
        ktul: kneeToUpperLeg,
        inter: ExtendPath(paths.front).intersects(kneeToUpperLeg),
      })
      points.frontGusset = paths.front.intersects(kneeToUpperLeg)[0]
      if (false == points.frontGusset.sitsRoughlyOn(paths.front.end())) {
        console.log({
          pf: paths.front,
          p: points.frontWaistband,
          hi2: paths.front.split(points.frontGusset),
        })
        paths.front = paths.front.split(points.frontGusset)[0].hide()
      }
    } else {
      points.frontGussetCp = points.frontGusset.shiftFractionTowards(points.centerUpperLeg, 0.1)
      if (points.frontGussetCp.x < points.frontGussetJoin.x) {
        points.frontGussetCp.x = points.frontGussetJoin.x
      }
      if (points.frontGussetCp.x > points.frontGusset.x) {
        points.frontGussetCp.x = points.frontGusset.x
      }

      const pFrontGusset = new Path()
        .move(points.frontGussetJoin)
        ._curve(points.frontGussetCp, points.frontGusset)
        .hide()
      const pFrontGussetPoint = pFrontGusset.shiftAlong(1)
      const pFront = new Path()
        .move(points.frontWaist)
        ._curve(points.frontUpperLegCp2, points.frontUpperLeg)
        .hide()
      const pFrontPoint = pFront.shiftAlong(1)
      if (
        points.frontGussetJoin.angle(pFrontGussetPoint) > pFrontPoint.angle(points.frontGussetJoin)
      ) {
        points.frontGussetJoinCp = points.frontGussetJoin.shift(
          pFrontPoint.angle(points.frontGussetJoin),
          frontGussetLength - gussetWidth
        )
      } else {
        points.frontGussetJoinCp = points.frontGussetJoin.clone()
      }

      paths.frontGusset = new Path()
        .move(points.frontGussetJoin)
        .curve(points.frontGussetJoinCp, points.frontGussetCp, points.frontGusset)
        .hide()
      const frontTemp = paths.front.reverse().shiftAlong(frontGussetLength - 1)
      const frontGussetTemp = paths.front.shiftAlong(1)
      const frontGussetAngle = Math.abs(
        points.frontGussetJoin.angle(frontGussetTemp) - frontTemp.angle(points.frontGussetJoin)
      )
      store.set('frontGussetAngle', frontGussetAngle * 2)

      paths.front = paths.front.split(points.frontGussetJoin)[0].join(paths.frontGusset).hide()
    }
    store.set('frontLength', paths.front.length())
    ;['front', 'back'].forEach((prefix) => {
      CreateControlPoints([prefix + 'UpperLeg', prefix + 'Knee', prefix + 'Ankle'])
    })

    paths.backTempGusset = paths.back.offset(-1 * gussetWidth).hide()

    paths.waist = new Path()
      .move(points.frontWaistband)
      .line(points.centerWaistband)
      .line(points.backWaistband)
      .hide()
    paths.ankle = new Path()
      .move(points.backAnkle)
      .line(points.centerAnkle)
      .line(points.frontAnkle)
      .hide()

    store.set('waistLength', paths.waist.length())

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

    paths.back = paths.back.split(points.backHips)[0].hide()

    paths.backTempCircle = new Path()
      .move(points.backHips)
      .curve(points.backCircleHipsCp1, points.backCircleUpperLegCp1, points.backUpperLeg)
      .hide()
    console.log({ csb: measurements.crossSeamBack, pl: paths.back.length() + waistLowering })

    points.backCircleGusset = paths.backTempCircle.intersects(paths.backTempGusset)[1]
    const pathBackGusset = paths.backTempGusset.split(points.backCircleGusset)
    if (undefined !== pathBackGusset[1].ops) {
      paths.backGusset = paths.backTempGusset.split(points.backCircleGusset)[1].hide()
    } else {
      paths.backGusset = paths.backTempGusset.clone()
    }
    paths.backCircle = paths.backTempCircle.split(points.backCircleGusset)[0].hide()

    store.set('backGussetLength', paths.backGusset.length())
    store.set('backCircleLength', paths.backCircle.length())

    // console.log({ points: JSON.parse(JSON.stringify(points)) })
    // console.log({ paths: JSON.parse(JSON.stringify(paths)) })
    // console.log({ store: JSON.parse(JSON.stringify(store)) })
    // console.log({ measurements: JSON.parse(JSON.stringify(measurements)) })

    return part
  },
}
