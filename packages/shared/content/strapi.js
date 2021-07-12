import axios from 'axios'

// FIXME: For now this is hardcoded
const url = 'https://posts.freesewing.org/blogposts?site.site_eq=freesewing.dev'

const getPosts = uri => axios.get(uri)

export const getStrapiPaths = async (site) => {
  const posts = await getPosts(url)

  return  Object.values(posts.data).map(post => `/blog/${post.slug}`)
}

export const getStrapiStaticProps = async (site) => {
  const posts = await getPosts(url)
  const props = { posts: {} }
  for (const post of posts.data) props.posts[post.slug] = post

  return props
}

