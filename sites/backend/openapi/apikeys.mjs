const tags = ['API Keys']
const jwt = [{ jwt: [] }]
const key = [{ key: [] }]

const fields = {
  level: {
    description: `
One of the [API permission
levels](https://freesewing.dev/reference/backend/api/rbac#permission-levels) which
is an integer between (and including) \`0\` and \`8\`.`,
    type: 'number',
    example: 5,
  },
  name: {
    description: `
The name of the API key exists solely to help you differentiate between your API keys.`,
    type: 'string',
    example: 'My first API key',
  },
}

export const apikeys = {}

// Create API key - JWT
apikeys['/apikeys/{auth}'] = {
  post: {
    tags,
    security: jwt,
    summary: 'Create a new API key',
    description: `
eates a new API key and returns it.
quires a \`name\`, \`level\`, and \`expiresIn\` field in the POST body.`,
    parameters: [
      {
        in: 'path',
        name: 'auth',
        required: true,
        schema: {
          type: 'string',
          enum: ['jwt', 'key'],
        },
        description:
          'One of `jwt` or `key` depending on whether you want to authentication with a JSON Web Token (`jwt`) or an API key (`key`)',
      },
    ],
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
                result: {
                  description: 'Textual description of the result of the API call',
                  type: 'string',
                  example: 'created',
                },
                apikey: {
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
                result: {
                  description: 'Textual description of the result of the API call',
                  type: 'string',
                  example: 'error',
                },
                error: {
                  description: 'Textual description of the error that caused this API call to fail',
                  type: 'string',
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
                result: {
                  description: 'Textual description of the result of the API call',
                  type: 'string',
                  example: 'error',
                },
                error: {
                  description: 'Textual description of the error that caused this API call to fail',
                  type: 'string',
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

/*

  // Read Apikey
  app.get('/apikeys/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Apikeys.read(req, res, tools)
  )
  app.get('/apikeys/:id/key', passport.authenticate(...bsc), (req, res) =>
    Apikeys.read(req, res, tools)
  )

  // Read current Apikey
  app.get('/whoami/key', passport.authenticate(...bsc), (req, res) =>
    Apikeys.whoami(req, res, tools)
  )

  // Remove Apikey
  app.delete('/apikeys/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Apikeys.delete(req, res, tools)
  )
  app.delete('/apikeys/:id/key', passport.authenticate(...bsc), (req, res) =>
    Apikeys.delete(req, res, tools)
  )
*/
