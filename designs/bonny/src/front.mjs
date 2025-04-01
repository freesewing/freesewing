import { side } from './side.mjs'

const descendingCheck = [
  ['hpsToWaistFront', 'hpsToBust'],
  ['hpsToWaistFront', 'waistToUnderbust'],
  ['hpsToWaistFront', 'waistToArmpit'],
  ['hpsToWaistBack', 'waistToArmpit'],
  ['shoulderToWrist', 'shoulderToElbow'],
  ['waistToFloor', 'waistToKnee', 'waistToUpperLeg', 'waistToSeat', 'waistToHips'],
  ['waistToFloor', 'inseam'],
  ['crossSeam', 'crossSeamFront'],
  ['seat', 'seatBack'],
  ['highBust', 'highBustFront'],
  ['chest', 'bustFront', 'bustSpan'],
  ['waist', 'waistBack'],
]

const constraintCheck = [
  {
    lhs: [
      { m: 'highBust', coefficient: 1 },
      { m: 'highBustFront', coefficient: -1 },
    ],
    rhs: [
      { m: 'chest', coefficient: 1 },
      { m: 'bustFront', coefficient: -1 },
    ],
    tolerance: 0.05,
    key: 'backChest',
  },
  {
    lhs: [{ m: 'hpsToWaistFront', coefficient: 1 }],
    rhs: [
      { m: 'hpsToBust', coefficient: 1 },
      { m: 'bustPointToUnderbust', coefficient: 1 },
      { m: 'waistToUnderbust', coefficient: 1 },
    ],
    lhsMustBeSmaller: true,
    tolerance: 0.1,
    key: 'waistFront',
  },
  {
    lhs: [{ m: 'waistToFloor', coefficient: 1 }],
    rhs: [
      { m: 'waistToUpperLeg', coefficient: 1 },
      { m: 'inseam', coefficient: 1 },
    ],
    tolerance: 0,
    lhsMustBeSmaller: true,
    key: 'waistToUpperLeg',
  },
  {
    lhs: [{ m: 'waistBack', coefficient: 2 }],
    rhs: [{ m: 'waist', coefficient: 1 }],
    lhsMustBeSmaller: true,
    tolerance: 0.1,
    key: 'waistBack',
  },
  {
    lhs: [{ m: 'chest', coefficient: 1 }],
    rhs: [{ m: 'bustFront', coefficient: 2 }],
    tolerance: 0.2,
    lhsMustBeSmaller: true,
    key: 'bustFront',
  },
  {
    lhs: [{ m: 'highBust', coefficient: 1 }],
    rhs: [{ m: 'highBustFront', coefficient: 2 }],
    tolerance: 0.2,
    key: 'highBustFront',
  },
]

function checkDescendingSet(set, warnings, measies) {
  let biggerValue = null
  let biggerMeasurement = null
  for (const measurement of set) {
    let value = measies[measurement]
    if (value !== null) {
      if (biggerValue !== null && value >= biggerValue) {
        warnings.push(`shouldBeLarger-${biggerMeasurement}-${measurement}`)
      } else {
        biggerValue = value
        biggerMeasurement = measurement
      }
    }
  }
}

function checkConstraint(constraint, warnings, measies) {
  let lhsSum = sumMeasurements(constraint.lhs, measies)
  let rhsSum = sumMeasurements(constraint.rhs, measies)
  if (lhsSum === false || rhsSum === false) {
    // Some measurements are missing
    return
  }
  const difference = Math.abs(((lhsSum - rhsSum) / (lhsSum + rhsSum)) * 2)
  if (difference <= constraint.tolerance) {
    // minor difference
    return
  }
  if (constraint.lhsMustBeSmaller) {
    if (lhsSum > rhsSum) {
      warnings.push(`constraint-${constraint.key}`)
    }
  } else {
    warnings.push(`constraint-${constraint.key}`)
  }
}

function sumMeasurements(params, measies) {
  let result = 0
  for (const e of params) {
    if (!measies[e.m]) {
      return false
    }
    result += e.coefficient * measies[e.m]
  }
  return result
}

