export const leg = {
  name: 'lumira.leg',
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

    // Percentages
    size: {
      pct: 100,
      min: 5,
      max: 500,
      menu: 'style',
      toAbs: (val, { options }) => (options?.length ? options.length * val : length * val),
      fromAbs: (val, { options }) =>
        options?.length
          ? Math.round((10000 * val) / options.length) / 10000
          : Math.round((10000 * val) / length) / 10000,
    },
    nosePointiness: { pct: 0, min: -5, max: +10, menu: 'style' },
    aggressive: { bool: false, menu: 'style' },
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
    const ControlPoints = (p1, p2, p3, t) => {
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
        if (cp.cp1) points[names[i] + 'Cp2'] = cp.cp1.addCircle(3)
        if (cp.cp3) points[names[i] + 'Cp1'] = cp.cp3.addCircle(3)
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

    points.centerWaist = new Point(0, 0)
    points.centerFloor = new Point(0, measurements.waistToFloor)
    points.centerAnkle = new Point(0, measurements.waistToFloor - measurements.heel / Math.PI)
    points.centerKnee = new Point(0, measurements.waistToKnee)
    points.centerUpperLeg = new Point(0, measurements.waistToUpperLeg)
    points.centerInseam = new Point(0, waistToInseam)
    points.centerHips = new Point(0, measurements.waistToHips)
    points.centerSeat = new Point(0, measurements.waistToSeat)

    points.frontAnkle = points.centerAnkle.shift(0, measurements.ankle / 2)
    points.backAnkle = points.centerAnkle.shift(180, measurements.ankle / 2)
    points.frontKnee = points.centerKnee.shift(0, measurements.knee / 2)
    points.backKnee = points.centerKnee.shift(180, measurements.knee / 2)
    points.frontUpperLeg = points.centerUpperLeg.shift(0, measurements.upperLeg / 2)
    points.backUpperLeg = points.centerUpperLeg.shift(180, measurements.upperLeg / 2)

    // points.frontUpperLegIn = points.frontUpperLeg.shift(180,options.(weird*(measurements.upperLeg/2))/waistBackFrontRatio)
    // points.backUpperLegIn = points.frontUpperLeg.shift(180,options.(weird*(measurements.upperLeg/2))*waistBackFrontRatio)
    // points.frontWaist = points.frontUpperLegIn

    const backWaistAngle = utils.rad2deg(
      Math.asin(
        ((measurements.waistToUpperLeg * seatBackFrontRatio * (crossSeamBackFrontRatio - 1)) /
          measurements.waistBack) *
          0.5
      )
    )
    const frontWaistAngle = utils.rad2deg(
      Math.asin(
        ((measurements.waistToUpperLeg * seatBackFrontRatio * (crossSeamBackFrontRatio - 1)) /
          measurements.waistFront) *
          0.5
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

    points.backWaist = points.centerWaist.shift(180 - backWaistAngle, measurements.waistBack * 0.5)
    points.frontWaist = points.centerWaist.shift(
      360 - frontWaistAngle,
      measurements.waistFront * 0.5
    )
    points.backHips = points.centerHips
      .shift(180 - backWaistAngle, measurements.hips * 0.25)
      .addCircle(3)
    points.frontHips = points.centerHips
      .shift(360 - frontWaistAngle, measurements.hips * 0.25)
      .addCircle(3)
    points.backSeat = points.centerSeat
      .shift(180 - backWaistAngle, measurements.seatBack * 0.5)
      .addCircle(5)
    points.frontSeat = points.centerSeat
      .shift(360 - frontWaistAngle, measurements.seatFront * 0.5)
      .addCircle(5)

    AdjustUpperLegPoints('front')
    AdjustUpperLegPoints('back')

    paths.front = new Path()
      .move(points.frontAnkle)
      .line(points.frontKnee)
      .line(points.frontUpperLeg)
    paths.back = new Path().move(points.backAnkle).line(points.backKnee).line(points.backUpperLeg)

    paths.frontCrotch1 = new Path()
      .move(points.frontWaist)
      .curve(points.frontWaist, points.frontSeatCp2, points.frontSeat)
      .curve(points.frontSeatCp1, points.frontUpperLegCp2, points.frontUpperLeg)
    paths.backCrotch1 = new Path()
      .move(points.backWaist)
      .curve(points.backWaist, points.backSeatCp2, points.backSeat)
      .curve(points.backSeatCp1, points.backUpperLegCp2, points.backUpperLeg)
    // paths.frontCrotch1 = new Path()
    //   .move(points.frontWaist)
    //   .curve(points.frontWaistCp1,points.frontSeatCp2,points.frontSeat)
    //   .curve(points.frontSeatCp1,points.frontUpperLegCp2,points.frontUpperLeg)
    // paths.backCrotch1 = new Path()
    //   .move(points.backWaist)
    //   .curve(points.backWaistCp1,points.backSeatCp2,points.backSeat)
    //   .curve(points.backSeatCp1,points.backUpperLegCp2,points.backUpperLeg)

    paths.waist = new Path().move(points.backWaist).line(points.centerWaist).line(points.frontWaist)

    paths.frontCrotch = new Path()
      .move(points.frontUpperLeg)
      .curve_(
        points.frontUpperLeg.shiftFractionTowards(points.centerUpperLeg, 0.4),
        points.frontWaist
      )

    console.log({ csf: measurements.crossSeamFront, pl: paths.frontCrotch.length() })

    paths.backCrotch = new Path()
      .move(points.backUpperLeg)
      .curve_(
        points.backUpperLeg.shiftFractionTowards(points.centerUpperLeg, 0.4),
        points.backWaist
      )

    console.log({ csb: measurements.crossSeamBack, pl: paths.backCrotch.length() })

    console.log({ points: JSON.parse(JSON.stringify(points)) })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })
    console.log({ measurements: JSON.parse(JSON.stringify(measurements)) })

    return part
  },
}
