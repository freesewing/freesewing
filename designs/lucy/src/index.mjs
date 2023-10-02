import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { pocket } from './pocket.mjs'

// Setup our new design
const Lucy = new Design({ data, parts: [pocket] })

// Named exports
export { pocket, Lucy, i18n }
