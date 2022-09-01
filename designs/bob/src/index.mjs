import { Design } from '@freesewing/core'
import { name, version } from '../pkg.mjs'
import { bib } from './bib.mjs'

// Setup our new design
const Bob = new Design({
  name,
  version,
  parts: [ bib ],
})

//Named exports
export { bib, Bob }

