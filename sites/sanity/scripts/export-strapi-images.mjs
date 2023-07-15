import fs from 'fs'
import axios from 'axios'

const strapiHost = 'https://posts.freesewing.org'

/*
 * Helper method to create the API url for retrieval of Strapi posts
 */
const buildUrl = (type, site, lang) => {
  if (type === 'blog')
    return `${strapiHost}/blogposts?_locale=${lang}&_sort=date:ASC&dev_${
      site === 'dev' ? 'eq' : 'ne'
    }=true`
  if (type === 'showcase')
    return `${strapiHost}/showcaseposts?_locale=${lang}&_sort=date:ASC&_limit=500`
  if (type === 'newsletter') return `${strapiHost}/newsletters?_sort=date:ASC&_limit=500`
}

/*
 * Helper method to load posts from Strapi
 * Exported because it's re-used by the Algolia indexing script
 */
export const getPosts = async (type) => {
  let res
  try {
    res = await axios.get(buildUrl(type, 'org', 'en'))
  } catch (err) {
    console.log(`⚠️  Failed to load ${type} posts`)
  }
  const posts = {}
  for (const post of res?.data || []) {
    posts[post.slug] = post
  }

  return posts
}

/*
 * Transforms an image from strapi to sanity
 */
const transformImage = async (p, type) => {
  const id = `${type}--${p.slug}`
  const post = {
    _id: id,
    _type: `contentimg`,
    title: id,
    image: {
      _type: 'image',
      _sanityAsset: `image@https://posts.freesewing.org${p.image.url}`,
    },
  }

  return post
}

/*
 * Exports blog posts for a given language
 */
const exportBlogPostImages = async () => {
  const images = []
  const strapiPosts = await getPosts('blog')
  for (const post of Object.values(strapiPosts)) {
    images.push(await transformImage(post, 'blog'))
  }

  return images
}

/*
 * Exports showcase posts for a given language
 */
const exportShowcasePostImages = async (lang) => {
  const images = []
  const strapiPosts = await getPosts('showcase')
  for (const post of Object.values(strapiPosts)) {
    images.push(await transformImage(post, 'showcase'))
  }

  return images
}

/*
 * Main method that does what needs doing
 */
const exportStrapi = async () => {
  // Say hi
  console.log()
  console.log(`Exporting images from Strapi`)

  console.log('  - Blog images')
  const blog = await exportBlogPostImages()
  console.log('  - Showcase images')
  const showcase = await exportShowcasePostImages()
  const all = [...blog, ...showcase]
  fs.writeFileSync(`./export/contentimg.ndjson`, all.map((img) => JSON.stringify(img)).join('\n'))
}

exportStrapi()
