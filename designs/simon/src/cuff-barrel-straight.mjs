import { draftBarrelCuff, decorateBarrelCuff, paperlessBarrelCuff } from './shared.mjs'

export const draftStraightBarrelCuff = ({ sa, points, Path, paths, part }) => {
  draftBarrelCuff(part)
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')
  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  decorateBarrelCuff(part)
  paperlessBarrelCuff(part)

  return part
}
