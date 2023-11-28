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
    frontBulgeForwardPercentage: 0.125,
    frontBulgeMiddleShift: 0.65,
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
    options,
    macro,
    utils,
    log,
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

    points.backInsertCenterTop = new Point(0, 0)
    points.backInsertOutsideGusset = points.backInsertCenterTop
      .shift(
        270,
        measurements.crossSeamBack - measurements.waistToHips - waistLowering - backGussetLength
      )
      .shift(0, gussetWidth)
    points.backInsertCenterGusset = new Point(0, points.backInsertOutsideGusset.y)

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
      const bulgeSplitForward = measurements.crossSeamFront * options.frontBulgeForwardPercentage
      const frontLength = store.get('frontLength') - bulgeSplitForward
      const rotateAngle = utils.rad2deg(Math.acos(frontLength / (frontLength + frontBulgeSize))) / 2

      points.frontOutsideSplit = points.backInsertOutsideBottom.shift(270, bulgeSplitForward)
      points.frontCenterSplit = points.frontOutsideSplit.shift(180, gussetWidth)
      points.frontOutside = points.frontOutsideSplit.shift(270 + rotateAngle, frontLength)

      const thisCbqc = cbqc * 0.75 //(rotateAngle / 22.5)
      points.frontOutsideSplitCp1 = points.frontOutsideSplit.shift(270, thisCbqc * frontLength)

      var diff = 0
      var iter = 0
      do {
        points.frontOutside = points.frontOutside.shiftTowards(points.frontOutsideSplit, diff)
        points.frontOutsideCp = points.frontOutside.shift(
          90 + rotateAngle * 2,
          thisCbqc * frontLength
        )
        paths.frontOutside = new Path()
          .move(points.frontOutside)
          .curve(points.frontOutsideCp, points.frontOutsideSplitCp1, points.frontOutsideSplit)
          .hide()

        diff = paths.frontOutside.length() - frontLength
      } while (iter++ < 100 && (diff > 1 || diff < -1))
      if (iter >= 100) {
        log.info('couldNotFitFrontOutside')
      }

      points.frontOutsideHips = paths.frontOutside.shiftAlong(
        measurements.waistToHips - waistLowering - waistbandSize
      )
      const frontCenterAngle = points.frontOutside.angle(points.frontOutsideHips) - 90
      console.log({ frontCenterAngle: frontCenterAngle })
      points.frontCenterOutside = points.frontOutside.shift(180 + frontCenterAngle, gussetWidth)
      // .addCircle(5)
      // .addCircle(10)
      points.frontCenterHips = points.frontOutsideHips.shift(180 + frontCenterAngle, gussetWidth)
      // .addCircle(5)
      // .addCircle(10)

      points.backInsertCenterBottom
      //.addCircle(4)

      const gussetCpLength = points.backInsertCenterGusset.dist(points.backInsertCenterBottom)

      points.backInsertCenterBottomCp = points.backInsertCenterBottom.shift(
        270,
        gussetCpLength * 1
        // gussetCpLength * options.frontBulgeLift
      )
      points.frontCenterSplitCp = points.frontCenterSplit.shift(
        270,
        gussetCpLength * 1
        // gussetCpLength * options.frontBulgeLift
      ) //.addCircle(10)

      // points.frontCenterHipsCp9 = paths.frontOutside.shiftAlong(gussetCpLength).addCircle(20)
      points.frontCenterHipsCp = paths.frontOutside
        .shiftAlong(gussetCpLength)
        .shift(180 + frontCenterAngle, gussetWidth)

      points.frontCenterMiddle = points.frontCenterHipsCp.shift(
        90 + frontCenterAngle,
        points.frontCenterHipsCp.dist(points.frontCenterSplitCp) * options.frontBulgeMiddleShift
      )
      points.frontCenterMiddle = points.frontCenterHipsCp.shiftFractionTowards(
        points.frontCenterSplitCp,
        options.frontBulgeMiddleShift
      )

      // .addCircle(3)
      // .addCircle(6)
      // .addCircle(9)

      var diff = 0
      var iter = 0
      do {
        points['frontCenterMiddle' + iter] = points.frontCenterMiddle.clone()

        points.frontCenterMiddle = points.frontCenterMiddle.shift(frontCenterAngle * 0.5, diff)
        // .addCircle(3)
        // .addCircle(6)
        // .addCircle(9)
        points.frontCenterMiddleCp1 = points.frontCenterMiddle.shift(
          90 + frontCenterAngle * 0.6,
          gussetCpLength * (1 - options.frontBulgeMiddleShift)
        )
        // .addCircle(3)
        // points.frontCenterMiddleCp1.x = 0
        points.frontCenterMiddleCp2 = points.frontCenterMiddle.shift(
          270 + frontCenterAngle * 0.6,
          gussetCpLength * 0.9
        )
        // .addCircle(3)
        // .addCircle(6)
        // .addCircle(9)

        const frontGussetPath = new Path()
          .move(points.frontCenterOutside)
          .line(points.frontCenterHips)
          .curve(points.frontCenterHipsCp, points.frontCenterMiddleCp2, points.frontCenterMiddle)
          .curve(points.frontCenterMiddleCp1, points.frontCenterSplitCp, points.frontCenterSplit)

        paths['frontCenterGussetPath' + iter] = frontGussetPath.clone().addClass('note')
        console.log({ frontGussetPath: frontGussetPath })
        diff = frontGussetPath.length() - (frontLength + frontBulgeSize)

        console.log({
          i: iter,
          d: diff,
          fl: frontLength + frontBulgeSize,
          pl: frontGussetPath.length(),
        })
      } while (iter++ < 20 && (diff > 1 || diff < -1))
      if (iter >= 20) {
        log.info('couldNotFitFrontGussetPath')
      }

      const frontGussetAngle = points.frontCenterMiddle.angle(points.backInsertCenterBottom)
      console.log({ frontGussetAngle: frontGussetAngle })

      paths.frontBulge = new Path()
        .move(points.frontCenterSplit)
        .curve(points.frontCenterSplitCp, points.frontCenterMiddleCp1, points.frontCenterMiddle)
        .curve(points.frontCenterMiddleCp2, points.frontCenterHipsCp, points.frontCenterHips)
        .hide()
      // snippets.front = new Snippet('notch', paths.frontBulge.shiftFractionAlong(0.5))

      paths.front = new Path()
        .move(points.frontCenterSplit)
        .join(paths.frontBulge)
        .line(points.frontCenterOutside)
        .join(paths.frontOutside)
        .line(points.backInsertOutsideBottom)
        .hide()

      points.frontCenter = points.frontCenterSplit.clone()
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
        // .move(points.backInsertCenterBottom)
        // .line(points.frontCenter)
        .move(points.frontCenter)
        .curve(
          points.frontCenterCp,
          points.backInsertOutsideBottomCp,
          points.backInsertOutsideBottom
        )
        .hide()
    }

    paths.backGusset = new Path()
      .move(points.backInsertOutsideGusset)
      .curve(
        points.backInsertOutsideGussetCp1,
        points.backInsertCenterTopCp1,
        points.backInsertCenterTop
      )
      .hide()

    paths.seamSA = new Path()
      .move(points.frontCenter)
      .join(paths.front)
      .line(points.backInsertOutsideGusset)
      .join(paths.backGusset)
      .hide()

    paths.seam = new Path()
      .move(points.backInsertCenterTop)
      .line(points.frontCenter)
      .join(paths.seamSA)
      .close()

    if (sa) {
      if (frontBulge) {
        const pathSA = paths.seamSA.offset(sa)
        paths.saOffset = pathSA.split(pathSA.intersectsX(0)[0])[1].hide()
      } else {
        paths.saOffset = paths.seamSA.offset(sa).hide()
      }
      paths.sa = new Path()
        .move(points.frontCenter)
        .line(points.frontCenter.shift(270, sa))
        .move(paths.saOffset.start())
        .join(paths.saOffset)
        .line(points.backInsertCenterTop.shift(90, sa))
        .line(points.backInsertCenterTop)
        .attr('class', 'fabric sa')
    }

    snippets.middle = new Snippet('notch', points.backInsertOutsideBottom)
    snippets.circle4 = new Snippet('notch', points.backInsertOutsideGusset)
    snippets.circle3 = new Snippet('notch', paths.backGusset.shiftFractionAlong(0.25))
    snippets.circle2 = new Snippet('notch', paths.backGusset.shiftFractionAlong(0.5))
    snippets.circle1 = new Snippet('notch', paths.backGusset.shiftFractionAlong(0.75))
    snippets.circle0 = new Snippet('notch', points.backInsertCenterTop)

    console.log({ Gpoints: JSON.parse(JSON.stringify(points)) })
    console.log({ Gpaths: JSON.parse(JSON.stringify(paths)) })

    console.log({ Gstore: JSON.parse(JSON.stringify(store)) })
    console.log({ Gmeasurements: JSON.parse(JSON.stringify(measurements)) })

    macro('cutonfold', {
      from: points.backInsertCenterTop,
      to: points.frontCenter,
    })

    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    return part
  },
}
