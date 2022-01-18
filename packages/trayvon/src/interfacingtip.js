import { draftTieShape, tieShapeDimensions, calculateHelpers } from './shared'

export default (part) => {
  let { paths, points, macro, complete, paperless, Path, absoluteOptions } = part.shorthand()

  calculateHelpers(part)
  draftTieShape(part, absoluteOptions.tipWidth, absoluteOptions.knotWidth)
  paths.seam.attributes.add('class', 'interfacing')

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'interfacingTip',
      rotation: -90,
    })
  }

  // Paperless?
  if (paperless) {
    tieShapeDimensions(part)
    paths.n45 = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .attr('class', 'hidden')
      .attr('data-text', '45°')
      .attr('data-text-class', 'center')
  }

  return part
}
