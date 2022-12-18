import pkg from '../package.json' assert { type: 'json' }
import { apikeys } from './apikeys.mjs'

const description = `
## What am I looking at?  🤔
This is reference documentation of the FreeSewing backend API.
It is auto-generated from this API's OpenAPI v3 specification.

For more documentation and info about this backend, please
visit [freesewing.dev/reference/backend](https://freesewing.dev/reference/backend).

To learn more about FreeSewing in general, visit [FreeSewing.org](https://freesewing.org/).
`

export const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'FreeSewing backend API',
    version: pkg.version,
    description,
    contact: {
      name: 'Joost De Cock',
      email: 'joost@joost.at',
    },
    externalDocs: {
      description: 'Backend documentation on FreeSewing.dev',
      url: 'https://freesewing.dev/reference/backend/',
    },
  },
  components: {
    securitySchemes: {
      jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      key: {
        type: 'http',
        scheme: 'basic',
      },
    },
    schemas: {},
  },
  paths: {
    ...apikeys,
  },
}
