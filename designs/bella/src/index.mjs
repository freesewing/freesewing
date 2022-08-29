import { Design } from '@freesewing/core'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { name, version } from '../pkg.mjs'
import { back } from './back.mjs'
import { frontSideDart } from './front-side-dart.mjs'

const Bella = new Design({
  name,
  version,
  parts: [ back, frontSideDart ],
  plugins: pluginBundle,
})

export { back, frontSideDart, Bella }

