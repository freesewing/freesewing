import straightWaistband from './straight-waistband'
import curvedWaistband from './curved-waistband'

export default (part) => {
  let { options } = part.shorthand()

  if (options.waistbandShape === 'curved') return curvedWaistband(part)
  else return straightWaistband(part)
}
