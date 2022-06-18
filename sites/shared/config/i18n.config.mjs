// See: https://github.com/isaachinman/next-i18next

const i18n = (locales = ['en', 'de', 'es', 'fr', 'nl']) => ({
  defaultLocale: 'en',
  locales,
  defaultNS: 'app',
  interpolation: {
    prefix: '{',
    suffix: '}',
  }
})

export default i18n
