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
    ease: { pct: -20, min: -35, max: 10, menu: 'fit' },
    length: { pct: 35, min: 10, max: 100, menu: 'fit' },
    waistReduction: { pct: 35, min: 0, max: 60, menu: 'fit' },
    sidePanel: { pct: 25, min: 10, max: 40, menu: 'style' },
    smoothing: { pct: 85, min: 50, max: 100, menu: 'advanced' },
    crossSeamAngle: 35,
    crotchToKnee: 0.4,
    waistToKneeCP: 0.4,
    kneeToWaistLength: 400,
    crotchPointsCP: 2,
  },
  draft: ({ measurements, options, Point, Path, points, paths, utils, part }) => {
    const ControlPoints = (p1, p2, p3, t) => {
      let a = Math.abs(p2.angle(p1) - p2.angle(p3)) / 2
      const t1 = p2.shift(p2.angle(p1) + a - 90, p2.dist(p1) / 3)
      const t3 = p2.shift(p2.angle(p3) - a + 90, p2.dist(p3) / 3)
      return {
        cp1: p2.shift(p2.angle(p1) + a - 90, p2.dist(p1) / 3),
        cp3: p2.shift(p2.angle(p3) - a + 90, p2.dist(p3) / 3),
      }
    }
    const CreateControlPoints = (names) => {
      for (var i = 1; i < names.length - 1; i++) {
        var cp = ControlPoints(points[names[i - 1]], points[names[i]], points[names[i + 1]])
        points[names[i] + 'Cp1'] = cp.cp1
        points[names[i] + 'Cp2'] = cp.cp3
      }
    }
    const CreatePath = (pathName, names) => {
      paths[pathName] = new Path()
        .move(points[names[0]])
        ._curve(points[names[1] + 'Cp1'], points[names[1]])
      for (var i = 2; i < names.length - 1; i++) {
        paths[pathName].curve(
          points[names[i - 1] + 'Cp2'],
          points[names[i] + 'Cp1'],
          points[names[i]]
        )
      }
      paths[pathName].curve_(points[names[i - 1] + 'Cp2'], points[names[i]])

      return paths[pathName]
    }

    const ReduceWaist = (pathName) => {
      const newWaist = paths[pathName].shiftAlong(waistReduction)
      if (newWaist.sitsRoughlyOn(points[pathName + 'Waist'])) {
        return
      }
      points[pathName + 'Waist'] = newWaist
      const pTemp = paths[pathName].split(points[pathName + 'Waist'])
      if (pTemp.length != 2) {
        log.info('couldNotReduceWaist')
        console.log('couldNotReduceWaist')
      }
      paths[pathName] = pTemp[1]
    }

    const CreateWaistPoint = (front) => {
      const kneeTemp = points.middleCrossSeam.shiftFractionTowards(
        points.middleKnee,
        options.crotchToKnee
      )
      const angle =
        90 +
        (front
          ? options.crossSeamAngle * (m.waistBack / m.waist)
          : -1 * options.crossSeamAngle * (1 - m.waistBack / m.waist))
      const crossSeam = front ? m.crossSeamFront : m.crossSeamBack
      var kneeToWaist = m.waistToKnee
      var ratio = 1
      var waist = kneeTemp.shift(angle, kneeToWaist * ratio)
      const crossSeamCp = points.middleCrossSeam.shiftFractionTowards(
        utils.beamIntersectsY(kneeTemp, waist, points.middleCrossSeam.y),
        options.crotchPointsCP
      )

      var waistCp
      var diff,
        iter = 0
      do {
        waist = kneeTemp.shift(angle, kneeToWaist * ratio * (ratio < 1 ? 1.05 : 0.95))
        waistCp = waist.shiftFractionTowards(points.middleKnee, options.waistToKneeCP)

        const crossSeamPath = new Path()
          .move(points.middleCrossSeam)
          .curve(crossSeamCp, waistCp, waist)

        diff = crossSeam - crossSeamPath.length()
        ratio = crossSeam / crossSeamPath.length()
      } while (++iter < 100 && (diff > 1 || diff < -1))
      if (iter >= 100) {
        log.error('Too many iterations trying to make it fit!')
      }

      if (front) {
        points.frontWaist = waist.clone()
        points.frontWaistCp = waistCp.clone()
        points.frontCrossSeamCp = crossSeamCp.clone()
      } else {
        points.backWaist = waist.clone()
        points.backWaistCp = waistCp.clone()
        points.backCrossSeamCp = crossSeamCp.clone()
      }
    }

    const CreateSidePoints = (
      prefix,
      postfix,
      names,
      ratio,
      ratioFixed,
      ease,
      distanceCompensation
    ) => {
      var measurement,
        width,
        lastGood = 0
      for (var i = 0; i < names.length; i++) {
        var distance =
          m['waistTo' + names[lastGood]] -
          (m['waistTo' + names[i]] === undefined ? 0 : m['waistTo' + names[i]])
        switch (names[i]) {
          case 'UpperLeg':
            measurement = m['upperLeg']
            const intersect = utils.beamIntersectsCurve(
              points[prefix + names[i]],
              points[prefix + names[i]].shift(prefix == 'front' ? 180 : 0, ratioFixed * 100),
              points.middleCrossSeam,
              points[prefix + 'CrossSeamCp'],
              points[prefix + 'WaistCp'],
              points[prefix + 'Waist']
            )
            console.log({ prefix: prefix, name: names[i] })
            console.log({ intersect: intersect })
            console.log({ intersect: typeof intersect })
            console.log({ pins: JSON.parse(JSON.stringify(points)) })

            if (false !== intersect) {
              if (intersect.constructor === Array) {
                measurement += intersect[0].dist(points[prefix + names[i]])
              } else {
                measurement += intersect.dist(points[prefix + names[i]])
              }
            }
            break
          case 'Waist':
            measurement = prefix == 'front' ? m.waistFront : m.waistBack
          case 'Seat':
            measurement = prefix == 'front' ? m.seatFront : m.seatBack
            distance *= distanceCompensation
            break
          default:
            measurement = m[names[i].toLowerCase()]
        }
        measurement /= 2
        measurement *= ease

        width = measurement * ratio

        if (i == 0) {
          points[prefix + postfix + names[i]] = points[prefix + names[i]].shift(
            prefix == 'front' ? 180 : 0,
            measurement - width < ratioFixed ? width : measurement - ratioFixed
          ) //.addCircle(3).addCircle(6).addCircle(9)
          points[prefix + names[i]] //.addCircle(width < ratioFixed ? width : ratioFixed)
        } else {
          var ci = utils.circlesIntersect(
            points[prefix + names[i]],
            measurement - width < ratioFixed ? width : measurement - ratioFixed,
            points[prefix + postfix + names[lastGood]],
            distance
          )

          if (false !== ci) {
            points[prefix + postfix + names[i]] = ci[prefix == 'front' ? 0 : 1] //.addCircle(2).addCircle(4).addCircle(6)
            lastGood = i
          } else {
            points[prefix + postfix + names[i]] = points[prefix + postfix + names[lastGood]].clone() //.addCircle(2).addCircle(4).addCircle(6)

            points[prefix + postfix + names[lastGood]] //.addCircle(distance)
            points[prefix + names[i]] //.addCircle(width < ratioFixed ? width : ratioFixed)
            // points[prefix + names[i]].addCircle(measurement - width < ratioFixed ? width : measurement - ratioFixed)
          }
        }
      }
    }

    const SmoothPoints = (prefix, postfix, names, smoothness) => {
      var adjust
      for (var i = 0; i < names.length - 2; i++) {
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
          console.log({ prefix: prefix, postfix: postfix, smooth: names[i + 1] })
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

    const hideThis = false

    const m = measurements
    const inseam =
      m.inseam > m.waistToFloor - m.waistToUpperLeg ? m.waistToFloor - m.waistToUpperLeg : m.inseam
    const crotchOffset = m.waistToFloor - inseam
    const waistReduction = m.waistToHips * options.waistReduction
    const waistFrontBackRatio = m.waistBack / m.waist
    const sideRatio = 1 - options.sidePanel
    // const sideRatio = 3 / 5
    const ease = options.ease + 1
    const waistToAnkle = m.waistToFloor - m.heel / Math.PI

    m['waistToAnkle'] = m.waistToFloor - m.heel / Math.PI
    const sideFixed = (((m.waist - m.waistBack) * ease) / 2) * sideRatio

    points.middleWaist = new Point(0, 0)
    points.middleHips = points.middleWaist.shift(270, m.waistToHips)
    points.middleSeat = points.middleWaist.shift(270, m.waistToSeat)
    points.frontCrossSeam =
      points.backCrossSeam =
      points.middleCrossSeam =
        points.middleWaist.shift(270, crotchOffset)
    points.frontUpperLeg =
      points.backUpperLeg =
      points.middleUpperLeg =
        points.middleWaist.shift(270, m.waistToUpperLeg)
    points.frontKnee =
      points.backKnee =
      points.middleKnee =
        points.middleWaist.shift(270, m.waistToKnee)
    points.frontAnkle =
      points.backAnkle =
      points.middleAnkle =
        points.middleWaist.shift(270, waistToAnkle)
    points.frontFloor =
      points.backFloor =
      points.middleFloor =
        points.middleWaist.shift(270, m.waistToFloor)

    CreateWaistPoint(true)
    CreateWaistPoint(false)

    console.log({ pionts: JSON.parse(JSON.stringify(points)) })

    const frontCrossSeam = new Path()
      .move(points.frontWaist)
      .curve(points.frontWaistCp, points.frontCrossSeamCp, points.middleCrossSeam)
    const backCrossSeam = new Path()
      .move(points.backWaist)
      .curve(points.backWaistCp, points.backCrossSeamCp, points.middleCrossSeam)

    points.frontSeat = frontCrossSeam.shiftAlong(
      m.waistToSeat * (m.crossSeamFront / m.waistToUpperLeg) * 0.8
    )
    points.frontHips = frontCrossSeam.shiftAlong(
      m.waistToHips * (m.crossSeamFront / m.waistToUpperLeg)
    )

    points.backSeat = backCrossSeam.shiftAlong(m.waistToSeat * (m.waistToSeat / m.waistToUpperLeg))
    points.backHips = backCrossSeam.shiftAlong(m.waistToHips * (m.waistToSeat / m.waistToUpperLeg))
    ;['front', 'back'].forEach((prefix) => {
      CreateSidePoints(
        prefix,
        'Side',
        ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
        0,
        0.1,
        ease,
        1
      )
    })
    ;['front', 'back'].forEach((prefix) => {
      CreateSidePoints(
        prefix,
        'Split',
        ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
        sideRatio,
        sideFixed,
        ease,
        (points.frontAnkle.dist(points.frontCrossSeam) + frontCrossSeam.length()) /
          (m.waistToFloor - m.heel / Math.PI)
      )
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

    SmoothPoints('front', 'Side', ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'], options.smoothing)
    SmoothPoints(
      'front',
      'Split',
      ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
      options.smoothing
    )
    SmoothPoints('back', 'Side', ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'], options.smoothing)
    SmoothPoints('back', 'Split', ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'], options.smoothing)

    console.log({ pins: JSON.parse(JSON.stringify(points)) })

    paths.middle = new Path().move(points.middleWaist).line(points.middleFloor).setHidden()
    ;['front', 'back'].forEach((prefix) => {
      ;['Side', 'Split'].forEach((type) => {
        CreateControlPoints([
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
        CreatePath(prefix + type, [
          prefix + type + 'Waist',
          prefix + type + 'Seat',
          prefix + type + 'UpperLeg',
          prefix + type + 'Knee',
          prefix + type + 'Ankle',
        ]).setHidden(hideThis)
      })
    })
    console.log({ phats: JSON.parse(JSON.stringify(paths)) })
    ;['front', 'back'].forEach((prefix) => {
      ;['Waist', 'Seat', 'UpperLeg', 'Knee', 'Ankle'].forEach((name) => {
        points[prefix + 'Panel' + name] = points['middle' + name].shift(
          prefix == 'front' ? 180 : 0,
          points[prefix + 'Side' + name].dist(points[prefix + 'Split' + name])
        ) //.addCircle(4)
      })
    })
    ;['front', 'back'].forEach((prefix) => {
      CreateControlPoints([
        prefix + 'Panel' + 'Waist',
        prefix + 'Panel' + 'Seat',
        prefix + 'Panel' + 'UpperLeg',
        prefix + 'Panel' + 'Knee',
        prefix + 'Panel' + 'Ankle',
      ])
    })
    ;['front', 'back'].forEach((prefix) => {
      CreatePath(prefix + 'Panel', [
        prefix + 'Panel' + 'Waist',
        prefix + 'Panel' + 'Seat',
        prefix + 'Panel' + 'UpperLeg',
        prefix + 'Panel' + 'Knee',
        prefix + 'Panel' + 'Ankle',
      ]).setHidden(hideThis)
    })

    while (Math.abs(paths.frontSplit.length() - paths.frontPanel.length()) > 1) {
      ;['front', 'back'].forEach((prefix) => {
        const diff = paths[prefix + 'Split'].length() / paths[prefix + 'Panel'].length()
        const names = ['Waist', 'Seat', 'UpperLeg', 'Knee', 'Ankle']
        for (var i = 0; i < names.length - 1; i++) {
          points[prefix + 'Panel' + names[i]] = points[
            prefix + 'Panel' + names[i + 1]
          ].shiftFractionTowards(points[prefix + 'Panel' + names[i]], diff)
        }
      })
      ;['front', 'back'].forEach((prefix) => {
        CreateControlPoints([
          prefix + 'Panel' + 'Waist',
          prefix + 'Panel' + 'Seat',
          prefix + 'Panel' + 'UpperLeg',
          prefix + 'Panel' + 'Knee',
          prefix + 'Panel' + 'Ankle',
        ])
      })
      ;['front', 'back'].forEach((prefix) => {
        CreatePath(prefix + 'Panel', [
          prefix + 'Panel' + 'Waist',
          prefix + 'Panel' + 'Seat',
          prefix + 'Panel' + 'UpperLeg',
          prefix + 'Panel' + 'Knee',
          prefix + 'Panel' + 'Ankle',
        ]).setHidden(hideThis)
      })
    }
    console.log({ pahts: JSON.parse(JSON.stringify(paths)) })

    if (options.length < 1) {
      const length = (1 - options.length) * (inseam - (m.waistToFloor - waistToAnkle))
      // console.log({i:inseam,wa:waistToAnkle,iw:(inseam/waistToAnkle),r:lengthRatio})
      ;['front', 'back'].forEach((prefix) => {
        ;['Side', 'Split', 'Panel'].forEach((type) => {
          console.log({
            prefix: prefix,
            type: type,
            path: paths[prefix + type],
            r: paths[prefix + type].reverse(),
            l: length,
            pl: paths[prefix + type].reverse().length(),
          })
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

    ;['back'].forEach((prefix) => {
      ;['Waist', 'Seat', 'UpperLeg', 'Knee', 'Ankle'].forEach((name) => {
        points[prefix + 'Split' + name] //.addCircle(3).addCircle(6)
      })
    })

    console.log({ pahts: JSON.parse(JSON.stringify(paths)) })

    ReduceWaist('middle')
    ;['front', 'back'].forEach((prefix) => {
      ;['Side', 'Split', 'Panel'].forEach((type) => {
        ReduceWaist(prefix + type)
      })
      ReduceWaist(prefix)
    })

    console.log({ pahts: JSON.parse(JSON.stringify(paths)) })
    console.log({ pihts: JSON.parse(JSON.stringify(points)) })

    return part.setHidden(hideThis)
  },
}

//http://localhost:8000/new/luminous#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22waist%22%3A960%2C%22waistBack%22%3A440%2C%22hips%22%3A884%2C%22seat%22%3A980%2C%22seatBack%22%3A490%2C%22inseam%22%3A790%2C%22waistToSeat%22%3A230%2C%22waistToUpperLeg%22%3A280%2C%22waistToKnee%22%3A610%2C%22waistToHips%22%3A120%2C%22waistToFloor%22%3A1090%2C%22knee%22%3A415%2C%22ankle%22%3A230%2C%22crossSeam%22%3A800%2C%22crossSeamFront%22%3A380%2C%22heel%22%3A300%2C%22upperLeg%22%3A640%7D%7D
