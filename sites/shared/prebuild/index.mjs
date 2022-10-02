import { prebuildMdx } from './mdx.mjs'
import { prebuildStrapi } from './strapi.mjs'
import { prebuildNavigation } from './navigation.mjs'
import { prebuildContributors } from './contributors.mjs'
import { prebuildPatrons } from './patrons.mjs'
import { prebuildI18n } from './i18n.mjs'
import { prebuildLab } from './lab.mjs'

const SITE = process.env.SITE || 'lab'

const run = async () => {
  if (SITE === 'org') {
    const mdxPages = await prebuildMdx(SITE)
    const [posts] = await prebuildStrapi(SITE)
    prebuildNavigation(mdxPages, posts, SITE)
  } else if (SITE === 'dev') {
    const mdxPages = await prebuildMdx(SITE)
    prebuildNavigation(mdxPages, false, SITE)
  } else await prebuildLab()

  await prebuildI18n(SITE)
  await prebuildContributors(SITE)
  await prebuildPatrons(SITE)
  console.log()
}

run()
