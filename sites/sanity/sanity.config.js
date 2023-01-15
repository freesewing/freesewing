import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { markdownSchema } from 'sanity-plugin-markdown'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'FreeSewing',

  projectId: 'hl5bw8cj',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), markdownSchema()],

  schema: {
    types: schemaTypes,
  },
})
