import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import designsObj from '../config/software/designs.json' assert { type: 'json' }
import langs from '../config/languages.json' assert { type: 'json' }

// Working directory
const cwd = process.cwd()

// List of designs
const designs = Object.keys(designsObj)

// Load current translations once
const translations = {}
const parts = {}
for (const lang of langs) {
  translations[lang] = yaml.load(
    fs.readFileSync(
      path.join(cwd, 'packages', 'i18n', 'src', 'locales', lang, 'designs.yml'),
      'utf-8'
    )
  )
  parts[lang] = yaml.load(
    fs.readFileSync(
      path.join(cwd, 'packages', 'i18n', 'src', 'locales', lang, 'parts.yaml'),
      'utf-8'
    )
  )
}

const convertOptions = (options) => {
  const converted = {}
  for (const key in options)
    converted[key] = {
      t: options[key].title,
      d: options[key].description,
    }

  return converted
}

// Migrates a single design
const migrateTranslations = (design) => {
  for (const lang of langs) {
    const file = path.join(cwd, 'designs', design, 'i18n', `${lang}.json`)
    // Read new transaltion file
    const json = JSON.parse(fs.readFileSync(file))
    // Add title and descriptino
    if (!json.t || json.t === '') json.t = translations[lang][design]?.title || 'fixme'
    if (!json.d || json.d === '') json.d = translations[lang][design]?.description || 'fixme'
    // Add (all) parts
    if (!json.p || Object.keys(json.p).length < 1) json.p = parts[lang]
    // Check if there's a file with design-specific strings
    let strings = false
    try {
      strings = yaml.load(
        fs.readFileSync(
          path.join(
            cwd,
            'packages',
            'i18n',
            'src',
            'locales',
            lang,
            'plugin',
            'patterns',
            `${design}.yaml`
          ),
          'utf-8'
        )
      )
    } catch (err) {}
    // Add strings if we found some
    if (strings && (!json.s || Object.keys(json.s).length < 1)) json.s = strings
    // Check if there's a file with options
    let options = false
    try {
      options = yaml.load(
        fs.readFileSync(
          path.join(cwd, 'packages', 'i18n', 'src', 'locales', lang, 'options', `${design}.yml`),
          'utf-8'
        )
      )
    } catch (err) {}
    // Add options if we found some
    if (options && (!json.o || Object.keys(json.o).length < 1)) json.o = convertOptions(options)

    // Write back new translation file
    fs.writeFileSync(file, JSON.stringify(json, null, 2))
  }
}

// Get to work
for (const design of designs) migrateTranslations(design)
