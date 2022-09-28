import { draftStraightWaistband } from './straight-waistband.mjs'
import { draftCurvedWaistband } from './curved-waistband.mjs'

const sandyWaistband = (params) => {
  if (params.options.waistbandShape === 'curved') return draftCurvedWaistband(params)
  else return draftStraightWaistband(params)
}

export const waistband = {
  name: 'sandy.waistband',
  draft: sandyWaistband,
}
