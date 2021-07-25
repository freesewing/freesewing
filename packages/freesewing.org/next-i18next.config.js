const config = require('./freesewing.config')

module.exports = {
  i18n: {
    defaultLocale: config.language,
    locales: config.languages,
    domains: config.languages.map(lang => ({
      domain: `${(lang === config.language) ? '' : lang+'.'}freesewing.org`,
      defaultLocale: lang,
      locales: [lang],
    })),
  }
}
