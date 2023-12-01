import { cbqc } from '@freesewing/core'
import { pctBasedOn } from '@freesewing/core'
import { shape } from './shape.mjs'

export const gusset = {
  name: 'lumira.gusset',
  from: shape,
  options: {
    // Constants:
    backinserttopcp: 0.3,
    backinserttopcpangle: 0,
    backinsertgussetcp: 0.2,
    frontbulgelift: 1.75,
    frontbulgeforwardpercentage: 0.125,
    frontbulgemiddleshift: 0.65,
    // Percentages:
    buttlift: {
      pct: 30,
      min: 0,
      max: 60,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.cyclingchamois ? false : 'fit'),
    },
    frontbulgesize: {
      pct: 2.5,
      min: 0,
      max: 10,
      ...pctBasedOn('crossSeamFront'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) =>
        mergedOptions?.frontbulge == true && mergedOptions?.cyclingchamois == false
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
    units,
    part,
  }) => {
    const waistLowering = store.get('waistLowering')
    const waistbandSize = store.get('waistbandSize')
    const gussetWidth = store.get('gussetWidth')
    const backCircleLength = store.get('backCircleLength')
    const backGussetLength = store.get('backGussetLength')
    const ease = 1 + options.ease
    const frontBulge = options.cyclingchamois ? true : options.frontbulge
    if (options.frontbulgesize > options.gussetwidth * 0.9) {
      options.frontbulgesize = options.gussetwidth * 0.9

      store.flag.note({
        msg: `lumira:bulgeToLarge`,
        replace: {
          width: units(1),
          length: units(1),
        },
        // suggest: {
        //   text: 'flag:show',
        //   icon: 'expand',
        //   update: {
        //     settings: ['expand', 1],
        //   },
        // },
      })
    }
    const frontBulgeSize =
      (options.cyclingchamois
        ? 0.0125
        : options.frontbulgesize > options.gussetwidth * 0.9
        ? options.gussetwidth * 0.9
        : options.frontbulgesize) * measurements.crossSeamFront
    const backInsertGussetCpAngle = options.cyclingchamois ? 0 : 90 * options.buttlift

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
      options.backinserttopcpangle,
      measurements.hips * 0.25 * ease * options.backinserttopcp
    )

    points.backInsertOutsideGussetCp1 = points.backInsertOutsideGusset.shift(
      backInsertGussetCpAngle,
      measurements.upperLeg * 0.25 * ease * options.backinsertgussetcp
    )

    var diff = 0
    var iter = 0
    do {
      points.backInsertCenterTopCp1 = points.backInsertCenterTopCp1.shift(
        options.backinserttopcpangle,
        diff * (options.backinserttopcp / options.backinsertgussetcp)
      )
      points.backInsertOutsideGussetCp1 = points.backInsertOutsideGussetCp1.shift(
        backInsertGussetCpAngle,
        diff * (options.backinsertgussetcp / options.backinserttopcp)
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
      console.log({
        i: iter,
        d: diff,
        bcl: backCircleLength,
        pl: paths.backInsertCircle.length(),
        p: paths.backInsertCircle,
      })
    } while (iter++ < 50 && (diff > 1 || diff < -1))

    points.backInsertOutsideBottom = points.backInsertOutsideGusset.shift(270, backGussetLength)
    points.backInsertCenterBottom = points.backInsertOutsideBottom.shift(180, gussetWidth)

    if (frontBulge) {
      const bulgeSplitForward = measurements.crossSeamFront * options.frontbulgeforwardpercentage
      const frontLength = store.get('frontLength') - bulgeSplitForward
      // const rotateAngle = utils.rad2deg(Math.acos(frontLength / (frontLength + frontBulgeSize))) *.75
      var rotateAngle =
        utils.rad2deg(Math.asin((frontBulgeSize * 0.5) / gussetWidth)) * (0.6 + options.gussetwidth)

      if (rotateAngle > 90) {
        store.flag.note({
          msg: `lumira:bulgeToLarge`,
          replace: {
            width: units(1),
            length: units(1),
          },
        })
        rotateAngle = 90
      }
      points.frontOutsideSplit = points.backInsertOutsideBottom.shift(270, bulgeSplitForward)
      points.frontCenterSplit = points.frontOutsideSplit.shift(180, gussetWidth)
      points.frontOutside = points.frontOutsideSplit.shift(270 + rotateAngle, frontLength)

      const thisCbqc = cbqc * 0.75 //(rotateAngle / 22.5)
      points.frontOutsideSplitCp1 = points.frontOutsideSplit.shift(270, thisCbqc * frontLength)

      diff = 0
      iter = 0
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
      points.frontCenterHips = points.frontOutsideHips.shift(180 + frontCenterAngle, gussetWidth)

      const gussetCpLength = points.backInsertCenterGusset.dist(points.backInsertCenterBottom)

      points.backInsertCenterBottomCp = points.backInsertCenterBottom.shift(
        270,
        gussetCpLength * 1
        // gussetCpLength * options.frontbulgelift
      )
      points.frontCenterSplitCp = points.frontCenterSplit.shift(
        270,
        gussetCpLength * 1
        // gussetCpLength * options.frontbulgelift
      )

      points.frontCenterHipsCp = points.frontCenterHips.shift(
        frontCenterAngle + 90,
        gussetCpLength * 0.5
      )
      points.frontCenterMiddle = points.frontCenterHipsCp.shiftFractionTowards(
        points.frontCenterSplitCp,
        options.frontbulgemiddleshift
      )

      diff = 0
      iter = 0
      do {
        // points['frontCenterMiddle' + iter] = points.frontCenterMiddle.clone()

        points.frontCenterMiddle = points.frontCenterMiddle.shift(frontCenterAngle, diff)
        points.frontCenterMiddleCp1 = points.frontCenterMiddle.shift(
          90 + frontCenterAngle * 0.5,
          gussetCpLength * 0.2 //(1 - options.frontbulgemiddlemhift)
        )
        points.frontCenterMiddleCp2 = points.frontCenterMiddle.shift(
          270 + frontCenterAngle * 0.5,
          gussetCpLength * 0.5
        )

        if (points.frontCenterMiddle.x < 0) {
          points.frontCenterMiddle.x = 0
          points.frontCenterMiddleCp1.x = 0
          points.frontCenterMiddleCp2.x = 0
        }
        if (points.frontCenterMiddleCp1.x < 0) {
          points.frontCenterMiddleCp1.x = 0
          // points.frontCenterMiddleCp2.x = 0
        }

        const frontGussetPath = new Path()
          .move(points.frontCenterOutside)
          .line(points.frontCenterHips)
          .curve(points.frontCenterHipsCp, points.frontCenterMiddleCp2, points.frontCenterMiddle)
          .curve(points.frontCenterMiddleCp1, points.frontCenterSplitCp, points.frontCenterSplit)

        // paths['frontCenterGussetPath' + iter] = frontGussetPath.clone().addClass('note')
        console.log({ frontGussetPath: frontGussetPath })
        diff = frontGussetPath.length() - (frontLength + frontBulgeSize)

        console.log({
          i: iter,
          d: diff,
          fl: frontLength + frontBulgeSize,
          pl: frontGussetPath.length(),
        })
      } while (iter++ < 50 && (diff > 1 || diff < -1))
      if (iter >= 50) {
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

      console.log({ rotateAngle: rotateAngle })
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

    points.title = paths.backGusset
      .shiftFractionAlong(0.25)
      .shiftFractionTowards(points.backInsertCenterTop, 0.5)
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'gusset',
      align: 'center',
    })

    snippets.middle = new Snippet('notch', points.backInsertOutsideBottom)
    snippets.circle4 = new Snippet('notch', points.backInsertOutsideGusset)
    snippets.circle3 = new Snippet('notch', paths.backGusset.shiftFractionAlong(0.25))
    snippets.circle2 = new Snippet('notch', paths.backGusset.shiftFractionAlong(0.5))
    snippets.circle1 = new Snippet('notch', paths.backGusset.shiftFractionAlong(0.75))
    snippets.circle0 = new Snippet('notch', points.backInsertCenterTop)

    macro('cutonfold', {
      from: points.backInsertCenterTop,
      to: points.backInsertCenterBottom,
    })

    store.cutlist.addCut({ cut: 1, from: 'fabric', onFold: true })

    macro('vd', {
      id: 'insertBottom',
      from: points.backInsertOutsideBottom,
      to: points.frontCenter,
      x: points.backInsertOutsideBottom.x + sa + 15,
    })
    macro('vd', {
      id: 'insertOutsideGusset',
      from: points.backInsertOutsideGusset,
      to: points.frontCenter,
      x: points.backInsertOutsideBottom.x + sa + 25,
    })
    const right = paths.seam.edge('right')
    macro('vd', {
      id: 'rightGusset',
      from: right,
      to: points.frontCenter,
      x: right.x + sa + 15,
    })
    macro('vd', {
      id: 'rightGusset',
      from: right,
      to: points.frontCenter,
      x: right.x + sa + 15,
    })
    macro('vd', {
      id: 'top',
      from: points.backInsertCenterTop,
      to: points.frontCenter,
      x: right.x + sa + 25,
    })
    macro('hd', {
      id: 'insertBottom',
      from: points.frontCenter,
      to: points.backInsertOutsideBottom,
      y: points.frontCenter.y + sa + 15,
    })
    macro('hd', {
      id: 'right',
      from: points.frontCenter,
      to: right,
      y: points.frontCenter.y + sa + 25,
    })

    if (frontBulge) {
      macro('vd', {
        id: 'bulgeLength',
        from: points.frontCenter,
        to: points.frontCenterOutside,
        x: points.frontOutside.x + sa + 25,
      })
      macro('hd', {
        id: 'bulgeWidth',
        from: points.frontCenter,
        to: points.frontOutside,
        y: points.frontOutside.y + sa + 25,
      })
      macro('ld', {
        id: 'width',
        from: points.frontCenterOutside,
        to: points.frontOutside,
        d: 15,
      })
    }

    return part
  },
}
