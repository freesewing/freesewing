import yaml from 'js-yaml'
import i18nConfig from '../next-i18next.config.js'
import fs from 'fs'
import path from 'path'

// This will load YAML translation files and store them as JSON
const generateTranslationFiles = async () => {
  const promises = []
  for (const locale of i18nConfig.i18n.locales) {
    for (const namespace of i18nConfig.namespaces) {
      const content = yaml.load(
        fs.readFileSync(path.resolve(path.join('locales', locale, namespace + '.yaml')), 'utf-8')
      )
      console.log(`Generating ${locale}/${namespace}.json translation file`)
      fs.writeFileSync(
        path.resolve(path.join('public', 'locales', locale, namespace + '.json')),
        JSON.stringify(content)
      )
    }
  }
}

// Wrapper method
const prebuild = async () => {
  await generateTranslationFiles()
}

// Get to work
prebuild()
