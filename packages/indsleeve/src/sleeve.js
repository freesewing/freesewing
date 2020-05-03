import Basicsleeve from './sleeve_basic'
import Flaredsleeve from './sleeve_flared'

export default part => {
  let { store, options } = part.shorthand()

  if (options.sleevetype === 'flared') return Flaredsleeve(part)
  else return Basicsleeve(part)
}
