import { pctBasedOn } from '@freesewing/core'
import { extendPath, createControlPoints } from '@freesewing/lumira'

export const createPath = (paths, Path, points, pathName, names) => {
  let i
  paths[pathName] = new Path()
    .move(points[names[0]])
    ._curve(points[names[1] + 'Cp2'], points[names[1]])
  for (i = 2; i < names.length - 1; i++) {
    paths[pathName].curve(points[names[i - 1] + 'Cp1'], points[names[i] + 'Cp2'], points[names[i]])
  }
  paths[pathName].curve_(points[names[i - 1] + 'Cp1'], points[names[i]])

  return paths[pathName]
}

const lowerWaist = (paths, Path, points, log, waistLowering, pathName, pointName) => {
  const newPath = extendPath(Path, paths[pathName], 100, 0)
  const newWaist = newPath.shiftAlong(waistLowering + 100)
  if (newWaist.sitsRoughlyOn(points[pathName + pointName])) {
    return
  }
  points[pathName + pointName] = newWaist
  const pTemp = newPath.split(points[pathName + pointName])
  if (pTemp.length != 2) {
    log.info('lumina:couldNotLowerWaist')
  }
  paths[pathName] = pTemp[1].hide()
}

const createWaistPoint = (options, measurements, Path, points, utils, log, front) => {
  const kneeTemp = points.middleCrossSeam.shiftFractionTowards(
    points.middleKnee,
    options.crotchToKnee
  )
  const angle =
    90 +
    (front
      ? options.crossSeamAngle * (measurements.waistBack / measurements.waist)
      : -1 * options.crossSeamAngle * (1 - measurements.waistBack / measurements.waist))
  const crossSeam = front
    ? measurements.crossSeamFront
    : measurements.crossSeam - measurements.crossSeamFront
  let waist = kneeTemp.shift(angle, measurements.waistToKnee)
  const crossSeamCp = points.middleCrossSeam.shiftFractionTowards(
    utils.beamIntersectsY(kneeTemp, waist, points.middleCrossSeam.y),
    options.crotchPointsCP
  )
  let waistCp = waist.shiftFractionTowards(points.middleKnee, options.waistToKneeCP)
  const kneeToWaist = measurements.waistToKnee * 0.75
  let diff = 0
  let iter = 0
  let bestDiff = 999
  let best = {}
  do {
    // waist = kneeTemp.shift(angle, kneeToWaist +((diff > 0 ? 1 : -1) *iter))
    waist = kneeTemp.shift(angle, kneeToWaist + diff * 1.03)
    // waist = kneeTemp.shift(angle, kneeToWaist *ratio)
    waistCp = waist.shiftFractionTowards(points.middleKnee, options.waistToKneeCP)

    const crossSeamPath = new Path().move(points.middleCrossSeam).curve(crossSeamCp, waistCp, waist)

    diff = crossSeam - crossSeamPath.length()
    if (Math.abs(diff) < bestDiff) {
      best = {
        waist: waist.copy(),
        waistCp: waistCp.copy(),
      }
      bestDiff = Math.abs(diff)
    }
  } while (++iter < 100 && (diff > 1 || diff < -1))
  if (iter >= 100) {
    if (bestDiff > 5) {
      log.error('lumina:cantFitTheWaistPoint')
    } else {
      waist = best.waist
      waistCp = best.waistCp
    }
  }
  if (front) {
    points.frontWaist = waist.clone()
    points.frontWaistband = waist.clone()
    points.frontWaistCp = waistCp.clone()
    points.frontCrossSeamCp = crossSeamCp.clone()
  } else {
    points.backWaist = waist.clone()
    points.backWaistband = waist.clone()
    points.backWaistCp = waistCp.clone()
    points.backCrossSeamCp = crossSeamCp.clone()
  }
}

