const path = require('path')

module.exports = {
  site: 'dev',
  language: 'en',
  languages: ['en'],
  home: 'Home',
  monorepo: path.resolve('../../'),
  search: {
    id: 'MA0Y5A2PF0',
    key: '589c7a7e4d9c95a4f12868581259bf3a',
    index: 'en_freesewing_dev',
  },
  strapi: {
    host: 'https://posts.freesewing.org',
    sizes: [ 'thumbnail', 'small', 'medium', 'large' ],
    blogpost: ['caption', 'slug', 'date', 'title', 'linktitle', 'author', 'image']
  },
}

