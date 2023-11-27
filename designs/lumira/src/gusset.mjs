import { cbqc } from '@freesewing/core'
import { pctBasedOn } from '@freesewing/core'
import { shape } from './shape.mjs'

export const gusset = {
  name: 'lumira.gusset',
  from: shape,
  options: {
    backInsertTopCp: 0.3,
    backInsertTopCpAngle: 0,
    backInsertGussetCp: 0.2,
    frontBulgeLift: 1.75,
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
      (options.cyclingChamois ? 0.0125 : options.frontBulgeSize) * measurements.crossSeamFront
    const backInsertGussetCpAngle = options.cyclingChamois ? 0 : 90 * options.buttLift

    const RotatePoints = ({ center, angle, pointsArray }) => {
      pointsArray.forEach((pointName) => {
        points[pointName] = points[pointName].rotate(angle, center)
      })
    }

    points.backInsertCenterTop = new Point(0, 0)
    points.backInsertOutsideGusset = points.backInsertCenterTop
      .shift(
        270,
        measurements.crossSeamBack - measurements.waistToHips - waistLowering - backGussetLength
      )
      .shift(0, gussetWidth)
    points.backInsertCenterGusset = new Point(0, points.backInsertOutsideGusset.y).addCircle(10)

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

      console.log({ frontBulgeSize: frontBulgeSize })
      console.log({ frontLength: frontLength })
      const rotateAngle = utils.rad2deg(Math.acos(frontLength / (frontLength + frontBulgeSize)))
      const frontCircleCircumference = frontLength * (180 / rotateAngle)
      const frontCircleRadius = frontCircleCircumference / Math.PI
      const frontOutsideCircumference = (frontCircleRadius + gussetWidth) * Math.PI
      const frontOutsideSector = frontOutsideCircumference / (180 / rotateAngle)
      console.log({
        rotateAngle: rotateAngle,
        frontCircleCircumference: frontCircleCircumference,
        frontCircleRadius: frontCircleRadius,
        frontOutsideCircumference: frontOutsideCircumference,
        frontOutsideSector: frontOutsideSector,
        frontLength: frontLength,
        frontBulgeSize: frontBulgeSize,
        frontBulge: frontLength + frontBulgeSize,
      })

      points.frontOutside = points.backInsertOutsideBottom.shift(270 + rotateAngle, frontLength)

      const thisCbqc = cbqc * (rotateAngle / 45)
      points.backInsertOutsideBottomCp1 = points.backInsertOutsideBottom
        .shift(270, thisCbqc * frontLength)
        .addCircle(4)
        .addCircle(6)

      var diff = 0
      var iter = 0
      do {
        points.frontOutside = points.frontOutside
          .shiftTowards(points.backInsertOutsideBottom, diff)
          .addCircle(10)
        points.frontOutsideCp = points.frontOutside
          .shift(90 + rotateAngle * 2, thisCbqc * frontLength)
          .addCircle(8)
        paths.frontOutside = new Path()
          .move(points.frontOutside)
          // .line(points.frontOutside)
          .curve(
            points.frontOutsideCp,
            points.backInsertOutsideBottomCp1,
            points.backInsertOutsideBottom
          )

        diff = paths.frontOutside.length() - frontLength
        console.log({ i: iter, d: diff })
      } while (iter++ < 100 && (diff > 1 || diff < -1))

      points.frontOutsideHips = paths.frontOutside.shiftAlong(
        measurements.waistToHips - waistLowering - waistbandSize
      )
      const frontCenterAngle = points.frontOutside.angle(points.frontOutsideHips) - 90
      console.log({ frontCenterAngle: frontCenterAngle })
      points.frontCenter = points.frontOutside
        .shift(180 + frontCenterAngle, gussetWidth)
        .addCircle(5)
        .addCircle(10)
      points.frontCenterHips = points.frontOutsideHips
        .shift(180 + frontCenterAngle, gussetWidth)
        .addCircle(5)
        .addCircle(10)

      points.backInsertCenterBottom.addCircle(4)

      const gussetCpLength = points.backInsertCenterGusset.dist(points.backInsertCenterBottom)

      points.backInsertCenterBottomCp = points.backInsertCenterBottom.shift(
        270,
        gussetCpLength * 1
        // gussetCpLength * options.frontBulgeLift
      )

      points.frontCenterHipsCp9 = paths.frontOutside.shiftAlong(gussetCpLength).addCircle(20)
      points.frontCenterHipsCp = paths.frontOutside
        .shiftAlong(gussetCpLength)
        .shift(180 + frontCenterAngle, gussetWidth)
      // points.frontCenterHipsCp = points.frontCenterHips.shift(
      //   frontCenterAngle,
      //   gussetCpLength * (1 / options.frontBulgeLift)
      // )
      points.frontCenterMiddle = points.frontCenterHipsCp
        .shift(
          90 + frontCenterAngle,
          points.frontCenterHipsCp.dist(points.backInsertCenterBottomCp) / 2
        )
        .addCircle(6)

      var diff = 0
      var iter = 0
      do {
        points.frontCenterMiddle = points.frontCenterMiddle.shift(
          180 + frontCenterAngle * 0.5,
          diff
        )
        points.frontCenterMiddleCp1 = points.frontCenterMiddle
          .shift(90 + frontCenterAngle * 0.6, gussetCpLength * 0.8)
          .addCircle(3)
        // points.frontCenterMiddleCp1.x = 0
        points.frontCenterMiddleCp2 = points.frontCenterMiddle
          .shift(270 + frontCenterAngle * 0.6, gussetCpLength * 0.9)
          .addCircle(3)
          .addCircle(6)
          .addCircle(9)

        const frontGussetPath = new Path()
          .move(points.frontCenter)
          .line(points.frontCenterHips)
          .curve(points.frontCenterHipsCp, points.frontCenterMiddleCp2, points.frontCenterMiddle)
          .curve(
            points.frontCenterMiddleCp1,
            points.backInsertCenterBottomCp,
            points.backInsertCenterBottom
          )

        paths.frontCenterGussetPath = frontGussetPath.clone().addClass('note')

        console.log({ frontGussetPath: frontGussetPath })
        diff = frontLength + frontBulgeSize - frontGussetPath.length()

        console.log({
          i: iter,
          d: diff,
          fl: frontLength + frontBulgeSize,
          pl: frontGussetPath.length(),
        })
      } while (iter++ < 1 && (diff > 1 || diff < -1))
      const frontGussetAngle = points.frontCenterMiddle.angle(points.backInsertCenterBottom)
      console.log({ frontGussetAngle: frontGussetAngle })

      paths.frontBulge = new Path()
        .move(points.backInsertCenterBottom)
        .curve(
          points.backInsertCenterBottomCp,
          points.frontCenterMiddleCp1,
          points.frontCenterMiddle
        )
        .curve(points.frontCenterMiddleCp2, points.frontCenterHipsCp, points.frontCenterHips)
        .hide()
      // snippets.front = new Snippet('notch', paths.frontBulge.shiftFractionAlong(0.5))

      paths.front = new Path()
        .move(points.backInsertCenterBottom)
        .join(paths.frontBulge)
        .line(points.frontCenter)
        .join(paths.frontOutside)
        .hide()

      paths.backGusset = new Path()
        .move(points.backInsertOutsideGusset)
        .curve(
          points.backInsertOutsideGussetCp1,
          points.backInsertCenterTopCp1,
          points.backInsertCenterTop
        )

      macro('mirror', {
        clone: true,
        mirror: [new Point(0, 1000), new Point(0, -1000)],
        points: [
          'backInsertCenterTop',
          'backInsertCenterBottom',
          'backInsertCenterTop',
          'backInsertOutsideGusset',
          'frontOutside',
          'backInsertOutsideBottom',
        ],
        paths: ['front', 'frontBulge', 'backGusset', 'backInsertCircle', 'frontOutside'],
        prefix: 'mirror',
      })

      console.log({ Gpoints: JSON.parse(JSON.stringify(points)) })
      console.log({ Gpaths: JSON.parse(JSON.stringify(paths)) })

      paths.seam = new Path()
        .move(points.backInsertCenterBottom)
        .join(paths.front)
        .line(points.backInsertOutsideGusset)
        .join(paths.backGusset)
        .join(paths.mirrorBackGusset.reverse())
        .line(points.mirrorBackInsertOutsideBottom)
        .join(paths.mirrorFront.reverse())
        .close()
    } else {
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

      paths.backGusset = new Path()
        .move(points.backInsertOutsideGusset)
        .curve(
          points.backInsertOutsideGussetCp1,
          points.backInsertCenterTopCp1,
          points.backInsertCenterTop
        )

      paths.seam = new Path()
        .move(points.backInsertCenterTop)
        .line(points.backInsertCenterBottom)
        .join(paths.front)
        .line(points.backInsertOutsideGusset)
        .join(paths.backGusset)
        .close()
    }

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    snippets.circle5 = new Snippet('notch', points.backInsertOutsideBottom)
    snippets.circle4 = new Snippet('notch', points.backInsertOutsideGusset)
    snippets.circle3 = new Snippet('notch', paths.backGusset.shiftFractionAlong(0.25))
    snippets.circle2 = new Snippet('notch', paths.backGusset.shiftFractionAlong(0.5))
    snippets.circle1 = new Snippet('notch', paths.backGusset.shiftFractionAlong(0.75))

    console.log({ Gstore: JSON.parse(JSON.stringify(store)) })
    console.log({ Gmeasurements: JSON.parse(JSON.stringify(measurements)) })

    return part
  },
}
// if (frontBulge) {
//   const frontLength = store.get('frontLength')

