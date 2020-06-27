import { version, name } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preDraft: function ({ settings }) {
      if (
        typeof settings.measurements.backSeat !== 'undefined' &&
        typeof settings.measurements.seatCircumference !== 'undefined'
      ) {
        settings.measurements.frontSeat =
          settings.measurements.seatCircumference - settings.measurements.backSeat
        settings.measurements.backSeatArc = settings.measurements.backSeat / 2
        settings.measurements.frontSeatArc = settings.measurements.frontSeat / 2
      }
      if (
        typeof settings.measurements.waistCircumference !== 'undefined' &&
        typeof settings.measurements.backWaist !== 'undefined'
      ) {
        settings.measurements.backWaistArc = settings.measurements.backWaist / 2
        settings.measurements.frontWaistArc =
          (settings.measurements.waistCircumference - settings.measurements.backWaist) / 2
      }
      if (
        typeof settings.measurements.crossSeam !== 'undefined' &&
        typeof settings.measurements.frontCrossSeam !== 'undefined'
      ) {
        settings.measurements.backCrossSeam =
          settings.measurements.crossSeam - settings.measurements.frontCrossSeam
      }
    }
  }
}