function checkDescendingSets(warnings, measies) {
  for (const e of descendingCheck) {
    checkDescendingSet(e, warnings, measies)
  }
}
function checkConstraints(warnings, measies) {
  for (const e of constraintCheck) {
    checkConstraint(e, warnings, measies)
  }
}
function draftFront({ measurements, Point, Path, points, paths, macro, utils, store, part }) {
  points.floor = new Point(0, 0)

  points.ankle = new Point(0, -measurements.heel * 0.35)

  points.waist = new Point(0, -measurements.waistToFloor)

  points.hips = points.waist.shift(-90, measurements.waistToHips)

  points.seat = points.waist.shift(-90, measurements.waistToSeat)

  points.knee = points.waist.shift(-90, measurements.waistToKnee)

  points.crotch = points.waist.shift(-90, measurements.waistToUpperLeg)

  points.underbust = points.waist.shift(90, measurements.waistToUnderbust)

  const y = measurements.bustPointToUnderbust
  const x = Math.min(y, 0.3 * (measurements.chest - measurements.underbust))
  const bustPointToUnderbust = Math.sqrt(y * y - x * x)
  points.bust1 = points.underbust.shift(90, bustPointToUnderbust)

  points.armpit = points.waist.shift(90, measurements.waistToArmpit)

  points.neck = points.waist.shift(90, measurements.hpsToWaistBack * 0.88)

  points.bust2 = points.neck.shift(-90, measurements.hpsToBust * 0.82)

  points.bust = points.bust1.shiftFractionTowards(points.bust2, 0.5)

  points.shoulder = points.neck.shift(
    -90,
    (Math.sin((measurements.shoulderSlope / 180) * Math.PI) * measurements.shoulderToShoulder) / 2
  )
  points.head = points.neck.shift(90, measurements.head * 0.43)

  points.armpitCrease = points.armpit.shiftFractionTowards(points.shoulder, 0.1)

  points.elbow = points.shoulder.shift(-90, measurements.shoulderToElbow * 0.95)
  points.wrist = points.shoulder.shift(-90, measurements.shoulderToWrist * 0.95)

  points.outerShoulder = points.shoulder.shift(180, measurements.shoulderToShoulder * 0.44)
  points.outerShoulderLower = points.shoulder
    .shiftFractionTowards(points.armpit, 0.2)
    .shift(180, measurements.shoulderToShoulder * 0.51)

  points.crotchMain = points.floor.shift(90, measurements.inseam)

  points.crotchMainCp2 = points.crotchMain.shift(180, measurements.seat * 0.005)

  points.crotchCurve = points.crotchMain.shift(147, measurements.seat * 0.023)
  points.crotchCurveCp1 = points.crotchMain.shift(180, measurements.seat * 0.01)

  points.innerCrotch = points.crotch.shift(
    180,
    Math.max(measurements.seat * 0.03, measurements.seat - measurements.upperLeg * 1.4) * 0.06
  )

  points.crotchCp1 = points.innerCrotch.shift(86, measurements.seat * 0.01)
  points.crotchCp2 = points.innerCrotch.shift(-94, points.crotch.dy(points.knee) * 0.6)

  points.outerUpperLeg = new Point(
    (measurements.seat + measurements.upperLeg * 1.7) * -0.094,
    points.innerCrotch.y
  )

  points.footMain = points.floor.shift(180, measurements.hips * 0.11)
  points.ankleMain = points.ankle.shift(180, measurements.hips * 0.11)
  points.kneeMain = points.knee.shift(180, measurements.hips * 0.12)
  points.upperLegMain = points.crotch.shift(180, measurements.upperLeg * 0.17)
  points.shoulderMain = points.shoulder.shift(180, measurements.shoulderToShoulder * 0.4)
  points.elbowMain = utils.beamIntersectsY(
    points.shoulderMain,
    points.shoulderMain.shift(258.5, 10),
    points.elbow.y
  )
  points.wristMain = utils.beamIntersectsY(
    points.shoulderMain,
    points.shoulderMain.shift(256.4, 10),
    points.wrist.y
  )

  points.innerKnee = points.kneeMain.shift(0, measurements.knee * 0.17)
  points.outerKnee = points.kneeMain.shift(180, measurements.knee * 0.15)

  points.calf = points.kneeMain
    .shiftFractionTowards(points.ankleMain, 0.2)
    .shift(180, points.knee.dy(points.ankle) * 0.01)
  points.outerCalf = points.calf.shift(180, measurements.knee * 0.17)
  points.innerCalf = points.calf.shift(0, measurements.knee * 0.15)

  points.innerAnkle = points.ankleMain.shift(0, measurements.ankle * 0.13)
  points.outerAnkle = points.ankleMain.shift(180, measurements.ankle * 0.13)

  points.innerFoot = points.footMain.shift(0, measurements.heel * 0.13)
  points.outerFoot = points.footMain.shift(180, measurements.heel * 0.08)

  points.innerSideFoot = points.footMain.shift(18, measurements.heel * 0.175)
  points.outerSideFoot = points.footMain.shift(163, measurements.heel * 0.138)

  points.innerSideFootCp1 = points.innerSideFoot.shift(90, measurements.heel * 0.05)
  points.innerSideFootCp2 = points.innerSideFoot.shift(-90, measurements.heel * 0.03)

  points.outerSideFootCp1 = points.outerSideFoot.shift(-90, measurements.heel * 0.03)
  points.outerSideFootCp2 = points.outerSideFoot.shift(90, measurements.heel * 0.05)

  points.innerFootCp1 = points.innerFoot.shift(0, measurements.heel * 0.02)
  points.outerFootCp2 = points.outerFoot.shift(180, measurements.heel * 0.02)

  points.outerSeat = points.seat.shift(180, measurements.seat * 0.18)

  points.outerHips = points.hips.shift(180, measurements.hips * 0.18)

  points.outerWaist = points.waist.shift(180, measurements.waist * 0.18)

  points.outerUnderbust = points.underbust.shift(180, measurements.underbust * 0.175)

  points.outerBust = points.bust.shift(
    180,
    (measurements.highBust - measurements.highBustFront) * 0.36
  )

  points.outerArmpit = points.armpitCrease.shift(180, measurements.shoulderToShoulder * 0.36)

  points.innerElbow = points.elbowMain.shift(-20, measurements.biceps * 0.12)
  points.outerElbow = points.elbowMain.shift(160, measurements.biceps * 0.15)

  points.innerWrist = points.wristMain.shift(-20, measurements.wrist * 0.1)
  points.outerWrist = points.wristMain.shift(160, measurements.wrist * 0.15)

  points.outerArm = points.outerShoulderLower.shift(-104, measurements.biceps * 0.29)

  points.outerNeck = points.neck.shift(180, measurements.neck * 0.15)
  points.outerUpperNeck = points.neck.shift(138, measurements.head * 0.13)
  points.chin = points.neck.shift(140, measurements.head * 0.105)

  points.outerUpperLegCp1 = points.outerUpperLeg.shift(
    -90,
    (measurements.waistToKnee - measurements.waistToUpperLeg) * 0.5
  )
  points.outerUpperLegCp2 = points.outerUpperLeg.shift(
    90,
    (measurements.waistToUpperLeg - measurements.waistToSeat) * 0.3
  )

  let kneeToFloor = measurements.waistToFloor - measurements.waistToKnee
  let ankleToFloor = -points.ankleMain.y

  points.innerKneeCp1 = points.innerKnee.shift(82, kneeToFloor * 0.06)
  points.innerKneeCp2 = points.innerKnee.shift(-98, kneeToFloor * 0.06)

  points.innerCalfCp1 = points.innerCalf.shift(95, kneeToFloor * 0.05)
  points.innerCalfCp2 = points.innerCalf.shift(-85, kneeToFloor * 0.3)

  points.innerAnkleCp1 = points.innerAnkle.shift(95, ankleToFloor * 0.9)
  points.innerAnkleCp2 = points.innerAnkle.shift(-85, ankleToFloor * 0.7)

  points.outerKneeCp1 = points.outerKnee.shift(-90, kneeToFloor * 0.06)
  points.outerKneeCp2 = points.outerKnee.shift(90, kneeToFloor * 0.2)

  points.outerAnkleCp1 = points.outerAnkle.shift(-83, ankleToFloor * 0.7)
  points.outerAnkleCp2 = points.outerAnkle.shift(97, ankleToFloor * 0.7)

  points.outerCalfCp1 = points.outerCalf.shift(-95, kneeToFloor * 0.22)
  points.outerCalfCp2 = points.outerCalf.shift(85, kneeToFloor * 0.07)

  points.outerSeatCp1 = points.outerSeat.shift(
    points.outerHips.angle(points.outerUpperLeg),
    measurements.seat * 0.03
  )
  points.outerSeatCp2 = points.outerSeat.shift(
    points.outerHips.angle(points.outerUpperLeg),
    measurements.seat * -0.06
  )

  points.outerHipsCp1 = points.outerHips.shift(
    points.outerWaist.angle(points.outerSeat),
    measurements.hips * 0.05
  )
  points.outerHipsCp2 = points.outerHips.shift(
    points.outerWaist.angle(points.outerSeat),
    measurements.hips * -0.05
  )

  points.outerWaistCp1 = points.outerWaist.shift(
    points.outerUnderbust.angle(points.outerHips),
    measurements.waist * 0.05
  )
  points.outerWaistCp2 = points.outerWaist.shift(
    points.outerUnderbust.angle(points.outerHips),
    measurements.waist * -0.05
  )

  points.outerUnderbustCp1 = points.outerUnderbust.shift(
    points.outerBust.angle(points.outerWaist),
    measurements.underbust * 0.07
  )
  points.outerUnderbustCp2 = points.outerUnderbust.shift(
    points.outerBust.angle(points.outerWaist),
    measurements.underbust * -0.02
  )

  points.outerBustCp1 = points.outerBust.shift(
    points.outerBust.angle(points.outerWaist),
    measurements.highBust * 0.02
  )
  points.outerBustCp2 = points.outerBust.shift(
    points.outerBust.angle(points.outerWaist),
    measurements.highBust * -0.02
  )

  points.outerBustCp3 = points.outerBust.shift(-110, measurements.biceps * 0.15)

  points.innerElbowCp1 = points.innerElbow.shift(70, measurements.biceps * 0.05)
  points.innerElbowCp2 = points.innerElbow.shift(-97, measurements.biceps * 0.25)

  points.innerWristCp1 = points.innerWrist.shift(70, measurements.wrist * 0.25)
  points.innerWristCp2 = points.innerWrist.shift(-110, measurements.wrist * 0.1)

  points.outerWristCp1 = points.outerWrist.shift(-97, measurements.wrist * 0.05)
  points.outerWristCp2 = points.outerWrist.shift(83, measurements.wrist * 0.9)

  points.outerElbowCp1 = points.outerElbow.shift(-107, measurements.biceps * 0.25)
  points.outerElbowCp2 = points.outerElbow.shift(73, measurements.biceps * 0.3)

  points.outerArmCp1 = points.outerArm.shift(-97, measurements.biceps * 0.25)
  points.outerArmCp2 = points.outerArm.shift(83, measurements.biceps * 0.2)

  points.outerShoulderLowerCp1 = points.outerShoulderLower.shift(
    points.outerArm.angle(points.outerShoulder) - 10,
    measurements.biceps * -0.05
  )
  points.outerShoulderLowerCp2 = points.outerShoulderLower.shift(
    points.outerArm.angle(points.outerShoulder) - 10,
    measurements.biceps * 0.25
  )
  //
  // points.outerShoulderCp1 = points.outerShoulder.shift(
  //   points.outerShoulderLower.angle(points.outerNeck),
  //   measurements.shoulderToShoulder * -0.10
  // )
  // points.outerShoulderCp2 = points.outerShoulder.shift(
  //   points.outerShoulderLower.angle(points.outerNeck),
  //   measurements.shoulderToShoulder * 0.13
  // )

  points.outerNeckCp1 = points.outerNeck.shift(
    points.outerShoulder.angle(points.outerUpperNeck) + 15,
    measurements.neck * -0.09
  )
  points.outerNeckCp2 = points.outerNeck.shift(
    points.outerShoulder.angle(points.outerUpperNeck) + 15,
    measurements.neck * 0.05
  )

  points.bustPointCenter = points.bust.shift(180, measurements.bustSpan * 0.5)
  points.bustPointOuter = points.bustPointCenter.shift(180, measurements.bustFront * 0.016)

  points.underBustLine = points.underbust.shift(180, measurements.bustSpan * 0.5)
  points.underBustLineOuter = points.underBustLine.shift(160, measurements.bustSpan * 0.08)
  points.underBustLineInner = points.underBustLine.shift(23, measurements.bustSpan * 0.28)

  points.underBustLineCp1 = points.underBustLine.shift(170, measurements.bustSpan * 0.05)
  points.underBustLineCp2 = points.underBustLine.shift(-10, measurements.bustSpan * 0.17)

  points.belowEar = points.neck.shift(130, measurements.head * 0.18)
  points.earBottom = points.neck.shift(131, measurements.head * 0.2)
  points.earLeftLow = points.neck.shift(131, measurements.head * 0.225)
  points.earLeftHigh = points.neck.shift(125, measurements.head * 0.27)
  points.earTop = points.neck.shift(120.5, measurements.head * 0.28)
  points.aboveEar = points.neck.shift(117, measurements.head * 0.29)

  points.belowEarCp1 = points.belowEar.shift(-75, measurements.head * 0.01)
  points.belowEarCp2 = points.belowEar.shift(-75, measurements.head * -0.01)
  points.earBottomCp1 = points.earBottom.shift(-5, measurements.head * 0.01)
  points.earBottomCp2 = points.earBottom.shift(-5, measurements.head * -0.01)
  points.earLeftLowCp1 = points.earLeftLow.shift(-75, measurements.head * 0.01)
  points.earLeftLowCp2 = points.earLeftLow.shift(-75, measurements.head * -0.01)
  points.earLeftHighCp1 = points.earLeftHigh.shift(-85, measurements.head * 0.01)
  points.earLeftHighCp2 = points.earLeftHigh.shift(-85, measurements.head * -0.01)
  points.earTopCp1 = points.earTop.shift(160, measurements.head * 0.01)
  points.earTopCp2 = points.earTop.shift(160, measurements.head * -0.01)
  points.aboveEarCp1 = points.aboveEar.shift(-90, measurements.head * 0.01)
  points.aboveEarCp2 = points.aboveEar.shift(-90, measurements.head * -0.1)
  points.headCp1 = points.head.shift(180, measurements.head * 0.1)

  points.upperEye = points.neck.shift(102.5, measurements.head * 0.25)
  points.lowerEye = points.neck.shift(105, measurements.head * 0.237)
  points.outerEye = points.neck.shift(108.3, measurements.head * 0.247)
  points.innerEye = points.neck.shift(99, measurements.head * 0.235)
  points.upperEyeCp1 = points.upperEye.shift(0, measurements.head * 0.01)
  points.upperEyeCp2 = points.upperEye.shift(180, measurements.head * 0.01)
  points.lowerEyeCp1 = points.lowerEye.shift(180, measurements.head * 0.01)
  points.lowerEyeCp2 = points.lowerEye.shift(0, measurements.head * 0.01)
  points.outerEyeCp1 = points.outerEye.shift(90, measurements.head * 0.005)
  points.outerEyeCp2 = points.outerEye.shift(-90, measurements.head * 0.005)
  points.innerEyeCp1 = points.innerEye.shift(-90, measurements.head * 0.003)
  points.innerEyeCp2 = points.innerEye.shift(90, measurements.head * 0.01)

  points.innerNose = points.neck.shift(94.5, measurements.head * 0.16)
  points.innerNoseCp = points.neck.shift(95.5, measurements.head * 0.163)
  points.outerNose = points.neck.shift(96.8, measurements.head * 0.162)

  points.innerMouth = points.neck.shift(90, measurements.head * 0.112)
  points.innerMouthCp = points.innerMouth.shift(180, measurements.head * 0.02)
  points.outerMouth = points.neck.shift(111, measurements.head * 0.117)

  points.lowerEar = points.neck.shift(128, measurements.head * 0.217)
  points.lowerEarCp = points.neck.shift(126, measurements.head * 0.23)
  points.upperEar = points.neck.shift(123.5, measurements.head * 0.24)

  const handScale = measurements.wrist * 0.85

  points.handA = points.wristMain.shift(-65, handScale * 0.5)
  points.handB = points.wristMain.shift(-65, handScale * 0.7)
  points.handC = points.wristMain.shift(-70, handScale * 0.79)
  points.handD = points.wristMain.shift(-77, handScale * 0.7)
  points.handE = points.wristMain.shift(-83, handScale * 0.53)
  points.handF = points.wristMain.shift(-90, handScale * 0.7)
  points.handZ = points.wristMain.shift(-92, handScale * 0.9)
  points.handG = points.wristMain.shift(-89, handScale * 1.2)
  points.handFork = points.wristMain.shift(-90.6, handScale * 1.32)
  points.handH = points.wristMain.shift(-93, handScale * 1.42)
  points.handJ = points.wristMain.shift(-109, handScale * 0.7)
  points.handInner = points.wristMain.shift(-105, handScale * 0.74)

  points.handACp1 = points.handA.shift(110, handScale * 0.1)
  points.handACp2 = points.handA.shift(-70, handScale * 0.1)
  points.handBCp1 = points.handB.shift(115, handScale * 0.1)
  points.handBCp2 = points.handB.shift(-65, handScale * 0.05)
  points.handCCp1 = points.handC.shift(20, handScale * 0.05)
  points.handCCp2 = points.handC.shift(200, handScale * 0.05)
  points.handDCp1 = points.handD.shift(-65, handScale * 0.05)
  points.handDCp2 = points.handD.shift(115, handScale * 0.1)
  points.handECp1 = points.handE.shift(-55, handScale * 0.05)
  points.handECp2 = points.handE.shift(-125, handScale * 0.05)
  points.handFCp1 = points.handF.shift(80, handScale * 0.1)
  points.handFCp2 = points.handF.shift(-100, handScale * 0.1)
  points.handZCp1 = points.handZ.shift(90, handScale * 0.1)
  points.handZCp2 = points.handZ.shift(-90, handScale * 0.1)
  points.handGCp1 = points.handG.shift(100, handScale * 0.1)
  points.handGCp2 = points.handG.shift(-80, handScale * 0.1)
  points.handForkCp1 = points.handFork.shift(40, handScale * 0.05)
  points.handForkCp2 = points.handFork.shift(-180, handScale * 0.07)
  points.handForkCp3 = points.handFork.shift(-90, handScale * 0.05)
  points.handHCp1 = points.handH.shift(0, handScale * 0.05)
  points.handHCp2 = points.handH.shift(110, handScale * 0.1)
  points.handJCp1 = points.handJ.shift(-90, handScale * 0.4)
  points.handJCp2 = points.handJ.shift(90, handScale * 0.4)
  points.handInnerCp1 = points.handInner.shift(-90, handScale * 0.2)

  paths.front = new Path()
    .move(points.crotchMain)
    .curve(points.crotchMainCp2, points.crotchCp1, points.innerCrotch)
    .curve(points.crotchCp2, points.innerKneeCp1, points.innerKnee)
    .curve(points.innerKneeCp2, points.innerCalfCp1, points.innerCalf)
    .curve(points.innerCalfCp2, points.innerAnkleCp1, points.innerAnkle)
    .curve(points.innerAnkleCp2, points.innerSideFootCp1, points.innerSideFoot)
    .curve(points.innerSideFootCp2, points.innerFootCp1, points.innerFoot)
    .line(points.outerFoot)
    .curve(points.outerFootCp2, points.outerSideFootCp1, points.outerSideFoot)
    .curve(points.outerSideFootCp2, points.outerAnkleCp1, points.outerAnkle)
    .curve(points.outerAnkleCp2, points.outerCalfCp1, points.outerCalf)
    .curve(points.outerCalfCp2, points.outerKneeCp1, points.outerKnee)
    .curve(points.outerKneeCp2, points.outerUpperLegCp1, points.outerUpperLeg)
    .curve(points.outerUpperLegCp2, points.outerSeatCp1, points.outerSeat)
    .curve(points.outerSeatCp2, points.outerHipsCp1, points.outerHips)
    .curve(points.outerHipsCp2, points.outerWaistCp1, points.outerWaist)
    .curve(points.outerWaistCp2, points.outerBustCp1, points.outerBust)
    .curve_(points.outerBustCp2, points.outerArmpit)
    .move(points.outerBust)
    .curve(points.outerBustCp3, points.innerElbowCp1, points.innerElbow)
    .curve(points.innerElbowCp2, points.innerWristCp1, points.innerWrist)
    .curve(points.innerWristCp2, points.handACp1, points.handA)
    .curve(points.handACp2, points.handBCp1, points.handB)
    .curve(points.handBCp2, points.handCCp1, points.handC)
    .curve(points.handCCp2, points.handDCp1, points.handD)
    .curve(points.handDCp2, points.handECp1, points.handE)
    .curve(points.handECp2, points.handFCp1, points.handF)
    .curve(points.handFCp2, points.handZCp1, points.handZ)
    .curve(points.handZCp2, points.handGCp1, points.handG)
    .curve(points.handGCp2, points.handForkCp1, points.handFork)
    .curve(points.handForkCp2, points.handInnerCp1, points.handInner)
    .move(points.handFork)
    .curve(points.handForkCp3, points.handHCp1, points.handH)
    .curve(points.handHCp2, points.handJCp1, points.handJ)
    .curve(points.handJCp2, points.outerWristCp1, points.outerWrist)
    .curve(points.outerWristCp2, points.outerElbowCp1, points.outerElbow)
    .curve(points.outerElbowCp2, points.outerArmCp1, points.outerArm)
    .curve(points.outerArmCp2, points.outerShoulderLowerCp1, points.outerShoulderLower)
    .curve(points.outerShoulderLowerCp2, points.outerNeckCp1, points.outerNeck)
    .curve_(points.outerNeckCp2, points.outerUpperNeck)
    .move(points.chin)
    .line(points.outerUpperNeck)
    ._curve(points.belowEarCp1, points.belowEar)
    .curve(points.belowEarCp2, points.earBottomCp1, points.earBottom)
    .curve(points.earBottomCp2, points.earLeftLowCp1, points.earLeftLow)
    .curve(points.earLeftLowCp2, points.earLeftHighCp1, points.earLeftHigh)
    .curve(points.earLeftHighCp2, points.earTopCp1, points.earTop)
    .curve(points.earTopCp2, points.aboveEarCp1, points.aboveEar)
    .curve(points.aboveEarCp2, points.headCp1, points.head)
    .attr('class', 'stroke-xl')

  paths.bustPoint = new Path()
    .move(points.bustPointOuter)
    .circleSegment(360, points.bustPointCenter)
    .attr('class', 'stroke-xl')

  if (store.showBust) {
    paths.bustLine = new Path()
      .move(points.underBustLineOuter)
      ._curve(points.underBustLineCp1, points.underBustLine)
      .curve_(points.underBustLineCp2, points.underBustLineInner)
      .attr('class', 'stroke-xl')
  }

  paths.crotch = new Path()
    .move(points.crotchMain)
    .curve_(points.crotchCurveCp1, points.crotchCurve)
    .attr('class', 'stroke-xl')

  paths.eye = new Path()
    .move(points.upperEye)
    .curve(points.upperEyeCp2, points.outerEyeCp1, points.outerEye)
    .curve(points.outerEyeCp2, points.lowerEyeCp1, points.lowerEye)
    .curve(points.lowerEyeCp2, points.innerEyeCp1, points.innerEye)
    .curve(points.innerEyeCp2, points.upperEyeCp1, points.upperEye)
    .circleSegment(-120, points.upperEye.shiftFractionTowards(points.lowerEye, 0.5))
    .move(points.lowerEye)
    .circleSegment(-100, points.upperEye.shiftFractionTowards(points.lowerEye, 0.5))
    .attr('class', 'stroke-xl')

  paths.nose = new Path()
    .move(points.innerNose)
    .curve_(points.innerNoseCp, points.outerNose)
    .attr('class', 'stroke-xl')

  paths.mouth = new Path()
    .move(points.innerMouth)
    .curve_(points.innerMouthCp, points.outerMouth)
    .attr('class', 'stroke-xl')

  paths.ear = new Path()
    .move(points.lowerEar)
    .curve_(points.lowerEarCp, points.upperEar)
    .attr('class', 'stroke-xl')

  macro('mirror', {
    clone: true,
    mirror: [points.floor, points.head],
    paths: Object.keys(paths).filter((it) => !it.startsWith('side')),
  })

  const warnings = []
  checkDescendingSets(warnings, measurements)
  checkConstraints(warnings, measurements)
  const fac = paths.sideFullCrossSeam.intersectsY(
    points.sideCrotchMain.shiftFractionTowards(points.sideCrotch, 0.1).y
  ).length
  if (fac > 2) {
    warnings.push('crossseam')
  }
  if (paths.sideCrossSeamFront.length() === 0 || paths.sideCrossSeamBack.length() === 0) {
    warnings.push('crossseamfront')
  }

  if (warnings.length === 0) {
    store.flag.info({ msg: 'bonny:validationOk' })
  } else {
    for (const warning of warnings) {
      store.flag.warn({ msg: `bonny:${warning}` })
    }
  }

  return part
}

export const front = {
  name: 'front',
  from: side,
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
  draft: draftFront,
}
