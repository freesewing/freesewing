import { draftRibbing } from './shared'

export default (part) => {
  let { complete, points, measurements, options, macro } = part.shorthand()
  if (!options.ribbing) return part

  draftRibbing(part, measurements.wrist * (1 + options.cuffEase) * (1 - options.ribbingStretch))

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 7,
      title: 'cuff',
    })
  }

  return part
}
