import { draftRibbing } from './shared.mjs'
import { ribbing, hipsEase } from './frontback.mjs'
import { ribbingStretch } from './cuff.mjs'

function svenWaistband(params) {
  const { measurements, points, macro, options, store, expand, units, sa, part } = params

  if (!options.ribbing) return part

  const length = measurements.hips * (1 + options.hipsEase) * (1 - options.ribbingStretch)

  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `sven:cutWaistband`,
      replace: {
        w: units(
          (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight + 2 * sa
        ),
        l: units(length + 2 * sa),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  draftRibbing(params, length)

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'ribbing' })

  // Title
  macro('title', {
    at: points.title,
    nr: 4,
    title: 'waistband',
    align: 'center',
  })

  return part
}

export const waistband = {
  name: 'sven.waistband',
  measurements: ['hips'],
  options: { ribbing, ribbingStretch, hipsEase },
  draft: svenWaistband,
}
