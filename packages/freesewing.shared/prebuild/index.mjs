import { prebuildMdx } from './mdx.mjs'
import { prebuildStrapi } from './strapi.mjs'
import { prebuildNavigation } from './navigation.mjs'
import { prebuildContributors } from './contributors.mjs'
import { prebuildPatrons } from './patrons.mjs'

const SITE = process.env.SITE

const run = async () => {
  if (SITE !== 'lab') {
    const mdxPages = await prebuildMdx(SITE)
    const [posts, authors] = await prebuildStrapi(SITE)
    prebuildNavigation(mdxPages, posts, SITE)
  }
  await prebuildContributors(SITE)
  await prebuildPatrons(SITE)
  console.log()
}

run()
