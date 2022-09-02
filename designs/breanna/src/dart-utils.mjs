// Where to cut for a dart in a given location
export const getDartInsertionPoint = (points, utils, loc, angle) => {
  let tip = points.bustPoint
  switch (loc) {
    case 700:
      return points.cfWaist.clone()
    case 800:
      return points.cfBust.clone()
    case 900:
      return utils.beamIntersectsX(tip, points.cfBust.rotate(angle * -0.5, tip), 0)
    case 1000:
      return utils.beamIntersectsX(tip, points.cfBust.rotate(angle * -1, tip), 0)
    case 1100:
      return points.cfNeck.clone()
    case 1130:
      return points.hps.clone()
    case 1200:
      return points.hps.shiftFractionTowards(points.shoulder, 0.5)
    case 1230:
      return points.shoulder.clone()
    case 1300:
      return points.armholePitch.clone()
    case 1330:
      return points.armhole.clone()
    case 1400:
      return points.bustSide.clone()
    case 1500:
      return utils.beamsIntersect(
        tip,
        points.bustSide.rotate(angle * -0.5, tip),
        points.armhole,
        points.waist
      )
    case 1600:
      return utils.beamsIntersect(
        tip,
        points.bustSide.rotate(angle * -1, tip),
        points.armhole,
        points.waist
      )
    case 1700:
      return points.waist.clone()
    default:
      return false
  }
}

// What points need to be rotated after cutting the primary bust dart
export const getPrimaryDartRotationList = (loc) => {
  let rotate = ['cfWaist']
  if (loc >= 1100) rotate.push('cfNeck')
  if (loc >= 1130) rotate.push('hpsCp2')
  if (loc >= 1200) rotate.push('hps')
  if (loc >= 1300) rotate.push('shoulder', 'shoulderCp1', 'armholePitchCp2')
  if (loc >= 1330) rotate.push('armholeCp2', 'armholePitchCp1', 'armholePitch')
  if (loc >= 1400) rotate.push('armhole')

  return rotate
}

// What points need to be rotated after cutting the secondary bust dart
// loc1 = primary bust dart location
// loc2 = secondary bust dart location
export const getSecondaryDartRotationList = (loc1, loc2) => {
  let rotate = ['primaryBustDart1']
  if (loc1 <= 700 && loc2 >= 800) rotate.push('cfWaist')
  if (loc1 <= 1000 && loc2 >= 1100) rotate.push('cfNeck')
  if (loc1 <= 1100 && loc2 >= 1130) rotate.push('hpsCp2')
  if (loc1 <= 1130 && loc2 >= 1200) rotate.push('hps')
  if (loc1 <= 1230 && loc2 >= 1300) rotate.push('shoulder', 'shoulderCp1', 'armholePitchCp2')
  if (loc1 <= 1300 && loc2 >= 1330) rotate.push('armholeCp2', 'armholePitchCp1', 'armholePitch')
  if (loc1 <= 1330 && loc2 >= 1400) rotate.push('armhole')

  return rotate
}

export const getDartLocationsAsNumbers = (options) => {
  let loc1 = options.primaryBustDart
  let loc2 = options.secondaryBustDart
  loc1 = Number(loc1.slice(0, 2) + loc1.slice(-2))
  if (loc2 === 'none') return [loc1, 0]
  else loc2 = Number(loc2.slice(0, 2) + loc2.slice(-2))
  if (loc1 > loc2) return [loc2, loc1]
  else return [loc1, loc2]
}

export const getDartPaths = (Path, points) => [
  new Path()
    .line(points.primaryBustDart1)
    .line(points.primaryBustDartTip)
    .line(points.primaryBustDart2),
  new Path()
    .line(points.secondaryBustDart1)
    .line(points.secondaryBustDartTip)
    .line(points.secondaryBustDart2),
]

export const getSaDartPaths = (Path, points) => [
  new Path()
    .line(points.primaryBustDart1)
    .line(points.primaryBustDartEdge)
    .line(points.primaryBustDart2),
  new Path()
    .line(points.secondaryBustDart1)
    .line(points.secondaryBustDartEdge)
    .line(points.secondaryBustDart2),
]

/*
 * Once the front is constructed with the theorethical bust darts, we
 * still need to turn them into darts that make sense in practice.
 * This method takes care of that
 */
export const applyBustDarts = (points, options, utils) => {
  // Find the bust dart edge point
  points.primaryBustDartEdge = utils.beamsIntersect(
    points.primaryBustDart1,
    points.primaryBustDartTip.rotate(90, points.primaryBustDart1),
    points.primaryBustDart2,
    points.primaryBustDartTip.rotate(90, points.primaryBustDart2)
  )
  points.primaryBustDartTip = points.primaryBustDartEdge.shiftFractionTowards(
    points.primaryBustDartTip,
    options.primaryBustDartLength
  )
  // Do the same for the secondary dart
  if (typeof points.secondaryBustDart1 !== 'undefined') {
    points.secondaryBustDartEdge = utils.beamsIntersect(
      points.secondaryBustDart1,
      points.secondaryBustDartTip.rotate(90, points.secondaryBustDart1),
      points.secondaryBustDart2,
      points.secondaryBustDartTip.rotate(90, points.secondaryBustDart2)
    )
    points.secondaryBustDartTip = points.secondaryBustDartEdge.shiftFractionTowards(
      points.secondaryBustDartTip,
      options.secondaryBustDartLength
    )
  }
}
