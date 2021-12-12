import path from 'path'
import fs from 'fs'
import axios from 'axios'
import { languages, strapiHost } from '../config/freesewing.mjs'
//import rdir from 'recursive-readdir'
//import { unified } from 'unified'
//import remarkParser from 'remark-parse'
//import remarkCompiler from 'remark-stringify'
//import remarkFrontmatter from 'remark-frontmatter'
//import remarkFrontmatterExtractor from 'remark-extract-frontmatter'
//import vfileReporter from 'vfile-reporter'
//import { readSync } from 'to-vfile'
//import yaml from 'yaml'
//import { remarkIntroPlugin } from './remark-intro-plugin.mjs'


/*
 * Helper method to create the API url for retrieval of Strapi posts
 */
const buildUrl = (type, site, lang) => (type === 'blog')
  ?  `${strapiHost}/blogposts?_locale=${lang}&_sort=date:ASC&dev_${site === 'dev' ? 'eq' : 'ne'}=true`
  :  `${strapiHost}/showcaseposts?_locale=${lang}&_sort=date:ASC`

/*
 * Helper method to load posts from Strapi
 */
const getPosts = async (type, site, lang) => {
  let res
  try {
    res = await axios.get(buildUrl(type, site, lang))
  }
  catch (err) {
    console.log(err)
  }
  const posts = {}
  for (const post of res.data) posts[`${type}/${post.slug}`] = post

  return posts
}


/*
 * Main method that does what needs doing
 */
export const prebuildStrapi = async(site, lang) => {

  // Say hi
  console.log()
  console.log('Prebuilding Strapi content for:')
  console.log(`  - Website: freesewing.${site}`)
  console.log(`  - Language: ${lang}`)
  console.log()

  // What types of content to load
  const types = ['blog']
  if (site === 'org') types.push('showcase')

  const all = {}
  for (const type of types) {
    // Loop over languages
    for (const lang of (site === 'dev' ? ['en'] : languages)) {
      all[type] = await getPosts(type, process.env.SITE, lang)
      fs.writeFileSync(
        path.resolve('..', `freesewing.${site}`, 'prebuild', `strapi.${type}.${lang}.js`),
        `export const posts = ${JSON.stringify(all[type], null, 2)}`
      )
    }
  }
}

