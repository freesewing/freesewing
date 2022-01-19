import { version, name } from '../package.json'
import scalebox from './scalebox'
import miniscale from './miniscale'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-scalebox', version),
  },
  macros: { scalebox, miniscale },
}
