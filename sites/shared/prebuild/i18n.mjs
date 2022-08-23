import {build} from '../../../packages/i18n/src/prebuild.mjs'
import {denyList} from '../../../packages/i18n/scripts/prebuilder.mjs'
import fs from 'fs'
import path from 'path'

export const prebuildI18n = async(site, only=false) => {
  const writeJson = async (locale, namespace, content) => fs.writeFileSync(
      path.resolve(
        '..',
        site,
        'public',
        'locales',
        locale,
        `${namespace}.json`
      ),
      JSON.stringify(content)
    )

  const filter = site === 'dev' ? (loc => loc === 'en') : (loc => denyList.indexOf(loc) === -1)
  const locales = await build(filter, only)

  console.log (`copying them to ${site}`, Object.keys(locales))

  const languages = {}
  Object.keys(locales).forEach(l => languages[l] = locales[l].i18n[l])
  for (const locale in locales) {
    // Only English for dev site
    const loc = locales[locale]
    // Fan out into namespaces
    for (const namespace in loc) {
      writeJson(
        locale, namespace,
        loc[namespace]
      )
    }

    writeJson(locale, 'locales', languages)
  }
}
