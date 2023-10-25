//  __SDEFILE__ - This file is a dependency for the stand-alone environment

// See: https://github.com/isaachinman/next-i18next
const i18n = (locales = ['en', 'de', 'es', 'fr', 'nl']) => ({
  i18n: {
    defaultLocale: 'en',
    locales,
  },
  nsMode: 'fallback',
  interpolation: {
    prefix: '{',
    suffix: '}',
  },
})

export default i18n
