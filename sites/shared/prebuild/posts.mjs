import { prebuildMdxFromFolder, header } from './docs.mjs'
import fs from 'fs'
import path from 'path'
import rdir from 'recursive-readdir'
import orderBy from 'lodash.orderby'

const types = ['blog', 'showcase']
export const prebuildPosts = async (site, pages) => {
  if (site !== 'org') return {}

  const results = await Promise.all(types.map((t) => prebuildMdxFromFolder(site, pages, t)))

  const writeOps = []
  for (var i = 0; i < types.length; i++) {
    const writePath = path.resolve('..', site, 'prebuild', types[i])
    // Write files with MDX paths
    // fs.mkdirSync(writePath, {recursive: true})

    const sorted = {}
    const resultPages = results[i].pages

    for (const lang in resultPages) {
      sorted[lang] = Object.keys(resultPages[lang]).sort(
        (a, b) => resultPages[lang][a].o - resultPages[lang][b].o
      )
      // get rid of the index page
      sorted[lang].shift()
    }

    fs.writeFileSync(
      path.resolve('..', site, 'prebuild', `${types[i]}-paths.mjs`),
      `${header}export const order = ${JSON.stringify(
        sorted,
        2,
        null
      )}\nexport const postInfo = ${JSON.stringify(resultPages, 2, null)}`
    )
  }
}
