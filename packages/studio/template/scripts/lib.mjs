import { glob } from 'glob'
import { mkdir, copyFile, readFile, writeFile, opendir } from 'node:fs/promises'
import path from 'node:path'
import { lstatSync } from 'node:fs'
import chalk from 'chalk'
import prompts from 'prompts'
import mustache from 'mustache'

/*
 * Ask input about what the user wants
 */
export const getInput = async () => {
  let template = false
  let name = false
  let finalName = false
  const cwd = process.cwd()

  // while we're not finalized on a name
  while (finalName === false) {
    // request a name
    name = (
      await prompts({
        type: 'text',
        name: 'name',
        message: ' Give a name for your new design. Please stick to [a-z] only. 🏷️ ',
        initial: 'xiaomao',
      })
    ).name

    // check whether a folder with that name already exists
    const dest = path.join(cwd, 'designs', name)
    try {
      const dir = await opendir(dest)
      dir.close()
    } catch {
      // the folder didn't exist, so we're good to go
      finalName = true
      break
    }

    // the folder did exist, bail out
    const { nextStep } = await prompts({
      type: 'select',
      name: 'nextStep',
      message: 'It looks like that folder already exists. What should we do?',
      choices: [
        { title: 'Go back', value: 'rename', description: 'Choose a different folder name' },
        {
          title: 'Exit',
          value: 'exit',
          description: 'Exit here so you can investigate',
        },
      ],
    })

    // if they said rename, we loop again. Otherwise, we exit
    if (nextStep !== 'rename') process.exit()
  }

  // request a template
  template = (
    await prompts({
      type: 'select',
      name: 'template',
      message: ' What template would you like to start from?',
      choices: [
        { title: 'Create a design from scratch', value: 'base' },
        { title: 'Extend the Brian block (flat-sleeve block for menswear)', value: 'brian' },
        { title: 'Extend the Bent block (two-part-sleeve block for menswear)', value: 'bent' },
        { title: 'Extend the Bella block (womenswear bodice block)', value: 'bella' },
        { title: 'Extend the Breanna block (womenswear bodice block)', value: 'breanna' },
        { title: 'Extend the Titan block (unisex trouser block)', value: 'titan' },
      ],
      initial: 0,
    })
  ).template
  return { name: name.toLowerCase(), template }
}

/*
 * Generate a new design from a template
 */
export async function designFromTemplate({ name, template }) {
  const folder = path.resolve(path.join('.', 'designs'))
  const files = await glob(path.join(folder, `.${template}/**`))
  const source = `.${template}`
  const target = name
  const replacements = {
    name: name,
    Name: capitalize(name),
    version: '0.0.1',
  }
  for (const file of files) {
    const rel = file.slice(folder.length + source.length + 2)
    if (rel.slice(-9) === '.mustache') {
      const content = await readFile(path.join(folder, source, rel), { encoding: 'utf8' })
      await writeFile(
        path.join(folder, target, rel.slice(0, -9)),
        mustache.render(content, replacements)
      )
    } else if (rel !== '' && isDir(path.join(folder, source, rel))) {
      await mkdir(path.join(folder, target, rel), { recursive: true })
    } else if (rel !== '') {
      await copyFile(path.join(folder, source, rel), path.join(folder, target, rel))
    }
  }
}

/*
 * Simple way to capitalize a word
 */
function capitalize(string) {
  return typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

/**
 * Helper method to determine wheter a file is a folder
 */
function isDir(path) {
  let dir = false
  try {
    dir = lstatSync(path) ? lstatSync(path).isDirectory() : false
  } catch (err) {
    console.log(err)
  }

  return dir
}

/*
 * Generate loader file for all custom designs
 */
export async function bundleCustomDesigns() {
  const found = await glob(path.join('.', 'designs', '*'))
  if (found.length === 0) process.exit()
  const designs = {}
  const loader = ['/*', ' * This file is auto-generated. Manual changes will be overwritten', ' */']
  const exports = []
  for (const design of found) {
    const name = path.basename(design)
    const Name = capitalize(name)
    loader.push(`import { ${Name}, i18n as i18n${Name} } from '../designs/${name}/src/index.mjs'`)
    exports.push(Name)
  }
  loader.push('')
  loader.push(
    `export const localDesigns = { ${exports.map((Name) => `${Name.toLowerCase()}: ${Name}`).join(',')} }`
  )
  await writeFile(path.resolve(path.join('.', 'src', 'local-designs.mjs')), loader.join('\n'))
}
