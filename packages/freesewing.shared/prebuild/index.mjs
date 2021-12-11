import { prebuildMdx } from './mdx.mjs'

const SITE = process.env.SITE
const LANG = process.env.LANG

const run = async () => {
  await prebuildMdx(SITE, LANG)
}

run()
