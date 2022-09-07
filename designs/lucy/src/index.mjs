import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { pocket } from './pocket.mjs'

// Setup our new design
const Lucy = new Design({ data, parts: [ pocket ] })

// Named exports
export { pocket, Lucy }
