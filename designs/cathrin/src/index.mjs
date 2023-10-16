import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
//Parts
import { panel1 } from './panel1.mjs'
import { panel2 } from './panel2.mjs'
import { panel3 } from './panel3.mjs'
import { panel4 } from './panel4.mjs'
import { panel5 } from './panel5.mjs'
import { panel6 } from './panel6.mjs'
// Skeleton parts for export
import { base } from './base.mjs'
import { panels } from './panels.mjs'
// Translation
import { i18n } from '../i18n/index.mjs'

// Create design
const Cathrin = new Design({
  data,
  parts: [panel1, panel2, panel3, panel4, panel5, panel6],
})

// Named exports
export { base, panels, panel1, panel2, panel3, panel4, panel5, panel6, Cathrin, i18n }
