import { draftStraightBarrelCuff } from './cuff-barrel-straight.mjs'
import { draftRoundedBarrelCuff } from './cuff-barrel-rounded.mjs'
import { draftAngledBarrelCuff } from './cuff-barrel-angled.mjs'
import { draftStraightFrenchCuff } from './cuff-french-straight.mjs'
import { draftAngledFrenchCuff } from './cuff-french-angled.mjs'
import { draftRoundedFrenchCuff } from './cuff-french-rounded.mjs'
import {
  cuffOverlap,
  barrelCuffNarrowButton,
  cuffButtonRows,
  cuffDrape,
  cuffEase,
  cuffLength,
  cuffStyle,
} from './options.mjs'

const simonCuff = (params) => {
  switch (params.options.cuffStyle) {
    case 'roundedBarrelCuff':
      return draftRoundedBarrelCuff(params)
    case 'straightBarrelCuff':
      return draftStraightBarrelCuff(params)
    case 'roundedFrenchCuff':
      return draftRoundedFrenchCuff(params)
    case 'angledFrenchCuff':
      return draftAngledFrenchCuff(params)
    case 'straightFrenchCuff':
      return draftStraightFrenchCuff(params)
    default:
      return draftAngledBarrelCuff(params)
  }
}

export const cuff = {
  name: 'simon.cuff',
  options: {
    cuffOverlap,
    barrelCuffNarrowButton,
    cuffButtonRows,
    cuffDrape,
    cuffEase,
    cuffLength,
    cuffStyle,
  },
  draft: simonCuff,
}
