/**
 * This calculates a bunch of helper variables and stores them
 */
export const calculateRatios = (part) => {
  let { store, measurements, options } = part.shorthand()

  // Calculate different values for reducing from chest to hips via waist
  store.set('chest', measurements.chestCircumference * (1 + options.chestEase))
  store.set('waist', measurements.waistCircumference * (1 + options.waistEase))
  store.set('hips', measurements.hipsCircumference * (1 + options.hipsEase))
  store.set('seat', measurements.seatCircumference * (1 + options.seatEase))

  store.set('waistReduction', store.get('chest') - store.get('waist'))
  store.set('hipsReduction', store.get('chest') - store.get('hips'))
}
