import { name, version } from '../package.json'
import bartack from './bartack'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-bartack') === false) {
        svg.attributes.set('freesewing:plugin-bartack', version)
      }
    }
  },
  macros: {
    bartack: function (so) {
      let self = this
      return bartack(so, self)
    },
    bartackAlong: function (so) {
      let self = this
      so.bartackAlong = true
      return bartack(so, self)
    },
    bartackFractionAlong: function (so) {
      let self = this
      so.bartackFractionAlong = true
      return bartack(so, self)
    }
  }
}
