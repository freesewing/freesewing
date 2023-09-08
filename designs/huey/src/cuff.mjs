import { draftRibbing } from './shared.mjs'

function draftHueyCuff({ complete, points, measurements, options, macro, part }) {
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

export const cuff = {
  name: 'huey.cuff',
  options: {
    ribbingStretch: { pct: 15, min: 0, max: 30, menu: 'fit' },
  },
  draft: draftHueyCuff,
}
