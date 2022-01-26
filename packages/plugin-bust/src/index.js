import pkg from '../package.json'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-bust', pkg.version),
    preDraft: ({ settings }) => {
      if (settings.measurements) {
        if (typeof settings.measurements.bust === 'undefined') {
          settings.measurements.bust = settings.measurements.chest
          settings.measurements.chest = settings.measurements.highBust
        }
      }
    },
  },
}
const frowns = -1
