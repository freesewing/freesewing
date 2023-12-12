import { pluginTiming } from '@freesewing/plugin-timing'
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
  plugins: [pluginTiming],
  options: {
    // Constants
    gussetcompensation: 1.03,

    // Booleans
    waistband: { bool: true, menu: 'style' },
    backgusset: { bool: true, menu: 'style' },
    cyclingchamois: { bool: false, menu: 'style' },
    frontbulge: {
      bool: false,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.cyclingchamois ? false : 'style'),
    },

    // Percentages
    ease: { pct: -5, min: -30, max: 0, menu: 'fit' },
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
      pct: 2,
      min: 0,
      max: 10,
      ...pctBasedOn('waist'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'style' : false),
    },
  },
  draft: ({ measurements, store, Point, points, Path, paths, options, utils, log, part }) => {
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
      measurements.crossSeamFront * (options.cyclingchamois ? 0.075 : options.gussetwidth * 0.5)
    const backGussetWidth = options.backgussetwidth * 2.34
    const frontGussetLength = measurements.crossSeamFront * options.frontgussetlength
    const frontBulge = options.cyclingchamois ? true : options.frontbulge
    const backGussetLength = measurements.crossSeamFront * options.frontgussetlength
    const backGusset = options.cyclingchamois ? true : options.backgusset

    store.set('waistLowering', waistLowering)
    store.set('waistReduction', waistReduction)
    store.set('waistbandSize', waistbandSize)
    store.set('gussetWidth', gussetWidth)
    store.set('frontGussetLength', frontGussetLength)
    store.set('backGussetLength', backGussetLength)

    const ReduceWaist = (pathName, pointName, distance) => {
      const path = ExtendPath(paths[pathName], 100, 0)
      const newPoint = path.shiftAlong(distance + 100)
      // const path = paths[pathName].clone()
      // const newPoint = path.shiftAlong(distance)
      // const newPoint = paths[pathName].shiftAlong(distance)
      if (newPoint.sitsRoughlyOn(points[pathName + 'Waist'])) {
        return
      }
      points[pathName + pointName] = newPoint
      const pTemp = path.split(points[pathName + pointName])
      if (pTemp.length != 2) {
        log.info('couldNotReduceWaist')
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
    const ExtendPath = (path, startLength = 100, endLength = 100) => {
      return new Path()
        .move(path.shiftAlong(1).shiftOutwards(path.start(), startLength))
        .line(path.start())
        .join(path)
        .line(path.shiftAlong(path.length() - 1).shiftOutwards(path.end(), endLength))
    }
    const CreateGusset = (side, gussetLength) => {
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
      console.log({ s: side, a1: angle1, a2: angle2 })
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
      const frontTemp = paths[side].reverse().shiftAlong(gussetLength - 1)
      const gussetTemp = paths[side].shiftAlong(1)
      const gussetAngle = Math.abs(
        points[side + 'GussetJoin'].angle(gussetTemp) - frontTemp.angle(points[side + 'GussetJoin'])
      )
      store.set(side + 'GussetAngle', gussetAngle * 2)

      paths[side + 'Top'] = paths[side].split(points[side + 'GussetJoin'])[0].hide()
      paths[side] = paths[side + 'Top']
        .clone()
        .join(paths[side + 'Gusset'])
        .hide()
    }

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
    points.backGussetJoin = paths.back.reverse().shiftAlong(backGussetLength)

    if (frontBulge) {
      paths.front = ExtendPath(paths.front.offset(gussetWidth)).hide()
      points.frontWaistband = paths.front.intersects(
        new Path().move(points.frontWaistband).line(points.centerWaistband)
      )[0]

      if (false == points.frontWaistband.sitsRoughlyOn(paths.front.start())) {
        var s = paths.front.split(points.frontWaistband)
        const sl = Math.floor(paths.front.length() * 10)
        if (sl != Math.floor(s[0].length() + s[1].length())) {
          paths.front = ExtendPath(paths.front.offset(0.01)).hide()
          points.frontWaistband = paths.front.intersects(
            new Path().move(points.frontWaistband).line(points.centerWaistband)
          )[0]
        }
        paths.front = paths.front.split(points.frontWaistband)[1].hide()
      }

      const kneeToUpperLeg = new Path().move(points.frontUpperLeg).line(points.frontKnee)
      points.frontGusset = paths.front.intersects(kneeToUpperLeg)[0]
      if (false == points.frontGusset.sitsRoughlyOn(paths.front.end())) {
        paths.front = paths.front.split(points.frontGusset)[0].hide()
      }
    } else {
      CreateGusset('front', frontGussetLength)
    }
    store.set('frontLength', paths.front.length())
    ;['front', 'back'].forEach((prefix) => {
      CreateControlPoints([prefix + 'UpperLeg', prefix + 'Knee', prefix + 'Ankle'])
    })

    paths.backTempGusset = paths.back.offset(-1 * gussetWidth).hide()

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
    const frontLeg = ExtendPath(paths.frontLeg)
    const backLeg = ExtendPath(paths.backLeg)

    // paths.bottomTemp = bottom.clone()
    // paths.frontLeg.unhide()
    // paths.backLeg.unhide()

    points.frontBottom = frontLeg.intersects(bottom)[0]
    points.backBottom = backLeg.intersects(bottom)[0]

    if (false == points.frontBottom.sitsRoughlyOn(points.frontAnkle)) {
      paths.frontLeg = paths.frontLeg.split(points.frontBottom)[0].hide()
    }
    if (false == points.backBottom.sitsRoughlyOn(points.backAnkle)) {
      paths.backLeg = paths.backLeg.split(points.backBottom)[0].hide()
    }

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
    paths.bottom = new Path().move(points.backBottom).line(points.frontBottom).hide()

    store.set('waistLength', paths.waist.length())

    if (backGusset) {
      // paths.back1 = paths.back.clone().unhide().setClass('note')
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

      points.backCircleGusset = paths.backTempCircle.intersects(paths.backTempGusset)[1]
      const pathBackGusset = paths.backTempGusset.split(points.backCircleGusset)
      if (undefined !== pathBackGusset[1].ops) {
        paths.backGusset = paths.backTempGusset.split(points.backCircleGusset)[1].hide()
      } else {
        paths.backGusset = paths.backTempGusset.clone()
      }
      paths.backCircle = paths.backTempCircle.split(points.backCircleGusset)[0].hide()

      paths.backGusset = paths.backGusset.split(points.backGusset)[0].hide()

      store.set('backGussetLength', paths.backGusset.length())
      store.set('backCircleLength', paths.backCircle.length())
    } else {
      CreateGusset('back', backGussetLength)
    }
    // console.log({ points: JSON.parse(JSON.stringify(points)) })
    // console.log({ paths: JSON.parse(JSON.stringify(paths)) })
    // console.log({ store: JSON.parse(JSON.stringify(store)) })
    // console.log({ measurements: JSON.parse(JSON.stringify(measurements)) })

    const shapeTook = store.get(['timing', 'parts', 'lumira.shape', 'took'])
    log.info('The lumira.shape part took ' + shapeTook + ' ms to draft.')

    log.info(JSON.stringify(store.timing))

    // for (const pathName in paths) {
    //   var path = paths[pathName]
    //   path.unhide()
    //   path.setText(pathName)
    // }

    // points.backWaist.addCircle(5).addCircle(10)
    // points.backHips.addCircle(3).addCircle(6).addCircle(9)

    console.log({ m: measurements.waistToHips, d: points.backWaist.dist(points.backHips) })

    return part
  },
}
