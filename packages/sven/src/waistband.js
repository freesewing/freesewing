import { draftRibbing } from './shared'

export default (part) => {
  let { measurements, sa, points, complete, paperless, macro, options } = part.shorthand()

  if (!options.ribbing) return part

  let length = measurements.hips * (1 + options.hipsEase) * (1 - options.ribbingStretch)
  draftRibbing(part, length)

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'waistband',
    })
    if (sa) {
      // FIXME: Don't we need SA here?
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part
}
