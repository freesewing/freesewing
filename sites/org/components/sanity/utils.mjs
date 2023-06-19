import { createClient, groq } from 'next-sanity'

const sanityId = process.env.SANITY_PROJECT || 'hl5bw8cj'

let sanityClient
export const sanityLoader = ({ query, language, type, slug, order }) => {
  sanityClient =
    sanityClient ||
    createClient({
      projectId: 'hl5bw8cj',
      dataset: 'site-content',
      apiVersion: '2023-06-17',
      token: process.env.SANITY_TOKEN,
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

  return sanityClient.fetch(query)
}

export const sanityImage = (image, dataset = 'site-content') => {
  const [, assetName, origSize, format] = image.asset._ref.split('-')
  return `https://cdn.sanity.io/images/${sanityId}/${dataset}/${assetName}-${origSize}.${format}`
}
