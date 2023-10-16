import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  hooks: {
    insertText: (locale, text, t, pattern) => {
      if (t instanceof Function) return t(text, locale)
      else if (typeof t[locale] === 'object') return t[locale][text] || text
      else {
        const msg =
          "No translation method or object was passed to the i18n plugin. This plugin won't do anything without that"
        if (pattern?.store?.log?.warn) {
          if (!pattern.store.get(['plugins', 'plugin-i18n', 'missingMethodWarning'])) {
            pattern.store.set(['plugins', 'plugin-i18n', 'missingMethodWarning'], true)
            pattern.store.log.warn(msg)
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
