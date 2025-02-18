import { frontSideDart as bellaFront } from '@freesewing/bella'
import { cbqc, hidePresets } from '@freesewing/core'
import * as options from './options.mjs'

const createTopRightDartPoints = (points, Path, options) => {
  const topPath = new Path()
    .move(points.waistUpDartRight)
    .curve(
      points.waistUpDartRightCpUp,
      points.shoulderDartTipCpDownOutside,
      points.shoulderDartOutside
    )

  const split1 = topPath.shiftFractionAlong(0.15 + options.shoulderDartCurvature * -1)
  const split2 = topPath.shiftFractionAlong(0.5 + options.shoulderDartCurvature * -1)
  const split3 = topPath.shiftFractionAlong(0.9 + options.shoulderDartCurvature * -0.5)

  const splitPath1 = topPath.split(split1)
  const splitPath2 = splitPath1[1].split(split2)
  const splitPath3 = splitPath2[1].split(split3)

  const splittedPath1 = splitPath1[0].clone()
  const splittedPath2 = splitPath2[0].clone()
  const splittedPath3 = splitPath3[0].clone()
  const splittedPath4 = splitPath3[1].clone()

  points.shoulderDartPart1from = splittedPath1.ops[0].to.copy()
  points.shoulderDartPart1cp1 = splittedPath1.ops[1].cp1.copy()
  points.shoulderDartPart1cp2 = splittedPath1.ops[1].cp2.copy()
  points.shoulderDartPart1to = splittedPath1.ops[1].to.copy()
  points.shoulderDartPart2from = splittedPath2.ops[0].to.copy()
  points.shoulderDartPart2cp1 = splittedPath2.ops[1].cp1.copy()
  points.shoulderDartPart2cp2 = splittedPath2.ops[1].cp2.copy()
  points.shoulderDartPart2to = splittedPath2.ops[1].to.copy()
  points.shoulderDartPart3from = splittedPath3.ops[0].to.copy()
  points.shoulderDartPart3cp1 = splittedPath3.ops[1].cp1.copy()
  points.shoulderDartPart3cp2 = splittedPath3.ops[1].cp2.copy()
  points.shoulderDartPart3to = splittedPath3.ops[1].to.copy()
  points.shoulderDartPart4from = splittedPath4.ops[0].to.copy()
  points.shoulderDartPart4cp1 = splittedPath4.ops[1].cp1.copy()
  points.shoulderDartPart4cp2 = splittedPath4.ops[1].cp2.copy()
  points.shoulderDartPart4to = splittedPath4.ops[1].to.copy()

  const sp2cp2a = points.shoulderDartPart2to.angle(points.shoulderDartPart2cp2)
  const sp2cp2d = points.shoulderDartPart2to.dist(points.shoulderDartPart2cp2)
  const sp3cp1a = points.shoulderDartPart3from.angle(points.shoulderDartPart3cp1)
  const sp3cp1d = points.shoulderDartPart3from.dist(points.shoulderDartPart3cp1)
  points.shoulderDartPart2to = points.shoulderDartPart2to.rotate(
    options.shoulderDartCurvature * 100,
    points.shoulderDartPart2from
  )
  points.shoulderDartPart3from = points.shoulderDartPart2to.copy()
  points.shoulderDartPart2cp2 = points.shoulderDartPart2to.shift(sp2cp2a, sp2cp2d)
  points.shoulderDartPart3cp1 = points.shoulderDartPart3from.shift(sp3cp1a, sp3cp1d)

  return new Path()
    .move(points.shoulderDartPart1from)
    .curve(points.shoulderDartPart1cp1, points.shoulderDartPart1cp2, points.shoulderDartPart1to)
    .curve(points.shoulderDartPart2cp1, points.shoulderDartPart2cp2, points.shoulderDartPart2to)
    .curve(points.shoulderDartPart3cp1, points.shoulderDartPart3cp2, points.shoulderDartPart3to)
    .curve(points.shoulderDartPart4cp1, points.shoulderDartPart4cp2, points.shoulderDartPart4to)
}

