import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { siteConfig } from 'site/site.config.mjs'

/*
 * We're being lazy and loading all namespaces here
 * See https://github.com/freesewing/freesewing/issues/5230
 */
const ssrI18n = async () => {
  const i18n = {}
  for (const locale of siteConfig.languages) {
    i18n[locale] = await serverSideTranslations(locale)
  }

  return i18n
}

export const i18n = await ssrI18n()
