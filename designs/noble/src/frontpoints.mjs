import { frontSideDart as bellaFront } from '@freesewing/bella'
import { hidePresets } from '@freesewing/core'
import * as options from './options.mjs'

function nobleFrontPoints({ log, points, Path, paths, snippets, options, macro, part }) {
  const bCircle = 0.552284749831

  // Hide Bella paths
  for (let key of Object.keys(paths)) paths[key].hide()
  for (let i in snippets) delete snippets[i]

  // Remove macros from Bella
  macro('title', false)
  macro('scalebox', false)

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
  let armholePath = new Path()
    .move(points.shoulder)
    ._curve(points.armholePitchCp2, points.armholePitch)
    .curve(points.armholePitchCp1, points.armholeCp2, points.armhole)

  points.armholeDartInside = armholePath.shiftFractionAlong(options.armholeDartPosition)
  points.armholeDartOutside = points.armholeDartInside.clone()

  let armholePaths = armholePath.split(points.armholeDartInside)

  let armholePathInside = armholePaths[0].clone().hide()
  let armholePathOutside = armholePaths[1].clone().hide()
  let armholeDartAngle =
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
    bCircle * points.armholeDartInside.dist(points.armholeDartTip)
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

  let spreadAngle =
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
  let dartRatio =
    new Path().move(points.waistDartHem).line(points.waistDartTip).length() /
    new Path().move(points.shoulderDartShoulder).line(points.shoulderDartTip).length()

  points.shoulder = points.shoulder.rotate(spreadAngle, points.bustA)
  points.armhole = points.armhole.rotate(spreadAngle, points.bustA)
  points.armholeCp2 = points.armholeCp2.rotate(spreadAngle, points.bustA)
  points.armholePitch = points.armholePitch.rotate(spreadAngle, points.bustA)
  points.armholePitchCp1 = points.armholePitchCp1.rotate(spreadAngle, points.bustA)
  points.armholePitchCp2 = points.armholePitchCp2.rotate(spreadAngle, points.bustA)
  points.armholeCircleOutsideCp1 = points.armholeCircleOutsideCp1.rotate(spreadAngle, points.bustA)
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
  // points.shoulderDartTipCpDownOutside = points.shoulderDartTipCpDownOutside.rotate( options.dartOutsideCP *10, points.shoulderDartOutside )

  points.shoulderDartTipCpDownInside = points.shoulderDartInside.shiftFractionTowards(
    points.shoulderDartTip,
    1 + (1 - options.upperDartLength) + (1 - options.waistDartLength) * dartRatio
  )
  points.armholeDartTipCpDownInside = points.armholeDartTip.shiftFractionTowards(
    // points.waistDartHem,
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

  let shoulderInsideSeam = new Path()
    .move(points.waistDartLeft)
    .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
    .line(points.shoulderDartInside)
    .hide()

  points.waistUpDartLeft = paths.armholeInsideSeam.shiftAlong(
    points.waistDartLeft.dist(points.armholeDartTip) * 0.5
  )
  points.waistCircleInsideCp1 = points.waistUpDartLeft.shiftTowards(
    points.waistDartLeft,
    -0.5 * bCircle * points.armholeDartOutside.dist(points.armholeDartTip)
  )
  points.shoulderDartTipCpDownOutside = points.shoulderDartTipCpDownOutside
    .rotate(-2.5, points.shoulderDartOutside)
    .shiftFractionTowards(points.shoulderDartOutside, 0.2)

  let iteration = 1
  let diff = 0
  do {
    points.waistDartRight = points.waistDartRight.rotate(diff * 0.1, points.sideHemInitial)

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
    // points.waistUpDartRightCpUp = points.waistUpDartRight.shiftFractionTowards( points.waistDartRight, -.25 )
    points.waistUpDartRightCpUp = points.waistUpDartRight.shiftFractionTowards(
      points.waistDartRight,
      -0.6
    )
    points.waistCpUp = points.waistDartRight
      .shiftTowards(
        points.sideHemInitial,
        points.waistDartRight.dist(points.waistUpDartRight) * 0.25
      )
      .rotate(90, points.waistDartRight)
    points.waistCircleInsideCp1 = points.armholeDartTip.shiftTowards(
      points.armholeDartTipCpDownInside,
      -0.5 * bCircle * points.armholeDartInside.dist(points.armholeDartTip)
    )

    outsideSeam = new Path()
      .move(points.waistDartRight)
      .curve(points.waistCpUp, points.waistUpDartRightCpDown, points.waistUpDartRight)
      .curve(
        points.waistUpDartRightCpUp,
        points.shoulderDartTipCpDownOutside,
        points.shoulderDartOutside
      )

    diff = shoulderInsideSeam.length() - outsideSeam.length()
    iteration++
  } while ((diff > 1 || diff < -1) && iteration < 200)
  if (iteration >= 200) {
    log.error('Something is not quite right here!')
  }
  points.waistDartRightCp = points.bustAcp.clone()
  points.armholeDartTipInside = points.armholeDartTip.clone()
  points.waistCircleOutsideCp1 = points.waistUpDartRight.shiftTowards(
    points.waistDartRight,
    -1 * bCircle * points.armholeDartOutside.dist(points.armholeDartTip)
  )

  diff = 0
  iteration = 0
  do {
    let dist = points.armholeDartTipInside.dist(points.armholeDartTipCpDownInside)
    if (points.armholeDartTipInside.x > points.waistCircleOutsideCp1) {
      points.armholeDartTipInside.x = points.armholeDartTipInside.x - 0.5
      points.armholeDartTipInside.y = points.armholeDartTipInside.y + 0.5
    } else {
      points.waistCircleOutsideCp1 = points.waistCircleOutsideCp1.shiftTowards(
        points.waistUpDartRight,
        diff > 0 ? 1 : -1
      )
    }
    points.armholeDartTipCpDownInside = points.waistCircleInsideCp1.shiftOutwards(
      points.armholeDartTipInside,
      dist
    )

    paths.armholeTempCircleOutside = new Path()
      .move(points.armholeDartOutside)
      .curve(points.armholeCircleOutsideCp1, points.waistCircleOutsideCp1, points.waistUpDartRight)
      .curve(points.waistUpDartRightCpDown, points.waistCpUp, points.waistDartRight)
      .hide()
      .attr('class', 'lining')
    paths.armholeTempCircleInside = new Path()
      .move(points.armholeDartInside)
      .curve(
        points.armholeCircleInsideCp1,
        points.waistCircleInsideCp1,
        points.armholeDartTipInside
      )
      .curve(points.armholeDartTipCpDownInside, points.waistDartLeftCp, points.waistDartLeft)
      .hide()
      .attr('class', 'lining')

    diff = paths.armholeTempCircleOutside.length() - paths.armholeTempCircleInside.length()
    iteration++
  } while ((diff < -1 || diff > 1) && iteration < 200)
  if (iteration >= 200) {
    log.error('Something is not quite right here!')
  }

  return part
}

export const frontPoints = {
  name: 'noble.frontPoints',
  from: bellaFront,
  hide: hidePresets.HIDE_ALL,
  options,
  draft: nobleFrontPoints,
}
