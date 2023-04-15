import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  hooks: {
    insertText: (locale, text, data) => {
      if (!data) {
        console.log(
          "No data was passed to the i18n plugin. This plugin won't do much without injecting data into it"
        )
        return text
      }
      if (data.t) {
        return data.t(text)
      } else {
        const prefix = data.prefix || ''
        return typeof data.strings[locale][prefix + text] === 'undefined'
          ? text
          : data.strings[locale][prefix + text]
      }
    },
  },
}

// More specifically named exports
export const i18nPlugin = plugin
export const pluginI18n = plugin
