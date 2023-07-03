import { createClient } from '@sanity/client'
import { siteConfig } from '../../org/site.config.mjs'

/** load all sanity posts in a format usable by the nav prebuild */
export const loadSanityPosts = (SITE) => {
  if (SITE !== 'org') return false

  const filter = `{title, "linktitle": coalesce(linktitle, title), "slug": slug.current, date}`
  const query = `{
    "showcase": {
    	${siteConfig.languages.map((l) => `"${l}": *[_type == 'showcase${l}'] ${filter}`).join(', ')}
    },
    "blog": {
    	${siteConfig.languages.map((l) => `"${l}": *[_type == 'blog${l}'] ${filter}`).join(', ')}
    }
  }`

  const sanityClient = createClient({
    projectId: siteConfig.sanity.project,
    dataset: siteConfig.sanity.dataset,
    apiVersion: siteConfig.sanity.apiVersion,
  })

  console.log('Fetching Sanity Posts for navigation data')
  return sanityClient.fetch(query)
}
