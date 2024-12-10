import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import designInfo from '../../../config/software/designs.json' with { type: 'json' }
import { designs as designTranslations } from '../../../i18n/designs.mjs'

/*
 * Load translations as there's no YAML loader
 * We are loading this sync because NodeJS 20 does not support
 * top-level await out of the box
 */
const measurementsTranslations = loadYaml('../../i18n/measurements.yaml')
const optionGroupTranslations = loadYaml('../../i18n/optiongroups.yaml')

/*
 * Write these translations as JS to disk
 */
function writeTranslations() {
  const content = [
    header,
    `export const measurements = ${JSON.stringify(measurementsTranslations)}`,
    '',
    `export const optiongroups = ${JSON.stringify(optionGroupTranslations)}`,
    '',
    `export const designs = ${JSON.stringify(designTranslations)}`,
    '',
  ]
  fs.writeFileSync(`./src/lib/i18n.mjs`, content.join('\n'))
}

/*
 * Write design info
 */
function writeDesignInfo() {
  const content = [header, `export const designInfo = ${JSON.stringify(designInfo)}`, '']
  fs.promises.writeFile(`./src/lib/designinfo.mjs`, content.join('\n'))
}

/*
 * Simple and stupid YAML loader
 *
 * @arg {String} file - (relative) path to the file to load
 * @return {object} yaml - The YAML data as a JS object
 */
function loadYaml(file) {
  const raw = fs.readFileSync(path.resolve(file), 'utf8')
  let content
  try {
    content = yaml.parse(raw)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
  return content
}

/*
 * Header to include in auto-generated files
 */
export const header = `/*
 * This file is auto-generated.
 * Any changes you make will be overwritten by the prebuild step.
 */`

/*
 * Generate design imports file
 */
function generateDesignsLib() {
  const content = [header, `import { designInfo } from './designinfo.mjs'`]
  // Add designs
  for (const [name, design] of Object.entries(designInfo)) {
    if (design.org) content.push(`import * as ${name} from '@freesewing/${name}'`)
  }

  // Add the rest of the file
  content.push(
    '',
    `const designs = {`,
    ...Object.keys(designInfo)
      .filter((d) => designInfo[d].org)
      .map((d) => `  ${d},`),
    `}`,
    '',
    `const designList = Object.keys(designs)`,
    '',
    `export { designInfo, designList, designs }`,
    ''
  )

  // Write to disk
  fs.promises.writeFile(`./src/lib/designs.mjs`, content.join('\n'))
}

function prebuild() {
  generateDesignsLib()
  writeTranslations()
  writeDesignInfo()
}

prebuild()
