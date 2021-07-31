const axios = require('axios')

const config = {
  host: 'https://posts.freesewing.org',
  languages: ['en','de','es','fr','nl'],
}

const buildUrl = (type, site, lang) => (type === 'blog')
  ?  `${config.host}/blogposts?_locale=${lang}&_sort=date:ASC&dev_${site === 'dev' ? 'eq' : 'ne'}=true`
  :  `${config.host}/showcaseposts?_locale=${lang}&_sort=date:ASC`

module.exports = {
  languages: config.languages,
  getPosts: async (type, site, lang) => {
    let res
    try {
      res = await axios.get(buildUrl(type, site, lang))
    }
    catch (err) {
      console.log(err)
    }
    const posts = {}
    const paths = []
    for (const post of res.data) {
      posts[post.slug] = post
      paths.push(`/${type}/${post.slug}`)
    }

    return [paths, posts]
  }
}