//   points.frontCenter = points.backInsertCenterBottom.shift(
//     270,
//     measurements.crossSeamFront - waistLowering - waistbandSize
//   )
//   points.frontOutside = points.frontCenter.shift(0, gussetWidth)
//   points.frontOutsideHips = points.frontOutside.shift(
//     90,
//     measurements.waistToHips - waistLowering - waistbandSize
//   )

//   const gussetCpLength = points.backInsertOutsideGusset.dist(points.backInsertOutsideBottom)

//   points.backInsertOutsideBottomCp = points.backInsertOutsideBottom.shift(
//     270,
//     gussetCpLength * options.frontBulgeLift
//   )
//   points.frontOutsideHipsCp = points.frontOutsideHips.shift(
//     90,
//     gussetCpLength * (1 / options.frontBulgeLift)
//   )
//   points.frontOutsideMiddle = points.frontOutsideHipsCp.shift(
//     90,
//     points.frontOutsideHipsCp.dist(points.backInsertOutsideBottomCp) / 2
//   )

//   var diff = 0
//   var iter = 0
//   do {
//     points.frontOutsideMiddle = points.frontOutsideMiddle.shift(0, diff)
//     points.frontOutsideMiddleCp1 = points.frontOutsideMiddle.shift(90, gussetCpLength)
//     points.frontOutsideMiddleCp2 = points.frontOutsideMiddle.shift(270, gussetCpLength)

