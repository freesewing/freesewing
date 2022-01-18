import { prebuildMdx } from './mdx.mjs'
import { prebuildStrapi } from './strapi.mjs'
import { prebuildNavigation } from './navigation.mjs'
import { prebuildContributors } from './contributors.mjs'
import { prebuildPatrons } from './patrons.mjs'

const SITE = process.env.SITE

const run = async () => {
  const mdxPages = await prebuildMdx(SITE)
  const [posts, authors] = await prebuildStrapi(SITE)
  await prebuildNavigation(mdxPages, posts, SITE)
  await prebuildContributors(SITE)
  await prebuildPatrons(SITE)
  console.log()
}

run()
