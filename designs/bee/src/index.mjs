import { Design } from '@freesewing/core'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { name, version } from '../pkg.mjs'
import { cup } from './cup.mjs'
import { neckTie } from './neck-tie.mjs'
import { bandTie } from './band-tie.mjs'

const Bee = new Design({
  name,
  version,
  parts: [ cup, neckTie, bandTie ],
  plugins: pluginBundle,
})

export { cup, neckTie, bandTie, Bee }

