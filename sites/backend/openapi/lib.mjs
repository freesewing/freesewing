export const jwt = [{ jwt: [] }]
export const key = [{ key: [] }]

export const errors = {
  accountStatusLacking:
    'The account is in a status that does not allow this action (eg: it is not active or disabled).',
  confirmationIdMissing: 'The confirmation ID was not specified in the URL',
  consentRequired: 'Consent is required to perform this action',
  dataNotAnObject: 'The `data` field in the POST body does not contain a value of type `object`',
  designMissing: 'The request lacks a `design` value the POST body',
  designNotStringy: 'The `design` field in the POST body is not of type `string`',
  emailExists: 'There is already an User account with this email address',
  emailMissing: 'The `email` field was missing from the request body',
  expiresInMissing: 'The `expiresIn` field was missing from the request body',
  expiresInNotNumeric: 'The `expiresIn` field in the request body was not a number',
  expiresIsHigherThanMaximum:
    'The `expiresIn` field in the request body is higher than allowed by the `apikeys.maxExpirySeconds` configuration',
  failedToFindConfirmationId: `The confirmation ID could not be found`,
  insufficientAccessLevel:
    'The credentials used to make this API call are insufficient for this operation.',
  invalidLevel: 'The `level` field in the request body was not a valid permission level',
  keyLevelExceedsRoleLevel:
    'The `level` field in the request body is higher than the `level` of the user creating the key. This is not allowed.',
  languageMissing: 'The `langauge` field was missing from the request body',
  levelMissing: 'The `level` field was missing from the request body',
  levelNotNumeric: 'The `level` field in the request body was a number',
  mfaActive: 'MFA is already activated on the account',
  mfaTokenMissing: 'The `token` field is missing from the request body',
  nameMissing: 'The `name` field was missing from the request body',
  passwordMissing: 'The `password` field is missing from the request body',
  setMissing: 'The request lacks a `set` value in the POST body',
  setNotNumeric: 'The `set` field in the POST body is not of type `integer`',
  postBodyMissing: 'The request lacks a POST body',
  settingsNotAnObject:
    'The `settings` field in the POST body does not contain a value of type `object`',
  unsupportedLanguageMissing: 'The `langauge` field holds a language code that we do no support',
  usernameMissing: 'The `username` field is missing from the request body',
}

export const errorExamples = (errs) =>
  errs.map((err) => `\n  - \`${err}\` : ${errors[err]}`).join(' ')

