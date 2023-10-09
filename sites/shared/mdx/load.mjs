import fs from 'fs'
import path from 'path'
import { compileMdx } from './compile.mjs'
import { jargon } from 'shared/jargon/index.mjs'
import { ghPrefix } from './remark-github-images.mjs'

/*
 * Loads markdown/mdx from disk
 */
export const loadMdxFromDisk = async ({
  language, // The language code of the markdown to load (like 'en')
  site, // The site folder, one of 'dev' or 'org'
  slug, // The slug below that folder, like 'guides/plugins'
}) =>
  await fs.promises.readFile(path.resolve(`../../markdown/${site}/${slug}/${language}.md`), 'utf-8')

/*
 * Loads markdown/mdx from Github
 */
export const loadMdxFromGithub = async ({
  language, // The language code of the markdown to load (like 'en')
  site, // The site folder, one of 'dev' or 'org'
  slug, // The slug below that folder, like 'guides/plugins'
}) => {
  const response = await fetch(`${ghPrefix}/${site}/${slug}/${language}.md`)
  const md = await response.text()

  return md
}

/*
 * Loads markdown/mdx from disk and compiles it for use
 * in static props.
 */
export const loadMdxAsStaticProps = async ({
  language, // The language code of the markdown to load (like 'en')
  site, // The site folder, one of 'dev' or 'org'
  slug = false, // The slug below that folder, like 'guides/plugins'
  slugs = {}, // An object where key is an ID and value the slug to load
}) => {
  const result = {}
  if (slug) slugs.default = slug
  for (const [key, val] of Object.entries(slugs)) {
    const md = await loadMdxFromDisk({ language, site, slug: val })
    const mdx = await compileMdx({
      md,
      site,
      slug: val,
      jargon: jargon[language],
    })
    result[key] = { ...mdx, slug: val }
  }

  return slug ? result.default : result
}
