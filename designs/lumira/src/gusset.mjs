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
    const frontGussetLength = store.get('frontGussetLength')
    const ease = 1 + options.ease
    const frontBulge = options.cyclingchamois ? true : options.frontbulge
    const backGusset = options.cyclingchamois ? true : options.backgusset

    const CreateGusset = (side) => {
      const gussetAngle = store.get(side + 'GussetAngle') * 0.5 * (side == 'front' ? 1 : -1)
      const gussetLength = store.get(side + 'GussetLength')
      console.log({ gussetAngle: gussetAngle, gussetLength: gussetLength })
      points[side + 'Center'] = points.centerCenter.shift(side == 'front' ? 270 : 90, gussetLength)
      points[side + 'CenterCp'] = points[side + 'Center'].shift(
        (side == 'front' ? 90 : 270) - gussetAngle,
        gussetLength / 3
      )
      points[side + 'OutsideCenterCp'] = points.outsideCenter.shift(
        side == 'front' ? 270 : 90,
        gussetLength / 3
      )

      paths[side] = new Path()
        .move(points[side + 'Center'])
        .curve(points[side + 'CenterCp'], points[side + 'OutsideCenterCp'], points.outsideCenter)
        .hide()
    }

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

    points.centerCenter = new Point(0, 0)
    points.outsideCenter = points.centerCenter.shift(0, gussetWidth)

    if (backGusset) {
      points.outsideBackCircleStart = points.outsideCenter.shift(90, backGussetLength)
      points.centerBackCircleEnd = points.outsideBackCircleStart
        .shift(
          90,
          measurements.crossSeamBack - measurements.waistToHips - waistLowering - backGussetLength
        )
        .shift(180, gussetWidth)

      points.centerBackCircleStart = new Point(0, points.outsideBackCircleStart.y)

      points.backInsertCenterSeat = points.centerBackCircleEnd.shift(
        270,
        measurements.waistToSeat - waistLowering
      )
      points.centerBackCircleEndCp1 = points.centerBackCircleEnd.shift(
        options.backinserttopcpangle,
        measurements.hips * 0.25 * ease * options.backinserttopcp
      )

      points.outsideBackCircleStartCp1 = points.outsideBackCircleStart.shift(
        backInsertGussetCpAngle,
        measurements.upperLeg * 0.25 * ease * options.backinsertgussetcp
      )

      var diff = 0
      var iter = 0
      do {
        points.centerBackCircleEndCp1 = points.centerBackCircleEndCp1.shift(
          options.backinserttopcpangle,
          diff * (options.backinserttopcp / options.backinsertgussetcp)
        )
        points.outsideBackCircleStartCp1 = points.outsideBackCircleStartCp1.shift(
          backInsertGussetCpAngle,
          diff * (options.backinsertgussetcp / options.backinserttopcp)
        )

        paths.backInsertCircle = new Path()
          .move(points.centerBackCircleEnd)
          .curve(
            points.centerBackCircleEndCp1,
            points.outsideBackCircleStartCp1,
            points.outsideBackCircleStart
          )
          .hide()
        diff = backCircleLength - paths.backInsertCircle.length()
      } while (iter++ < 50 && (diff > 1 || diff < -1))

      const pathBack = new Path()
        .move(points.centerBackCircleEnd)
        .curve(
          points.centerBackCircleEndCp1,
          points.outsideBackCircleStartCp1,
          points.outsideBackCircleStart
        )

      paths.back = new Path()
        .move(points.centerBackCircleEnd)
        .join(pathBack)
        .line(points.outsideCenter)
        .hide()

      points.title = pathBack
        .shiftFractionAlong(0.75)
        .shiftFractionTowards(points.centerBackCircleEnd, 0.5)

      snippets.circle4 = new Snippet('notch', points.outsideBackCircleStart)
      snippets.circle3 = new Snippet('notch', pathBack.shiftFractionAlong(0.25))
      snippets.circle2 = new Snippet('notch', pathBack.shiftFractionAlong(0.5))
      snippets.circle1 = new Snippet('notch', pathBack.shiftFractionAlong(0.75))
      snippets.circle0 = new Snippet('notch', points.centerBackCircleEnd)

      points.backCenter = points.centerBackCircleEnd.clone()
    } else {
      CreateGusset('back')

      points.title = points.centerCenter.shiftFractionTowards(points.outsideCenter, 0.5)
    }

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
      points.frontOutsideSplit = points.outsideCenter.shift(270, bulgeSplitForward)
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
      points.frontoutsideCenter = points.frontOutside.shift(180 + frontCenterAngle, gussetWidth)
      points.frontCenterHips = points.frontOutsideHips.shift(180 + frontCenterAngle, gussetWidth)

      console.log({ points: JSON.parse(JSON.stringify(points)) })

      points.outsideBackCircleStart = points.outsideCenter.shift(90, backGussetLength)

      const gussetCpLength = frontGussetLength

      points.centerCenterCp = points.centerCenter.shift(
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
          .move(points.frontoutsideCenter)
          .line(points.frontCenterHips)
          .curve(points.frontCenterHipsCp, points.frontCenterMiddleCp2, points.frontCenterMiddle)
          .curve(points.frontCenterMiddleCp1, points.frontCenterSplitCp, points.frontCenterSplit)

        // paths['frontCenterGussetPath' + iter] = frontGussetPath.clone().addClass('note')
        diff = frontGussetPath.length() - (frontLength + frontBulgeSize)
      } while (iter++ < 50 && (diff > 1 || diff < -1))
      if (iter >= 50) {
        log.info('couldNotFitFrontGussetPath')
      }

      const frontGussetAngle = points.frontCenterMiddle.angle(points.centerCenter)

      paths.frontBulge = new Path()
        .move(points.frontCenterSplit)
        .curve(points.frontCenterSplitCp, points.frontCenterMiddleCp1, points.frontCenterMiddle)
        .curve(points.frontCenterMiddleCp2, points.frontCenterHipsCp, points.frontCenterHips)
        .hide()

      paths.front = new Path()
        .move(points.frontCenterSplit)
        .join(paths.frontBulge)
        .line(points.frontoutsideCenter)
        .join(paths.frontOutside)
        .line(points.outsideCenter)
        .hide()

      points.frontCenter = points.frontCenterSplit.clone()
    } else {
      CreateGusset('front')
    }

    paths.seamSA = new Path()
      .move(points.frontCenter)
      .join(paths.front)
      .join(paths.back.reverse())
      .hide()

    paths.seam = new Path()
      .move(points.backCenter)
      .line(points.frontCenter)
      .join(paths.seamSA)
      .close()

    // console.log({ paths: JSON.parse(JSON.stringify(paths)) })

    if (sa) {
      if (frontBulge) {
        const pathSA = paths.seamSA.offset(sa)
        paths.saOffset = pathSA.split(pathSA.intersectsX(0)[0])[1].hide()
      } else {
        paths.saOffset = paths.seamSA.offset(sa).hide()
      }

      console.log({ points: JSON.parse(JSON.stringify(points)) })
      console.log({ paths: JSON.parse(JSON.stringify(paths)) })

      if (backGusset) {
        paths.sa = new Path()
          .move(points.frontCenter)
          .line(points.frontCenter.shift(270, sa))
          .move(paths.saOffset.start())
          .join(paths.saOffset)
          .line(points.centerBackCircleEnd.shift(90, sa))
          .line(points.centerBackCircleEnd)
          .attr('class', 'fabric sa')
      } else {
        paths.sa = new Path()
          .move(points.frontCenter)
          .line(points.frontCenter.shift(270, sa))
          .move(paths.saOffset.start())
          .join(paths.saOffset)
          .line(points.backCenter.shift(90, sa))
          .line(points.backCenter)
          .attr('class', 'fabric sa')
      }
    }

    macro('title', {
      at: points.title,
      nr: 2,
      title: 'lumira:gusset',
      align: 'center',
      scale: backGusset ? 1 : 0.25,
    })

    snippets.middle = new Snippet('notch', points.outsideCenter)

    store.cutlist.addCut({ cut: 1, from: 'fabric', onFold: true })

    if (backGusset) {
      macro('cutonfold', {
        from: points.centerBackCircleEnd,
        to: points.centerCenter,
      })
    } else {
      macro('cutonfold', {
        from: points.backCenter,
        to: points.frontCenter,
      })
    }

    // macro('vd', {
    //   id: 'insertBottom',
    //   from: points.outsideCenter,
    //   to: points.frontCenter,
    //   x: points.outsideCenter.x + sa + 15,
    // })
    // macro('vd', {
    //   id: 'insertOutsideGusset',
    //   from: points.outsideBackCircleStart,
    //   to: points.frontCenter,
    //   x: points.outsideCenter.x + sa + 25,
    // })
    // const right = paths.seam.edge('right')
    // macro('vd', {
    //   id: 'rightGusset',
    //   from: right,
    //   to: points.frontCenter,
    //   x: right.x + sa + 15,
    // })
    // macro('vd', {
    //   id: 'rightGusset',
    //   from: right,
    //   to: points.frontCenter,
    //   x: right.x + sa + 15,
    // })
    // macro('vd', {
    //   id: 'top',
    //   from: points.centerBackCircleEnd,
    //   to: points.frontCenter,
    //   x: right.x + sa + 25,
    // })
    // macro('hd', {
    //   id: 'insertBottom',
    //   from: points.frontCenter,
    //   to: points.outsideCenter,
    //   y: points.frontCenter.y + sa + 15,
    // })
    // macro('hd', {
    //   id: 'right',
    //   from: points.frontCenter,
    //   to: right,
    //   y: points.frontCenter.y + sa + 25,
    // })

    // if (frontBulge) {
    //   macro('vd', {
    //     id: 'bulgeLength',
    //     from: points.frontCenter,
    //     to: points.frontoutsideCenter,
    //     x: points.frontOutside.x + sa + 25,
    //   })
    //   macro('hd', {
    //     id: 'bulgeWidth',
    //     from: points.frontCenter,
    //     to: points.frontOutside,
    //     y: points.frontOutside.y + sa + 25,
    //   })
    //   macro('ld', {
    //     id: 'width',
    //     from: points.frontoutsideCenter,
    //     to: points.frontOutside,
    //     d: 15,
    //   })
    // }

    return part
  },
}
