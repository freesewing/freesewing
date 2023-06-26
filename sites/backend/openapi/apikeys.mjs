import { jwt, key, fields, parameters, response, errorExamples, jsonResponse } from './lib.mjs'

const common = {
  tags: ['API keys'],
  security: [jwt, key],
}

const local = {
  params: {
    key: {
      in: 'path',
      name: 'key',
      required: true,
      description: "The API key's UUID (the part you use as username)",
      schema: {
        example: 'c00475bd-3002-4baa-80ad-0145cd6a646c',
        type: 'string',
      },
    },
  },
  response: {
    body: {
      regular: {
        ...response.body.apikey,
        properties: { ...response.body.apikey.properties },
      },
    },
  },
}
delete local.response.body.regular.properties.secret

// Paths
export const paths = {}

// Create API key
paths['/apikeys/{auth}'] = {
  get: {
    ...common,
    summary: 'Retrieves list of API keys',
    description: 'Returns a list of API keys for the user making the API request',
    parameters: [parameters.auth],
    responses: {
      200: {
        description:
          '**Success - List of API keys returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
          apikeys: {
            type: 'array',
            items: local.response.body.regular,
          },
        }),
      },
      401: response.status['401'],
      403: {
        ...response.status['403'],
        description:
          response.status['403'].description +
          errorExamples(['accountStatusLacking', 'insufficientAccessLevel']),
      },
      500: response.status['500'],
    },
  },
  post: {
    ...common,
    summary: 'Create a new API key',
    description:
      'Creates a new API key and returns it. ' +
      'requires a `name`, `level`, and `expiresIn` field in the POST body.',
    parameters: [parameters.auth],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              expiresIn: {
                description: `
mber of seconds the API key will remain valid before expiring.
n never be higher than the \`apikeys.maxExpirySeconds\` configuration setting.`,
                type: 'number',
                example: 3600,
              },
              level: fields.level,
              name: {
                description: `
Th            e name of the API key exists solely to help you differentiate between your API keys.`,
                type: 'string',
                example: 'My first API key',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        ...response.status['201'],
        ...jsonResponse({
          result: fields.result,
          apikey: response.body.apikey,
        }),
      },
      400: {
        ...response.status['400'],
        description:
          response.status['400'].description +
          errorExamples([
            'postBodyMissing',
            'nameMissing',
            'levelMissing',
            'expiresInMissing',
            'levelNotNumeric',
            'invalidLevel',
            'expiresInNotNumeric',
            'expiresInHigherThanMaximum',
            'keyLevelExceedsRoleLevel',
          ]),
      },
      500: response.status['500'],
    },
  },
}

// Get/Remove API key
paths['/apikeys/{key}/{auth}'] = {
  // Get API key
  get: {
    ...common,
    summary: 'Retrieve an API key',
    description: 'Retrieves information about the API key `key`.',
    parameters: [parameters.auth, local.params.key],
    responses: {
      200: {
        description:
          '**Success - API key returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
          apikey: local.response.body.regular,
        }),
      },
      401: response.status['401'],
      403: {
        ...response.status['403'],
        description:
          response.status['403'].description +
          errorExamples(['accountStatusLacking', 'insufficientAccessLevel']),
      },
      404: response.status['404'],
      500: response.status['500'],
    },
  },
  // Remove API key
  delete: {
    ...common,
    summary: 'Remove an API key',
    description: 'Removes the API key `key`.',
    parameters: [parameters.auth, local.params.key],
    responses: {
      204: response.status['204'],
      401: response.status['401'],
      403: {
        ...response.status['403'],
        description:
          response.status['403'].description +
          errorExamples(['accountStatusLacking', 'insufficientAccessLevel']),
      },
      404: response.status['404'],
      500: response.status['500'],
    },
  },
}

// Get current API key
paths['/whoami/key'] = {
  get: {
    tags: ['Whoami', ...common.tags],
    security: [key],
    summary: 'Retrieve the API key used in the request',
    description:
      'Retrieves information about the API key that ' +
      'was used to authenticate the request.\n\n' +
      '**Note:** _See `GET /whoami/jwt` for the JWT equivalent._',
    responses: {
      200: paths['/apikeys/{key}/{auth}'].get.responses['200'],
      401: response.status['401'],
      403: paths['/apikeys/{key}/{auth}'].get.responses['403'],
      500: response.status['500'],
    },
  },
}
