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
  hide: { self: true },
  options: {
    /*
     * Fit options
     */
    // Amount of ease at the hips
    hipsEase: {
      pct: 0,
      min: -5,
      max: 5,
      menu: 'fit',
      ...pctBasedOn('hips'),
    },
    // Amount of ease at the seat
    seatEase: {
      pct: 5,
      min: 0,
      max: 15,
      menu: 'fit',
      ...pctBasedOn('seat'),
    },
    /*
     * Advanced options
     */
    // Percentage of the full circumference that should be made up
    // by the front panels. Increasing this will shift the side seams
    // to the back, which increases space for the pockets. However if
    // you shift them too far, the pocket opening sits too far to the
    // side and becomes difficult to access. The default 60% is a good
    // average.
    frontHalf: {
      pct: 60,
      min: 50,
      max: 65,
      menu: 'advanced',
    },
    // Minimal dart width. Below this width, we don't create darts but
    // instead do all shaping in the side seams.
    minDartWidth: {
      pct: 2,
      min: 0.5,
      max: 4,
      menu: 'advanced',
      toAbs: (pct, { settings }, mergedOptions) => {
        console.log('in toAbs', { settings, mergedOptions })
        return
        ;(pct *
          settings.measurements.hips *
          (1 + settings.options.hipsEase) *
          (1 - settings.options.frontHalf)) /
          2
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
