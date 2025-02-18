import { draftRibbing } from './shared.mjs'

function draftHueyWaistband({ points, measurements, options, macro, store, part }) {
  if (!options.ribbing) return part.hide()

  draftRibbing(part, measurements.hips * (1 + options.hipsEase) * (1 - options.ribbingStretch))

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'ribbing' })

  // Title
  macro('title', {
    at: points.title,
    nr: 6,
    title: 'waistband',
  })

  return part
}

export const waistband = {
  name: 'huey.waistband',
  options: {
    ribbingStretch: { pct: 15, min: 0, max: 30, menu: 'fit' },
  },
  draft: draftHueyWaistband,
}
