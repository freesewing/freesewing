import { localePath } from 'shared/utils.mjs'
import { siteConfig as config } from 'site/site.config.mjs'

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

export const getPostIndexPaths = (posts, type) => {
  const paths = []
  for (const language in posts) {
    paths.push(localePath(language, `${type}/page/1`))
    paths.push(localePath(language, `${type}/page/2`))
  }

  return paths
}

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
