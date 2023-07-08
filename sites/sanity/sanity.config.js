import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { markdownSchema } from 'sanity-plugin-markdown'
import { schemaTypes } from './schemas'
import { capitalize } from '../shared/utils.mjs'

export default defineConfig(
  ['site-content', 'user-content'].map((dataset) => ({
    name: dataset,
    title: `FreeSewing ${dataset
      .split('-')
      .map((word) => capitalize(word))
      .join(' ')}`,
    projectId: 'hl5bw8cj',
    dataset,
    basePath: `/${dataset}`,
    plugins: [deskTool(), visionTool(), markdownSchema()],
    schema: { types: schemaTypes },
  }))
)
