import fs from 'fs'
import path from 'path'
import rdir from 'recursive-readdir'
import yaml from 'js-yaml'
import { fileURLToPath } from 'url'
import allLanguages from '../../../config/languages.json' assert { type: 'json' }
import { designs } from '../i18n/designs.mjs'
import { plugins } from '../i18n/plugins.mjs'

/*
 * This is where we configure what folders we should check for
 * code-adjacent translation source files
 */
const sitesFolder = path.join(fileURLToPath(import.meta.url), '..', '..', '..')
export const folders = {
  backend: [path.join(sitesFolder, 'backend', 'src', 'templates', 'email')],
  org: [path.join(sitesFolder, 'org', 'pages'), path.join(sitesFolder, 'org', 'components')],
  dev: [path.join(sitesFolder, 'dev', 'pages'), path.join(sitesFolder, 'dev', 'components')],
  lab: [path.join(sitesFolder, 'lab', 'pages'), path.join(sitesFolder, 'lab', 'components')],
  shared: [
    path.join(sitesFolder, 'shared', 'components'),
    path.join(sitesFolder, 'shared', 'i18n'),
  ],
}

/*
 * Helper method to write out JSON files for translation sources
 */
const writeJson = async (site, locale, namespace, content) => {
  fs.mkdirSync(path.resolve('..', site, 'public', 'locales', locale), { recursive: true })
  fs.writeFileSync(
    path.resolve('..', site, 'public', 'locales', locale, `${namespace}.json`),
    JSON.stringify(content)
  )
}

/*
 * Helper method to get a list of code-adjecent translation files in a folder.
 * Will traverse recursively to get all files from a given root folder.
 *
 * Parameters:
 *
 *  - site: the site folder to generate translations files for
 *
 */
const getI18nFileList = async (site, languages) => {
  const dirs = []
  if (site === 'org') dirs.push(...folders.org, ...folders.shared)
  else if (site === 'dev') dirs.push(...folders.dev, ...folders.shared)
  else if (site === 'lab') dirs.push(...folders.lab, ...folders.shared)
  else if (site === 'backend') dirs.push(...folders.backend)

  const allFiles = []
  for (const dir of dirs) {
    try {
      const dirFiles = await rdir(dir)
      allFiles.push(...dirFiles)
    } catch (err) {
      console.log(err)
      return false
    }
  }

  const keep = languages.map((loc) => `${loc}.yaml`)

  // Filter out the language files
  return allFiles.filter((file) => keep.includes(file.slice(-7))).sort()
}

/*
 * Helper method to get language and namespace from the filename
 *
 * Parameters:
 *
 * - filename: The filename or full path + filename
 */
const languageAndNamespaceFromFilename = (file) => [
  path.basename(file).split('.')[0],
  path.dirname(file).split('/').pop(),
]

/*
 * Helper method to load a YAML file from disk
 */
export const loadYaml = (file, complain = true) => {
  let data
  try {
    data = yaml.load(fs.readFileSync(file, 'utf-8'))
  } catch (err) {
    if (complain) console.log(err)
  }

  return data
}

/*
 * Helper method to build an object of namespaces and their values.
 * Includes providing an EN fallback if something is not available in a language.
 *
 * Parameters:
 *
 *  - files: List of files to process
 */
const filesAsNamespaces = (files) => {
  // First build the object
  const translations = {}
  for (const file of files) {
    const [lang, namespace] = languageAndNamespaceFromFilename(file)
    if (typeof translations[namespace] === 'undefined') {
      translations[namespace] = {}
    }
    translations[namespace][lang] = loadYaml(file)
  }

  return translations
}

/*
 * Helper method to ensure all translations all available in the data
 *
 * Parameter:
 *
 * - data: The raw data based on loaded YAML files
 */
const fixData = (rawData, languages) => {
  const data = {}
  for (const [namespace, nsdata] of Object.entries(rawData)) {
    if (typeof nsdata.en === 'undefined') {
      throw `No English data for namespace ${namespace}. Bailing out`
    }
    data[namespace] = { en: nsdata.en }
    // Complete other langauges
    for (const lang of languages.filter((loc) => loc !== 'en')) {
      if (typeof nsdata[lang] === 'undefined') data[namespace][lang] = nsdata.en
      else {
        for (const key of Object.keys(data[namespace].en)) {
          if (typeof nsdata[lang][key] === 'undefined') nsdata[lang][key] = nsdata.en[key]
        }
        data[namespace][lang] = nsdata[lang]
      }
    }
  }

  return data
}

/*
 * Converst a pattern translation file to a namespace structure
 * for a given language
 */
const patternTranslationAsNamespace = (i18n, language) => {
  const pojo = {
    t: i18n[language].t,
    d: i18n[language].d,
  }
  for (const [key, val] of Object.entries(i18n[language].s)) {
    pojo[key] = val
  }
  for (const [key, val] of Object.entries(i18n[language].p)) {
    pojo[key] = val
  }
  for (const [key, val] of Object.entries(i18n[language].o)) {
    pojo[`${key}.t`] = val.t
    pojo[`${key}.d`] = val.d
  }

  return pojo
}
/*
 * The method that does the actual work
 */
export const prebuildI18n = async (store) => {
  /*
   * FreeSewing.dev is only available in English
   */
  const languages = store.site === 'dev' ? ['en'] : allLanguages

  /*
   * Handle code-adjacent translations (for React components and so on)
   */
  const files = await getI18nFileList(store.site, languages)
  const data = filesAsNamespaces(files)
  const namespaces = fixData(data, languages)
  // Write out code-adjacent source files
  for (const language of languages) {
    // Fan out into namespaces
    for (const namespace in namespaces) {
      writeJson(store.site, language, namespace, namespaces[namespace][language])
    }
  }

  /*
   * For backend, this is all we need
   */
  if (store.site === 'backend') return (store.i18n = { namespaces })

  /*
   * Handle design translations
   */
  const designNs = {}
  for (const design in designs) {
    for (const language of languages) {
      if (typeof designNs[language] === 'undefined') designNs[language] = {}
      // Write out design namespace files
      const content = patternTranslationAsNamespace(designs[design], language)
      designNs[language][`${design}.t`] = content.t
      designNs[language][`${design}.d`] = content.d
      writeJson(store.site, language, design, content)
    }
  }
  for (const language of languages) writeJson(store.site, language, 'designs', designNs[language])

  /*
   * Handle plugin translations
   */
  const pluginNs = {}
  for (const plugin in plugins) {
    for (const language of languages) {
      if (typeof pluginNs[language] === 'undefined') pluginNs[language] = {}
      // Write out plugin namespace files
      writeJson(store.site, language, plugin, plugins[plugin][language])
    }
  }
  for (const language of languages) writeJson(store.site, language, 'plugins', pluginNs[language])

  /*
   * Update the store
   */
  store.i18n = { namespaces, designNs }
}
