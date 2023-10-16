import {
  jwt,
  key,
  fields,
  parameters,
  response,
  errorExamples,
  jsonResponse,
  uploadImg,
} from './lib.mjs'

const common = {
  tags: ['Curated Measurements Sets'],
  security: [jwt, key],
}

const local = {
  params: {
    id: {
      in: 'path',
      name: 'id',
      required: true,
      description: "The Curated Set's unique ID",
      schema: {
        example: 666,
        type: 'integer',
      },
    },
  },
}

// Paths
export const paths = {}

// Create set
paths['/curated-sets'] = {
  get: {
    tags: common.tags,
    summary: 'Retrieves the list of curated measurements sets.',
    description: 'Returns the list of curated sets.',
    responses: {
      200: {
        description:
          '**Success - List of curated measurements sets returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
          curatedSets: {
            type: 'array',
            items: response.body.curatedSet,
          },
        }),
      },
      500: response.status['500'],
    },
  },
}
paths['/curated-sets.json'] = {
  get: {
    tags: common.tags,
    summary: 'Retrieves the list of curated measurements sets as JSON',
    description:
      'Returns the list of curated sets as JSON. Note that the standard requests to this API also return JSON, but this endpoint will only return the relavant JSON.',
    responses: {
      200: {
        description:
          '**Success - List of curated measurements sets returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: response.body.curatedSet,
            },
          },
        },
      },
      500: response.status['500'],
    },
  },
}
paths['/curated-sets.yaml'] = {
  get: {
    tags: common.tags,
    summary: 'Retrieves the list of curated measurements sets as YAML',
    description: 'Returns the list of curated sets as YAML.',
    responses: {
      200: {
        description:
          '**Success - List of curated measurements sets returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        content: {
          'application/yaml': {
            schema: {
              type: 'text',
              example: `
- id: 1
  createdAt: 2023-05-06T14:39:09.660Z
  img: https://freesewing.org/avatar.svg
  nameDe: Beispielmessungen A
  nameEn: Example measurements A
  nameEs: Medidas de ejemplo A
  nameFr: Mesures exemple A
  nameNl: Voorbeel maten  A
  notesDe: Das sind die Notizen A
  notesEn: These are the notes A
  notesEs: Estas son las notas A
  notesFr: Ce sont les notes A
  notesNl: Dit zijn de notities A
  measies: '{"chest":1000,"neck":420}'
  updatedAt: 2023-05-06T14:39:09.660Z
- id: 2
  createdAt: 2023-05-06T14:40:26.795Z
  img: https://freesewing.org/avatar.svg
  nameDe: Beispielmessungen A
  nameEn: Example measurements A
  nameEs: Medidas de ejemplo A
  nameFr: Mesures exemple A
  nameNl: Voorbeel maten  A
  notesDe: Das sind die Notizen A
  notesEn: These are the notes A
  notesEs: Estas son las notas A
  notesFr: Ce sont les notes A
  notesNl: Dit zijn de notities A
  measies: '{"chest":1000,"neck":420}'
  updatedAt: 2023-05-06T14:40:26.795Z
`,
            },
          },
        },
      },
      500: response.status['500'],
    },
  },
}
paths['/curated-sets/{id}'] = {
  // Get a Set
  get: {
    tags: common.tags,
    summary: 'Retrieve a Curated Measurements Set',
    description: 'Retrieves information about Curated Measurements Set `id`.',
    parameters: [local.params.id],
    responses: {
      200: {
        description:
          '**Success - Curated Measurements Set returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
          set: response.body.curatedSet,
        }),
      },
      404: response.status['404'],
      500: response.status['500'],
    },
  },
}
const requestBodyCuratedSet = response.body.curatedSet.properties
delete requestBodyCuratedSet.id
delete requestBodyCuratedSet.createdAt
delete requestBodyCuratedSet.updatedAt

paths['/curated-sets/{auth}'] = {
  post: {
    ...common,
    summary: 'Create a new Curated Measurements Set. Requires at least curator access level.',
    description: 'Creates a new Curated Measurements Set and returns it.',
    parameters: [parameters.auth],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              ...requestBodyCuratedSet,
              img: uploadImg,
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
          curatedSet: response.body.curatedSet,
        }),
      },
      400: {
        ...response.status['400'],
        description:
          response.status['400'].description + errorExamples(['postBodyMissing', 'nameEnMissing']),
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
}

// Update/Remove Curated Set
paths['/curated-sets/{id}/{auth}'] = {
  // Update a Set
  patch: {
    ...common,
    summary: 'Update a Curated Measurements Set. Requires at least curator access level.',
    description: 'Updates information about Curated Measurements Set `id`.',
    parameters: [parameters.auth, local.params.id],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              ...requestBodyCuratedSet,
              img: uploadImg,
            },
          },
        },
      },
    },
    responses: {
      200: {
        description:
          '**Success - Curated Measurements Set returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
          set: response.body.curatedSet,
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
  // Remove a Curated Set
  delete: {
    ...common,
    summary: 'Remove a Curated Measurements Set. Requires at least curator access level.',
    description: 'Removes the Curated Measurements Set `id`.',
    parameters: [parameters.auth, local.params.id],
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

// Clone a Curated Set
paths['/curated-sets/{id}/clone/{auth}'] = {
  post: {
    ...common,
    summary: 'Clone a Curated Measurements Set (into a regular Measurements Set)',
    description: 'Creates a new (regular) Measurments Set by cloning a Curated Measurements Set.',
    parameters: [parameters.auth],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              language: {
                type: 'string',
                example: 'en',
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
          set: response.body.set,
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
}
