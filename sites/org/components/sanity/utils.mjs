import { createClient } from 'next-sanity'
import { siteConfig } from 'site/site.config.mjs'

let sanityClient
const cache = {}
export const sanityLoader = async ({ query, language, type, slug, order, filters = '' }) => {
  sanityClient =
    sanityClient ||
    createClient({
      projectId: 'hl5bw8cj',
      dataset: 'site-content',
      apiVersion: '2023-06-17',
      // token: process.env.SANITY_TOKEN,
      useCdn: false,
    })

  if (!query) {
    query = `*[_type == "${type}${language}"`
    if (slug) query += ` && slug.current == "${slug}"`
    query += ']'
  }

  if (order) {
    query += ` | order(${order})`
  }

  query += filters

  if (cache[query]) return cache[query]

  const result = await sanityClient.fetch(query)
  cache[query] = result
  return result
}

export const sanityImage = (image, dataset = 'site-content') => {
  const [, assetName, origSize, format] = image.asset._ref.split('-')
  return `https://cdn.sanity.io/images/${siteConfig.sanity.project}/${dataset}/${assetName}-${origSize}.${format}`
}

export const sanitySiteImage = (image) => sanityImage(image, 'site-content')
export const sanityUserImage = (image) => sanityImage(image, 'user-content')

export const numPerPage = 12
