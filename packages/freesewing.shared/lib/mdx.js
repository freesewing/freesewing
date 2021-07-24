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

const loadFile = (slug, folder='dev', language='en') => fs.readFileSync(`${mdxPath(folder)}/${slug}/${language}.md`)

// Extract for 10 lines for markdown excerpt
const first10 = (file, options) => {
  file.excerpt = file.content.split('\n').slice(0, 10).join(' ')
}

// Gets paths for getStaticPaths
const getPaths = async (folder, language='en') => {
  const absFiles = await getFiles(mdxPath(folder))
  const relFiles = filesAbsToRel(absFiles, folder, language)

  return relFiles
}

// Gets paths and pages for getStaticProps
const get = async (folder='dev', language='en', path=false) => {
  const paths = await getPaths(folder, language)
  const pages = getPageList(paths, folder, language)

  return [paths, pages]
}

module.exports = {
  get,
  getPaths,
  loadFile,
  matter,
}

