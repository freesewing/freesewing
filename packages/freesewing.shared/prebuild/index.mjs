import { prebuildMdx } from './mdx.mjs'
import { prebuildStrapi } from './strapi.mjs'

const SITE = process.env.SITE
const LANG = process.env.LANG

const run = async () => {
  await prebuildMdx(SITE, LANG)
  await prebuildStrapi(SITE, LANG)
}

run()
