import freesewing from '@freesewing/core'
import Ursula from '@freesewing/ursula'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftFront from './front'
import draftBack from './back'
import draftGusset from './gusset'

// Create new design
const Unice = new freesewing.Design(config, plugins)

// Attache Ursula parts that we will extend
for (const name of ['Back', 'Front', 'Gusset']) {
  Unice.prototype[`draftUrsula${name}`] = function (part) {
    return new Ursula(this.settings)[`draft${name}`](part)
  }
}

// Attach Ursula part that we'll use as-is
Unice.prototype.draftElastic = function (part) {
  return new Ursula(this.settings).draftElastic(part)
}
Unice.prototype.draftFront2 = function (part) {
  return new Ursula(this.settings).draftFront2(part)
}
Unice.prototype.draftBack2 = function (part) {
  return new Ursula(this.settings).draftBack2(part)
}
Unice.prototype.draftGusset2 = function (part) {
  return new Ursula(this.settings).draftGusset2(part)
}


// Attach our own draft methods to the prototype
Unice.prototype.draftFront = draftFront
Unice.prototype.draftBack = draftBack
Unice.prototype.draftGusset = draftGusset

// Named exports
export { config, Unice }

// Default export
export default Unice
