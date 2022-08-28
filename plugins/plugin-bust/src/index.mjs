import { name, version } from '../package.json' assert { type: 'json' }

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

