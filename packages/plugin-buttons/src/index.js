import button from './button'
import buttonhole from './buttonhole'
import snaps from './snaps'
import { name, version } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-buttons') === false)
        svg.attributes.set('freesewing:plugin-buttons', version)
      svg.defs += button + buttonhole + snaps
    }
  }
}
