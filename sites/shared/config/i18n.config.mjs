// See: https://github.com/isaachinman/next-i18next

const i18n = (locales = ['en', 'de', 'es', 'fr', 'nl']) => ({
  i18n: {
    defaultLocale: 'en',
    locales,
  },
  defaultNS: 'app',
  nsMode: 'fallback',
  interpolation: {
    prefix: '{',
    suffix: '}',
  },
})

export default i18n
