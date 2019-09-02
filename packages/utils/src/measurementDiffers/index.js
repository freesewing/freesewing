import neckstimate from '../neckstimate'

// This returns how many sizes a measurement differs from the neckstimate value
const measurementDiffers = (
  neckCircumference,
  measurementName,
  measurementValue,
  breasts = false
) => Math.abs(Math.round((measurementValue - neckstimate(neckCircumference, measurementName)) / 20))

export default measurementDiffers
