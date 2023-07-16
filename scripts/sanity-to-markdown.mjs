import { createClient } from '@sanity/client'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'path'
import axios from 'axios'

const languages = ['en', 'fr', 'es', 'de', 'nl']
const sanity = {
  projectId: 'hl5bw8cj',
  dataset: 'site-content',
  apiVersion: '2023-06-17',
}

/*
 * content structure:
 * blog:
 *   - title
 *   - slug
 *   - data
 *   - image
 *   - caption
 *   - intro
 *   - body
 *   - author
 * showcase:
 *   - title
 *   - slug
 *   - date
 *   - imtro
 *   - body
 *   - image
 *   - caption
 *   - maker
 */

/*
 * Query to load makers and designs from Strapi
 */
const loadMakersAndDesigns = async () => {
  const result = await axios.get(
    'https://posts.freesewing.org/showcaseposts?_locale=en&_sort=date:ASC&_limit=500'
  )
  const makers = {}
  const designs = {}
  for (const post of result.data) {
    makers[post.slug] =
      post.maker?.displayname && post.maker.displayname !== 'A FreeSewing Maker'
        ? post.maker.displayname
        : 'unknown'
    designs[post.slug] = []
    if (post.design1) designs[post.slug].push(post.design1)
    if (post.design2) designs[post.slug].push(post.design2)
    if (post.design3) designs[post.slug].push(post.design3)
  }

  return { designs, makers }
}

/*
 * Query to load all content
 */
const query = `{
  "showcase": {
  	${languages.map((l) => `"${l}": *[_type == 'showcase${l}'] `).join(', ')}
  },
  "blog": {
  	${languages.map((l) => `"${l}": *[_type == 'blog${l}'] `).join(', ')}
  },
  "newsletter": *[_type == 'newsletter'],
  "img": *[_type == 'contentimg'] {"id": _id, "url": image.asset->url}
}`

/** Loads all sanity content */
const loadSanityPosts = () => {
  const sanityClient = createClient(sanity)
  return sanityClient.fetch(query)
}

/*
 * Port a sanity blog post to markdown
 */
const sanityBlogPostToMd = (post, img) => `---
author: ${JSON.stringify(post.author)}
caption: ${JSON.stringify(post.caption)}
date: ${JSON.stringify(post.date)}
image: ${JSON.stringify(img)}
intro: ${JSON.stringify(post.intro)}
title: ${JSON.stringify(post.title)}
---

${post.body}
`

/*
 * Helper method to create all blog posts
 */
const createBlogPosts = async (posts, images) => {
  const promises = []
  const root = ['markdown', 'org', 'blog']
  // First create the folders
  for (const post of posts.en)
    promises.push(mkdir(path.resolve(path.join(...root, post.slug.current)), { recursive: true }))

  // Ensure folders exists before we go on
  await Promise.all(promises)

  // Now create the content
  for (const lang of languages) {
    for (const post of posts[lang]) {
      // fix the author
      post.author = 'joostdecock'

      //console.log(sanityBlogPostToMd(post, images.blog[post.slug.current]))
      promises.push(
        writeFile(
          path.resolve(path.join(...root, post.slug.current, `${lang}.md`)),
          sanityBlogPostToMd(post, images.blog[post.slug.current])
        )
      )
    }
  }

  return await Promise.all(promises)
}

/*
 * Port a sanity showcase post to markdown
 */
const sanityShowcasePostToMd = (post, img, maker, designs) => {
  //if (designs.length  > 1) console.log(designs)

  return `---
maker: ${JSON.stringify(maker)}
caption: ${JSON.stringify(post.caption)}
date: ${JSON.stringify(post.date)}
image: ${JSON.stringify(img)}
intro: ${JSON.stringify(post.intro)}
title: ${JSON.stringify(post.title)}
designs: ${JSON.stringify(designs)}
---

${post.body}
`
}

/*
 * Helper method to create all showcase posts
 */
const createShowcasePosts = async (posts, images, makers, designs) => {
  const promises = []
  const root = ['markdown', 'org', 'showcase']
  // First create the folders
  for (const post of posts.en)
    promises.push(mkdir(path.resolve(path.join(...root, post.slug.current)), { recursive: true }))

  // Ensure folders exists before we go on
  await Promise.all(promises)

  // Now create the content
  for (const lang of languages) {
    for (const post of posts[lang]) {
      //console.log(sanityShowcasePostToMd(post, images.showcase[post.slug.current], makers[post.slug.current]))
      promises.push(
        writeFile(
          path.resolve(path.join(...root, post.slug.current, `${lang}.md`)),
          sanityShowcasePostToMd(
            post,
            images.showcase[post.slug.current],
            makers[post.slug.current],
            designs[post.slug.current]
          )
        )
      )
    }
  }

  return await Promise.all(promises)
}

/*
 * Port a sanity newsletter post to markdown
 */
const sanityNewsletterPostToMd = (post) => {
  // Need to add a date
  let date = post.slug.current.slice(0, 4)

  const quarter = post.slug.current.slice(5, 6)
  if (quarter === '1') date += '-01-01'
  else if (quarter === '2') date += '-04-01'
  else if (quarter === '3') date += '-07-01'
  else if (quarter === '4') date += '-10-01'

  return `---
date: ${JSON.stringify(date)}
edition: ${JSON.stringify(post.slug.current)}
intro: ${JSON.stringify(post.intro)}
title: ${JSON.stringify(post.title)}
---

${post.body}
`
}

/*
 * Helper method to create all newsletter posts
 */
const createNewsletterPosts = async (posts) => {
  const promises = []
  const root = ['markdown', 'org', 'newsletter']
  // First create the folders
  for (const post of posts)
    promises.push(mkdir(path.resolve(path.join(...root, post.slug.current)), { recursive: true }))

  // Ensure folders exists before we go on
  await Promise.all(promises)

  // Now create the content
  for (const post of posts) {
    //console.log(sanityNewsletterPostToMd(post))
    promises.push(
      writeFile(
        path.resolve(path.join(...root, post.slug.current, 'en.md')),
        sanityNewsletterPostToMd(post)
      )
    )
  }

  return await Promise.all(promises)
}

const sanityToMarkdown = async () => {
  console.log('Migrating content to local markdown')
  console.log(' - Loading content from sanity')
  const content = await loadSanityPosts()
  // Construct lookup table for images
  const images = { blog: {}, showcase: {} }
  for (const img of content.img) {
    const [type, slug] = img.id.split('--')
    images[type][slug] = img.url
  }

  //console.log(images)
  //console.log(query)
  //console.log(content.img)

  // Migrate blog posts
  console.log(' - Migrating blog posts')
  await createBlogPosts(content.blog, images)

  // We failed to migrate maker & designs info, so let's load that from Strapi
  console.log(' - Loading makers and designs from strapi (missing in Sanity)')
  const { makers, designs } = await loadMakersAndDesigns()

  // Migrate showcase posts
  console.log(' - Migrating showcase posts')
  await createShowcasePosts(content.showcase, images, makers, designs)

  // Migrate newsletter posts
  console.log(' - Migrating newsletter posts')
  await createNewsletterPosts(content.newsletter)
}

sanityToMarkdown()
