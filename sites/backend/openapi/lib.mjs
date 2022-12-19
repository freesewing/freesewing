export const jwt = [{ jwt: [] }]
export const key = [{ key: [] }]

export const fields = {
  expiresIn: {
    description: `
nds the API key will remain valid before expiring.
igher than the \`apikeys.maxExpirySeconds\` configuration setting.`,
    type: 'number',
    example: 3600,
  },
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
  result: {
    description: 'Textual description of the result of the API call',
    type: 'string',
    example: 'created',
  },
  error: {
    description: 'Textual description of the error that caused this API call to fail',
    type: 'string',
    // Note: needs example
  },
}

export const parameters = {
  auth: {
    in: 'path',
    name: 'auth',
    required: true,
    schema: {
      type: 'string',
      enum: ['jwt', 'key'],
    },
    description:
      'One of `jwt` or `key` depending on whether you ' +
      'want to authentication with a JSON Web Token (`jwt`) or an API key (`key`)',
  },
}

export const responseObjects = {
  apikeyWithSecret: {
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
}
responseObjects.apikeyWithoutSecret = {
  ...responseObjects.apikeyWithSecret,
  properties: { ...responseObjects.apikeyWithSecret.properties },
}
delete responseObjects.apikeyWithoutSecret.properties.secret
