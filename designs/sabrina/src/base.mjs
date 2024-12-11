import { pctBasedOn } from '@freesewing/core'

function draftBase({ options, measurements, Point, Path, points, paths, utils, store, part }) {
  const horizontalBustScale = utils.stretchToScale(options.horizontalBustStretch)
  const horizontalBandScale = utils.stretchToScale(options.horizontalBandStretch)
  const verticalScale = utils.stretchToScale(options.verticalStretch)
  const strapScale = utils.stretchToScale(options.strapStretch)

  const bustDist = (measurements.bustSpan / 2) * horizontalBustScale
  const ribcageFront =
    (measurements.highBust - measurements.chest + measurements.bustFront) * horizontalBustScale
  const chestFront = measurements.bustFront * horizontalBustScale
  const chestCirc = measurements.chest * horizontalBustScale
  const chestBack = chestCirc - chestFront
  const bandCirc =
    (measurements.waist * options.length + measurements.underbust * (1 - options.length)) *
    horizontalBandScale
  const neckWidth = measurements.neck * options.neckWidthFront
  points.hps = new Point(neckWidth, 0)
  points.shoulder = utils.beamIntersectsX(
    points.hps,
    points.hps.shift(measurements.shoulderSlope * -1, 100),
    measurements.shoulderToShoulder / 2
  )
  const backOffset = chestCirc / 2
  points.hpsBack = new Point(backOffset - points.hps.x, 0)
  points.shoulderBack = new Point(backOffset - points.shoulder.x, points.shoulder.y)

  points.cfNeckBase = new Point(0, neckWidth * verticalScale)
  points.cfBust = new Point(0, measurements.hpsToBust * verticalScale)
  points.cfUnderbust = points.cfBust.translate(0, measurements.bustPointToUnderbust * verticalScale)
  points.cfWaist = new Point(0, measurements.hpsToWaistFront * verticalScale)
  points.bustPoint = new Point(bustDist, measurements.hpsToBust * verticalScale)
  points.cfBand = points.cfUnderbust.shiftFractionTowards(points.cfWaist, options.length)
  points.cfNeck = points.cfNeckBase.shiftFractionTowards(points.cfBand, options.neckHeightFront)
  const bustToBand = points.cfBust.dy(points.cfBand)

  points.cbBand = points.cfBand.translate(chestCirc * 0.5, 0)

  points.sfBand = points.cfBand.translate(chestFront * options.splitOffsetFront, 0)
  points.sfChest = points.cfBust.translate(chestFront / 2, 0)
  points.sfDart = points.sfBand
    .translate(0, -bustToBand)
    .shiftFractionTowards(points.bustPoint, options.bustPointFocus)
  points.armpit = new Point(
    chestFront * 0.5,
    points.cfWaist.y - measurements.waistToArmpit * (1 - options.armpitAdjustment) * verticalScale
  )

  points.cbNeck = new Point(backOffset, measurements.neck * options.neckHeightBack)

  const armpitWidth = chestBack * 0.1
  const backWidth = chestBack * options.backWidth

  const strapPositionAdj = options.strapPosition * (1 - options.strapWidth) + options.strapWidth / 2
  points.strapFrontLeft = points.hps.shiftFractionTowards(
    points.shoulder,
    strapPositionAdj - options.strapWidth / 2
  )
  points.strapFrontRight = points.hps.shiftFractionTowards(
    points.shoulder,
    strapPositionAdj + options.strapWidth / 2
  )
  points.strapBackLeft = points.hpsBack.shiftFractionTowards(
    points.shoulderBack,
    strapPositionAdj - options.strapWidth / 2
  )
  points.strapBackRight = points.hpsBack.shiftFractionTowards(
    points.shoulderBack,
    strapPositionAdj + options.strapWidth / 2
  )

  points.strapFrontLeft = points.strapFrontLeft.shift(
    options.strapAngle - 90 - measurements.shoulderSlope,
    (1 - strapScale) * points.cfNeck.y
  )
  points.strapFrontRight = points.strapFrontRight.shift(
    options.strapAngle - 90 - measurements.shoulderSlope,

    (1 - strapScale) * points.cfNeck.y
  )
  points.strapBackLeft = points.strapBackLeft.shift(
    options.strapAngle - 90 + measurements.shoulderSlope,

    (1 - strapScale) * points.cbNeck.y
  )
  points.strapBackRight = points.strapBackRight.shift(
    options.strapAngle - 90 + measurements.shoulderSlope,

    (1 - strapScale) * points.cbNeck.y
  )

  points.strapFrontLeftCp = points.strapFrontLeft.shift(
    options.strapAngle - 90 - measurements.shoulderSlope,
    measurements.chest * options.strapCurveFront
  )
  points.strapFrontRightCp = points.strapFrontRight.shift(
    options.strapAngle - 90 - measurements.shoulderSlope,
    measurements.chest * options.strapCurveFront
  )
  points.strapBackLeftCp = points.strapBackLeft.shift(
    options.strapAngle - 90 + measurements.shoulderSlope,
    measurements.chest * options.strapCurveBack
  )
  points.strapBackRightCp = points.strapBackRight.shift(
    options.strapAngle - 90 + measurements.shoulderSlope,
    measurements.chest * options.strapCurveBack
  )

  points.sfArmpit = points.armpit.shift(180, armpitWidth)
  points.armpitBottom = points.armpit.shift(270, armpitWidth)

  points.sbBand = points.cfBand.translate(chestCirc * 0.5 - chestBack * options.splitOffsetBack, 0)
  points.sbBust = points.cfBust.translate(chestCirc * 0.5 - chestBack * options.splitOffsetBack, 0)

  points.sbDart = points.sbBand.translate(0, -bustToBand * 0.8)

  points.sbArmpit = utils
    .beamsIntersect(
      points.sbBust,
      points.armpit,
      points.armpitBottom,
      points.armpitBottom.shift(10, 10)
    )
    .translate(armpitWidth, 0)
  if (points.sbArmpit.x > points.sbBust.x) {
    points.sbArmpit.x = points.sbBust.x
  }

  points.cbCenter = new Point(
    points.cbNeck.x,
    points.strapBackRight.y + (points.sbArmpit.y - points.strapBackRight.y) * 0.6
  )
  points.backCCenter = points.cbCenter.translate(-backWidth / 2, 0)
  points.backCCenterCp1 = points.backCCenter.translate(
    0,
    points.strapBackRight.dy(points.backCCenter) * -options.upperBackShape
  )
  points.backCCenterCp2 = points.backCCenter.translate(
    0,
    points.strapBackRight.dy(points.backCCenter) * options.lowerBackShape
  )

  points.cfNeckCp = points.cfNeck.translate(neckWidth, 0)
  points.cbNeckCp = points.cbNeck.translate(-neckWidth / 2, 0)

  const frontArmpitAngle = -60
  const backArmpitAngle = points.backCCenterCp2.angle(points.armpitBottom)

  points.sfArmpitCp1 = points.sfArmpit.shift(frontArmpitAngle, armpitWidth)
  points.sfArmpitCp2 = points.sfArmpit.shift(180 + frontArmpitAngle, armpitWidth)

  points.sbArmpitCp1 = points.sbArmpit.shift(backArmpitAngle, armpitWidth)
  points.sbArmpitCp2 = points.sbArmpit.shift(180 + backArmpitAngle, armpitWidth / 2)

  points.sfBandCp1 = points.sfBand.shiftFractionTowards(points.cfBand, 1 / 3)
  points.sfBandCp2 = points.sfBand.shiftFractionTowards(points.sbBand, 1 / 3)
  points.sbBandCp1 = points.sbBand.shiftFractionTowards(points.sfBand, 1 / 3)
  points.sbBandCp2 = points.sbBand.shiftFractionTowards(points.cbBand, 1 / 3)

  let bottomDartWidth = Math.max(0, (chestCirc - bandCirc) / 4)
  let bustDartWidth = Math.max(0, (chestFront - ribcageFront) / 2) + chestCirc * 0.01
  let backDartWidth = chestCirc * 0.01

  function constructDart(dartPoint, centerPointName, prevCpPointName, nextCpPointName, dartWidth) {
    const centerPoint = points[centerPointName]
    let dartAngle = (Math.atan(dartWidth / 2 / dartPoint.dist(centerPoint)) / Math.PI) * 180
    points[centerPointName + 'DartLeft'] = centerPoint.rotate(-dartAngle, dartPoint)
    points[centerPointName + 'DartRight'] = centerPoint.rotate(dartAngle, dartPoint)
    points[prevCpPointName + 'Dart'] = points[prevCpPointName].rotate(-dartAngle, dartPoint)
    points[nextCpPointName + 'Dart'] = points[nextCpPointName].rotate(dartAngle, dartPoint)
  }

  function average(points) {
    let sumX = 0
    let sumY = 0

    points.forEach((point) => {
      sumX += point.x
      sumY += point.y
    })

    return new Point(sumX / points.length, sumY / points.length)
  }

  function adjustDart(dartPoint, referencePath, tester, collisionPointName = null, adjust = 10) {
    let dist = adjust
    let offset = 0
    let lastCollision = false
    let probe = dartPoint.translate(offset, 0)
    // paths['refPath' + adjust + "--"] = referencePath.clone().addClass('contrast')

    for (let step = 0; step < 15; step++) {
      let testPath = tester(probe)
      const intersections = testPath.intersects(referencePath)
      let collision = intersections.length > 0
      // paths['refPath' + adjust + "-" + step] = testPath
      // if(collision) paths['refPath' + adjust + "-" + step].addClass('mark')
      if (collision !== lastCollision) {
        dist *= 1 / 3
      }
      if (collision && collisionPointName) {
        points[collisionPointName] = average(intersections)
      }
      lastCollision = collision
      offset += collision ? -dist : dist
      probe = dartPoint.translate(offset, 0)
      if (Math.abs(dist) < 0.1) {
        break
      }
    }
    return probe
  }

  constructDart(points.sfDart, 'sfBand', 'sfBandCp1', 'sfBandCp2', bottomDartWidth)
  constructDart(points.sbDart, 'sbBand', 'sbBandCp1', 'sbBandCp2', bottomDartWidth)
  constructDart(points.sfDart, 'sfArmpit', 'sfArmpitCp1', 'sfArmpitCp2', bustDartWidth)
  constructDart(points.sbDart, 'sbArmpit', 'sbArmpitCp2', 'sbArmpitCp1', backDartWidth)

  if (bottomDartWidth > 0) {
    points.sfDartSide = adjustDart(
      points.sfDart,
      new Path()
        .move(points.sfBandDartLeft)
        .curve(points.sfDart, points.sfDart, points.sfArmpitDartRight),
      (p) => new Path().move(points.sfArmpitDartLeft).curve(p, p, points.sfBandDartRight),
      'frontJoin',
      -10
    )

    points.sbDartSide = adjustDart(
      points.sbDart,
      new Path()
        .move(points.sbBandDartRight)
        .curve(points.sbDart, points.sbDart, points.sbArmpitDartLeft),
      (p) => new Path().move(points.sbArmpitDartRight).curve(p, p, points.sbBandDartLeft),
      'backJoin',
      10
    )
  } else {
    points.sfDartSide = points.sfDart
    points.sbDartSide = points.sbDart
    points.frontJoin = points.sfBand
    points.backJoin = points.sbBand
  }

  points.strapBackLeft = points.strapBackLeft.rotate(-options.backDartAngle, points.cbCenter)
  points.strapBackLeftCp = points.strapBackLeftCp.rotate(-options.backDartAngle, points.cbCenter)
  points.strapBackRight = points.strapBackRight.rotate(-options.backDartAngle, points.cbCenter)
  points.strapBackRightCp = points.strapBackRightCp.rotate(-options.backDartAngle, points.cbCenter)

  points.cfBand = utils
    .beamIntersectsX(points.sfBandCp1Dart, points.sfBandDartLeft, 0)
    .shiftFractionTowards(points.cfBand, 0.6)
  points.cbBand = utils
    .beamIntersectsX(points.sbBandCp2Dart, points.sbBandDartRight, points.cbBand.x)
    .shiftFractionTowards(points.cbBand, 0.6)

  paths.front = new Path()
    .move(points.cfBand)
    ._curve(points.sfBandCp1Dart, points.sfBandDartLeft)
    .curve(points.sfDart, points.sfDart, points.sfArmpitDartRight)
    .curve(points.sfArmpitCp2Dart, points.strapFrontRightCp, points.strapFrontRight)
    .line(points.strapFrontLeft)
    .curve(points.strapFrontLeftCp, points.cfNeckCp, points.cfNeck)
    .close()

  paths.frontStrap = new Path().move(points.strapFrontRight).line(points.strapFrontLeft).hide()

  paths.frontSideJoin = new Path()
    .move(points.sfBandDartLeft)
    .curve(points.sfDart, points.sfDart, points.sfArmpitDartRight)
    .hide()

  paths.frontBand = new Path()
    .move(points.cfBand)
    ._curve(points.sfBandCp1Dart, points.sfBandDartLeft)
    .hide()

  paths.back = new Path()
    .move(points.sbBandDartRight)
    .curve_(points.sbBandCp2Dart, points.cbBand)
    .line(points.cbNeck)
    .curve(points.cbNeckCp, points.strapBackLeftCp, points.strapBackLeft)
    .line(points.strapBackRight)
    .curve(points.strapBackRightCp, points.backCCenterCp1, points.backCCenter)
    .curve(points.backCCenterCp2, points.sbArmpitCp2Dart, points.sbArmpitDartLeft)
    .curve(points.sbDart, points.sbDart, points.sbBandDartRight)
    .close()

  paths.backBand = new Path()
    .move(points.sbBandDartRight)
    .curve_(points.sbBandCp2Dart, points.cbBand)
    .hide()

  paths.backStrap = new Path().move(points.strapBackLeft).line(points.strapBackRight).hide()

  paths.backSideJoin = new Path()
    .move(points.sbArmpitDartLeft)
    .curve(points.sbDart, points.sbDart, points.sbBandDartRight)
    .hide()

  paths.side = new Path()
    .move(points.sfBandDartRight)
    .curve(points.sfBandCp2Dart, points.sbBandCp1Dart, points.sbBandDartLeft)
    .curve(points.sbDartSide, points.sbDartSide, points.sbArmpitDartRight)
    .curve(points.sbArmpitCp1Dart, points.sfArmpitCp1Dart, points.sfArmpitDartLeft)
    .curve(points.sfDartSide, points.sfDartSide, points.sfBandDartRight)
    .close()

  paths.sideFrontJoin = new Path()
    .move(points.sfArmpitDartLeft)
    .curve(points.sfDartSide, points.sfDartSide, points.sfBandDartRight)
    .hide()

  paths.sideBackJoin = new Path()
    .move(points.sbBandDartLeft)
    .curve(points.sbDartSide, points.sbDartSide, points.sbArmpitDartRight)
    .hide()

  paths.sideBand = new Path()
    .move(points.sfBandDartRight)
    .curve(points.sfBandCp2Dart, points.sbBandCp1Dart, points.sbBandDartLeft)
    .hide()

  store.set(
    'waistband',
    2 * (paths.frontBand.length() + paths.sideBand.length() + paths.backBand.length())
  )

  return part
}

