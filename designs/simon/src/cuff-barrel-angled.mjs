import { draftBarrelCuff, decorateBarrelCuff, paperlessBarrelCuff } from './shared.mjs'

export const draftAngledBarrelCuff = ({ store, sa, points, Path, paths, macro, part }) => {
  draftBarrelCuff(part)
  const height = store.get('cuffHeight')

  points.leftAngleTop = points.topLeft.shift(0, height / 3)
  points.leftAngleBottom = points.topLeft.shift(-90, height / 3)
  points.rightAngleTop = points.topRight.shift(180, height / 3)
  points.rightAngleBottom = points.topRight.shift(-90, height / 3)
  paths.seam = new Path()
    .move(points.leftAngleBottom)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.rightAngleBottom)
    .line(points.rightAngleTop)
    .line(points.leftAngleTop)
    .line(points.leftAngleBottom)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */

  decorateBarrelCuff(part)
  paperlessBarrelCuff(part)
  macro('vd', {
    id: 'hFull',
    from: points.rightAngleBottom,
    to: points.rightAngleTop,
    x: points.rightAngleBottom.x + 15 + sa,
  })

  return part
}
