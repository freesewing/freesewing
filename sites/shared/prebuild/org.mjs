import path from 'path'
import fs from 'fs'
import { collection } from '../../org/hooks/use-design.mjs'
import { capitalize } from '../utils.mjs'
import mustache from 'mustache'

const changeDelimiter = `{{!
//    Change the Mustache delimiter from double curly braces to double dollar signs.
//    Dollar signs are allowed in EcmaScript identifier names,
//    which is helpful when running unrendered Mustache templates through eslint.
//}}{{=$$ $$=}}
`

const loadPageTemplate = async (name) =>
  await fs.promises.readFile(path.resolve(`../org/page-templates/${name}`), 'utf-8')

const generateNewPatternPages = async () => {
  const page = await loadPageTemplate('new-pattern.mjs')
  for (const design of collection) {
    await fs.promises.writeFile(
      path.resolve(`../org/pages/new/${design}.mjs`),
      mustache.render(changeDelimiter + page, {
        design,
        Design: capitalize(design),
      })
    )
  }
}

const generateEditPatternPages = async () => {
  const page = await loadPageTemplate('edit-pattern.mjs')
  for (const design of collection) {
    const dir = `../org/pages/account/patterns/${design}/[id]`
    await fs.promises.mkdir(path.resolve(dir), { recursive: true })
    await fs.promises.writeFile(
      path.resolve(`${dir}/edit.mjs`),
      mustache.render(changeDelimiter + page, {
        design,
        Design: capitalize(design),
      })
    )
  }
}

export const prebuildOrg = async () => {
  await generateNewPatternPages()
  await generateEditPatternPages()
}
