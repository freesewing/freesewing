import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { top } from './top.mjs'

// Setup our new design
const Tamiko = new Design({
  data,
  parts: [top],
})

// Named exports
export { top, Tamiko, i18n }
