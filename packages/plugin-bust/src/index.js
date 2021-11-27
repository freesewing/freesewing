import { name, version } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-bust', version),
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
