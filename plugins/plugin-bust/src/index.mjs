import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  hooks: {
    preDraft: ({ settings }) => {
      for (const set of settings) {
        if (set.measurements) {
          if (typeof set.measurements.bust === 'undefined') {
            set.measurements.bust = set.measurements.chest
            set.measurements.chest = set.measurements.highBust
          }
        }
      }
    },
  },
}

// More specifically named exports
export const bustPlugin = plugin
export const pluginBust = plugin

// Helper method to conditionally load this plugin
export const withCondition = {
  plugin,
  condition: (settings = false) =>
    settings?.options?.draftForHighBust && settings?.measurements?.highBust ? true : false,
}
