import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  hooks: {
    preDraft: function ({ settings }) {
      for (const set of settings) {
        if (set.measurements) {
          if (
            typeof set.measurements.seatBack !== 'undefined' &&
            typeof set.measurements.seat !== 'undefined'
          ) {
            set.measurements.seatFront = set.measurements.seat - set.measurements.seatBack
            set.measurements.seatBackArc = set.measurements.seatBack / 2
            set.measurements.seatFrontArc = set.measurements.seatFront / 2
          }
          if (
            typeof set.measurements.waist !== 'undefined' &&
            typeof set.measurements.waistBack !== 'undefined'
          ) {
            set.measurements.waistFront = set.measurements.waist - set.measurements.waistBack
            set.measurements.waistBackArc = set.measurements.waistBack / 2
            set.measurements.waistFrontArc = set.measurements.waistFront / 2
          }
          if (
            typeof set.measurements.crossSeam !== 'undefined' &&
            typeof set.measurements.crossSeamFront !== 'undefined'
          ) {
            set.measurements.crossSeamBack =
              set.measurements.crossSeam - set.measurements.crossSeamFront
          }
        }
      }
    },
  },
}

// More specifically named exports
export const measurementsPlugin = plugin
export const pluginMeasurements = plugin
