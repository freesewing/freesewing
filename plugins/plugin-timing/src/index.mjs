import { name, version } from '../data.mjs'

/* eslint-disable no-undef */

const now = () => {
  if (typeof window !== 'undefined') return window.performance.now() // Browser
  if (typeof process !== 'undefined') return process.hrtime.bigint() // NodeJS
  return false
}

const delta = (start) => {
  if (typeof window !== 'undefined') return window.performance.now() - start // Browser
  if (typeof process !== 'undefined') return (process.hrtime.bigint() - start) / BigInt(1000) // NodeJS
  return false
}

/* eslint-enable no-undef */

export const plugin = {
  name,
  version,
  hooks: {
    preSetDraft: function (pattern) {
      const time = now()
      if (time) pattern.setStores[pattern.activeSet].set(['timing', 'draft', 'start'], time)
    },
    prePartDraft: function (pattern) {
      const time = now()
      if (time)
        pattern.setStores[pattern.activeSet].set(
          ['timing', 'parts', pattern.activePart, 'start'],
          time
        )
    },
    postPartDraft: function (pattern) {
      const took = delta(
        pattern.setStores[pattern.activeSet].get(['timing', 'parts', pattern.activePart, 'start'])
      )
      if (took)
        pattern.setStores[pattern.activeSet].set(
          ['timing', 'parts', pattern.activePart, 'took'],
          took
        )
    },
    postSetDraft: function (pattern) {
      const took = delta(pattern.setStores[pattern.activeSet].get(['timing', 'draft', 'start']))
      if (took) pattern.setStores[pattern.activeSet].set(['timing', 'draft', 'took'], took)
    },
  },
}

// More specifically named exports
export const timingPlugin = plugin
export const pluginTiming = plugin
