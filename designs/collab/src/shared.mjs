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

/*
 * Helper method like pctBasedOn, but using quarter hips for measurement
 */
const pctBasedOnQhips = () => ({
  toAbs: (value, { measurements }, mergedOptions) => value * (measurements.hips / 4),
  fromAbs: (value) => measurements.hips / 4 / value,
})

/*
 * Helper method like pctBasedOn, but using hips to upperleg
 */
const pctBasedOnHipsToUleg = () => ({
  toAbs: (value, { measurements }, mergedOptions) =>
    value * (measurements.waistToUpperLeg - measurements.waistToHips),
  fromAbs: (value) => (measurements.waistToUpperLeg - measurements.waistToHips) / value,
})

export const shared = {
  name: 'collab:shared',
  measurements: ['hips', 'seat', 'waistToHips', 'waistToSeat', 'waistToUpperLeg'],
  hide: { self: true },
  options: {
    // Fit options

    /*
     * Amount of ease at the hips.
     * By default this has no ease + elasticated waist (partially) because this
     * is supposed to support cargo without sliding down. (belt is better, but still).
     */
    hipsEase: {
      pct: 0,
      min: -5,
      max: 5,
      menu: 'fit',
      ...pctBasedOn('hips'),
    },

    /*
     * Amount of ease at the seat.
     * Needs to be sufficient to allow dexterity but not so much that it's to flared
     */
    seatEase: {
      pct: 5,
      min: 0,
      max: 15,
      menu: 'fit',
      ...pctBasedOn('seat'),
    },

    // Style options
    /*
     * The length as a percentage of the hips to upper leg measurements
     */
    length: {
      pct: 40,
      min: 0,
      max: 80,
      menu: 'style',
      toAbs: (value, { measurements }, mergedOptions) =>
        (1 + value) * (measurements.waistToUpperLeg - measurements.waistToHips),
      fromAbs: (value) => (measurements.waistToUpperLeg - measurements.waistToHips) / (1 + value),
    },

    waistbandWidth: {
      pct: 4.4,
      min: 2,
      max: 10,
      menu: 'style',
      ...pctBasedOn('hips'),
    },

    beltloopWidth: {
      pct: 40,
      min: 20,
      max: 60,
      menu: 'style',
      toAbs: (value, { measurements }, mergedOptions) =>
        value * measurements.hips * mergedOptions.waistbandWidth,
      fromAbs: (value) => (measurements.hips * mergedOptions.waistbandWidth) / value,
    },

    // Pocket options

    /*
     * Controls the curvature of the front pocket opening
     */
    frontPocketOpeningBend: {
      pct: 80,
      min: 0,
      max: 100,
      menu: 'pockets',
    },

    /*
     * Controls the depth of the front pocket opening as a factor of
     * waistToUpperLeg - waistToHip
     */
    frontPocketOpeningDepth: {
      pct: 33,
      min: 25,
      max: 45,
      menu: 'pockets',
      ...pctBasedOnQhips(),
    },

    // Pocket options
    backPocketHeight: {
      pct: 70,
      min: 60,
      max: 85,
      menu: 'pockets',
    },
    frontPocketOpeningStart: {
      pct: 33,
      min: 25,
      max: 45,
      menu: 'pockets',
      ...pctBasedOnQhips(),
    },

    // Width of the front attachment
    frontAttachmentWidth: {
      pct: 95,
      min: 80,
      max: 110,
      menu: 'pockets',
    },
    pocketChamferSize: {
      pct: 15,
      min: 5,
      max: 25,
      menu: 'pockets',
    },

    // Advanced options

    /*
     * The dart length.
     * Is a factor between the distance between the hipline and seatline
     */
    dartLength: {
      pct: 65,
      min: 40,
      max: 85,
      menu: 'advanced',
      toAbs: (value, { measurements }, mergedOptions) =>
        value * (measurements.waistToSeat - measurements.waistToHips),
      fromAbs: (value) => (measurements.waistToSeat - measurements.waistToHips) / value,
    },

    /*
     * The dart width.
     * Doesn't influence fit, but rather determines how much shaping is done in the darts
     */
    dartWidth: {
      pct: 5,
      min: 4,
      max: 8,
      menu: 'advanced',
      ...pctBasedOnQhips(),
    },

    /*
     * The fly length.
     */
    flyLength: {
      pct: 75,
      min: 50,
      max: 85,
      menu: 'advanced',
      ...pctBasedOnHipsToUleg(),
    },
    /*
     * The fly width.
     */
    flyWidth: {
      pct: 16,
      min: 10,
      max: 22,
      menu: 'advanced',
      ...pctBasedOnQhips(),
    },

    /*
     *  Percentage of the full circumference that should be made up
     *  by the front panels. Increasing this will shift the side seams
     *  to the back, which increases space for the pockets. However if
     *  you shift them too far, the pocket opening sits too far to the
     *  side and becomes difficult to access. The default 60% is a good
     *  average.
     */
    frontHalf: {
      pct: 55,
      min: 50,
      max: 60,
      menu: 'advanced',
    },

    /*
     * Curvature of the J-Seam bend
     */
    jseamBend: {
      pct: 65,
      min: 50,
      max: 100,
      menu: 'advanced',
    },

    /*
     * Minimal dart width. Below this width, we don't create darts but
     * instead do all shaping in the side seams.
     */
    minDartWidth: {
      pct: 2,
      min: 0.5,
      max: 4,
      menu: 'advanced',
      toAbs: (pct, settings, mergedOptions) =>
        (pct *
          settings.measurements.hips *
          (1 + mergedOptions.hipsEase) *
          (1 - mergedOptions.frontHalf)) /
        2,
      fromAbs: (mm, settings) =>
        (settings.measurements.hips *
          (1 + settings.options.hipsEase) *
          (1 - settings.options.frontHalf)) /
        2 /
        mm,
    },
    /*
     * How much the waist should slant downward at the front (and up at the back)
     * This is based on a model with a perfectly horizontal waistline.
     * However, people who -- as Sir Mix A Lot would say -- got (more) back benefit
     * from a sloped waistline that raises up at teh back and dips lower at the front.
     * This option facilitates that.
     */
    waistSlant: {
      pct: 0,
      min: 0,
      max: 2,
      menu: 'advanced',
      ...pctBasedOn('hips'),
    },

    /*
     * How much the waistband should overlap at the front
     * Typically, this works fine when it's the same value as waistbandWidth
     * However, users who opt for a very wide waistband may want to lower this
     */
    waistbandOverlap: {
      pct: 100,
      min: 50,
      max: 120,
      menu: 'advanced',
      toAbs: (pct, { measurements }, mergedOptions) =>
        pct * mergedOptions.waistbandWidth * measurements.hips,
    },
  },
  plugins: [pluginBundle],
  draft: draft,
}
