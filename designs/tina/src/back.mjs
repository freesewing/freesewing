import { back as teaganBack } from '@freesewing/teagan'
import { hidePresets } from '@freesewing/core'

function tinaBack({
  Path,
  Snippet,
  paths,
  points,
  part,
  complete,
  options,
  snippets,
  store,
  units,
  sa,
}) {
  paths.saBase = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .hide()

  paths.neck = new Path()
    .move(points.neck)
    .curve(points.neckCp2, points.cbNeckCp1, points.cbNeck)
    .hide()

  if (sa)
    paths.sa = new Path()
      .move(points.cfHem)
      .join(paths.hemBase.offset(sa * 2))
      .join(paths.sideSeam.offset(sa))
      .join(paths.saBase.offset(sa))
      .join(paths.neck.offset(sa * 2))
      .line(points.cbNeck)
      .attr('class', 'fabric sa')

  if (complete)
    paths.waist = new Path().move(points.cbWaist).line(points.waist).attr('class', 'help')

  if (options.frontCoverage > 0) {
    const sideOffset = points.hem.shiftFractionTowards(points.armhole, options.frontCoverage).y
    let intersection = paths.sideSeam.intersectsY(sideOffset)
    points.sideJoin = intersection.length > 0 ? intersection[0] : points.armhole
    snippets.sideJoin = new Snippet('notch', points.sideJoin)
  }

  // Not relevant for tina
  store.unflag.info('teagan:neckOpeningLength')

  return part
}

export const back = {
  name: 'tina.back',
  from: teaganBack,
  measurements: ['hips', 'waist'],
  hide: hidePresets.HIDE_TREE,
  options: {},
  draft: tinaBack,
}