export const fields = {
  level: {
    description: `
One of the [API permission
levels](https://freesewing.dev/reference/backend/api/rbac#permission-levels) which
is an integer between (and including) \`0\` and \`8\`.`,
    type: 'number',
    example: 5,
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

export const response = {
  status: {
    201: {
      description:
        '**Success - Resource created**\n\n' +
        'Status code `201` indicates that the resource was created successfully.',
    },
    204: {
      description:
        '**Success - Resource removed**\n\n' +
        'Status code `204` indicates that the resource was removed successfully.' +
        '<br>**Note:** _There is no response body for a `204` status code_.',
    },
    400: {
      description:
        '**Client error - Invalid request**\n\n' +
        'Status code `400` indicates that the request was invalid.<br>' +
        'The return body will have an `error` field which holds a string value that indicates the nature of the problem:\n\n',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              result: { ...fields.result, example: 'error' },
              error: { ...fields.error, example: 'postBodyMissing' },
            },
          },
        },
      },
    },
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
        '**Not found - Resource not found**\n\n' +
        'Status code `404` indicates that the resource could not be found.' +
        'This typically means that it does not or no longer exist.<br>' +
        '**Note:** _There is no response body for a `404` status code_.',
    },
    500: {
      description:
        '**Server error - API call failed**\n\n' +
        'Status code `500` indicates that the request could not be handled ' +
        'due to an unforseen error.',
    },
  },
  body: {
    apikey: {
      description: 'Object holding the data of the created API key',
      type: 'object',
      properties: {
        createdAt: {
          description: 'UTC Timestamp in ISO 8601 format.',
          type: 'string',
          example: '2022-12-18T17:14:30.460Z',
        },
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
    pattern: {
      description: 'Object holding the data of the pattern',
      type: 'object',
      properties: {
        id: {
          description: `The Pattern's unique ID`,
          type: 'integer',
          example: 666,
        },
        createdAt: {
          description: 'Timestamp of when the Pattern was created, in ISO 8601 format.',
          type: 'string',
          example: '2022-12-18T18:14:30.460Z',
        },
        data: {
          description: `Additional data for the Pattern`,
          type: 'object',
        },
        design: {
          description: `Name of the design this Pattern is an instance of`,
          type: 'string',
          example: 'aaron',
        },
        img: {
          description: `An image [data-uri](https://en.wikipedia.org/wiki/Data_URI_scheme) to store with this pattern`,
          type: 'string',
          example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEU...truncated',
        },
        name: {
          description: `The name of the Pattern exists solely to help you differentiate between your patterns.`,
          type: 'string',
          example: 'My favourite shirt',
        },
        notes: {
          description: `Any notes to be stored with the pattern`,
          type: 'string',
          example: 'These are my notes. I can keep them alongside the pattern. Handy!',
        },
        setId: {
          description: `The unique ID of the Measurements Set this pattern was drafted for`,
          type: 'integer',
          example: 33,
        },
        public: {
          description: `Whether or not this pattern can be viewed/used by others`,
          type: 'boolean',
          example: false,
        },
        settings: {
          description: `The settings used to draft/render this pattern`,
          type: 'object',
          example: { sa: 30 },
        },
        userId: {
          description: `The unique ID of the User who created this pattern`,
          type: 'integer',
          example: 66,
        },
        updatedAt: {
          description: 'Timestamp of when the Pattern was last updated, in ISO 8601 format.',
          type: 'string',
          example: '2022-12-18T18:14:30.460Z',
        },
      },
    },
    set: {
      description: 'Object holding the data of the measurements set',
      type: 'object',
      properties: {
        id: {
          description: `The Measurements Set's unique ID`,
          type: 'integer',
          example: 666,
        },
        createdAt: {
          description: 'Timestamp of when the Measurement Set was created, in ISO 8601 format.',
          type: 'string',
          example: '2022-12-18T18:14:30.460Z',
        },
        img: {
          description: `An image that was stored with this measurements set`,
          type: 'string',
          example: 'https://freesewing.org/avatar.svg',
        },
        imperial: {
          description: `Whether or not to use imperial units for this measurements set`,
          type: 'boolean',
          example: false,
        },
        name: {
          description: `The name of the Measurements Set`,
          type: 'string',
          example: 'My bestie Ronda',
        },
        notes: {
          description: `Any notes stored with the measurements set`,
          type: 'string',
          example: 'These are my notes. I can keep them alongside the measurements set. Handy!',
        },
        public: {
          description: `Whether or not this measurements set can be viewed/used by others`,
          type: 'boolean',
          example: false,
        },
        measies: {
          description: `The measurements of this set`,
          type: 'object',
          example: { neck: 420 },
        },
        userId: {
          description: `The unique ID of the User who owns this measurements set`,
          type: 'integer',
          example: 66,
        },
        updatedAt: {
          description: 'Timestamp of when the Pattern was last updated, in ISO 8601 format.',
          type: 'string',
          example: '2022-12-18T18:14:30.460Z',
        },
      },
    },
    curatedSet: {
      description: 'Object holding the data of the curated measurements set',
      type: 'object',
      properties: {
        id: {
          description: `The Curated Measurements Set's unique ID`,
          type: 'integer',
          example: 666,
        },
        createdAt: {
          description:
            'Timestamp of when the Curated Measurement Set was created, in ISO 8601 format.',
          type: 'string',
          example: '2022-12-18T18:14:30.460Z',
        },
        img: {
          description: `An image that was stored with this curated measurements set`,
          type: 'string',
          example: 'https://freesewing.org/avatar.svg',
        },
        nameEn: {
          description: `The name of the Curated Measurements Set in English`,
          type: 'string',
          example: 'Example Measurements',
        },
        nameDe: {
          description: `The name of the Curated Measurements Set in English`,
          type: 'string',
          example: 'Beispielmessungen',
        },
        nameEs: {
          description: `The name of the Curated Measurements Set in English`,
          type: 'string',
          example: 'Medidas de ejemplo A',
        },
        nameFr: {
          description: `The name of the Curated Measurements Set in English`,
          type: 'string',
          example: 'Mesures exemple A',
        },
        nameNl: {
          description: `The name of the Curated Measurements Set in English`,
          type: 'string',
          example: 'Voorbeel maten  A',
        },
        notesEn: {
          description: `Any notes to be stored with the measurements set`,
          type: 'string',
          example: 'These are the notes',
        },
        notesDe: {
          description: `Any notes to be stored with the measurements set`,
          type: 'string',
          example: 'Das sind die Notizen A',
        },
        notesEs: {
          description: `Any notes to be stored with the measurements set`,
          type: 'string',
          example: 'Estas son las notas',
        },
        notesFr: {
          description: `Any notes to be stored with the measurements set`,
          type: 'string',
          example: 'Ce sont les notes A',
        },
        notesNl: {
          description: `Any notes to be stored with the measurements set`,
          type: 'string',
          example: 'Dit zijn de notities A',
        },
        tagsEn: {
          description: `A list of tags for the measurements set`,
          type: 'array',
          items: {
            type: 'string',
            example: 'cisFemale',
          },
        },
        tagsDe: {
          description: `A list of tags for the measurements set`,
          type: 'array',
          items: {
            type: 'string',
            example: 'cisFemale',
          },
        },
        tagsEs: {
          description: `A list of tags for the measurements set`,
          type: 'array',
          items: {
            type: 'string',
            example: 'cisFemale',
          },
        },
        tagsFr: {
          description: `A list of tags for the measurements set`,
          type: 'array',
          items: {
            type: 'string',
            example: 'cisFemale',
          },
        },
        tagsNl: {
          description: `A list of tags for the measurements set`,
          type: 'array',
          items: {
            type: 'string',
            example: 'cisFemale',
          },
        },
        measies: {
          description: `The measurements of this set`,
          type: 'object',
          example: { neck: 420 },
        },
        updatedAt: {
          description:
            'Timestamp of when the Curated Measurements Set was last updated, in ISO 8601 format.',
          type: 'string',
          example: '2022-12-18T18:14:30.460Z',
        },
      },
    },
    userAccount: {
      description: 'Object holding the data of the user',
      type: 'object',
      properties: {
        /*
        apikeys       Apikey[]
        confirmations Confirmation[]
        ehash         String    @unique
        ihash         String
        patterns      Pattern[]
        people        Set[]
        */
        id: {
          description: `The User's unique ID`,
          type: 'integer',
          example: 666,
        },
        bio: {
          description: `The bio is the information about the user that they want to make available to others`,
          type: 'text',
          example: `I make clothes and shoes. I design sewing patterns. I write code. I run http://freesewing.org

我也在学中文

Also: Introvert 🙊

(he/him) or (they/them)`,
        },
        consent: {
          description: `This field is about data protection. It indicates the level of consent the user has given to process their data.
- \`0\`: No consent given
- \`1\`: Consent given to process account data
- \`2\`: Consent given to process account data and measurement data
- \`3\`: Consent given to process account data and measurement data, and use anonymized data for research
`,
          type: 'integer',
          enum: [0, 1, 2, 3],
          example: 3,
        },
        control: {
          description: `This field is about keeping it simple. It indicates the level of control the user wants over the user experience.
- \`1\`: Hide all but the most crucial features. Make it as simple as possible.
- \`2\`: Hide the majority of features. Make it simple, but not too much.
- \`3\`: Reveal the majority of features, but not all. Balance simplicity with power.
- \`4\`: Reveal everything, but keep handrails and safety checks. Only intervene when I’m about to do something dangerous.
- \`5\`: Reveal everything, remove the handrails and safety checks. Get out of my way, I know what I’m doing.
`,
          type: 'integer',
          example: 4,
          enum: [1, 2, 3, 4, 5],
        },
        createdAt: {
          description: 'Timestamp of when the User was created, in ISO 8601 format.',
          type: 'string',
          example: '2022-12-18T18:14:30.460Z',
        },
        email: {
          description: `The email address of the User`,
          type: 'string',
          example: 'joost@joost.at',
        },
        github: {
          description: `The github username of the User`,
          type: 'string',
          example: 'joostdecock',
        },
        img: {
          description: `An image that was stored with this measurements set`,
          type: 'string',
          example: 'https://freesewing.org/avatar.svg',
        },
        imperial: {
          description: `Whether or not to use imperial units for this user`,
          type: 'boolean',
          example: false,
        },
        initial: {
          description: `The email address this User account was registered with`,
          type: 'string',
          example: 'joost@decock.org',
        },
        language: {
          description: `Language code of the language preferred by the user`,
          type: 'string',
          example: 'en',
          enum: ['en', 'es', 'de', 'fr', 'nl'],
        },
        lastSignIn: {
          description: 'Timestamp of when the User last signed in, in ISO 8601 format.',
          type: 'string',
          example: '2022-12-18T18:14:30.460Z',
        },
        lusername: {
          description: `A lowercased version of the user's username`,
          type: 'string',
          example: 'joostdecock',
        },
        mfaEnabled: {
          description: `Whether or not multi-factor authentication (MFA) is enabled for this user`,
          type: 'boolean',
          example: 'true',
        },
        newsletter: {
          description: `Whether or not this user is subscribed to the newsletter (via the account subscription feature)`,
          type: 'boolean',
          example: 'false',
        },
        patron: {
          description: `The patron tier of the user`,
          type: 'integer',
          example: 8,
          enum: [0, 2, 4, 8],
        },
        role: {
          description: `The role of the user`,
          type: 'string',
          example: 'user',
          enum: ['user', 'bughunter', 'support', 'admin'],
        },
        status: {
          description: `The status of the user's account
- \`0\`: The account is not active (yet)
- \`1\`: The account is active
- \`-1\`: The account was disabled by the user
- \`-2\`: The account was administratively disabled
`,
          type: 'integer',
          example: 8,
          enum: [0, 1, -1, -2],
        },
        updatedAt: {
          description: 'Timestamp of when the User was last updated, in ISO 8601 format.',
          type: 'string',
          example: '2022-12-18T18:14:30.460Z',
        },
        username: {
          description: `The User's username`,
          type: 'string',
          example: 'JoostDeCock',
        },
      },
    },
    userProfile: {
      description: 'Object holding the profile of the user',
      type: 'object',
      properties: {},
    },
  },
}

response.body.userProfile.properties = { ...response.body.userAccount.properties }
for (const remove of [
  'consent',
  'control',
  'createdAt',
  'email',
  'github',
  'initial',
  'lastSignIn',
  'lusername',
  'mfaEnabled',
  'newsletter',
  'updatedAd',
])
  delete response.body.userProfile.properties[remove]

export const uploadImg = {
  description: `An image [data-uri](https://en.wikipedia.org/wiki/Data_URI_scheme) to store with this resource`,
  type: 'string',
  example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEU...truncated',
}

export const token = {
  description: `A JWT token`,
  type: 'string',
  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...truncated',
}

// Schemas
export const schemas = {
  apikey: response.body.apikey,
  pattern: response.body.pattern,
  set: response.body.set,
  curatedSet: response.body.curatedSet,
  userAccount: response.body.userAccount,
  userProfile: response.body.userProfile,
}

export const jsonResponse = (properties) => ({
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties,
      },
    },
  },
})
