import fs from 'fs'
import path from 'path'
import rdir from 'recursive-readdir'
import yaml from 'js-yaml'

/*
 * List of supported languages
 */
const locales = ['en', 'es', 'de', 'fr', 'nl']

/*
 * This is where we configure what folders we should check for
 * code-adjacent translation source files
 */
const folders = [path.resolve(path.join('.', 'src'))]

/*
 * Helper method to write out JSON files for translation sources
 */
const writeJson = async (locale, namespace, content) =>
  fs.writeFileSync(
    path.resolve('.', 'public', 'locales', locale, `${namespace}.json`),
    JSON.stringify(content)
  )

/*
 * Helper method to get a list of code-adjecent translation files in a folder.
 * Will traverse recursively to get all files from a given root folder.
 */
const getI18nFileList = async () => {
  const allFiles = []
  for (const dir of folders) {
    try {
      const dirFiles = await rdir(dir)
      allFiles.push(...dirFiles)
    } catch (err) {
      console.log(err)
      return false
    }
  }

  // Filter out the language files
  return allFiles
    .filter((file) => locales.map((loc) => `.${loc}.yaml`).includes(file.slice(-8)))
    .sort()
}

/*
 * Helper method to get language and namespace from the filename
 *
 * Parameters:
 *
 * - filename: The filename or full path + filename
 */
const languageAndNamespaceFromFilename = (file) => {
  const chunks = path.basename(file).split('.')
  chunks.pop()

  return chunks
}

/*
 * Helper method to load a YAML file from disk
 */
const loadYaml = (file) => {
  let data
  try {
    data = yaml.load(fs.readFileSync(file, 'utf-8'))
  } catch (err) {
    console.log(err)
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
    const [namespace, lang] = languageAndNamespaceFromFilename(file)
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
const fixData = (rawData) => {
  const data = {}
  for (const [namespace, nsdata] of Object.entries(rawData)) {
    if (typeof nsdata.en === 'undefined') {
      throw `No English data for namespace ${namespace}. Bailing out`
    }
    data[namespace] = { en: nsdata.en }
    // Complete other locales
    for (const lang of locales.filter((loc) => loc !== 'en')) {
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
 * The method that does the actual work
 */
export const prebuildI18n = async () => {
  // Handle new code-adjacent translations
  const files = await getI18nFileList()
  const data = filesAsNamespaces(files)
  const namespaces = fixData(data)
  // Write out code-adjacent source files
  for (const locale of locales) {
    // Fan out into namespaces
    for (const namespace in namespaces) {
      writeJson(locale, namespace, namespaces[namespace][locale])
    }
  }
}
