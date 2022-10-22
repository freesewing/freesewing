import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import { blogSchemaBuilder } from './blog.js'
import { showcaseSchemaBuilder } from './showcase.js'
import { newsletter } from './newsletter.js'

const languages = ['en', 'nl', 'de', 'es', 'fr']

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    ...languages.map(lang => blogSchemaBuilder(lang)),
    ...languages.map(lang => showcaseSchemaBuilder(lang)),
    newsletter,
  ]),
})
