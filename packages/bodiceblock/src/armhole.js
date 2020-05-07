import Armholewithoutdart from './armholewithoutdart'
import Armholewithdart from './armholewithdart'

export default part => {
  let { store, options } = part.shorthand()

  if (options.frontdart === 'no') return Armholewithoutdart(part)
  else return Armholewithdart(part)
}
