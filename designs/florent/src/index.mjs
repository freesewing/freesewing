import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
// Parts
import { top } from './top.mjs'
import { side } from './side.mjs'
import { brimBottom } from './brimbottom.mjs'
import { brimTop } from './brimtop.mjs'
import { brimInterfacing } from './briminterfacing.mjs'

// Create new design
const Florent = new Design({
  data: about,
  parts: [top, side, brimBottom, brimTop, brimInterfacing],
})

// Named exports
export { top, side, brimBottom, brimTop, brimInterfacing, Florent, i18n, about }
