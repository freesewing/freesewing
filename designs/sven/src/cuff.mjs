import { draftRibbing } from './shared.mjs'
import { ribbing } from './frontback.mjs'
import { sleeve } from './sleeve.mjs'

function svenCuff(params) {
  const { measurements, sa, points, complete, paperless, macro, options, part } = params

  if (!options.ribbing) return part
  const length = measurements.wrist * (1 + options.cuffEase) * (1 - options.ribbingStretch)
  draftRibbing(params, length)

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 5,
      title: 'cuff',
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

export const ribbingStretch = { pct: 15, min: 0, max: 30, menu: 'fit' }

export const cuff = {
  name: 'sven.cuff',
  measurements: ['wrist'],
  after: sleeve,
  options: { ribbing, ribbingStretch },
  draft: svenCuff,
}
