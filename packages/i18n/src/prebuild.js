const path = require('path')
const fs = require('fs')
const info = require('@freesewing/pattern-info')
const config = require('./config')
const yaml = require('yaml')

const jargon = {}
const languages = {}
const strings = {}
const sharedOptions = yaml.parse(
  fs.readFileSync(
    path.join(__dirname, 'shared-options.yml'),
    'utf-8'
  )
)

// Helper method to load list of filenames in a directory
const loadFileList = (lang, subfolder=false) => {
  const folder = [__dirname, 'locales', lang]
  if (subfolder) folder.push(subfolder)
  const list = fs.readdirSync(path.join(...folder))

  return list.map(file => file.split('.'))
}

// Helper method to parse YAML files
const parseYaml = (lang, topic, ext, subfolder=false) => {
  let result
  const folder = [__dirname, 'locales', lang]
  if (subfolder) folder.push(subfolder)
  try {
    result = yaml.parse(
      fs.readFileSync(
        path.join(...folder, `${topic}.${ext}`),
        'utf-8'
      )
    )
  } catch (err) {
    console.log(err, topic, ext, lang)
    result = false
  }

  return result
}

// Helper method to load YAML translation data
const loadYaml = (lang, topic, ext, subfolder=false) => {
  const data = {}
  const result = parseYaml(lang, topic , ext, subfolder)
  if (result) {
    for ([key, val] of Object.entries(result)) {
      if (ext === 'yaml') {
        if (topic === 'v3') data[key] = val
        else data[`${topic}.${key}`] = val
      }
      else if (ext === 'yml') {
        data[`${topic}.${key}.d`] = val.d
        if (topic === 'jargon') data[`${topic}.${key}.term`] = val.term
        else data[`${topic}.${key}.t`] = val.t
      }
    }
  }

  return data
}

// Helper method to flatten YAML data into strings object
const loadStrings = lang => {
  let data = {}
  for (const [topic, ext] of loadFileList(lang)) {
    if (topic !== 'options') {
      data = { ...data, ...loadYaml(lang, topic, ext) }
    }
  }
  for (const [pattern, ext] of loadFileList(lang, 'options')) {
    if (ext === 'yml') {
      data = { ...data, ...loadYaml(lang, pattern, ext, 'options') }
    }
  }

  return data
}

// Helper method to load a shared option
const getSharedOption = (pattern, option, sub) => {
  if (
    sharedOptions[pattern] &&
    sharedOptions[pattern].other &&
    sharedOptions[pattern].other[option] &&
    typeof sharedOptions[pattern].other[option][sub] !== 'undefined'
  ) return strings[`${sharedOptions[pattern].other[option]}.${option}.${sub}`]
  if (
    sharedOptions[pattern] &&
    sharedOptions[pattern].dflt
  ) return strings[`${sharedOptions[pattern].dflt}.${option}.${sub}`]

  return `FIXME: Missing translation for ${pattern}.${option}.${sub}`
}

// Helper method to populate pattern options
const addOptions = () => {
  for (const pattern of info.list) {
    for (const option of info.options[pattern]) {
      if (typeof strings[`${pattern}.${option}.t`] === 'undefined') {
        strings[`${pattern}.${option}.t`] = getSharedOption(pattern, option, 't')
        strings[`${pattern}.${option}.d`] = getSharedOption(pattern, option, 'd')
      }
    }
  }
}

// Helper method to load jargon data
const loadJargon = lang => {
  const data = {}
  const result = parseYaml(lang, 'jargon', 'yml')
  if (result) {
    for ([key, val] of Object.entries(result)) {
      data[val.term] = val.d
    }
  }

  return data
}


// Load all translations
for (const lang of config.languages) {
  strings[lang] = loadStrings(lang)
  jargon[lang] = loadJargon(lang)
  languages[lang] = strings[lang]['i18n.' + lang]
}
// Add options
addOptions()

// Write to disk
const folder = [__dirname, '..', 'prebuild']
// Locales
fs.writeFileSync(
  path.join(...folder, 'locales.js'),
  `export const locales = ${JSON.stringify(config.languages, null, 2)}`
)
// Languages
fs.writeFileSync(
  path.join(...folder, 'languages.js'),
  `export const languages = ${JSON.stringify(languages, null, 2)}`
)
// Jargon
let output = ''
for (const lang of config.languages) {
  output += `export const jargon_${lang} = ${JSON.stringify(jargon[lang], null, 2)}\n`
}
fs.writeFileSync(path.join(...folder, 'jargon.js'), output)
// Strings
output = ''
for (const lang of config.languages) {
  output += `export const ${lang} = ${JSON.stringify(strings[lang], null ,2)}\n`
}
fs.writeFileSync(path.join(...folder, 'strings.js'), output)

