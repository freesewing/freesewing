import { draftBarrelCuff, decorateBarrelCuff, paperlessBarrelCuff } from './shared'

export default (part) => {
  let { store, sa, points, Path, paths, complete, paperless, macro } = part.shorthand()

  draftBarrelCuff(part)
  const height = store.get('cuffHeight')
  macro('round', {
    from: points.topRight,
    to: points.bottomLeft,
    via: points.topLeft,
    radius: height / 3,
    prefix: 'topLeftRound',
  })
  macro('round', {
    from: points.bottomRight,
    to: points.topLeft,
    via: points.topRight,
    radius: height / 3,
    prefix: 'topRightRound',
  })
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

  // Complete pattern?
  if (complete) {
    decorateBarrelCuff(part)
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) {
    paperlessBarrelCuff(part)
    macro('vd', {
      from: points.topRightRoundStart,
      to: points.topRightRoundEnd,
      x: points.topRightRoundStart.x + 15 + sa,
    })
  }

  return part
}
