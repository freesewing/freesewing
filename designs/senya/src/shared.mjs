export function bottomAndSide(centerWaistline, sideWaistline, armhole, waistlineCp, Path) {
  return new Path().move(centerWaistline).line(sideWaistline).curve_(waistlineCp, armhole)
}

export function sleevecap(armhole, sleeveEnd, cp1, cp2, Path) {
  return new Path().move(armhole).curve(cp2, cp1, sleeveEnd)
}

export function shoulderAndNeck(sleeveEnd, neckSide, neckCenter, neckCp1, neckCp2, Path) {
  return new Path().move(sleeveEnd).line(neckSide).curve(neckCp2, neckCp1, neckCenter)
}

export function waistlineHeight(hpsToUnderbust, hpsToWaistBack, lowerPct) {
  return hpsToUnderbust + (hpsToWaistBack - hpsToUnderbust) * lowerPct
}
