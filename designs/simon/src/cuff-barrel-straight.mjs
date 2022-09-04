import { draftBarrelCuff, decorateBarrelCuff, paperlessBarrelCuff } from './shared'

export default (part) => {
  const { sa, points, Path, paths, complete, paperless } = part.shorthand()

  draftBarrelCuff(part)
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
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
  }

  return part
}
