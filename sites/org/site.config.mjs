export const siteConfig = {
  algolia: {
    app: 'MA0Y5A2PF0', // Application ID
    index: 'canary_freesewing.dev',
    key: '589c7a7e4d9c95a4f12868581259bf3a', // Search-only API key
  },
  bugsnag: {
    key: '1b3a900d6ebbfd071975e39b534e1ff5',
  },
  crowdin: {
    projectId: 356411,
    token: '3b67456aba022cda2b41b2d0ac1bfa9a16d1a24ac7126d2ffc75f1c9a6fdbe809e5bb9bdce3ad7e2',
  },
  sanity: {
    project: process.env.SANITY_PROJECT || 'hl5bw8cj',
    dataset: 'site-content',
    apiVersion: '2023-06-17',
  },
  languages: ['en', 'es', 'de', 'fr', 'nl', 'uk'],
  languagesWip: [],
  site: 'FreeSewing.org',
  tld: 'org',
  posts: {
    preGenerate: 6,
    perPage: 12,
  },
}
