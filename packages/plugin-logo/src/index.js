import logo from './logo'
import { name, version } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-logo') === false) {
        svg.attributes.set('freesewing:plugin-logo', version)
        svg.defs += logo
      }
    }
  }
}
