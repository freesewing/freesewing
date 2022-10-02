import path from 'path'
import fs from 'fs'
import rdir from 'recursive-readdir'
import { unified } from 'unified'
import remarkParser from 'remark-parse'
import remarkCompiler from 'remark-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkFrontmatterExtractor from 'remark-extract-frontmatter'
import { readSync } from 'to-vfile'
import yaml from 'js-yaml'

/*
 * There's an issue in crowdin where it changes the frontmatter marker:
 * ---
 * into this:
 * - - -
 * which breaks stuff. So this method takes the input and replaces all
 * - - - with ---
 */
export const fixCrowdinBugs = md => {
  md.value = md.value.split("- - -\n").join("---\n")
  return md
}

/*
 * Helper method to get a list of MDX files in a folder.
 * Will traverse recursively to get all files from a given root folder.
 *
 * Parameters:
 *
 *  - folder: the root folder to look in
 *  - lang: the language files to looks for
 *
 *  Exported because it's also used by the Algolia index script
 */
export const getMdxFileList = async (folder, lang) => {
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
      file.indexOf('/ui/') === -1 &&
      file.indexOf('/uimd/') === -1
    ) files.push(file)
  }

  return files.sort()
}

/*
 * Helper method to get the website slug (path) from the file path
 */
export const fileToSlug = (file, site, lang) => (file.slice(-6) === `/${lang}.md`)
  ? file.split(`/markdown/${site}/`).pop().slice(0, -6)
  : false

/*
 * Helper method to get the title and meta data from an MDX file
 *
 * Parameters:
 *
 *  - file: the full path to the file
 */
const mdxMetaInfo = async file => {
  let result
  try {
    result = await unified()
      .use(remarkParser)
      .use(remarkCompiler)
      .use(remarkFrontmatter)
      .use(remarkFrontmatterExtractor, { yaml: yaml.load })
      .process(fixCrowdinBugs(readSync(file, { encoding: 'utf-8' })))
  }
  catch (err) {
    console.log(err)
  }

  return result
}

/*
 * Main method that does what needs doing
 */
export const prebuildMdx = async(site) => {

  // Say hi
  console.log()
  console.log(`Prebuilding MDX for freesewing.${site}`)

  // Setup MDX root path
  const mdxRoot = path.resolve('..', '..', 'markdown', site)

  // Loop over locales
  const pages = {}
  for (const lang of (site === 'dev' ? ['en'] : ['en', 'fr', 'es', 'nl', 'de'])) {

    console.log(`  - Language: ${lang}`)

    // Get list of filenames
    const list = await getMdxFileList(mdxRoot, lang)

    // Parse them for title and intro
    pages[lang] = {}
    for (const file of list) {
      const slug = fileToSlug(file, site, lang)
      if (slug) {
        const meta = await mdxMetaInfo(file)
        if (meta.data?.title && meta.data?.title) {
          pages[lang][slug] = {
            title: meta.data.title,
            slug,
            order: meta.data.order
              ? `${meta.data.order}${meta.data.title}`
              : meta.data.title
          }
        } else {
          if (pages.en[slug]) {
            console.log(`⚠️l Falling back to EN metadata for ${slug}`)
            pages[lang][slug] = pages.en[slug]
          } else {
            console.log(`❌ [${lang}] Failed to extract meta info from: ${slug}`)
            if (meta.messages.length > 0) console.log(meta.messages)
          }
        }
      }
    }

    fs.writeFileSync(
      path.resolve('..', site, 'prebuild', `mdx.${lang}.js`),
      `export default ${JSON.stringify(pages[lang], null ,2)}`
    )
  }

  // Write list of all MDX paths (in one language)
  fs.writeFileSync(
    path.resolve('..', site, 'prebuild', `mdx.paths.js`),
    `export default ${JSON.stringify(Object.keys(pages.en), null ,2)}`
  )

  return pages
}

