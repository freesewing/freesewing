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
    token: '77cf8abfabef66e1275cd4ddfe0c857d45db5e51e8349877dc50a7a740d28fb573e8a4543eca616b', // Translation status (Read-only)
  },
  sanity: {
    project: process.env.SANITY_PROJECT || 'hl5bw8cj',
    dataset: 'site-content',
    apiVersion: '2023-06-17',
  },
  languages: ['en', 'es', 'de', 'fr', 'nl'],
  languagesWip: ['uk'],
  site: 'FreeSewing.org',
}
