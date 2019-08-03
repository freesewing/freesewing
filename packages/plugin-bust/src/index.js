import { name, version } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preDraft: function({ settings }) {
      if (typeof settings.measurements.bust === 'undefined') {
        settings.measurements.bust = settings.measurements.chestCircumference
        settings.measurements.chestCircumference = settings.measurements.highBust
      }
    }
  }
}
