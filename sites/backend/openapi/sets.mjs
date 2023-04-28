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
  tags: ['Measurements Sets'],
  security: [jwt, key],
}

const local = {
  params: {
    id: {
      in: 'path',
      name: 'id',
      required: true,
      description: "The Set's unique ID",
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
paths['/sets/{auth}'] = {
  post: {
    ...common,
    summary: 'Create a new Measurements Set',
    description: 'Creates a new Measurements Set and returns it.',
    parameters: [parameters.auth],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              img: uploadImg,
              imperial: response.body.set.properties.imperial,
              name: response.body.set.properties.name,
              notes: response.body.set.properties.notes,
              public: response.body.set.properties.public,
              measies: response.body.set.properties.measies,
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
      400: {
        ...response.status['400'],
        description:
          response.status['400'].description + errorExamples(['postBodyMissing', 'nameMissing']),
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

// Get/Remove Set
paths['/sets/{id}/{auth}'] = {
  // Get a Set
  get: {
    ...common,
    summary: 'Retrieve a Measurements Set',
    description: 'Retrieves information about Measurements Set `id`.',
    parameters: [parameters.auth, local.params.id],
    responses: {
      200: {
        description:
          '**Success - Measurements Set returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
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
      404: response.status['404'],
      500: response.status['500'],
    },
  },
  // Update a Set
  patch: {
    ...common,
    summary: 'Update a Measurements Set',
    description: 'Updates information about Measurements Set `id`.',
    parameters: [parameters.auth, local.params.id],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              img: uploadImg,
              imperial: response.body.set.properties.imperial,
              name: response.body.set.properties.name,
              notes: response.body.set.properties.notes,
              public: response.body.set.properties.public,
              measies: response.body.set.properties.measies,
            },
          },
        },
      },
    },
    responses: {
      200: {
        description:
          '**Success - Measurements Set returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
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
      404: response.status['404'],
      500: response.status['500'],
    },
  },
  // Remove a Set
  delete: {
    ...common,
    summary: 'Remove a Set',
    description: 'Removes the Measurements Set `id`.',
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

// Clone a Set
paths['/sets/{id}/clone/{auth}'] = {
  post: {
    ...common,
    summary: 'Clone a Measurements Set',
    description: 'Creates a new Measurments Set by cloning an existing one.',
    parameters: [parameters.auth],
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
