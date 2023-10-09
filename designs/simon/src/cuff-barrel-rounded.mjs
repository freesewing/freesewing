import { draftBarrelCuff, decorateBarrelCuff, paperlessBarrelCuff } from './shared.mjs'

export const draftRoundedBarrelCuff = ({ store, sa, utils, points, Path, paths, macro, part }) => {
  draftBarrelCuff(part)
  const height = store.get('cuffHeight')
  // Macros will return the auto-generated IDs
  const ids = {
    topLeftRound: macro('round', {
      id: 'topLeftRound',
      from: points.topRight,
      to: points.bottomLeft,
      via: points.topLeft,
      radius: height / 3,
    }),
    topRightRound: macro('round', {
      id: 'topRightRound',
      from: points.bottomRight,
      to: points.topLeft,
      via: points.topRight,
      radius: height / 3,
    }),
  }
  // Create points from them with easy names
  for (const side in ids) {
    for (const id of ['start', 'cp1', 'cp2', 'end']) {
      points[`${side}${utils.capitalize(id)}`] = points[ids[side].points[id]].copy()
    }
  }
  points.leftAngleBottom = points.topLeft.shift(-90, height / 3)
  points.rightAngleTop = points.topRight.shift(180, height / 3)
  points.rightAngleBottom = points.topRight.shift(-90, height / 3)
  paths.seam = new Path()
    .move(points.topLeftRoundEnd)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRightRoundStart)
    .curve(points.topRightRoundCp1, points.topRightRoundCp2, points.topRightRoundEnd)
    .line(points.topLeftRoundStart)
    .curve(points.topLeftRoundCp1, points.topLeftRoundCp2, points.topLeftRoundEnd)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 4, from: 'fabric' })

  decorateBarrelCuff(part)
  paperlessBarrelCuff(part)
  macro('vd', {
    id: 'hRound',
    from: points.topRightRoundStart,
    to: points.topRightRoundEnd,
    x: points.topRightRoundStart.x + 15 + sa,
  })

  return part
}
