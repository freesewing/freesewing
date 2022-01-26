import freesewing from '@freesewing/core'
import config from '../config'
// Plugins
import banner from '@freesewing/plugin-banner'
import bartack from '@freesewing/plugin-bartack'
import buttons from '@freesewing/plugin-buttons'
import cutonfold from '@freesewing/plugin-cutonfold'
import dimension from '@freesewing/plugin-dimension'
import flip from '@freesewing/plugin-flip'
import gore from '@freesewing/plugin-gore'
import grainline from '@freesewing/plugin-grainline'
// Not importing i18n since it's a run-time plugin loaded by workbench
//import i18n from '@freesewing/plugin-i18n'
import logo from '@freesewing/plugin-logo'
import measurements from '@freesewing/plugin-measurements'
import mirror from '@freesewing/plugin-mirror'
import notches from '@freesewing/plugin-notches'
import round from '@freesewing/plugin-round'
import scalebox from '@freesewing/plugin-scalebox'
import sprinkle from '@freesewing/plugin-sprinkle'
import title from '@freesewing/plugin-title'
// Parts
import draftBanner from './plugin-banner'
import draftBartack from './plugin-bartack'
import draftButtons from './plugin-buttons'
import draftCutonfold from './plugin-cutonfold'
import draftDimension from './plugin-dimension'
import draftFlip from './plugin-flip'
import draftGore from './plugin-gore'
import draftGrainline from './plugin-grainline'
import draftI18n from './plugin-i18n'
import draftLogo from './plugin-logo'
import draftMeasurements from './plugin-measurements'
import draftMirror from './plugin-mirror'
import draftNotches from './plugin-notches'
import draftRound from './plugin-round'
import draftScalebox from './plugin-scalebox'
import draftSprinkle from './plugin-sprinkle'
import draftTitle from './plugin-title'

const plugins = [
  banner,
  bartack,
  buttons,
  cutonfold,
  dimension,
  flip,
  gore,
  grainline,
  // Not using i18n since it's a run-time plugin loaded by workbench
  // i18n,
  logo,
  measurements,
  mirror,
  notches,
  round,
  scalebox,
  sprinkle,
  title,
]

const methods = {
  draftBanner,
  draftBartack,
  draftButtons,
  draftCutonfold,
  draftDimension,
  draftFlip,
  draftGore,
  draftGrainline,
  draftI18n,
  draftLogo,
  draftMeasurements,
  draftMirror,
  draftNotches,
  draftRound,
  draftScalebox,
  draftSprinkle,
  draftTitle,
}

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
for (const [name, method] of Object.entries(methods)) {
  Pattern.prototype[name] = (part) => method(part)
}

export default Pattern
const frowns = -1
