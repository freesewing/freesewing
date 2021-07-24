const fs = require('fs')
const path = require('path')
const rdir = require('recursive-readdir')
const matter = require('gray-matter')
const config = require(`../../freesewing.${process.env.SITE}/freesewing.config`)

const mdxPath = folder => path.resolve(__dirname, `../../../markdown/${folder}/`)

const getFiles = async (path) => {
  let files
  try {
    files = await rdir(path)
  }
  catch (err) {
    console.log(err)
    return false
  }

  return files
}

const filesAbsToRel = (files, folder, language) => {
  const relFiles = []
  for (const file of files) {
    if (file.slice(-6) === `/${language}.md`) {
      relFiles.push(file.split(`markdown/${folder}`).pop().slice(1, -6))
    }
  }

  // Keep ui files out of it
  return relFiles.filter(slug => slug.slice(0,3) !== 'ui/')
}

const getMdxPaths = async (folder='dev', language='en') => {
  const absFiles = await getFiles(mdxPath(folder))
  const relFiles = filesAbsToRel(absFiles, folder, language)

  return relFiles
}

const getFrontmatter = slug => {
  const { content, data } = matter(rawMdx)

}

const getPageList = (paths, folder='dev', language='en', preHook=false, postHook=false) => {
  const allPaths = preHook
    ? preHook(paths)
    : [...paths]
  const list = {}
  allPaths.sort()
  for (const slug of allPaths) {
    const rawMdx = loadMdxFile(slug, folder, language)
    const { content, data, excerpt } = matter(
      loadMdxFile(slug, folder, language),
      {excerpt: first10}
    )
    list[slug] = {
      path: '/'+slug,
      frontmatter: data,
      excerpt,
      mdx: content,
      order: `${data?.order || ''}${data.title || slug}`,
    }
  }

  return postHook
    ? postHook(list)
    : list
}

const loadMdxFile = (slug, folder='dev', language='en') => fs.readFileSync(`${mdxPath(folder)}/${slug}/${language}.md`)

// Extract for 10 lines for markdown excerpt
const first10 = (file, options) => {
  file.excerpt = file.content.split('\n').slice(0, 10).join(' ')
}

const getMdx = async (folder='dev', language='en', path=false) => {
  const paths = await getMdxPaths(folder, language)
  const pages = getPageList(paths, folder, language)

  return [paths, pages]
}

const prebuild = async (folder) => {
  const allPaths = {}
  const allPages = {}
  for (const lang of config.languages) {
    const [paths, pages] = await getMdx(process.env.SITE, lang)
    allPaths[lang] = paths
    allPages[lang] = pages
    fs.writeFileSync(
      path.join(...folder, `${lang}.mdx.js`),
      `export const paths = ${JSON.stringify(paths, null, 2)}\n` +
      `export const pages = ${JSON.stringify(pages, null, 2)}`
    )
  }

  return { paths: allPaths, pages: allPages}
}

module.exports = prebuild

const addPatternPages = (pages) => {

}

const hooks = {
  dev: {
    paths: {
      pre: false,
      post: false
    },
    pages: {
      pre: false,
      post: false
    },
  },
  org: {
    paths: {
      pre: false,
      post: false
    },
    pages: {
      pre: false,
      post: addPatternPages
    },
  }
}

