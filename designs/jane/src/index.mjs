import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { body } from './body.mjs'
import { sleeve } from './sleeve.mjs'
import { gusset } from './gusset.mjs'
import { i18n } from '../i18n/index.mjs'

// Create new design
const Jane = new Design({
  data: about,
  parts: [body, sleeve, gusset],
})

export { body, sleeve, gusset, Jane, i18n, about }
