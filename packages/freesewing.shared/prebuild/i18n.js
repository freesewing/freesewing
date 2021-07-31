const fs = require('fs')
const path = require('path')
const i18n = require('../../i18n/dist')

const prebuild = (folder) => {
  for (const lang in i18n.languages) {
    fs.writeFileSync(
      path.join(...folder, '..', 'public', 'locales', lang, 'common.json'),
      JSON.stringify(i18n.strings[lang])
    )
  }

  return i18n.strings
}

module.exports = prebuild
