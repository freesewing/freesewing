import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { bib } from './bib.mjs'

// Setup our new design
const Bob = new Design({
  data,
  parts: [ bib ],
})

//Named exports
export { bib, Bob }

