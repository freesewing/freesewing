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
    weird: 0.3,

    // Booleans
    frontBulge: { bool: false, menu: 'style' },

    // Percentages
    ease: { pct: -10, min: -30, max: 0, menu: 'fit' },
    waistReduction: { pct: 35, min: 0, max: 60, menu: 'fit' },
    gussetWidth: { pct: 10, min: 0, max: 60, ...pctBasedOn('crossSeamFront'), menu: 'fit' },
    frontGussetLength: { pct: 12.5, min: 0, max: 90, ...pctBasedOn('crossSeamFront'), menu: 'fit' },
    frontBulgeSize: { pct: 2.5, min: 0, max: 10, ...pctBasedOn('crossSeamFront'), menu: 'fit' },
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
    const waistReduction = measurements.waistToHips * options.waistReduction
    const gussetWidth = measurements.crossSeamFront * options.gussetWidth * 0.5
    const frontGussetLength = measurements.crossSeamFront * options.frontGussetLength

    store.set('waistReduction', waistReduction)
    store.set('gussetWidth', gussetWidth)
    store.set('frontGussetLength', frontGussetLength)

    const ReduceWaist = (pathName) => {
      console.log({ pathName: pathName, waistReduction: waistReduction, l: paths[pathName] })
      console.log({ paths: JSON.parse(JSON.stringify(paths)) })
      console.log({ points: JSON.parse(JSON.stringify(points)) })
      console.log({ pn: pathName + 'Waist', p: points[pathName + 'Waist'] })

      const newWaist = paths[pathName].shiftAlong(waistReduction)
      if (newWaist.sitsRoughlyOn(points[pathName + 'Waist'])) {
        return
      }
      points[pathName + 'Waist'] = newWaist
      const pTemp = paths[pathName].split(points[pathName + 'Waist'])
      if (pTemp.length != 2) {
        log.info('couldNotReduceWaist')
        console.log('couldNotReduceWaist')
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

    const AdjustUpperLegPoints = (prefix) => {
      var diff = 0
      var iter = 0
      const pOriginal = points[prefix + 'UpperLeg'].clone()
      do {
        points[prefix + 'UpperLeg'] = points[prefix + 'UpperLeg'].shift(
          prefix == 'front' ? 0 : 180,
          diff
        )
        // points[prefix + 'UpperLegCp1'] = points[prefix + 'UpperLeg'].shiftFractionTowards(points.centerUpperLeg,.2)
        CreateControlPoints([prefix + 'Waist', prefix + 'Seat', prefix + 'UpperLeg'])
        const pCrotch = new Path()
          .move(points[prefix + 'Waist'])
          .curve(points[prefix + 'Waist'], points[prefix + 'SeatCp2'], points[prefix + 'Seat'])
          .curve(
            points[prefix + 'SeatCp1'],
            points[prefix + 'UpperLegCp2'],
            points[prefix + 'UpperLeg']
          )
        // const pCrotch = new Path()
        //   .move(points[prefix+'Waist'])
        //   .curve(points[prefix+'WaistCp1'],points[prefix+'SeatCp2'],points[prefix+'Seat'])
        //   .curve(points[prefix+'SeatCp1'],points[prefix+'UpperLegCp2'],points[prefix+'UpperLeg'])

        console.log({ points: JSON.parse(JSON.stringify(points)) })

        diff =
          (prefix == 'front' ? measurements.crossSeamFront : measurements.crossSeamBack) -
          pCrotch.length()
        console.log({ i: iter, d: diff })
      } while (iter++ < 100 && (diff > 1 || diff < -1))
      if (iter >= 100) {
        points[prefix + 'UpperLeg'] = pOriginal.clone()
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

    // points.frontUpperLegIn = points.frontUpperLeg.shift(180,options.(weird*(measurements.upperLeg/2))/waistBackFrontRatio)
    // points.backUpperLegIn = points.frontUpperLeg.shift(180,options.(weird*(measurements.upperLeg/2))*waistBackFrontRatio)
    // points.frontWaist = points.frontUpperLegIn

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
    // const backWaistAngle = utils.rad2deg(Math.asin( (waistToInseam * (crossSeamBackFrontRatio - 1)) / measurements.waistBack *.5 ))
    // const frontWaistAngle = utils.rad2deg(Math.asin( (waistToInseam * (crossSeamBackFrontRatio - 1)) / measurements.waistFront *.5 ))

    console.log({
      waistBackFrontRatio: waistBackFrontRatio,
      seatBackFrontRatio: seatBackFrontRatio,
      crossSeamBackFrontRatio: crossSeamBackFrontRatio,
    })
    console.log({ backWaistAngle: backWaistAngle, frontWaistAngle: frontWaistAngle })

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

    paths.front = new Path()
      .move(points.frontWaist)
      ._curve(points.frontUpperLegCp2, points.frontUpperLeg1)
      .hide()
    paths.back = new Path()
      .move(points.backWaist)
      ._curve(points.backUpperLegCp2, points.backUpperLeg1)
      .hide()
    ;['center', 'front', 'back'].forEach((prefix) => {
      ReduceWaist(prefix)
    })

    points.frontHips = paths.front.shiftAlong(measurements.waistToHips - waistReduction)
    points.backHips = paths.back.shiftAlong(measurements.waistToHips - waistReduction)

    paths.frontTop = paths.front.split(points.frontHips)[0].hide()
    paths.backTop = paths.back.split(points.backHips)[0].hide()

    points.frontGusset = points.frontUpperLeg1.shiftTowards(points.frontKnee, gussetWidth)
    points.backGusset = points.backUpperLeg1.shiftTowards(points.backKnee, gussetWidth)

    points.frontGussetJoin = paths.front.reverse().shiftAlong(frontGussetLength)

    points.frontGussetCp2 = points.frontGusset.shiftFractionTowards(points.centerUpperLeg, 0.1)
    paths.frontGusset = new Path()
      .move(points.frontGussetJoin)
      ._curve(points.frontGussetCp2, points.frontGusset)
      .hide()
    const frontTemp = paths.front.reverse().shiftAlong(frontGussetLength - 1)
    const frontGussetTemp = paths.front.shiftAlong(1)
    const frontGussetAngle = Math.abs(
      points.frontGussetJoin.angle(frontGussetTemp) - frontTemp.angle(points.frontGussetJoin)
    )
    store.set('frontGussetAngle', frontGussetAngle * 2)

    // paths.front.unhide()
    paths.frontTempGusset = paths.front.offset(gussetWidth).hide()

    // Need to create thefront paths with the gusset

    paths.backTempGusset = paths.back.offset(-1 * gussetWidth).hide()

    paths.waist = new Path()
      .move(points.frontWaist)
      .line(points.centerWaist)
      .line(points.backWaist)
      .hide()
    paths.ankle = new Path()
      .move(points.backAnkle)
      .line(points.centerAnkle)
      .line(points.frontAnkle)
      .hide()

    const backHips = paths.back.shiftAlong((measurements.waistToHips - waistReduction) * 0.99)
    const backHipsAngle = points.backHips.angle(backHips) - 90

    points.backUpperLegToHips = new Point(points.backHips.x, points.backUpperLeg.y)
    points.backCircleMiddle = points.backHips.shiftFractionTowards(points.backUpperLegToHips, 0.5)

    points.backCircleHipsCp1 = points.backHips.shift(
      backHipsAngle,
      measurements.hips * 0.25 * 0.5 * ease
    )

    points.backCircleUpperLegCp1 = points.backUpperLegToHips.shift(
      0,
      measurements.upperLeg * 0.25 * ease
    )

    paths.backTempCircle = new Path()
      .move(points.backHips)
      .curve(points.backCircleHipsCp1, points.backCircleUpperLegCp1, points.backUpperLeg)
      .hide()
    console.log({ csb: measurements.crossSeamBack, pl: paths.back.length() + waistReduction })

    points.backCircleGusset = paths.backTempCircle.intersects(paths.backTempGusset)[1]
    paths.backGusset = paths.backTempGusset.split(points.backCircleGusset)[1].hide()
    paths.backCircle = paths.backTempCircle.split(points.backCircleGusset)[0].hide()

    store.set('backGussetLength', paths.backGusset.length())
    store.set('backCircleLength', paths.backCircle.length())

    console.log({ points: JSON.parse(JSON.stringify(points)) })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })
    console.log({ measurements: JSON.parse(JSON.stringify(measurements)) })

    return part
  },
}
