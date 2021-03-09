import { calculateHelpers, draftTieShape, seamAllowance, tieShapeDimensions } from './shared'

export default (part) => {
  let {
    Path,
    Snippet,
    complete,
    macro,
    options,
    paths,
    points,
    paperless,
    sa,
    snippets,
    store
  } = part.shorthand()

  calculateHelpers(part)
  draftTieShape(part, store.get('backTip') * 2.5, options.knotWidth * 2.5)

  // Cut part short
  points.cutRight = points.tipRight.shiftTowards(points.midRight, options.tipWidth * 2.5)
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
      nr: 6,
      title: 'liningTip',
      rotation: -90
    })
    snippets.notch = new Snippet('notch', points.tip)

    if (sa) seamAllowance(part, 'lining')
  }

  // Paperless?
  if (paperless) tieShapeDimensions(part, true)

  return part
}
