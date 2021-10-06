import { draftFrenchCuff, decorateFrenchCuff, paperlessFrenchCuff } from './shared'

export default (part) => {
  const { store, sa, points, Path, paths, complete, paperless } = part.shorthand()

  draftFrenchCuff(part)
  const height = store.get('cuffHeight')
  points.leftAngleTopTop = points.topLeft.shift(0, height / 3)
  points.leftAngleTopBottom = points.topLeft.shift(-90, height / 3)
  points.rightAngleTopTop = points.topRight.shift(180, height / 3)
  points.rightAngleTopBottom = points.topRight.shift(-90, height / 3)

  points.leftAngleBottomTop = points.bottomLeft.shift(90, height / 3)
  points.leftAngleBottomBottom = points.bottomLeft.shift(0, height / 3)
  points.rightAngleBottomTop = points.bottomRight.shift(90, height / 3)
  points.rightAngleBottomBottom = points.bottomRight.shift(180, height / 3)

  paths.seam = new Path()
    .move(points.leftAngleTopBottom)
    .line(points.leftAngleBottomTop)
    .line(points.leftAngleBottomBottom)
    .line(points.rightAngleBottomBottom)
    .line(points.rightAngleBottomTop)
    .line(points.rightAngleTopBottom)
    .line(points.rightAngleTopTop)
    .line(points.leftAngleTopTop)
    .line(points.leftAngleTopBottom)
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
