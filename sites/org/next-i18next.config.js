/*
 * Get language from FS_LANG environment variable
 * or fall back to en (English) as default
 */
const locale = process.env.FS_LANG || 'en'

// See: https://github.com/isaachinman/next-i18next
module.exports = {
  i18n: {
    defaultLocale: locale,
    locales: [locale],
  },
  defaultNS: 'account',
  react: {
    nsMode: 'fallback',
  },
  interpolation: {
    prefix: '{',
    suffix: '}',
  },
  localeStructure: '{lng}/{ns}',
}
