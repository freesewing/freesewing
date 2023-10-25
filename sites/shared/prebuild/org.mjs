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

export const generateNewPatternPages = async (designs, site = 'org') => {
  const page = await loadPageTemplate('new-pattern.mjs')
  for (const design of designs) {
    await fs.promises.writeFile(
      path.resolve(`../${site}/pages/new/${design}.mjs`),
      mustache.render(changeDelimiter + page, {
        design,
        Design: capitalize(design),
      })
    )
  }
}

const generateEditPatternPages = async (designs, site = 'org') => {
  const page = await loadPageTemplate('edit-pattern.mjs')
  for (const design of designs) {
    const dir = `../${site}/pages/account/patterns/${design}`
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

//const vercel = {
//  git: {
//    deploymentEnabled: {
//      i18n: false,
//      producionBackend: false,
//    },
//  },
//}

//const generateRewriteConfig = async (designs) => {
//  const rewrites = []
//  for (const design of designs) {
//    rewrites.push({
//      source: `/account/patterns/${design}/:id/edit`,
//      destination: `/account/patterns/${design}/edit?id=:id`,
//    })
//  }
//  await fs.promises.writeFile(
//    path.resolve('..', 'org', 'vercel.json'),
//    JSON.stringify({ rewrites, ...vercel }, null, 2)
//  )
//}

export const prebuildOrg = async () => {
  await generateNewPatternPages(collection)
  await generateEditPatternPages(collection)
  //await generateRewriteConfig(collection)
}
