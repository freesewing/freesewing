import { draftRibbing } from './shared.mjs'
import { ribbing, hipsEase } from './frontback.mjs'
import { ribbingStretch } from './cuff.mjs'

function svenWaistband(params) {
  const { measurements, points, complete, macro, options, part } = params

  if (!options.ribbing) return part

  let length = measurements.hips * (1 + options.hipsEase) * (1 - options.ribbingStretch)
  draftRibbing(params, length)

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'waistband',
    })
  }

  return part
}

export const waistband = {
  name: 'sven.waistband',
  measurements: ['hips'],
  options: { ribbing, ribbingStretch, hipsEase },
  draft: svenWaistband,
}
