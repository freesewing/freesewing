import pkg from '../package.json'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-i18n', pkg.version),
    insertText: (locale, text, data) => {
      if (!data) {
        console.log(
          "No data was passed to the i18n plugin. This plugin won't do much without injecting data into it"
        )
        return text
      }
      const prefix = data.prefix || ''
      return typeof data.strings[locale][prefix + text] === 'undefined'
        ? text
        : data.strings[locale][prefix + text]
    },
  },
}
