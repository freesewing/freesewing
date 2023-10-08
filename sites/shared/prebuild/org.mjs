import path from 'path'
import fs from 'fs'
import { collection } from '../../org/hooks/use-design.mjs'
import { capitalize } from '../utils.mjs'
import mustache from 'mustache'

const loadPageTemplate = async (name) =>
  await fs.promises.readFile(path.resolve(`../org/page-templates/${name}.mustache`), 'utf-8')

const generateNewDesignPages = async () => {
  const page = await loadPageTemplate('new-design.mjs')
  for (const design of collection) {
    await fs.promises.writeFile(
      path.resolve(`../org/pages/new/${design}.mjs`),
      mustache.render(page, {
        design,
        Design: capitalize(design),
      })
    )
  }
}

export const prebuildOrg = async () => {
  await generateNewDesignPages()
}
