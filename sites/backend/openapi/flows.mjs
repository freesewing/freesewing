import { jwt, key, fields, parameters, response, errorExamples, jsonResponse } from './lib.mjs'

const common = {
  tags: ['Workflows'],
  security: [jwt, key],
}

// Paths
export const paths = {}

// Create set
paths['/flows/translator-invite/{auth}'] = {
  post: {
    ...common,
    summary: 'Sends out an invite to join a FreeSewing translation team',
    description:
      'Will trigger an invite to be sent out to the authenticated user that allows them to join a FreeSewing translation team',
    parameters: [parameters.auth],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              language: {
                description: `Language code of the translation team the user wants to join`,
                type: 'string',
                example: 'es',
                enum: ['es', 'de', 'fr', 'nl', 'uk'],
              },
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
          errorExamples(['languageMissing', 'languageInvalid']),
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
