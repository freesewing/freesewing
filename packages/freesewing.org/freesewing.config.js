const designs = require('@freesewing/pattern-info').list
const strapi = require('../freesewing.shared/config/strapi')
const path = require('path')

module.exports = {
  site: 'org',
  language: 'en',
  languages: ['en', 'de', 'es', 'fr', 'nl'],
  home: 'Home',
  designs,
  monorepo: path.resolve('../../'),
  search: {
    id: 'MA0Y5A2PF0',
    key: '589c7a7e4d9c95a4f12868581259bf3a',
    index: 'en_freesewing_org',
  },
  strapi,
}

