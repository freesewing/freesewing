import { front } from './front.mjs'
import { back } from './back.mjs'
import { draftKnitBinding } from './shared.mjs'

export const neckBinding = {
  name: 'bibi.neckBinding',
  after: [front, back],
  options: {
    bindingHeight: {
      pct: 2.5,
      min: 1.25,
      max: 5,
      menu: 'style',
      snap: {
        metric: [10, 15, 20, 25, 30],
        imperial: [12.7, 19.05, 25.4, 31.75, 38.1],
      },
      toAbs: (val, { measurements }) =>
        (measurements.hpsToWaistBack + measurements.waistToHips) * val,
    },
  },
  draft: bibiNeckBinding,
}

function bibiNeckBinding({ part, store, points, macro }) {
  draftKnitBinding(part, 2 * (store.neckSizeBack + store.neckSizeFront))

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'ribbing' })

  // Title
  macro('title', {
    at: points.title,
    nr: 3,
    scale: 0.5,
    rotation: 90,
    title: 'neckBinding',
  })

  return part
}
