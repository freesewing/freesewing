import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  hooks: {
    preSetDraft: function ({ settings, activeSet }) {
      const set = settings[Number(activeSet)]
      if (set.measurements && set.options?.draftForHighBust && set.measurements?.highBust) {
        if (typeof set.measurements.bust === 'undefined') {
          set.measurements.bust = set.measurements.chest
          set.measurements.chest = set.measurements.highBust
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
  condition: () => {
    console.log(
      "WARNING: The 'withCondition' named export in @freesewing/plugin-bust is deprecated. Conditionality has moved to the preSetDraft lifecycle hook"
    )

    return true
  },
}
