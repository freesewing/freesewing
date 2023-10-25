import { draftFrenchCuff, decorateFrenchCuff, paperlessFrenchCuff } from './shared.mjs'

export const draftStraightFrenchCuff = ({ sa, points, Path, paths, complete, part }) => {
  draftFrenchCuff(part)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (complete)
    paths.fold = new Path().move(points.midLeft).line(points.midRight).attr('class', 'dotted')
  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  decorateFrenchCuff(part)
  paperlessFrenchCuff(part)

  return part
}
