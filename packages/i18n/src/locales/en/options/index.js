import florence from './florence.yml'
import brian from './brian.yml'
import bella from './bella.yml'
import breanna from './breanna.yml'
import diana from './diana.yml'
import aaron from './aaron.yml'
import simon from './simon.yml'
import simone from './simone.yml'
import sven from './sven.yml'
import wahid from './wahid.yml'
import bent from './bent.yml'
import bruce from './bruce.yml'
import cathrin from './cathrin.yml'
import holmes from './holmes.yml'
import huey from './huey.yml'
import hugo from './hugo.yml'
import tamiko from './tamiko.yml'
import teagan from './teagan.yml'
import trayvon from './trayvon.yml'
import jaeger from './jaeger.yml'
import carlton from './carlton.yml'
import carlita from './carlita.yml'
import benjamin from './benjamin.yml'
import florent from './florent.yml'
import theo from './theo.yml'
import sandy from './sandy.yml'
import shelly from './shelly.yml'
import shin from './shin.yml'
import penelope from './penelope.yml'
import waralee from './waralee.yml'
import titan from './titan.yml'
import paco from './paco.yml'
import albert from './albert.yml'
import hortensia from './hortensia.yml'
import cornelius from './cornelius.yml'
import charlie from './charlie.yml'
import ursula from './ursula.yml'
import lunetius from './lunetius.yml'
import tiberius from './tiberius.yml'
import walburga from './walburga.yml'
import bee from './bee.yml'
import hi from 'hi.yml'
import unice from 'unice.yml'
import lucy from 'lucy.yml'
import bob from 'bob.yml'
import noble from 'noble.yml'
import octoplushy from 'octoplushy.yml'
import { options as optionList } from '@freesewing/pattern-info'
import shared from '../../../shared-options.yml'

let patterns = {
  florence,
  bella,
  brian,
  breanna,
  diana,
  aaron,
  simon,
  simone,
  sven,
  wahid,
  bent,
  bruce,
  cathrin,
  huey,
  hugo,
  tamiko,
  trayvon,
  jaeger,
  carlton,
  carlita,
  benjamin,
  florent,
  theo,
  sandy,
  shelly,
  shin,
  penelope,
  waralee,
  holmes,
  titan,
  paco,
  teagan,
  albert,
  hortensia,
  cornelius,
  charlie,
  ursula,
  yuri: false,
  lunetius,
  tiberius,
  walburga,
  bee,
  hi,
  unice,
  lucy,
  bob,
  noble,
  octoplushy,
}

let options = {}
for (let pattern in patterns) {
  options[pattern] = {}
  if (typeof optionList[pattern] === 'undefined')
    throw new Error('pattern ' + pattern + ' has no option list')
  for (let option of optionList[pattern]) {
    let value = patterns[pattern][option]
    if (typeof value === 'object') options[pattern][option] = value
    else {
      if (typeof value === 'undefined') {
        if (shared[pattern]) {
          if (shared[pattern].dflt && typeof patterns[shared[pattern].dflt][option] === 'object') {
            options[pattern][option] = patterns[shared[pattern].dflt][option]
          } else if (
            typeof shared[pattern].other !== 'undefined' &&
            typeof shared[pattern].other[option] === 'string'
          ) {
            options[pattern][option] = patterns[shared[pattern].other[option]][option]
          } else {
            throw new Error(`No option translation found for ${option} in ${pattern}`)
          }
        }
      }
    }
  }
}

export default options
