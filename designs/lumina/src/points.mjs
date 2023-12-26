import { pctBasedOn } from '@freesewing/core'
import { extendPath, createControlPoints } from '@freesewing/lumira'

const lowerWaist = (paths, Path, points, waistLowering, pathName, pointName) => {
  console.log({ pins: JSON.parse(JSON.stringify(points)) })
  console.log({ pats: JSON.parse(JSON.stringify(paths)) })
  console.log({
    pn: pointName,
    pan: pathName,
    par: { path: paths[pathName], len: paths[pathName].length(), wr: waistLowering },
  })
  const newPath = extendPath(Path, paths[pathName], 100, 0)
  const newWaist = newPath.shiftAlong(waistLowering + 100)
  // console.log({newWaist:newWaist})
  // console.log({p:points[pathName + pointName]})
  // console.log({s:newWaist.sitsRoughlyOn(points[pathName + pointName])})
  if (newWaist.sitsRoughlyOn(points[pathName + pointName])) {
    return
  }
  points[pathName + pointName] = newWaist
  const pTemp = newPath.split(points[pathName + pointName])
  if (pTemp.length != 2) {
    log.info('lumina:couldNotLowerWaist')
    // console.log('couldNotLowerWaist')
  }
  paths[pathName] = pTemp[1].hide()
}