const createRightDartPoints = (points, Path, paths, diff, utils, options) => {
  const radius = points.waistDartRight.dist(points.sideHemInitial)

  points.waistDartRight = points.waistDartRight.rotate(
    utils.rad2deg(Math.atan(diff / radius)),
    points.sideHemInitial
  )

  let outsideSeam = new Path()
    .move(points.waistDartRight)
    .curve(points.bustAcp, points.shoulderDartTipCpDownOutside, points.shoulderDartOutside)

  points.waistUpDartRight = outsideSeam.shiftAlong(
    points.waistDartRight.dist(points.waistDartRightCp) * 0.5
  )
  points.waistUpDartRightCpDown = points.waistUpDartRight.shiftFractionTowards(
    points.waistDartRight,
    0.25
  )
  points.waistUpDartRightCpUp = points.waistUpDartRight.shiftFractionTowards(
    points.waistDartRight,
    -0.6
  )
  points.waistCpUp = points.waistDartRight
    .shiftTowards(points.sideHemInitial, points.waistDartRight.dist(points.waistUpDartRight) * 0.25)
    .rotate(90, points.waistDartRight)
  points.waistCircleInsideCp1 = points.armholeDartTip.shiftTowards(
    points.armholeDartTipCpDownInside,
    -0.5 * cbqc * points.armholeDartInside.dist(points.armholeDartTip)
  )

  paths.princessSeam = new Path()
    .move(points.waistDartRight)
    .curve(points.waistCpUp, points.waistUpDartRightCpDown, points.waistUpDartRight)
    .join(createTopRightDartPoints(points, Path, options))
    .reverse()
    .hide()
  return paths.princessSeam.length()
}

const createArmholeDartPoints = (points, paths, Path, direction) => {
  const dist = points.armholeDartTipInside.dist(points.armholeDartTipCpDownInside)
  points.waistCircleOutsideCp1 = points.waistCircleOutsideCp1.shiftTowards(
    points.waistUpDartRight,
    direction
  )
  points.armholeDartTipCpDownInside = points.waistCircleInsideCp1.shiftOutwards(
    points.armholeDartTipInside,
    dist
  )

  paths.armholeTempCircleOutside = new Path()
    .move(points.armholeDartOutside)
    .curve(points.armholeCircleOutsideCp1, points.waistCircleOutsideCp1, points.waistUpDartRight)
    .curve(points.waistUpDartRightCpDown, points.waistCpUp, points.waistDartRight)
    .hide()
  paths.armholeTempCircleInside = new Path()
    .move(points.armholeDartInside)
    .curve(points.armholeCircleInsideCp1, points.waistCircleInsideCp1, points.armholeDartTipInside)
    .curve(points.armholeDartTipCpDownInside, points.waistDartLeftCp, points.waistDartLeft)
    .hide()
}

