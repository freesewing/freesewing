export const ipoints = {
  name: 'lumina.ipoints',
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
    return part.hide()

    const ControlPoints = (p1, p2, p3, t) => {
      let a = Math.abs(p2.angle(p1) - p2.angle(p3)) / 2
      console.log({ t: t, ap2_1: p2.angle(p1), ap2_3: p2.angle(p3), a: a })
      const t1 = p2.shift(p2.angle(p1) + a - 90, p2.dist(p1) / 3)
      const t3 = p2.shift(p2.angle(p3) - a + 90, p2.dist(p3) / 3)
      console.log({ t: t, ap2_t1: p2.angle(t1), ap2_t3: p2.angle(t3), a: a })
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
      console.log({ i: 1, n: names[1], p2: points[names[1] + 'Cp2'], p3: points[names[1]] })
      paths[pathName] = new Path()
        .move(points[names[0]])
        ._curve(points[names[1] + 'Cp1'], points[names[1]])
      console.log({ s: 0, l: paths[pathName].length() })
      for (var i = 2; i < names.length - 1; i++) {
        console.log({
          i: i,
          n: names[i],
          p1: points[names[i - 1] + 'Cp1'],
          p2: points[names[i] + 'Cp2'],
          p3: points[names[i]],
        })
        paths[pathName].curve(
          points[names[i - 1] + 'Cp2'],
          points[names[i] + 'Cp1'],
          points[names[i]]
        )
        console.log({
          s: i - 1,
          l: new Path()
            .move(points[names[i - 1]])
            .curve(points[names[i - 1] + 'Cp2'], points[names[i] + 'Cp1'], points[names[i]])
            .length(),
        })
      }
      console.log({ i: i, n: names[i], p2: points[names[i] + 'Cp2'], p3: points[names[i]] })
      paths[pathName].curve_(points[names[i - 1] + 'Cp2'], points[names[i]])
    }

    const CreateWaistPoint = (m, options, points, utils, front) => {
      const kneeTemp = points.upperleg.shiftFractionTowards(points.knee, options.crotchToKnee)
      const angle =
        90 +
        (front
          ? options.crossSeamAngle * (m.waistBack / m.waist)
          : -1 * options.crossSeamAngle * (1 - m.waistBack / m.waist))
      const crossSeam = front ? m.crossSeamFront : m.crossSeam - m.crossSeamFront
      var kneeToWaist = m.waistToKnee
      var ratio = 1
      var waist = kneeTemp.shift(angle, kneeToWaist * ratio)
      const crossSeamCp = points.upperleg.shiftFractionTowards(
        utils.beamIntersectsY(kneeTemp, waist, 0),
        options.crotchPointsCP
      )

      console.log({ f: front, a: angle })
      var waistCp
      var diff,
        iter = 0
      do {
        waist = kneeTemp.shift(angle, kneeToWaist * ratio * (ratio < 1 ? 1.05 : 0.95))
        // waistCp = waist.shiftFractionTowards(kneeTemp, options.waistToKneeCP)
        waistCp = waist.shiftFractionTowards(points.knee, options.waistToKneeCP)

        const crossSeamPath = new Path().move(points.upperleg).curve(crossSeamCp, waistCp, waist)

        diff = crossSeam - crossSeamPath.length()
        ratio = crossSeam / crossSeamPath.length()
        // console.log({ i: iter, d: diff, r: ratio })
      } while (++iter < 100 && (diff > 1 || diff < -1))
      if (iter >= 100) {
        console.log('Too many iterations trying to make it fit!')
        // log.error('Too many iterations trying to make it fit!')
      }

      if (front) {
        points.waistFront = waist.clone()
        points.waistFrontCp = waistCp.clone()
        points.crossSeamFrontCp = crossSeamCp.clone()
      } else {
        points.waistBack = waist.clone()
        points.waistBackCp = waistCp.clone()
        points.crossSeamBackCp = crossSeamCp.clone()
      }
    }

    const m = measurements
    const crotchOffset = m.waistToFloor - m.inseam

    const waistFrontBackRatio = m.waistBack / m.waist
    const sideRatio = 3 / 5
    const ease = options.ease + 1

    m['waistToAnkle'] = m.waistToFloor - m.heel / Math.PI

    console.log({ m: JSON.parse(JSON.stringify(m)) })
    console.log({ wfr: waistFrontBackRatio })
    // points.origin = new Point(0, 0)
    // points.knee = points.origin.shift(270, m.inseam - (m.waistToFloor - m.waistToKnee))
    // points.ankle = points.origin.shift(270, m.inseam - (m.ankle / Math.PI))
    // points.waist = points.origin.shift(90, m.waistToFloor - m.inseam)

    points.upperlegFront = points.upperlegBack = points.upperleg = new Point(0, 0)
    points.kneeFront =
      points.kneeBack =
      points.knee =
        points.upperleg.shift(270, m.waistToKnee - crotchOffset)
    points.ankleFront =
      points.ankleBack =
      points.ankle =
        points.upperleg.shift(270, m.inseam - m.heel / Math.PI)
    points.floorFront = points.floorBack = points.floor = points.upperleg.shift(270, m.inseam)

    // points.waistTemp = points.upperleg.shiftFractionTowards(points.knee,options.crotchToKnee).shift(90 + options.crossSeamAngle*(m.waistBack/m.waist), options.kneeToWaistLength)
    // paths.waistTemp = new Path()
    // .move(points.upperleg.shiftFractionTowards(points.knee,options.crotchToKnee))
    // .line(points.waistTemp)
    // points.upperlegFrontCp = utils.beamIntersectsY(points.kneeTemp,points.waistTempFront,0)
    // points.upperlegBackCp = utils.beamIntersectsY(points.kneeTemp,points.waistTempBack,0)

    CreateWaistPoint(m, options, points, utils, true)
    CreateWaistPoint(m, options, points, utils, false)

    // paths.waistTempCp = new Path()
    // .move(points.upperleg)
    // .line(points.crossSeamFrontCp)

    console.log({ pionts: JSON.parse(JSON.stringify(points)) })

    paths.middle = new Path().move(points.upperleg).line(points.floor)

    paths.crossSeamFront = new Path()
      .move(points.upperleg)
      .curve(points.crossSeamFrontCp, points.waistFrontCp, points.waistFront)
    paths.crossSeamBack = new Path()
      .move(points.upperleg)
      .curve(points.crossSeamBackCp, points.waistBackCp, points.waistBack)

    let csFront = paths.crossSeamFront.length()
    let csBack = paths.crossSeamBack.length()

    console.log({ csf: m.crossSeamFront, csFront: csFront })

    const waistAngle = utils.rad2deg(
      Math.asin((points.waistBack.y - points.waistFront.y) / (m.waist / 2))
    )

    console.log({
      r: m.crossSeamFront / m.waistToUpperLeg,
      S: m.waistToSeat * (m.crossSeamFront / m.waistToUpperLeg),
      H: m.waistToHips * (m.crossSeamFront / m.waistToUpperLeg),
    })
    points.seatFront = paths.crossSeamFront
      .reverse()
      .shiftAlong(m.waistToSeat /* * (m.crossSeamFront / m.waistToUpperLeg) */)
      .addCircle(6)
    points.hipsFront = paths.crossSeamFront
      .reverse()
      .shiftAlong(m.waistToHips /* * (m.crossSeamFront / m.waistToUpperLeg) */)
      .addCircle(10)
    points.seatBack = paths.crossSeamBack
      .reverse()
      .shiftAlong(m.waistToSeat /* * (m.waistToSeat / m.waistToUpperLeg) */)
      .addCircle(6)
    points.hipsBack = paths.crossSeamBack
      .reverse()
      .shiftAlong(m.waistToHips /* * (m.waistToSeat / m.waistToUpperLeg) */)
      .addCircle(10)

    points.waistFrontSeam = points.waistFront.shift(
      180 + waistAngle,
      ((m.waist - m.waistBack) * ease) / 2
    )
    points.waistBackSeam = points.waistBack.shift(waistAngle, (m.waistBack * ease) / 2)
    points.seatFrontSeam = points.seatFront.shift(
      180 + waistAngle,
      ((m.seat - m.seatBack) * ease) / 2
    )
    points.seatBackSeam = points.seatBack.shift(waistAngle, (m.seatBack * ease) / 2)
    points.upperlegFrontSeam = points.upperleg.shift(180 + waistAngle, (m.upperLeg * ease) / 2)
    points.upperlegBackSeam = points.upperleg.shift(waistAngle, (m.upperLeg * ease) / 2)
    points.kneeFrontSeam = points.knee.shift(180, (m.knee * ease) / 2)
    points.kneeBackSeam = points.knee.shift(0, (m.knee * ease) / 2)
    points.ankleFrontSeam = points.ankle.shift(180, (m.ankle * ease) / 2)
    points.ankleBackSeam = points.ankle.shift(0, (m.ankle * ease) / 2)

    const sideFixed = points.waistFrontSeam.dist(
      points.waistFront.shiftFractionTowards(points.waistFrontSeam, sideRatio)
    )

    paths.front = new Path()
      .move(points.ankleFrontSeam)
      .line(points.kneeFrontSeam)
      .line(points.upperlegFrontSeam)
      .line(points.seatFrontSeam)
      .line(points.waistFrontSeam)
    paths.back = new Path()
      .move(points.ankleBackSeam)
      .line(points.kneeBackSeam)
      .line(points.upperlegBackSeam)
      .line(points.seatBackSeam)
      .line(points.waistBackSeam)

    const ShiftPathPoints = (path, ratio, names) => {
      if (names.length < 2) return
      for (var i = names.length - 2; i >= 0; i--) {
        console.log({ n1: names[i].toLowerCase() + path, n2: names[i + 1].toLowerCase() + path })
        console.log({
          p1: points[names[i].toLowerCase() + path],
          p2: points[names[i + 1].toLowerCase() + path],
        })
        console.log({
          lb: points[names[i].toLowerCase() + path].dist(points[names[i + 1].toLowerCase() + path]),
        })
        points[names[i].toLowerCase() + path] = points[
          names[i].toLowerCase() + path
        ].shiftFractionTowards(points[names[i + 1].toLowerCase() + path], ratio)
        console.log({
          la: points[names[i].toLowerCase() + path].dist(points[names[i + 1].toLowerCase() + path]),
        })
      }
    }
    const shiftRatio =
      1 - (m.waistToFloor - points.floorFront.dist(points.ankleFront)) / paths.front.length()
    console.log({ shiftRatio: shiftRatio })
    ShiftPathPoints('FrontSeam', shiftRatio, [
      'Waist',
      /*'Hips',*/ 'Seat',
      'UpperLeg',
      'Knee',
      'Ankle',
    ])

    // points.waistFrontSplit = points.waistFront.shiftFractionTowards(points.waistFrontSeam, sideRatio)
    points.waistFrontSplit = points.waistFrontSeam.shiftTowards(points.waistFront, sideFixed)
    // points.waistBackSplit = points.waistBack.shiftFractionTowards(points.waistBackSeam, sideRatio)
    points.waistBackSplit = points.waistBackSeam.shiftTowards(points.waistBack, sideFixed)
    points.seatFrontSplit = points.seatFrontSeam.shiftTowards(points.seatFront, sideFixed)
    points.seatBackSplit = points.seatBackSeam.shiftTowards(points.seatBack, sideFixed)
    // points.upperlegFrontSplit = points.upperleg.shiftFractionTowards(points.upperlegFront, sideRatio)
    points.upperlegFrontSplit = points.upperlegFrontSeam.shiftTowards(points.upperleg, sideFixed)
    // points.upperlegBackSplit = points.upperleg.shiftFractionTowards(points.upperlegBack, sideRatio)
    points.upperlegBackSplit = points.upperlegBackSeam.shiftTowards(points.upperleg, sideFixed)
    points.kneeFrontSplit = points.knee.shiftFractionTowards(points.kneeFrontSeam, sideRatio)
    // points.kneeFrontSplit = points.kneeFront.shiftTowards(points.knee, sideFixed)
    points.kneeBackSplit = points.knee.shiftFractionTowards(points.kneeBackSeam, sideRatio)
    // points.kneeBackSplit = points.kneeBack.shiftTowards(points.knee, sideFixed)
    points.ankleFrontSplit = points.ankle.shiftFractionTowards(points.ankleFrontSeam, sideRatio)
    // points.ankleFrontSplit = points.ankleFront.shiftTowards(points.ankle, sideFixed)
    points.ankleBackSplit = points.ankle.shiftFractionTowards(points.ankleBackSeam, sideRatio)
    // points.ankleBackSplit = points.ankleBack.shiftTowards(points.ankle, sideFixed)

    points.seatFrontSplit = utils
      .beamsIntersect(
        points.seatFront,
        points.seatFrontSeam,
        points.waistFrontSplit,
        points.upperlegFrontSplit
      )
      .addCircle(8)

    CreateControlPoints([
      'waistFrontSplit',
      'seatFrontSplit',
      'upperlegFrontSplit',
      'kneeFrontSplit',
      'ankleFrontSplit',
    ])

    CreatePath('frontSplit', [
      'waistFrontSplit',
      'seatFrontSplit',
      'upperlegFrontSplit',
      'kneeFrontSplit',
      'ankleFrontSplit',
    ])

    CreateControlPoints([
      'waistBackSplit',
      // 'seatBackSplit',
      'upperlegBackSplit',
      'kneeBackSplit',
      'ankleBackSplit',
    ])

    CreatePath('BackSplit', [
      'waistBackSplit',
      // 'seatBackSplit',
      'upperlegBackSplit',
      'kneeBackSplit',
      'ankleBackSplit',
    ])

    points.seatBackSplit = utils
      .beamIntersectsCurve(
        points.seatBack,
        points.seatBackSeam,
        points.waistBackSplit,
        points.waistBackSplit,
        points.upperlegBackSplitCp1,
        points.upperlegBackSplit
      )
      .addCircle(8)

    var cp = ControlPoints(points.waistFrontSplit, points.upperlegFrontSplit, points.kneeFrontSplit)
    points.upperlegFrontCp1 = cp.cp1
    points.upperlegFrontCp2 = cp.cp3
    cp = ControlPoints(points.waistBackSplit, points.upperlegBackSplit, points.kneeBackSplit)
    points.upperlegBackCp1 = cp.cp1
    points.upperlegBackCp2 = cp.cp3
    cp = ControlPoints(points.upperlegFrontSplit, points.kneeFrontSplit, points.ankleFrontSplit)
    points.kneeFrontCp1 = cp.cp1
    points.kneeFrontCp2 = cp.cp3
    cp = ControlPoints(points.upperlegBackSplit, points.kneeBackSplit, points.ankleBackSplit)
    points.kneeBackCp1 = cp.cp1
    points.kneeBackCp2 = cp.cp3

    console.log({ pins: JSON.parse(JSON.stringify(points)) })

    paths.frontZ = paths.front.reverse()
    points.seatZ = paths.frontZ.shiftAlong(m.waistToSeat).addCircle(4)
    points.hipsZ = paths.frontZ.shiftAlong(m.waistToHips).addCircle(4)
    points.upperlegZ = paths.frontZ.shiftAlong(m.waistToUpperLeg).addCircle(4)
    points.kneeZ = paths.frontZ.shiftAlong(m.waistToKnee).addCircle(4)
    points.ankleZ = paths.frontZ
      .shiftAlong(m.waistToFloor - points.floor.dist(points.ankle))
      .addCircle(4)

    paths.backZ = paths.back.reverse()
    points.seatZback = paths.backZ.shiftAlong(m.waistToSeat).addCircle(4)
    points.hipsZback = paths.backZ.shiftAlong(m.waistToHips).addCircle(4)
    points.upperlegZback = paths.backZ.shiftAlong(m.waistToUpperLeg).addCircle(4)
    points.kneeZback = paths.backZ.shiftAlong(m.waistToKnee).addCircle(4)
    points.ankleZback = paths.backZ
      .shiftAlong(m.waistToFloor - points.floor.dist(points.ankle))
      .addCircle(4)

    console.log({
      pf: paths.frontZ.length(),
      pb: paths.backZ.length(),
      m: m.waistToFloor - points.floor.dist(points.ankle),
    })

    console.log({ pahts: JSON.parse(JSON.stringify(paths)) })
    points.kneeFrontSplit.addCircle(2).addCircle(4).addCircle(6).addCircle(8)
    // console.log({kfs:paths.frontSplit.split(points.seatFrontSplit)})
    // console.log({kfs:paths.frontSplit.split(points.upperlegFrontSplit)})
    console.log('--------------------------------')
    console.log({ kfs: paths.frontSplit.split(points.kneeFrontSplit) })
    // console.log({kfs:paths.frontSplit.split(points.upperlegFrontSplit)})

    points.sideWaist = new Point(200, 0)
    console.log({ p: points.sideWaist })
    points.sideWaistFront = points.sideWaist
      .shift(180 - waistAngle, points.waistFrontSplit.dist(points.waistFrontSeam))
      .addCircle(10)
    points.sideWaistBack = points.sideWaist.shift(
      -1 * waistAngle,
      points.waistBackSplit.dist(points.waistBackSeam)
    )
    const mp = ['Waist', /*'Hips',*/ 'Seat', 'UpperLeg', 'Knee', 'Ankle']
    // var pathLength = [0]
    for (var i = 1; i < mp.length; i++) {
      // console.log({ n: 'waistTo' + mp[i], m: m['waistTo' + mp[i]], pl: pathLength[i-1] })
      // console.log({T:paths.frontSplit.split(points[mp[i].toLowerCase() + 'FrontSplit'])[0].length()})
      points['side' + mp[i]] = points.sideWaist.shift(270, m['waistTo' + mp[i]]).addCircle(3)
      console.log({
        n1: 'side' + mp[i],
        n2: mp[i].toLowerCase() + 'FrontSplit',
        n3: mp[i].toLowerCase() + 'FrontSeam',
        n4: mp[i - 1].toLowerCase() + 'Front',
        n5: 'side' + mp[i - 1] + 'Front',
      })
      console.log({
        p1: points['side' + mp[i]],
        p2: points[mp[i].toLowerCase() + 'FrontSplit'],
        p3: points[mp[i].toLowerCase() + 'FrontSeam'],
        p4: points[mp[i - 1].toLowerCase() + 'Front'],
        p5: points['side' + mp[i - 1] + 'Front'],
      })
      // console.log({split:paths.frontSplit.split(points[mp[i].toLowerCase() + 'FrontSplit'])})
      // pathLength.push(paths.frontSplit.split(points[mp[i].toLowerCase() + 'FrontSplit'])[0].length())
      points['side' + mp[i]].addCircle(
        points[mp[i].toLowerCase() + 'FrontSplit'].dist(points[mp[i].toLowerCase() + 'FrontSeam'])
      )
      points['side' + mp[i]].addCircle(10)
      points['side' + mp[i]].addCircle(12)
      points['side' + mp[i]].addCircle(14)
      points['side' + mp[i - 1] + 'Front'].addCircle(
        points[mp[i].toLowerCase() + 'FrontSplit'].dist(
          points[mp[i - 1].toLowerCase() + 'FrontSplit']
        )
      )
      points['side' + mp[i - 1] + 'Front'].addCircle(2)
      points['side' + mp[i - 1] + 'Front'].addCircle(4)
      points['side' + mp[i - 1] + 'Front'].addCircle(6)
      points['side' + mp[i - 1] + 'Front'].addCircle(8)
      // console.log({l1:points[mp[i].toLowerCase() + 'FrontSplit'].dist(points[mp[i].toLowerCase() + 'FrontSeam']),l2:pathLength[i]-pathLength[i-1],pl:pathLength})
      var ci = utils.circlesIntersect(
        points['side' + mp[i]],
        points[mp[i].toLowerCase() + 'FrontSplit'].dist(points[mp[i].toLowerCase() + 'FrontSeam']),
        points['side' + mp[i - 1] + 'Front'],
        points[mp[i].toLowerCase() + 'FrontSplit'].dist(
          points[mp[i - 1].toLowerCase() + 'FrontSplit']
        )
        // pathLength[i]-pathLength[i-1]
      )
      console.log({ ci: ci })
      if (false !== ci) {
        points['side' + mp[i] + 'Front'] = ci[0].addCircle(7)
        // points['ci' +mp[i] + '1' ] = ci[1].addCircle(7)
        // points['side' + mp[i] +'Front'].addCircle(pathLength)
      }
    }

    paths.splitFront = new Path()
      .move(points.waistFrontSplit)
      ._curve(points.upperlegFrontCp1, points.upperlegFrontSplit)
      .curve(points.upperlegFrontCp2, points.kneeFrontCp1, points.kneeFrontSplit)
      .curve_(points.kneeFrontCp2, points.ankleFrontSplit)

    paths.splitBack = new Path()
      .move(points.waistBackSplit)
      ._curve(points.upperlegBackCp1, points.upperlegBackSplit)
      .curve(points.upperlegBackCp2, points.kneeBackCp1, points.kneeBackSplit)
      .curve_(points.kneeBackCp2, points.ankleBackSplit)

    console.log({ pahts: JSON.parse(JSON.stringify(paths)) })
    console.log({ pins: JSON.parse(JSON.stringify(points)) })

    console.log({
      Split: paths.frontSplit.length(),
      M: m.waistToFloor - points.floorFront.dist(points.ankleFront),
    })
    return part
  },
}
