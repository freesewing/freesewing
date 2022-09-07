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

const simonCuff = (part) => {
  const { options } = part.shorthand()
  switch (options.cuffStyle) {
    case 'roundedBarrelCuff':
      return draftRoundedBarrelCuff(part)
    case 'straightBarrelCuff':
      return draftStraightBarrelCuff(part)
    case 'roundedFrenchCuff':
      return draftRoundedFrenchCuff(part)
    case 'angledFrenchCuff':
      return draftAngledFrenchCuff(part)
    case 'straightFrenchCuff':
      return draftStraightFrenchCuff(part)
    default:
      return draftAngledBarrelCuff(part)
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
