import axios from 'axios'

const strapi = 'https://posts.freesewing.org'
const url = (type, site, lang) =>
  `${strapi}/${type}posts?site.site_eq=${(lang && site !== 'dev') ? lang+'.' : ''}freesewing.${site}&_sort=date:ASC`

const getPosts = uri => axios.get(uri)

export const getStrapiPaths = async (type='blog', site='dev', lang=false) => {
  const posts = await getPosts(url(type, site, lang))

  return  Object.values(posts.data).map(post => `/${type}/${post.slug}`)
}

export const getStrapiStaticProps = async (type='blog', site='dev', lang=false) => {
  const posts = await getPosts(url(type, site, lang))
  const props = { posts: {} }
  for (const post of posts.data) {
    props.posts[post.slug] = {
      ...post,
      date: `${post.date}` // converts date object to string
    }
  }

  return props
}

