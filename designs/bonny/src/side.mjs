function draftSide({ measurements, Point, Path, points, paths, complete, store, utils, part }) {
  function safeSplit(path, point) {
    let result = [new Path(), new Path()]
    let beforeSplit = true
    for (const op of path.ops) {
      if (beforeSplit) {
        result[0].ops.push(op)
        if (op.to.sitsOn(point)) {
          beforeSplit = false
          result[1].move(op.to)
        }
      } else {
        result[1].ops.push(op)
      }
    }
    if (beforeSplit) {
      result = path.split(point)
      if (result[0] === null && result[1] === null) {
        result[1] = path
      }
      if (result[0] === null) result[0] = new Path().move(path.start()).close()
      if (result[1] === null) result[1] = new Path().move(path.end()).close()
    }
    return result
  }

  const sideOffset = measurements.shoulderToShoulder * 1.6

  // The 'bg' that we use here must match the id we set on the SVG tag
  // snippets.backgroundSide = new Snippet('side', new Point(-170 + sideOffset, -1660)).attr(
  //   'data-scale',
  //   0.631
  // )

  points.sideFloor = new Point(sideOffset, 0)

  points.sideAnkle = new Point(sideOffset, -measurements.heel * 0.35)

  points.sideWaist = new Point(sideOffset, -measurements.waistToFloor)

  points.sideHips = points.sideWaist.shift(-90, measurements.waistToHips)

  points.sideSeat = points.sideWaist.shift(-90, measurements.waistToSeat)

  points.sideKnee = points.sideWaist.shift(-90, measurements.waistToKnee)

  points.sideCrotch = points.sideWaist.shift(-90, measurements.waistToUpperLeg)

  points.sideUnderbust = points.sideWaist.shift(90, measurements.waistToUnderbust)

  const y = measurements.bustPointToUnderbust
  const x = Math.min(y, 0.3 * (measurements.chest - measurements.underbust))
  const bustPointToUnderbust = Math.sqrt(y * y - x * x)
  points.sideBust1 = points.sideUnderbust.shift(90, bustPointToUnderbust)

  points.sideArmpit = points.sideWaist.shift(90, measurements.waistToArmpit)

  points.sideNeck = points.sideWaist.shift(90, measurements.hpsToWaistBack * 0.88)

  points.sideBust2 = points.sideNeck.shift(-90, measurements.hpsToBust * 0.82)

  points.sideBust = points.sideBust1.shiftFractionTowards(points.sideBust2, 0.5)

  points.sideShoulder = points.sideNeck.shift(
    -90,
    (Math.sin((measurements.shoulderSlope / 180) * Math.PI) * measurements.shoulderToShoulder) / 2
  )
  points.sideHead = points.sideNeck.shift(90, measurements.head * 0.43)

  points.sideArmStart = points.sideArmpit.shiftFractionTowards(points.sideWaist, 0.1)

  points.sideElbow = points.sideShoulder.shift(-90, measurements.shoulderToElbow * 0.95)
  points.sideWrist = points.sideShoulder.shift(-90, measurements.shoulderToWrist * 0.95)
  // points.sideFloor.addText('points.sideFloor')
  // points.sideWaist.addText('points.sideWaist')
  // points.sideHips.addText('points.sideHips')
  // points.sideSeat.addText('points.sideSeat')
  // points.sideKnee.addText('points.sideKnee')
  // points.sideCrotch.addText('points.sideCrotch')
  // points.sideArmpit.addText('points.sideArmpit')
  // points.sideShoulder.addText('points.sideShoulder')
  // points.sideNeck.addText('points.sideNeck')
  // points.sideHead.addText('points.sideHead')
  // points.sideBust.addText('points.sideBust')
  // points.sideUnderbust.addText('points.sideUnderbust')
  // points.sideElbow.addText('points.sideElbow')
  // points.sideWrist.addText('points.sideWrist')

  points.sideFootBottom = points.sideFloor.shift(180, measurements.heel * 0.3)
  points.sideToeBottom = points.sideFloor.shift(180, measurements.heel * 0.5)
  points.sideToeTop = points.sideToeBottom.shift(135, measurements.heel * 0.08)
  points.sideHeelBottom = points.sideFloor.shift(0, measurements.heel * 0.1)
  points.sideHeelBack = points.sideHeelBottom.shift(20, measurements.heel * 0.09)
  points.sideToeGap = points.sideFootBottom.shift(175, measurements.heel * 0.15)

  points.sideHeelFront = points.sideHeelBack.shift(145, measurements.heel * 0.39)
  points.sideFootBottomCp1 = points.sideFootBottom.shift(0, measurements.heel * 0.1)
  points.sideFootBottomCp2 = points.sideFootBottom.shift(180, measurements.heel * 0.1)
  points.sideToeGapCp1 = points.sideToeGap.shift(0, measurements.heel * 0.05)
  points.sideToeGapCp2 = points.sideToeGap.shift(180, measurements.heel * 0.03)

  points.sideToeBottomCp1 = points.sideToeBottom.shift(0, measurements.heel * 0.03)
  points.sideToeBottomCp2 = points.sideToeBottom.shift(180, measurements.heel * 0.05)

  points.sideToeTopCp1 = points.sideToeTop.shift(195, measurements.heel * 0.03)
  points.sideToeTopCp2 = points.sideToeTop.shift(15, measurements.heel * 0.03)

  points.sideAnkleFront = points.sideAnkle.shift(180, measurements.ankle * 0.11)
  points.sideAnkleBack = points.sideAnkle.shift(0, measurements.ankle * 0.26)

  points.sideHeelFrontCp1 = points.sideHeelFront.shift(220, measurements.ankle * 0.36)
  points.sideHeelFrontCp2 = points.sideHeelFront.shift(40, measurements.ankle * 0.05)

  points.sideAnkleFrontCp1 = points.sideAnkleFront.shift(250, measurements.ankle * 0.05)
  points.sideAnkleFrontCp2 = points.sideAnkleFront.shift(70, measurements.ankle * 0.2)

  points.sideAnkleBackCp1 = points.sideAnkleBack.shift(85, measurements.ankle * 0.2)
  points.sideAnkleBackCp2 = points.sideAnkleBack.shift(-95, measurements.ankle * 0.1)

  points.sideHeelBackCp1 = points.sideHeelBack.shift(45, measurements.ankle * 0.1)
  points.sideHeelBackCp2 = points.sideHeelBack.shift(225, measurements.ankle * 0.05)

  points.sideCalf = points.sideKnee
    .shiftFractionTowards(points.sideAnkle, 0.2)
    .shift(0, points.sideKnee.dy(points.sideAnkle) * 0.06)
  points.sideCalfFront = points.sideCalf.shift(180, measurements.knee * 0.17)
  points.sideCalfBack = points.sideCalf.shift(0, measurements.knee * 0.16)

  points.sideKneeFront = points.sideKnee.shift(180, measurements.knee * 0.18)
  points.sideKneeBack = points.sideKnee.shift(0, measurements.knee * 0.16)

  points.sideSeatFront = points.sideSeat.shift(
    180,
    (measurements.seat - measurements.seatBack) * 0.2
  )
  points.sideSeatBack = points.sideSeat.shift(
    0,
    measurements.seatBack * 0.07 + measurements.seat * 0.1
  )

  points.sideLegFront = points.sideSeat.shift(
    180,
    (measurements.seat - measurements.seatBack) * 0.18
  )
  points.sideLegFork = points.sideSeat.shift(
    195,
    (measurements.seat - measurements.seatBack) * 0.19
  )

  points.sideUpperLegFront = utils.beamIntersectsY(
    points.sideLegFront,
    points.sideLegFork,
    points.sideCrotch.y
  )
  points.sideUpperLegBack = points.sideUpperLegFront.shift(0, measurements.upperLeg * 0.32)

  points.sideSeatBackCp1 = points.sideSeatBack.shift(90, points.sideSeat.dy(points.sideHips) * -0.4)
  points.sideSeatBackCp2 = points.sideSeatBack.shift(
    -90,
    points.sideSeat.dy(points.sideCrotch) * 0.4
  )
  points.sideUpperLegCp1 = points.sideUpperLegBack.shift(60, measurements.upperLeg * 0.07)
  points.sideUpperLegCp2 = points.sideUpperLegBack.shift(60, measurements.upperLeg * -0.07)

  const hipsBack = measurements.waistBack * 0.11 + measurements.seatBack * 0.1
  points.sideHipsBack = points.sideHips.shift(0, hipsBack)
  points.sideHipsFront = points.sideHips.shift(180, measurements.hips * 0.25 - hipsBack)

  points.sideWaistFront = points.sideWaist.shift(
    180,
    (measurements.waist - measurements.waistBack) * 0.3
  )
  points.sideWaistBack = points.sideWaist.shift(0, measurements.waistBack * 0.2)

  points.sideUnderbustFront = points.sideUnderbust.shift(180, measurements.underbust * 0.13)
  points.sideUnderbustBack = points.sideUnderbust.shift(0, measurements.underbust * 0.11)

  points.sideNeckFront = points.sideNeck.shift(235, measurements.neck * 0.14)
  points.sideNeckBack = points.sideNeck.shift(-15, measurements.neck * 0.17)

  points.sideUpperNeckFront = points.sideNeck.shift(168, measurements.head * 0.1)
  points.sideChin = points.sideNeck.shift(168, measurements.head * 0.19)
  points.sideUpperChin = points.sideNeck.shift(158, measurements.head * 0.215)
  points.sideLowerLip = points.sideNeck.shift(156, measurements.head * 0.23)
  points.sideMouth = points.sideNeck.shift(150, measurements.head * 0.22)
  points.sideUpperLip = points.sideNeck.shift(151, measurements.head * 0.25)
  points.sideBelowNose = points.sideNeck.shift(145, measurements.head * 0.26)
  points.sideNose = points.sideNeck.shift(143, measurements.head * 0.29)
  points.sideEyeFront = points.sideNeck.shift(130, measurements.head * 0.305)
  points.sideHeadFront = points.sideNeck.shift(126, measurements.head * 0.345)
  points.sideHeadBack = points.sideNeck.shift(58, measurements.head * 0.29)
  points.sideUpperNeckBack = points.sideNeck.shift(53, measurements.head * 0.16)

  points.sideOuterNose = points.sideNeck.shift(143, measurements.head * 0.27)
  points.sideInnerNose = points.sideNeck.shift(142, measurements.head * 0.258)

  points.sideMouthCp1 = points.sideNeck.shift(152, measurements.head * 0.24)

  points.sideNoseCp1 = points.sideNeck.shift(146, measurements.head * 0.285)
  points.sideNoseCp2 = points.sideNoseCp1.shiftFractionTowards(points.sideNose, 2)

  points.sideEyeFrontCp1 = points.sideEyeFront.shift(-90, measurements.head * 0.01)
  points.sideEyeFrontCp2 = points.sideEyeFront.shift(90, measurements.head * 0.01)

  points.sideEyeBottom = points.sideNeck.shift(130, measurements.head * 0.283)
  points.sideEyeDown = points.sideNeck.shift(129, measurements.head * 0.29)
  points.sideEyeDart = points.sideNeck.shift(126, measurements.head * 0.29)
  points.sideEyeUp = points.sideNeck.shift(127, measurements.head * 0.305)
  points.sideEyeTop = points.sideNeck.shift(126.3, measurements.head * 0.313)
  points.sideEyeCenter = points.sideNeck.shift(127.5, measurements.head * 0.295)

  points.sideEarTop = points.sideNeck.shift(96, measurements.head * 0.24)
  points.sideEarBack = points.sideNeck.shift(86, measurements.head * 0.2)
  points.sideEarBottom = points.sideNeck.shift(96, measurements.head * 0.155)
  points.sideEarTip = points.sideNeck.shift(102, measurements.head * 0.153)
  points.sideOuterEar = points.sideNeck.shift(100, measurements.head * 0.18)
  points.sideInnerEar = points.sideNeck.shift(92, measurements.head * 0.185)

  points.sideEarTopCp2 = points.sideEarTop.shift(30, measurements.head * 0.03)
  points.sideEarBackCp1 = points.sideEarBack.shift(90, measurements.head * 0.025)
  points.sideEarBackCp2 = points.sideEarBack.shift(-90, measurements.head * 0.02)
  points.sideEarBottomCp1 = points.sideEarBottom.shift(50, measurements.head * 0.02)
  points.sideEarBottomCp2 = points.sideEarBottom.shift(230, measurements.head * 0.005)

  paths.sideEye = new Path()
    .move(points.sideEyeTop)
    .line(points.sideEyeUp)
    .line(points.sideEyeDart)
    .line(points.sideEyeDown)
    .line(points.sideEyeBottom)
    .move(points.sideEyeUp)
    .line(points.sideEyeCenter)
    .attr('class', 'stroke-xl')

  paths.sideNose = new Path()
    .move(points.sideInnerNose)
    .line(points.sideOuterNose)
    .attr('class', 'stroke-xl')

  paths.sideEar = new Path()
    .move(points.sideEarTop)
    .curve(points.sideEarTopCp2, points.sideEarBackCp1, points.sideEarBack)
    .curve(points.sideEarBackCp2, points.sideEarBottomCp1, points.sideEarBottom)
    .curve_(points.sideEarBottomCp2, points.sideEarTip)
    .move(points.sideOuterEar)
    .line(points.sideInnerEar)
    .attr('class', 'stroke-xl')

  points.sideShoulderFront = points.sideNeck
    .shiftFractionTowards(points.sideBust, 0.75)
    .shift(150, measurements.highBustFront * 0.18)

  points.sideShoulderBack = points.sideNeck
    .shiftFractionTowards(points.sideArmpit, 0.5)
    .shift(0, (measurements.highBust - measurements.highBustFront) * 0.266)
  points.sideShoulderBackLow = points.sideArmpit.shift(
    0,
    (measurements.chest - measurements.bustFront) * 0.14 +
      (measurements.highBust - measurements.highBustFront) * 0.13
  )

  points.sideBustBack = utils.beamIntersectsY(
    points.sideShoulderBackLow,
    points.sideUnderbustBack,
    points.sideBust.y
  )
  points.sideBustFront = points.sideBustBack.shift(180, measurements.chest * 0.24)
  points.sideBustFrontExtension = points.sideUnderbustFront
    .shiftFractionTowards(points.sideBust, 0.35)
    .shiftFractionTowards(points.sideBustFront, 0.18)

  points.sideBustFrontCp1 = points.sideBustFront.shift(-90, measurements.bustPointToUnderbust * 0.4)
  points.sideBustFrontCp2 = points.sideBustFront.shift(90, measurements.bustFront * 0.03)

  points.sideUnderbustFrontCp1 = points.sideUnderbustFront.shift(-15, measurements.underbust * 0.02)
  points.sideUnderbustFrontCp2 = points.sideUnderbustFront.shift(
    -45,
    measurements.underbust * -0.005
  )

  points.sideBustFrontExtensionCp2 = points.sideBustFrontExtension.shift(
    -100,
    measurements.underbust * 0.02
  )

  points.sideBustPointLeft = points.sideBustFront.shiftFractionTowards(points.sideBust, 0.01)
  points.sideBustPointRight = points.sideBustFront.shiftFractionTowards(points.sideBust, 0.08)
  points.sideBustPointCenter = points.sideBustPointLeft.shiftFractionTowards(
    points.sideBustPointRight,
    0.5
  )
  points.sideBustPointUp = points.sideBustPointCenter.shift(90, measurements.bustFront * 0.01)
  points.sideBustPointDown = points.sideBustPointCenter.shift(-90, measurements.bustFront * 0.02)
  points.sideBustPointUpLeft = new Point(points.sideBustPointLeft.x, points.sideBustPointUp.y)
  points.sideBustPointDownLeft = new Point(points.sideBustPointLeft.x, points.sideBustPointDown.y)
  points.sideBustPointUpRight = new Point(points.sideBustPointRight.x, points.sideBustPointUp.y)
  points.sideBustPointDownRight = new Point(points.sideBustPointRight.x, points.sideBustPointDown.y)

  points.sideShoulderFrontCp1 = points.sideShoulderFront.shift(
    points.sideBustFront.angle(points.sideNeckFront),
    measurements.highBustFront * -0.04
  )
  points.sideShoulderFrontCp2 = points.sideShoulderFront.shift(
    points.sideBustFront.angle(points.sideNeckFront),
    measurements.highBustFront * 0.14
  )

  points.sideArmTopFront = points.sideArmStart.shift(135, measurements.biceps * 0.18)
  points.sideUpperArmFront = points.sideArmStart.shift(220, measurements.biceps * 0.09)
  points.sideElbowFront = points.sideElbow.shift(180, measurements.biceps * 0.05)
  points.sideWristFront = points.sideWrist.shift(180, measurements.wrist * 0.07)
  points.sideWristBack = points.sideWrist.shift(0, measurements.wrist * 0.24)
  points.sideElbowBack = points.sideElbow.shift(0, measurements.biceps * 0.22)
  points.sideUpperArmBack = points.sideArmStart.shift(-40, measurements.biceps * 0.34)
  points.sideArmTopBack = points.sideArmStart.shift(27, measurements.biceps * 0.31)

  points.sideArmTopFrontCp2 = points.sideArmTopFront.shift(-60, measurements.biceps * 0.08)
  points.sideUpperArmFrontCp1 = points.sideUpperArmFront.shift(87, measurements.biceps * 0.03)
  points.sideUpperArmFrontCp2 = points.sideUpperArmFront.shift(-93, measurements.biceps * 0.2)
  points.sideElbowFrontCp1 = points.sideElbowFront.shift(97, measurements.biceps * 0.2)
  points.sideElbowFrontCp2 = points.sideElbowFront.shift(-83, measurements.biceps * 0.1)
  points.sideWristFrontCp1 = points.sideWristFront.shift(87, measurements.wrist * 0.2)
  points.sideWristFrontCp2 = points.sideWristFront.shift(-93, measurements.wrist * 0.05)
  points.sideWristBackCp1 = points.sideWristBack.shift(-95, measurements.wrist * 0.05)
  points.sideWristBackCp2 = points.sideWristBack.shift(85, measurements.wrist * 0.2)
  points.sideElbowBackCp1 = points.sideElbowBack.shift(-85, measurements.biceps * 0.1)
  points.sideElbowBackCp2 = points.sideElbowBack.shift(95, measurements.biceps * 0.1)
  points.sideUpperArmBackCp1 = points.sideUpperArmBack.shift(-90, measurements.biceps * 0.15)
  points.sideUpperArmBackCp2 = points.sideUpperArmBack.shift(90, measurements.biceps * 0.15)
  points.sideArmTopBackCp1 = points.sideArmTopBack.shift(-95, measurements.biceps * 0.15)

  points.sideHeadFrontCp2 = points.sideHeadFront.shift(90, measurements.head * 0.06)
  points.sideHeadCp1 = points.sideHead.shift(175, measurements.head * 0.14)
  points.sideHeadCp2 = points.sideHead.shift(-5, measurements.head * 0.12)

  points.sideHeadBackCp1 = points.sideHeadBack.shift(80, measurements.head * 0.1)
  points.sideHeadBackCp2 = points.sideHeadBack.shift(-100, measurements.head * 0.07)

  points.sideUpperNeckBackCp1 = points.sideUpperNeckBack.shift(80, measurements.head * 0.03)
  points.sideUpperNeckBackCp2 = points.sideUpperNeckBack.shift(-100, measurements.head * 0.05)

  points.sideNeckBackCp1 = points.sideNeckBack.shift(120, measurements.head * 0.05)
  points.sideNeckBackCp2 = points.sideNeckBack.shift(-60, measurements.head * 0.05)

  points.sideShoulderBackCp1 = points.sideShoulderBack.shift(100, measurements.highBust * 0.04)
  points.sideShoulderBackCp2 = points.sideShoulderBack.shift(-80, measurements.highBust * 0.04)

  points.sideShoulderBackLowCp1 = points.sideShoulderBackLow.shift(80, measurements.highBust * 0.02)
  points.sideShoulderBackLowCp2 = points.sideShoulderBackLow.shift(
    -100,
    measurements.highBust * 0.01
  )

  points.sideChinCp1 = points.sideChin.shift(-40, measurements.head * 0.02)
  points.sideChinCp2 = points.sideChin.shift(140, measurements.head * 0.02)

  points.sideUpperChinCp1 = points.sideUpperChin.shift(-60, measurements.head * 0.01)
  points.sideUpperChinCp2 = points.sideUpperChin.shift(120, measurements.head * 0.01)

  points.sideUpperNeckFrontCp1 = points.sideUpperNeckFront.shift(-40, measurements.head * 0.02)
  points.sideUpperNeckFrontCp2 = points.sideUpperNeckFront.shift(140, measurements.head * 0.02)

  points.sideShoulderCp1 = points.sideNeckFront.shift(-80, measurements.head * 0.03)
  points.sideShoulderCp2 = points.sideNeckFront.shift(100, measurements.head * 0.03)

  points.sideUpperLegFrontCp1 = points.sideLegFork.shiftFractionTowards(
    points.sideUpperLegFront,
    2.4
  )

  points.sideKneeFrontCp1 = points.sideKneeFront.shift(-80, measurements.knee * 0.1)
  points.sideKneeFrontCp2 = points.sideKneeFront.shift(100, measurements.knee * 0.5)

  points.sideCalfFrontCp1 = points.sideCalfFront.shift(-85, measurements.knee * 0.1)
  points.sideCalfFrontCp2 = points.sideCalfFront.shift(95, measurements.knee * 0.1)

  points.sideKneeBackCp1 = points.sideKneeBack.shift(95, measurements.knee * 0.1)
  points.sideKneeBackCp2 = points.sideKneeBack.shift(-85, measurements.knee * 0.05)

  points.sideCalfBackCp1 = points.sideCalfBack.shift(105, measurements.knee * 0.1)
  points.sideCalfBackCp2 = points.sideCalfBack.shift(-75, measurements.knee * 0.2)

  points.sideSeatFrontCp1 = points.sideSeatFront.shift(
    points.sideLegFront.angle(points.sideHipsFront),
    measurements.seat * -0.01
  )
  points.sideSeatFrontCp2 = points.sideSeatFront.shift(
    points.sideLegFront.angle(points.sideHipsFront),
    measurements.seat * 0.05
  )

  points.sideHipsFrontCp1 = points.sideHipsFront.shift(
    points.sideSeatFront.angle(points.sideWaistFront),
    measurements.hips * -0.06
  )
  points.sideHipsFrontCp2 = points.sideHipsFront.shift(
    points.sideSeatFront.angle(points.sideWaistFront),
    measurements.hips * 0.06
  )

  points.sideWaistFrontCp1 = points.sideWaistFront.shift(
    points.sideHipsFront.angle(points.sideUnderbustFront) + 5,
    measurements.waist * -0.05
  )
  points.sideWaistFrontCp2 = points.sideWaistFront.shift(
    points.sideHipsFront.angle(points.sideUnderbustFront) + 5,
    measurements.waist * 0.05
  )

  points.sideUnderbustBackCp1 = points.sideUnderbustBack.shift(
    points.sideShoulderBackLow.angle(points.sideWaistBack),
    measurements.underbust * -0.03
  )
  points.sideUnderbustBackCp2 = points.sideUnderbustBack.shift(
    points.sideShoulderBackLow.angle(points.sideWaistBack),
    measurements.underbust * 0.03
  )

  points.sideWaistBackCp1 = points.sideWaistBack.shift(
    points.sideUnderbustBack.angle(points.sideHipsBack),
    measurements.waist * -0.03
  )
  points.sideWaistBackCp2 = points.sideWaistBack.shift(
    points.sideUnderbustBack.angle(points.sideHipsBack),
    measurements.waist * 0.03
  )

  points.sideHipsBackCp1 = points.sideHipsBack.shift(
    points.sideWaistBack.angle(points.sideSeatBack),
    measurements.hips * -0.05
  )
  points.sideHipsBackCp2 = points.sideHipsBack.shift(
    points.sideWaistBack.angle(points.sideSeatBack),
    measurements.hips * 0.05
  )

  points.sideLegForkCp1 = points.sideLegFork.shift(
    points.sideCrotch.angle(points.sideSeat) + 20,
    measurements.crossSeam * 0.01
  )

  points.sideHipsBackCp3 = points.sideHipsBack.shiftFractionTowards(points.sideHipsBackCp2, 0.8)

  points.sideHandA = points.sideWrist.shift(223, measurements.wrist * 0.4)
  points.sideHandB = points.sideWrist.shift(226, measurements.wrist * 0.5)
  points.sideHandC = points.sideWrist.shift(228, measurements.wrist * 0.63)
  points.sideHandD = points.sideWrist.shift(233, measurements.wrist * 0.8)
  points.sideHandE = points.sideWrist.shift(243, measurements.wrist * 0.52)
  points.sideHandF = points.sideWrist.shift(253, measurements.wrist * 0.7)
  points.sideHandG = points.sideWrist.shift(259, measurements.wrist * 1.17)
  points.sideHandH = points.sideWrist.shift(263, measurements.wrist * 0.73)
  points.sideHandI = points.sideWrist.shift(268, measurements.wrist * 1.23)
  points.sideHandJ = points.sideWrist.shift(272.5, measurements.wrist * 0.73)
  points.sideHandK = points.sideWrist.shift(275, measurements.wrist * 1.18)
  points.sideHandL = points.sideWrist.shift(282, measurements.wrist * 0.7)
  points.sideHandM = points.sideWrist.shift(283, measurements.wrist * 1.01)
  points.sideHandN = points.sideWrist.shift(291, measurements.wrist * 0.7)
  points.sideHandO = points.sideWrist.shift(314, measurements.wrist * 0.4)

  points.sideHandACp1 = points.sideHandA.shift(50, measurements.wrist * 0.05)
  points.sideHandACp2 = points.sideHandA.shift(50, measurements.wrist * -0.05)
  points.sideHandBCp1 = points.sideHandB.shift(50, measurements.wrist * 0.05)
  points.sideHandBCp2 = points.sideHandB.shift(50, measurements.wrist * -0.05)
  points.sideHandCCp1 = points.sideHandC.shift(50, measurements.wrist * 0.05)
  points.sideHandCCp2 = points.sideHandC.shift(50, measurements.wrist * -0.05)
  points.sideHandDCp1 = points.sideHandD.shift(65, measurements.wrist * 0.05)
  points.sideHandDCp2 = points.sideHandD.shift(-15, measurements.wrist * 0.1)
  points.sideHandECp1 = points.sideHandE.shift(150, measurements.wrist * 0.05)
  points.sideHandECp2 = points.sideHandE.shift(150, measurements.wrist * -0.05)
  points.sideHandFCp1 = points.sideHandF.shift(79, measurements.wrist * 0.05)
  points.sideHandFCp2 = points.sideHandF.shift(79, measurements.wrist * -0.45)
  points.sideHandGCp1 = points.sideHandG.shift(-10, measurements.wrist * -0.05)
  points.sideHandGCp2 = points.sideHandG.shift(-10, measurements.wrist * 0.05)
  points.sideHandHCp1 = points.sideHandH.shift(-103, measurements.wrist * 0.35)
  points.sideHandHCp2 = points.sideHandH.shift(-92, measurements.wrist * 0.48)
  points.sideHandICp1 = points.sideHandI.shift(-5, measurements.wrist * -0.05)
  points.sideHandICp2 = points.sideHandI.shift(-5, measurements.wrist * 0.05)
  points.sideHandJCp1 = points.sideHandJ.shift(-95, measurements.wrist * 0.45)
  points.sideHandJCp2 = points.sideHandJ.shift(-87, measurements.wrist * 0.4)
  points.sideHandKCp1 = points.sideHandK.shift(0, measurements.wrist * -0.05)
  points.sideHandKCp2 = points.sideHandK.shift(0, measurements.wrist * 0.05)
  points.sideHandLCp1 = points.sideHandL.shift(-90, measurements.wrist * 0.43)
  points.sideHandLCp2 = points.sideHandL.shift(-80, measurements.wrist * 0.25)
  points.sideHandMCp1 = points.sideHandM.shift(5, measurements.wrist * -0.05)
  points.sideHandMCp2 = points.sideHandM.shift(5, measurements.wrist * 0.05)
  points.sideHandNCp1 = points.sideHandN.shift(-85, measurements.wrist * 0.29)
  points.sideHandNCp2 = points.sideHandN.shift(-85, measurements.wrist * -0.1)
  points.sideHandOCp1 = points.sideHandO.shift(-90, measurements.wrist * 0.1)
  points.sideHandOCp2 = points.sideHandO.shift(-90, measurements.wrist * -0.1)

  paths.sideOutline = new Path()
    .move(points.sideHeelBottom)
    .line(points.sideFootBottom)
    .curve(points.sideFootBottomCp2, points.sideToeGapCp1, points.sideToeGap)
    .curve(points.sideToeGapCp2, points.sideToeBottomCp1, points.sideToeBottom)
    .curve(points.sideToeBottomCp2, points.sideToeTopCp1, points.sideToeTop)
    .curve(points.sideToeTopCp2, points.sideHeelFrontCp1, points.sideHeelFront)
    .curve(points.sideHeelFrontCp2, points.sideAnkleFrontCp1, points.sideAnkleFront)
    .curve(points.sideAnkleFrontCp2, points.sideCalfFrontCp1, points.sideCalfFront)
    .curve(points.sideCalfFrontCp2, points.sideKneeFrontCp1, points.sideKneeFront)
    .curve(points.sideKneeFrontCp2, points.sideUpperLegFrontCp1, points.sideUpperLegFront)
    .line(points.sideLegFork)
    .line(points.sideLegFront)
    .move(points.sideLegFork)
    .curve(points.sideLegForkCp1, points.sideSeatFrontCp1, points.sideSeatFront)
    .curve(points.sideSeatFrontCp2, points.sideHipsFrontCp1, points.sideHipsFront)
    .curve(points.sideHipsFrontCp2, points.sideWaistFrontCp1, points.sideWaistFront)
    .curve_(points.sideWaistFrontCp2, points.sideUnderbustFront)

  if (
    points.sideBustFront.dx(points.sideUnderbustFront) >
    points.sideUnderbustFront.dx(points.sideBustFrontExtension) * 0.5
  ) {
    store.showBust = 1
    paths.sideOutline
      .move(points.sideBustFrontExtension)
      .curve(
        points.sideBustFrontExtensionCp2,
        points.sideUnderbustFrontCp1,
        points.sideUnderbustFront
      )
  }

  paths.sideOutline
    .curve(points.sideUnderbustFrontCp2, points.sideBustFrontCp1, points.sideBustFront)
    .curve(points.sideBustFrontCp2, points.sideShoulderFrontCp1, points.sideShoulderFront)
    .curve(points.sideShoulderFrontCp2, points.sideShoulderCp1, points.sideNeckFront)
    .curve(points.sideShoulderCp2, points.sideUpperNeckFrontCp1, points.sideUpperNeckFront)
    .curve(points.sideUpperNeckFrontCp2, points.sideChinCp1, points.sideChin)
    .curve(points.sideChinCp2, points.sideUpperChinCp1, points.sideUpperChin)
    .curve_(points.sideUpperChinCp2, points.sideLowerLip)
    ._curve(points.sideMouthCp1, points.sideMouth)
    ._curve(points.sideMouthCp1, points.sideUpperLip)
    .line(points.sideBelowNose)
    ._curve(points.sideNoseCp1, points.sideNose)
    .curve(points.sideNoseCp2, points.sideEyeFrontCp1, points.sideEyeFront)
    .curve_(points.sideEyeFrontCp2, points.sideHeadFront)
    .curve(points.sideHeadFrontCp2, points.sideHeadCp1, points.sideHead)
    .curve(points.sideHeadCp2, points.sideHeadBackCp1, points.sideHeadBack)
    .curve(points.sideHeadBackCp2, points.sideUpperNeckBackCp1, points.sideUpperNeckBack)
    .curve(points.sideUpperNeckBackCp2, points.sideNeckBackCp1, points.sideNeckBack)
    .curve(points.sideNeckBackCp2, points.sideShoulderBackCp1, points.sideShoulderBack)
    .curve(points.sideShoulderBackCp2, points.sideShoulderBackLowCp1, points.sideShoulderBackLow)
    .curve(points.sideShoulderBackLowCp2, points.sideUnderbustBackCp1, points.sideUnderbustBack)
    .curve(points.sideUnderbustBackCp2, points.sideWaistBackCp1, points.sideWaistBack)
    .curve(points.sideWaistBackCp2, points.sideHipsBackCp1, points.sideHipsBack)
    .curve(points.sideHipsBackCp2, points.sideSeatBackCp1, points.sideSeatBack)
    .curve(points.sideSeatBackCp2, points.sideUpperLegCp1, points.sideUpperLegBack)
    .curve(points.sideUpperLegCp2, points.sideKneeBackCp1, points.sideKneeBack)
    .curve(points.sideKneeBackCp2, points.sideCalfBackCp1, points.sideCalfBack)
    .curve(points.sideCalfBackCp2, points.sideAnkleBackCp1, points.sideAnkleBack)
    .curve(points.sideAnkleBackCp2, points.sideHeelBackCp1, points.sideHeelBack)
    .curve_(points.sideHeelBackCp2, points.sideHeelBottom)
    .attr('class', 'stroke-xl')

  paths.sideArm = new Path()
    .move(points.sideArmTopFront)
    .curve(points.sideArmTopFrontCp2, points.sideUpperArmFrontCp1, points.sideUpperArmFront)
    .curve(points.sideUpperArmFrontCp2, points.sideElbowFrontCp1, points.sideElbowFront)
    .curve(points.sideElbowFrontCp2, points.sideWristFrontCp1, points.sideWristFront)
    .curve(points.sideWristFrontCp2, points.sideHandACp1, points.sideHandA)
    .curve(points.sideHandACp2, points.sideHandBCp1, points.sideHandB)
    .curve(points.sideHandBCp2, points.sideHandCCp1, points.sideHandC)
    .curve(points.sideHandCCp2, points.sideHandDCp1, points.sideHandD)
    .curve(points.sideHandDCp2, points.sideHandECp1, points.sideHandE)
    .curve(points.sideHandECp2, points.sideHandFCp1, points.sideHandF)
    .curve(points.sideHandFCp2, points.sideHandGCp1, points.sideHandG)
    .curve(points.sideHandGCp2, points.sideHandHCp1, points.sideHandH)
    .curve(points.sideHandHCp2, points.sideHandICp1, points.sideHandI)
    .curve(points.sideHandICp2, points.sideHandJCp1, points.sideHandJ)
    .curve(points.sideHandJCp2, points.sideHandKCp1, points.sideHandK)
    .curve(points.sideHandKCp2, points.sideHandLCp1, points.sideHandL)
    .curve(points.sideHandLCp2, points.sideHandMCp1, points.sideHandM)
    .curve(points.sideHandMCp2, points.sideHandNCp1, points.sideHandN)
    .curve(points.sideHandNCp2, points.sideHandOCp1, points.sideHandO)
    .curve(points.sideHandOCp2, points.sideWristBackCp1, points.sideWristBack)
    .curve(points.sideWristBackCp2, points.sideElbowBackCp1, points.sideElbowBack)
    .curve(points.sideElbowBackCp2, points.sideUpperArmBackCp1, points.sideUpperArmBack)
    .curve(points.sideUpperArmBackCp2, points.sideArmTopBackCp1, points.sideArmTopBack)
    .attr('class', 'stroke-xl')

  paths.sideBustPoint = new Path()
    .move(points.sideBustPointUp)
    .curve(points.sideBustPointUpLeft, points.sideBustPointDownLeft, points.sideBustPointDown)
    .curve(points.sideBustPointDownRight, points.sideBustPointUpRight, points.sideBustPointUp)
    .close()
    .attr('class', 'stroke-xl')

  let crossSeamMaxFactor = 0.9
  let crossSeamMinFactor = 0.7
  for (let i = 0; i < 10; i++) {
    let crossSeamFactor = (crossSeamMinFactor + crossSeamMaxFactor) / 2
    points.sideLegForkCp2 = points.sideLegFork.shift(
      points.sideCrotch.angle(points.sideSeat) + 20,
      measurements.crossSeam * -0.06 * crossSeamFactor
    )
    points.sideCrotchMain = points.sideFloor.shift(90, measurements.inseam)
    points.sideCrotchMainCp1 = points.sideCrotchMain.shift(170, measurements.crossSeam * 0.04)
    points.sideCrotchMainCp2 = points.sideCrotchMain.shift(
      -10,
      measurements.crossSeam * 0.1 * crossSeamFactor
    )
    points.sideBackCrotch = points.sideSeat.shiftFractionTowards(
      points.sideSeatBack,
      crossSeamFactor
    )
    points.sideBackCrotchCp1 = points.sideBackCrotch.shift(
      -100,
      points.sideSeat.dy(points.sideCrotch) * 0.5 * crossSeamFactor
    )
    points.sideBackCrotchCp2 = points.sideBackCrotch.shift(
      80,
      points.sideSeat.dy(points.sideCrotch) * 0.5 * crossSeamFactor
    )

    paths.sideFullCrossSeam = new Path()
      .move(points.sideWaistFront)
      .curve(points.sideWaistFrontCp1, points.sideHipsFrontCp2, points.sideHipsFront)
      .curve(points.sideHipsFrontCp1, points.sideSeatFrontCp2, points.sideSeatFront)
      .curve(points.sideSeatFrontCp1, points.sideLegForkCp1, points.sideLegFork)
      .curve(points.sideLegForkCp2, points.sideCrotchMainCp1, points.sideCrotchMain)
      .curve(points.sideCrotchMainCp2, points.sideBackCrotchCp1, points.sideBackCrotch)
      .curve(points.sideBackCrotchCp2, points.sideHipsBackCp3, points.sideHipsBack)
      .curve(points.sideHipsBackCp1, points.sideWaistBackCp2, points.sideWaistBack)
      .hide()

    const length = paths.sideFullCrossSeam.length()
    store.log.debug(
      'crossseam length actual: ' +
        length +
        ' expected: ' +
        measurements.crossSeam +
        ' factor: ' +
        crossSeamFactor
    )

    if (length > measurements.crossSeam) {
      crossSeamMaxFactor = crossSeamFactor
    } else {
      crossSeamMinFactor = crossSeamFactor
    }
  }

  points.sideCrossSeamFrontSplit = paths.sideFullCrossSeam.shiftAlong(measurements.crossSeamFront)

  let tmp = safeSplit(paths.sideFullCrossSeam, points.sideLegFork)[1]
  tmp = safeSplit(tmp, points.sideHipsBack)[0]
  const split = safeSplit(tmp, points.sideCrossSeamFrontSplit)
  paths.sideCrossSeamFront = split[0].attr('class', 'stroke-xl stroke-mark').hide()
  paths.sideCrossSeamBack = split[1].attr('class', 'stroke-xl stroke-various').hide()

  if (complete) {
    paths.sideCrossSeamFront.unhide()
    paths.sideCrossSeamBack.unhide()
  }

  return part.hide()
}

export const side = {
  name: 'side',
  options: {},
  measurements: [
    'ankle',
    'biceps',
    'bustFront',
    'bustPointToUnderbust',
    'bustSpan',
    'chest',
    'crossSeam',
    'crossSeamFront',
    'crotchDepth',
    'heel',
    'head',
    'highBust',
    'highBustFront',
    'hips',
    'hpsToBust',
    'hpsToWaistBack',
    'hpsToWaistFront',
    'inseam',
    'knee',
    'neck',
    'seat',
    'seatBack',
    'shoulderSlope',
    'shoulderToElbow',
    'shoulderToShoulder',
    'shoulderToWrist',
    'underbust',
    'upperLeg',
    'waist',
    'waistBack',
    'waistToArmpit',
    'waistToFloor',
    'waistToHips',
    'waistToKnee',
    'waistToSeat',
    'waistToUnderbust',
    'waistToUpperLeg',
    'wrist',
  ],
  draft: draftSide,
}
