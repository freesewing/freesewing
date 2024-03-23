import fs from 'node:fs'
import path from 'node:path'

/*
 * Jaron is part of the 'docs' prebuild step
 * But in the lab, there are no docs, so we build an empty jargon file
 * because it is included in some components so it needs to be there.
 */
export const prebuildJargon = async (store) => {
  fs.writeFileSync(
    path.resolve('..', store.site, 'prebuild', `jargon.mjs`),
    `export const site = "${store.site}"
export const jargon = { en: { } }`
  )
}
