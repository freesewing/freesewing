import { draftStraightWaistband } from './straight-waistband.mjs'
import { draftCurvedWaistband } from './curved-waistband.mjs'

const sandyWaistband = (part) => {
  const { options } = part.shorthand()

  if (options.waistbandShape === 'curved') return draftCurvedWaistband(part)
  else return draftStraightWaistband(part)
}

export const waistband = {
  name: 'sandy.waistband',
  draft: sandyWaistband,
}
