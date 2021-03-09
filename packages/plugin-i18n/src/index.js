import { version, name } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-i18n') === false) {
        svg.attributes.set('freesewing:plugin-i18n', version)
      }
    },
    insertText: function (locale, text, data) {
      if (data === false) {
        console.log(
          "No data was passed to the i18n plugin. This plugin won't do much without injecting data into it"
        )
        return text
      }
      let prefix = data.prefix || ''
      if (typeof data.strings[locale][prefix + text] === 'undefined') return text
      else return data.strings[locale][prefix + text]
    }
  }
}
