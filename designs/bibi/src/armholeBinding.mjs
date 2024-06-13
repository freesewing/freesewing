import { front } from './front.mjs'
import { back } from './back.mjs'
import { draftKnitBinding } from './shared.mjs'

export const armholeBinding = {
  name: 'bibi.armholeBinding',
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
  draft: bibiArmholeBinding,
}

function bibiArmholeBinding({ part, store, points, macro }) {
  if (store.separateSleeves) {
    return part.hide()
  }

  draftKnitBinding(part, store.armholeSizeBack + store.armholeSizeFront)

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'ribbing', identical: true })

  // Title
  macro('title', {
    at: points.title,
    nr: 4,
    scale: 0.5,
    rotation: 90,
    title: 'armholeBinding',
  })

  return part
}
