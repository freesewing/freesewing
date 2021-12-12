import path from 'path'
import fs from 'fs'
import { languages, strapiHost } from '../config/freesewing.mjs'
import rdir from 'recursive-readdir'
import { unified } from 'unified'
import remarkParser from 'remark-parse'
import remarkCompiler from 'remark-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkFrontmatterExtractor from 'remark-extract-frontmatter'
import vfileReporter from 'vfile-reporter'
import { readSync } from 'to-vfile'
import yaml from 'yaml'
import { remarkIntroPlugin } from './remark-intro-plugin.mjs'


/*
 * Helper method to get a list of MDX files in a folder.
 * Will traverse recursively to get all files from a given root folder.
 *
 * Parameters:
 *
 *  - folder: the root folder to look in
 *  - lang: the language files to looks for
 */
const getMdxFileList = async (folder, lang) => {
  let allFiles
  try {
    allFiles = await rdir(folder)
  }
  catch (err) {
    console.log(err)
    return false
  }

  // Filter out all that's not a language-specific markdown file
  // and avoid including the 'ui' files
  const files = []
  for (const file of allFiles) {
    if (
      file.slice(-5) === `${lang}.md` &&
      file.indexOf('/ui/') === -1
    ) files.push(file)
  }

  return files.sort()
}

/*
 * Helper method to get the website slug (path) from the file path
 */
const fileToSlug = (file, site, lang) => (file.slice(-6) === `/${lang}.md`)
  ? file.split(`/markdown/${site}/`).pop().slice(0, -6)
  : false

/*
 * Helper method to get the title and intro text from an MDX file
 *
 * Parameters:
 *
 *  - file: the full path to the file
 */
const mdxMetaInfo = async file => await unified()
  .use(remarkIntroPlugin)
  .use(remarkParser)
  .use(remarkCompiler)
  .use(remarkFrontmatter)
  .use(remarkFrontmatterExtractor, { yaml: yaml.parse })
  .process(readSync(file))

/*
 * Main method that does what needs doing
 */
export const prebuildMdx = async(site) => {

  // Say hi
  console.log()
  console.log(`Prebuilding MDX for freesewing.${site}`)
  console.log()

  // Setup MDX root path
  const mdxRoot = path.resolve('..', '..', 'markdown', site)

  // Loop over languages
  for (const lang of (site === 'dev' ? ['en'] : languages)) {

    console.log(`  - Language: ${lang}`)

    // Get list of filenames
    const list = await getMdxFileList(mdxRoot, lang)

    // Parse them for title and intro
    const pages = {}
    for (const file of list) {
      const slug = fileToSlug(file, site, lang)
      if (slug) {
        const meta = await mdxMetaInfo(file)
        if (meta) {
          pages[slug] = {
            ...meta.data,
            slug,
            order: meta?.data?.order
              ? `${meta.data.order}${meta.data.title}`
              : meta.data.title
          }
        }
      }
    }

    fs.writeFileSync(
      path.resolve('..', `freesewing.${site}`, 'prebuild', `mdx.${lang}.js`),
      `export default ${JSON.stringify(pages, null ,2)}`
    )
  }
}

