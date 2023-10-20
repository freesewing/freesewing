import { draftFrenchCuff, decorateFrenchCuff, paperlessFrenchCuff } from './shared.mjs'

export const draftRoundedFrenchCuff = ({
  store,
  sa,
  points,
  Path,
  paths,
  complete,
  utils,
  macro,
  part,
}) => {
  draftFrenchCuff(part)
  const height = store.get('cuffHeight')
  // Macros will return the auto-generated IDs
  const ids = {
    topLeft: macro('round', {
      id: 'topLeft',
      from: points.topRight,
      to: points.bottomLeft,
      via: points.topLeft,
      radius: height / 3,
    }),
    bottomLeft: macro('round', {
      id: 'bottomLeft',
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      radius: height / 3,
    }),
    bottomRight: macro('round', {
      id: 'bottomRight',
      from: points.bottomLeft,
      to: points.topRight,
      via: points.bottomRight,
      radius: height / 3,
    }),
    topRight: macro('round', {
      id: 'topRight',
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

  paths.seam = new Path()
    .move(points.topLeftEnd)
    .line(points.bottomLeftStart)
    .curve(points.bottomLeftCp1, points.bottomLeftCp2, points.bottomLeftEnd)
    .line(points.bottomRightStart)
    .curve(points.bottomRightCp1, points.bottomRightCp2, points.bottomRightEnd)
    .line(points.topRightStart)
    .curve(points.topRightCp1, points.topRightCp2, points.topRightEnd)
    .line(points.topLeftStart)
    .curve(points.topLeftCp1, points.topLeftCp2, points.topLeftEnd)
    .close()
    .attr('class', 'fabric')

  if (complete)
    paths.fold = new Path().move(points.midLeft).line(points.midRight).attr('class', 'dotted')
  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  decorateFrenchCuff(part)
  paperlessFrenchCuff(part)

  return part
}
