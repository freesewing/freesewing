import path from 'path'
import fs from 'fs'
import axios from 'axios'
import { languages, strapiHost } from '../config/freesewing.mjs'
import { unified } from 'unified'
import remarkParser from 'remark-parse'
import remarkCompiler from 'remark-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkFrontmatterExtractor from 'remark-extract-frontmatter'
import yaml from 'yaml'
import { remarkIntroPlugin } from './remark-intro-plugin.mjs'


/*
 * Helper method to extract the intro from a Strapi post
 *
 * Parameters:
 *
 *  - body: the post's body (markdown content)
 */
const postIntro = async markdown => await unified()
  .use(remarkIntroPlugin)
  .use(remarkParser)
  .use(remarkCompiler)
  .use(remarkFrontmatter)
  .use(remarkFrontmatterExtractor, { yaml: yaml.parse })
  .process(markdown)

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
  for (const post of res.data) {
    const intro = await postIntro(post.body)
    posts[`${type}/${post.slug}`] = { ...post, intro: intro.data.intro }
  }

  return posts
}



/*
 * Main method that does what needs doing
 */
export const prebuildStrapi = async(site) => {

  // Say hi
  console.log()
  console.log(`Prebuilding Strapi content for freesewing.${site}`)

  // What types of content to load
  const types = ['blog']
  if (site === 'org') types.push('showcase')

  const posts = {}
  const authors = {}
  for (const type of types) {
    authors[type] = {}
    // Loop over languages
    for (const lang of (site === 'dev' ? ['en'] : languages)) {
      posts[lang] = {}
      console.log(`  - Language: ${lang}`)
      posts[lang][type] = await getPosts(type, site, lang)
      // Extract list of authors
      for (const [slug, post] of Object.entries(posts[lang][type])) {
        authors[type][post.author.slug] = post.author
        posts[lang][type][slug].author = post.author.slug
      }
      fs.writeFileSync(
        path.resolve('..', `freesewing.${site}`, 'prebuild', `strapi.${type}.${lang}.js`),
        `export const posts = ${JSON.stringify(posts[lang][type], null, 2)}`
      )
      fs.writeFileSync(
        path.resolve('..', `freesewing.${site}`, 'prebuild', `strapi.${type}.authors.js`),
        `export const authors = ${JSON.stringify(authors[type], null, 2)}`
      )
    }
  }

  return [posts, authors]
}

