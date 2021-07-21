const config = require('../freesewing.shared/config/next.config')
const fs = require('./freesewing.config')

//config.i18n = {
//  locales: fs.languages,
//  defaultLocale: fs.language,
//  domains: fs.languages.map(lang => ({
//    domain: `${(lang === fs.language) ? '' : lang+'.'}freesewing.org`,
//    defaultLocale: lang,
//    locales: [lang],
//  })),
//}

module.exports = config
