import withBreasts from './with-breasts'
import withoutBreasts from './without-breasts'

// This estimates a measurement based on the neck circumference
const neckstimate = (neckCircumference = false, measurement = false, breasts = false) => {
  const data = breasts ? withBreasts : withoutBreasts

  if (!neckCircumference)
    throw new Error('neckstimate() requires a neck circumference in mm as first parameter')
  if (!measurement) {
    // No measurement passed
    throw new Error(
      'new neckstimate() requires a valid measurement name as second parameter. (received ' +
        JSON.stringify(measurement) +
        ')'
    )
  }
  if (typeof data[measurement] === 'undefined') {
    // Unknown measurement passed
    if (typeof withBreasts[measurement] === 'undefined') {
      // Fully unknown
      throw new Error(
        'neckstimate() requires a valid measurement name as second parameter. (received ' +
          measurement +
          ')'
      )
    } else {
      // This is a breasts measurements on a no-breasts model
      // Let's at least warn the user
      console.log(
        'WARNING: You used neckstimate to calculate the ' +
          measurement +
          ' measurement, but this model has no breasts.'
      )
      return (
        withBreasts[measurement].base +
        (neckCircumference - withBreasts.neckCircumference.base) * withBreasts[measurement].slope
      )
    }
  }

  // This is what should happen
  return (
    data[measurement].base +
    (neckCircumference - data.neckCircumference.base) * data[measurement].slope
  )
}

export default neckstimate
