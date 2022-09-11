import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  hooks: {
    preDraft: ({ settings }) => {
      if (settings.measurements) {
        if (typeof settings.measurements.bust === 'undefined') {
          settings.measurements.bust = settings.measurements.chest
          settings.measurements.chest = settings.measurements.highBust
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
