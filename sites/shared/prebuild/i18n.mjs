import fs from 'fs'
import path from 'path'
import { exec } from 'node:child_process'
import yaml from 'js-yaml'
import { fileURLToPath } from 'url'
//import allLanguages from '../../../config/languages.json' assert { type: 'json' }
import { designs } from '../i18n/designs.mjs'

/*
 * This is where we configure what folders we should check for
 * code-adjacent translation source files
 */
const sitesFolder = path.join(fileURLToPath(import.meta.url), '..', '..', '..')
export const folders = {
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
const getI18nFileList = async (site, language) => {
  const dirs = [...folders.shared]
  if (site === 'org') dirs.push(...folders.org)
  if (site === 'dev') dirs.push(...folders.dev)
  if (site === 'lab') dirs.push(...folders.lab)
  let stdout = ''
  for (const dir of dirs) {
    const cmd = `find ${dir} -type f -name "*.${language}.yaml"`
    const find = exec(cmd, {}, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error} - ${stderr}`)
        return
      }

      return stdout
    })
    /*
     * Stdout is buffered, so we need to gather all of it
     */
    for await (const data of find.stdout) stdout += data
  }

  return stdout.split('\n')
}

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
    const namespace = path.basename(file).slice(0, -8)
    if (namespace) {
      if (typeof translations[namespace] === 'undefined') {
        translations[namespace] = {}
      }
      translations[namespace] = loadYaml(file)
    }
  }

  return translations
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
   * Handle code-adjacent translations (for React components and so on)
   */
  const files = await getI18nFileList(store.site, store.language)
  const namespaces = filesAsNamespaces(files)
  // Write out code-adjacent source files
  for (const namespace in namespaces)
    writeJson(store.site, store.language, namespace, namespaces[namespace])

  /*
   * Handle design translations
   */
  const designNs = {}
  for (const design in designs) {
    // Write out design namespace files
    const content = patternTranslationAsNamespace(designs[design], store.language)
    designNs[`${design}.t`] = content.t
    designNs[`${design}.d`] = content.d
    writeJson(store.site, store.language, design, content)
  }
  writeJson(store.site, store.language, 'designs', designNs)

  /*
   * Update the store
   */
  store.i18n = { namespaces, designNs }
}
