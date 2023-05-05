import { pluginBundle } from '@freesewing/plugin-bundle'
import { pctBasedOn } from '@freesewing/core'

function draft({ store, measurements, options, part }) {
  // Set values in the store for re-use
  const hips = measurements.hips * (1 + options.hipsEase)
  store.set('hips', hips)
  store.set('frontQuarterHips', (hips * options.frontHalf) / 2)
  store.set('backQuarterHips', (hips * (1 - options.frontHalf)) / 2)
  const seat = measurements.seat * (1 + options.seatEase)
  store.set('seat', seat)
  store.set('frontQuarterSeat', (seat * options.frontHalf) / 2)
  store.set('backQuarterSeat', (seat * (1 - options.frontHalf)) / 2)
  store.set('hipsToSeat', measurements.waistToSeat - measurements.waistToHips)
  store.set('hipsToUpperLeg', measurements.waistToUpperLeg - measurements.waistToHips)
  store.set('seatToUpperLeg', measurements.waistToUpperLeg - measurements.waistToSeat)
  // Never reduce a negative amount
  const reduce = (seat - hips) / 4
  store.set('hipsQuarterReduction', reduce > 0 ? reduce : 0)

  return part
}

export const shared = {
  name: 'shared',
  measurements: ['hips', 'seat', 'waistToHips', 'waistToSeat', 'waistToUpperLeg'],
  options: {
    // Constants
    frontHalf: 0.55,
    // Ease at the hips
    hipsEase: {
      pct: 0,
      min: -5,
      max: 5,
      menu: 'fit',
      ...pctBasedOn('hips'),
    },
    // Ease at the seat
    seatEase: {
      pct: 5,
      min: 0,
      max: 15,
      menu: 'fit',
      ...pctBasedOn('seat'),
    },
    // Minimal dart width
    minDartWidth: {
      pct: 2,
      min: 0.5,
      max: 4,
      menu: 'advanced',
      toAbs: (pct, settings) => {
        const result =
          (pct *
            settings.measurements.hips *
            (1 + settings.options.hipsEase) *
            (1 - settings.options.frontHalf)) /
          2
        console.log({ pct, settings, result })
        return result
      },
      fromAbs: (mm, settings) =>
        (settings.measurements.hips *
          (1 + settings.options.hipsEase) *
          (1 - settings.options.frontHalf)) /
        2 /
        mm,
    },
  },
  plugins: [pluginBundle],
  draft: draft,
}
