import path from 'path'
import fs from 'fs'
import { en, de, es, fr, nl, languages } from '../../i18n/src/next.mjs'

const locales = { en, de, es, fr, nl }

const writeJson = (site, locale, namespace, content) => fs.writeFileSync(
  path.resolve(
    '..',
    `freesewing.${site}`,
    'public',
    'locales',
    locale,
    `${namespace}.json`
  ),
  JSON.stringify(content)
)

/*
 * Main method that does what needs doing
 */
export const prebuildI18n = async (site) => {
  // Iterate over locales
  for (const locale in locales) {
    console.log('Generating translation files for', locale)
    const loc = locales[locale]
    // Fan out into namespaces
    for (const namespace in loc) {
      writeJson(
        site, locale, namespace,
        loc[namespace]
      )
    }
    writeJson(site, locale, 'locales', languages)
  }
}

