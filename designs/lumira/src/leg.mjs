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

    paths.front = new Path()
      .move(points.frontAnkle)
      .line(points.frontKnee)
      .line(points.frontUpperLeg)
    paths.back = new Path().move(points.backAnkle).line(points.backKnee).line(points.backUpperLeg)

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
