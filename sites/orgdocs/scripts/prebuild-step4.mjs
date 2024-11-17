import fs from 'fs'
import { glob } from 'glob'
import matter from 'gray-matter'

/*
 * We want to know all the designs that are available in the
 * showcase posts (or to be more precise: all the tags)
 *
 * So we will loop over all files there, and extract the tags.
 */

async function prebuild() {
  const list = await glob('./showcase/*/index.mdx')
  const tags = []
  for (const file of list) {
    const content = await fs.readFileSync(file, 'utf-8')
    const data = matter(content)
    if (data.data.tags) {
      if (Array.isArray(data.data.tags)) tags.push(...data.data.tags)
      else tags.push(data.data.tags)
    } else console.log('Missing design tag in showcase post:', { file, data: data.data })
  }
  fs.writeFileSync(
    `./showcase-tags.mjs`,
    `export const tags = ${JSON.stringify([...new Set(tags.sort())])}`
  )
}

prebuild()
