import pkg from '../package.json' assert { type: 'json' }
import scalebox from './scalebox'
import miniscale from './miniscale'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-scalebox', pkg.version),
  },
  macros: { scalebox, miniscale },
}
