export const zpoints = {
  name: 'lumina.zpoints',
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
    length: { pct: 100, min: 10, max: 100, menu: 'fit' },
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
    Snippet,
    snippets,
    utils,
    log,
    complete,
    sa,
    paperless,
    macro,
    part,
  }) => {
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

    const CreateWaistPoint = (front) => {
      // console.log({
      //   crossSeamAngle: options.crossSeamAngle,
      //   crotchPointsCP: options.crotchPointsCP,
      // })
      const kneeTemp = points.insideCrossSeam.shiftFractionTowards(
        points.insideKnee,
        options.crotchToKnee
      )
      const angle =
        90 +
        (front
          ? options.crossSeamAngle * (m.waistBack / m.waist)
          : -1 * options.crossSeamAngle * (1 - m.waistBack / m.waist))
      const crossSeam = front ? m.crossSeamFront : m.crossSeam - m.crossSeamFront
      var kneeToWaist = m.waistToKnee
      var ratio = 1
      var waist = kneeTemp.shift(angle, kneeToWaist * ratio)
      const crossSeamCp = points.insideCrossSeam.shiftFractionTowards(
        utils.beamIntersectsY(kneeTemp, waist, points.insideCrossSeam.y),
        options.crotchPointsCP
      )

      // console.log({ f: front, a: angle })
      var waistCp
      var diff,
        iter = 0
      do {
        waist = kneeTemp.shift(angle, kneeToWaist * ratio * (ratio < 1 ? 1.05 : 0.95))
        // waistCp = waist.shiftFractionTowards(kneeTemp, options.waistToKneeCP)
        waistCp = waist.shiftFractionTowards(points.insideKnee, options.waistToKneeCP)

        const crossSeamPath = new Path()
          .move(points.insideCrossSeam)
          .curve(crossSeamCp, waistCp, waist)

        diff = crossSeam - crossSeamPath.length()
        ratio = crossSeam / crossSeamPath.length()
        // console.log({ i: iter, d: diff, r: ratio })
      } while (++iter < 100 && (diff > 1 || diff < -1))
      if (iter >= 100) {
        console.log('Too many iterations trying to make it fit!')
        // log.error('Too many iterations trying to make it fit!')
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
      distanceCompentation
    ) => {
      // console.log('-----' + prefix + postfix + '----')
      var measurement,
        width,
        lastGood = 0
      for (var i = 0; i < names.length; i++) {
        var distance =
          m['waistTo' + names[i - 1]] -
          (m['waistTo' + names[i]] === undefined ? 0 : m['waistTo' + names[i]])
        switch (names[i]) {
          case 'UpperLeg':
            measurement = m['upperLeg']
            const intersect = utils.beamIntersectsCurve(
              points[prefix + names[i]],
              points[prefix + names[i]].shift(prefix == 'front' ? 180 : 0, ratioFixed * 3),
              points.insideCrossSeam,
              points[prefix + 'CrossSeamCp'],
              points[prefix + 'WaistCp'],
              points[prefix + 'Waist']
            )
            // console.log({ intersect: intersect })
            measurement += intersect.dist(points[prefix + names[i]])
            break
          case 'Waist':
            measurement = prefix == 'front' ? m.waist - m.waistBack : m.waistBack
          case 'Seat':
            measurement = prefix == 'front' ? m.seat - m.seatBack : m.seatBack
            distance *= distanceCompentation
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
            // break
            points[prefix + postfix + names[i]] = points[prefix + postfix + names[lastGood]].clone()

            points[prefix + postfix + names[lastGood]] //.addCircle(distance)
            // points[prefix +names[i]].addCircle(width < ratioFixed ? width : ratioFixed)
            points[prefix + names[i]] //.addCircle(measurement - width < ratioFixed ? width : measurement - ratioFixed)
          }
        }
      }
    }

    const SmoothPoints = (prefix, postfix, names) => {
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
          points[prefix + postfix + names[i + 1]] = points[
            prefix + postfix + names[i]
          ].shiftTowards(
            points[prefix + postfix + names[i + 2]],
            points[prefix + postfix + names[i]].dist(points[prefix + postfix + names[i + 1]])
          )
        }
      }
    }

    const m = measurements
    const crotchOffset = m.waistToFloor - m.inseam

    const waistFrontBackRatio = m.waistBack / m.waist
    const sideRatio = 3 / 5
    const ease = options.ease + 1
    const waistToAnkle = m.waistToFloor - m.heel / Math.PI

    m['waistToAnkle'] = m.waistToFloor - m.heel / Math.PI
    const sideFixed = (((m.waist - m.waistBack) * ease) / 2) * sideRatio

    points.insideWaist = new Point(0, 0)
    points.insideHips = points.insideWaist.shift(270, m.waistToHips)
    points.insideSeat = points.insideWaist.shift(270, m.waistToSeat)
    points.frontCrossSeam =
      points.backCrossSeam =
      points.insideCrossSeam =
        points.insideWaist.shift(270, crotchOffset)
    points.frontUpperLeg =
      points.backUpperLeg =
      points.insideUpperLeg =
        points.insideWaist.shift(270, m.waistToUpperLeg)
    points.frontKnee =
      points.backKnee =
      points.insideKnee =
        points.insideWaist.shift(270, m.waistToKnee)
    points.frontAnkle =
      points.backAnkle =
      points.insideAnkle =
        points.insideWaist.shift(270, waistToAnkle)
    points.frontFloor =
      points.backFloor =
      points.insideFloor =
        points.insideWaist.shift(270, m.waistToFloor)

    CreateWaistPoint(true)
    CreateWaistPoint(false)

    console.log({ pionts: JSON.parse(JSON.stringify(points)) })

    const crossSeamFront = new Path()
      .move(points.frontWaist)
      .curve(points.frontWaistCp, points.frontCrossSeamCp, points.insideCrossSeam)
    const crossSeamBack = new Path()
      .move(points.backWaist)
      .curve(points.backWaistCp, points.backCrossSeamCp, points.insideCrossSeam)

    points.frontSeat = crossSeamFront.shiftAlong(
      m.waistToSeat * (m.crossSeamFront / m.waistToUpperLeg) * 0.8
    )
    // .addCircle(6)
    points.frontHips = crossSeamFront.shiftAlong(
      m.waistToHips * (m.crossSeamFront / m.waistToUpperLeg)
    )
    // .addCircle(10)
    points.backSeat = crossSeamBack.shiftAlong(m.waistToSeat * (m.waistToSeat / m.waistToUpperLeg))
    // .addCircle(6)
    points.backHips = crossSeamBack.shiftAlong(m.waistToHips * (m.waistToSeat / m.waistToUpperLeg))
    // .addCircle(10)

    CreateSidePoints(
      'front',
      'Side',
      ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
      0,
      0.1,
      ease,
      1
    )
    CreateSidePoints(
      'back',
      'Side',
      ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
      0,
      0.1,
      ease,
      1
    )

    CreateSidePoints(
      'front',
      'Split',
      ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
      sideRatio,
      sideFixed,
      ease,
      (points.frontAnkle.dist(points.frontCrossSeam) + crossSeamFront.length()) /
        (m.waistToFloor - m.heel / Math.PI)
    )
    CreateSidePoints(
      'back',
      'Split',
      ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'],
      sideRatio,
      sideFixed,
      ease,
      (points.frontAnkle.dist(points.frontCrossSeam) + crossSeamFront.length()) /
        (m.waistToFloor - m.heel / Math.PI)
    )

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

    paths.crossSeamFront = new Path()
      .move(points.insideCrossSeam)
      .curve(points.frontCrossSeamCp, points.frontHipsCp1, points.frontHips)
      .curve(points.frontHipsCp2, points.frontWaistCp, points.frontWaist)
      .hide()
    paths.crossSeamBack = new Path()
      .move(points.insideCrossSeam)
      .curve(points.backCrossSeamCp, points.backHipsCp1, points.backHips)
      .curve(points.backHipsCp2, points.backWaistCp, points.backWaist)
      .hide()

    SmoothPoints('front', 'Side', ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'])
    SmoothPoints('front', 'Split', ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'])
    SmoothPoints('back', 'Side', ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'])
    SmoothPoints('back', 'Split', ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'])

    console.log({ pins: JSON.parse(JSON.stringify(points)) })

    paths.middle = new Path().move(points.insideUpperLeg).line(points.insideFloor).hide()
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
        ]).hide()
      })
    })

    if (1 == 2) {
      ;['front', 'back'].forEach((prefix) => {
        ;['Waist', 'Seat', 'UpperLeg', 'Knee', 'Ankle'].forEach((name) => {
          var measurement
          switch (name) {
            case 'UpperLeg':
              measurement = m.upperLeg
            case 'Waist':
              measurement = prefix == 'front' ? m.waist - m.waistBack : m.waistBack
              break
            case 'Seat':
              measurement = prefix == 'front' ? m.seat - m.seatBack : m.seatBack
              break
            default:
              measurement = m[name.toLowerCase()]
          }

          points[prefix + 'Panel' + name] = points['inside' + name].shift(
            prefix == 'front' ? 180 : 0,
            measurement / 2 - points[prefix + name].dist(points[prefix + 'Split' + name])
          ) //.addCircle(4)
        })
      })

      SmoothPoints('front', 'Panel', ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'])
      SmoothPoints('back', 'Panel', ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'])
      paths.frontPanel = new Path()
        .move(points.frontPanelAnkle)
        .line(points.frontPanelKnee)
        .line(points.frontPanelUpperLeg)
        .line(points.frontPanelSeat)
        .line(points.frontPanelWaist)
      paths.backPanel = new Path()
        .move(points.backPanelAnkle)
        .line(points.backPanelKnee)
        .line(points.backPanelUpperLeg)
        .line(points.backPanelSeat)
        .line(points.backPanelWaist)
    }
    if (1 == 1) {
      ;['front', 'back'].forEach((prefix) => {
        ;['Waist', 'Seat', 'UpperLeg', 'Knee', 'Ankle'].forEach((name) => {
          points[prefix + 'Panel' + name] = points['inside' + name].shift(
            prefix == 'front' ? 180 : 0,
            points[prefix + 'Side' + name].dist(points[prefix + 'Split' + name])
          ) //.addCircle(4)
        })
      })

      // SmoothPoints('front', 'Panel', ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'])
      // SmoothPoints('back', 'Panel', ['Ankle', 'Knee', 'UpperLeg', 'Seat', 'Waist'])
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
        ]).hide()
      })

      console.log({
        fsl: paths.frontSplit.length(),
        fpl: paths.frontPanel.length(),
        bsl: paths.backSplit.length(),
        bpl: paths.backPanel.length(),
      })
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
        ]).hide()
      })
    }

    console.log({
      fsl: paths.frontSplit.length(),
      fpl: paths.frontPanel.length(),
      bsl: paths.backSplit.length(),
      bpl: paths.backPanel.length(),
    })

    if (options.length < 1) {
      const length = (1 - options.length) * (m.inseam - (m.waistToFloor - waistToAnkle))
      console.log({ wtf: m.waistToFloor, i: m.inseam, l: length })
      // console.log({i:m.inseam,wa:waistToAnkle,iw:(m.inseam/waistToAnkle),r:lengthRatio})
      ;['front', 'back'].forEach((prefix) => {
        ;['Side', 'Split', 'Panel'].forEach((type) => {
          console.log({ n: prefix + type, l: paths[prefix + type].length() })
          points[prefix + type + 'Hem'] = paths[prefix + type].reverse().shiftAlong(length)
          paths[prefix + type] = paths[prefix + type].split(points[prefix + type + 'Hem'])[0] //.hide()
        })
      })
    } else {
      ;['front', 'back'].forEach((prefix) => {
        ;['Side', 'Split', 'Panel'].forEach((type) => {
          points[prefix + type + 'Hem'] = points[prefix + type + 'Ankle']
        })
      })
    }
    // ;['front', 'back'].forEach((prefix) => {
    //   ;['Side'].forEach((type) => {
    //     paths[prefix + type] = new Path()
    //       .move(points[prefix + type + 'Ankle'])
    //       .line(points[prefix + type + 'Knee'])
    //       .line(points[prefix + type + 'UpperLeg'])
    //       .line(points[prefix + type + 'Seat'])
    //       .line(points[prefix + type + 'Waist'])
    //   })
    // })
    // ;['front', 'back'].forEach((prefix) => {
    //   ;['Split'].forEach((type) => {
    //     paths[prefix + type +'2'] = new Path()
    //       .move(points[prefix + type + 'Ankle'])
    //       .line(points[prefix + type + 'Knee'])
    //       .line(points[prefix + type + 'UpperLeg'])
    //       .line(points[prefix + type + 'Waist'])
    //   })
    // })

    // paths.frontSplit.addClass('dotted note')
    // paths.backSplit.addClass('dotted note')
    // paths.frontSplit2.addClass('dashed lining')
    // paths.backSplit2.addClass('dashed lining')

    // console.log({d1: points.frontKnee.dist(points.frontUpperLeg),d2: points.frontSplitKnee.dist(points.frontSplitUpperLeg)})

    console.log({ pahts: JSON.parse(JSON.stringify(paths)) })
    console.log({ pihts: JSON.parse(JSON.stringify(points)) })

    // paths.frontSide = new Path()
    //   .move(points.frontSideAnkle)
    //   .line(points.frontSideKnee)
    //   .line(points.frontSideUpperLeg)
    //   .line(points.frontSideSeat)
    //   .line(points.frontSideWaist)
    return part //.hide()
  },
}

//http://localhost:8000/new/luminous#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22waist%22%3A960%2C%22waistBack%22%3A440%2C%22hips%22%3A884%2C%22seat%22%3A980%2C%22seatBack%22%3A490%2C%22inseam%22%3A790%2C%22waistToSeat%22%3A230%2C%22waistToUpperLeg%22%3A280%2C%22waistToKnee%22%3A610%2C%22waistToHips%22%3A120%2C%22waistToFloor%22%3A1090%2C%22knee%22%3A415%2C%22ankle%22%3A230%2C%22crossSeam%22%3A800%2C%22crossSeamFront%22%3A380%2C%22heel%22%3A300%2C%22upperLeg%22%3A640%7D%7D
