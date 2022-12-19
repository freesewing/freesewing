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