const createPath = (paths, Path, points, pathName, names) => {
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

const createWaistPoint = (options, measurements, Path, points, utils, front) => {
  const kneeTemp = points.middleCrossSeam.shiftFractionTowards(
    points.middleKnee,
    options.crotchToKnee
  )
  const angle =
    90 +
    (front
      ? options.crossSeamAngle * (measurements.waistBack / measurements.waist)
      : -1 * options.crossSeamAngle * (1 - measurements.waistBack / measurements.waist))
  const crossSeam = front ? measurements.crossSeamFront : measurements.crossSeamBack
  let kneeToWaist = measurements.waistToKnee
  let ratio = 1
  let waist = kneeTemp.shift(angle, kneeToWaist * ratio)
  const crossSeamCp = points.middleCrossSeam.shiftFractionTowards(
    utils.beamIntersectsY(kneeTemp, waist, points.middleCrossSeam.y),
    options.crotchPointsCP
  )

  let waistCp
  let diff
  let iter = 0
  do {
    waist = kneeTemp.shift(angle, kneeToWaist * ratio * (ratio < 1 ? 1.05 : 0.95))
    waistCp = waist.shiftFractionTowards(points.middleKnee, options.waistToKneeCP)

    const crossSeamPath = new Path().move(points.middleCrossSeam).curve(crossSeamCp, waistCp, waist)

    diff = crossSeam - crossSeamPath.length()
    ratio = crossSeam / crossSeamPath.length()
  } while (++iter < 100 && (diff > 1 || diff < -1))
  if (iter >= 100) {
    log.error('lumina:cantFitTheWaistPoint')
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

const createSidePoints = (
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
  distanceCompensation
) => {
  let measurement
  let width
  let lastGood = 0
  for (let i = 0; i < names.length; i++) {
    let distance =
      measurements['waistTo' + names[lastGood]] -
      (measurements['waistTo' + names[i]] === undefined ? 0 : measurements['waistTo' + names[i]])
    switch (names[i]) {
      case 'UpperLeg':
        measurement = measurements['upperLeg']
        const intersect = utils.beamIntersectsCurve(
          points[prefix + names[i]],
          points[prefix + names[i]].shift(prefix == 'front' ? 180 : 0, ratioFixed * 100),
          points.middleCrossSeam,
          points[prefix + 'CrossSeamCp'],
          points[prefix + 'WaistCp'],
          points[prefix + 'Waist']
        )
        // console.log({ prefix: prefix, name: names[i] })
        // console.log({ intersect: intersect })
        // console.log({ intersect: typeof intersect })
        // console.log({ pins: JSON.parse(JSON.stringify(points)) })

        if (false !== intersect) {
          if (intersect.constructor === Array) {
            measurement += intersect[0].dist(points[prefix + names[i]])
          } else {
            measurement += intersect.dist(points[prefix + names[i]])
          }
        }
        break
      case 'Waist':
        measurement =
          (prefix == 'front' ? measurements.waistFront : measurements.waistBack) -
          waistReduction * 0.5
        break
      case 'Seat':
        measurement = prefix == 'front' ? measurements.seatFront : measurements.seatBack
        distance *= distanceCompensation
        break
      default:
        measurement = measurements[names[i].toLowerCase()]
    }
    measurement /= 2
    measurement *= ease

    width = measurement * ratio

    // const classes = ['lining','canvas','mark','contrast','note','interfacing','various']
    console.log({
      p: prefix + postfix,
      n: names[i],
      m: measurement,
      w: waistReduction,
      lg: lastGood,
    })
    if (i == 0) {
      points[prefix + postfix + names[i]] = points[prefix + names[i]].shift(
        prefix == 'front' ? 180 : 0,
        measurement - width < ratioFixed ? width : measurement - ratioFixed
      )
      console.log({
        pr: points[prefix + names[i]].shift(
          prefix == 'front' ? 180 : 0,
          measurement - width < ratioFixed ? width : measurement - ratioFixed
        ),
        a: prefix == 'front' ? 180 : 0,
        d: measurement - width < ratioFixed ? width : measurement - ratioFixed,
      })
    } else {
      const radius = measurement - width < ratioFixed ? width : measurement - ratioFixed
      // if( (radius > points[prefix + names[i]].dist(points[prefix + postfix + names[lastGood]]) +distance) || (radius < points[prefix + names[i]].dist(points[prefix + postfix + names[lastGood]]) -distance)){
      //   points[prefix + postfix + names[i]] = points[prefix + postfix + names[lastGood]]
      //   lastGood = i

      // } else
      {
        // if(prefix == 'back') {
        //   points[prefix + names[i] +'Temp' +i] = points[prefix + names[i]].clone().addCircle(radius, classes[i])
        //   points[prefix + postfix +names[i] +'Temp' +i] = points[prefix + postfix + names[lastGood]].clone().addCircle(distance, classes[i])
        // }
        let ci = utils.circlesIntersect(
          points[prefix + names[i]],
          radius,
          points[prefix + postfix + names[lastGood]],
          distance
        )
        // console.log({n1:prefix + names[i],n2:prefix + postfix + names[lastGood]})
        // console.log({p1:points[prefix + names[i]],r1:radius,p2:points[prefix + postfix + names[lastGood]],r2:distance})
        console.log({ ci: ci })
        if (false !== ci) {
          points[prefix + postfix + names[i]] = ci[prefix == 'front' ? 0 : 1]
          console.log({ pp: points[prefix + postfix + names[i]], ppn: prefix + postfix + names[i] })
          lastGood = i
        } else {
          points[prefix + postfix + names[i]] = points[prefix + postfix + names[lastGood]].clone()
          console.log({
            ppp: points[prefix + postfix + names[i]],
            ppn: prefix + postfix + names[i],
          })

          // points[prefix + postfix + names[lastGood]]
          // points[prefix + names[i]]
          // points[prefix + names[i]].addCircle(measurement - width < ratioFixed ? width : measurement - ratioFixed)
        }
      }
    }
    console.log({
      p: points[prefix + names[i]],
      m: measurement,
      w: width,
      rf: ratioFixed,
      pr: points[prefix + postfix + names[i]],
    })
  }
  console.log({ pionts: JSON.parse(JSON.stringify(points)) })
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
      // console.log({ prefix: prefix, postfix: postfix, smooth: names[i + 1] })
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

export const points = {
  name: 'lumina.points',
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
    Lowerwaistbandback: { bool: true, menu: 'style' },
    ease: { pct: -8, min: -25, max: 10, menu: 'fit' },
    length: { pct: 35, min: 10, max: 100, menu: 'fit' },
    waistbandsize: {
      pct: 90,
      min: 0,
      max: 150,
      ...pctBasedOn('waistToHips'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'style' : false),
    },
    waistlowering: { pct: 10, min: -10, max: 60, ...pctBasedOn('waistToHips'), menu: 'style' },
    waistreduction: {
      pct: 4,
      min: 0,
      max: 10,
      ...pctBasedOn('waist'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.waistband ? 'style' : false),
    },

    sidePanel: { pct: 25, min: 10, max: 40, menu: 'style' },
    smoothing: { pct: 85, min: 50, max: 100, menu: 'advanced' },
    fixedsidepanel: { bool: false, menu: 'style' },
    crossSeamAngle: 35,
    crotchToKnee: 0.4,
    waistToKneeCP: 0.4,
    kneeToWaistLength: 400,
    crotchPointsCP: 2,
  },
  draft: ({ measurements, options, Point, Path, points, paths, utils, store, part }) => {
    /*const c1 = new Point(87.62444870107574, 154.32805978682666)
    const c2 = new Point(260.759500228999, 267.90025949932897)
    const r1 = 230, r2 = 20
    const ci = utils.circlesIntersect(c1,r1,c2,r2)


    console.log(ci)

    let dx = c1.dx(c2)
    console.log({dx:dx})
    let dy = c1.dy(c2)
    console.log({dy:dy})
    let dist = c1.dist(c2)
    console.log({dist:dist})
    // Check for edge cases
    console.log({pf1:parseFloat(r1),pf2:parseFloat(r2)})
    console.log({pfa:parseFloat(r1)+parseFloat(r2),pfb:parseFloat(r1)-parseFloat(r2)})
    console.log({g:dist > parseFloat(r1)+parseFloat(r2)})
    console.log({l:dist < parseFloat(r1)-parseFloat(r2)})
    if (dist > parseFloat(r1) + parseFloat(r2)) return false // Circles do not intersect
    console.log({x:(dist < parseFloat(r2) - parseFloat(r1))})
    if (dist < Math.abs(parseFloat(r2) - parseFloat(r1))) return false // One circle is contained in the other
    if (dist === 0 && r1 === r2) return false // Two circles are identical
    let chorddistance = (Math.pow(r1, 2) - Math.pow(r2, 2) + Math.pow(dist, 2)) / (2 * dist)
    console.log({chorddistance:chorddistance})
    
    console.log({m1:Math.pow(r1, 2),m2:Math.pow(chorddistance, 2)})
    let halfchordlength = Math.sqrt(Math.abs(Math.pow(r1, 2) - Math.pow(chorddistance, 2)))
    console.log({halfchordlength:halfchordlength})
    let chordmidpointx = c1.x + (chorddistance * dx) / dist
    let chordmidpointy = c1.y + (chorddistance * dy) / dist
    let i1 = new Point(
      chordmidpointx + (halfchordlength * dy) / dist,
      chordmidpointy - (halfchordlength * dx) / dist
    )
    let i2 = new Point(
      chordmidpointx - (halfchordlength * dy) / dist,
      chordmidpointy + (halfchordlength * dx) / dist
    )
    console.log({i1:i1,i2:i2})

    points.c1 = c1.clone().addCircle(r1)
    points.c2 = c2.clone().addCircle(r2)

    if(ci[0].x !== NaN ) {points.i0 = i1.clone()}
    if(ci[1].x !== NaN ) {points.i1 = i2.clone()}

    console.log({ pionts: JSON.parse(JSON.stringify(points)) })

    return part
*/
    const hideThis = false

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
    const waistFrontBackRatio = measurements.waistBack / measurements.waist
    const sideRatio = 1 - options.sidePanel
    // const sideRatio = 3 / 5
    const ease = options.ease + 1
    const waistToAnkle = measurements.waistToFloor - measurements.heel / Math.PI

    store.set('waistbandSize', waistbandSize)
    store.set('waistLowering', waistLowering)

    measurements['waistToAnkle'] = measurements.waistToFloor - measurements.heel / Math.PI
    const sideFixed = (((measurements.waist - measurements.waistBack) * ease) / 2) * sideRatio

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

    createWaistPoint(options, measurements, Path, points, utils, true)
    createWaistPoint(options, measurements, Path, points, utils, false)

    // console.log({ pionts: JSON.parse(JSON.stringify(points)) })

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
    points.backHips = backCrossSeam
      .shiftAlong(
        measurements.waistToHips * (measurements.waistToSeat / measurements.waistToUpperLeg)
      )
      .addCircle(4)
    ;['front', 'back'].forEach((prefix) => {
      createSidePoints(
        measurements,
        points,
        utils,
        prefix,
        'Side',
        ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
        0,
        0.1,
        ease,
        waistReduction,
        1
      )
      points[prefix + 'SideWaistband'] = points[prefix + 'SideWaist'].clone()
    })
    console.log({ pionts: JSON.parse(JSON.stringify(points)) })

    // return part
    console.log({ wb1: points.backSideWaist })
    ;['front', 'back'].forEach((prefix) => {
      ;['Ankle', 'Knee', 'UpperLeg', 'Seat'].forEach((point) => {
        const n = point == 'UpperLeg' ? 'upperLeg' : point.toLowerCase()
        const m = measurements[n] * ease * (point == 'Seat' ? 0.25 : 0.5)
        // console.log({n:prefix+point,m:m,d:points[prefix+'Side' +point].dist(points[prefix+point])-m})
      })
    })
    points.middleWaistband = points.middleWaist.clone()
    ;['front', 'back'].forEach((prefix) => {
      if (options.fixedsidepanel) {
        createSidePoints(
          measurements,
          points,
          utils,
          prefix,
          'Split',
          ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
          sideFixed,
          ease,
          waistReduction,
          (points.frontAnkle.dist(points.frontCrossSeam) + frontCrossSeam.length()) /
            (measurements.waistToFloor - measurements.heel / Math.PI)
        )
      } else {
        createSidePoints(
          measurements,
          points,
          utils,
          prefix,
          'Split',
          ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
          sideRatio,
          sideFixed,
          ease,
          waistReduction,
          (points.frontAnkle.dist(points.frontCrossSeam) + frontCrossSeam.length()) /
            (measurements.waistToFloor - measurements.heel / Math.PI)
        )
      }
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
      .setHidden(hideThis)
    paths.back = new Path()
      .move(points.backWaist)
      .curve(points.backWaistCp, points.backHipsCp2, points.backHips)
      .curve(points.backHipsCp1, points.backCrossSeamCp, points.middleCrossSeam)
      .setHidden(hideThis)

    smoothPoints(
      points,
      'front',
      'Side',
      ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
      options.smoothing
    )
    smoothPoints(
      points,
      'front',
      'Split',
      ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
      options.smoothing
    )
    smoothPoints(
      points,
      'back',
      'Side',
      ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
      options.smoothing
    )
    smoothPoints(
      points,
      'back',
      'Split',
      ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
      options.smoothing
    )
    console.log({ wb2: points.backSideWaist })

    // console.log({ pins: JSON.parse(JSON.stringify(points)) })

    paths.middle = new Path().move(points.middleWaist).line(points.middleFloor).setHidden()
    ;['front', 'back'].forEach((prefix) => {
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
      ;['Side', 'Split'].forEach((type) => {
        createPath(paths, Path, points, prefix + type, [
          prefix + type + 'Waist',
          prefix + type + 'Seat',
          prefix + type + 'UpperLeg',
          prefix + type + 'Knee',
          prefix + type + 'Ankle',
        ]).setHidden(hideThis)
      })
    })
    console.log({ wb3: points.backSideWaist })

    // console.log({ phats: JSON.parse(JSON.stringify(paths)) })
    console.log({ points: JSON.parse(JSON.stringify(points)) })
    ;['front', 'back'].forEach((prefix) => {
      ;['Waist', 'Waistband', 'Seat', 'UpperLeg', 'Knee', 'Ankle'].forEach((name) => {
        console.log({ n: prefix + 'Side' + name })
        points[prefix + 'Panel' + name] = points['middle' + name].shift(
          prefix == 'front' ? 180 : 0,
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
      ]).setHidden(hideThis)
    })
    console.log({ wb4: points.backSideWaist })

    while (Math.abs(paths.frontSplit.length() - paths.frontPanel.length()) > 1) {
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
        ]).setHidden(hideThis)
      })
    }
    console.log({ wb5: points.backSideWaist })
    // console.log({ pahts: JSON.parse(JSON.stringify(paths)) })

    if (options.length < 1) {
      const length = (1 - options.length) * (inseam - (measurements.waistToFloor - waistToAnkle))
      // console.log({i:inseam,wa:waistToAnkle,iw:(inseam/waistToAnkle),r:lengthRatio})
      ;['front', 'back'].forEach((prefix) => {
        ;['Side', 'Split', 'Panel'].forEach((type) => {
          // console.log({
          //   prefix: prefix,
          //   type: type,
          //   path: paths[prefix + type],
          //   r: paths[prefix + type].reverse(),
          //   l: length,
          //   pl: paths[prefix + type].reverse().length(),
          // })
          // console.log({ points: JSON.parse(JSON.stringify(points)) })
          // console.log({ pahts: JSON.parse(JSON.stringify(paths)) })
          points[prefix + type + 'Hem'] = paths[prefix + type].reverse().shiftAlong(length)
          paths[prefix + type] = paths[prefix + type]
            .split(points[prefix + type + 'Hem'])[0]
            .setHidden(hideThis)
        })
      })
    } else {
      ;['front', 'back'].forEach((prefix) => {
        ;['Side', 'Split', 'Panel'].forEach((type) => {
          points[prefix + type + 'Hem'] = points[prefix + type + 'Ankle']
        })
      })
    }
    console.log({ wb6: points.backSideWaist })
    ;['back'].forEach((prefix) => {
      ;['Waist', 'Seat', 'UpperLeg', 'Knee', 'Ankle'].forEach((name) => {
        points[prefix + 'Split' + name]
      })
    })

    // console.log({ pahts: JSON.parse(JSON.stringify(paths)) })
    lowerWaist(paths, Path, points, waistLowering, 'middle', 'Waist')
    ;['front', 'back'].forEach((prefix) => {
      ;['Side', 'Split', 'Panel'].forEach((type) => {
        lowerWaist(paths, Path, points, waistLowering, prefix + type, 'Waist')
      })
      lowerWaist(paths, Path, points, waistLowering, prefix, 'Waist')
    })
    ;['front', 'back'].forEach((prefix) => {
      ;['Side', 'Split', 'Panel'].forEach((type) => {
        lowerWaist(paths, Path, points, waistbandSize, prefix + type, 'Waistband')
      })
      lowerWaist(paths, Path, points, waistbandSize, prefix, 'Waistband')
    })

    console.log({ wb7: points.backSideWaist })
    ;['front', 'back'].forEach((prefix) => {
      ;['Side', 'Split', 'Panel'].forEach((type) => {
        ;['Waist', 'Seat', 'UpperLeg', 'Knee', 'Ankle'].forEach((name) => {
          points[prefix + type + name]
        })
        points[prefix + type + 'Waistband']
      })
      points[prefix + 'Waist']
      points[prefix + 'Waistband']
    })
    ;['front', 'back'].forEach((prefix) => {
      ;['Side', 'Split', 'Panel'].forEach((type) => {
        ;['Seat', 'UpperLeg', 'Knee'].forEach((name) => {
          points[prefix + type + name + 'Cp1']
          points[prefix + type + name + 'Cp2']
        })
      })
    })
    console.log({ wb9: points.backSideWaist })

    points.middleWaistband
    points.middleWaist

    console.log({ pahts: JSON.parse(JSON.stringify(paths)) })
    console.log({ pihts: JSON.parse(JSON.stringify(points)) })

    store.set(
      'waistLength',
      points.backWaist.dist(points.backSideWaist) + points.frontWaist.dist(points.frontSideWaist)
    )

    // paths.back.unhide()
    // paths.middle.unhide()
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

    if (options.Lowerwaistbandback) {
      // Lower the back a little more to get a V-shape in the back
      // lowerWaist(paths, Path, points, waistLowering * 0.5, 'back', 'Waistband')
      lowerWaist(paths, Path, points, (waistLowering + waistbandSize) * 0.5, 'back', 'Waistband')
      console.log({ wb8: points.backSideWaist })
      paths.backWaistband = new Path()
        .move(points.backWaistband)
        ._curve(points.backSplitWaistbandCp, points.backSplitWaistband)
        .hide()
    }

    store.set('waistbandBackLength', paths.backWaistband.length())
    store.set('waistbandFrontLength', paths.frontWaistband.length())
    store.set('waistbandPanelLength', points.frontPanelWaistband.dist(points.backPanelWaistband))
    console.log({
      waistbandLengthBack: paths.backWaistband.length(),
      waistbandLengthFront: paths.frontWaistband.length(),
    })

    console.log({ back: paths.back, front: paths.front })

    return part.setHidden(hideThis)
  },
}

//http://localhost:8000/new/luminous#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22waist%22%3A960%2C%22waistBack%22%3A440%2C%22hips%22%3A884%2C%22seat%22%3A980%2C%22seatBack%22%3A490%2C%22inseam%22%3A790%2C%22waistToSeat%22%3A230%2C%22waistToUpperLeg%22%3A280%2C%22waistToKnee%22%3A610%2C%22waistToHips%22%3A120%2C%22waistToFloor%22%3A1090%2C%22knee%22%3A415%2C%22ankle%22%3A230%2C%22crossSeam%22%3A800%2C%22crossSeamFront%22%3A380%2C%22heel%22%3A300%2C%22upperLeg%22%3A640%7D%7D
