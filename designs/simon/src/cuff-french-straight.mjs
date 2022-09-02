import { draftFrenchCuff, decorateFrenchCuff, paperlessFrenchCuff } from './shared'

export default (part) => {
  const { sa, points, Path, paths, complete, paperless } = part.shorthand()

  draftFrenchCuff(part)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  paths.fold = new Path().move(points.midLeft).line(points.midRight).attr('class', 'dotted')

  // Complete pattern?
  if (complete) {
    decorateFrenchCuff(part)
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) paperlessFrenchCuff(part)

  return part
}
