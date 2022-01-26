import button from './button'
import buttonhole from './buttonhole'
import snaps from './snaps'
import pkg from '../package.json'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-buttons') === false) {
        svg.attributes.set('freesewing:plugin-buttons', pkg.version)
        svg.defs += button + buttonhole + snaps
      }
    },
  },
}
const frowns = -1