export const base = {
  name: 'sabrina.base',
  measurements: [
    'neck',
    'chest',
    'bustFront',
    'highBust',
    'underbust',
    'waist',
    'hpsToBust',
    'hpsToWaistFront',
    'waistToArmpit',
    'bustPointToUnderbust',
    'shoulderSlope',
    'shoulderToShoulder',
    'bustSpan',
  ],
  options: {
    length: { pct: 22.5, min: 0, max: 100, menu: 'fit' },
    neckWidthFront: 0.17,
    neckHeightFront: { pct: 35, min: 25, max: 80, menu: 'style' },
    neckHeightBack: { pct: 17, min: 10, max: 25, menu: 'style' },
    verticalStretch: { pct: 11, min: 0, max: 30, menu: 'fit' },
    strapStretch: { pct: 15, min: 0, max: 50, menu: 'fit' },
    horizontalBustStretch: { pct: 15, min: 0, max: 30, menu: 'fit' },
    horizontalBandStretch: { pct: 15, min: 0, max: 30, menu: 'fit' },
    armpitAdjustment: { pct: -1.5, min: -10, max: 10, ...pctBasedOn('waistToArmpit'), menu: 'fit' },
    strapPosition: { pct: 40, min: 20, max: 60, menu: 'fit' },
    strapAngle: { deg: 25, min: 0, max: 45, menu: 'fit' },
    strapWidth: { pct: 33, min: 15, max: 50, menu: 'style' },
    backWidth: {
      pct: 18,
      min: 5,
      max: 40,
      toAbs: (val, { measurements }) => (measurements.chest - measurements.bustFront) * val,
      fromAbs: (val, { measurements }) =>
        Math.round((10000 * val) / (measurements.chest - measurements.bustFront)) / 10000,
      menu: 'style',
    },
    bustPointFocus: { pct: 0, min: -50, max: 100, menu: 'fit' },
    backDartAngle: { deg: 15, min: 0, max: 15, menu: 'advanced' },
    upperBackShape: { pct: 40, min: 20, max: 60, menu: 'advanced' },
    lowerBackShape: { pct: 40, min: 20, max: 80, menu: 'advanced' },
    strapCurveFront: { pct: 5, min: 2, max: 10, menu: 'advanced' },
    strapCurveBack: 0.03,
    splitOffsetFront: { pct: 30, min: 15, max: 40, menu: 'advanced' },
    splitOffsetBack: { pct: 28, min: 15, max: 40, menu: 'advanced' },
  },
  draft: draftBase,
}
