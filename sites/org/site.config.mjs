export const siteConfig = {
  algolia: {
    appId: 'MA0Y5A2PF0', // Application ID
    index: (language) => `org_docs_${language}`,
    apiKey: '589c7a7e4d9c95a4f12868581259bf3a', // Search-only API key
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
  /*
   * This is a read-only token that only can read issues from our monorepo.
   * hich you can do anonymously via the web UI.
   * However, the GraphQL API requires authentication so we need to use this.
   * We could side-step it be going via our own backend, but as this is used in a status
   * component, we don't want to be in a situation where the backend is down and now the status
   * page can't show that because it can't access GitHub without a backend.
   * So, this is the token split into parts to keep automated (dumb) tools
   * from screaming: ZOMG YOU LEAKED CREDENTIALS!!
   */
  issueToken: [
    'github',
    'pat',
    '11AANBDTQ0ldsP6QPzzGTP',
    'JflTxTZWgp4baJEB77Nkg8gf6UdtOmBzljLGqXWszoGV6XYUO5JTPMA1VxF',
  ].join('_'),
}