export const frontPoints = {
  name: 'noble.frontPoints',
  from: bellaFront,
  hide: hidePresets.HIDE_ALL,
  options,
  draft: ({ log, points, Path, paths, snippets, options, macro, part, utils }) => {
    // Hide Bella paths
    for (const key of Object.keys(paths)) paths[key].hide()
    for (const i in snippets) delete snippets[i]

    // Remove macros from Bella
    macro('rmtitle')
    macro('rmscalebox')

    const waistDartSize = points.waistDartLeft.dist(points.waistDartRight)
    const waistDartMove = (waistDartSize / 2) * options.waistdartposition

    points.waistDartLeft = points.waistDartLeft.shiftTowards(points.cfHem, waistDartMove * -1)
    points.waistDartLeftCp = points.waistDartLeftCp.shift(0, waistDartMove)
    points.waistDartRight = points.waistDartRight.shiftTowards(points.sideHemInitial, waistDartMove)

    points.shoulderDartInside = points.hps.shiftFractionTowards(
      points.shoulder,
      options.dartPosition == 'shoulder' ? options.shoulderDartPosition : 0.5
    )
    points.orgShoulder = points.shoulder.clone()
    points.orgArmhole = points.armhole.clone()
    points.orgArmholeCp2 = points.armholeCp2.clone()
    points.orgArmholePitch = points.armholePitch.clone()
    points.orgArmholePitchCp1 = points.armholePitchCp1.clone()
    points.orgArmholePitchCp2 = points.armholePitchCp2.clone()
    const armholePath = new Path()
      .move(points.shoulder)
      ._curve(points.armholePitchCp2, points.armholePitch)
      .curve(points.armholePitchCp1, points.armholeCp2, points.armhole)

    points.armholeDartInside = armholePath.shiftFractionAlong(options.armholeDartPosition)
    points.armholeDartOutside = points.armholeDartInside.clone()

    const armholePaths = armholePath.split(points.armholeDartInside)

    const armholePathInside = armholePaths[0].clone().hide()
    const armholePathOutside = armholePaths[1].clone().hide()
    const armholeDartAngle =
      armholePathInside.reverse().shiftAlong(1).angle(armholePathOutside.shiftAlong(1)) - 90

    points.armholeDartArmhole = points.armholeDartInside.shiftFractionTowards(
      points.armholeDartOutside,
      0.5
    )
    points.armholeDartTip = points.armholeDartArmhole.shiftFractionTowards(
      points.bust,
      options.upperDartLength
    )
    points.armholeCircleInsideCp1 = points.armholeDartInside.shift(
      armholeDartAngle,
      cbqc * points.armholeDartInside.dist(points.armholeDartTip)
    )
    points.armholeCircleOutsideCp1 = points.armholeCircleInsideCp1.clone()

    points.shoulderCp1 = armholePathInside.ops[1].cp1.clone()
    points.armholeInsidePitch = armholePathInside.ops[1].to.clone()
    points.armholeInsidePitchCp2 = armholePathInside.ops[1].cp2.clone()
    if (armholePathInside.ops.length == 2) {
      points.armholeInsidePitchCp1 = points.armholeDartInside.clone()
      points.armholeDartInsideCp2 = points.armholeDartInside.clone()
    } else {
      points.armholeInsidePitchCp1 = armholePathInside.ops[2].cp1.clone()
      points.armholeDartInsideCp2 = armholePathInside.ops[2].cp2.clone()
    }
    points.armholeDartOutsideCp1 = armholePathOutside.ops[1].cp1.clone()
    points.armholeOutsidePitch = armholePathOutside.ops[1].to.clone()
    points.armholeOutsidePitchCp2 = armholePathOutside.ops[1].cp2.clone()
    if (armholePathOutside.ops.length == 2) {
      points.armholeOutsidePitchCp1 = points.armhole.clone()
      points.armholeCp2 = points.armhole.clone()
    } else {
      points.armholeOutsidePitchCp1 = armholePathOutside.ops[2].cp1.clone()
      points.armholeCp2 = armholePathOutside.ops[2].cp2.clone()
    }

    if (points.armholeDartInside.sitsRoughlyOn(points.armholeInsidePitch)) {
      paths.armholeInside = new Path()
        .move(points.armholeDartInside)
        .curve(points.armholeInsidePitchCp2, points.shoulderCp1, points.shoulder)
        .hide()
    } else {
      paths.armholeInside = new Path()
        .move(points.armholeDartInside)
        .curve(points.armholeDartInsideCp2, points.armholeInsidePitchCp1, points.armholeInsidePitch)
        .curve(points.armholeInsidePitchCp2, points.shoulderCp1, points.shoulder)
        .hide()
    }

    let rotateAngle =
      points.shoulderDartInside.angle(points.bustA) - points.bustDartTop.angle(points.bustA)
    if (rotateAngle < 0) {
      rotateAngle += 360
    }
    if (rotateAngle > 360) {
      rotateAngle -= 360
    }

    points.shoulderDartCpTop = points.bustDartCpTop.rotate(rotateAngle, points.bustA)
    points.shoulderDartCpBottom = points.bustDartCpBottom.rotate(rotateAngle, points.bustA)

    rotateAngle =
      points.armholeDartInside.angle(points.bustA) - points.bustDartTop.angle(points.bustA)
    if (rotateAngle < 0) {
      rotateAngle += 360
    }
    if (rotateAngle > 360) {
      rotateAngle -= 360
    }

    points.armholeDartCpTop = points.bustDartCpTop.rotate(rotateAngle, points.bustA)
    points.armholeDartCpBottom = points.bustDartCpBottom.rotate(rotateAngle, points.bustA)

    const spreadAngle =
      /*360 -*/ points.bustA.angle(points.bustDartBottom) - points.bustA.angle(points.bustDartTop)

    points.shoulderDartOutside = points.shoulderDartInside.rotate(spreadAngle, points.bustA)
    points.shoulderDartShoulder = points.shoulderDartInside.shiftFractionTowards(
      points.shoulderDartOutside,
      0.5
    )

    points.shoulderDartTip = points.shoulderDartShoulder.shiftFractionTowards(
      points.bust,
      options.upperDartLength
    )
    const dartRatio =
      new Path().move(points.waistDartHem).line(points.waistDartTip).length() /
      new Path().move(points.shoulderDartShoulder).line(points.shoulderDartTip).length()

    points.shoulder = points.shoulder.rotate(spreadAngle, points.bustA)
    points.armhole = points.armhole.rotate(spreadAngle, points.bustA)
    points.armholeCp2 = points.armholeCp2.rotate(spreadAngle, points.bustA)
    points.armholePitch = points.armholePitch.rotate(spreadAngle, points.bustA)
    points.armholePitchCp1 = points.armholePitchCp1.rotate(spreadAngle, points.bustA)
    points.armholePitchCp2 = points.armholePitchCp2.rotate(spreadAngle, points.bustA)
    points.armholeCircleOutsideCp1 = points.armholeCircleOutsideCp1.rotate(
      spreadAngle,
      points.bustA
    )
    points.armholeDartOutside = points.armholeDartOutside.rotate(spreadAngle, points.bustA)
    points.armholeDartOutsideCp1 = points.armholeDartOutsideCp1.rotate(spreadAngle, points.bustA)
    points.armholeOutsidePitchCp2 = points.armholeOutsidePitchCp2.rotate(spreadAngle, points.bustA)
    points.armholeOutsidePitch = points.armholeOutsidePitch.rotate(spreadAngle, points.bustA)
    points.armholeOutsidePitchCp1 = points.armholeOutsidePitchCp1.rotate(spreadAngle, points.bustA)

    if (points.armhole.sitsRoughlyOn(points.armholeOutsidePitch)) {
      paths.armholeOutside = new Path()
        .move(points.armholeDartOutside)
        .curve(points.armholeDartOutsideCp1, points.armholeOutsidePitchCp2, points.armhole)
        .hide()
    } else {
      paths.armholeOutside = new Path()
        .move(points.armholeDartOutside)
        .curve(
          points.armholeDartOutsideCp1,
          points.armholeOutsidePitchCp2,
          points.armholeOutsidePitch
        )
        .curve(points.armholeOutsidePitchCp1, points.armholeCp2, points.armhole)
        .hide()
    }

    paths.armholeTempDart = new Path()
      .move(points.armholeDartOutside)
      ._curve(points.armholeDartCpBottom, points.armholeDartTip)
      .curve_(points.armholeDartCpTop, points.armholeDartInside)
      .hide()

    points.shoulderDartTipCpDownOutside = points.shoulderDartOutside.shiftFractionTowards(
      points.bust,
      1 + (1 - options.upperDartLength) + (1 - options.waistDartLength) * dartRatio
    )

    points.shoulderDartTipCpDownInside = points.shoulderDartInside.shiftFractionTowards(
      points.shoulderDartTip,
      1 + (1 - options.upperDartLength) + (1 - options.waistDartLength) * dartRatio
    )
    points.armholeDartTipCpDownInside = points.armholeDartTip.shiftFractionTowards(
      points.waistDartLeft,
      1 - options.upperDartLength + (1 - options.waistDartLength) * dartRatio
    )

    points.bustAcp = points.waistDartRight.shiftOutwards(points.bustA, 10)

    paths.shoulderInsideSeam = new Path()
      .move(points.waistDartLeft)
      .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
      .line(points.shoulderDartInside)
      .hide()

    paths.armholeInsideSeam = new Path()
      .move(points.waistDartLeft)
      .curve(points.waistDartLeftCp, points.armholeDartTipCpDownInside, points.armholeDartTip)
      .hide()

    paths.sOutsideSeam = new Path()
      .move(points.waistDartRight)
      .curve(points.bustAcp, points.shoulderDartTipCpDownOutside, points.shoulderDartOutside)
      .hide()

    points.waistDartRightCp = points.bustAcp.clone()

    const shoulderInsideSeam = new Path()
      .move(points.waistDartLeft)
      .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
      .line(points.shoulderDartInside)
      .hide()

    points.waistUpDartLeft = paths.armholeInsideSeam.shiftAlong(
      points.waistDartLeft.dist(points.armholeDartTip) * 0.5
    )
    points.waistCircleInsideCp1 = points.waistUpDartLeft.shiftTowards(
      points.waistDartLeft,
      -0.5 * cbqc * points.armholeDartOutside.dist(points.armholeDartTip)
    )
    points.shoulderDartTipCpDownOutside = points.shoulderDartTipCpDownOutside
      .rotate(2.5, points.shoulderDartOutside)
      .shiftFractionTowards(points.shoulderDartOutside, 0.2)

    let iteration = 1
    let diff = 0

    let rightDartLength = createRightDartPoints(points, Path, paths, diff, utils, options)
    do {
      rightDartLength = createRightDartPoints(points, Path, paths, diff, utils, options)

      diff = shoulderInsideSeam.length() - rightDartLength
      iteration++
    } while ((diff > 1 || diff < -1) && iteration < 100)

    if (iteration >= 100) {
      log.error('Something is not quite right here!')
    }
    points.waistDartRightCp = points.bustAcp.clone()
    points.armholeDartTipInside = points.armholeDartTip.clone()
    points.waistCircleOutsideCp1 = points.waistUpDartRight.shiftTowards(
      points.waistDartRight,
      -1 * cbqc * points.armholeDartOutside.dist(points.armholeDartTip)
    )

    createArmholeDartPoints(points, paths, Path, 0)
    diff = paths.armholeTempCircleOutside.length() - paths.armholeTempCircleInside.length()

    iteration = 0
    do {
      createArmholeDartPoints(points, paths, Path, diff)

      diff = paths.armholeTempCircleOutside.length() - paths.armholeTempCircleInside.length()
      iteration++
    } while ((diff < -1 || diff > 1) && iteration < 100)
    if (iteration >= 100) {
      log.error('Something is not quite right here too!')
    }

    return part
  },
}
