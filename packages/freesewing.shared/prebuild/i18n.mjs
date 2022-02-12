import path from 'path'
import fs from 'fs'
import { en, de, es, fr, nl, languages } from '../../i18n/dist/index.js'

const locales = { en, de, es, fr, nl }
const l1 = ['patterns', 'settings']
const l2 = ['options']

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

const flattenL1 = content => {
  const flat = {}
  for (const l1 in content) {
    flat[`${l1}.t`] = content[l1].title
    flat[`${l1}.d`] = content[l1].description
  }

  return flat
}

const flattenL2 = content => {
  const flat = {}
  for (const l1 in content) {
    flat[l1] = {}
    for (const l2 in content[l1]) {
      flat[l1][`${l2}.t`] = content[l1][l2].title
      flat[l1][`${l2}.d`] = content[l1][l2].description
      if (content[l1][l2].options) {
        flat[l1][`${l2}.o`] = content[l1][l2].options
      }
    }
  }

  return flat
}

/*
 * Main method that does what needs doing
 */
export const prebuildI18n = async (site) => {
  // Iterate over locales
  for (const locale in locales) {
    console.log('Generating translation files for', locale)
    const loc = locales[locale]
    // Fan out into namespaces
    for (const namespace in loc.topics) {
      if (l1.indexOf(namespace) !== -1) {
        writeJson(
          site, locale, namespace,
          flattenL1(loc.topics[namespace])
        )
      }
      else if (l2.indexOf(namespace) !== -1) {
        // Further fan out the (large) options namespace
        const subNamespaces  = flattenL2(loc.topics[namespace])
        for (const subNamespace in subNamespaces) {
          writeJson(
            site, locale, 'o_'+subNamespace,
            subNamespaces[subNamespace]
          )
        }
      }
      else writeJson(site, locale, namespace, loc.topics[namespace])
    }
    writeJson(site, locale, 'locales', languages)
  }
}

