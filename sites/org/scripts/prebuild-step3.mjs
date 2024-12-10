import fs from 'fs'
import { glob } from 'glob'
import matter from 'gray-matter'

const loadTagsAndAuthors = async () => {
  const lists = {
    blog: await glob('./blog/*/index.mdx'),
    newsletter: await glob('./newsletter/*/index.mdx'),
    showcase: await glob('./showcase/*/index.mdx'),
  }

  const tags = []
  const authors = []
  for (const type of Object.keys(lists)) {
    for (const file of lists[type]) {
      const content = await fs.readFileSync(file, 'utf-8')
      const data = matter(content)
      if (data.data.tags) {
        if (Array.isArray(data.data.tags)) tags.push(...data.data.tags)
        else tags.push(data.data.tags)
      } else if (type === 'showcase')
        console.log('Missing design tag in showcase post:', { file, data: data.data })
      if (data.data.authors) {
        if (Array.isArray(data.data.authors)) authors.push(...data.data.authors)
        else authors.push(data.data.authors)
      } else if (type === 'showcase') console.warn('Missing authors in showcase post:', file)
      else if (type === 'blog') console.warn('Missing authors in blog post:', file)
      else if (type === 'newsletter') console.warn('Missing authors in newsletter edition:', file)
    }
  }

  return {
    authors: [...new Set(authors.sort())], // Make them unique
    tags: [...new Set(tags.sort())], // Make them unique
  }
}

const titles = {
  admin: 'FreeSewing Maintainer',
  user: 'FreeSewing User',
}

const userAsAuthor = (user) => ({
  name: user.profile.username,
  title: titles[user.profile.role],
  url: `https://freesewing.org/users/user?id=${user.profile.id}`,
  image_url: `https://imagedelivery.net/ouSuR9yY1bHt-fuAokSA5Q/uid-${user.profile.ihash}/public`,
  bio: user.profile.bio,
})

const loadUser = async (id) => {
  let result
  try {
    result = await fetch(`https://backend3.freesewing.org/users/${id}`)
  } catch (err) {
    console.warn(`Failed to load user with id ${id}`, err)
  }

  if (result) return await result.json()
}

async function prebuild() {
  const all = {}
  const { authors, tags } = await loadTagsAndAuthors()
  for (const author of authors) {
    const user = await loadUser(author)
    if (user.profile.id) all[user.profile.id] = userAsAuthor(user)
  }
  fs.writeFileSync(`./authors.json`, JSON.stringify(all, null, 2))
  fs.writeFileSync(
    `./showcase-tags.mjs`,
    `export const tags = ${JSON.stringify([...new Set(tags.sort())])}`
  )
}

prebuild()
