import { loadMdxForPrebuild, header } from './docs.mjs'
import fs from 'fs/promises'
import path from 'path'
import rdir from 'recursive-readdir'
import orderBy from 'lodash.orderby'

const types = ['blog', 'showcase', 'newsletter']

export const prebuildPosts = async (site) => {
  if (site !== 'org') return {}

  // Languages
  const locales = ['en', 'fr', 'es', 'nl', 'de', 'uk']
  const results = await Promise.all(
    types.map((t) =>
      loadMdxForPrebuild(site, path.resolve('..', '..', 'markdown', site, t), locales)
    )
  )

  const writeOps = []
  const pages = {}
  for (var i = 0; i < types.length; i++) {
    const writePath = path.resolve('..', site, 'prebuild', types[i])

    const sorted = {}
    const resultPages = results[i]

    pages[types[i]] = resultPages
    for (const lang in resultPages) {
      sorted[lang] = Object.keys(resultPages[lang]).sort(
        (a, b) => resultPages[lang][a].o - resultPages[lang][b].o
      )
      // get rid of the index page
      sorted[lang].shift()
    }

    writeOps.push(
      fs.writeFile(
        path.resolve('..', site, 'prebuild', `${types[i]}-paths.mjs`),
        `${header}export const order = ${JSON.stringify(
          sorted,
          2,
          null
        )}\nexport const postInfo = ${JSON.stringify(resultPages, 2, null)}`
      )
    )
  }

  await Promise.all(writeOps)

  return pages
}
