import { draftFrenchCuff, decorateFrenchCuff, paperlessFrenchCuff } from './shared'

export default (part) => {
  const { store, sa, points, Path, paths, complete, paperless, macro } = part.shorthand()
  draftFrenchCuff(part)
  const height = store.get('cuffHeight')
  macro('round', {
    from: points.topRight,
    to: points.bottomLeft,
    via: points.topLeft,
    radius: height / 3,
    prefix: 'topLeft',
  })
  macro('round', {
    from: points.topLeft,
    to: points.bottomRight,
    via: points.bottomLeft,
    radius: height / 3,
    prefix: 'bottomLeft',
  })
  macro('round', {
    from: points.bottomLeft,
    to: points.topRight,
    via: points.bottomRight,
    radius: height / 3,
    prefix: 'bottomRight',
  })
  macro('round', {
    from: points.bottomRight,
    to: points.topLeft,
    via: points.topRight,
    radius: height / 3,
    prefix: 'topRight',
  })

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
