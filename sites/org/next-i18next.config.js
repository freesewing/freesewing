// See: https://github.com/isaachinman/next-i18next
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'es', 'fr', 'nl'],
  },
  defaultNS: 'common',
  react: {
    nsMode: 'fallback',
  },
  interpolation: {
    prefix: '{',
    suffix: '}',
  },
  localeStructure: '{lng}/{ns}',
}
