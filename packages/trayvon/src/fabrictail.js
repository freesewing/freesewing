import { calculateHelpers, draftTieShape, seamAllowance, tieShapeDimensions } from './shared'

export default (part) => {
  let { Path, complete, macro, options, paths, points, paperless, sa, store } = part.shorthand()

  calculateHelpers(part)
  draftTieShape(part, store.get('backTip') * 2.5, options.knotWidth * 2.5, true)
  paths.seam.attributes.add('class', 'fabric')

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'fabricTail',
      rotation: -90
    })

    if (sa) seamAllowance(part, 'fabric')
  }

  // Paperless?
  if (paperless) {
    tieShapeDimensions(part)
    macro('ld', {
      from: points.tip,
      to: points.notch1,
      d: options.tipWidth / -2.5
    })
    macro('ld', {
      from: points.notch2,
      to: points.tip,
      d: options.tipWidth / -2.5
    })
    paths.n45 = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .attr('class', 'hidden')
      .attr('data-text', '45°')
      .attr('data-text-class', 'center')
  }

  return part
}
