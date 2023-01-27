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
  tags: ['People'],
  security: [jwt, key],
}

const local = {
  params: {
    id: {
      in: 'path',
      name: 'id',
      required: true,
      description: "The Person's unique ID",
      schema: {
        example: 666,
        type: 'integer',
      },
    },
  },
}

// Paths
export const paths = {}

// Create Person
paths['/people/{auth}'] = {
  post: {
    ...common,
    summary: 'Create a new Person',
    description: 'Creates a new Person and returns it.',
    parameters: [parameters.auth],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              img: uploadImg,
              imperial: response.body.person.properties.imperial,
              name: response.body.person.properties.name,
              notes: response.body.person.properties.notes,
              public: response.body.person.properties.public,
              measies: response.body.person.properties.measies,
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
          person: response.body.person,
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

// Get/Remove Person
paths['/people/{id}/{auth}'] = {
  // Get a Person
  get: {
    ...common,
    summary: 'Retrieve a Person',
    description: 'Retrieves information about Person `id`.',
    parameters: [parameters.auth, local.params.id],
    responses: {
      200: {
        description:
          '**Success - Person returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
          person: response.body.person,
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
  // Update a Person
  patch: {
    ...common,
    summary: 'Update a Person',
    description: 'Updates information about Person `id`.',
    parameters: [parameters.auth, local.params.id],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              img: uploadImg,
              imperial: response.body.person.properties.imperial,
              name: response.body.person.properties.name,
              notes: response.body.person.properties.notes,
              public: response.body.person.properties.public,
              measies: response.body.person.properties.measies,
            },
          },
        },
      },
    },
    responses: {
      200: {
        description:
          '**Success - Person returned**\n\n' +
          'Status code `200` indicates that the resource was returned successfully.',
        ...jsonResponse({
          result: {
            ...fields.result,
            example: 'success',
          },
          person: response.body.person,
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
  // Remove a Person
  delete: {
    ...common,
    summary: 'Remove a Person',
    description: 'Removes the Person `id`.',
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

// Clone Person
paths['/people/{id}/clone/{auth}'] = {
  post: {
    ...common,
    summary: 'Clone a Person',
    description: 'Creates a new Person by cloning an existing one.',
    parameters: [parameters.auth],
    responses: {
      201: {
        ...response.status['201'],
        ...jsonResponse({
          result: fields.result,
          person: response.body.person,
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