//     const frontGussetPath = new Path()
//       .move(points.frontOutside)
//       .line(points.frontOutsideHips)
//       .curve(points.frontOutsideHipsCp, points.frontOutsideMiddleCp2, points.frontOutsideMiddle)
//       .curve(
//         points.frontOutsideMiddleCp1,
//         points.backInsertOutsideBottomCp,
//         points.backInsertOutsideBottom
//       )

//     diff = frontLength + frontBulgeSize - frontGussetPath.length()
//   } while (iter++ < 3 && (diff > 1 || diff < -1))

//   paths.frontBulge = new Path()
//     .move(points.frontOutsideHips)
//     .curve(points.frontOutsideHipsCp, points.frontOutsideMiddleCp2, points.frontOutsideMiddle)
//     .curve(
//       points.frontOutsideMiddleCp1,
//       points.backInsertOutsideBottomCp,
//       points.backInsertOutsideBottom
//     )
//     .hide()
//   snippets.front = new Snippet('notch', paths.frontBulge.shiftFractionAlong(0.5))

//   paths.front = new Path()
//     .move(points.backInsertCenterBottom)
//     .line(points.frontCenter)
//     .line(points.frontOutside)
//     .line(points.frontOutsideHips)
//     .join(paths.frontBulge)
//     .hide()
// } else {
//   const frontGussetAngle = store.get('frontGussetAngle')
//   const frontGussetLength = store.get('frontGussetLength')
//   points.frontCenter = points.backInsertCenterBottom.shift(270, frontGussetLength)
//   points.frontCenterCp = points.frontCenter.shift(
//     90 - frontGussetAngle / 2,
//     frontGussetLength / 3
//   )
//   points.backInsertOutsideBottomCp = points.backInsertOutsideBottom.shift(
//     270,
//     frontGussetLength / 3
//   )

//   paths.front = new Path()
//     .move(points.backInsertCenterBottom)
//     .line(points.frontCenter)
//     .curve(
//       points.frontCenterCp,
//       points.backInsertOutsideBottomCp,
//       points.backInsertOutsideBottom
//     )
//     .hide()
// }
