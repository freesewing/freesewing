import { draftRibbing } from './shared.mjs'
import { ribbing } from './frontback.mjs'
import { sleeve } from './sleeve.mjs'

function svenCuff(params) {
  const { measurements, sa, points, macro, options, store, expand, units, part } = params

  if (!options.ribbing) return part
  const length = measurements.wrist * (1 + options.cuffEase) * (1 - options.ribbingStretch)

  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `sven:cutCuff`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(
          (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight + extraSa
        ),
        l: units(length + extraSa),
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
    nr: 5,
    title: 'cuff',
    align: 'center',
  })

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
