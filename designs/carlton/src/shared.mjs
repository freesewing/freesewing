/**
 * This calculates a bunch of helper variables and stores them
 */
export const calculateRatios = (part) => {
  let { store, measurements, options } = part.shorthand()

  // Calculate different values for reducing from chest to hips via waist
  store.set('chest', measurements.chest * (1 + options.chestEase))
  store.set('waist', measurements.waist * (1 + options.waistEase))
  store.set('seat', measurements.seat * (1 + options.seatEase))

  store.set('waistReduction', store.get('chest') - store.get('waist'))
}
