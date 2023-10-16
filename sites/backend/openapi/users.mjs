import {
  jwt,
  key,
  fields,
  parameters,
  response,
  errorExamples,
  jsonResponse,
  uploadImg,
  token,
} from './lib.mjs'
/*
  // Update email address
  app.post(
    '/account/change/email',
    passport.authenticate(...jwt),
    (req, res) => User.confirmChangedEmail(req, res, params)
  )

  // Re-send account confirmation
  app.post(
    '/resend',
    (req, res) => User.resend(req, res, params)
  )
  */
const common = {
  tags: ['Sign Up & Sign In'],
  security: [jwt, key],
}

const local = {
  params: {
    id: {
      in: 'path',
      name: 'id',
      required: true,
      description: 'The confirmation ID',
      schema: {
        example: '3985f312-e407-458a-a78c-4596c361d284',
        type: 'string',
      },
    },
  },
  password: {
    description: `The user's password`,
    type: 'string',
    example: 'super secret password here',
  },
  token: {
    description: `The one-time password token from the MFA app (optional)`,
    type: 'number',
    example: 230945,
  },
  mfa: {
    description: `Whether to enable MFA or not`,
    type: 'boolean',
    example: true,
  },
  secret: {
    description: 'The secret to generate one-time passwords with',
    type: 'string',
    example: 'KBTSKUKRDJPEGCZK',
  },
}

// Paths
export const paths = {}

// Create account (sign up)
paths['/signup'] = {
  post: {
    tags: ['Sign Up & Sign In'],
    summary: 'Sign up for a FreeSewing account',
    description:
      'Creates a new inactive account. The account will require confirmation via a link sent to the email address that the user submitted.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: response.body.userAccount.properties.email,
              language: response.body.userAccount.properties.language,
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
          email: response.body.userAccount.properties.email,
        }),
      },
      400: {
        ...response.status['400'],
        description:
          response.status['400'].description +
          errorExamples([
            'postBodyMissing',
            'emailMissing',
            'languageMissing',
            'unsupportedLanguage',
          ]),
      },
      500: response.status['500'],
    },
  },
}

// Confirm account
paths['/confirm/signup/{id}'] = {
  post: {
    tags: ['Sign Up & Sign In'],
    parameters: [local.params.id],
    summary: 'Confirm a FreeSewing account',
    description: 'Confirmes a new inactive account.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              consent: response.body.userAccount.properties.consent,
            },
          },
        },
      },
    },
    responses: {
      200: {
        ...response.status['200'],
        ...jsonResponse({
          result: fields.result,
          token,
          account: response.body.userAccount,
        }),
      },
      400: {
        ...response.status['400'],
        description:
          response.status['400'].description +
          errorExamples(['postBodyMissing', 'consentRequired']),
      },
      404: response.status['404'],
      500: response.status['500'],
    },
  },
}

// Sign In
paths['/signin'] = {
  post: {
    tags: ['Sign Up & Sign In'],
    summary: 'Sign in to a FreeSewing account',
    description:
      "Signs in to an existing and active account. If MFA is enabled, you must also send the `token`. <br>The `username` field used for the sign in can contain one the User's `username`, `email`, or `id`.",
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: response.body.userAccount.properties.email,
              password: local.password,
              token: local.token,
            },
          },
        },
      },
    },
    responses: {
      200: {
        ...response.status['200'],
        ...jsonResponse({
          result: fields.result,
          token,
          account: response.body.userAccount,
        }),
      },
      400: {
        ...response.status['400'],
        description:
          response.status['400'].description +
          errorExamples(['postBodyMissing', 'usernameMissing', 'passwordMissing']),
      },
      401: response.status['401'],
      500: response.status['500'],
    },
  },
}

// Send sign In Link
paths['/signinlink'] = {
  post: {
    tags: ['Sign Up & Sign In'],
    summary: 'Send a sign in link via email (aka magic link)',
    description:
      "Sends an email containing a sign in link that will sign in the user without the need for a password (also known as a 'magic link'). <br>The `username` field used for the sign in can contain one the User's `username`, `email`, or `id`.",
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: response.body.userAccount.properties.email,
            },
          },
        },
      },
    },
    responses: {
      200: {
        ...response.status['200'],
        ...jsonResponse({
          result: { ...fields.result, example: 'sent' },
        }),
      },
      400: {
        ...response.status['400'],
        description:
          response.status['400'].description +
          errorExamples(['postBodyMissing', 'usernameMissing']),
      },
      401: response.status['401'],
      500: response.status['500'],
    },
  },
}

