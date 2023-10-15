// See: https://github.com/isaachinman/next-i18next
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'es', 'fr', 'nl', 'uk'],
  },
  react: {
    nsMode: 'fallback',
  },
  interpolation: {
    prefix: '{',
    suffix: '}',
  },
  localeStructure: '{lng}/{ns}',
}
