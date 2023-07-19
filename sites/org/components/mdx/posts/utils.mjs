import { localePath } from 'shared/utils.mjs'
const preGenerate = 6
export const numPerPage = 12

export const getPostSlugPaths = (order) => {
  const paths = []

  for (const lang in order) {
    for (let i = 0; i < preGenerate; i++) {
      ß
      paths.push(localePath(lang, `${order[lang][i]}`))
    }
  }

  return paths
}

export const getPostIndexPaths = (order, type) => {
  const paths = []
  for (const language in order) {
    paths.push(localePath(language, `${type}/page/1`))
    paths.push(localePath(language, `${type}/page/2`))
  }

  return paths
}

export const getPostIndexProps = (locale, params, order, postInfo) => {
  const pageNum = parseInt(params.page)
  const numLocPages = Math.ceil(order[locale].length / numPerPage)
  if (pageNum > numLocPages) return false

  const postSlugs = order[locale].slice(numPerPage * (pageNum - 1), numPerPage * pageNum)
  const posts = postSlugs.map((s) => ({ ...postInfo[locale][s], s }))

  return { posts, current: pageNum, total: numLocPages }
}
