export function bottomAndSide(centerMidriffTop, sideMidriffTop, armhole, midriffTopCp, Path) {
  return new Path().move(centerMidriffTop).line(sideMidriffTop).curve_(midriffTopCp, armhole)
}

export function sleevecap(armhole, sleeveEnd, cp1, cp2, Path) {
  return new Path().move(armhole).curve(cp2, cp1, sleeveEnd)
}

export function shoulderAndNeck(sleeveEnd, neckSide, neckCenter, neckCp1, neckCp2, Path) {
  return new Path().move(sleeveEnd).line(neckSide).curve(neckCp2, neckCp1, neckCenter)
}
