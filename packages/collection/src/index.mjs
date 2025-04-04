// Designs
import { Aaron as aaron } from '@freesewing/aaron'
import { Albert as albert } from '@freesewing/albert'
import { Bee as bee } from '@freesewing/bee'
import { Bella as bella } from '@freesewing/bella'
import { Benjamin as benjamin } from '@freesewing/benjamin'
import { Bent as bent } from '@freesewing/bent'
import { Bibi as bibi } from '@freesewing/bibi'
import { Bob as bob } from '@freesewing/bob'
import { Bonny as bonny } from '@freesewing/bonny'
import { Breanna as breanna } from '@freesewing/breanna'
import { Brian as brian } from '@freesewing/brian'
import { Bruce as bruce } from '@freesewing/bruce'
import { Carlita as carlita } from '@freesewing/carlita'
import { Carlton as carlton } from '@freesewing/carlton'
import { Cathrin as cathrin } from '@freesewing/cathrin'
import { Charlie as charlie } from '@freesewing/charlie'
import { Cornelius as cornelius } from '@freesewing/cornelius'
import { Diana as diana } from '@freesewing/diana'
import { Florence as florence } from '@freesewing/florence'
import { Florent as florent } from '@freesewing/florent'
import { Gozer as gozer } from '@freesewing/gozer'
import { Hi as hi } from '@freesewing/hi'
import { Holmes as holmes } from '@freesewing/holmes'
import { Hortensia as hortensia } from '@freesewing/hortensia'
import { Huey as huey } from '@freesewing/huey'
import { Hugo as hugo } from '@freesewing/hugo'
import { Jaeger as jaeger } from '@freesewing/jaeger'
import { Jane as jane } from '@freesewing/jane'
import { Lily as lily } from '@freesewing/lily'
import { Lucy as lucy } from '@freesewing/lucy'
import { Lumina as lumina } from '@freesewing/lumina'
import { Lumira as lumira } from '@freesewing/lumira'
import { Lunetius as lunetius } from '@freesewing/lunetius'
import { Noble as noble } from '@freesewing/noble'
import { Octoplushy as octoplushy } from '@freesewing/octoplushy'
import { Onyx as onyx } from '@freesewing/onyx'
import { Opal as opal } from '@freesewing/opal'
import { Otis as otis } from '@freesewing/otis'
import { Paco as paco } from '@freesewing/paco'
import { Penelope as penelope } from '@freesewing/penelope'
import { Sandy as sandy } from '@freesewing/sandy'
import { Shelly as shelly } from '@freesewing/shelly'
import { Shin as shin } from '@freesewing/shin'
import { Simon as simon } from '@freesewing/simon'
import { Simone as simone } from '@freesewing/simone'
import { Skully as skully } from '@freesewing/skully'
import { Sven as sven } from '@freesewing/sven'
import { Tamiko as tamiko } from '@freesewing/tamiko'
import { Teagan as teagan } from '@freesewing/teagan'
import { Tiberius as tiberius } from '@freesewing/tiberius'
import { Titan as titan } from '@freesewing/titan'
import { Trayvon as trayvon } from '@freesewing/trayvon'
import { Tristan as tristan } from '@freesewing/tristan'
import { Uma as uma } from '@freesewing/uma'
import { Umbra as umbra } from '@freesewing/umbra'
import { Wahid as wahid } from '@freesewing/wahid'
import { Walburga as walburga } from '@freesewing/walburga'
import { Waralee as waralee } from '@freesewing/waralee'
import { Yuri as yuri } from '@freesewing/yuri'
// Translations
import { i18n as translations } from './i18n.mjs'
// Examples
import { designExampleIds, designExampleHrefs } from './examples.mjs'

/*
 * Export the designs themselves
 */
export const designs = {
  aaron,
  albert,
  bee,
  bella,
  benjamin,
  bent,
  bibi,
  bob,
  breanna,
  brian,
  bruce,
  carlita,
  carlton,
  cathrin,
  charlie,
  cornelius,
  diana,
  florence,
  florent,
  gozer,
  hi,
  holmes,
  hortensia,
  huey,
  hugo,
  jaeger,
  jane,
  lily,
  lucy,
  lumina,
  lumira,
  lunetius,
  noble,
  octoplushy,
  onyx,
  opal,
  otis,
  paco,
  penelope,
  sandy,
  shelly,
  shin,
  simon,
  simone,
  skully,
  sven,
  tamiko,
  teagan,
  tiberius,
  titan,
  trayvon,
  tristan,
  uma,
  umbra,
  wahid,
  walburga,
  waralee,
  yuri,
}

/*
 * Export a list of names that make up the FreeSewing collection
 */
export const collection = Object.keys(designs)

/*
 * Create various helper exports to get info about the collection
 */
export const requiredMeasurements = {}
export const optionalMeasurements = {}
export const measurements = {}
export const about = {}

const _tags = new Set()
const _techniques = new Set()
const _devs = new Set()
const _dess = new Set()

for (const design in designs) {
  requiredMeasurements[design] = designs[design].patternConfig.measurements
  optionalMeasurements[design] = designs[design].patternConfig.optionalMeasurements
  measurements[design] = [
    ...designs[design].patternConfig.measurements,
    ...designs[design].patternConfig.optionalMeasurements,
  ]
  about[design] = { ...designs[design].designConfig.data }
  if (about[design].tags) _tags.add(...about[design].tags)
  if (about[design].techniques) _techniques.add(...about[design].techniques)
  if (Array.isArray(about[design].code)) _devs.add(...about[design].code)
  else _devs.add(about[design].code)
  if (Array.isArray(about[design].design)) _dess.add(...about[design].design)
  else _dess.add(about[design].design)
}
export const tags = Array.from(_tags)
  .filter((t) => (t ? true : false))
  .sort()
export const techniques = Array.from(_techniques)
  .filter((t) => (t ? true : false))
  .sort()
export const developers = Array.from(_devs)
  .filter((t) => (t ? true : false))
  .sort()
export const designers = Array.from(_dess)
  .filter((t) => (t ? true : false))
  .sort()

/*
 * Export the translations
 */
export const i18n = translations

/*
 * These are examples
 */
export const examples = {
  id: designExampleIds,
  href: designExampleHrefs,
}
