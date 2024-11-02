import fs from 'fs'
import { mkdir } from 'node:fs/promises'
import path from 'path'
import { designs, designInfo } from '../src/lib/designs.mjs'
import {
  designs as designTranslations,
  optiongroups as optiongroupTranslations,
} from '../src/lib/i18n.mjs'
import { capitalize, optionsMenuStructure, optionType } from '../src/lib/utils.mjs'

/*
 * If you are looking to port a design, remove it from the list below
 * and the options umbrella page will be auto-generated
 *
 * Run 'npm run prestart' to force it, or it will happen automatically
 * when you run `npm run start`
 */
const skip = ['charlie', 'diana', 'holmes', 'huey', 'titan']

/*
 * mkdir helper
 */
async function ensuredir(dir) {
  try {
    await mkdir(path.resolve(dir), { recursive: true })
  } catch (err) {
    // Swallor error of folder exists
    if (!err.toString().includes('already exists')) {
      console.log(err)
      process.exit(1)
    }
  }
  return true
}

/*
 * Generate option table
 */
function optionInfo(option) {
  const type = optionType(option)
  if (type === 'pct') return pctOption(option)
  if (type === 'count') return countOption(option)
  if (type === 'deg') return degOption(option)
  if (type === 'bool') return boolOption(option)
  if (type === 'list') return listOption(option)
  if (type === 'mm') return mmOption(option)

  return []
}

function pctOption(option) {
  return [
    `- Type: **Percentage**`,
    `- Default: **${option.pct}%**`,
    `- Minimum: **${option.min}%**`,
    `- Maximum: **${option.max}%**`,
  ]
}
function degOption(option) {
  return [
    `- Type: **Degrees**`,
    `- Default: **${option.deg}°**`,
    `- Minimum: **${option.min}°**`,
    `- Maximum: **${option.max}°**`,
  ]
}
function countOption(option) {
  return [
    `- Type: **Percentage**`,
    `- Default: **${option.pct}**`,
    `- Minimum: **${option.min}**`,
    `- Maximum: **${option.max}**`,
  ]
}
function listOption(option) {
  return [
    `- Type: **List**`,
    `- Default: **${option.dflt}**`,
    `- options:`,
    ...option.list.map((o) => `  - ${o}`),
  ]
}
function boolOption(option) {
  return [`- Type: **Boolean**`, `- Default: **${option.bool}**`]
}
function mmOption(option) {
  return [
    `- Type: **Millimeter**`,
    `- Default: **${option.mm}mm**`,
    `- Minimum: **${option.min}mm**`,
    `- Maximum: **${option.max}mm**`,
  ]
}

/*
 * Generate options page for each design
 */
async function generateDesignsDocs() {
  // Iterate over designs
  for (const [name, design] of Object.entries(designInfo)) {
    if (design.org && !skip.includes(name)) {
      const imports = Object.keys(designs[name][capitalize(name)].patternConfig.options)
        .filter(
          (optName) =>
            optionType(designs[name][capitalize(name)].patternConfig.options[optName]) !==
            'constant'
        )
        .sort()
        .map(
          (opt) =>
            `import ${capitalize(opt.toLowerCase())} from '@site/docs/designs/${name}/options/${opt.toLowerCase()}/readme.mdx'`
        )
      const content = [
        `---`,
        `title: "${designTranslations[name].t}: Design Options"`,
        `sidebar_label: Design Options`,
        `sidebar_position: 10`,
        `toc_max_heading_level: 5`,
        `---`,
        '',
        ...imports,
        '',
      ]
      const i18n = designs[name].i18n.en
      const structure = optionsMenuStructure(
        designs[name][capitalize(name)].patternConfig.options,
        {},
        true
      )
      for (const [key, val] of Object.entries(structure)) {
        content.push(`## ${optiongroupTranslations[key] || key} {#${key}}`)
        if (val.isGroup) {
          for (const [skey, sval] of Object.entries(val)) {
            if (!sval.isGroup && optionType(sval) !== 'constant') {
              content.push(
                `### ${i18n.o[skey]?.t} {#${skey.toLowerCase()}}`,
                '',
                `**${i18n.o[skey]?.d}**`,
                ...optionInfo(sval),
                '',
                `<${capitalize(skey.toLowerCase())} />`,
                ''
              )
            } else if (sval.isGroup) {
              content.push(`### ${i18n.o[skey]?.t || capitalize(skey)} {#${skey.toLowerCase()}}`)
              for (const [sskey, ssval] of Object.entries(sval)) {
                if (!ssval.isGroup && optionType(ssval) !== 'constant') {
                  content.push(
                    `#### ${i18n.o[sskey]?.t || sskey} {#${sskey.toLowerCase()}}`,
                    '',
                    `**${i18n.o[sskey]?.d}**`,
                    ...optionInfo(ssval),
                    '',
                    `<${capitalize(sskey.toLowerCase())} />`,
                    ''
                  )
                }
              }
            }
          }
        }
        const dir = `./docs/designs/${name}/options`
        await ensuredir(dir)
        fs.writeFileSync(`${dir}/readme.mdx`, content.join('\n'))
      }
    }
  }
}

function prebuild() {
  generateDesignsDocs()
}

prebuild()
