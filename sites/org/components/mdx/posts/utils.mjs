import { localePath } from 'shared/utils.mjs'
import { siteConfig as config } from 'site/site.config.mjs'

/**
 * get pre-generated paths for post slug pages
 * @param  {Object} posts  an object holding all the posts
 * @return {String[]}      paths for the most recent posts in all locales
 */
export const getPostSlugPaths = (posts) =>
  Object.keys(posts)
    .slice(0, config.posts.preGenerate)
    .map((slug) => `/${slug}`)

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
