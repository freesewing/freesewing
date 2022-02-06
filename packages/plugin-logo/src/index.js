import logo from './logo'
import pkg from '../package.json'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => {
      if (svg.attributes.get('freesewing:plugin-logo') === false) {
        svg.attributes.set('freesewing:plugin-logo', pkg.version)
        svg.defs += logo
      }
    },
  },
}
