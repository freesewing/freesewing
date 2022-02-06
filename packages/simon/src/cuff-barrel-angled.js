import { draftBarrelCuff, decorateBarrelCuff, paperlessBarrelCuff } from './shared'

export default (part) => {
  const { store, sa, points, Path, paths, complete, paperless, macro } = part.shorthand()

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

  // Complete pattern?
  if (complete) {
    decorateBarrelCuff(part)
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) {
    paperlessBarrelCuff(part)
    macro('vd', {
      from: points.rightAngleBottom,
      to: points.rightAngleTop,
      x: points.rightAngleBottom.x + 15 + sa,
    })
  }

  return part
}
