import { jwt, key, fields, parameters } from './lib.mjs'

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
  errors: {
    accountStatusLacking:
      'The account is in a status that does not allow this action (eg: it is not active or disabled).',
    insufficientAccessLevel:
      'The credentials used to make this API call are insufficient for this operation.',
  },
  response: {
    status: {
      401: {
        description:
          '**Unauthorized - Authentication failed**\n\n' +
          'Status code `401` indicates that the request could not be authenticated.' +
          'This typically means that authentication failed.<br>\n' +
          '**Note:** _There is no response body for a `401` status code_.',
      },
      403: {
        description:
          '**Forbidden - Permissions problem**\n\n' +
          'Status code `403` indicates that the request was forbidden.<br>' +
          'The return body will have an `error` field which can hold:\n\n',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                result: fields.result,
                error: {
                  ...fields.error,
                  example: 'accountStatusLacking',
                },
              },
            },
          },
        },
      },
      404: {
        description:
          '**Resource not found - The API key could not be found**\n\n' +
          'Status code `404` indicates that the resource could not be found.<br>' +
          'The return body will have an `error` field which can hold:\n\n' +
          '- `apikeyNotFound` : The API key could not be found, probably ' +
          'because it does not or no longer exists' +
          '',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                result: fields.result,
                error: {
                  ...fields.error,
                  example: 'apikeyNotFound',
                },
              },
            },
          },
        },
      },
      500: {
        description:
          '**Server error - API call failed**\n\n' +
          'Status code `500` indicates that the request could not be handled ' +
          'due to an unforseen error.',
      },
    },
    body: {
      withSecret: {
        description: 'Object holding the data of the created API key',
        type: 'object',
        properties: {
          expiresAt: {
            description: 'UTC Timestamp in ISO 8601 format.',
            type: 'string',
            example: '2022-12-18T18:14:30.460Z',
          },
          key: {
            description: 'The _key_ part of the API key serves as the username',
            type: 'string',
            example: 'c00475bd-3002-4baa-80ad-0145cd6a646c',
          },
          level: fields.level,
          name: fields.name,
          secret: {
            description: `
              The _secret_ part of the API key serves as the password.
              It is only revealed in the response of the API key creation.`,
            type: 'string',
            example: '56b74b5dc2da7a4f37b3c9a6172e840cf4912dc37cbc55c87485f2e0abf59245',
          },
          userId: {
            description: `The unique ID of the user who owns this resource.`,
            type: 'number',
            example: 4,
          },
        },
      },
    },
  },
}
local.response.body.regular = {
  ...local.response.body.withSecret,
  properties: { ...local.response.body.withSecret.properties },
}
delete local.response.body.regular.properties.secret

const errorExamples = (errs) =>
  errs.map((err) => `\n  - \`${err}\` : ${local.errors[err]}`).join(' ')

// Schemas
export const schemas = { apikey: local.response.body.withSecret }

// Paths
export const paths = {}

// Create API key
paths['/apikeys/{auth}'] = {
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
              name: fields.name,
            },
          },
        },
      },
    },
    responses: {
      201: {
        description:
          '**Success - API key created**\n\n' +
          'Status code `201` indicates that the resource was created successfully.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                result: fields.result,
                apikey: local.response.body.withSecret,
              },
            },
          },
        },
      },
      400: {
        description:
          '**Client error - Invalid request**\n\n' +
          'Status code `400` indicates that the request was invalid.<br>' +
          'The return body will have an `error` field which can hold:\n\n' +
          '- `postBodyMissing` : The POST request did not have a body\n' +
          '- `nameMissing` : The `name` field was missing from the request body\n' +
          '- `levelMissing` : The `level` field was missing from the request body\n' +
          '- `expiresInMissing` : The `expiresIn` field was missing from the request body\n' +
          '- `levelNotNumeric` : The `level` field in the request body was a number\n' +
          '- `invalidLevel` : The `level` field in the request body was not a valid permission level\n' +
          '- `expiresInNotNumeric` : The `expiresIn` field in the request body was not a number\n' +
          '- `expiresIsHigherThanMaximum` : The `expiresIn` field in the request body is higher than allowed by the `apikeys.maxExpirySeconds` configuration.' +
          '- `keyLevelExceedsRoleLevel` : The `level` field in the request body is higher than the `level` of the user creating the key. Which is not allowed.' +
          '',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                result: fields.result,
                error: {
                  ...fields.error,
                  example: 'levelMissing',
                },
              },
            },
          },
        },
      },
      500: {
        description:
          '**Server error - API call failed**\n\n' +
          'Status code `500` indicates that the request could not be handled due to an unforseen error.<br>' +
          'The return body will have an `error` field which can hold:\n\n' +
          '- `createApikeyFailed` : The API key could not be created\n' +
          '',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                result: fields.result,
                error: {
                  ...fields.error,
                  example: 'createApikeyFailed',
                },
              },
            },
          },
        },
      },
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
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                result: {
                  ...fields.result,
                  example: 'success',
                },
                apikey: local.response.body.regular,
              },
            },
          },
        },
      },
      401: local.response.status['401'],
      403: {
        ...local.response.status['403'],
        description:
          local.response.status['403'].description +
          errorExamples(['accountStatusLacking', 'insufficientAccessLevel']),
      },
      404: local.response.status['404'],
      500: local.response.status['500'],
    },
  },
  // Remove API key
  delete: {
    ...common,
    summary: 'Remove an API key',
    description: 'Removes the API key `key`.',
    parameters: [parameters.auth, local.params.key],
    responses: {
      204: {
        description:
          '**Success - API key removed**\n\n' +
          'Status code `204` indicates that the resource was removed successfully.' +
          '<br>**Note:** _There is no response body for a `204` status code_.',
      },
      401: local.response.status['401'],
      403: {
        ...local.response.status['403'],
        description:
          local.response.status['403'].description +
          errorExamples(['accountStatusLacking', 'insufficientAccessLevel']),
      },
      404: local.response.status['404'],
      500: local.response.status['500'],
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
      200: {
        description:
          '**Success - API key returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                result: {
                  ...fields.result,
                  example: 'success',
                },
                apikey: local.response.body.regular,
              },
            },
          },
        },
      },
      401: local.response.status['401'],
      403: {
        ...local.response.status['403'],
        description:
          local.response.status['403'].description +
          errorExamples(['accountStatusLacking', 'insufficientAccessLevel']),
      },
      500: local.response.status['500'],
    },
  },
}
