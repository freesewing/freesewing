const fs = require('fs')
const path = require('path')
const rdir = require('recursive-readdir')
const matter = require('gray-matter')
const mdxPath = folder => path.resolve(`../../markdown/${folder}/`)

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

const getPageList = (paths, folder='dev', language='en', preHook=false, postHook=false) => {
  const allPaths = preHook
    ? preHook(paths)
    : [...paths]
  const list = {}
  allPaths.sort()
  for (const slug of allPaths) {
    const rawMdx = loadFile(slug, folder, language)
    const { content, data, excerpt } = matter(
      loadFile(slug, folder, language),
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

const loadFile = (slug, folder='dev', language='en') => {
  const noLangSlug = (slug.slice(2,3) === '/') ? slug.slice(3) : slug
  return fs.readFileSync(`${mdxPath(folder)}/${noLangSlug}/${language}.md`)
}

// Extract for 10 lines for markdown excerpt
const first10 = (file, options) => {
  file.excerpt = file.content.split('\n').slice(0, 10).join(' ')
}

// Gets paths for getStaticPaths
const getPaths = async (config) => {
  const absFiles = await getFiles(mdxPath(config.site))
  const relFiles = filesAbsToRel(absFiles, config.site, 'en')
  let paths = [...relFiles]

  //for (const lang of config.languages) {
  //  if (lang !== config.language) paths = [...paths, ...relFiles.map(path => `${lang}/${path}`)]
  //}

  return paths
}

// Gets paths and pages for getStaticProps
const get = async (config) => {
  const paths = await getPaths(config)
  const pages = getPageList(paths, config.site, config.language)

  return [paths, pages]
}

module.exports = {
  get,
  getPaths,
  loadFile,
  matter,
}

