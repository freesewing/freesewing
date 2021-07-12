import fs from 'fs'
import path from 'path'
import rdir from 'recursive-readdir'
import matter from "gray-matter"

const mdxPath = folder => path.resolve(__dirname, `../../../../../markdown/${folder}/`)

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

  return relFiles
}

export const getMdxPaths = async (folder='dev', language='en') => {
  const absFiles = await getFiles(mdxPath(folder))
  const relFiles = filesAbsToRel(absFiles, folder, language)

  return relFiles
}

const getFrontmatter = slug => {
  const { content, data } = matter(rawMdx)

}

export const getPageList = (paths, folder='dev', language='en', preHook=false, postHook=false) => {
  const allPaths = preHook
    ? preHook(paths)
    : [...paths]
  const list = {}
  allPaths.sort()
  for (const path of allPaths) {
    const { content, data } = matter(loadMdxFile(path, folder, language))
    list[path] = {
      path,
      frontmatter: data,
      order: `${data?.order || ''}${data.title || path}`,
      offspring: []
    }
    if (path.indexOf('/') !== -1) {
      const up = path.split('/').slice(0, -1).join('/')
      if (list[up]) {
        list[up].offspring.push(path)
        list[path].up = up
      }
    }
  }

  return postHook
    ? postHook(list)
    : list
}

export const loadMdxFile = (slug, folder='dev', language='en') => fs.readFileSync(`${mdxPath(folder)}/${slug}/${language}.md`)

export const getMdxStaticProps = async (folder, language, path=false) => {
  const props = {}
  props.paths = await getMdxPaths(folder, language)
  props.pages = getPageList(props.paths, folder, language)
  if (path) {
    const rawMdx = loadMdxFile(path)
    const { content, data } = matter(rawMdx)
    props.href = `/${path}`
    props.mdx = content
    props.frontmatter = data
  }

  return props

}

