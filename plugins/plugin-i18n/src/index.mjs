import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  hooks: {
    insertText: (locale, text, t, pattern) => {
      if (t instanceof Function) return t(text)
      else {
        const msg =
          "No translation method was passed to the i18n plugin. This plugin won't do anything without a translation method"
        if (pattern?.store?.log?.warning) {
          if (!pattern.store.get(['plugins', 'plugin-i18n', 'missingMethodWarning'])) {
            pattern.store.set(['plugins', 'plugin-i18n', 'missingMethodWarning'], true)
            pattern.store.log.warning(msg)
          }
        } else console.log(msg)

        return text
      }
    },
  },
}

// More specifically named exports
export const i18nPlugin = plugin
export const pluginI18n = plugin
