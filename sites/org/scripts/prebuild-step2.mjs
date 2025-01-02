import fs from 'fs'
import { mkdir } from 'node:fs/promises'
import path from 'path'
import { designs, about, i18n } from '@freesewing/collection'
import {
  designs as designTranslations,
  optiongroups as optiongroupTranslations,
} from '../src/lib/i18n.mjs'
import {
  capitalize,
  optionsMenuStructure,
  optionType,
  orderBy,
} from '../../../packages/utils/src/index.mjs'

/*
 * If you are looking to port a design, remove it from the list below
 * and the options umbrella page will be auto-generated
 *
 * Run 'npm run prestart' to force it, or it will happen automatically
 * when you run `npm run start`
 */
const skip = []

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

const designPageTemplate = (design) => `---
title: ${i18n[design].en.t}
---

{/* This page is auto-generated. Manual changes will be lost. */}

import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { DesignInfo } from '@freesewing/react/components/Collection'
import Link from '@docusaurus/Link'
import Notes from '@site/docs/docs/designs/${design}/_notes.mdx'
import DesignExamples from '@site/src/components/DesignExamples.mjs'

<DocusaurusDoc>

<DesignInfo design="${design}" Link={Link} />

## Designer notes {#notes}

<Notes />

## Examples

<DesignExamples design="${design}" Link={Link} />

</DocusaurusDoc>

`

/*
 * Generate options page for each design
 * Also create the /designs/NAME page
 */
async function generateDesignsDocs() {
  // Iterate over designs
  for (const [name, design] of Object.entries(designs)) {
    if (!skip.includes(name)) {
      const imports = Object.keys(designs[name].patternConfig.options)
        .filter(
          (optName) => optionType(designs[name].patternConfig.options[optName]) !== 'constant'
        )
        .sort()
        .map(
          (opt) =>
            `import ${capitalize(opt.toLowerCase())} from '@site/docs/docs/designs/${name}/options/${opt.toLowerCase()}/readme.mdx'`
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
      const structure = optionsMenuStructure(designs[name].patternConfig.options, {}, true)
      for (const [key, val] of Object.entries(structure)) {
        content.push(`## ${optiongroupTranslations[key] || key} {#${key}}`)
        if (val.isGroup) {
          for (const [skey, sval] of Object.entries(val)) {
            if (!sval.isGroup && optionType(sval) !== 'constant') {
              content.push(
                `### ${i18n[name].en.o[skey]?.t} {#${skey.toLowerCase()}}`,
                '',
                `**${i18n[name].en.o[skey]?.d}**`,
                ...optionInfo(sval),
                '',
                `<${capitalize(skey.toLowerCase())} />`,
                ''
              )
            } else if (sval.isGroup) {
              content.push(
                `### ${i18n[name].en.o[skey]?.t || capitalize(skey)} {#${skey.toLowerCase()}}`
              )
              for (const [sskey, ssval] of Object.entries(sval)) {
                if (!ssval.isGroup && optionType(ssval) !== 'constant') {
                  content.push(
                    `#### ${i18n[name].en.o[sskey]?.t || sskey} {#${sskey.toLowerCase()}}`,
                    '',
                    `**${i18n[name].en.o[sskey]?.d}**`,
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
        const dir = `./docs/docs/designs/${name}/options`
        await ensuredir(dir)
        fs.writeFileSync(`${dir}/readme.mdx`, content.join('\n'))
      }
      fs.writeFileSync(`./docs/designs/${name}.mdx`, designPageTemplate(name))
    }
  }
}

function prebuild() {
  generateDesignsDocs()
}

prebuild()
