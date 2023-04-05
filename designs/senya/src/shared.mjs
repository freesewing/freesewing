export function bottomAndSide(centerWaist, sideWaist, armhole, waistCp, Path) {
  return new Path().move(centerWaist).line(sideWaist).curve_(waistCp, armhole)
}

export function sleevecap(armhole, sleeveEnd, cp1, cp2, Path) {
  return new Path().move(armhole).curve(cp2, cp1, sleeveEnd)
}

export function shoulderAndNeck(sleeveEnd, neckSide, neckCenter, neckCp1, neckCp2, Path) {
  return new Path().move(sleeveEnd).line(neckSide).curve(neckCp2, neckCp1, neckCenter)
}
