/*
 * This will create (SVG) images for all options of all patterns
 * To do that, it will load the configuration from:
 *
 * config/pattern-options.js
 *
 * Based on that, it will generate SVG images for each option and store them
 * in the relevant folder:
 *
 * markdown/org/docs/patterns/[pattern]/[option]/[pattern]_[option]_sample.svg
 *
 */
const fs = require('fs')
const path = require('path')
const core = require('../packages/core/dist')
const theme = require('../packages/plugin-theme/dist')
const pi = require('../packages/pattern-info/dist')
const models = require('../packages/models/dist')
const wb32 = models.withBreasts.size32
const i18n = require('../packages/i18n/dist')
const capitalize = require('../packages/utils/capitalize')

const missing = []
const lacking = []
const extra = []
const file = 'en.md'
const subpages = [
  'cutting',
  'fabric',
  'instructions',
  'options',
  'measurements',
  'needs'
]

const patternDocsPage = pattern => `---
---

<PatternDocs pattern='${pattern}' />

`
const fixme = `---
---

<Fixme>

This documentation page is yet to be written.

Sorry for the inconvenience.

</Fixme>
`

const component = (comp, pattern) => `---
---

<Pattern${capitalize(comp)} pattern='${pattern}' />

`

const patternDocsSubPage = (pattern, sub) => {
  switch (sub) {
    case 'measurements':
    case 'options':
      return component(sub, pattern)
      break;
    default:
      return fixme
  }
}

const optionDocsPage = (pattern, option) => `---
title: ` + i18n.strings.en[`options.${pattern}.${option}.title`] +
  "\n---\n\n" +
  i18n.strings.en[`options.${pattern}.${option}.description`] + "\n"

const present = folder => {
  try {
    if (fs.readFileSync(path.join(folder, file))) return true
  }
  catch (err) {
    return false
  }

  return false
}

const getSubFolders = folder => fs
  .readdirSync(folder, {withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

const checkOptionDocs = () => {
  const steps = ['markdown', 'org', 'docs', 'patterns']
  for (const pattern of pi.list) {
    // Index page
    const folder = path.join(...steps, pattern)
    const subFolders = getSubFolders(folder)
    for (const page of subpages) {
      if (subFolders.indexOf(page) === -1) lacking.push(path.join(folder, page))
    }
    for (const sub of subFolders) {
      if (subpages.indexOf(sub) === -1) extra.push(path.join(folder, sub))
    }
    if (!present(folder)) {
      fs.mkdirSync(folder, { recursive: true })
      fs.writeFileSync(
        path.join(folder, file),
        patternDocsPage(pattern),
      )
    }
    // Sub pages
    for (const sub of subpages) {
      const folder = path.join(...steps, pattern, sub)
      if (!present(folder)) {
        fs.mkdirSync(folder, { recursive: true })
        fs.writeFileSync(
          path.join(folder, file),
          patternDocsSubPage(pattern, sub),
        )
      }
    }

    // Options
    let optionFolders = getSubFolders(path.join(...steps, pattern, 'options'))
    for (const option of pi.options[pattern]) {
      // Remove this from the folder list
      const i = optionFolders.indexOf(option.toLowerCase())
      optionFolders.splice(i, 1)
      const folder = path.join(...steps, pattern, 'options', option.toLowerCase())
      if (!present(folder)) {
        missing.push(path.join(folder, file))
        fs.mkdirSync(folder, { recursive: true })
        fs.writeFileSync(
          path.join(folder, file),
          optionDocsPage(pattern, option),
        )
      }
    }
    // Now check for extra folders
    for (const subfolder of optionFolders) {
      extra.push(path.join(...steps, pattern, 'options', subfolder))
    }
  }

  if (missing.length < 1 && extra.length < 1 && lacking.length < 1) {
    console.log("\n  🎉 Everything looks fine 😀\n")
  } else {
    if (missing.length > 0) {
      console.log("\n", 'Added documenation pages for the following options:', "\n\n")
      for (const line of missing) console.log(line)
    }
    if (extra.length > 0) {
      console.log("\n", 'Found extra folders that should not be there:', "\n\n")
      for (const line of extra) console.log(line)
    }
  }
}

checkOptionDocs()

