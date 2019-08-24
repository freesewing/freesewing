import withBreasts from './with-breasts'
import withoutBreasts from './without-breasts'

// This estimates a measurement based on the neck circumference
const neckstimate = (neckCircumference = false, measurement = false, breasts = false) => {
  const data = breasts ? withBreasts : withoutBreasts

  if (!neckCircumference)
    throw new Error('neckstimate() requires a neck circumference in mm as first parameter')
  if (!measurement || typeof data[measurement] === 'undefined') {
    throw new Error(
      'neckstimate() requires a valid measurement name as second parameter. (received ' +
        measurement +
        ')'
    )
  }

  return (
    data[measurement].base +
    (neckCircumference - data.neckCircumference.base) * data[measurement].slope
  )
}

export default neckstimate