const createSidePoints = ({
  measurements,
  points,
  utils,
  prefix,
  postfix,
  names,
  ratio,
  ratioFixed,
  ease,
  waistReduction,
  distanceCompensation,
  fixedSidePanel,
}) => {
  let measurement
  let lastGood = 0
  for (let i = 0; i < names.length; i++) {
    let m1 = 0,
      m2 = 0
    if (names[i] != 'Waist') {
      m1 = measurements['waistTo' + names[i]]
    }
    if (names[lastGood] != 'Waist') {
      m2 = measurements['waistTo' + names[lastGood]]
    }
    let distance = m2 - m1
    switch (names[i]) {
      case 'UpperLeg': {
        measurement = measurements['upperLeg']
        const intersect = utils.beamIntersectsCurve(
          points[prefix + names[i]],
          points[prefix + names[i]].shift(prefix == 'front' ? 180 : 0, ratioFixed * 100),
          points.middleCrossSeam,
          points[prefix + 'CrossSeamCp'],
          points[prefix + 'WaistCp'],
          points[prefix + 'Waist']
        )

        if (false !== intersect) {
          if (intersect.constructor === Array) {
            measurement += intersect[0].dist(points[prefix + names[i]])
          } else {
            measurement += intersect.dist(points[prefix + names[i]])
          }
        }
        break
      }
      case 'Waist': {
        measurement =
          (prefix == 'front'
            ? measurements.waist - measurements.waistBack
            : measurements.waistBack) -
          waistReduction * 0.5
        break
      }
      case 'Seat': {
        measurement =
          prefix == 'front' ? measurements.seat - measurements.seatBack : measurements.seatBack
        distance *= distanceCompensation
        break
      }
      default: {
        measurement = measurements[names[i].toLowerCase()]
        // Adjust for thigh size when using positive ease
        if (ease > 1 && (names[i] == 'Ankle' || names[i] == 'Knee')) {
          measurement *= 1.2
        }
      }
    }
    measurement /= 2
    measurement *= ease
    let ci
    const width = measurement * ratio
    const reduction =
      ratio == 0
        ? measurement
        : fixedSidePanel > 0
          ? width < measurement - fixedSidePanel
            ? measurement - fixedSidePanel
            : width
          : width
    if (i == 0) {
      points[prefix + postfix + names[i]] = points[prefix + names[i]].shift(
        prefix == 'front' ? 180 : 0,
        reduction
      )
    } else {
      let iter = 0
      do {
        ci = utils.circlesIntersect(
          points[prefix + names[i]],
          reduction * (1 + iter * 0.02),
          points[prefix + postfix + names[lastGood]],
          distance
        )
        if (false !== ci) {
          points[prefix + postfix + names[i]] = ci[prefix == 'front' ? 0 : 1]
        }
      } while (iter++ < 100 && (false == ci || isNaN(ci[prefix == 'front' ? 0 : 1].x)))
      if (iter >= 100) {
        points[prefix + postfix + names[i]] = points[prefix + postfix + names[lastGood]].clone()
      } else {
        lastGood = i
      }
    }
  }
}

const smoothPoints = (points, prefix, postfix, names, smoothness) => {
  let adjust
  for (let i = 0; i < names.length - 2; i++) {
    adjust = false
    if (prefix == 'front') {
      adjust =
        points[prefix + postfix + names[i]].angle(points[prefix + postfix + names[i + 1]]) >
        points[prefix + postfix + names[i]].angle(points[prefix + postfix + names[i + 2]])
    } else {
      adjust =
        points[prefix + postfix + names[i]].angle(points[prefix + postfix + names[i + 1]]) <
        points[prefix + postfix + names[i]].angle(points[prefix + postfix + names[i + 2]])
    }
    if (adjust) {
      const angleDiff =
        points[prefix + postfix + names[i]].angle(points[prefix + postfix + names[i + 2]]) -
        points[prefix + postfix + names[i]].angle(points[prefix + postfix + names[i + 1]])

      points[prefix + postfix + names[i + 1]] = points[prefix + postfix + names[i]].shift(
        points[prefix + postfix + names[i]].angle(points[prefix + postfix + names[i + 1]]) +
          smoothness * angleDiff,
        points[prefix + postfix + names[i]].dist(points[prefix + postfix + names[i + 1]])
      )
    }
  }
}

