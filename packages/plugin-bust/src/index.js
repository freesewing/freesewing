import { name, version } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-bust') === false) {
        svg.attributes.set('freesewing:plugin-bust', version)
      }
    },
    preDraft: function ({ settings }) {
      if (typeof settings.measurements.bust === 'undefined') {
        settings.measurements.bust = settings.measurements.chest
        settings.measurements.chest = settings.measurements.highBust
      }
    },
  },
}
