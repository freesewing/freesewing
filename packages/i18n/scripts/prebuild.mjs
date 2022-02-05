import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

//import options from './options/'
///plugin
const locales = ['en', 'de', 'es', 'nl', 'de']

const yamlFiles = [
  'account.yaml',
  'app.yaml',
  'cfp.yaml',
  'cty.yaml',
  'email.yaml',
  'errors.yaml',
  'filter.yml',
  'gdpr.yaml',
  'i18n.yaml',
  'intro.yaml',
  'jargon.yml',
  'measurements.yaml',
  'optiongroups.yaml',
  'parts.yaml',
  'patterns.yml',
  'settings.yml',
  'welcome.yaml',
]

const loadYaml = (files, locale) => {
  const data = {}
  for (const file of files) {
    data[file.split('.').shift()] = yaml.load(
      fs.readFileSync(
        path.resolve('..', 'src', 'locales', locale, file),
        'utf-8'
      )
    )
  }

  return data
}


const strings = {}
for (const locale of locales) {
  strings[locale] = loadYaml(yamlFiles, locale)
}

console.log(strings)

