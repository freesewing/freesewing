import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  hooks: {
    preDraft: function ({ settings }) {
      for (const i in settings) {
        if (settings[i].measurements) {
          if (typeof settings[i].measurements.bust === 'undefined') {
            settings[i].measurements.bust = settings[i].measurements.chest
            settings[i].measurements.chest = settings[i].measurements.highBust
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
