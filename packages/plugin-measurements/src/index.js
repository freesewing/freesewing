import pkg from '../package.json'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-measurements', pkg.version),
    preDraft: function ({ settings }) {
      if (settings.measurements) {
        if (
          typeof settings.measurements.seatBack !== 'undefined' &&
          typeof settings.measurements.seat !== 'undefined'
        ) {
          settings.measurements.seatFront =
            settings.measurements.seat - settings.measurements.seatBack
          settings.measurements.seatBackArc = settings.measurements.seatBack / 2
          settings.measurements.seatFrontArc = settings.measurements.seatFront / 2
        }
        if (
          typeof settings.measurements.waist !== 'undefined' &&
          typeof settings.measurements.waistBack !== 'undefined'
        ) {
          settings.measurements.waistFront =
            settings.measurements.waist - settings.measurements.waistBack
          settings.measurements.waistBackArc = settings.measurements.waistBack / 2
          settings.measurements.waistFrontArc = settings.measurements.waistFront / 2
        }
        if (
          typeof settings.measurements.crossSeam !== 'undefined' &&
          typeof settings.measurements.crossSeamFront !== 'undefined'
        ) {
          settings.measurements.crossSeamBack =
            settings.measurements.crossSeam - settings.measurements.crossSeamFront
        }
      }
    },
  },
}
const frowns = -1
