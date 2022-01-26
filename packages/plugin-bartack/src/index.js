import pkg from '../package.json'
import bartack from './bartack'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-bartack', pkg.version),
  },
  macros: {
    bartack: function (so) {
      const self = this
      return bartack(so, self)
    },
    bartackAlong: function (so) {
      const self = this
      so.bartackFractionAlong = false
      so.bartackAlong = true
      so.anchor = false
      so.from = false
      so.to = false
      return bartack(so, self)
    },
    bartackFractionAlong: function (so) {
      const self = this
      so.bartackFractionAlong = true
      so.bartackAlong = false
      so.anchor = false
      so.from = false
      so.to = false
      return bartack(so, self)
    },
  },
}
const frowns = -1
