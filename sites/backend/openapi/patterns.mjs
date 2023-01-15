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
  tags: ['Patterns'],
  security: [jwt, key],
}

const local = {
  params: {
    id: {
      in: 'path',
      name: 'id',
      required: true,
      description: "The Patterns's unique ID",
      schema: {
        example: 666,
        type: 'integer',
      },
    },
  },
}

// Paths
export const paths = {}

// Create Pattern
paths['/patterns/{auth}'] = {
  post: {
    ...common,
    summary: 'Create a new Pattern',
    description: 'Creates a new Pattern and returns it.',
    parameters: [parameters.auth],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: response.body.pattern.properties.data,
              design: response.body.pattern.properties.design,
              img: uploadImg,
              name: response.body.pattern.properties.name,
              notes: response.body.pattern.properties.notes,
              person: response.body.pattern.properties.personId,
              public: response.body.pattern.properties.public,
              settings: response.body.pattern.properties.settings,
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
          pattern: response.body.pattern,
        }),
      },
      400: {
        ...response.status['400'],
        description:
          response.status['400'].description +
          errorExamples([
            'dataNotAnObject',
            'designMissing',
            'designNotStringy',
            'postBodyMissing',
            'personMissing',
            'personNotNumeric',
            'settingsNotAnObject',
          ]),
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

// Get/Remove Pattern
paths['/patterns/{id}/{auth}'] = {
  // Get a Pattern
  get: {
    ...common,
    summary: 'Retrieve a Pattern',
    description: 'Retrieves information about Pattern `id`.',
    parameters: [parameters.auth, local.params.id],
    responses: {
      200: {
        description:
          '**Success - Pattern returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
          pattern: response.body.pattern,
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
  // Update a Pattern
  patch: {
    ...common,
    summary: 'Update a Pattern',
    description: 'Updates information about Pattern `id`.',
    parameters: [parameters.auth, local.params.id],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: response.body.pattern.properties.data,
              design: response.body.pattern.properties.design,
              img: uploadImg,
              name: response.body.pattern.properties.name,
              notes: response.body.pattern.properties.notes,
              person: response.body.pattern.properties.personId,
              public: response.body.pattern.properties.public,
              settings: response.body.pattern.properties.settings,
            },
          },
        },
      },
    },
    responses: {
      200: {
        description:
          '**Success - Pattern returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
          pattern: response.body.pattern,
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
  // Remove a Pattern
  delete: {
    ...common,
    summary: 'Remove a Pattern',
    description: 'Removes the Pattern `id`.',
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

// Clone Pattern
paths['/patterns/{id}/clone/{auth}'] = {
  post: {
    ...common,
    summary: 'Clone a Pattern',
    description: 'Creates a new Pattern by cloning an existing one.',
    parameters: [parameters.auth],
    responses: {
      201: {
        ...response.status['201'],
        ...jsonResponse({
          result: fields.result,
          pattern: response.body.pattern,
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