// Load user account
paths['/account/{auth}'] = {
  get: {
    ...common,
    tags: ['Account'],
    summary: `Get account data`,
    description: 'Retrieves account info for the authenticated user',
    parameters: [parameters.auth],
    responses: {
      200: {
        description:
          '**Success - Account data returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: fields.result,
          account: response.body.userAccount,
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
  patch: {
    ...common,
    tags: ['Account'],
    summary: 'Update account data',
    description: `Updates information for the User's account.`,
    parameters: [parameters.auth],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              bio: response.body.userAccount.properties.bio,
              consent: response.body.userAccount.properties.consent,
              control: response.body.userAccount.properties.control,
              email: response.body.userAccount.properties.email,
              github: response.body.userAccount.properties.github,
              img: uploadImg,
              language: response.body.userAccount.properties.language,
              newsletter: response.body.userAccount.properties.newsletter,
              username: response.body.userAccount.properties.username,
            },
          },
        },
      },
    },
    responses: {
      200: {
        description:
          '**Success - Account data updated**\n\n' +
          'Status code `200` indicates that the resource was updated successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
          account: response.body.userAccount,
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
  // Remove a User
  delete: {
    ...common,
    tags: ['Account'],
    summary: 'Remove account',
    description: 'Removes the account of the currently authenticated user.',
    parameters: [parameters.auth],
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

// FIXME: These are not implemented yet
paths['/account/export/{auth} [FIXME]'] = {
  get: {
    ...common,
    tags: ['Account'],
    summary: `Export account data`,
    description: 'This endpoint is not yet available.',
    parameters: [parameters.auth],
    responses: { 404: response.status['404'] },
  },
}
paths['/account/restrict/{auth} [FIXME]'] = {
  post: {
    ...common,
    tags: ['Account'],
    summary: `Restrict processing of account data`,
    description: 'This endpoint is not yet available.',
    parameters: [parameters.auth],
    responses: { 404: response.status['404'] },
  },
}
paths['/account/recover [FIXME]'] = {
  post: {
    tags: ['Account'],
    summary: `Recover account access (reset password)`,
    description: 'This endpoint is not yet available.',
    responses: { 404: response.status['404'] },
  },
}

const mfaCommon = {
  ...common,
  tags: ['Multi-Factor Authentication (MFA)'],
}
// Enable MFA
paths['/account/mfa/{auth}  [setup]'] = {
  post: {
    ...mfaCommon,
    summary: 'Setup Multi-Factor Authentication (MFA)',
    description: `This describes how to trigger the initial setup of MFA on the account`,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              mfa: local.mfa,
            },
          },
        },
      },
    },
    responses: {
      200: {
        ...response.status['200'],
        ...jsonResponse({
          result: fields.result,
          mfa: {
            type: 'object',
            properties: {
              secret: local.secret,
              otpauth: {
                description:
                  'The `otpauth://` URI to be consumed by an OTP app like Google Authenticator',
                type: 'string',
                example:
                  'otpauth://totp/FreeSewing:user-294?secret=KBTSKUKRDJPEGCZK&period=30&digits=6&algorithm=SHA1&issuer=FreeSewing',
              },
              qrcode: {
                description:
                  'An SVG image that contains a QR code that resolves as the `otpauth` URI',
                type: 'string',
                example: '<svg xmlns="http://www.w3.org/2000/svg" ...truncated',
              },
            },
          },
        }),
      },
      400: {
        ...response.status['400'],
        description:
          response.status['400'].description + errorExamples(['postBodyMissing', 'mfaActive']),
      },
      403: response.status['403'],
      500: response.status['500'],
    },
  },
}
// Confirm MFA
paths['/account/mfa/{auth}  [confirm]'] = {
  post: {
    ...mfaCommon,
    summary: 'Confirm Multi-Factor Authentication (MFA)',
    description: `This describes how to confirm the setup of MFA on the account`,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              mfa: local.mfa,
              secret: local.secret,
              token: local.token,
            },
          },
        },
      },
    },
    responses: {
      200: {
        ...response.status['200'],
        ...jsonResponse({ result: { ...fields.result, example: 'success' } }),
      },
      400: {
        ...response.status['400'],
        description:
          response.status['400'].description + errorExamples(['postBodyMissing', 'mfaActive']),
      },
      401: response.status['401'],
      403: response.status['403'],
      500: response.status['500'],
    },
  },
}
// Disable MFA
paths['/account/mfa/{auth}  [disable]'] = {
  post: {
    ...mfaCommon,
    summary: 'Disable Multi-Factor Authentication (MFA)',
    description:
      'This describes how to disable MFA on the account. It requires the `password` and OTP `token`',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              mfa: {
                ...local.mfa,
                example: false,
              },
              password: local.password,
              token: local.token,
            },
          },
        },
      },
    },
    responses: {
      200: {
        ...response.status['200'],
        ...jsonResponse({ result: { ...fields.result, example: 'success' } }),
      },
      400: {
        ...response.status['400'],
        description:
          response.status['400'].description +
          errorExamples(['postBodyMissing', 'mfaTokenMissing', 'passwordMissing']),
      },
      401: response.status['401'],
      403: response.status['403'],
      500: response.status['500'],
    },
  },
}

// Get current JWT
paths['/whoami/jwt'] = {
  get: {
    ...paths['/account/{auth}'].get,
    tags: ['Whoami'],
    security: [jwt],
    parameters: [],
    summary: 'Retrieve the account data for the JSON Web Token used in the request',
    description: 'This is an alias for `GET /account/jwt`.',
  },
}

// Load user profile
paths['/users/{username}'] = {
  get: {
    ...common,
    tags: ['Users'],
    summary: `Load user profile data`,
    description: 'Retrieves profile data for user `username`',
    parameters: [parameters.auth],
    responses: {
      200: {
        description:
          '**Success - Profile data returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
          user: response.body.userProfile,
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
}

// Check whether a username is available
const checkUsername = "Little Miss Can't Be Wrong"
paths['/available/username'] = {
  post: {
    tags: ['Users'],
    summary: `Checks whether a username is available`,
    description:
      'This allows a background check to see whether a username is available during sign up',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                description: 'The username to check for availability',
                example: checkUsername,
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description:
          '**Success - Username is NOT available**\n\n' +
          'Status code `200` indicates that the username exists.',
        ...jsonResponse({
          result: 'success',
          username: checkUsername,
          available: false,
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
}
