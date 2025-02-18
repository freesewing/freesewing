import { draftRibbing } from './shared.mjs'

function draftHueyCuff({ points, measurements, options, macro, store, part }) {
  if (!options.ribbing) return part.hide()

  draftRibbing(part, measurements.wrist * (1 + options.cuffEase) * (1 - options.ribbingStretch))

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'ribbing' })

  // Title
  macro('title', {
    at: points.title,
    nr: 7,
    title: 'cuff',
  })

  return part
}

export const cuff = {
  name: 'huey.cuff',
  options: {
    ribbingStretch: { pct: 15, min: 0, max: 30, menu: 'fit' },
  },
  draft: draftHueyCuff,
}
