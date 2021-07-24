import strapi from '@/shared/lib/strapi'

export const getStrapiPaths = async (type, site, lang='en') => {
  const [paths, posts] = await strapi.getPosts(type, site, lang)

  return  paths
}

export const getStrapiStaticProps = async (type, site, lang='en') => {
  const [paths, posts] = await strapi.getPosts(type, site, lang)
  const props = { posts: {} }
  for (const [slug, post] of Object.entries(posts)) {
    props.posts[slug] = {
      ...post,
      date: `${post.date}` // converts date object to string
    }
  }

  return props
}

