import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { body } from './body.mjs'
import { sleeve } from './sleeve.mjs'
import { gusset } from './gusset.mjs'
import { i18n } from '../i18n/index.mjs'

// Create new design
const Jane = new Design({
  data,
  parts: [body, sleeve, gusset],
})

export { body, sleeve, gusset, i18n, Jane }
