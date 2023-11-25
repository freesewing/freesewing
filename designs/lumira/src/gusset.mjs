import { pctBasedOn } from '@freesewing/core'
import { shape } from './shape.mjs'

export const gusset = {
  name: 'lumira.gusset',
  from: shape,
  options: {
    backInsertTopCp: 0.3,
    backInsertTopCpAngle: 0,
    backInsertGussetCp: 0.2,
    frontBulgeLift: 1.25,
    buttLift: {
      pct: 30,
      min: 0,
      max: 60,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.cyclingChamois ? false : 'fit'),
    },
    frontBulgeSize: {
      pct: 2.5,
      min: 0,
      max: 10,
      ...pctBasedOn('crossSeamFront'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) =>
        mergedOptions?.frontBulge == true && mergedOptions?.cyclingChamois == false
          ? 'style'
          : false,
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
    const waistLowering = store.get('waistLowering')
    const waistbandSize = store.get('waistbandSize')
    const gussetWidth = store.get('gussetWidth')
    const backCircleLength = store.get('backCircleLength')
    const backGussetLength = store.get('backGussetLength')
    const ease = 1 + options.ease
    const frontBulge = options.cyclingChamois ? true : options.frontBulge
    const frontBulgeSize =
      (options.cyclingChamois ? 0.025 : options.frontBulgeSize) * measurements.crossSeamFront
    const backInsertGussetCpAngle = options.cyclingChamois ? 0 : 90 * options.buttLift

    points.backInsertCenterTop = new Point(0, 0)
    points.backInsertOutsideGusset = points.backInsertCenterTop
      .shift(
        270,
        measurements.crossSeamBack - measurements.waistToHips - waistLowering - backGussetLength
      )
      .shift(0, gussetWidth)

    points.backInsertCenterSeat = points.backInsertCenterTop.shift(
      270,
      measurements.waistToSeat - waistLowering
    )
    points.backInsertCenterTopCp1 = points.backInsertCenterTop.shift(
      options.backInsertTopCpAngle,
      measurements.hips * 0.25 * ease * options.backInsertTopCp
    )

    points.backInsertOutsideGussetCp1 = points.backInsertOutsideGusset.shift(
      backInsertGussetCpAngle,
      measurements.upperLeg * 0.25 * ease * options.backInsertGussetCp
    )

    var diff = 0
    var iter = 0
    do {
      points.backInsertCenterTopCp1 = points.backInsertCenterTopCp1.shift(
        options.backInsertTopCpAngle,
        diff * (options.backInsertTopCp / options.backInsertGussetCp)
      )
      points.backInsertOutsideGussetCp1 = points.backInsertOutsideGussetCp1.shift(
        backInsertGussetCpAngle,
        diff * (options.backInsertGussetCp / options.backInsertTopCp)
      )

      paths.backInsertCircle = new Path()
        .move(points.backInsertCenterTop)
        .curve(
          points.backInsertCenterTopCp1,
          points.backInsertOutsideGussetCp1,
          points.backInsertOutsideGusset
        )
        .hide()
      diff = backCircleLength - paths.backInsertCircle.length()
      console.log({ i: iter, d: diff, bcl: backCircleLength, pl: paths.backInsertCircle.length() })
    } while (iter++ < 50 && (diff > 1 || diff < -1))

    points.backInsertOutsideBottom = points.backInsertOutsideGusset.shift(270, backGussetLength)
    points.backInsertCenterBottom = points.backInsertOutsideBottom.shift(180, gussetWidth)

    if (frontBulge) {
      const frontLength = store.get('frontLength')

      points.frontCenter = points.backInsertCenterBottom.shift(
        270,
        measurements.crossSeamFront - waistLowering - waistbandSize
      )
      points.frontOutside = points.frontCenter.shift(0, gussetWidth)
      points.frontOutsideHips = points.frontOutside.shift(
        90,
        measurements.waistToHips - waistLowering - waistbandSize
      )

      const gussetCpLength = points.backInsertOutsideGusset.dist(points.backInsertOutsideBottom)

      points.backInsertOutsideBottomCp = points.backInsertOutsideBottom.shift(
        270,
        gussetCpLength * options.frontBulgeLift
      )
      points.frontOutsideHipsCp = points.frontOutsideHips.shift(
        90,
        gussetCpLength * (1 / options.frontBulgeLift)
      )
      points.frontOutsideMiddle = points.frontOutsideHipsCp.shift(
        90,
        points.frontOutsideHipsCp.dist(points.backInsertOutsideBottomCp) / 2
      )

      var diff = 0
      var iter = 0
      do {
        points.frontOutsideMiddle = points.frontOutsideMiddle.shift(0, diff)
        points.frontOutsideMiddleCp1 = points.frontOutsideMiddle.shift(90, gussetCpLength)
        points.frontOutsideMiddleCp2 = points.frontOutsideMiddle.shift(270, gussetCpLength)

        const frontGussetPath = new Path()
          .move(points.frontOutside)
          .line(points.frontOutsideHips)
          .curve(points.frontOutsideHipsCp, points.frontOutsideMiddleCp2, points.frontOutsideMiddle)
          .curve(
            points.frontOutsideMiddleCp1,
            points.backInsertOutsideBottomCp,
            points.backInsertOutsideBottom
          )

        diff = frontLength + frontBulgeSize - frontGussetPath.length()
      } while (iter++ < 3 && (diff > 1 || diff < -1))

      paths.front = new Path()
        .move(points.backInsertCenterBottom)
        .line(points.frontCenter)
        .line(points.frontOutside)
        .line(points.frontOutsideHips)
        .curve(points.frontOutsideHipsCp, points.frontOutsideMiddleCp2, points.frontOutsideMiddle)
        .curve(
          points.frontOutsideMiddleCp1,
          points.backInsertOutsideBottomCp,
          points.backInsertOutsideBottom
        )
        .hide()
    } else {
      console.log({ store: JSON.parse(JSON.stringify(store)) })
      const frontGussetAngle = store.get('frontGussetAngle')
      const frontGussetLength = store.get('frontGussetLength')
      points.frontCenter = points.backInsertCenterBottom.shift(270, frontGussetLength)
      points.frontCenterCp = points.frontCenter.shift(
        90 - frontGussetAngle / 2,
        frontGussetLength / 3
      )
      points.backInsertOutsideBottomCp = points.backInsertOutsideBottom.shift(
        270,
        frontGussetLength / 3
      )

      paths.front = new Path()
        .move(points.backInsertCenterBottom)
        .line(points.frontCenter)
        .curve(
          points.frontCenterCp,
          points.backInsertOutsideBottomCp,
          points.backInsertOutsideBottom
        )
        .hide()
    }

    paths.seam = new Path()
      .move(points.backInsertCenterTop)
      .line(points.backInsertCenterBottom)
      .join(paths.front)
      .line(points.backInsertOutsideGusset)
      .curve(
        points.backInsertOutsideGussetCp1,
        points.backInsertCenterTopCp1,
        points.backInsertCenterTop
      )
      .close()

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    return part
  },
}
