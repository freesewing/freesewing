import axios from 'axios'

const strapi = 'https://posts.freesewing.org'
const url = (type, site, lang) =>
  `${strapi}/${type}posts?site.site_eq=${lang ? lang+'.' : ''}freesewing.${site}`

const getPosts = uri => axios.get(uri)

export const getStrapiPaths = async (type='blog', site='dev', lang=false) => {
  console.log({type, site, lang})
  console.log(url(type, site, lang))
  const posts = await getPosts(url(type, site, lang))

  return  Object.values(posts.data).map(post => `/${type}/${post.slug}`)
}

export const getStrapiStaticProps = async (type='blogposts', site='dev', lang=false) => {
  console.log({type, site, lang})
  console.log(url(type, site, lang))
  const posts = await getPosts(url(type, site, lang))
  const props = { posts: {} }
  for (const post of posts.data) props.posts[post.slug] = post

  return props
}

