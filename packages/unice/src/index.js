import freesewing from '@freesewing/core'
import Ursula from '@freesewing/ursula'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftFront from './front'
import draftBack from './back'
import draftGusset from './gusset'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attache Ursula parts that we will extend
for (const name of ['Back', 'Front', 'Gusset']) {
  Pattern.prototype[`draftUrsula${name}`] = function (part) {
    return new Ursula(this.settings)[`draft${name}`](part)
  }
}

// Attach Ursula part that we'll use as-is
Pattern.prototype.draftElastic = function (part) {
  return new Ursula(this.settings).draftElastic(part)
}

// Attach our own draft methods to the prototype
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftGusset = draftGusset

export default Pattern
