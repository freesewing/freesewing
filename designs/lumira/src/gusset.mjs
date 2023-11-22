import { shape } from './shape.mjs'

export const gusset = {
  name: 'lumira.gusset',
  from: shape,
  options: {
    backInsertTopCp: 0.3,
    backInsertTopCpAngle: 0,
    backInsertGussetCp: 0.2,
    backInsertGussetCpAngle: 35,
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
    const waistReduction = store.get('waistReduction')
    const gussetWidth = store.get('gussetWidth')
    const backCircleLength = store.get('backCircleLength')
    const backGussetLength = store.get('backGussetLength')
    const ease = 1 + options.ease

    console.log({
      waistReduction: waistReduction,
      gussetWidth: gussetWidth,
      backCircleLength: backCircleLength,
      backGussetLength: backGussetLength,
    })

    console.log({ Bpoints: JSON.parse(JSON.stringify(points)) })

    points.backInsertCenterTop = new Point(0, 0)
    points.backInsertOutsideGusset = points.backInsertCenterTop
      .shift(
        270,
        measurements.crossSeamBack - measurements.waistToHips - waistReduction - backGussetLength
      )
      .shift(0, gussetWidth)

    points.backInsertCenterSeat = points.backInsertCenterTop.shift(
      270,
      measurements.waistToSeat - waistReduction
    )
    // .addCircle(2)

    points.backInsertCenterTopCp1 = points.backInsertCenterTop.shift(
      options.backInsertTopCpAngle,
      measurements.hips * 0.25 * ease * options.backInsertTopCp
    )

    points.backInsertOutsideGussetCp1 = points.backInsertOutsideGusset.shift(
      options.backInsertGussetCpAngle,
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
        options.backInsertGussetCpAngle,
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
      console.log({ i: iter, d: diff })
    } while (iter++ < 50 && (diff > 1 || diff < -1))

    points.backInsertOutsideBottom = points.backInsertOutsideGusset.shift(270, backGussetLength)
    points.backInsertCenterBottom = points.backInsertOutsideBottom.shift(180, gussetWidth)

    // points.backInsertCenterTopCp1.addCircle(6)
    // points.backInsertOutsideGussetCp1.addCircle(8)

    console.log({ bil: paths.backInsertCircle.length(), bcl: paths.backCircle.length() })

    if (options.frontBulge) {
      const frontLength = store.get('frontLength')
      const frontBulgeSize = options.frontBulgeSize * measurements.crossSeamFront

      points.frontCenter = points.backInsertCenterBottom.shift(
        270,
        measurements.crossSeamFront - waistReduction
      )
      points.frontOutside = points.frontCenter.shift(0, gussetWidth)
      points.frontOutsideHips = points.frontOutside.shift(
        90,
        measurements.waistToHips - waistReduction
      )

      const gussetCpLength = points.backInsertOutsideGusset.dist(points.backInsertOutsideBottom)

      points.backInsertOutsideBottomCp = points.backInsertOutsideBottom.shift(270, gussetCpLength)
      points.frontOutsideHipsCp = points.frontOutsideHips.shift(90, gussetCpLength)
      points.frontOutsideMiddle = points.frontOutsideHips.shift(
        90,
        points.frontOutsideHips.dist(points.backInsertOutsideBottom) / 2
      )

      var diff = 0
      var iter = 0
      do {
        points.frontOutsideMiddle = points.frontOutsideMiddle.shift(0, diff) //.addCircle(8)
        points.frontOutsideMiddleCp1 = points.frontOutsideMiddle.shift(90, gussetCpLength)
        // .addCircle(10)
        points.frontOutsideMiddleCp2 = points.frontOutsideMiddle.shift(270, gussetCpLength)
        // .addCircle(15)

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

        console.log({ i: iter, d: diff, fl: frontLength, fgpl: frontGussetPath.length() })
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

    console.log({ Bpaths: JSON.parse(JSON.stringify(paths)) })
    console.log({ length: points.backInsertCenterTop.dist(points.backInsertCenterBottom) })

    return part
  },
}
