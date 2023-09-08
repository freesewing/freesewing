import { draftRibbing } from './shared.mjs'

function draftHueyWaistband({ complete, points, measurements, options, macro, part }) {
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

export const waistband = {
  name: 'huey.waistband',
  options: {
    ribbingStretch: { pct: 15, min: 0, max: 30, menu: 'fit' },
  },
  draft: draftHueyWaistband,
}
