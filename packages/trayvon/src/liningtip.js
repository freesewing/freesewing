import { calculateHelpers, draftTieShape, tieShapeDimensions, seamAllowance } from './shared'

export default (part) => {
  let { Path, Snippet, complete, macro, paperless, paths, points, sa, snippets, absoluteOptions } =
    part.shorthand()

  calculateHelpers(part)
  draftTieShape(part, absoluteOptions.tipWidth * 2.5, absoluteOptions.knotWidth * 2.5)

  // Cut part short
  points.cutRight = points.tipRight.shiftTowards(points.midRight, absoluteOptions.tipWidth * 2.5)
  points.cutLeft = points.cutRight.flipX()

  // Overwrite path
  paths.seam = new Path()
    .move(points.tip)
    .line(points.tipLeft)
    .line(points.cutLeft)
    .line(points.cutRight)
    .line(points.tipRight)
    .line(points.tip)
    .close()
    .attr('class', 'lining')

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 5,
      title: 'liningTip',
      rotation: -90,
    })
    snippets.notch = new Snippet('notch', points.tip)
    macro('miniscale', { at: points.gridAnchor })

    if (sa) seamAllowance(part, 'lining')
  }

  // Paperless?
  if (paperless) {
    tieShapeDimensions(part, true)
  }

  return part
}
