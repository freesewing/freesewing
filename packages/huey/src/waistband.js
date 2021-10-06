import { draftRibbing } from './shared'

export default function (part) {
  let { complete, points, measurements, options, macro } = part.shorthand()
  if (!options.ribbing) return part

  draftRibbing(part, measurements.hips * (1 + options.hipsEase) * (1 - options.ribbingStretch))

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 6,
      title: 'waistband',
    })
  }
  return part
}
