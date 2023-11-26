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

    // Booleans
    frontBulge: {
      bool: false,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.cyclingChamois ? false : 'style'),
    },
    waistband: { bool: false, menu: 'style' },
    cyclingChamois: { bool: false, menu: 'style' },

    // Percentages
    ease: { pct: -10, min: -30, max: 0, menu: 'fit' },
    waistLowering: { pct: 35, min: 0, max: 60, menu: 'style' },
    gussetWidth: {
      pct: 10,
      min: 0,
      max: 30,
      ...pctBasedOn('crossSeamFront'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.cyclingChamois ? false : 'style'),
    },
    backGussetWidth: { pct: 50, min: 20, max: 75, ...pctBasedOn('hips'), menu: 'fit' },
    frontGussetLength: {
      pct: 12.5,
      min: 0,
      max: 80,
      ...pctBasedOn('crossSeamFront'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.frontBulge ? false : 'style'),
    },
    waistbandSize: {
      pct: 55,
      min: 0,
      max: 90,
      ...pctBasedOn('waistToHips'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'style' : false),
    },
    waistReduction: {
      pct: 1,
      min: 0,
      max: 10,
      ...pctBasedOn('waist'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'style' : false),
    },
  },
  draft: ({
    measurements,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    options,
    macro,
    utils,
    part,
  }) => {
    let a
    const cpDistanceDivider = 3.5
    const waistLowering = measurements.waistToHips * options.waistLowering
    const waistReduction = options.waistband ? measurements.waist * options.waistReduction : 0
    const waistbandSize = options.waistband
      ? measurements.waistToHips *
        (options.waistLowering + options.waistbandSize > 0.98
          ? 0.98 - options.waistLowering
          : options.waistbandSize)
      : 0
    const gussetWidth =
      measurements.crossSeamFront * (options.cyclingChamois ? 0.075 : options.gussetWidth * 0.5)
    const backGussetWidth = options.backGussetWidth * 2.34
    const frontGussetLength = measurements.crossSeamFront * options.frontGussetLength
    const frontBulge = options.cyclingChamois ? true : options.frontBulge

    store.set('waistLowering', waistLowering)
    store.set('waistReduction', waistReduction)
    store.set('waistbandSize', waistbandSize)
    store.set('gussetWidth', gussetWidth)
    store.set('frontGussetLength', frontGussetLength)

    const ReduceWaist = (pathName, pointName, distance) => {
      console.log({ pathName: pathName, distance: distance, l: paths[pathName] })
      console.log({ paths: JSON.parse(JSON.stringify(paths)) })
      console.log({ points: JSON.parse(JSON.stringify(points)) })
      console.log({ pn: pathName + 'Waist', p: points[pathName + 'Waist'] })

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
      if (p1 === undefined) {
        a = p2.angle(p3) + 180
      } else if (p3 === undefined) {
        a = p2.angle(p1)
      } else {
        a = Math.abs(p2.angle(p1) - p2.angle(p3)) / 2
      }
      // const t1 = p2.shift(p2.angle(p1) + a - 90, p2.dist(p1) / 3)
      // const t3 = p2.shift(p2.angle(p3) - a + 90, p2.dist(p3) / 3)
      return {
        cp1:
          p1 !== undefined
            ? p2.shift(p2.angle(p1) + a - 90, p2.dist(p1) / cpDistanceDivider)
            : null,
        cp3:
          p3 !== undefined
            ? p2.shift(p2.angle(p3) - a + 90, p2.dist(p3) / cpDistanceDivider)
            : null,
      }
    }
    const CreateControlPoints = (names) => {
      for (var i = 0; i < names.length; i++) {
        var cp = ControlPoints(points[names[i - 1]], points[names[i]], points[names[i + 1]])
        if (cp.cp1) points[names[i] + 'Cp2'] = cp.cp1
        if (cp.cp3) points[names[i] + 'Cp1'] = cp.cp3
      }
    }

    const waistBackFrontRatio = measurements.waistBack / measurements.waistFront
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

    // AdjustUpperLegPoints('front')
    // AdjustUpperLegPoints('back')
    CreateControlPoints(['frontWaist', 'frontSeat', 'frontUpperLeg'])
    CreateControlPoints(['backWaist', 'backSeat', 'backUpperLeg'])

    // paths.front = new Path()
    //   .move(points.frontAnkle)
    //   .line(points.frontKnee)
    //   .line(points.frontUpperLeg)
    // paths.back = new Path().move(points.backAnkle).line(points.backKnee).line(points.backUpperLeg)

    // paths.frontCrotch1 = new Path()
    //   .move(points.frontWaist)
    //   .curve(points.frontWaist, points.frontSeatCp2, points.frontSeat)
    //   .curve(points.frontSeatCp1, points.frontUpperLegCp2, points.frontUpperLeg)
    // paths.backCrotch1 = new Path()
    //   .move(points.backWaist)
    //   .curve(points.backWaist, points.backSeatCp2, points.backSeat)
    //   .curve(points.backSeatCp1, points.backUpperLegCp2, points.backUpperLeg)

    points.frontUpperLeg1 = points.centerUpperLeg.shift(0, (measurements.upperLeg / 2) * ease)
    points.backUpperLeg1 = points.centerUpperLeg.shift(180, (measurements.upperLeg / 2) * ease)
    points.frontUpperLegCp2 = points.frontUpperLeg.shiftFractionTowards(points.centerUpperLeg, 0.4)
    points.backUpperLegCp2 = points.backUpperLeg.shiftFractionTowards(points.centerUpperLeg, 0.4)

    paths.center = new Path().move(points.centerWaist).line(points.centerAnkle).hide()

    // paths.frontT = new Path()
    //   .move(points.frontWaist)
    //   ._curve(points.frontUpperLegCp2, points.frontUpperLeg1)
    // paths.backT = new Path()
    //   .move(points.backWaist)
    //   ._curve(points.backUpperLegCp2, points.backUpperLeg1)
    paths.front = new Path()
      .move(points.frontWaist)
      ._curve(points.frontUpperLegCp2, points.frontUpperLeg1)
      .hide()
    paths.back = new Path()
      .move(points.backWaist)
      ._curve(points.backUpperLegCp2, points.backUpperLeg1)
      .hide()
    ;['center', 'front', 'back'].forEach((prefix) => {
      ReduceWaist(prefix, 'Waist', waistLowering)
    })
    points.frontHips = paths.front.shiftAlong(measurements.waistToHips - waistLowering)
    points.backHips = paths.back.shiftAlong(measurements.waistToHips - waistLowering)

    paths.frontTop = paths.front.split(points.frontHips)[0].hide()
    paths.backTop = paths.back.split(points.backHips)[0].hide()
    ;['center', 'front', 'back'].forEach((prefix) => {
      // points[prefix +'Waist'].addCircle(3)
      points[prefix + 'Waistband'] = points[prefix + 'Waist'].clone()
      ReduceWaist(prefix, 'Waistband', waistbandSize)
      // points[prefix +'Waistband'].addCircle(6)
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

    // paths.back.unhide()

    points.frontGusset = points.frontUpperLeg1.shiftTowards(points.frontKnee, gussetWidth)
    points.backGusset = points.backUpperLeg1.shiftTowards(points.backKnee, gussetWidth)

    points.frontGussetJoin = paths.front.reverse().shiftAlong(frontGussetLength) //.addCircle(3).addCircle(5)

    if (frontBulge) {
      // const frontBulgeSize = options.frontBulgeSize *measurements.crossSeamFront

      points.frontGussetCp = points.frontUpperLegCp2.clone()
      points.frontWaist = points.frontWaist.shiftTowards(points.backWaist, gussetWidth)
      points.frontWaistband = points.frontWaistband.shiftTowards(points.backWaistband, gussetWidth)

      console.log({
        frontGussetCp: points.frontGussetCp,
        frontWaistband: points.frontWaistband,
        frontGusset: points.frontGusset,
      })
      var iter = 0
      var diff = 0
      do {
        points.frontGussetCp = points.frontGussetCp.shift(0, diff)
        paths.front = new Path()
          .move(points.frontWaistband)
          ._curve(points.frontGussetCp, points.frontGusset)
          .hide()

        diff = paths.front.length() - (measurements.crossSeamFront - waistLowering - waistbandSize)

        console.log({
          i: iter,
          d: diff,
          fl: paths.front.length(),
          csf: measurements.crossSeamFront - waistLowering,
          p: paths.front,
        })
      } while (iter++ < 50 && (diff > 1 || diff < -1))
    } else {
      points.frontGussetCp = points.frontGusset.shiftFractionTowards(points.centerUpperLeg, 0.1) //.addCircle(3)
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
        ._curve(points.frontUpperLegCp2, points.frontUpperLeg1)
        .hide()
      const pFrontPoint = pFront.shiftAlong(1)
      if (
        points.frontGussetJoin.angle(pFrontGussetPoint) > pFrontPoint.angle(points.frontGussetJoin)
      ) {
        points.frontGussetJoinCp = points.frontGussetJoin.shift(
          pFrontPoint.angle(points.frontGussetJoin),
          frontGussetLength - gussetWidth
        ) //.addCircle(10)
      } else {
        points.frontGussetJoinCp = points.frontGussetJoin.clone() //.addCircle(18).addCircle(12)
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

      paths.frontTempGusset = paths.front.offset(gussetWidth).hide()

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

    const backHips = paths.back.shiftFractionAlong(0.99)
    const backHipsAngle = points.backHips.angle(backHips) + 90

    points.backUpperLegToHips = new Point(points.backHips.x, points.backUpperLeg.y)
    points.backCircleMiddle = points.backHips.shiftFractionTowards(points.backUpperLegToHips, 0.5)

    points.backCircleHipsCp1 = points.backHips.shift(
      backHipsAngle,
      measurements.hips * 0.25 * 0.5 * ease * backGussetWidth
    )
    // .addCircle(9)

    points.backCircleUpperLegCp1 = points.backUpperLegToHips.shift(
      0,
      measurements.upperLeg * 0.25 * ease * backGussetWidth
    )
    // .addCircle(5)

    paths.back = paths.back.split(points.backHips)[0].hide()

    paths.backTempCircle = new Path()
      .move(points.backHips)
      .curve(points.backCircleHipsCp1, points.backCircleUpperLegCp1, points.backUpperLeg)
      .hide()
    console.log({ csb: measurements.crossSeamBack, pl: paths.back.length() + waistLowering })

    points.backCircleGusset = paths.backTempCircle.intersects(paths.backTempGusset)[1]
    paths.backGusset = paths.backTempGusset.split(points.backCircleGusset)[1].hide()
    paths.backCircle = paths.backTempCircle.split(points.backCircleGusset)[0].hide()

    store.set('backGussetLength', paths.backGusset.length())
    store.set('backCircleLength', paths.backCircle.length())

    points.backCircleIntersect = paths.backCircle.intersects(
      new Path().move(points.backSeat).line(points.centerSeat)
    )[0]
    // .addCircle(10)
    console.log({
      dist: points.backCircleIntersect.dist(points.centerSeat),
      pct:
        points.backCircleIntersect.dist(points.centerSeat) /
        points.backSeat.dist(points.centerSeat),
    })
    console.log({ points: JSON.parse(JSON.stringify(points)) })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })
    console.log({ store: JSON.parse(JSON.stringify(store)) })
    console.log({ measurements: JSON.parse(JSON.stringify(measurements)) })

    return part
  },
}
