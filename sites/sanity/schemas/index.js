import { contentimg } from './img.js'
import { userimg } from './avatar.js'
import { blogSchemaBuilder } from './blog.js'
import { showcaseSchemaBuilder } from './showcase.js'
import { newsletter } from './newsletter.js'

const languages = ['en', 'es', 'fr', 'nl', 'de']

export const schemaTypes = [
  contentimg,
  userimg,
  newsletter,
  ...languages.map((lang) => blogSchemaBuilder(lang)),
  ...languages.map((lang) => showcaseSchemaBuilder(lang)),
]
