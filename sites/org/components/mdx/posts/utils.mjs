import { localePath } from 'shared/utils.mjs'
const preGenerate = 6
export const numPerPage = 12

/**
 * get pre-generated paths for each language for post slug pages
 * @param  {Object}   sortedPaths   a dictionary keyed by locale of post paths sorted by date published
 * @return {Sting[]}                paths for the latest 6 posts in all locales
 */
export const getPostSlugPaths = (sortedPaths) => {
  const paths = []

  for (const lang in sortedPaths) {
    for (let i = 0; i < preGenerate; i++) {
      paths.push(localePath(lang, `${sortedPaths[lang][i]}`))
    }
  }

  return paths
}

/**
 * get pre-generated paths for each language for post index pages
 * @param  {Object}     sortedPaths   a dictionary keyed by locale of post paths sorted by date published
 * @param  {String}     type          post type: blog, showcase, or newsletter
 * @return {String[]}                 paths for the first two pages of posts in all locales
 */
export const getPostIndexPaths = (sortedPaths, type) => {
  const paths = []
  for (const language in sortedPaths) {
    paths.push(localePath(language, `${type}/page/1`))
    paths.push(localePath(language, `${type}/page/2`))
  }

  return paths
}

/**
 * get static props for a post index page
 * @param  {String} locale      the locale
 * @param  {Object} params      path params
 * @param  {Object} sortedPaths [description]
 * @param  {Object} postInfo    data on all posts, loaded from prebuild
 * @return {Object} props       page props
 * @return {Object[]} props.posts   the posts to link to on the page
 * @return {Number} props.current   the current page number
 * @return {Number} props.total     the total number of pages
 */
export const getPostIndexProps = (locale, params, sortedPaths, postInfo) => {
  const pageNum = parseInt(params.page)
  const numLocPages = Math.ceil(sortedPaths[locale].length / numPerPage)
  if (pageNum > numLocPages) return false

  const postSlugs = sortedPaths[locale].slice(numPerPage * (pageNum - 1), numPerPage * pageNum)
  const posts = postSlugs.map((s) => ({ ...postInfo[locale][s], s }))

  return { posts, current: pageNum, total: numLocPages }
}
