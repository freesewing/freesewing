import axios from 'axios'

const strapi = 'https://posts.freesewing.org'
const url = (type, site, lang) =>
    `${strapi}/${type}posts?_locale=${lang}&_sort=date:ASC&dev_${site === 'dev' ? 'eq' : 'ne'}=true`

const getPosts = uri => axios.get(uri)

export const getStrapiPaths = async (type, site, lang='en') => {
  const posts = await getPosts(url(type, site, lang))

  return  Object.values(posts.data).map(post => `/${type}/${post.slug}`)
}

export const getStrapiStaticProps = async (type='blog', site='dev', lang='en') => {
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

