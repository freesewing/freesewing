import straightBarrelCuff from './cuff-barrel-straight'
import roundedBarrelCuff from './cuff-barrel-rounded'
import angledBarrelCuff from './cuff-barrel-angled'
import straightFrenchCuff from './cuff-french-straight'
import angledFrenchCuff from './cuff-french-angled'
import roundedFrenchCuff from './cuff-french-rounded'

export default (part) => {
  const { options } = part.shorthand()
  switch (options.cuffStyle) {
    case 'roundedBarrelCuff':
      return roundedBarrelCuff(part)
    case 'straightBarrelCuff':
      return straightBarrelCuff(part)
    case 'roundedFrenchCuff':
      return roundedFrenchCuff(part)
    case 'angledFrenchCuff':
      return angledFrenchCuff(part)
    case 'straightFrenchCuff':
      return straightFrenchCuff(part)
    default:
      return angledBarrelCuff(part)
  }
}