export const shape = {
  name: 'lumina.shape',
  measurements: [
    'waist',
    'waistBack',
    'hips',
    'seat',
    'seatBack',
    'inseam',
    'waistToSeat',
    'waistToUpperLeg',
    'waistToKnee',
    'waistToHips',
    'waistToFloor',
    'knee',
    'ankle',
    'crossSeam',
    'crossSeamFront',
    'heel',
    'upperLeg',
  ],
  options: {
    waistband: { bool: true, menu: 'style' },
    lowerwaistbandback: {
      bool: true,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'style' : false),
    },
    ease: { pct: -8, min: -25, max: 10, menu: 'fit' },
    length: { pct: 35, min: 10, max: 100, menu: 'style' },
    waistbandsize: {
      pct: 50,
      min: 0,
      max: 150,
      ...pctBasedOn('waistToHips'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'style' : false),
    },
    waistlowering: { pct: 35, min: -10, max: 60, ...pctBasedOn('waistToHips'), menu: 'style' },
    waistreduction: {
      pct: 4,
      min: 0,
      max: 10,
      ...pctBasedOn('waist'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'fit' : false),
    },

    sidepanel: { pct: 25, min: 10, max: 40, menu: 'style' },
    smoothing: { pct: 85, min: 50, max: 100, menu: 'advanced' },
    fixedsidepanel: { bool: false, menu: 'style' },
    crossSeamAngle: 35,
    crotchToKnee: 0.4,
    waistToKneeCP: 0.4,
    kneeToWaistLength: 400,
    crotchPointsCP: 2,
  },
  draft: ({
    measurements,
    options,
    Point,
    Path,
    points,
    paths,
    utils,
    store,
    units,
    log,
    part,
  }) => {
    const inseam =
      measurements.inseam > measurements.waistToFloor - measurements.waistToUpperLeg
        ? measurements.waistToFloor - measurements.waistToUpperLeg
        : measurements.inseam
    const crotchOffset = measurements.waistToFloor - inseam
    const waistLowering = measurements.waistToHips * options.waistlowering
    const waistReduction = options.waistband ? measurements.waist * options.waistreduction : 0
    const waistbandSize = options.waistband
      ? measurements.waistToHips *
        (options.waistlowering + options.waistbandsize > 1.5
          ? 1.5 - options.waistlowering
          : options.waistbandsize)
      : 0
    const sideRatio = 1 - options.sidepanel
    // const sideRatio = 3 / 5
    const ease = options.ease + 1
    const waistToAnkle = measurements.waistToFloor - measurements.heel / Math.PI

    store.set('waistbandSize', waistbandSize)
    store.set('waistLowering', waistLowering)

    measurements['waistToAnkle'] = measurements.waistToFloor - measurements.heel / Math.PI
    const sideFixed = (((measurements.waist - measurements.waistBack) * ease) / 2) * sideRatio
    const fixedSidePanel =
      (((measurements.waist - measurements.waistBack - waistReduction) * ease) / 2) *
      options.sidepanel

    points.middleWaist = new Point(0, 0)
    points.middleHips = points.middleWaist.shift(270, measurements.waistToHips)
    points.middleSeat = points.middleWaist.shift(270, measurements.waistToSeat)
    points.frontCrossSeam =
      points.backCrossSeam =
      points.middleCrossSeam =
        points.middleWaist.shift(270, crotchOffset)
    points.frontUpperLeg =
      points.backUpperLeg =
      points.middleUpperLeg =
        points.middleWaist.shift(270, measurements.waistToUpperLeg)
    points.frontKnee =
      points.backKnee =
      points.middleKnee =
        points.middleWaist.shift(270, measurements.waistToKnee)
    points.frontAnkle =
      points.backAnkle =
      points.middleAnkle =
        points.middleWaist.shift(270, waistToAnkle)
    points.frontFloor =
      points.backFloor =
      points.middleFloor =
        points.middleWaist.shift(270, measurements.waistToFloor)

    createWaistPoint(options, measurements, Path, points, utils, log, true)
    createWaistPoint(options, measurements, Path, points, utils, log, false)

    const frontCrossSeam = new Path()
      .move(points.frontWaist)
      .curve(points.frontWaistCp, points.frontCrossSeamCp, points.middleCrossSeam)
    const backCrossSeam = new Path()
      .move(points.backWaist)
      .curve(points.backWaistCp, points.backCrossSeamCp, points.middleCrossSeam)

    points.frontSeat = frontCrossSeam.shiftAlong(
      measurements.waistToSeat * (measurements.crossSeamFront / measurements.waistToUpperLeg) * 0.8
    )
    points.frontHips = frontCrossSeam.shiftAlong(
      measurements.waistToHips * (measurements.crossSeamFront / measurements.waistToUpperLeg)
    )

    points.backSeat = backCrossSeam.shiftAlong(
      measurements.waistToSeat * (measurements.waistToSeat / measurements.waistToUpperLeg)
    )
    points.backHips = backCrossSeam.shiftAlong(
      measurements.waistToHips * (measurements.waistToSeat / measurements.waistToUpperLeg)
    )
    ;['front', 'back'].forEach((prefix) => {
      createSidePoints({
        measurements: measurements,
        points: points,
        utils: utils,
        prefix: prefix,
        postfix: 'Side',
        names: ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
        ratio: 0,
        ratioFixed: 0.1,
        ease: ease,
        waistReduction: waistReduction,
        distanceCompensation: 1,
        fixedSidePanel: 0,
      })
      points[prefix + 'SideWaistband'] = points[prefix + 'SideWaist'].clone()
    })

    points.middleWaistband = points.middleWaist.clone()
    ;['front', 'back'].forEach((prefix) => {
      createSidePoints({
        measurements: measurements,
        points: points,
        utils: utils,
        prefix: prefix,
        postfix: 'Split',
        names: ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
        ratio: sideRatio,
        ratioFixed: sideFixed,
        ease: ease,
        waistReduction: waistReduction,
        distanceCompensation:
          (points.frontAnkle.dist(points.frontCrossSeam) + frontCrossSeam.length()) /
          (measurements.waistToFloor - measurements.heel / Math.PI),
        fixedSidePanel: options.fixedsidepanel ? fixedSidePanel : 0,
      })
      points[prefix + 'SplitWaistband'] = points[prefix + 'SplitWaist'].clone()
    })

    points.backHipsCp1 = points.backWaistCp.clone()
    points.backWaistCp = points.backWaist.shift(
      points.backWaist.angle(points.backSplitWaist) - 90,
      points.backWaist.dist(points.backHips) / 3
    )
    points.backHipsCp2 = points.backSeat.shiftOutwards(
      points.backHips,
      points.backWaist.dist(points.backHips) / 4
    )
    points.frontHipsCp1 = points.frontWaistCp.clone()
    points.frontWaistCp = points.frontWaist.shift(
      points.frontWaist.angle(points.frontSplitWaist) + 90,
      points.frontWaist.dist(points.frontHips) / 3
    )
    points.frontHipsCp2 = points.frontSeat.shiftOutwards(
      points.frontHips,
      points.frontWaist.dist(points.frontHips) / 4
    )

    paths.front = new Path()
      .move(points.frontWaist)
      .curve(points.frontWaistCp, points.frontHipsCp2, points.frontHips)
      .curve(points.frontHipsCp1, points.frontCrossSeamCp, points.middleCrossSeam)
    paths.back = new Path()
      .move(points.backWaist)
      .curve(points.backWaistCp, points.backHipsCp2, points.backHips)
      .curve(points.backHipsCp1, points.backCrossSeamCp, points.middleCrossSeam)
    ;['front', 'back'].forEach((prefix) => {
      // eslint-disable-next-line no-extra-semi
      ;['Side', 'Split'].forEach((type) => {
        smoothPoints(
          points,
          prefix,
          type,
          ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
          options.smoothing
        )
      })
    })

    paths.middle = new Path().move(points.middleWaist).line(points.middleFloor).setHidden()
    ;['front', 'back'].forEach((prefix) => {
      // eslint-disable-next-line no-extra-semi
      ;['Side', 'Split'].forEach((type) => {
        createControlPoints(points, 3, [
          prefix + type + 'Waist',
          prefix + type + 'Seat',
          prefix + type + 'UpperLeg',
          prefix + type + 'Knee',
          prefix + type + 'Ankle',
        ])
      })
    })
    ;['front', 'back'].forEach((prefix) => {
      // eslint-disable-next-line no-extra-semi
      ;['Side', 'Split'].forEach((type) => {
        createPath(paths, Path, points, prefix + type, [
          prefix + type + 'Waist',
          prefix + type + 'Seat',
          prefix + type + 'UpperLeg',
          prefix + type + 'Knee',
          prefix + type + 'Ankle',
        ])
      })
    })
    ;['front', 'back'].forEach((prefix) => {
      // eslint-disable-next-line no-extra-semi
      ;['Waist', 'Waistband', 'Seat', 'UpperLeg', 'Knee', 'Ankle'].forEach((name) => {
        points[prefix + 'Panel' + name] = points['middle' + name].shift(
          prefix == 'front' ? 0 : 180,
          points[prefix + 'Side' + name].dist(points[prefix + 'Split' + name])
        )
      })
    })
    ;['front', 'back'].forEach((prefix) => {
      createControlPoints(points, 3, [
        prefix + 'Panel' + 'Waist',
        prefix + 'Panel' + 'Seat',
        prefix + 'Panel' + 'UpperLeg',
        prefix + 'Panel' + 'Knee',
        prefix + 'Panel' + 'Ankle',
      ])
    })
    ;['front', 'back'].forEach((prefix) => {
      createPath(paths, Path, points, prefix + 'Panel', [
        prefix + 'Panel' + 'Waist',
        prefix + 'Panel' + 'Seat',
        prefix + 'Panel' + 'UpperLeg',
        prefix + 'Panel' + 'Knee',
        prefix + 'Panel' + 'Ankle',
      ])
    })

    const frontSplitlength = paths.frontSplit.length()

    while (Math.abs(frontSplitlength - paths.frontPanel.length()) > 1) {
      // eslint-disable-next-line no-extra-semi
      ;['front', 'back'].forEach((prefix) => {
        const diff = paths[prefix + 'Split'].length() / paths[prefix + 'Panel'].length()
        const names = ['Waist', 'Seat', 'UpperLeg', 'Knee', 'Ankle']
        for (let i = 0; i < names.length - 1; i++) {
          points[prefix + 'Panel' + names[i]] = points[
            prefix + 'Panel' + names[i + 1]
          ].shiftFractionTowards(points[prefix + 'Panel' + names[i]], diff)
        }
      })
      ;['front', 'back'].forEach((prefix) => {
        createControlPoints(points, 3, [
          prefix + 'Panel' + 'Waist',
          prefix + 'Panel' + 'Seat',
          prefix + 'Panel' + 'UpperLeg',
          prefix + 'Panel' + 'Knee',
          prefix + 'Panel' + 'Ankle',
        ])
      })
      ;['front', 'back'].forEach((prefix) => {
        createPath(paths, Path, points, prefix + 'Panel', [
          prefix + 'Panel' + 'Waist',
          prefix + 'Panel' + 'Seat',
          prefix + 'Panel' + 'UpperLeg',
          prefix + 'Panel' + 'Knee',
          prefix + 'Panel' + 'Ankle',
        ])
      })
    }

    if (options.length < 1) {
      const length = (1 - options.length) * (inseam - (measurements.waistToFloor - waistToAnkle))
      ;['front', 'back'].forEach((prefix) => {
        // eslint-disable-next-line no-extra-semi
        ;['Side', 'Split', 'Panel'].forEach((type) => {
          points[prefix + type + 'Hem'] = paths[prefix + type].reverse().shiftAlong(length)
          paths[prefix + type] = paths[prefix + type].split(points[prefix + type + 'Hem'])[0]
        })
      })
    } else {
      // eslint-disable-next-line no-extra-semi
      ;['front', 'back'].forEach((prefix) => {
        // eslint-disable-next-line no-extra-semi
        ;['Side', 'Split', 'Panel'].forEach((type) => {
          points[prefix + type + 'Hem'] = points[prefix + type + 'Ankle']
        })
      })
    }

    lowerWaist(paths, Path, points, log, waistLowering, 'middle', 'Waist')
    ;['front', 'back'].forEach((prefix) => {
      // eslint-disable-next-line no-extra-semi
      ;['Side', 'Split', 'Panel'].forEach((type) => {
        lowerWaist(paths, Path, points, log, waistLowering, prefix + type, 'Waist')
      })
      lowerWaist(paths, Path, points, log, waistLowering, prefix, 'Waist')
    })
    ;['front', 'back'].forEach((prefix) => {
      // eslint-disable-next-line no-extra-semi
      ;['Side', 'Split', 'Panel'].forEach((type) => {
        lowerWaist(paths, Path, points, log, waistbandSize, prefix + type, 'Waistband')
      })
      lowerWaist(paths, Path, points, log, waistbandSize, prefix, 'Waistband')
    })

    store.set(
      'waistLength',
      points.backWaist.dist(points.backSideWaist) + points.frontWaist.dist(points.frontSideWaist)
    )
    ;['front', 'back'].forEach((prefix) => {
      const waistbandLength = points[prefix + 'Waistband'].dist(points[prefix + 'SplitWaistband'])
      const direction = prefix == 'front' ? 90 : -90
      let angle = paths[prefix].shiftAlong(1).angle(points[prefix + 'Waistband'])
      points[prefix + 'WaistbandCp'] = points[prefix + 'Waistband'].shift(
        angle + direction,
        waistbandLength * 0.35
      )
      angle = paths[prefix + 'Split'].shiftAlong(1).angle(points[prefix + 'SplitWaistband'])
      points[prefix + 'SplitWaistbandCp'] = points[prefix + 'SplitWaistband'].shift(
        angle + direction * -1,
        waistbandLength * 0.35
      )
      paths[prefix + 'Waistband'] = new Path()
        .move(points[prefix + 'Waistband'])
        .curve(
          points[prefix + 'WaistbandCp'],
          points[prefix + 'SplitWaistbandCp'],
          points[prefix + 'SplitWaistband']
        )
        .hide()
    })

    store.set(
      'waistbandLength',
      paths.backWaistband.length() +
        paths.frontWaistband.length() +
        points.frontPanelWaistband.dist(points.backPanelWaistband)
    )

    if (options.waistband && options.lowerwaistbandback) {
      // Lower the back a little more to get a V-shape in the back
      // lowerWaist(paths, Path, points, waistLowering * 0.5, 'back', 'Waistband')
      lowerWaist(
        paths,
        Path,
        points,
        log,
        (waistLowering + waistbandSize) * 0.5,
        'back',
        'Waistband'
      )
      paths.backWaistband = new Path()
        .move(points.backWaistband)
        ._curve(points.backSplitWaistbandCp, points.backSplitWaistband)
        .hide()
    }

    store.set('waistbandBackLength', paths.backWaistband.length())
    store.set('waistbandFrontLength', paths.frontWaistband.length())
    store.set('waistbandPanelLength', points.frontPanelWaistband.dist(points.backPanelWaistband))

    store.flag.note({
      msg: `lumina:dimensions`,
      replace: {
        waistbandlength: units(
          (store.get('waistbandBackLength') +
            store.get('waistbandFrontLength') +
            store.get('waistbandPanelLength')) *
            2
        ),
        length: units(
          store.get('waistbandSize') + points.frontPanelWaistband.dist(points.frontPanelHem)
        ),
      },
    })

    return part.hide()
  },
}
