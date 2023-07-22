import { localePath } from 'shared/utils.mjs'
import { siteConfig as config } from 'site/site.config.mjs'

/**
 * get pre-generated paths for each language for post slug pages
 * @param  {Object} posts  an object holding all the posts
 * @return {String[]}      paths for the most recent posts in all locales
 */
export const getPostSlugPaths = (posts) => {
  const paths = []

  for (const lang in posts) {
    paths.push(
      ...Object.keys(posts[lang])
        .slice(0, config.posts.preGenerate)
        .map((slug) => localePath(lang, slug))
    )
  }

  return paths
}

/**
 * get pre-generated paths for each language for post index pages
 * @param  {Object}  posts   an object keyed by locale of posts sorted by date published
 * @param  {String}  type    post type: blog, showcase, or newsletter
 * @return {String[]}        paths for the first two pages of posts in all locales
 */
export const getPostIndexPaths = (posts, type) => {
  const paths = []
  for (const language in posts) {
    paths.push(localePath(language, `${type}/page/1`))
    paths.push(localePath(language, `${type}/page/2`))
  }

  return paths
}

/**
 * get static props for a post index page
 * @param  {Object} pagenr          the current page number in the pagination
 * @param  {Object} posts           on object keyed by slug holding the posts title
 * @return {Object} meta            on object keyed by slug holding the posts metadata
 * @return {Object[]} props.posts   the posts to link to on the page
 * @return {Number} props.current   the current page number
 * @return {Number} props.total     the total number of pages
 */
export const getPostIndexProps = (pagenr, posts, meta) => {
  const pageNum = parseInt(pagenr)
  const numLocPages = Math.ceil(Object.keys(posts).length / config.posts.perPage)
  if (pageNum > numLocPages) return false

  const pagePosts = Object.entries(posts)
    .slice(config.posts.perPage * (pageNum - 1), config.posts.perPage * pageNum)
    .map(([slug, post]) => ({
      s: slug,
      ...post,
      ...meta[slug],
    }))

  return { posts: pagePosts, current: pageNum, total: numLocPages }
}
