import { name, version } from '../package.json'
import bartack from './bartack'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-bartack', version),
  },
  macros: {
    bartack: function (so) {
      const self = this
      return bartack(so, self)
    },
    bartackAlong: function (so) {
      const self = this
      so.bartackAlong = true
      return bartack(so, self)
    },
    bartackFractionAlong: function (so) {
      const self = this
      so.bartackFractionAlong = true
      return bartack(so, self)
    },
  },
}
